/* Global registry that every data file appends to.
   Loaded before all other data files. Works via file:// (no fetch). */
window.ATLAS = window.ATLAS || {
  clusters: {},   // id -> { id, label, color, blurb }
  nodes: [],      // node objects
  edges: [],      // edge objects
};

/* Helpers used by the data files to keep them terse and consistent. */
window.ATLAS.addCluster = function (c) { window.ATLAS.clusters[c.id] = c; };
window.ATLAS.addNodes = function (arr) { window.ATLAS.nodes.push(...arr); };
window.ATLAS.addEdges = function (arr) { window.ATLAS.edges.push(...arr); };
