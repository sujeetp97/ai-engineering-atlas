/* ===========================================================================
   USING AI FOR WORK — using AI to do engineering and knowledge work well.
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "ai-assisted-work",
    label: "AI-Assisted Work",
    cluster: "work",
    short: "Using AI as a collaborator to do engineering and knowledge work faster and better.",
    keywords: "ai assisted work productivity augmentation collaboration copilot leverage",
    learn: {
      why: "Beyond building AI products, the biggest near-term impact of AI is as a tool that amplifies your own work — coding, writing, analysis, research. Using it skillfully is a distinct competence, and one that compounds across everything you do.",
      sections: [
        { h: "Augmentation, not automation", body: [
          "The most effective pattern today isn't handing tasks off entirely — it's **augmentation**: you stay the driver, using AI to draft, explore, explain, and check, while you provide judgment, direction, and verification. Think of it as a fast, knowledgeable, occasionally-wrong collaborator.",
        ]},
        { h: "Where AI helps most", body: [
          { ul: [
            "**Getting unstuck** — a first draft, a starting approach, an explanation of unfamiliar code or concepts.",
            "**Tedious work** — boilerplate, refactors, format conversions, summarization.",
            "**Breadth** — exploring options, brainstorming, surveying an area quickly.",
            "**A second pair of eyes** — reviewing, critiquing, finding edge cases.",
          ]},
        ]},
        { h: "The skill that makes it work", body: [
          "The multiplier isn't just the model — it's how you use it: clear delegation, good context, and disciplined **verification**. People who benefit most treat AI output as a draft to check, not an answer to trust, and develop judgment for which tasks to delegate and how. That skill — not the model — is the durable advantage.",
        ]},
      ],
      keyPoints: [
        "The winning pattern is augmentation: you stay in control, using AI to draft, explore, explain, and check.",
        "AI helps most with getting unstuck, tedious work, breadth/exploration, and reviewing.",
        "The real skill is delegation + context + verification — treat outputs as drafts to check, not answers to trust.",
      ],
      source: { title: "Ethan Mollick — Co-Intelligence (themes)", url: "https://www.oneusefulthing.org/", note: "A grounded, practical view of working with AI as a collaborator." },
    },
    quiz: [
      { q: "The most effective near-term pattern for using AI at work is…", options: ["Full automation with no human involvement", "Augmentation — the human directs and verifies while AI drafts and explores", "Ignoring AI entirely", "Letting AI make all final decisions"], answer: 1, explain: "Augmentation keeps human judgment and verification central while leveraging AI's speed and breadth." },
      { q: "Which task is AI especially well-suited to assist with?", options: ["Being the final authority on correctness", "Producing first drafts, boilerplate, and explanations you then verify", "Guaranteeing factual accuracy", "Replacing all verification"], answer: 1, explain: "AI excels at drafts, tedious work, and explanation — with the human verifying the result." },
      { q: "The durable advantage in AI-assisted work comes from…", options: ["Owning the biggest model", "The skill of delegating well, providing context, and verifying outputs", "Never checking outputs", "Avoiding prompts"], answer: 1, explain: "How you use the tool—delegation, context, verification—matters more than the model itself." },
    ],
  },

  {
    id: "ai-coding-assistants",
    label: "AI Coding Assistants",
    cluster: "work",
    short: "Using LLMs to write, explain, refactor, and debug code — the highest-impact AI work use today.",
    keywords: "coding assistant copilot code generation autocomplete refactor debug explain",
    learn: {
      why: "Software engineering is where AI assistance has landed hardest and fastest. Whether you're building AI or anything else, using coding assistants well is now a core engineering skill — and doing it badly introduces subtle bugs and tech debt.",
      sections: [
        { h: "What they're good at", body: [
          { ul: [
            "**Boilerplate & scaffolding** — generating routine code fast.",
            "**Explanation** — describing what unfamiliar code does, in plain language.",
            "**Refactoring & translation** — restructuring code or porting between languages.",
            "**Debugging help** — hypothesizing causes and suggesting fixes from an error.",
            "**Tests** — drafting unit tests for existing functions.",
          ]},
        ]},
        { h: "Where they mislead", body: [
          "Assistants produce **plausible** code that can be subtly wrong: nonexistent APIs (hallucinated methods), off-by-one errors, missing edge cases, insecure patterns, or code that compiles but doesn't do what you meant. They lack your full context and true understanding of intent.",
        ]},
        { h: "Using them well", body: [
          "Provide good context (relevant files, constraints, examples), keep changes reviewable in small steps, and **read and test** everything before trusting it. Treat generated code exactly as you'd treat a junior engineer's pull request — useful, fast, and requiring review. The engineer remains accountable for correctness.",
        ]},
      ],
      keyPoints: [
        "Coding assistants excel at boilerplate, explanation, refactoring, debugging help, and drafting tests.",
        "They produce plausible-but-sometimes-wrong code: hallucinated APIs, missing edge cases, insecure patterns.",
        "Give context, keep changes small, and read+test output — review it like a junior's pull request.",
      ],
      source: { title: "GitHub — Research on Copilot and developer productivity", url: "https://github.blog/news-insights/research/", note: "Evidence on where AI coding help does and doesn't help." },
    },
    quiz: [
      { q: "AI coding assistants are strong at…", options: ["Guaranteeing bug-free code", "Boilerplate, explaining code, refactoring, and drafting tests", "Replacing code review", "Understanding your full intent perfectly"], answer: 1, explain: "They accelerate routine and explanatory work but don't guarantee correctness." },
      { q: "A common failure of AI-generated code is…", options: ["It never compiles", "Calling nonexistent APIs or missing edge cases while looking plausible", "Being too well-tested", "Refusing to generate anything"], answer: 1, explain: "Generated code can be confidently wrong—hallucinated APIs, missed edge cases—despite looking correct." },
      { q: "The right way to treat AI-generated code is…", options: ["Merge it without reading", "Review and test it like a junior engineer's pull request", "Assume it's always correct", "Never use it"], answer: 1, explain: "You remain accountable; read, test, and review generated code before trusting it." },
    ],
  },

  {
    id: "agentic-coding",
    label: "Agentic Coding",
    cluster: "work",
    short: "Letting an AI agent plan and make multi-file code changes across your codebase, with your oversight.",
    keywords: "agentic coding autonomous agent codebase multi-file claude code cursor workflow",
    learn: {
      why: "Coding assistants are evolving from autocomplete into agents that can navigate a codebase, run commands, edit many files, and iterate — tools like Claude Code. Working effectively with agentic coding is a fast-emerging skill that changes how engineering gets done.",
      sections: [
        { h: "From autocomplete to agent", body: [
          "A coding **agent** doesn't just suggest a line — it reads relevant files, plans a change, edits across the codebase, runs tests or commands, sees the results, and iterates toward a goal. It operates in the think→act→observe loop, applied to software.",
        ]},
        { h: "What changes in how you work", body: [
          { ul: [
            "**You specify intent and constraints**; the agent handles the mechanics of finding and changing code.",
            "**Context matters more** — pointing the agent at the right files, tests, and conventions (e.g. an AGENTS.md/CLAUDE.md) hugely improves results.",
            "**Review shifts to the diff and the tests** — you evaluate the outcome, not every keystroke.",
          ]},
        ]},
        { h: "Keeping it reliable", body: [
          "Agentic coding inherits agent risks: it can misunderstand, over-edit, or break things while looking confident. Keep tasks **scoped**, work in **version control** (so changes are reviewable and reversible), lean on **tests** as ground truth, and stay in the loop for anything consequential. Small, verifiable steps beat one giant autonomous change.",
        ]},
      ],
      keyPoints: [
        "Coding agents plan, edit across many files, run commands/tests, and iterate — the agent loop applied to code.",
        "Your job shifts to specifying intent, supplying context (right files, conventions), and reviewing diffs + tests.",
        "Keep tasks scoped, use version control and tests as guardrails, and stay in the loop for big changes.",
      ],
      source: { title: "Anthropic — Claude Code best practices", url: "https://www.anthropic.com/engineering/claude-code-best-practices", note: "How to work effectively with a coding agent." },
    },
    quiz: [
      { q: "A coding agent differs from plain autocomplete because it…", options: ["Only suggests one line at a time", "Reads files, plans, edits across the codebase, runs tests, and iterates", "Never touches files", "Cannot run commands"], answer: 1, explain: "Agents operate in a think→act→observe loop over the whole codebase, not just single suggestions." },
      { q: "To get good results from a coding agent, it especially helps to…", options: ["Give it no context", "Point it at the right files, tests, and project conventions", "Disable version control", "Avoid describing intent"], answer: 1, explain: "Good context—relevant files, tests, conventions—dramatically improves an agent's output." },
      { q: "A key guardrail when using agentic coding is to…", options: ["Make one huge unreviewable change", "Work in version control with tests, keeping tasks scoped and reviewing diffs", "Skip all testing", "Never read the changes"], answer: 1, explain: "Version control, tests, scoping, and diff review keep agentic changes safe and reversible." },
    ],
  },

  {
    id: "verification-review",
    label: "Verification & Trust",
    cluster: "work",
    short: "The discipline of checking AI output — the single most important habit for using AI safely.",
    keywords: "verification trust but verify review checking accountability accuracy hallucination",
    learn: {
      why: "Because AI is confidently fallible, verification is the habit that separates productive, safe AI use from costly mistakes. It's the counterweight to every capability in this cluster — and the reason a skilled human stays essential.",
      sections: [
        { h: "Why verification is non-negotiable", body: [
          "AI output is fluent and authoritative-sounding regardless of whether it's right. It hallucinates facts, invents citations, writes subtly buggy code, and makes reasoning errors — all delivered with the same confidence as correct answers. You cannot tell correctness from tone. So you must check.",
        ]},
        { h: "How to verify efficiently", body: [
          { ul: [
            "**Match effort to stakes** — trivial, reversible outputs need a glance; consequential ones need real scrutiny.",
            "**Check against ground truth** — run the code, test the claim, follow the citation to the source.",
            "**Use independent checks** — a second model, a tool, or your own reasoning; don't let the model grade itself unaided.",
            "**Watch for the plausible-but-wrong** — the dangerous errors are the confident, subtle ones, not the obvious ones.",
          ]},
        ]},
        { h: "You remain accountable", body: [
          "The core principle: **the human is responsible for the output**, regardless of how it was produced. 'The AI said so' is never a defense. Verification is how you responsibly capture AI's speed without inheriting its errors — trust, but verify, with the verification scaled to the risk.",
        ]},
      ],
      keyPoints: [
        "AI delivers wrong answers as confidently as right ones, so correctness can't be judged from tone — you must check.",
        "Scale verification to stakes; check against ground truth (run it, test it, follow the source), use independent checks.",
        "The human is accountable for the output; 'the AI said so' is never a valid defense.",
      ],
      source: { title: "Simon Willison — on trusting LLM output", url: "https://simonwillison.net/tags/ai-ethics/", note: "Practical, skeptical takes on verifying AI work." },
    },
    quiz: [
      { q: "Why can't you judge whether AI output is correct by how confident it sounds?", options: ["AI always sounds unsure when wrong", "AI delivers wrong answers with the same confidence as correct ones", "Confidence equals accuracy", "AI never sounds confident"], answer: 1, explain: "Fluency and confidence are independent of correctness, so tone is no signal — you must verify." },
      { q: "How much verification effort should an AI output get?", options: ["Always the maximum", "Scaled to the stakes — a glance for trivial/reversible, real scrutiny for consequential", "None, ever", "Only if it looks wrong"], answer: 1, explain: "Match verification effort to the risk and reversibility of acting on the output." },
      { q: "The core accountability principle is that…", options: ["The AI is responsible for its output", "The human is responsible for the output regardless of how it was produced", "No one is responsible", "Responsibility depends on the model size"], answer: 1, explain: "'The AI said so' is never a defense; the human using the output owns its correctness." },
    ],
  },

  {
    id: "task-decomposition",
    label: "Task Decomposition",
    cluster: "work",
    short: "Breaking work into pieces AI can handle reliably — the key to delegating complex tasks.",
    keywords: "task decomposition breaking down subtasks planning delegation steps scoping",
    learn: {
      why: "AI reliability drops as tasks get bigger and vaguer. Decomposing a complex task into well-scoped pieces is the skill that makes AI dependable on real work — and it mirrors how agents themselves are built.",
      sections: [
        { h: "Why big tasks fail", body: [
          "Ask an AI to 'build my whole app' and you'll get an impressive-looking mess. Large, ambiguous tasks give the model too much room to drift, and errors compound. Small, clearly-specified tasks with checkable outputs succeed far more reliably.",
        ]},
        { h: "How to decompose", body: [
          { ul: [
            "**Split by deliverable** — break the goal into concrete sub-outputs you can verify one at a time.",
            "**Sequence dependencies** — order steps so each builds on a verified previous result.",
            "**Define done** — give each piece a clear success criterion.",
            "**Keep pieces in the model's comfort zone** — scoped enough to do well in one focused pass.",
          ]},
        ]},
        { h: "Decomposition everywhere", body: [
          "This is the same principle behind chain-of-thought (decomposing reasoning), agent design (decomposing into tool-using steps), and multi-agent orchestration (decomposing across specialists). Whether you're prompting by hand or designing a system, **breaking the problem down** is the reliability lever. You supply the decomposition and verification; the AI executes the pieces.",
        ]},
      ],
      keyPoints: [
        "AI reliability falls on large, vague tasks and rises on small, clearly-scoped ones with checkable outputs.",
        "Decompose by deliverable, sequence dependencies, define 'done', and keep pieces in the model's comfort zone.",
        "The same decomposition principle underlies chain-of-thought, agents, and multi-agent systems.",
      ],
      source: { title: "Anthropic — Chain complex prompts / decompose tasks", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts", note: "Breaking complex work into reliable steps." },
    },
    quiz: [
      { q: "Why do large, vague tasks tend to fail with AI?", options: ["The model is too small", "Ambiguity gives the model room to drift and errors compound", "Big tasks are always fine", "There is no way to verify anything"], answer: 1, explain: "Broad tasks lack the constraints and checkpoints that keep the model on track." },
      { q: "A good decomposition gives each subtask…", options: ["No success criterion", "A clear 'done' definition and a verifiable output", "Maximum ambiguity", "The entire problem at once"], answer: 1, explain: "Well-scoped pieces with clear success criteria are far more reliably completed and checked." },
      { q: "Task decomposition is the same principle behind…", options: ["Quantization", "Chain-of-thought, agent design, and multi-agent orchestration", "Tokenization", "Batch normalization"], answer: 1, explain: "Breaking problems into steps underlies chain-of-thought, agents, and multi-agent systems alike." },
    ],
  },

  {
    id: "ai-workflows",
    label: "AI Workflows & Automation",
    cluster: "work",
    short: "Wiring AI into repeatable processes so it does real work, not just one-off chats.",
    keywords: "workflow automation pipeline repeatable process integration trigger scale",
    learn: {
      why: "The leap from 'chatting with AI' to 'AI doing recurring work automatically' is where big productivity gains live. Designing reliable AI workflows — for yourself or your team — turns one-off prompting into durable leverage.",
      sections: [
        { h: "From chat to workflow", body: [
          "A one-off chat helps once. A **workflow** embeds AI into a repeatable process: a trigger, defined steps (some AI, some deterministic), and a reliable output — run again and again. Examples: auto-summarizing incoming reports, triaging support tickets, drafting responses for review, extracting data from documents.",
        ]},
        { h: "Workflows vs. agents", body: [
          "A useful distinction: **workflows** follow predefined steps (predictable, reliable, easy to debug), while **agents** decide their own steps dynamically (flexible, less predictable). For most recurring business tasks, a **fixed workflow with AI steps** is more reliable than a fully autonomous agent — use the agent's flexibility only where you actually need it.",
        ]},
        { h: "Designing reliable ones", body: [
          { ul: [
            "**Deterministic where possible** — use code for anything that doesn't need the model.",
            "**Structured hand-offs** — pass structured output between steps, validate at boundaries.",
            "**Human checkpoints** — insert review before consequential or irreversible actions.",
            "**Monitor** — log runs and quality so you catch failures.",
          ]},
        ]},
      ],
      keyPoints: [
        "A workflow embeds AI into a repeatable trigger→steps→output process, turning one-off prompting into leverage.",
        "Workflows use predefined steps (reliable); agents choose steps dynamically (flexible) — prefer workflows for recurring tasks.",
        "Make steps deterministic where possible, validate structured hand-offs, add human checkpoints, and monitor.",
      ],
      source: { title: "Anthropic — Building effective agents (workflows vs. agents)", url: "https://www.anthropic.com/research/building-effective-agents", note: "The workflow/agent distinction and reliable patterns." },
    },
    quiz: [
      { q: "The difference between an AI workflow and an agent is that a workflow…", options: ["Uses no AI", "Follows predefined steps, while an agent decides its own steps dynamically", "Is always slower", "Cannot produce output"], answer: 1, explain: "Workflows are predictable predefined pipelines; agents choose their path dynamically." },
      { q: "For most recurring business tasks, the more reliable choice is usually…", options: ["A fully autonomous agent", "A fixed workflow with AI steps", "No automation", "The largest possible model only"], answer: 1, explain: "Predefined workflows are more predictable and debuggable than autonomous agents for routine tasks." },
      { q: "A good principle when designing AI workflows is to…", options: ["Use the model for every step even simple ones", "Use deterministic code where possible and validate structured hand-offs between steps", "Skip human review entirely", "Never log runs"], answer: 1, explain: "Reserve the model for steps that need it, validate boundaries, and add checkpoints and monitoring." },
    ],
  },

  {
    id: "writing-with-ai",
    label: "Writing & Communication with AI",
    cluster: "work",
    short: "Using AI to draft, edit, and sharpen writing — while keeping your voice and judgment.",
    keywords: "writing editing drafting communication tone summarize feedback style voice",
    learn: {
      why: "Writing is a huge part of knowledge work, and AI is a genuinely strong writing collaborator — for drafting, editing, restructuring, and adapting tone. Using it without losing your voice or shipping generic 'AI-sounding' text is a practical skill.",
      sections: [
        { h: "Where AI adds the most value", body: [
          { ul: [
            "**Overcoming the blank page** — a rough first draft you can react to and reshape.",
            "**Editing** — tightening, restructuring, fixing grammar, adjusting reading level.",
            "**Adapting** — same content re-pitched for a different audience, format, or tone.",
            "**Feedback** — critiquing your draft, spotting gaps, unclear points, weak arguments.",
            "**Summarizing** — condensing long material into the essential points.",
          ]},
        ]},
        { h: "Keeping it good (and yours)", body: [
          "Default AI prose tends toward generic, hedged, over-structured writing (the tell-tale 'it's not just X, it's Y', endless bullet lists, empty superlatives). Counter this by giving it **your** examples and voice, editing hard, and treating output as raw material — not a finished product. The ideas and judgment should be yours; AI helps with the execution.",
        ]},
        { h: "The honest stance", body: [
          "Use AI to write **better and faster**, not to outsource thinking. For anything you put your name to, you're accountable for accuracy and substance — verify facts it drafts, and make sure the final piece actually says what *you* mean.",
        ]},
      ],
      keyPoints: [
        "AI helps most with first drafts, editing, adapting tone/audience, feedback, and summarizing.",
        "Default AI prose sounds generic and over-structured — inject your voice/examples and edit hard.",
        "Use it to execute faster, not to outsource thinking; you're accountable for accuracy and substance.",
      ],
      source: { title: "Wikipedia — Signs of AI writing (style guide)", url: "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing", note: "A catalogue of AI-writing tells to edit out." },
    },
    quiz: [
      { q: "AI is most valuable in writing for…", options: ["Being the final authority on facts", "Drafting, editing, adapting tone, feedback, and summarizing", "Replacing your judgment entirely", "Guaranteeing originality"], answer: 1, explain: "AI excels at drafts and edits you then shape—not at owning the facts or your judgment." },
      { q: "Default AI prose often sounds generic because it tends toward…", options: ["Highly specific personal detail", "Hedged, over-structured writing with empty superlatives and endless bullets", "Perfectly original phrasing", "No structure at all"], answer: 1, explain: "Recognizable 'AI tells' include over-structuring, hedging, and vague superlatives—edit them out." },
      { q: "The honest stance on writing with AI is to use it to…", options: ["Outsource your thinking", "Write better and faster while staying accountable for substance and accuracy", "Avoid all editing", "Never verify facts"], answer: 1, explain: "AI aids execution; you remain responsible for the ideas, accuracy, and final meaning." },
    ],
  },

  {
    id: "research-with-ai",
    label: "Research & Learning with AI",
    cluster: "work",
    short: "Using AI to explore topics, explain concepts, and accelerate learning — with source-checking.",
    keywords: "research learning explain synthesis tutor exploration sources citations study",
    learn: {
      why: "AI is a remarkable learning and research accelerator — an always-available explainer that adapts to your level. Used well (with verification), it compresses the time to understand new fields; used naively, it teaches you confident falsehoods.",
      sections: [
        { h: "How AI accelerates learning", body: [
          { ul: [
            "**Explain at your level** — 'explain X like I know Y', progressively deeper.",
            "**Analogies & examples** — reframe an abstract idea in familiar terms.",
            "**Interactive tutoring** — ask follow-ups, test yourself, get feedback (like this atlas!).",
            "**Synthesis** — pull together and summarize a lot of material quickly.",
          ]},
        ]},
        { h: "The verification imperative", body: [
          "AI **hallucinates facts and citations**, and its knowledge has a training cutoff and gaps. For research, this is dangerous: a fabricated statistic or fake reference sounds exactly like a real one. Always **trace claims to primary sources**, prefer AI with citations/search, and treat its output as a lead to verify, not a fact to cite.",
        ]},
        { h: "Learning that sticks", body: [
          "AI can create an illusion of understanding — reading a fluent explanation feels like learning but often isn't (fluency vs. real retention). Combat this with **active retrieval**: quiz yourself, explain it back, apply it. Use AI to build understanding, then test that understanding independently — exactly the learn-then-quiz loop that makes knowledge durable.",
        ]},
      ],
      keyPoints: [
        "AI accelerates learning via level-adapted explanations, analogies, interactive tutoring, and synthesis.",
        "It hallucinates facts and citations — trace claims to primary sources; treat output as a lead to verify.",
        "Fluency isn't retention; use active retrieval (self-quizzing, explaining back) so learning actually sticks.",
      ],
      source: { title: "Bjork Learning & Forgetting Lab — desirable difficulties", url: "https://bjorklab.psych.ucla.edu/research/", note: "Why retrieval practice beats passive re-reading." },
    },
    quiz: [
      { q: "A major risk when using AI for research is that it…", options: ["Is always up to date", "Can hallucinate facts and citations that sound completely real", "Refuses to explain anything", "Only cites primary sources"], answer: 1, explain: "Fabricated statistics and fake references are indistinguishable in tone from real ones—verify them." },
      { q: "To make AI-assisted learning actually stick, you should…", options: ["Only re-read fluent explanations", "Use active retrieval — quiz yourself, explain it back, apply it", "Avoid testing yourself", "Trust the feeling of understanding"], answer: 1, explain: "Fluency creates an illusion of mastery; retrieval practice builds durable, real understanding." },
      { q: "The right way to treat a factual claim from an AI is as…", options: ["A citable fact", "A lead to verify against a primary source", "Always false", "Irrelevant"], answer: 1, explain: "Trace claims to primary sources before relying on or citing them." },
    ],
  },

  {
    id: "data-analysis-with-ai",
    label: "Data Analysis with AI",
    cluster: "work",
    short: "Using AI to explore data, write analysis code, and interpret results — carefully.",
    keywords: "data analysis code interpreter pandas sql exploration visualization statistics",
    learn: {
      why: "AI can dramatically speed up data work — writing SQL and pandas, generating charts, explaining statistics, and suggesting analyses. But data analysis is exactly where confident-but-wrong AI can produce authoritative nonsense, so the data-science fundamentals you learned matter more than ever.",
      sections: [
        { h: "What AI does well here", body: [
          { ul: [
            "**Writing analysis code** — SQL queries, pandas transformations, plotting code from a description.",
            "**Explaining** — what a statistical result or method means, in context.",
            "**Exploration** — suggesting analyses, spotting patterns, drafting summaries.",
            "**Code interpreters** — some tools run the code and iterate on real data, not just suggest it.",
          ]},
        ]},
        { h: "Where it goes wrong", body: [
          "AI can write code that runs but computes the **wrong** thing, misapply a statistical test, ignore data-quality issues (missing values, outliers, leakage), or over-interpret noise as signal. It doesn't know your data's quirks or business context, and it will confidently narrate a flawed result.",
        ]},
        { h: "Using it responsibly", body: [
          "Keep your **data-science judgment** in charge: sanity-check every result against what you know, inspect the actual data and the generated code, watch for the classic traps (correlation ≠ causation, leakage, sampling bias), and verify numbers independently. AI is a fast analyst's assistant — you're still the analyst responsible for the conclusions.",
        ]},
      ],
      keyPoints: [
        "AI speeds up writing analysis code (SQL/pandas/plots), explaining stats, and exploring data.",
        "It can compute the wrong thing convincingly, misapply tests, and ignore data-quality/leakage issues.",
        "Keep your data-science judgment in charge: inspect data and code, watch classic traps, verify numbers.",
      ],
      source: { title: "Google — Data analysis pitfalls (ML Crash Course data prep)", url: "https://developers.google.com/machine-learning/data-prep", note: "The data issues AI-generated analysis can miss." },
    },
    quiz: [
      { q: "A subtle danger of AI-assisted data analysis is that it can…", options: ["Only produce code that fails to run", "Write code that runs but computes the wrong thing, or misapply statistics convincingly", "Never make mistakes", "Refuse to write SQL"], answer: 1, explain: "Runnable-but-wrong analysis and misapplied tests are especially dangerous because they look authoritative." },
      { q: "Why do data-science fundamentals matter more when using AI for analysis?", options: ["They don't matter anymore", "You need the judgment to catch leakage, bias, and misinterpretation the AI won't flag", "AI handles all judgment", "Fundamentals slow you down"], answer: 1, explain: "AI lacks your data/business context; your fundamentals catch the traps it confidently walks into." },
      { q: "Responsible AI-assisted analysis requires you to…", options: ["Trust every number it outputs", "Inspect the data and generated code and verify results independently", "Skip looking at the data", "Never sanity-check"], answer: 1, explain: "You remain the analyst: check data, code, and results against known traps and independent verification." },
    ],
  },

  {
    id: "human-in-the-loop",
    label: "Human-in-the-Loop",
    cluster: "work",
    short: "Keeping human judgment at the decision points where AI shouldn't act alone.",
    keywords: "human in the loop oversight approval review autonomy checkpoint control",
    learn: {
      why: "Full autonomy is rarely the right design for consequential work. Human-in-the-loop — inserting people at the right decision points — is how you get AI's leverage while keeping control where mistakes are costly. It's a core design pattern for both AI products and your own workflows.",
      sections: [
        { h: "The pattern", body: [
          "Human-in-the-loop (HITL) means the system does the heavy lifting but **pauses for human judgment** at chosen points — approval before an action, review of an output, or a decision the AI surfaces but doesn't make. The human provides oversight exactly where it matters, not everywhere.",
        ]},
        { h: "Where to place the human", body: [
          { ul: [
            "**Before irreversible/consequential actions** — sending, publishing, deleting, spending, deploying.",
            "**On low-confidence cases** — route uncertain outputs to a person (like active learning).",
            "**At quality gates** — review before results feed downstream systems or customers.",
            "**For accountability** — where someone must own the decision.",
          ]},
        ]},
        { h: "Getting the balance right", body: [
          "Too little oversight risks costly errors; too much destroys the efficiency gain. The art is **calibrating autonomy to stakes and confidence** — automate the safe, reversible, high-confidence majority, and reserve human attention for the consequential or uncertain minority. As trust and evals improve, you can safely widen autonomy.",
        ]},
      ],
      keyPoints: [
        "Human-in-the-loop inserts human judgment at chosen decision points, not everywhere.",
        "Place humans before irreversible actions, on low-confidence cases, at quality gates, and where accountability is needed.",
        "Calibrate autonomy to stakes and confidence — automate the safe majority, reserve human attention for the risky minority.",
      ],
      source: { title: "Google PAIR — Human-AI Guidebook", url: "https://pair.google.com/guidebook/", note: "Design patterns for human oversight of AI." },
    },
    quiz: [
      { q: "Human-in-the-loop means…", options: ["A human does everything manually", "The AI does the work but pauses for human judgment at chosen decision points", "No humans are involved", "The AI reviews the human"], answer: 1, explain: "HITL inserts human oversight precisely where it matters, keeping AI's leverage elsewhere." },
      { q: "Where should a human checkpoint most clearly be placed?", options: ["On every trivial, reversible step", "Before irreversible or consequential actions like publishing, deleting, or spending", "Nowhere", "Only after everything is done"], answer: 1, explain: "Consequential, irreversible actions are exactly where human approval belongs." },
      { q: "The art of human-in-the-loop is to…", options: ["Maximize human review everywhere", "Calibrate autonomy to stakes and confidence, automating the safe majority", "Remove all oversight", "Never let AI act"], answer: 1, explain: "Balance efficiency and safety by reserving human attention for consequential or uncertain cases." },
    ],
  },

  {
    id: "ai-limitations",
    label: "Knowing AI's Limits",
    cluster: "work",
    short: "A clear-eyed map of what current AI is bad at — so you delegate wisely.",
    keywords: "limitations weaknesses hallucination reasoning knowledge cutoff context reliability judgment",
    learn: {
      why: "Using AI well depends as much on knowing its weaknesses as its strengths. A realistic mental model of where AI fails lets you delegate the right tasks, apply verification where it counts, and avoid the overconfidence that leads to public mistakes.",
      sections: [
        { h: "The persistent weaknesses", body: [
          { ul: [
            "**Hallucination** — confidently states false facts and fabricates sources.",
            "**Knowledge cutoff & no live awareness** — doesn't know recent events unless given tools/context.",
            "**Shaky reasoning** — can fail at multi-step logic, math, and counting despite fluency.",
            "**No true understanding of your context** — lacks your goals, constraints, and tacit knowledge.",
            "**Sensitivity & inconsistency** — small prompt changes swing outputs; same input can vary.",
            "**Bias** — reflects biases in training data.",
          ]},
        ]},
        { h: "What it means for delegation", body: [
          "Delegate tasks where AI is strong and errors are cheap or easy to verify (drafts, boilerplate, explanation, breadth). Keep tight control where it's weak and errors are costly (precise facts, novel reasoning, high-stakes decisions, anything needing your specific context). Match the task to the tool's actual, current capabilities.",
        ]},
        { h: "The moving target", body: [
          "These limits shift as models improve — some fast, some stubbornly. The durable skill isn't memorizing today's weaknesses but maintaining a **skeptical, empirical** stance: test what the model can actually do for *your* task, verify, and update your mental model as capabilities change.",
        ]},
      ],
      keyPoints: [
        "Core weaknesses: hallucination, knowledge cutoff, unreliable multi-step reasoning, no real grasp of your context, inconsistency, and bias.",
        "Delegate where AI is strong and errors are cheap/verifiable; keep control where it's weak and errors are costly.",
        "Limits move as models improve — stay skeptical and empirical, testing and updating your mental model.",
      ],
      source: { title: "Bender et al. — On the Dangers of Stochastic Parrots", url: "https://dl.acm.org/doi/10.1145/3442188.3445922", note: "A critical look at LLM limitations and risks." },
    },
    quiz: [
      { q: "Which is a persistent, well-known weakness of current AI?", options: ["Perfect factual accuracy", "Hallucinating facts and fabricating sources confidently", "Complete understanding of your personal context", "Flawless multi-step math"], answer: 1, explain: "Confident hallucination of facts and citations remains a core limitation." },
      { q: "Given AI's limits, you should delegate tasks where…", options: ["Errors are costly and hard to verify", "AI is strong and errors are cheap or easy to verify", "Only novel reasoning is required", "Your specific context is essential and unstated"], answer: 1, explain: "Match delegation to AI's strengths and to tasks where mistakes are inexpensive or checkable." },
      { q: "The durable skill regarding AI limits is to…", options: ["Memorize a fixed list of weaknesses forever", "Stay skeptical and empirical — test what the model can do for your task and update as it improves", "Assume limits never change", "Trust the model fully"], answer: 1, explain: "Capabilities shift, so maintain an evidence-based, skeptical stance and re-test rather than relying on a static list." },
    ],
  },
]);
