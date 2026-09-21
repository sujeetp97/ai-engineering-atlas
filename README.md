# AI Engineering Atlas

An interactive, connected knowledge graph for learning AI engineering — from the
math underneath, through building models, to using AI to do real engineering work.

Every concept is a **node**. Related concepts are **linked** (builds-on, part-of,
enables, uses, related). Click any node to **learn** it from a short, cited lesson,
then take a **quiz** that confirms you actually understood it before it's marked ✓.

## Run it

It's a static site — no build step. Because it loads its data with plain `<script>`
tags, you can even open `index.html` directly in most browsers. If your browser
blocks local files, serve the folder:

```bash
cd ai-engineering-atlas
python3 -m http.server 8000
# then open http://localhost:8000
```

## How to use

- **Explore** — drag the canvas, scroll to zoom, hover a node for a summary.
- **Search** — type a concept (e.g. `attention`, `RAG`, `gradient descent`); matches
  highlight in the graph and the dropdown jumps you to one.
- **Filter** — click a domain in the legend to hide/show it.
- **Learn** — click a node → read the lesson → follow the connection chips to related ideas.
- **Quiz** — take the quiz at the end of a lesson. Score ≥ 75% and the node is marked
  understood (saved in your browser's `localStorage`). Come back a few days later to
  re-quiz — spacing is what moves knowledge into long-term memory.

## The eight domains

| Domain | What it covers |
| --- | --- |
| **Math Foundations** | Linear algebra, calculus, probability, statistics, optimization, information theory |
| **Data Science** | Collection, cleaning, EDA, features, evaluation, experiments |
| **Classic ML** | Regression, trees, ensembles, clustering, the bias–variance world |
| **Deep Learning** | Neural nets, backprop, CNNs, RNNs, attention, transformers, embeddings |
| **Building AI / LLMs** | Tokenization, pretraining, fine-tuning, RLHF, scaling, inference |
| **AI Engineering** | Prompting, RAG, agents, tools, evals, guardrails, MLOps, observability |
| **Using AI for Work** | AI-assisted coding, workflows, verification, delegation |
| **Cross-cutting** | Safety, alignment, interpretability, ethics, cost, latency, security |

## Project layout

```
index.html            App shell + script load order
css/styles.css        Theme (light "paper" + automatic dark mode)
js/app.js             Graph engine, search, learn panel, quiz
data/_registry.js     Global registry every data file appends to
data/00-clusters.js   The eight domains
data/10..80-*.js      Nodes (concepts) per domain
data/99-edges.js      The links between concepts
vendor/               Cytoscape.js + fcose layout (vendored for offline use)
```

## Adding or editing knowledge

Each node is a plain object (see `data/10-math.js` for the schema: `learn` sections,
`keyPoints`, a primary `source`, and a `quiz`). Add a node to the relevant cluster file,
add its links to `data/99-edges.js`, bump the `?v=` for the files you changed in
`index.html`, then reload. No build step.

- **Full guide:** [`docs/AUTHORING.md`](docs/AUTHORING.md) — node/edge schema, the quality
  bar, and step-by-step recipes for adding a concept, a sub-area, or a whole new domain.
- **For AI agents:** [`AGENTS.md`](AGENTS.md) — how a Claude Code session should update the
  graph on request.
- **Validate before committing:**
  ```bash
  node tools/validate.js
  ```
  Checks unique ids, valid edge references, no orphan nodes, full connectivity, valid quiz
  answers, and that the prerequisite graph has no cycles (learning paths depend on this).

The teaching approach (knowledge first, then retrieval-practice quizzes with
same-length options, citations to primary sources, spaced review) follows the
"teach" methodology.
