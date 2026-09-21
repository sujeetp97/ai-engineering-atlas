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
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { understood: {}, best: {} }; }
    catch (e) { return { understood: {}, best: {} }; }
  }
  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
  }
  function isUnderstood(id) { return !!progress.understood[id]; }

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
      { selector: "edge.hl", style: { "opacity": 0.95, "width": 2.6, "z-index": 20 } },
      {
        selector: "node.selected",
        style: {
          "border-color": getVar("--accent") || "#b4531f",
          "border-width": 5, "border-opacity": 1, "z-index": 50,
        },
      },
    ],
    layout: layoutOpts(),
  });

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

  function applyClusterFilter() {
    cy.batch(function () {
      cy.nodes().forEach(function (n) {
        var hidden = clusterOff[n.data("cluster")];
        n.style("display", hidden ? "none" : "element");
      });
      cy.edges().forEach(function (e) {
        var hidden = clusterOff[e.source().data("cluster")] || clusterOff[e.target().data("cluster")];
        e.style("display", hidden ? "none" : "element");
      });
    });
  }

  // ==========================================================
  //  PROGRESS LINE
  // ==========================================================
  function updateProgressLine() {
    var total = ATLAS.nodes.length;
    var done = Object.keys(progress.understood).filter(function (k) { return nodeById[k]; }).length;
    var pct = Math.round((done / total) * 100);
    document.getElementById("progress-line").textContent =
      total + " concepts · " + validEdges.length + " links · " + done + " understood (" + pct + "%)";
  }
  updateProgressLine();

  // ==========================================================
  //  HIGHLIGHT / FOCUS
  // ==========================================================
  function clearHighlight() {
    cy.elements().removeClass("faded dim hl match selected");
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
    if (opts.center !== false) {
      cy.animate({ center: { eles: node }, zoom: Math.max(cy.zoom(), 0.9) }, { duration: 350 });
    }
  }

  // ==========================================================
  //  SEARCH
  // ==========================================================
  var searchEl = document.getElementById("search");
  var resultsEl = document.getElementById("search-results");
  var clearBtn = document.getElementById("search-clear");
  var searchIndex = ATLAS.nodes.map(function (n) {
    var hay = (n.label + " " + (n.short || "") + " " + (n.keywords || "")).toLowerCase();
    return { id: n.id, label: n.label, cluster: n.cluster, hay: hay };
  });
  var activeResult = -1;

  searchEl.addEventListener("input", function () {
    var q = searchEl.value.trim().toLowerCase();
    clearBtn.style.display = q ? "block" : "none";
    if (!q) { resultsEl.classList.remove("open"); liveHighlight(""); return; }
    var matches = searchIndex.filter(function (r) { return r.hay.indexOf(q) !== -1; });
    matches.sort(function (a, b) {
      var ai = a.label.toLowerCase().indexOf(q), bi = b.label.toLowerCase().indexOf(q);
      if ((ai === 0) !== (bi === 0)) return ai === 0 ? -1 : 1;
      return a.label.length - b.label.length;
    });
    renderResults(matches.slice(0, 12), q);
    liveHighlight(q);
  });

  function liveHighlight(q) {
    cy.nodes().removeClass("match");
    if (!q) { if (!cy.getElementById(currentNodeId).nonempty()) clearHighlight(); return; }
    var ids = searchIndex.filter(function (r) { return r.hay.indexOf(q) !== -1; }).map(function (r) { return r.id; });
    if (!ids.length) return;
    var set = cy.collection();
    ids.forEach(function (id) { set = set.union(cy.getElementById(id)); });
    cy.elements().addClass("dim").removeClass("faded");
    set.removeClass("dim").addClass("match");
    set.connectedEdges().removeClass("dim");
  }

  function renderResults(matches, q) {
    activeResult = -1;
    if (!matches.length) {
      resultsEl.innerHTML = '<li class="r-empty">No concept matches “' + escapeHtml(q) + "”.</li>";
      resultsEl.classList.add("open");
      return;
    }
    resultsEl.innerHTML = matches.map(function (m) {
      var c = CL[m.cluster];
      return '<li data-id="' + m.id + '">' +
        '<span class="dot" style="background:' + (c ? c.color : "#888") + '"></span>' +
        '<span class="r-label">' + escapeHtml(m.label) + "</span>" +
        '<span class="r-cluster">' + (c ? c.label : "") + "</span>" +
        "</li>";
    }).join("");
    resultsEl.classList.add("open");
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
    resultsEl.classList.remove("open"); liveHighlight(""); clearHighlight(); searchEl.focus();
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
      '<div class="tt-title">' + escapeHtml(n.label) + (isUnderstood(n.id) ? " ✓" : "") + "</div>" +
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
    if (evt.target === cy) { /* background tap */ closePanel(); clearHighlight(); }
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
    html += '<span class="p-cluster-tag" style="background:' + hexA(c.color, 0.12) + ";color:" + c.color + '">' +
              '<span class="dot" style="background:' + c.color + '"></span>' + c.label + "</span>";
    html += '<h2 class="p-title">' + escapeHtml(n.label) + "</h2>";
    html += '<p class="p-short">' + inline(n.short || "") + "</p>";

    if (learned) {
      html += '<div class="p-status learned">✓ Understood' + (best != null ? " — best quiz " + best + "/" + quizCount : "") + "</div>";
    } else {
      html += '<div class="p-status unlearned">○ Not yet checked — read, then take the quiz to confirm</div>';
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
    // start-quiz button
    var startBtn = panelScroll.querySelector("[data-action=start-quiz]");
    if (startBtn) startBtn.addEventListener("click", function () { switchTab(n, "quiz"); });

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
      item.options.forEach(function (opt, oi) {
        qhtml += '<button class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' + inline(opt) + "</button>";
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
            opts[item.answer].classList.add("correct");
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
      cy.getElementById(n.id).addClass("understood");
      updateProgressLine();
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
    cy.animate({ fit: { padding: 60 } }, { duration: 400 });
  });
  document.getElementById("btn-reset").addEventListener("click", function () {
    clusterOff = {};
    legendEl.querySelectorAll(".legend-item").forEach(function (i) { i.classList.remove("off"); });
    applyClusterFilter();
    clearHighlight();
    searchEl.value = ""; clearBtn.style.display = "none"; resultsEl.classList.remove("open");
    cy.layout(layoutOpts()).run();
  });

  // fit once layout settles — robust against races, with a fallback
  var didInitialFit = false;
  function initialFit() {
    if (didInitialFit) return;
    didInitialFit = true;
    cy.animate({ fit: { padding: 50 } }, { duration: 500 });
  }
  cy.one("layoutstop", initialFit);
  setTimeout(initialFit, 1600); // fallback if layoutstop was missed

  // keep the graph framed when the window resizes (e.g. panel opens/closes, device rotates)
  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { cy.resize(); }, 150);
  });

  // expose for debugging
  window.__atlas = { cy: cy, data: ATLAS, progress: progress };
})();
