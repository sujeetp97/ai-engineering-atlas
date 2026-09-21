/* The eight domains of the Atlas. Order defines legend order.
   Colors mirror the --c-* CSS variables in styles.css. */
ATLAS.addCluster({ id: "math",  label: "Math Foundations",   color: "#6a5acd", blurb: "The language underneath everything: linear algebra, calculus, probability, statistics, optimization, information." });
ATLAS.addCluster({ id: "data",  label: "Data Science",       color: "#2a9d8f", blurb: "Turning raw data into signal: collection, cleaning, exploration, features, experiments, evaluation." });
ATLAS.addCluster({ id: "ml",    label: "Classic ML",         color: "#e07a1f", blurb: "Learning patterns from data without neural nets: regression, trees, ensembles, clustering, the bias–variance world." });
ATLAS.addCluster({ id: "dl",    label: "Deep Learning",      color: "#d1495b", blurb: "Neural networks and how they learn: backprop, CNNs, RNNs, attention, transformers, embeddings." });
ATLAS.addCluster({ id: "llm",   label: "Building AI / LLMs", color: "#3f7cac", blurb: "How large language models are actually made: tokenization, pretraining, fine-tuning, alignment, scaling, inference." });
ATLAS.addCluster({ id: "aieng", label: "AI Engineering",     color: "#7b6cf6", blurb: "Building reliable products on top of models: prompting, RAG, agents, tools, evals, guardrails, MLOps, observability." });
ATLAS.addCluster({ id: "work",  label: "Using AI for Work",  color: "#c9a227", blurb: "Using AI to do engineering and knowledge work well: AI-assisted coding, workflows, verification, delegation." });
ATLAS.addCluster({ id: "xcut",  label: "Cross-cutting",      color: "#5c6b73", blurb: "Concerns that touch every layer: safety, alignment, interpretability, ethics, cost, latency, privacy." });
