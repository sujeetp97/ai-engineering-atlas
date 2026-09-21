# AGENTS.md — working in this repo

Guidance for an AI agent (e.g. a Claude Code session) making changes here.

## What this project is
An interactive knowledge graph for learning AI engineering. Every concept is a **node**;
related concepts are **linked**. Clicking a node opens a **Learn** lesson then a **Quiz**
that marks it understood. It's a static site with **no build step** — data lives in plain
`.js` files loaded via `<script>` tags (so it works over `file://`).

## First read
Before editing knowledge, read **`docs/AUTHORING.md`** — it has the node/edge schema,
the quality bar, and the recipes. This file is the short version.

## The golden rules
1. **Nodes** go in the matching `data/NN-domain.js`. **All edges** go in `data/99-edges.js`.
2. **Never leave a node orphaned** — every node needs ≥ 2–3 edges, including a cross-domain
   link where the real dependency exists. Connectivity is the whole point.
3. **`prereq` / `enables` / `partof` edges must not form a cycle** (they define learning
   order). `uses` / `related` are ordering-neutral.
4. **Match the existing quality bar**: lesson leads with *why it matters*, explains the
   mechanism plainly, cites **one real, high-trust primary source** (never invent a URL),
   is honest about limitations. Quizzes test understanding with plausible distractors and
   options of similar length (don't leak the answer via formatting). See the `teach` skill.
5. **After any change to `data/*.js`, `js/app.js`, or `css/styles.css`, bump its `?v=`
   number in `index.html`** — otherwise the browser serves a stale cached copy.
6. Keep node `id`s stable; renaming one means updating every edge that references it.

## When the user says "add knowledge about X" (or "add a node on X")
1. Decide the domain/cluster it belongs to (see `data/00-clusters.js`).
2. Write the node object per the schema in `docs/AUTHORING.md`: `id`, `label`, `cluster`,
   `short`, `keywords`, `learn {why, sections, keyPoints, source}`, `quiz` (3 questions).
3. Add its edges to `data/99-edges.js` — connect it to its domain's anchor/overview node
   and to any genuine prerequisites or dependents in **other** domains.
4. If it's a whole new area, add several nodes + a block of edges so it isn't an island.
5. Bump the `?v=` for the files you touched.
6. **Validate and verify** (below). Report what you added and how it connects.

## Verify before you're done
```bash
node tools/validate.js          # unique ids, valid refs, no orphans, connected, DAG, quiz sanity
```
Then load the app and spot-check the new node (Learn renders, Quiz scores, chips navigate):
```bash
python3 -m http.server 8000     # then open http://localhost:8000
```
Fix every validator **error** (warnings are advisory). Only then commit.

## Commit conventions
- Work on a branch off `main` unless told otherwise; don't push without being asked.
- Conventional, descriptive messages (e.g. `Add RAG evaluation concepts to AI Engineering`).
- End commit messages with the attribution line the session specifies.

## Don't
- Don't add a build step, framework, or bundler — keep it plain HTML/CSS/JS.
- Don't switch data loading from `<script>` to `fetch` (breaks `file://`).
- Don't invent citations, inflate claims, or write quizzes whose correct answer is
  obvious from formatting.
- Don't edit `data/_registry.js` or the vendored files in `vendor/`.
