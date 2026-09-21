# Authoring the Atlas — how to add and edit knowledge

This is the guide for growing the graph: adding concepts, linking them, and keeping
quality and structure intact. There is **no build step** — you edit plain `.js` data
files and reload the page. A validator (`node tools/validate.js`) checks your work.

> TL;DR to add a concept: (1) add a node object to the right `data/NN-*.js` file,
> (2) add a few edges to `data/99-edges.js`, (3) bump the `?v=` for the files you
> changed in `index.html`, (4) run `node tools/validate.js`, (5) reload and spot-check.

---

## 1. Where things live

```
data/_registry.js      window.ATLAS + addCluster/addNodes/addEdges helpers (don't edit)
data/00-clusters.js    the 8 domains (id, label, color, blurb)
data/10-math.js        ┐
data/20-data-science.js│
   … through …         ├─ one file per domain; each file holds that domain's NODES
data/80-cross-cutting.js┘
data/99-edges.js       ALL edges (links between nodes), across every domain
index.html             loads the above via <script> with ?v= cache-busting
js/app.js              the engine (graph, search, panel, quiz) — rarely needs editing
tools/validate.js      the data validator
```

Nodes for a domain go in that domain's file. **Every edge, regardless of which
domains it connects, goes in `99-edges.js`.**

---

## 2. The node schema

A node is a plain object appended via `ATLAS.addNodes([ ... ])`. Full shape:

```js
{
  id: "kebab-case-unique-id",        // stable; used by edges — don't rename casually
  label: "Human Readable Name",       // shown on the node and panel title
  cluster: "dl",                      // one of the cluster ids in 00-clusters.js
  short: "One sentence shown on hover and under the title.",
  keywords: "space separated terms for search",  // helps search find this node

  learn: {
    why: "Why this matters — grounds the concept in real AI-engineering practice.",
    sections: [
      { h: "Heading", body: [
        "A paragraph. Supports **bold**, *italic*, and `code` inline.",
        { ul: ["A bullet", "Another bullet"] },     // a bulleted list
        { formula: "e = mc^2" },                     // a monospaced formula/code block
      ]},
      // 2–4 sections is the sweet spot.
    ],
    keyPoints: [                        // 3 short "remember this" takeaways
      "Compressed takeaway one.",
      "Compressed takeaway two.",
      "Compressed takeaway three.",
    ],
    source: {                           // ONE primary, high-trust source
      title: "Author — Title",
      url: "https://…",
      note: "Optional: why this source / what to read.",
    },
  },

  quiz: [                              // 3 questions (retrieval practice)
    {
      q: "A question that tests understanding, not recall of trivia.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: 1,                        // 0-based index of the correct option
      explain: "Why the correct answer is right (shown after answering).",
    },
    // … 2 more …
  ],
}
```

### Body block types
- **String** → a paragraph. Inline formatting: `**bold**`, `*italic*`, `` `code` ``.
- **`{ ul: [ ... ] }`** → a bulleted list (each item supports inline formatting).
- **`{ formula: "..." }`** → a monospaced block for equations or short code.

---

## 3. The edge schema

Edges live in `data/99-edges.js`, appended via `ATLAS.addEdges([ ... ])`:

```js
{ source: "node-a", target: "node-b", type: "prereq" }
```

### Edge types and their meaning

| type | meaning | direction | drawn |
| --- | --- | --- | --- |
| `prereq` | source is a **foundation for** target | source → target ("leads to") | arrow |
| `enables` | source **makes possible** target | source → target | arrow |
| `partof` | source is **part of** target (e.g. sub-topic of an overview) | source → target | line |
| `uses` | source **uses** target | source → target | line |
| `related` | loose association, no ordering | undirected | line |

**`prereq`, `enables`, and `partof` imply learning order** (source should be learned
before target). These form the prerequisite DAG used by learning paths — so they
**must not form a cycle**. `uses` and `related` are ordering-neutral.

### How connections appear in the panel
For the node you're viewing, the panel groups its edges: *Builds on* (incoming
prereq/enables), *Leads to* (outgoing), *Part of* / *Includes* (partof), *Uses /
used by*, and *Related*. So pick the type that reads correctly in that sentence.

### Linking guidance
- Give every new node **at least 2–3 edges** (an orphan fails validation).
- Anchor it to its domain: link sub-topics to the domain's overview node with `partof`
  (e.g. `attention → transformers` is `prereq`; `cnn → deep-learning` is `partof`).
- Add **cross-domain** links where the real dependency exists — these are what make
  the atlas one connected map (e.g. `dot-product → attention`, `embeddings → rag`).
- Prefer a few meaningful edges over many weak `related` ones.

---

## 4. Quality bar (this is what makes it worth learning from)

The teaching approach follows the `teach` skill: knowledge first, then retrieval
practice. Hold new content to the same standard as the existing nodes:

**Lessons**
- Lead with **why it matters** for actually building or using AI.
- Explain the mechanism plainly; define jargon on first use.
- Keep it short — a few tight sections, within working-memory limits.
- Cite **one primary, high-trust source** (paper, official docs, a recognized
  educator). Don't cite low-trust blogs. Don't invent URLs — use a real, known one.
- Be honest about limitations and failure modes; avoid hype.

**Quizzes**
- Test **understanding**, not trivia. A learner who read the lesson should pass;
  one who skimmed should not.
- Give ~4 options. Make distractors plausible.
- **Don't leak the answer through formatting** — keep options similar in length and
  style (the correct one shouldn't be the longest/most-detailed).
- Every question gets an `explain` that teaches, not just confirms.

---

## 5. Validate, then check in the browser

```bash
node tools/validate.js
```
It checks: unique ids, required fields, valid clusters, valid edge references, no
orphans, full connectivity, valid quiz answer indices, and **no prerequisite cycles**.
Warnings (e.g. a node with < 3 quiz questions) are non-fatal; errors block.

Then reload the page and spot-check the new node's panel (Learn renders, Quiz scores,
connection chips navigate). Remember to **bump `?v=`** in `index.html` for any
`data/*.js`, `js/app.js`, or `css/styles.css` you changed, or the browser serves a
cached copy.

---

## 6. Common recipes

**Add a brand-new concept**
1. Pick the domain → open `data/NN-domain.js`.
2. Add a node object (schema above) inside the `ATLAS.addNodes([ ... ])` array.
3. In `data/99-edges.js`, add its edges (≥2), including at least one cross-link if it
   naturally depends on another domain.
4. Bump `?v=` for those two files in `index.html`.
5. `node tools/validate.js` → fix anything → reload and spot-check.

**Add a whole new sub-area (several related concepts)**
- Add all the nodes first, then a block of edges. Link them to each other *and* to
  existing anchor nodes so the sub-area isn't an island. Validate.

**Add a new domain (cluster)**
- Add a cluster in `data/00-clusters.js` (`id`, `label`, `color`, `blurb`) and a
  matching `--c-<id>` color in `css/styles.css`.
- Create a `data/NN-name.js`, add it to the `<script>` list in `index.html` **and** to
  the `FILES` array in `tools/validate.js`.
- Populate nodes + edges; connect the new domain to the existing graph.

**Retire / rename a concept**
- Renaming an `id` means updating every edge that references it. Prefer keeping ids
  stable. To remove a node, delete it and all its edges, then validate (watch for new
  orphans left behind).
