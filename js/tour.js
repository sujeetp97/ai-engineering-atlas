/* ============================================================
   Guided tour — a spotlight walkthrough of how to use the atlas.
   Self-contained; depends only on window.__atlas (exposed by app.js).
   ============================================================ */
(function () {
  "use strict";
  if (!window.__atlas) return; // app failed to start; nothing to tour

  var SEEN_KEY = "atlas.tour.v1";
  var SAMPLE_NODE = "large-language-models"; // opened during the lesson steps

  // ---- the script ----
  var steps = [
    {
      title: "Welcome to the Atlas 👋",
      body: "A living map of AI engineering — 108 connected concepts across eight domains, from the math underneath to using AI for real work. Here's a 30-second tour.",
      primary: "Show me",
    },
    {
      target: "#legend",
      side: "right",
      title: "Eight domains",
      body: "Every concept belongs to a color-coded domain. Click a domain here to spotlight it, or click again to hide it while you focus elsewhere.",
    },
    {
      target: ".search-wrap",
      side: "below",
      title: "Search anything",
      body: "Type a concept — like “attention” or “RAG”. Matches light up across the graph and you can jump straight to one from the dropdown.",
    },
    {
      panel: true, openNode: SAMPLE_NODE,
      target: "#panel", side: "left",
      title: "Open a concept",
      body: "Click any node to open a short, cited lesson. Read it, then follow the “Connections” chips to hop to related ideas.",
    },
    {
      panel: true,
      target: ".p-tabs", side: "left",
      title: "Learn, then prove it",
      body: "Each concept ends with a quick quiz. Score 75%+ and it's marked ✓ understood (saved in this browser). Recalling from memory is what makes it stick.",
    },
    {
      target: "#btn-path", side: "below",
      title: "Follow a learning path",
      body: "Not sure where to start? Click Learning Path, pick a goal, and the atlas orders the prerequisites for you — skipping anything you've already mastered.",
    },
    {
      title: "You're all set 🎈",
      body: "Explore freely, search, or follow a path. Your progress saves in this browser, and you can replay this tour anytime from the “?” button. Happy learning.",
      primary: "Start exploring",
    },
  ];

  // ---- DOM ----
  var root = document.createElement("div");
  root.id = "tour";
  root.innerHTML =
    '<div id="tour-spot"></div>' +
    '<div id="tour-callout">' +
      '<button class="tour-skip" type="button">Skip tour</button>' +
      '<h3></h3><p></p>' +
      '<div class="tour-foot"><div class="tour-dots"></div>' +
        '<button class="tour-btn" data-act="back" type="button">Back</button>' +
        '<button class="tour-btn primary" data-act="next" type="button">Next</button>' +
      "</div>" +
    "</div>";
  document.body.appendChild(root);

  var spotEl = root.querySelector("#tour-spot");
  var calloutEl = root.querySelector("#tour-callout");
  var titleEl = calloutEl.querySelector("h3");
  var bodyEl = calloutEl.querySelector("p");
  var dotsEl = calloutEl.querySelector(".tour-dots");
  var backBtn = calloutEl.querySelector('[data-act="back"]');
  var nextBtn = calloutEl.querySelector('[data-act="next"]');
  var skipBtn = calloutEl.querySelector(".tour-skip");

  var idx = 0;
  var openedNode = false;

  // ---- helpers ----
  function markSeen() { try { localStorage.setItem(SEEN_KEY, "1"); } catch (e) {} }
  function hasSeen() { try { return !!localStorage.getItem(SEEN_KEY); } catch (e) { return false; } }

  function ensurePanel(step) {
    if (step && step.panel) {
      if (!openedNode) {
        window.__atlas.cy.getElementById(step.openNode || SAMPLE_NODE).emit("tap");
        openedNode = true;
        return true; // just opened — caller should wait for the panel to slide in
      }
      return false;
    }
    if (openedNode) {
      var b = document.getElementById("panel-close");
      if (b) b.click();
      openedNode = false;
    }
    return false;
  }

  function rectOf(sel) {
    if (!sel) return null;
    var el = document.querySelector(sel);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return r;
  }

  function placeSpot(rect) {
    if (!rect) { root.classList.add("no-spot"); return; }
    root.classList.remove("no-spot");
    var pad = 6;
    spotEl.style.left = (rect.left - pad) + "px";
    spotEl.style.top = (rect.top - pad) + "px";
    spotEl.style.width = (rect.width + pad * 2) + "px";
    spotEl.style.height = (rect.height + pad * 2) + "px";
  }

  function placeCallout(rect, side) {
    var cw = calloutEl.offsetWidth, ch = calloutEl.offsetHeight;
    var vw = window.innerWidth, vh = window.innerHeight, pad = 14, top, left;
    if (!rect) {
      left = (vw - cw) / 2; top = (vh - ch) / 2;
    } else {
      if (side === "left") { left = rect.left - cw - pad; top = rect.top; }
      else if (side === "right") { left = rect.right + pad; top = rect.top; }
      else if (side === "above") { left = rect.left; top = rect.top - ch - pad; }
      else { left = rect.left; top = rect.bottom + pad; } // below (default)
      if (top + ch > vh - 8) top = rect.top - ch - pad;      // flip up if overflowing
      if (top < 8) top = 8;
      if (left + cw > vw - 8) left = vw - cw - 8;
      if (left < 8) left = 8;
    }
    calloutEl.style.left = Math.round(left) + "px";
    calloutEl.style.top = Math.round(top) + "px";
  }

  function reposition() {
    var step = steps[idx];
    if (!step) return;
    var rect = rectOf(step.target);
    placeSpot(rect);
    placeCallout(rect, step.side);
  }

  function render() {
    var step = steps[idx];
    var justOpened = ensurePanel(step);

    titleEl.textContent = step.title;
    bodyEl.textContent = step.body;

    // dots
    dotsEl.innerHTML = "";
    for (var i = 0; i < steps.length; i++) {
      var d = document.createElement("i");
      if (i === idx) d.className = "on";
      dotsEl.appendChild(d);
    }
    backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
    nextBtn.textContent = step.primary || (idx === steps.length - 1 ? "Done" : "Next");

    var doPlace = function () {
      var rect = rectOf(step.target);
      placeSpot(rect);
      placeCallout(rect, step.side);
    };
    // wait for the panel slide-in transition before measuring panel targets
    if (justOpened) setTimeout(doPlace, 320);
    else requestAnimationFrame(doPlace);
  }

  function go(n) {
    if (n < 0 || n >= steps.length) { end(); return; }
    idx = n;
    render();
  }

  function start() {
    idx = 0;
    root.classList.add("open");
    render();
  }

  function end() {
    markSeen();
    root.classList.remove("open");
    // close the sample panel if the tour opened it, and clear any graph highlight
    if (openedNode) {
      var b = document.getElementById("panel-close");
      if (b) b.click();
      openedNode = false;
    }
    try {
      if (!window.__atlas.path.active) {
        window.__atlas.cy.elements().removeClass("faded dim hl match selected path-on path-next");
      }
    } catch (e) {}
  }

  // ---- events ----
  nextBtn.addEventListener("click", function () { go(idx + 1); });
  backBtn.addEventListener("click", function () { go(idx - 1); });
  skipBtn.addEventListener("click", end);
  document.addEventListener("keydown", function (e) {
    if (!root.classList.contains("open")) return;
    if (e.key === "Escape") end();
    else if (e.key === "ArrowRight") go(idx + 1);
    else if (e.key === "ArrowLeft" && idx > 0) go(idx - 1);
  });
  window.addEventListener("resize", function () { if (root.classList.contains("open")) reposition(); });

  var helpBtn = document.getElementById("btn-help");
  if (helpBtn) helpBtn.addEventListener("click", start);

  // ---- first-run auto-start ----
  if (!hasSeen()) {
    setTimeout(function () { if (!hasSeen()) start(); }, 1400);
  }
})();
