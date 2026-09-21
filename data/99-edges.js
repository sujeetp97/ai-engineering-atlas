/* ===========================================================================
   EDGES — the connective tissue of the atlas.
   type: prereq   (source is a foundation for target; arrow source→target "leads to")
         partof   (source is part of target)
         enables  (source makes target possible; arrow source→target)
         uses     (source uses target)
         related  (undirected association)
   Cross-cluster edges are added as later clusters are populated.
   =========================================================================== */
ATLAS.addEdges([
  // ---- within Math Foundations ----
  { source: "vectors", target: "linear-algebra", type: "partof" },
  { source: "matrices-matmul", target: "linear-algebra", type: "partof" },
  { source: "dot-product", target: "linear-algebra", type: "partof" },
  { source: "eigen-svd", target: "linear-algebra", type: "partof" },
  { source: "vectors", target: "dot-product", type: "prereq" },
  { source: "vectors", target: "matrices-matmul", type: "prereq" },
  { source: "matrices-matmul", target: "eigen-svd", type: "prereq" },
  { source: "calculus-derivatives", target: "gradients", type: "prereq" },
  { source: "gradients", target: "gradient-descent", type: "prereq" },
  { source: "optimization", target: "gradient-descent", type: "prereq" },
  { source: "gradients", target: "optimization", type: "enables" },
  { source: "probability", target: "distributions", type: "prereq" },
  { source: "probability", target: "bayes", type: "prereq" },
  { source: "probability", target: "statistics", type: "prereq" },
  { source: "probability", target: "information-theory", type: "prereq" },
  { source: "distributions", target: "information-theory", type: "related" },
  { source: "eigen-svd", target: "statistics", type: "related" },
  { source: "linear-algebra", target: "calculus-derivatives", type: "related" },
]);
