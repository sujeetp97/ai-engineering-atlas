#!/usr/bin/env node
/* ===========================================================================
   Atlas data validator — run before committing changes to the graph.
   No dependencies. Usage:  node tools/validate.js
   Exits 1 (with a report) if anything is wrong, 0 if the graph is healthy.
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA_DIR = path.join(__dirname, "..", "data");
// Load order must match index.html: registry, clusters, node files, then edges.
const FILES = [
  "_registry.js",
  "00-clusters.js",
  "10-math.js",
  "20-data-science.js",
  "30-machine-learning.js",
  "40-deep-learning.js",
  "50-building-ai.js",
  "60-ai-engineering.js",
  "70-using-ai.js",
  "80-cross-cutting.js",
  "99-edges.js",
];

const EDGE_TYPES = ["prereq", "partof", "enables", "uses", "related"];
// Edge types that imply a "must come before" ordering (used for the DAG check
// and for future learning-path generation). "related" is undirected/ignored.
const ORDERING_TYPES = ["prereq", "partof", "enables"];

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---- load the data into a sandbox that mimics the browser globals ----
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of FILES) {
  const full = path.join(DATA_DIR, f);
  if (!fs.existsSync(full)) { err(`Missing data file: data/${f}`); continue; }
  try {
    vm.runInContext(fs.readFileSync(full, "utf8"), ctx, { filename: `data/${f}` });
  } catch (e) {
    err(`Failed to parse data/${f}: ${e.message}`);
  }
}

const ATLAS = ctx.ATLAS;
if (!ATLAS) {
  console.error("FATAL: data/_registry.js did not define window.ATLAS.");
  process.exit(1);
}

const clusters = ATLAS.clusters || {};
const nodes = ATLAS.nodes || [];
const edges = ATLAS.edges || [];
const byId = {};

// ---- node-level checks ----
for (const n of nodes) {
  if (!n.id) { err(`Node with no id: ${JSON.stringify(n).slice(0, 80)}`); continue; }
  if (byId[n.id]) err(`Duplicate node id: "${n.id}"`);
  byId[n.id] = n;

  if (!n.label) err(`Node "${n.id}" has no label`);
  if (!n.short) warn(`Node "${n.id}" has no short summary`);
  if (!n.cluster) err(`Node "${n.id}" has no cluster`);
  else if (!clusters[n.cluster]) err(`Node "${n.id}" references unknown cluster "${n.cluster}"`);

  const L = n.learn || {};
  if (!L.why) warn(`Node "${n.id}" has no learn.why`);
  if (!Array.isArray(L.sections) || !L.sections.length) warn(`Node "${n.id}" has no learn.sections`);
  if (!L.source || !L.source.url) warn(`Node "${n.id}" has no primary source (learn.source.url)`);

  const q = n.quiz || [];
  if (!Array.isArray(q) || q.length < 1) {
    err(`Node "${n.id}" has no quiz questions`);
  } else {
    if (q.length < 3) warn(`Node "${n.id}" has only ${q.length} quiz question(s) (aim for 3)`);
    q.forEach((item, i) => {
      const tag = `Node "${n.id}" quiz[${i}]`;
      if (!item.q) err(`${tag} has no question text`);
      if (!Array.isArray(item.options) || item.options.length < 2) err(`${tag} needs at least 2 options`);
      else if (typeof item.answer !== "number" || item.answer < 0 || item.answer >= item.options.length)
        err(`${tag} has an out-of-range answer index (${item.answer})`);
      if (!item.explain) warn(`${tag} has no explanation`);
    });
  }
}

// ---- edge-level checks ----
const degree = {};
nodes.forEach((n) => { degree[n.id] = 0; });
const adj = {};       // undirected, for connectivity
const dag = {};       // directed ordering edges, for cycle check
nodes.forEach((n) => { adj[n.id] = []; dag[n.id] = []; });

edges.forEach((e, i) => {
  const tag = `edge[${i}] (${e.source} -> ${e.target})`;
  if (!byId[e.source]) { err(`${tag}: unknown source "${e.source}"`); return; }
  if (!byId[e.target]) { err(`${tag}: unknown target "${e.target}"`); return; }
  if (e.source === e.target) err(`${tag}: self-loop`);
  if (e.type && EDGE_TYPES.indexOf(e.type) === -1) warn(`${tag}: unusual type "${e.type}"`);
  degree[e.source]++; degree[e.target]++;
  adj[e.source].push(e.target); adj[e.target].push(e.source);
  if (ORDERING_TYPES.indexOf(e.type) !== -1) dag[e.source].push(e.target);
});

// orphans
const orphans = Object.keys(degree).filter((k) => degree[k] === 0);
orphans.forEach((o) => err(`Orphan node (no edges): "${o}" — connect it to the graph`));

// connectivity (undirected)
if (nodes.length) {
  const seen = {}; const stack = [nodes[0].id]; seen[nodes[0].id] = 1; let count = 1;
  while (stack.length) {
    const c = stack.pop();
    for (const nb of adj[c]) if (!seen[nb]) { seen[nb] = 1; count++; stack.push(nb); }
  }
  if (count !== nodes.length) {
    const unreachable = nodes.filter((n) => !seen[n.id]).map((n) => n.id);
    err(`Graph is not fully connected: ${nodes.length - count} node(s) unreachable — ${unreachable.slice(0, 8).join(", ")}${unreachable.length > 8 ? "…" : ""}`);
  }
}

// cycle check over ordering edges (prereq/partof/enables must form a DAG for paths)
(function detectCycle() {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {}; nodes.forEach((n) => { color[n.id] = WHITE; });
  const pathStack = [];
  let cycle = null;
  function dfs(u) {
    color[u] = GRAY; pathStack.push(u);
    for (const v of dag[u]) {
      if (color[v] === GRAY) { cycle = pathStack.slice(pathStack.indexOf(v)).concat(v); return true; }
      if (color[v] === WHITE && dfs(v)) return true;
    }
    color[u] = BLACK; pathStack.pop(); return false;
  }
  for (const n of nodes) { if (color[n.id] === WHITE && dfs(n.id)) break; }
  if (cycle) err(`Prerequisite cycle detected (breaks learning paths): ${cycle.join(" -> ")}`);
})();

// ---- report ----
const clusterCounts = {};
nodes.forEach((n) => { clusterCounts[n.cluster] = (clusterCounts[n.cluster] || 0) + 1; });

console.log("AI Engineering Atlas — data validation");
console.log("--------------------------------------");
console.log(`Clusters : ${Object.keys(clusters).length}`);
console.log(`Nodes    : ${nodes.length}  (${Object.entries(clusterCounts).map(([k, v]) => `${k}:${v}`).join("  ")})`);
console.log(`Edges    : ${edges.length}`);
console.log(`Avg degree: ${(edges.length * 2 / (nodes.length || 1)).toFixed(1)}`);
console.log("");

if (warnings.length) {
  console.log(`⚠  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log("   - " + w));
  console.log("");
}
if (errors.length) {
  console.log(`✗  ${errors.length} error(s):`);
  errors.forEach((e) => console.log("   - " + e));
  console.log("\nFAILED — fix the errors above.");
  process.exit(1);
} else {
  console.log("✓  No errors. Graph is valid and fully connected.");
  process.exit(0);
}
