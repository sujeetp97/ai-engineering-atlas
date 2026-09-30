/* ============================================================
   AI Engineering Atlas — application engine
   Graph rendering, search, learn panel, and quiz.
   ============================================================ */
(function () {
  "use strict";

  // ---------- boot guards ----------
  function bootFail(msg) {
    var el = document.getElementById("boot-error");
    document.getElementById("boot-error-msg").textContent = msg;
    el.hidden = false;
  }
  if (typeof cytoscape === "undefined") {
    return bootFail("Graph library (cytoscape) failed to load. If you opened this from a strict sandbox, try a local server: `python3 -m http.server` in the project folder, then open http://localhost:8000");
  }
  if (!window.ATLAS || !ATLAS.nodes.length) {
    return bootFail("Knowledge data failed to load. Check that the data/*.js files are present.");
  }
  try {
    if (window.cytoscapeFcose) cytoscape.use(window.cytoscapeFcose);
  } catch (e) { /* already registered */ }

  var CL = ATLAS.clusters;

  // ---------- persistence ----------
  var STORE_KEY = "atlas.progress.v1";
  var progress = loadProgress();
  function loadProgress() {
    var p = null;
    try { p = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
    p = p || {};
    p.understood = p.understood || {}; p.best = p.best || {}; p.known = p.known || {};
    return p;
  }
  // localStorage is the working copy; saveProgress also autosaves to the
  // connected progress file, if any (see PROGRESS: FILE SYNC below).
  function saveLocal() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
  }
  function saveProgress() {
    saveLocal();
    scheduleFileWrite();
  }
  // understood = passed the quiz. known = the learner says they already know it
  // (no quiz). Paths treat both as done; they're counted and drawn separately.
  function isUnderstood(id) { return !!progress.understood[id]; }
  function isKnown(id) { return !progress.understood[id] && !!progress.known[id]; }
  function isDone(id) { return isUnderstood(id) || isKnown(id); }

  // ---------- index the data ----------
  var nodeById = {};
  ATLAS.nodes.forEach(function (n) { nodeById[n.id] = n; });

  // validate + collect degree
  var degree = {};
  ATLAS.nodes.forEach(function (n) { degree[n.id] = 0; });
  var validEdges = [];
  ATLAS.edges.forEach(function (e) {
    if (!nodeById[e.source] || !nodeById[e.target]) {
      console.warn("Edge references missing node:", e);
      return;
    }
    degree[e.source]++; degree[e.target]++;
    validEdges.push(e);
  });

  // ---------- build cytoscape elements ----------
  var elements = [];
  ATLAS.nodes.forEach(function (n) {
    elements.push({
      data: {
        id: n.id,
        label: n.label,
        cluster: n.cluster,
        color: (CL[n.cluster] && CL[n.cluster].color) || "#888",
        deg: degree[n.id],
        size: 26 + Math.min(38, degree[n.id] * 3.4),
      },
    });
  });
  validEdges.forEach(function (e, i) {
    elements.push({
      data: {
        id: "e" + i,
        source: e.source,
        target: e.target,
        etype: e.type || "related",
      },
    });
  });

  // ---------- cytoscape styles ----------
  var edgeColor = {
    prereq:  "#b8a98c",
    partof:  "#9db7b0",
    enables: "#c6a3a3",
    uses:    "#a9a3c9",
    related: "#d7cdb8",
  };

  var cy = cytoscape({
    container: document.getElementById("cy"),
    elements: elements,
    wheelSensitivity: 0.22,
    minZoom: 0.15,
    maxZoom: 3.2,
    pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
    style: [
      {
        selector: "node",
        style: {
          "background-color": "data(color)",
          "width": "data(size)",
          "height": "data(size)",
          "label": "data(label)",
          "font-size": 11,
          "font-family": "Inter, sans-serif",
          "font-weight": 500,
          "color": getVar("--ink") || "#23201b",
          "text-valign": "bottom",
          "text-halign": "center",
          "text-margin-y": 4,
          "text-wrap": "wrap",
          "text-max-width": 110,
          "text-background-color": getVar("--graph-bg") || "#f6f2ea",
          "text-background-opacity": 0.72,
          "text-background-padding": 2,
          "text-background-shape": "roundrectangle",
          "border-width": 2,
          "border-color": "#ffffff",
          "border-opacity": 0.55,
          "overlay-opacity": 0,
          "transition-property": "opacity, border-width, width, height",
          "transition-duration": "140ms",
          "z-index": 10,
        },
      },
      { selector: "node.understood", style: { "border-color": "#2f7d4f", "border-width": 4, "border-opacity": 1 } },
      { selector: "node.known", style: { "border-color": "#2f7d4f", "border-width": 3, "border-style": "dashed", "border-opacity": 0.9 } },
      {
        selector: "edge",
        style: {
          "width": 1.5,
          "line-color": function (e) { return edgeColor[e.data("etype")] || "#d7cdb8"; },
          "curve-style": "bezier",
          "opacity": 0.5,
          "target-arrow-shape": function (e) {
            var t = e.data("etype");
            return (t === "prereq" || t === "enables") ? "triangle" : "none";
          },
          "target-arrow-color": function (e) { return edgeColor[e.data("etype")] || "#d7cdb8"; },
          "arrow-scale": 0.8,
          "transition-property": "opacity, width, line-color",
          "transition-duration": "140ms",
          "z-index": 1,
        },
      },
      { selector: "node.faded", style: { "opacity": 0.12 } },
      { selector: "edge.faded", style: { "opacity": 0.05 } },
      { selector: "node.dim", style: { "opacity": 0.4 } },
      { selector: "edge.dim", style: { "opacity": 0.15 } },
      {
        selector: "node.hl",
        style: {
          "border-color": getVar("--accent") || "#b4531f",
          "border-width": 4, "border-opacity": 1,
          "width": function (e) { return e.data("size") * 1.12; },
          "height": function (e) { return e.data("size") * 1.12; },
          "z-index": 30, "font-weight": 700,
        },
      },
      {
        selector: "node.match",
        style: {
          "border-color": getVar("--accent") || "#b4531f",
          "border-width": 5, "border-opacity": 1, "z-index": 40,
        },
      },
      { selector: "node.path-on", style: { "opacity": 1, "border-color": getVar("--accent") || "#b4531f", "border-width": 3, "border-opacity": 0.9, "z-index": 22 } },
      { selector: "node.path-next", style: { "border-color": getVar("--accent") || "#b4531f", "border-width": 6, "border-opacity": 1, "z-index": 46, "font-weight": 700 } },
      { selector: "edge.hl", style: { "opacity": 0.95, "width": 2.6, "z-index": 20 } },
      {
        selector: "node.selected",
        style: {
          "border-color": getVar("--accent") || "#b4531f",
          "border-width": 5, "border-opacity": 1, "z-index": 50,
        },
      },
    ],
    layout: { name: "null" },   // the real layout runs below, via runMainLayout()
  });

  function runMainLayout() { cy.layout(layoutOpts()).run(); }
  runMainLayout();

  // Run fn once no node is mid-animation (e.g. the load-time layout), so
  // positions read in fn are final. Gives up waiting after ~3s.
  function whenSettled(fn) {
    var tries = 0;
    (function check() {
      if (tries++ > 30 || !cy.nodes().some(function (n) { return n.animated(); })) fn();
      else setTimeout(check, 100);
    })();
  }

  function layoutOpts() {
    return {
      name: "fcose",
      quality: "proof",
      randomize: true,
      animate: true,
      animationDuration: 900,
      nodeSeparation: 90,
      idealEdgeLength: function (edge) {
        // pull same-cluster nodes closer, push cross-cluster apart
        var s = nodeById[edge.data("source")], t = nodeById[edge.data("target")];
        return (s && t && s.cluster === t.cluster) ? 70 : 150;
      },
      nodeRepulsion: 8500,
      gravity: 0.28,
      gravityRange: 3.6,
      packComponents: true,
      tile: true,
    };
  }

  // apply understood markers
  refreshUnderstoodClasses();
  function refreshUnderstoodClasses() {
    cy.batch(function () {
      cy.nodes().forEach(function (n) {
        n.toggleClass("understood", isUnderstood(n.id()));
        n.toggleClass("known", isKnown(n.id()));
      });
    });
  }

  // ---------- helpers ----------
  function getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function inline(s) {
    return escapeHtml(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*(?!\*)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  }
  function clusterDot(clusterId) {
    var c = (CL[clusterId] && CL[clusterId].color) || "#888";
    return '<span class="dot" style="background:' + c + '"></span>';
  }

  // ==========================================================
  //  LEGEND
  // ==========================================================
  var legendEl = document.getElementById("legend");
  var clusterOff = {}; // clusterId -> hidden?
  (function buildLegend() {
    var counts = {};
    ATLAS.nodes.forEach(function (n) { counts[n.cluster] = (counts[n.cluster] || 0) + 1; });
    var html = '<div class="legend-title">Domains</div>';
    Object.keys(CL).forEach(function (id) {
      var c = CL[id];
      html +=
        '<div class="legend-item" data-cluster="' + id + '" title="' + escapeHtml(c.blurb) + '">' +
          '<span class="swatch" style="background:' + c.color + '"></span>' +
          '<span class="lg-name">' + c.label + "</span>" +
          '<span class="lg-count">' + (counts[id] || 0) + "</span>" +
        "</div>";
    });
    legendEl.innerHTML = html;
    legendEl.querySelectorAll(".legend-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var id = item.getAttribute("data-cluster");
        clusterOff[id] = !clusterOff[id];
        item.classList.toggle("off", clusterOff[id]);
        applyClusterFilter();
      });
    });
  })();

  // A node is shown unless its domain is filtered off or, in path view,
  // it isn't on the active path. Edges show only when both ends do.
  function applyClusterFilter() {
    var onPath = null;
    if (pathViewOn()) { onPath = {}; pathState.sequence.forEach(function (id) { onPath[id] = 1; }); }
    function shown(n) { return !clusterOff[n.data("cluster")] && (!onPath || onPath[n.id()]); }
    cy.batch(function () {
      cy.nodes().forEach(function (n) { n.style("display", shown(n) ? "element" : "none"); });
      cy.edges().forEach(function (e) { e.style("display", shown(e.source()) && shown(e.target()) ? "element" : "none"); });
    });
  }

  // ==========================================================
  //  PROGRESS LINE
  // ==========================================================
  function updateProgressLine() {
    var total = ATLAS.nodes.length;
    var done = Object.keys(progress.understood).filter(function (k) { return nodeById[k]; }).length;
    var known = ATLAS.nodes.filter(function (n) { return isKnown(n.id); }).length;
    var pct = Math.round((done / total) * 100);
    document.getElementById("progress-line").textContent =
      total + " concepts · " + validEdges.length + " links · " + done + " understood (" + pct + "%)" +
      (known ? " · " + known + " known" : "");
  }
  updateProgressLine();

  // ==========================================================
  //  HIGHLIGHT / FOCUS
  // ==========================================================
  function clearHighlight() {
    cy.elements().removeClass("faded dim hl match selected path-on path-next");
  }
  function focusNode(id, opts) {
    opts = opts || {};
    var node = cy.getElementById(id);
    if (!node || node.empty()) return;
    clearHighlight();
    var neighborhood = node.closedNeighborhood();
    cy.elements().addClass("faded");
    neighborhood.removeClass("faded").addClass("hl");
    node.removeClass("hl").addClass("selected");
    if (opts.center !== false && node.visible()) {
      cy.animate({ center: { eles: node }, zoom: Math.max(cy.zoom(), 0.9) }, { duration: 350 });
    }
  }

  // ==========================================================
  //  SEARCH
  // ==========================================================
  var searchEl = document.getElementById("search");
  var resultsEl = document.getElementById("search-results");
  var clearBtn = document.getElementById("search-clear");
  var searchIndex = AtlasSearch.create(ATLAS.nodes);
  var activeResult = -1;
  // While a learning path is active, search is scoped to its nodes unless the
  // user widens it; `searchWholeAtlas` resets whenever the query is cleared.
  var searchWholeAtlas = false;

  searchEl.addEventListener("input", runSearch);

  function runSearch() {
    var q = searchEl.value.trim();
    clearBtn.style.display = q ? "block" : "none";
    if (!q) { searchWholeAtlas = false; resultsEl.classList.remove("open"); liveHighlight([]); return; }
    var all = searchIndex.search(q);
    var scoped = pathState.active && !searchWholeAtlas;
    var matches = scoped ? searchIndex.search(q, { only: pathState.sequence }) : all;
    renderResults(matches.slice(0, 12), q, matches.length, {
      path: pathState.active, scoped: scoped, outside: all.length - (scoped ? matches.length : 0),
    });
    liveHighlight(matches.map(function (m) { return m.id; }));
  }

  // Escape `text` and wrap every query-term match in <mark>.
  function markMatches(text, q) {
    var html = "", at = 0;
    AtlasSearch.matchRanges(text, q).forEach(function (r) {
      html += escapeHtml(text.slice(at, r[0])) + "<mark>" + escapeHtml(text.slice(r[0], r[1])) + "</mark>";
      at = r[1];
    });
    return html + escapeHtml(text.slice(at));
  }

  function liveHighlight(ids) {
    cy.nodes().removeClass("match");
    if (!ids.length) { if (!cy.getElementById(currentNodeId).nonempty()) clearHighlight(); return; }
    var set = cy.collection();
    ids.forEach(function (id) { set = set.union(cy.getElementById(id)); });
    cy.elements().addClass("dim").removeClass("faded");
    set.removeClass("dim").addClass("match");
    set.connectedEdges().removeClass("dim");
  }

  var FIELD_LABEL = { short: "summary", heading: "section", keyPoints: "key point", why: "why it matters", body: "lesson", quiz: "quiz" };

  // One search hit as a list item. `meta` replaces the domain name on the right.
  function resultItemHtml(m, q, meta) {
    var c = CL[m.cluster];
    return '<li data-id="' + m.id + '">' +
      '<div class="r-row">' +
        '<span class="dot" style="background:' + (c ? c.color : "#888") + '"></span>' +
        '<span class="r-label">' + markMatches(m.label, q) + "</span>" +
        '<span class="r-cluster">' + (meta != null ? meta : (c ? escapeHtml(c.label) : "")) + "</span>" +
      "</div>" +
      (m.snippet ? '<div class="r-snippet"><span class="r-field">' + FIELD_LABEL[m.field] + "</span>" + markMatches(m.snippet, q) + "</div>" : "") +
      "</li>";
  }

  function stepMeta(id) {
    var i = pathState.sequence.indexOf(id);
    return i === -1 ? null : "Step " + (i + 1) + " of " + pathState.sequence.length;
  }

  function renderResults(matches, q, total, scope) {
    activeResult = -1;
    var html = "";
    if (scope.path) {
      html += '<li class="r-scope">' + (scope.scoped
        ? "<span>In your path · " + escapeHtml(goalLabel()) + "</span>" +
          (scope.outside ? '<button data-scope="all">Search whole atlas (' + scope.outside + " more)</button>" : "")
        : '<span>Whole atlas</span><button data-scope="path">Only my path</button>') + "</li>";
    }
    if (!matches.length) {
      html += '<li class="r-empty">Nothing ' + (scope.scoped ? "in this path" : "in the atlas") + " mentions “" + escapeHtml(q) + "”.</li>";
    } else {
      html += matches.map(function (m) {
        var step = scope.path ? stepMeta(m.id) : null;
        return resultItemHtml(m, q, step && escapeHtml(step));
      }).join("");
      if (total > matches.length) html += '<li class="r-more">+ ' + (total - matches.length) + " more highlighted on the graph</li>";
    }
    resultsEl.innerHTML = html;
    resultsEl.classList.add("open");
    resultsEl.querySelectorAll("[data-scope]").forEach(function (b) {
      b.addEventListener("mousedown", function (e) {
        e.preventDefault();   // keep focus in the search box
        searchWholeAtlas = b.getAttribute("data-scope") === "all";
        runSearch();
      });
    });
    resultsEl.querySelectorAll("li[data-id]").forEach(function (li) {
      li.addEventListener("mousedown", function (e) {
        e.preventDefault();
        chooseResult(li.getAttribute("data-id"));
      });
    });
  }

  function chooseResult(id) {
    resultsEl.classList.remove("open");
    focusNode(id);
    openPanel(id);
  }

  searchEl.addEventListener("keydown", function (e) {
    var items = resultsEl.querySelectorAll("li[data-id]");
    if (e.key === "ArrowDown") { e.preventDefault(); activeResult = Math.min(activeResult + 1, items.length - 1); markActive(items); }
    else if (e.key === "ArrowUp") { e.preventDefault(); activeResult = Math.max(activeResult - 1, 0); markActive(items); }
    else if (e.key === "Enter") {
      if (activeResult >= 0 && items[activeResult]) chooseResult(items[activeResult].getAttribute("data-id"));
      else if (items[0]) chooseResult(items[0].getAttribute("data-id"));
    } else if (e.key === "Escape") { resultsEl.classList.remove("open"); searchEl.blur(); }
  });
  function markActive(items) {
    items.forEach(function (it, i) { it.classList.toggle("active", i === activeResult); });
    if (items[activeResult]) items[activeResult].scrollIntoView({ block: "nearest" });
  }
  clearBtn.addEventListener("click", function () {
    searchEl.value = ""; clearBtn.style.display = "none";
    resultsEl.classList.remove("open"); liveHighlight([]); clearHighlight(); searchEl.focus();
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-wrap")) resultsEl.classList.remove("open");
  });

  // ==========================================================
  //  TOOLTIP
  // ==========================================================
  var tooltip = document.getElementById("tooltip");
  cy.on("mouseover", "node", function (evt) {
    var n = nodeById[evt.target.id()];
    if (!n) return;
    var c = CL[n.cluster];
    tooltip.innerHTML =
      '<div class="tt-cluster">' + (c ? c.label : "") + "</div>" +
      '<div class="tt-title">' + escapeHtml(n.label) + (isUnderstood(n.id) ? " ✓" : isKnown(n.id) ? " (known)" : "") + "</div>" +
      "<div>" + escapeHtml(n.short || "") + "</div>";
    tooltip.hidden = false;
  });
  cy.on("mouseout", "node", function () { tooltip.hidden = true; });
  cy.on("mousemove", function (evt) {
    if (tooltip.hidden) return;
    var p = evt.renderedPosition || evt.position;
    tooltip.style.left = p.x + "px";
    tooltip.style.top = (p.y + document.getElementById("cy").offsetTop - 14) + "px";
  });

  // ==========================================================
  //  NODE TAP -> PANEL
  // ==========================================================
  cy.on("tap", "node", function (evt) {
    var id = evt.target.id();
    focusNode(id, { center: false });
    openPanel(id);
  });
  cy.on("tap", function (evt) {
    if (evt.target === cy) { /* background tap */ closePanel(); if (!pathState.active) clearHighlight(); }
  });

  // ==========================================================
  //  PANEL (Learn + Quiz)
  // ==========================================================
  var panel = document.getElementById("panel");
  var panelScroll = document.getElementById("panel-scroll");
  var scrim = document.getElementById("panel-scrim");
  var currentNodeId = "";

  document.getElementById("panel-close").addEventListener("click", closePanel);
  scrim.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanel(); });

  function closePanel() {
    panel.hidden = true;
    scrim.hidden = true;
    currentNodeId = "";
    if (pathState.active) highlightPath();
  }

  function openPanel(id, tab) {
    var n = nodeById[id];
    if (!n) return;
    currentNodeId = id;
    panel.hidden = false;
    scrim.hidden = false;
    panelScroll.scrollTop = 0;
    renderPanel(n, tab || "learn");
    cy.getElementById(id).addClass("selected");
  }

  function renderPanel(n, tab) {
    var c = CL[n.cluster] || { label: "", color: "#888" };
    var learned = isUnderstood(n.id);
    var best = progress.best[n.id];
    var quizCount = (n.quiz || []).length;

    var html = "";
    // path breadcrumb when this node is part of the active learning path
    var pIdx = pathState.active ? pathState.sequence.indexOf(n.id) : -1;
    if (pIdx > -1) {
      var pNextId = pathState.sequence[pIdx + 1];
      html += '<div class="path-crumb">' +
        '<button data-action="back-to-path">← Path</button>' +
        '<span class="pc-step">Step ' + (pIdx + 1) + ' of ' + pathState.sequence.length + "</span>" +
        (pNextId ? '<button data-action="path-next-node">Next: ' + escapeHtml(nodeById[pNextId].label) + " →</button>" : "") +
        "</div>";
    } else if (pathViewOn()) {
      html += '<div class="path-crumb off-path">' +
        '<button data-action="back-to-path">← Path</button>' +
        '<span class="pc-step">Not on your path — hidden from the graph</span>' +
        '<button data-action="show-full-atlas">Show full atlas</button>' +
        "</div>";
    }
    html += '<span class="p-cluster-tag" style="background:' + hexA(c.color, 0.12) + ";color:" + c.color + '">' +
              '<span class="dot" style="background:' + c.color + '"></span>' + c.label + "</span>";
    html += '<h2 class="p-title">' + escapeHtml(n.label) + "</h2>";
    html += '<p class="p-short">' + inline(n.short || "") + "</p>";

    if (learned) {
      html += '<div class="p-status learned">✓ Understood' + (best != null ? " — best quiz " + best + "/" + quizCount : "") + "</div>";
    } else if (isKnown(n.id)) {
      html += '<div class="p-status known"><span>◐ Marked as already known — take the quiz any time to confirm it</span>' +
        '<button type="button" data-action="unmark-known">Undo</button></div>';
    } else {
      html += '<div class="p-status unlearned"><span>○ Not yet checked — read, then take the quiz to confirm</span>' +
        '<button type="button" data-action="mark-known" title="Skip this one — it won\'t count as quiz-verified">I already know this</button></div>';
    }

    html += '<div class="p-tabs">' +
      '<button class="p-tab" data-tab="learn">Learn</button>' +
      '<button class="p-tab" data-tab="quiz">Quiz <span class="badge">' + quizCount + "</span></button>" +
      "</div>";
    html += '<div class="tab-body" data-body="learn">' + renderLearn(n) + "</div>";
    html += '<div class="tab-body" data-body="quiz">' + renderQuizContainer(n) + "</div>";

    panelScroll.innerHTML = html;

    // tab wiring
    panelScroll.querySelectorAll(".p-tab").forEach(function (btn) {
      btn.addEventListener("click", function () { switchTab(n, btn.getAttribute("data-tab")); });
    });
    // connection chips
    panelScroll.querySelectorAll(".conn-chip[data-id]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var tid = chip.getAttribute("data-id");
        focusNode(tid); openPanel(tid);
      });
    });
    // already-known toggle
    var knownBtn = panelScroll.querySelector("[data-action=mark-known], [data-action=unmark-known]");
    if (knownBtn) knownBtn.addEventListener("click", function () {
      setKnown(n.id, knownBtn.getAttribute("data-action") === "mark-known");
      renderPanel(n, "learn");
    });
    // start-quiz button
    var startBtn = panelScroll.querySelector("[data-action=start-quiz]");
    if (startBtn) startBtn.addEventListener("click", function () { switchTab(n, "quiz"); });
    // path breadcrumb buttons
    var backBtn = panelScroll.querySelector("[data-action=back-to-path]");
    if (backBtn) backBtn.addEventListener("click", openPathPanel);
    var fullBtn = panelScroll.querySelector("[data-action=show-full-atlas]");
    if (fullBtn) fullBtn.addEventListener("click", function () { setPathView(false); openPanel(n.id); focusNode(n.id); });
    var nextNodeBtn = panelScroll.querySelector("[data-action=path-next-node]");
    if (nextNodeBtn) nextNodeBtn.addEventListener("click", function () {
      var idx = pathState.sequence.indexOf(n.id);
      var nx = pathState.sequence[idx + 1];
      if (nx) { focusNode(nx, { center: true }); openPanel(nx); }
    });

    switchTab(n, tab);
  }

  function switchTab(n, tab) {
    panelScroll.querySelectorAll(".p-tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === tab);
    });
    panelScroll.querySelectorAll(".tab-body").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-body") === tab);
    });
    if (tab === "quiz") mountQuiz(n);
  }

  // ---------- Learn rendering ----------
  function renderLearn(n) {
    var L = n.learn || {};
    var html = "";
    if (L.why) {
      html += '<div class="learn-why"><h4>Why this matters</h4><p>' + inline(L.why) + "</p></div>";
    }
    html += '<div class="lesson">';
    (L.sections || []).forEach(function (s) {
      if (s.h) html += "<h3>" + inline(s.h) + "</h3>";
      (s.body || []).forEach(function (b) {
        if (typeof b === "string") html += "<p>" + inline(b) + "</p>";
        else if (b.ul) html += "<ul>" + b.ul.map(function (li) { return "<li>" + inline(li) + "</li>"; }).join("") + "</ul>";
        else if (b.formula) html += '<div class="formula">' + escapeHtml(b.formula) + "</div>";
      });
    });
    html += "</div>";

    if (L.keyPoints && L.keyPoints.length) {
      html += '<div class="keypoints"><h4>Remember this</h4><ul>' +
        L.keyPoints.map(function (k) { return "<li>" + inline(k) + "</li>"; }).join("") + "</ul></div>";
    }
    if (L.source && L.source.url) {
      html += '<div class="source-cite"><span class="src-ico">↗</span><div>' +
        'Primary source: <a href="' + escapeHtml(L.source.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(L.source.title || L.source.url) + "</a>" +
        (L.source.note ? '<span class="src-note">' + escapeHtml(L.source.note) + "</span>" : "") +
        "</div></div>";
    }

    html += renderConnections(n);

    html += '<div class="learn-actions">' +
      '<button class="btn-primary" data-action="start-quiz">Take the quiz →</button>' +
      "</div>";
    return html;
  }

  function renderConnections(n) {
    var groups = {
      prereq_in:  { label: "Builds on", items: [] },
      prereq_out: { label: "Leads to", items: [] },
      partof_out: { label: "Part of", items: [] },
      partof_in:  { label: "Includes", items: [] },
      uses:       { label: "Uses / used by", items: [] },
      related:    { label: "Related", items: [] },
    };
    validEdges.forEach(function (e) {
      var other = null, bucket = null;
      if (e.source === n.id) {
        other = e.target;
        if (e.type === "prereq") bucket = "prereq_out";
        else if (e.type === "partof") bucket = "partof_out";
        else if (e.type === "enables") bucket = "prereq_out";
        else if (e.type === "uses") bucket = "uses";
        else bucket = "related";
      } else if (e.target === n.id) {
        other = e.source;
        if (e.type === "prereq") bucket = "prereq_in";
        else if (e.type === "partof") bucket = "partof_in";
        else if (e.type === "enables") bucket = "prereq_in";
        else if (e.type === "uses") bucket = "uses";
        else bucket = "related";
      }
      if (other && groups[bucket]) groups[bucket].items.push(other);
    });

    var html = '<div class="connections"><h4>Connections</h4>';
    var any = false;
    Object.keys(groups).forEach(function (k) {
      var g = groups[k];
      if (!g.items.length) return;
      any = true;
      var seen = {};
      html += '<div class="conn-group"><div class="cg-label">' + g.label + "</div>";
      g.items.forEach(function (id) {
        if (seen[id] || !nodeById[id]) return; seen[id] = 1;
        var t = nodeById[id];
        html += '<span class="conn-chip" data-id="' + id + '">' + clusterDot(t.cluster) + escapeHtml(t.label) + "</span>";
      });
      html += "</div>";
    });
    if (!any) html += '<p class="p-short">No links recorded yet.</p>';
    html += "</div>";
    return html;
  }

  // ---------- Quiz rendering ----------
  function renderQuizContainer(n) {
    if (!n.quiz || !n.quiz.length) {
      return '<p class="quiz-intro">No quiz written for this concept yet.</p>';
    }
    return '<div data-quiz-mount="1"></div>';
  }

  function mountQuiz(n) {
    var mount = panelScroll.querySelector("[data-quiz-mount]");
    if (!mount || mount.getAttribute("data-mounted") === "1") return;
    mount.setAttribute("data-mounted", "1");

    var quiz = n.quiz;
    var answered = new Array(quiz.length).fill(-1);
    var correctCount = 0;

    var intro = document.createElement("p");
    intro.className = "quiz-intro";
    intro.innerHTML = "Answer from memory — this is what turns reading into real understanding. " +
      "Get <strong>" + passMark(quiz.length) + " of " + quiz.length + "</strong> right to mark this concept understood.";
    mount.appendChild(intro);

    quiz.forEach(function (item, qi) {
      var card = document.createElement("div");
      card.className = "quiz-q";
      var qhtml = '<div class="q-num">Question ' + (qi + 1) + " of " + quiz.length + "</div>" +
                  '<div class="q-text">' + inline(item.q) + "</div>";
      // shown in a fresh random order every attempt; data-o keeps the authored index
      shuffled(item.options.map(function (_, oi) { return oi; })).forEach(function (oi) {
        qhtml += '<button class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' + inline(item.options[oi]) + "</button>";
      });
      qhtml += '<div class="quiz-explain"><strong>Why:</strong> ' + inline(item.explain || "") + "</div>";
      card.innerHTML = qhtml;
      mount.appendChild(card);

      card.querySelectorAll(".quiz-opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (answered[qi] !== -1) return;
          var oi = +btn.getAttribute("data-o");
          answered[qi] = oi;
          var opts = card.querySelectorAll(".quiz-opt");
          opts.forEach(function (b) { b.disabled = true; });
          if (oi === item.answer) { btn.classList.add("correct"); correctCount++; }
          else {
            btn.classList.add("wrong");
            card.querySelector('.quiz-opt[data-o="' + item.answer + '"]').classList.add("correct");
          }
          card.querySelector(".quiz-explain").classList.add("show");
          if (answered.every(function (a) { return a !== -1; })) finishQuiz(n, correctCount, quiz.length, mount);
        });
      });
    });
  }

  function finishQuiz(n, score, total, mount) {
    var passed = score >= passMark(total);
    var prevBest = progress.best[n.id] != null ? progress.best[n.id] : -1;
    if (score > prevBest) { progress.best[n.id] = score; }
    if (passed && !progress.understood[n.id]) {
      progress.understood[n.id] = Date.now();
      delete progress.known[n.id];   // quiz-verified now
      cy.getElementById(n.id).removeClass("known").addClass("understood");
      updateProgressLine();
      if (pathState.active) highlightPath();
      setTimeout(maybeNudgeSave, 1200);
    }
    saveProgress();

    var res = document.createElement("div");
    res.className = "quiz-result " + (passed ? "pass" : "fail");
    res.innerHTML =
      '<div class="rq-score">' + score + " / " + total + "</div>" +
      '<div class="rq-msg">' + (passed
        ? "Understood. This concept is now marked ✓ in your atlas. Spacing tip: revisit it in a few days to lock it into long-term memory."
        : "Close — re-read the lesson and try again. The gaps above are exactly what to focus on.") + "</div>" +
      '<div class="rq-actions">' +
        '<button class="btn-secondary" data-action="retry">Retry quiz</button>' +
        (passed ? '<button class="btn-primary" data-action="next">Explore connections →</button>' : '<button class="btn-primary" data-action="reread">Re-read lesson</button>') +
      "</div>";
    mount.appendChild(res);
    res.scrollIntoView({ behavior: "smooth", block: "nearest" });

    res.querySelector("[data-action=retry]").addEventListener("click", function () {
      renderPanel(n, "quiz"); // fresh mount
    });
    var nextBtn = res.querySelector("[data-action=next]");
    if (nextBtn) nextBtn.addEventListener("click", function () { switchTab(n, "learn"); document.querySelector(".connections").scrollIntoView({ behavior: "smooth" }); });
    var rereadBtn = res.querySelector("[data-action=reread]");
    if (rereadBtn) rereadBtn.addEventListener("click", function () { switchTab(n, "learn"); });
  }

  function passMark(total) { return Math.max(1, Math.ceil(total * 0.75)); }

  function shuffled(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function setKnown(id, on) {
    if (on) progress.known[id] = Date.now(); else delete progress.known[id];
    refreshUnderstoodClasses();
    updateProgressLine();
    if (pathState.active) highlightPath();
    saveProgress();
    if (on) setTimeout(maybeNudgeSave, 800);
  }

  // hex + alpha -> rgba
  function hexA(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (x) { return x + x; }).join("");
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  // ==========================================================
  //  TOP BAR ACTIONS
  // ==========================================================
  document.getElementById("btn-fit").addEventListener("click", function () {
    if (pathViewOn()) fitVisible(MAX_PATH_ZOOM);
    else cy.animate({ fit: { padding: 60 } }, { duration: 400 });
  });
  document.getElementById("btn-reset").addEventListener("click", function () {
    clusterOff = {};
    legendEl.querySelectorAll(".legend-item").forEach(function (i) { i.classList.remove("off"); });
    applyClusterFilter();
    clearHighlight();
    searchEl.value = ""; clearBtn.style.display = "none"; resultsEl.classList.remove("open");
    if (pathViewOn()) { layoutPathView(); highlightPath(); }
    else { if (pathState.active) highlightPath(); runMainLayout(); }
  });

  // fit once layout settles — robust against races, with a fallback
  var didInitialFit = false;
  function initialFit() {
    if (didInitialFit) return;
    didInitialFit = true;
    if (!pathViewOn()) cy.animate({ fit: { padding: 50 } }, { duration: 500 });
  }
  cy.one("layoutstop", initialFit);
  setTimeout(initialFit, 1600); // fallback if layoutstop was missed

  // keep the graph framed when the window resizes (e.g. panel opens/closes, device rotates)
  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { cy.resize(); }, 150);
  });

  // ==========================================================
  //  LEARNING PATH (goal-driven)
  //  A path is a topological ordering of the prerequisites of a goal,
  //  skipping what's already mastered. Uses the prereq/enables/partof DAG.
  // ==========================================================
  // showAll: the user asked to see the whole atlas while a path is active.
  var pathState = { active: false, goal: null, sequence: [], showAll: false };

  function pathViewOn() { return pathState.active && !pathState.showAll; }

  var clusterRank = {};
  Object.keys(CL).forEach(function (c, i) { clusterRank[c] = i; });

  // ordering adjacency (prereq/enables/partof imply "learn source before target")
  var ORDER_TYPES = { prereq: 1, enables: 1, partof: 1 };
  var fwdOrder = {}, revOrder = {};
  // revDep: real dependencies only (prereq/enables). Curated paths may put an
  // overview before its parts, so they ignore "partof" (same rule as the validator).
  var revDep = {};
  ATLAS.nodes.forEach(function (n) { fwdOrder[n.id] = []; revOrder[n.id] = []; revDep[n.id] = []; });
  validEdges.forEach(function (e) {
    if (ORDER_TYPES[e.type]) { fwdOrder[e.source].push(e.target); revOrder[e.target].push(e.source); }
    if (e.type === "prereq" || e.type === "enables") revDep[e.target].push(e.source);
  });

  // Curated, role-based paths (data/90-paths.js): an explicit, ordered list of
  // steps — never expanded with prerequisites.
  var curatedById = {};
  (ATLAS.paths || []).forEach(function (p) { curatedById[p.id] = p; });

  function firstUnmastered(seq) {
    for (var i = 0; i < seq.length; i++) if (!isDone(seq[i])) return seq[i];
    return null;
  }

  function computeSequence(goal) {
    if (goal.type === "curated") {
      var cp = curatedById[goal.id];
      return cp ? cp.steps.filter(function (id) { return nodeById[id]; }) : [];
    }
    var targets;
    if (goal.type === "all") targets = ATLAS.nodes.map(function (n) { return n.id; });
    else if (goal.type === "cluster") targets = ATLAS.nodes.filter(function (n) { return n.cluster === goal.id; }).map(function (n) { return n.id; });
    else targets = [goal.id];

    // required = targets + all their prerequisites (ancestors along ordering edges)
    var required = {};
    var stack = targets.slice();
    targets.forEach(function (id) { required[id] = 1; });
    while (stack.length) {
      var n = stack.pop();
      (revOrder[n] || []).forEach(function (s) { if (!required[s]) { required[s] = 1; stack.push(s); } });
    }
    var ids = Object.keys(required);

    // Kahn topological sort, tie-broken by cluster order then label (coherent reading)
    var indeg = {};
    ids.forEach(function (id) { indeg[id] = 0; });
    ids.forEach(function (s) { fwdOrder[s].forEach(function (t) { if (required[t]) indeg[t]++; }); });
    function pr(a, b) {
      var na = nodeById[a], nb = nodeById[b];
      if (clusterRank[na.cluster] !== clusterRank[nb.cluster]) return clusterRank[na.cluster] - clusterRank[nb.cluster];
      return na.label < nb.label ? -1 : (na.label > nb.label ? 1 : 0);
    }
    var ready = ids.filter(function (id) { return indeg[id] === 0; });
    var seq = [];
    while (ready.length) {
      ready.sort(pr);
      var cur = ready.shift();
      seq.push(cur);
      fwdOrder[cur].forEach(function (t) { if (required[t]) { indeg[t]--; if (indeg[t] === 0) ready.push(t); } });
    }
    if (seq.length < ids.length) ids.forEach(function (id) { if (seq.indexOf(id) === -1) seq.push(id); });
    return seq;
  }

  // ---------- path-only graph view ----------
  // Entering path view hides everything off the path and lays the path out as
  // left-to-right layers (a node sits one column right of its deepest
  // prerequisite on the path). The full-atlas positions are saved on entry and
  // restored on exit, so leaving is instant and the atlas looks as it did.
  var fullPositions = null;
  var PV = { col: 200, row: 80, maxRows: 8, sub: 160, bandGap: 140 };
  var MAX_PATH_ZOOM = 1.1;   // don't blow a 3-node path up to fill the screen

  // Positions for the path-only view. Nodes are layered by prerequisite depth
  // (a node sits one layer after its deepest prerequisite on the path). Layers
  // run left to right; when that gets too wide for the screen they wrap into
  // bands that read like lines of text, so a long chain still fits legibly.
  function pathLayoutPositions(seq, view, rev) {
    var onPath = {}, idx = {};
    seq.forEach(function (id, i) { onPath[id] = 1; idx[id] = i; });
    // seq is topologically ordered, so each node's prereqs are already placed
    var depth = {};
    seq.forEach(function (id) {
      var d = 0;
      rev[id].forEach(function (p) { if (onPath[p] && depth[p] != null) d = Math.max(d, depth[p] + 1); });
      depth[id] = d;
    });
    var layers = [];
    seq.forEach(function (id) { (layers[depth[id]] = layers[depth[id]] || []).push(id); });

    // 1) lay each layer out locally: order by where its prereqs sit (fewer
    //    crossings), then by step; wrap tall layers into sub-columns
    var local = {}, blocks = [];
    layers.forEach(function (layer) {
      var bary = {};
      layer.forEach(function (id) {
        var ys = rev[id].filter(function (p) { return local[p]; }).map(function (p) { return local[p].y; });
        bary[id] = ys.length ? ys.reduce(function (a, b) { return a + b; }, 0) / ys.length : 0;
      });
      layer.sort(function (a, b) { return (bary[a] - bary[b]) || (idx[a] - idx[b]); });
      var chunks = Math.ceil(layer.length / PV.maxRows);
      var per = Math.ceil(layer.length / chunks);
      for (var c = 0; c < chunks; c++) {
        var part = layer.slice(c * per, (c + 1) * per);
        part.forEach(function (id, r) { local[id] = { x: c * PV.sub, y: (r - (part.length - 1) / 2) * PV.row }; });
      }
      blocks.push({ ids: layer, width: (chunks - 1) * PV.sub, height: (per - 1) * PV.row });
    });

    // 2) pack layers into bands; pick the band count that lets the whole path
    //    be shown at the largest (capped) zoom; extra bands must earn >15%
    function pack(nBands) {
      var perBand = Math.ceil(blocks.length / nBands), bands = [];
      for (var i = 0; i < blocks.length; i += perBand) bands.push(blocks.slice(i, i + perBand));
      var w = 0, h = 0;
      bands.forEach(function (b) {
        b.w = b.reduce(function (a, bl) { return a + bl.width; }, 0) + (b.length - 1) * PV.col;
        b.h = Math.max.apply(null, b.map(function (bl) { return bl.height; }));
        w = Math.max(w, b.w); h += b.h;
      });
      h += (bands.length - 1) * PV.bandGap;
      return { bands: bands, zoom: Math.min(view.w / (w + PV.col), view.h / (h + 2 * PV.row), MAX_PATH_ZOOM) };
    }
    var best = pack(1);
    for (var n = 2; n <= blocks.length; n++) { var t = pack(n); if (t.zoom > best.zoom * 1.15) best = t; }

    var pos = {}, y = 0;
    best.bands.forEach(function (band) {
      var x = 0, mid = y + band.h / 2;
      band.forEach(function (bl) {
        bl.ids.forEach(function (id) { pos[id] = { x: x + local[id].x, y: mid + local[id].y }; });
        x += bl.width + PV.col;
      });
      y += band.h + PV.bandGap;
    });
    return pos;
  }

  function layoutPathView() {
    var box = document.getElementById("cy");
    var rev = pathState.goal && pathState.goal.type === "curated" ? revDep : revOrder;
    var pos = pathLayoutPositions(pathState.sequence, { w: box.clientWidth || 800, h: box.clientHeight || 600 }, rev);
    cy.nodes().stop(true);   // drop any in-flight animation so the new one wins
    cy.nodes(":visible").layout({
      name: "preset", positions: function (n) { return pos[n.id()]; },
      fit: false, animate: true, animationDuration: 550,
      stop: function () { fitVisible(MAX_PATH_ZOOM); },
    }).run();
  }

  // Frame the visible elements, keeping clear of the legend and not zooming
  // in past maxZoom.
  function fitVisible(maxZoom) {
    var eles = cy.elements(":visible");
    if (eles.empty()) return;
    var bb = eles.boundingBox(), box = document.getElementById("cy");
    var W = box.clientWidth, H = box.clientHeight, pad = 50;
    var left = legendEl.offsetWidth ? legendEl.offsetLeft + legendEl.offsetWidth + 10 : pad;
    var z = Math.min((W - left - pad) / bb.w, (H - 2 * pad) / bb.h, maxZoom || 2);
    var cx = left + (W - left - pad) / 2, cyy = H / 2;
    cy.animate({ zoom: z, pan: { x: cx - z * (bb.x1 + bb.w / 2), y: cyy - z * (bb.y1 + bb.h / 2) } }, { duration: 400 });
  }

  function enterPathView() {
    if (fullPositions) { applyClusterFilter(); layoutPathView(); return; }  // switching paths
    whenSettled(function () {
      if (!pathViewOn() || fullPositions) return;   // exited/re-entered while waiting
      fullPositions = {};
      cy.nodes().forEach(function (n) { var p = n.position(); fullPositions[n.id()] = { x: p.x, y: p.y }; });
      applyClusterFilter();
      layoutPathView();
    });
  }

  function leavePathView() {
    applyClusterFilter();
    if (!fullPositions) return;
    var saved = fullPositions;
    fullPositions = null;
    cy.nodes().stop(true);   // drop any in-flight path-layout animation
    cy.nodes().layout({
      name: "preset", positions: function (n) { return saved[n.id()]; },
      fit: true, padding: 50, animate: true, animationDuration: 550,
    }).run();
  }

  // true = only the path, false = full atlas (path still highlighted)
  function setPathView(only) {
    pathState.showAll = !only;
    if (pathViewOn()) enterPathView(); else leavePathView();
    highlightPath();
    if (!panel.hidden && !currentNodeId) renderPathItinerary();
  }

  function highlightPath() {
    clearHighlight();
    if (!pathState.active) return;
    var set = cy.collection();
    pathState.sequence.forEach(function (id) { set = set.union(cy.getElementById(id)); });
    cy.elements().addClass("faded");
    set.removeClass("faded").addClass("path-on");
    set.connectedEdges().forEach(function (ed) {
      if (set.contains(ed.source()) && set.contains(ed.target())) ed.removeClass("faded").addClass("hl");
    });
    var next = firstUnmastered(pathState.sequence);
    if (next) cy.getElementById(next).addClass("path-next");
  }

  function goalLabel() {
    var g = pathState.goal;
    if (!g) return "";
    if (g.type === "all") return "The complete curriculum";
    if (g.type === "cluster") return CL[g.id] ? CL[g.id].label : g.id;
    if (g.type === "curated") return curatedById[g.id] ? curatedById[g.id].label : g.id;
    return nodeById[g.id] ? nodeById[g.id].label : g.id;
  }

  function isValidGoal(g) {
    if (!g) return false;
    if (g.type === "all") return true;
    if (g.type === "curated") return !!curatedById[g.id];
    if (g.type === "cluster") return !!CL[g.id];
    return !!nodeById[g.id];
  }

  function openPathPanel() {
    panel.hidden = false; scrim.hidden = false; panelScroll.scrollTop = 0;
    if (pathState.active) renderPathItinerary();
    else if (isValidGoal(progress.path)) startPath(progress.path);
    else renderPathSetup();
    setPathBtn();
  }

  function startPath(goal) {
    pathState.active = true;
    pathState.goal = goal;
    pathState.sequence = computeSequence(goal);
    pathState.showAll = false;
    progress.path = goal; saveProgress();
    enterPathView();
    highlightPath();
    renderPathItinerary();
    setPathBtn();
  }

  function exitPath() {
    pathState.active = false; pathState.goal = null; pathState.sequence = []; pathState.showAll = false;
    delete progress.path; saveProgress();
    leavePathView();
    clearHighlight();
    closePanel();
    setPathBtn();
  }

  function renderPathSetup() {
    panel.hidden = false; scrim.hidden = false; panelScroll.scrollTop = 0;
    currentNodeId = "";
    var html = "";
    html += '<span class="p-cluster-tag" style="background:var(--accent-soft);color:var(--accent)">◆ Learning Path</span>';
    html += '<h2 class="p-title">Chart your path</h2>';
    html += '<p class="p-short">Start with the path that fits your role. Each one covers just what that role needs.</p>';

    html += '<div class="path-goal-group"><h4>Paths by role</h4><div class="role-paths">';
    (ATLAS.paths || []).forEach(function (p) {
      var seq = computeSequence({ type: "curated", id: p.id });
      var done = seq.filter(isDone).length;
      html += '<button class="role-card" data-gtype="curated" data-gid="' + escapeHtml(p.id) + '">' +
        '<span class="rc-title">' + escapeHtml(p.label) + "</span>" +
        '<span class="rc-audience">' + escapeHtml(p.audience || "") + "</span>" +
        '<span class="rc-meta">' + seq.length + " steps" + (done ? " · " + done + " already done" : "") + "</span>" +
        "</button>";
    });
    html += "</div></div>";

    html += '<div class="path-build-own"><h3>Or build your own path</h3>' +
      '<p>Pick any destination and the atlas includes <em>everything</em> it depends on, math included, in order.</p>';

    html += '<div class="path-goal-group"><h4>Master a whole domain</h4><div class="path-goals">';
    Object.keys(CL).forEach(function (cid) {
      var c = CL[cid];
      html += '<button class="path-goal-btn" data-gtype="cluster" data-gid="' + cid + '"><span class="dot" style="background:' + c.color + '"></span>' + escapeHtml(c.label) + "</button>";
    });
    html += "</div></div>";

    html += '<div class="path-goal-group"><h4>Or reach one concept</h4>' +
      '<input id="path-goal-search" type="text" autocomplete="off" spellcheck="false" ' +
      'placeholder="Search for a role, domain or concept — e.g. product, agents, evals…" />' +
      '<ul id="path-goal-results" class="goal-results" role="listbox"></ul></div>';

    html += '<div class="path-goal-group"><button class="btn-secondary" data-gtype="all" style="width:100%">The complete curriculum — everything, in order</button></div>';
    html += "</div>";

    panelScroll.innerHTML = html;
    panelScroll.querySelectorAll(".path-goal-btn").forEach(function (b) {
      b.addEventListener("click", function () { startPath({ type: "cluster", id: b.getAttribute("data-gid") }); });
    });
    panelScroll.querySelector("[data-gtype=all]").addEventListener("click", function () { startPath({ type: "all" }); });
    panelScroll.querySelectorAll(".role-card").forEach(function (b) {
      b.addEventListener("click", function () { startPath({ type: "curated", id: b.getAttribute("data-gid") }); });
    });
    wireGoalSearch(panelScroll.querySelector("#path-goal-search"), panelScroll.querySelector("#path-goal-results"));
  }

  // Type-ahead for choosing a path goal: role paths, then domains, then concepts.
  // Each row shows how many steps that path would take.
  function wireGoalSearch(input, list) {
    var active = -1, items = [];

    function render() {
      var q = input.value.trim();
      active = -1;
      if (!q) { list.innerHTML = ""; items = []; return; }
      var terms = AtlasSearch.terms(q);
      var html = "";
      (ATLAS.paths || []).forEach(function (p) {
        var hay = p.label + " " + (p.audience || "") + " " + (p.blurb || "");
        if (!terms.every(function (t) { return AtlasSearch.matchRanges(hay, t).length; })) return;
        html += '<li data-gtype="curated" data-gid="' + escapeHtml(p.id) + '"><div class="r-row">' +
          '<span class="dot role-dot"></span>' +
          '<span class="r-label">' + markMatches(p.label, q) + "</span>" +
          '<span class="r-cluster">Role path · ' + p.steps.length + " steps</span></div>" +
          '<div class="r-snippet">' + markMatches(p.audience || "", q) + "</div></li>";
      });
      Object.keys(CL).forEach(function (cid) {
        var c = CL[cid];
        if (!terms.every(function (t) { return AtlasSearch.matchRanges(c.label, t).length; })) return;
        var steps = computeSequence({ type: "cluster", id: cid }).length;
        html += '<li data-gtype="cluster" data-gid="' + cid + '"><div class="r-row">' +
          '<span class="dot" style="background:' + c.color + '"></span>' +
          '<span class="r-label">' + markMatches(c.label, q) + "</span>" +
          '<span class="r-cluster">Whole domain · ' + steps + " steps</span></div></li>";
      });
      var hits = searchIndex.search(q, { limit: 8 });
      html += hits.map(function (m) {
        var steps = computeSequence({ type: "node", id: m.id }).length;
        return resultItemHtml(m, q, steps + (steps === 1 ? " step" : " steps")).replace("<li ", '<li data-gtype="node" data-gid="' + m.id + '" ');
      }).join("");
      list.innerHTML = html || '<li class="r-empty">Nothing in the atlas mentions “' + escapeHtml(q) + "”.</li>";
      items = [].slice.call(list.querySelectorAll("li[data-gtype]"));
      items.forEach(function (li) { li.addEventListener("click", function () { choose(li); }); });
    }

    function choose(li) {
      startPath({ type: li.getAttribute("data-gtype"), id: li.getAttribute("data-gid") });
    }

    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, items.length - 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); }
      else if (e.key === "Enter") { var li = items[active] || items[0]; if (li) choose(li); return; }
      else return;
      items.forEach(function (it, i) { it.classList.toggle("active", i === active); });
      if (items[active]) items[active].scrollIntoView({ block: "nearest" });
    });
  }

  function renderPathItinerary() {
    panel.hidden = false; scrim.hidden = false;
    currentNodeId = "";
    var seq = pathState.sequence;
    var passed = seq.filter(isUnderstood).length;
    var knownN = seq.filter(isKnown).length;
    var done = passed + knownN;
    var next = firstUnmastered(seq);
    var pct = seq.length ? Math.round((done / seq.length) * 100) : 0;

    var html = "";
    html += '<span class="p-cluster-tag" style="background:var(--accent-soft);color:var(--accent)">◆ Learning Path</span>';
    html += '<h2 class="p-title">' + escapeHtml(goalLabel()) + "</h2>";
    var cp = pathState.goal.type === "curated" && curatedById[pathState.goal.id];
    if (cp) html += '<p class="p-short">' + escapeHtml(cp.blurb || "") + "</p>";
    var passedPct = seq.length ? (passed / seq.length) * 100 : 0;
    html += '<div class="path-progress"><div class="path-progress-bar">' +
              '<span style="width:' + passedPct + '%"></span>' +
              '<span class="known" style="width:' + (pct - passedPct) + '%"></span></div>' +
            '<div class="path-progress-label">' + done + " of " + seq.length + " done · " + pct + "%" +
              (knownN ? " — " + passed + " passed, " + knownN + " already known" : "") + "</div></div>";

    if (next) {
      html += '<button class="btn-primary" data-action="path-next" style="width:100%;margin-bottom:20px">' +
        (done ? "Continue → " : "Start → ") + escapeHtml(nodeById[next].label) + "</button>";
    } else {
      html += '<div class="p-status learned" style="margin-bottom:20px">✓ Path complete' +
        (knownN ? " — " + knownN + " step" + (knownN === 1 ? " is" : "s are") + " marked known; take " + (knownN === 1 ? "its quiz" : "their quizzes") + " to confirm." : " — every concept mastered. Revisit any node to keep it fresh.") + "</div>";
    }

    html += '<ol class="path-list">';
    seq.forEach(function (id, i) {
      var n = nodeById[id];
      var st = isUnderstood(id) ? "done" : isKnown(id) ? "known" : (id === next ? "next" : "todo");
      html += '<li class="path-item ' + st + '" data-id="' + id + '"' + (st === "known" ? ' title="Marked as already known"' : "") + ">" +
        '<span class="pi-num">' + (st === "done" ? "✓" : st === "known" ? "◐" : (i + 1)) + "</span>" +
        clusterDot(n.cluster) +
        '<span class="pi-label">' + escapeHtml(n.label) + "</span></li>";
    });
    html += "</ol>";

    html += '<label class="path-view-toggle"><input type="checkbox" data-action="path-only"' + (pathViewOn() ? " checked" : "") + " />" +
            "<span>Show only this path on the graph</span></label>";
    html += '<div class="learn-actions"><button class="btn-secondary" data-action="path-change">Change goal</button>' +
            '<button class="btn-secondary" data-action="path-exit">Exit path</button></div>';

    panelScroll.innerHTML = html;
    panelScroll.scrollTop = 0;
    highlightPath();

    panelScroll.querySelectorAll(".path-item").forEach(function (li) {
      li.addEventListener("click", function () { var id = li.getAttribute("data-id"); focusNode(id, { center: true }); openPanel(id); });
    });
    var nb = panelScroll.querySelector("[data-action=path-next]");
    if (nb) nb.addEventListener("click", function () { var nx = firstUnmastered(pathState.sequence); if (nx) { focusNode(nx, { center: true }); openPanel(nx); } });
    panelScroll.querySelector("[data-action=path-change]").addEventListener("click", renderPathSetup);
    panelScroll.querySelector("[data-action=path-exit]").addEventListener("click", exitPath);
    panelScroll.querySelector("[data-action=path-only]").addEventListener("change", function () { setPathView(this.checked); });
  }

  function setPathBtn() {
    var btn = document.getElementById("btn-path");
    if (!btn) return;
    btn.classList.toggle("on", pathState.active);
    btn.textContent = pathState.active ? "◆ Path on" : "◆ Learning Path";
    searchEl.placeholder = pathState.active
      ? "Search your path — names and lesson content…"
      : "Search names and lesson content — e.g. attention, cold start, feedback loops…";
    searchWholeAtlas = false;
    if (searchEl.value.trim()) runSearch();
  }

  document.getElementById("btn-path").addEventListener("click", openPathPanel);
  setPathBtn();

  // ==========================================================
  //  PROGRESS: FILE SYNC, EXPORT / IMPORT / RESET
  //  localStorage is the working copy. On top of it, the user can connect a
  //  progress file (Chromium: File System Access API) that every change is
  //  autosaved to, and that a later visit — or a browser with cleared storage —
  //  can resume from. Elsewhere, export/import a backup file by hand.
  // ==========================================================
  var progressLineBtn = document.getElementById("progress-line");
  var progressMenu = document.getElementById("progress-menu");
  var importFile = document.getElementById("import-file");
  var syncBtn = document.getElementById("btn-sync");
  var toastEl = document.getElementById("toast");
  var FS = window.AtlasFileSync || { supported: false };
  var NUDGED_KEY = "atlas.sync.nudged.v1";
  var TOUR_KEY = "atlas.tour.v1";

  // off | saving | saved | needs-access | error   (unsupported browsers stay "off")
  var sync = { state: "off", name: null, savedAt: null };

  function countUnderstood() {
    return Object.keys(progress.understood).filter(function (k) { return nodeById[k]; }).length;
  }
  function hasAnyProgress() {
    return countUnderstood() > 0 || Object.keys(progress.known).length > 0 || Object.keys(progress.best).length > 0 || !!progress.path;
  }

  function progressPayload() {
    return {
      app: "ai-engineering-atlas",
      kind: "progress",
      version: 1,
      exportedAt: new Date().toISOString(),
      understoodCount: countUnderstood(),
      totalConcepts: ATLAS.nodes.length,
      progress: progress,
    };
  }

  // Merge incoming progress into ours: union of understood, best quiz score
  // wins. Their path is adopted only if we have none and adoptPath is true.
  // Returns null if it isn't progress data.
  function mergeProgress(data, adoptPath) {
    var inc = (data && data.progress) ? data.progress : data;
    if (!inc || (typeof inc.understood !== "object" && typeof inc.best !== "object" && typeof inc.known !== "object")) return null;
    var added = 0, skipped = 0;
    if (inc.understood && typeof inc.understood === "object") {
      Object.keys(inc.understood).forEach(function (id) {
        if (!nodeById[id]) { skipped++; return; }
        if (!progress.understood[id]) { progress.understood[id] = inc.understood[id] || Date.now(); added++; }
      });
    }
    if (inc.known && typeof inc.known === "object") {
      Object.keys(inc.known).forEach(function (id) {
        if (nodeById[id] && !progress.understood[id] && !progress.known[id]) { progress.known[id] = inc.known[id] || Date.now(); added++; }
      });
    }
    // understood wins over known
    Object.keys(progress.understood).forEach(function (id) { delete progress.known[id]; });
    if (inc.best && typeof inc.best === "object") {
      Object.keys(inc.best).forEach(function (id) {
        if (!nodeById[id]) return;
        var v = +inc.best[id];
        if (!isNaN(v) && (progress.best[id] == null || v > progress.best[id])) progress.best[id] = v;
      });
    }
    if (adoptPath && !progress.path && isValidGoal(inc.path)) progress.path = inc.path;
    refreshUnderstoodClasses();
    updateProgressLine();
    if (pathState.active) highlightPath();
    return { added: added, skipped: skipped };
  }

  // ---------- file sync ----------
  var writeTimer = null;
  // (sync is undefined until this section runs; saveProgress can fire earlier)
  function isSyncing() { return !!sync && (sync.state === "saved" || sync.state === "saving" || sync.state === "error"); }

  // called from saveProgress() on every change
  function scheduleFileWrite() {
    if (!isSyncing()) return;
    clearTimeout(writeTimer);
    writeTimer = setTimeout(writeNow, 500);
  }

  function writeNow() {
    clearTimeout(writeTimer);
    setSync("saving");
    return FS.write(JSON.stringify(progressPayload(), null, 2)).then(function () {
      sync.savedAt = new Date();
      setSync("saved");
    }).catch(function (e) {
      // permission revoked / not granted this session → needs a click; anything else → retryable error
      setSync(e && (e.name === "NotAllowedError" || e.name === "SecurityError") ? "needs-access" : "error");
    });
  }

  // Merge a file's text into our progress. Empty file → nothing to merge.
  // A non-progress file is only overwritten if the user says so.
  function mergeFileText(text, name) {
    if (!text || !text.trim()) return { added: 0, skipped: 0 };
    var data = null;
    try { data = JSON.parse(text); } catch (e) {}
    // Local state is newer unless this browser has nothing (the recovery case),
    // so only then take the file's learning path too.
    var r = data && mergeProgress(data, !hasAnyProgress());
    if (r) { saveLocal(); return r; }
    return confirm("“" + name + "” doesn't look like an Atlas progress file.\n\nReplace its contents with your progress?") ? { added: 0, skipped: 0 } : null;
  }

  function resumedMessage(r, name) {
    return r.added
      ? "Loaded " + r.added + " concept" + (r.added === 1 ? "" : "s") + " from " + name + ". Changes now save there automatically."
      : "Progress now saves to " + name + " automatically.";
  }

  // The user declined to overwrite the file they picked: go back to whatever
  // was connected before (or nothing), rather than silently stop saving.
  function revertPick() {
    var wasState = sync.state;
    FS.revert().then(function (name) {
      sync.name = name;
      setSync(name ? (wasState === "off" ? "saved" : wasState) : "off");
    });
  }

  function connectFile() {
    FS.connectNew().then(function (f) {
      var r = mergeFileText(f.text, f.name);
      if (!r) { revertPick(); return; }
      sync.name = f.name;
      writeNow();
      showToast(resumedMessage(r, f.name));
    }).catch(pickerError);
  }

  function openFile() {
    if (!FS.supported) { importFile.click(); return; }
    FS.openExisting().then(function (f) {
      var r = mergeFileText(f.text, f.name);
      if (!r) { revertPick(); return; }
      sync.name = f.name;
      return FS.requestAccess().then(function (ok) {
        if (ok) { writeNow(); showToast(resumedMessage(r, f.name)); }
        else setSync("needs-access");
      });
    }).catch(pickerError);
  }

  // After a reload the browser needs one click to let us write again.
  function reconnect() {
    FS.requestAccess().then(function (ok) {
      if (!ok) { setSync("needs-access"); return; }
      return FS.read().then(function (text) {
        var r = mergeFileText(text, sync.name);
        if (!r) { stopSync(); return; }
        writeNow();
        showToast(r.added ? resumedMessage(r, sync.name) : "Picked up where you left off — saving to " + sync.name + ".");
      });
    }).catch(function () { setSync("error"); });
  }

  function stopSync() {
    FS.disconnect();
    sync.name = null; sync.savedAt = null;
    setSync("off");
  }

  function pickerError(e) {
    if (e && e.name === "AbortError") return;   // user cancelled the picker
    alert("Couldn't use that file" + (e && e.message ? ": " + e.message : "."));
  }

  // ---------- header chip ----------
  function setSync(state) {
    sync.state = state;
    syncBtn.setAttribute("data-state", FS.supported ? state : "unsupported");
    syncBtn.classList.toggle("warn", !FS.supported ? false : state === "off" && hasAnyProgress());
    var label, title;
    if (!FS.supported) {
      label = "Back up";
      title = "Your progress is stored in this browser. Download a backup file so it's never lost.";
    } else if (state === "off") {
      label = "Save to file";
      title = "Progress is only in this browser right now. Pick a file and it'll save there automatically.";
    } else if (state === "saving") {
      label = "Saving…"; title = "Saving to " + sync.name;
    } else if (state === "saved") {
      label = "Saved";
      title = "Autosaving to " + sync.name + (sync.savedAt ? " · last saved " + sync.savedAt.toLocaleTimeString() : "");
    } else if (state === "needs-access") {
      label = "Resume progress";
      title = "Click to let the atlas read and save " + sync.name + " again (browsers ask once per visit).";
    } else {
      label = "Save failed"; title = "Saving to " + sync.name + " failed. Click to try again.";
    }
    syncBtn.querySelector(".sync-label").textContent = label;
    syncBtn.title = title;
    if (!progressMenu.hidden) renderProgressMenu();
  }

  syncBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (sync.state === "needs-access") { reconnect(); return; }
    if (sync.state === "error") { writeNow(); return; }
    toggleProgressMenu(syncBtn);
  });

  // ---------- progress menu ----------
  function renderProgressMenu() {
    var h = '<div class="pm-section">Progress file</div>';
    if (!FS.supported) {
      h += '<p class="pm-note">This browser can’t save to a file automatically (Chrome or Edge can). Download a backup now and then, and load it here if this browser’s data is ever cleared.</p>' +
        item("export", "⭳", "Download a backup") +
        item("import", "⭱", "Load a backup file…");
    } else if (sync.state === "off") {
      h += '<p class="pm-note">Right now your progress lives only in this browser. Save it to a file and every change is saved there automatically — and you can resume from it anywhere.</p>' +
        item("connect", "💾", "Save progress to a file…", "primary") +
        item("open", "📂", "Continue from an existing file…");
    } else {
      h += '<p class="pm-note">' + (sync.state === "needs-access"
        ? "Your progress file is <strong>" + escapeHtml(sync.name) + "</strong>. Your browser needs a click to let the atlas use it again."
        : "Autosaving to <strong>" + escapeHtml(sync.name) + "</strong>" + (sync.savedAt ? " · last saved " + sync.savedAt.toLocaleTimeString() : "") + ".") + "</p>";
      if (sync.state === "needs-access") h += item("reconnect", "↻", "Resume from " + sync.name, "primary");
      h += item("connect", "💾", "Save to a different file…") +
        item("open", "📂", "Continue from a different file…") +
        item("stop", "⏻", sync.state === "needs-access" ? "Forget this file" : "Stop saving to this file");
    }
    h += '<div class="pm-divider"></div>';
    if (FS.supported) h += item("export", "⭳", "Download a copy") + item("import", "⭱", "Import & merge a file…");
    h += item("reset", "↺", "Reset progress", "danger");
    progressMenu.innerHTML = h;
  }
  function item(act, icon, label, cls) {
    return '<button type="button" role="menuitem" data-act="' + act + '"' + (cls ? ' class="' + cls + '"' : "") + ">" +
      '<span class="pm-icon" aria-hidden="true">' + icon + "</span>" + escapeHtml(label) + "</button>";
  }

  function toggleProgressMenu(anchor) {
    if (!progressMenu.hidden && progressMenu.__anchor === anchor) { progressMenu.hidden = true; return; }
    renderProgressMenu();
    progressMenu.__anchor = anchor;
    progressMenu.hidden = false;
    var r = anchor.getBoundingClientRect(), w = progressMenu.offsetWidth;
    progressMenu.style.top = (r.bottom + 8) + "px";
    progressMenu.style.left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12)) + "px";
  }

  progressLineBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleProgressMenu(progressLineBtn); });
  document.addEventListener("click", function (e) {
    if (!progressMenu.hidden && !e.target.closest("#progress-menu")) progressMenu.hidden = true;
  });
  progressMenu.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-act]");
    if (!b) return;
    progressMenu.hidden = true;
    var act = b.getAttribute("data-act");
    if (act === "connect") connectFile();
    else if (act === "open") openFile();
    else if (act === "reconnect") reconnect();
    else if (act === "stop") stopSync();
    else if (act === "export") exportProgress();
    else if (act === "import") importFile.click();
    else if (act === "reset") resetProgress();
  });

  // ---------- toast ----------
  // showToast(message, [{ label, primary, onClick }], { sticky })
  var toastTimer = null;
  function showToast(msg, actions, opts) {
    opts = opts || {};
    clearTimeout(toastTimer);
    toastEl.innerHTML = '<span class="toast-msg">' + escapeHtml(msg) + "</span>" +
      (actions || []).map(function (a, i) {
        return '<button type="button" data-i="' + i + '"' + (a.primary ? ' class="primary"' : "") + ">" + escapeHtml(a.label) + "</button>";
      }).join("") +
      '<button type="button" class="toast-x" aria-label="Dismiss">✕</button>';
    toastEl.hidden = false;
    toastEl.querySelectorAll("button[data-i]").forEach(function (b) {
      b.addEventListener("click", function () { hideToast(); actions[+b.getAttribute("data-i")].onClick(); });
    });
    toastEl.querySelector(".toast-x").addEventListener("click", function () { hideToast(); if (opts.onDismiss) opts.onDismiss(); });
    if (!opts.sticky) toastTimer = setTimeout(hideToast, 6000);
  }
  function hideToast() { clearTimeout(toastTimer); toastEl.hidden = true; }

  // First time something is learned and nothing is backing it up: suggest it once.
  function maybeNudgeSave() {
    if (isSyncing() || sync.state === "needs-access") return;
    try { if (localStorage.getItem(NUDGED_KEY)) return; localStorage.setItem(NUDGED_KEY, "1"); } catch (e) { return; }
    showToast(FS.supported
      ? "Nice! Your progress is saved in this browser only. Save it to a file and it’ll be kept safe automatically."
      : "Nice! Your progress is saved in this browser only. Download a backup so it’s never lost.",
      [FS.supported
        ? { label: "Save to a file", primary: true, onClick: connectFile }
        : { label: "Download backup", primary: true, onClick: exportProgress }],
      { sticky: true });
  }

  // ---------- startup: resume a remembered file, or offer recovery ----------
  function afterTour(fn) {
    var seen = false;
    try { seen = !!localStorage.getItem(TOUR_KEY); } catch (e) { seen = true; }
    if (seen) fn();
    else document.addEventListener("atlas:tour-end", function once() {
      document.removeEventListener("atlas:tour-end", once);
      fn();
    });
  }

  function offerRecovery() {
    if (hasAnyProgress() || isSyncing()) return;
    showToast("Been here before? If you have a progress file, open it to pick up where you left off.",
      [{ label: FS.supported ? "Open my progress file" : "Load a backup", primary: true, onClick: openFile }],
      { sticky: true });
  }

  setSync("off");
  if (FS.supported) {
    FS.restore().then(function (r) {
      if (!r) { afterTour(offerRecovery); return; }
      sync.name = r.name;
      if (r.permission === "granted") {
        // browser kept our access (e.g. "allow on every visit"): resume silently
        FS.read().then(function (text) {
          var m = mergeFileText(text, r.name);
          if (!m) { stopSync(); return; }
          writeNow();
          if (m.added) showToast(resumedMessage(m, r.name));
        }).catch(function () { setSync("needs-access"); });
      } else {
        setSync("needs-access");
        afterTour(function () {
          showToast("Welcome back! Resume from your progress file, " + r.name + "?",
            [{ label: "Resume", primary: true, onClick: reconnect }], { sticky: true });
        });
      }
    });
  } else {
    afterTour(offerRecovery);
  }

  // ---------- export / import / reset ----------
  importFile.addEventListener("change", function () {
    var f = importFile.files && importFile.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try { importProgress(JSON.parse(reader.result)); }
      catch (err) { alert("Couldn't read that file — it doesn't look like a valid Atlas progress export."); }
      importFile.value = "";
    };
    reader.onerror = function () { alert("Couldn't read that file."); importFile.value = ""; };
    reader.readAsText(f);
  });

  function exportProgress() {
    var blob = new Blob([JSON.stringify(progressPayload(), null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "ai-engineering-atlas-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function importProgress(data) {
    var r = mergeProgress(data, true);
    if (!r) { alert("That file doesn't contain Atlas progress data."); return; }
    saveProgress();
    alert("Imported progress — merged in " + r.added + " newly-understood concept" + (r.added === 1 ? "" : "s") + ".\n" +
      "You now have " + countUnderstood() + " of " + ATLAS.nodes.length + " marked understood." +
      (r.skipped ? "\n(" + r.skipped + " entr" + (r.skipped === 1 ? "y" : "ies") + " skipped — not in this version of the atlas.)" : ""));
  }

  function resetProgress() {
    var where = isSyncing() ? "in this browser and in " + sync.name : "in this browser";
    if (!confirm("Reset your progress?\n\nThis clears every concept you've marked understood or known, your quiz scores, and your saved path " + where + ". It can't be undone.")) return;
    progress.understood = {}; progress.known = {}; progress.best = {}; delete progress.path;
    saveProgress();
    if (pathState.active) exitPath();
    refreshUnderstoodClasses();
    updateProgressLine();
    clearHighlight();
  }

  // expose for debugging
  window.__atlas = { cy: cy, data: ATLAS, progress: progress, path: pathState, computeSequence: computeSequence };
})();
