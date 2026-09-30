/* ============================================================
   AI Engineering Atlas — full-text search over node content.
   Pure (no DOM): build an index once, then query it. Shared by the
   main search bar and anything else that needs to find concepts.

     var idx = AtlasSearch.create(ATLAS.nodes);
     idx.search("cold start", { limit: 12, only: ["id1", "id2"] });
     // -> [{ id, label, cluster, score, field, snippet }]

   `field` is where the best match was found ("label", "keywords",
   "short", "heading", "keyPoints", "why", "body", "quiz"); `snippet`
   is a short excerpt around the match for content hits (else null).
   ============================================================ */
(function (root) {
  "use strict";

  // Higher = more relevant. A title hit must always beat a body-only hit.
  var WEIGHTS = { label: 100, keywords: 40, short: 30, heading: 20, keyPoints: 15, why: 12, body: 10, quiz: 5 };
  // Fields that already show in the result row — no snippet needed.
  var NO_SNIPPET = { label: 1, keywords: 1 };
  // Very short terms only match titles/keywords, or every lesson would match "a".
  var MIN_CONTENT_TERM = 3;

  function stripMd(s) {
    return String(s)
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")  // [text](url) -> text
      .replace(/[*_`]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Flatten a lesson body (strings, {ul:[]}, {formula}) into plain strings.
  function bodyTexts(body, out) {
    (body || []).forEach(function (b) {
      if (typeof b === "string") out.push(stripMd(b));
      else if (b && b.ul) b.ul.forEach(function (li) { out.push(stripMd(li)); });
      else if (b && b.formula) out.push(stripMd(b.formula));
    });
    return out;
  }

  function fieldsOf(n) {
    var learn = n.learn || {};
    var f = [
      { name: "label", texts: [n.label || ""] },
      { name: "keywords", texts: [n.keywords || ""] },
      { name: "short", texts: [stripMd(n.short || "")] },
      { name: "heading", texts: (learn.sections || []).map(function (s) { return stripMd(s.h || ""); }) },
      { name: "keyPoints", texts: (learn.keyPoints || []).map(stripMd) },
      { name: "why", texts: [stripMd(learn.why || "")] },
      { name: "body", texts: (learn.sections || []).reduce(function (acc, s) { return bodyTexts(s.body, acc); }, []) },
      { name: "quiz", texts: (n.quiz || []).reduce(function (acc, q) {
        acc.push(stripMd(q.q || "")); if (q.explain) acc.push(stripMd(q.explain)); return acc;
      }, []) },
    ];
    f.forEach(function (x) { x.lower = x.texts.map(norm); });
    return f;
  }

  // Lowercase and treat hyphens as spaces ("cold-start" == "cold start").
  // Length-preserving, so match positions map straight back to the original text.
  function norm(s) { return String(s).toLowerCase().replace(/-/g, " "); }

  function tokenize(q) {
    return norm(q).split(/\s+/).filter(Boolean);
  }

  function isWordStart(text, i) {
    return i === 0 || !/[a-z0-9]/.test(text.charAt(i - 1));
  }

  // First occurrence of `term` that starts a word ("rag" hits "RAG", not "average").
  function findWordStart(text, term) {
    var pos = text.indexOf(term);
    while (pos !== -1 && !isWordStart(text, pos)) pos = text.indexOf(term, pos + 1);
    return pos;
  }

  // Best field (by weight) containing `term`; returns { name, weight, textIdx, pos } or null.
  function bestField(fields, term) {
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (term.length < MIN_CONTENT_TERM && !NO_SNIPPET[f.name]) continue;
      for (var j = 0; j < f.lower.length; j++) {
        var pos = findWordStart(f.lower[j], term);
        if (pos !== -1) return { name: f.name, weight: WEIGHTS[f.name], textIdx: j, pos: pos, len: term.length };
      }
    }
    return null;
  }

  // Best snippet-worthy field containing the whole multi-word phrase.
  function findPhrase(fields, phrase) {
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (NO_SNIPPET[f.name]) continue;
      for (var j = 0; j < f.lower.length; j++) {
        var pos = findWordStart(f.lower[j], phrase);
        if (pos !== -1) return { name: f.name, weight: WEIGHTS[f.name], orig: f.texts[j], pos: pos };
      }
    }
    return null;
  }

  function makeSnippet(text, pos, len) {
    var RADIUS = 48;
    var start = Math.max(0, pos - RADIUS), end = Math.min(text.length, pos + len + RADIUS);
    // snap to word boundaries so we don't start mid-word
    if (start > 0) { var sp = text.indexOf(" ", start); if (sp !== -1 && sp < pos) start = sp + 1; }
    if (end < text.length) { var ep = text.lastIndexOf(" ", end); if (ep > pos + len) end = ep; }
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function create(nodes) {
    var index = nodes.map(function (n) {
      return { id: n.id, label: n.label, cluster: n.cluster, labelLower: norm(n.label || ""), fields: fieldsOf(n) };
    });

    function search(query, opts) {
      opts = opts || {};
      var terms = tokenize(query);
      if (!terms.length) return [];
      var phrase = terms.join(" ");
      var only = null;
      if (opts.only) { only = {}; opts.only.forEach(function (id) { only[id] = 1; }); }

      var results = [];
      index.forEach(function (r) {
        if (only && !only[r.id]) return;
        var score = 0, top = null;
        for (var t = 0; t < terms.length; t++) {
          var hit = bestField(r.fields, terms[t]);
          if (!hit) return;                       // every term must match somewhere
          score += hit.weight;
          if (!top || hit.weight > top.weight) top = hit;
        }
        // whole-phrase and title-prefix bonuses keep exact title hits on top
        var lp = findWordStart(r.labelLower, phrase);
        if (lp === 0) score += 200;
        else if (lp > 0) score += 80;

        // a multi-word query found verbatim in the lesson outranks scattered terms,
        // and makes the better snippet
        var ph = terms.length > 1 && top.name !== "label" ? findPhrase(r.fields, phrase) : null;
        if (ph) score += ph.weight;

        var snippet = null, field = top.name;
        if (ph) { field = ph.name; snippet = makeSnippet(ph.orig, ph.pos, phrase.length); }
        else if (!NO_SNIPPET[field]) {
          var f = r.fields.filter(function (x) { return x.name === field; })[0];
          snippet = makeSnippet(f.texts[top.textIdx], top.pos, top.len);
        }
        results.push({ id: r.id, label: r.label, cluster: r.cluster, score: score, field: field, snippet: snippet });
      });

      results.sort(function (a, b) {
        return (b.score - a.score) || (a.label.length - b.label.length) || (a.label < b.label ? -1 : 1);
      });
      return opts.limit ? results.slice(0, opts.limit) : results;
    }

    return { search: search };
  }

  // [start, end) ranges in `text` where a query term starts a word — for highlighting.
  function matchRanges(text, query) {
    var lower = norm(text), ranges = [];
    tokenize(query).forEach(function (term) {
      var pos = findWordStart(lower, term);
      while (pos !== -1) {
        ranges.push([pos, pos + term.length]);
        pos = lower.indexOf(term, pos + term.length);
        while (pos !== -1 && !isWordStart(lower, pos)) pos = lower.indexOf(term, pos + 1);
      }
    });
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    // merge overlaps
    return ranges.reduce(function (out, r) {
      var last = out[out.length - 1];
      if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else out.push(r);
      return out;
    }, []);
  }

  var api = { create: create, stripMd: stripMd, terms: tokenize, matchRanges: matchRanges };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.AtlasSearch = api;
})(typeof window !== "undefined" ? window : this);
