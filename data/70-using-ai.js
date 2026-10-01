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
      { q: "A colleague has AI draft a reply to a client, sends it without reading it, and it misstates the refund policy. Which habit would have prevented this?", options: ["Using a larger, more capable model for client emails", "Reading and checking the draft before it goes out", "Asking the AI to double-check its own reply first", "Writing the prompt more politely and in more detail"], answer: 1, explain: "Augmentation means you stay the driver: AI drafts, you verify. A bigger model or a self-check still lets an unreviewed, possibly wrong answer reach a client." },
      { q: "Which of these tasks is the best fit for handing to an AI first?", options: ["Deciding which of two job candidates to hire", "Confirming the exact figure in last quarter's audit", "Turning rough meeting notes into a tidy summary", "Choosing your team's priorities for next year"], answer: 2, explain: "AI shines at tedious, easily checked work like summarizing notes. Hiring and priorities need your judgment and context; an exact audit figure needs the source, not a plausible guess." },
      { q: "Two people use the same AI tool and one gets far more value from it. What most likely explains the gap?", options: ["One of them pays for a faster premium plan", "One uses it for every task, however small", "One accepts its first answer to save time", "One delegates well, adds context, and checks"], answer: 3, explain: "The durable advantage is the skill: clear delegation, good context and disciplined verification. Using it for everything or trusting first answers erodes the value." },
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
      { q: "An assistant's code calls `client.fetch_all_pages()`, and your tests fail with 'no such method'. What most likely happened?", options: ["It invented a plausible method the library doesn't have", "The library was updated after you installed it", "Your test runner is loading an old version of the file", "The assistant ran out of context and cut the code short"], answer: 0, explain: "Hallucinated APIs are a classic failure: the model writes a method name that sounds right for the library but doesn't exist. Check the docs, or run it." },
      { q: "An assistant generated a 400-line change in one go. What's the best way to handle it?", options: ["Merge it if it compiles and the existing tests still pass", "Ask the assistant whether it's confident the change is correct", "Break it into smaller steps you can read and test one at a time", "Paste it into a second assistant and merge if it agrees"], answer: 2, explain: "Keep changes reviewable: small steps you read and test. Compiling isn't correctness, and asking a model about its own confidence isn't verification." },
      { q: "The lesson says to review AI-generated code the way you'd review…", options: ["A senior engineer's code: skim it, since it's likely right", "A compiler's output: correct by construction if it builds", "A linter's warnings: only worth a look when something breaks", "A junior engineer's pull request: useful, fast, needs review"], answer: 3, explain: "Treat it like a junior's pull request: often useful and quick, but it needs real review, and you stay accountable for correctness." },
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
      { q: "What separates a coding agent from autocomplete-style assistance?", options: ["It uses a larger model trained specifically on source code", "It writes code only after you approve every single line", "It plans, edits many files, runs tests, and iterates", "It works offline without sending your code to a server"], answer: 2, explain: "An agent runs the think→act→observe loop over your codebase: it reads files, plans, edits across them, runs commands or tests, sees the results, and iterates." },
      { q: "You're about to give a coding agent a task in a large, unfamiliar repo. What most improves the result?", options: ["Asking it to work as fast as possible and skip the tests", "Pointing it to the relevant files, tests, and conventions", "Giving it the whole goal at once so it sees the big picture", "Letting it rewrite unclear code however it thinks is best"], answer: 1, explain: "Context matters even more with agents: the right files, tests and conventions (e.g. an AGENTS.md) steer it. One giant goal or free rein invites drift and over-editing." },
      { q: "Which setup makes an agent's changes safest to accept?", options: ["Scoped tasks in version control, with tests as ground truth", "Running it on the main branch so you see effects right away", "Disabling its ability to run commands so it can't break things", "Letting it finish the whole feature before looking at anything"], answer: 0, explain: "Scope the task, work in version control so every change is reviewable and reversible, and let tests tell you whether it works. Stay in the loop for anything big." },
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
      { q: "An AI answer gives a precise statistic and a named source, stated with total confidence. What does the confidence tell you about accuracy?", options: ["A lot — models hedge when they're unsure of a fact", "Nothing — wrong answers sound as confident as right ones", "Some — a named source means it was looked up, not invented", "Enough — models rarely make up precise numbers"], answer: 1, explain: "Confidence and fluency are independent of correctness. Models invent statistics and citations in the same authoritative tone, so follow the source." },
      { q: "You're using AI for two jobs: a funny caption for a team slide, and a clause in a customer contract. How should your checking differ?", options: ["Check both thoroughly — every AI output needs full review", "Check neither — you'll catch any problems when they surface", "Glance at the caption; carefully verify the contract clause", "Ask the AI to rate its confidence and check the low ones"], answer: 2, explain: "Scale verification to the stakes: trivial, reversible outputs need a glance; consequential ones need real scrutiny against ground truth." },
      { q: "A report you sent had an error that came from an AI summary. Who is accountable?", options: ["The AI vendor, since its model made the error", "No one in particular — AI errors are unpredictable", "Whoever approved the company's use of that tool", "You — whoever uses the output is responsible for it"], answer: 3, explain: "The person who uses the output owns its correctness. 'The AI said so' is never a defense, which is why verification is part of the job." },
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
      { q: "You ask an AI to 'write our whole onboarding handbook' and get something polished but generic, and wrong in places. What's the most effective next step?", options: ["Re-run the same request with a more capable model", "Split it into sections, each with its own brief and check", "Add 'be accurate and detailed' to the original request", "Ask it to make the whole handbook longer and more specific"], answer: 1, explain: "Large, vague tasks give the model room to drift. Smaller pieces with clear success criteria, each checked, are far more reliable." },
      { q: "When you break a task into pieces, why should each piece have a clear definition of 'done'?", options: ["So you can check each result before building on it", "So the AI can skip steps it considers unnecessary", "So the pieces can all run at once in any order", "So the final output ends up shorter and cheaper"], answer: 0, explain: "A success criterion makes each piece checkable, so errors are caught before later steps depend on them, instead of compounding." },
      { q: "Chain-of-thought prompting, agent design and multi-agent systems all rely on which shared idea?", options: ["Using the largest model available for every step", "Removing humans from the process wherever possible", "Breaking a problem into smaller, manageable steps", "Giving the model as much text as it can hold"], answer: 2, explain: "Decomposition is the common lever: step-by-step reasoning, tool-using steps and specialist agents are all ways of breaking a problem down." },
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
      { q: "Your team wants AI to triage support tickets every day. Why is a fixed workflow usually a better starting point than a fully autonomous agent?", options: ["Agents can't read or classify written text", "Predefined steps are predictable and easy to debug", "Workflows never need a human to look at results", "Workflows make the model itself more accurate"], answer: 1, explain: "For recurring tasks, predefined steps are more reliable and easier to debug. Save an agent's flexibility for where you actually need it." },
      { q: "In an invoice-processing workflow, which step is better done by plain code than by the model?", options: ["Summarizing an unusual note the customer attached", "Deciding which department an odd request belongs to", "Drafting a polite reply to a confused customer", "Adding up line items and checking the total matches"], answer: 3, explain: "Use deterministic code for anything that doesn't need the model. Arithmetic and exact checks are cheaper, and always right, in code." },
      { q: "An AI workflow drafts refund emails to customers. Where should a human checkpoint go?", options: ["At the start, before the AI reads each ticket", "Before any email is actually sent to a customer", "After sending, by reading a weekly sample of emails", "Nowhere, as long as the prompt is well tested"], answer: 1, explain: "Put human review before consequential or irreversible actions. A sent email can't be unsent, so that's where oversight pays off." },
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
      { q: "An AI rewrite of your blog post comes back full of 'it's not just X, it's Y' lines and bullet lists. What's the best fix?", options: ["Give it examples of your own writing and edit the result hard", "Accept it, since readers now expect this style from content", "Ask it to use more impressive vocabulary throughout", "Switch to a different AI tool and publish that version"], answer: 0, explain: "Default AI prose is generic and over-structured. Give it your voice and examples, and treat the output as raw material to edit." },
      { q: "Where does AI add the most value in writing?", options: ["Deciding what your argument should be", "Getting past the blank page with a draft to react to", "Guaranteeing the facts in your piece are accurate", "Replacing your final read-through before sending"], answer: 1, explain: "A rough first draft you can react to is one of AI's biggest wins, along with editing, adapting tone, and feedback. The ideas and the fact-checking stay yours." },
      { q: "AI drafted a proposal you'll send under your name, including a market-size figure. What's your responsibility?", options: ["None for the figure, as long as you say AI helped", "Round the figure so that it's less likely to be wrong", "Verify the figure and make sure it says what you mean", "Ask the AI to confirm the figure before you send it"], answer: 2, explain: "You're accountable for the accuracy and substance of anything you sign. Check drafted facts against a source; asking the model to confirm isn't a check." },
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
      { q: "An AI gives you a perfect-sounding quote attributed to a 2019 study. What should you do before using it?", options: ["Use it, since the AI named a specific year and study", "Find the study itself and confirm the quote is in it", "Ask the AI again and use it if the answer is the same", "Rephrase it slightly so it doesn't need a citation"], answer: 1, explain: "Fabricated quotes and references sound exactly like real ones. Treat AI output as a lead and trace it to the primary source." },
      { q: "After reading a clear AI explanation, you feel you understand the topic. What's the best way to check that you really do?", options: ["Read an even longer explanation of the same topic", "Ask the AI whether its explanation was accurate", "Highlight the key sentences in the explanation", "Explain it back or answer questions without looking"], answer: 3, explain: "Fluency isn't retention. Active retrieval, like quizzing yourself or explaining it back, shows whether the understanding is really yours." },
      { q: "Why is an AI's knowledge cutoff a risk when researching a fast-moving topic?", options: ["It makes the AI refuse to discuss recent events", "It may confidently describe an outdated state of things", "It stops the AI from explaining the older background", "It makes every answer on that topic wrong"], answer: 1, explain: "Without search or supplied context, a model doesn't know what changed after training, and won't necessarily say so. Prefer tools with search and citations, and verify." },
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
      { q: "AI-written pandas code runs without errors and produces a neat chart. What risk remains?", options: ["It may compute the wrong thing, like a bad join or filter", "None — code that runs cleanly has computed the right thing", "The chart library may render the colors inconsistently", "Charts made by AI can't be exported to other tools"], answer: 0, explain: "Code that runs can still be wrong: a join that duplicates rows, a filter that drops data. Inspect the data and the code, and sanity-check the numbers." },
      { q: "The AI reports that users who open the weekly email spend 40% more, so the email causes higher spending. What should you question first?", options: ["Whether 40% was rounded correctly from the raw data", "Whether engaged users both open emails and spend more", "Whether the chart should have used a bar or a line", "Whether the AI used Python or SQL for the analysis"], answer: 1, explain: "Correlation isn't causation. Already-engaged customers may do both; the AI will narrate a causal story unless you apply that judgment." },
      { q: "Which problem is AI especially likely to miss without your help?", options: ["Choosing a readable font size for chart labels", "Knowing the syntax for a SQL GROUP BY clause", "Quirks in your data, like duplicates or leakage", "Formatting numbers with commas in a summary table"], answer: 2, explain: "The model doesn't know your data's quirks or business context: missing values, duplicates, leakage. You have to inspect for them." },
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
      { q: "An AI system can issue customer refunds on its own. Where does a human review step add the most value?", options: ["Reading every chat message before the AI sees it", "Approving large refunds before any money is paid", "Checking a random sample of refunds each quarter", "Reviewing the system's logs only after a complaint"], answer: 1, explain: "Place humans before consequential, irreversible actions like paying money out, not everywhere. Sampling after the fact catches problems too late." },
      { q: "A document classifier is 99% confident on most files and unsure about a few. How should you use human reviewers?", options: ["Have them re-check every file to be completely safe", "Skip human review, since the average is so high", "Have them review a fixed 10% of files at random", "Route only the low-confidence files to a person"], answer: 3, explain: "Calibrate autonomy to confidence: automate the confident majority and save human attention for the uncertain minority." },
      { q: "What's the cost of putting a human approval step on every AI action?", options: ["It makes the system less accurate on average", "It wipes out most of the efficiency gain", "It makes the AI's outputs harder to explain", "It stops the model from learning over time"], answer: 1, explain: "Too much oversight destroys the efficiency gain, just as too little risks costly errors. The skill is placing people where stakes or uncertainty are high." },
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
      { q: "Which task is most likely to trip up a current AI assistant?", options: ["Rewording a paragraph for a friendlier tone", "Counting exactly how many times a word appears", "Suggesting five names for a new internal project", "Summarizing a short article you've pasted in"], answer: 1, explain: "Despite their fluency, models are shaky at precise multi-step logic, math and counting. Rewording, brainstorming and summarizing play to their strengths." },
      { q: "You ask an AI which of two internal tools your team should adopt. What's its main limitation here?", options: ["It can't compare two options in a single answer", "It will refuse questions about business decisions", "It always picks whichever option it heard of first", "It lacks your team's goals, constraints, and context"], answer: 3, explain: "The model doesn't know your goals, constraints or tacit knowledge. It can lay out trade-offs, but the decision needs your context." },
      { q: "A limitation you read about last year may not hold today. What's the right stance?", options: ["Assume last year's list still applies until told otherwise", "Test the model on your own task and update your view", "Assume new models have fixed every earlier weakness", "Avoid the AI for anything that was once a weakness"], answer: 1, explain: "Limits move as models improve, some quickly and some slowly. Stay empirical: test what the model can do for your task, verify, and update your view." },
    ],
  },

  {
    id: "how-ai-assistants-work",
    label: "How AI Assistants Work",
    cluster: "work",
    short: "What a chatbot like ChatGPT or Claude is actually doing, in plain English with no math.",
    keywords: "chatbot chatgpt claude gemini copilot assistant llm plain english beginner how it works next word prediction non-technical",
    learn: {
      why: "You don't need to know the engineering to use AI well, but you do need a working mental model. Knowing roughly what an assistant is doing explains both why it's so useful and why it sometimes makes things up with total confidence.",
      sections: [
        { h: "A very well-read autocomplete", body: [
          "An AI assistant is built on a **large language model**. In training it read an enormous amount of text and learned one skill: given some text, **predict what comes next**. When you ask it something, it writes the answer a small piece at a time, each time picking a likely next piece.",
          "That sounds simple, but doing it well across almost every topic forces the model to pick up grammar, facts, writing styles and patterns of reasoning. That's where its surprising abilities come from.",
        ]},
        { h: "Then it's taught to be an assistant", body: [
          "A model fresh from that first stage only continues text. It's then trained further, on examples of good answers and on people's ratings of which answers are better, so that it follows requests, declines harmful ones and writes in a helpful tone.",
        ]},
        { h: "Why it can be confidently wrong", body: [
          { ul: [
            "**It isn't looking things up.** What it 'knows' is a blurry memory of its training text, not a database. When it doesn't know, it can produce something that merely sounds right.",
            "**It sounds equally sure either way.** The fluent, confident tone is the same whether the answer is right or wrong.",
            "**It may be out of date.** Unless it's connected to search, it only knows its training data, up to a cutoff date.",
            "**It only knows what's in the conversation.** It doesn't know your company, your project or your goals unless you tell it.",
          ]},
        ]},
        { h: "What this means for you", body: [
          "Treat it like a fast, knowledgeable, occasionally wrong colleague: great for drafts, explanations, brainstorming and summaries, and something to check when facts, numbers or decisions matter. Many assistants can now search the web or read your files, which helps, but you're still responsible for the result.",
        ]},
      ],
      keyPoints: [
        "An assistant runs on a model trained to predict the next piece of text, and writes its answers one piece at a time.",
        "Further training on good examples and human ratings turns that predictor into a helpful assistant.",
        "It doesn't look facts up, so it can be confidently wrong, out of date, or unaware of your context. Check what matters.",
      ],
      source: { title: "Timothy B. Lee & Sean Trott — Large language models, explained with a minimum of math and jargon", url: "https://www.understandingai.org/p/large-language-models-explained-with", note: "A clear, non-technical walkthrough of how these models work and why they make mistakes." },
    },
    quiz: [
      { q: "A coworker says the AI 'looked up' a figure it gave them. Assuming it had no web search, what's a more accurate picture of what happened?", options: ["It searched a database of verified company facts", "It wrote a likely answer from patterns it learned", "It copied the figure from another user's chat", "It asked a human expert and relayed their answer"], answer: 1, explain: "Without search or access to your files, an assistant generates a plausible answer from what it learned in training. That's why figures need checking." },
      { q: "Why does an assistant sound just as confident when it's wrong as when it's right?", options: ["It's deliberately designed to hide its mistakes", "It only replies when it's completely sure it's right", "Its fluent tone doesn't depend on being correct", "Its confidence is set by the person who's asking"], answer: 2, explain: "It's trained to write fluent, helpful text, and that tone stays the same whether or not the content is accurate. You can't judge correctness by how sure it sounds." },
      { q: "You ask an assistant without web search about something that happened last week. What's most likely?", options: ["It will always say it can't know recent events", "It will know, since it updates itself every day", "It will refuse to answer any question about news", "It may not know, or may confidently guess wrong"], answer: 3, explain: "Without search, it only knows its training data up to a cutoff date, and it won't always say so. For recent events, use a tool with search, or check a source." },
    ],
  },

  {
    id: "everyday-prompting",
    label: "Prompting for Everyday Work",
    cluster: "work",
    short: "How to brief an AI like a capable new colleague, so you get useful answers the first time.",
    keywords: "prompting prompt tips how to ask chatgpt claude brief context examples format iterate everyday non-technical beginner",
    learn: {
      why: "What you get back depends heavily on what you ask. Most disappointing AI answers come from vague requests rather than weak models, and a few habits fix most of them.",
      sections: [
        { h: "Brief it like a capable new colleague", body: [
          "Imagine handing the task to someone smart who joined today and knows nothing about your team, your customers or your goals. They'd need the background, what you want, and what a good result looks like. An AI needs the same.",
          "A useful test from Anthropic's own guidance: if a colleague with no context would be confused by your request, the AI will be too.",
        ]},
        { h: "What to include", body: [
          { ul: [
            "**The goal, and why**: what this is for, and who will read it.",
            "**The context**: the facts, documents or notes it needs. Paste them in rather than assuming it knows them.",
            "**The format**: length, structure and tone, e.g. 'three bullet points, plain language, for a busy executive'.",
            "**An example**: if you have one of the style or output you want, show it.",
            "**Constraints**: what to avoid, and what must be included.",
          ]},
        ]},
        { h: "Iterate instead of starting over", body: [
          "Treat the first answer as a draft. Say what's off and what to change: 'shorter', 'less formal', 'you missed the pricing change'. On bigger tasks, asking it to list the questions it needs answered before it starts often helps, and so does breaking the work into steps.",
        ]},
        { h: "Before and after", body: [
          "**Vague:** 'Write an email about the delay.'",
          "**Better:** 'Write a short, apologetic email to our customer Acme about the two-week delay to their order, caused by a supplier shortage. Offer free shipping on their next order. Friendly, professional tone, under 120 words.'",
        ]},
      ],
      keyPoints: [
        "Brief the AI like a smart new colleague with no context: goal, background, format, an example, and constraints.",
        "Paste in the facts it needs rather than assuming it already knows them.",
        "Treat the first answer as a draft, and refine it with specific feedback.",
      ],
      source: { title: "Anthropic — Prompting best practices", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", note: "The opening section on being clear and direct, including the 'new employee' framing and the colleague test, applies to anyone, not just developers." },
    },
    quiz: [
      { q: "You ask an AI to 'summarize this for my boss' and get a long, generic summary. What would most improve the next try?", options: ["Ask the same question again until it improves", "Switch to a different AI tool and paste it there", "Say what your boss cares about and the length", "Add 'please' and 'thank you' to the request"], answer: 2, explain: "Vague requests get generic answers. Give the goal, the audience and the format, the way you'd brief a new colleague." },
      { q: "An AI drafts a reply to a customer but gets your refund policy wrong. What's the best fix?", options: ["Tell it to be more accurate this time", "Paste the actual policy into your request", "Ask it whether it knows your company's policy", "Use a longer, more formal tone in the request"], answer: 1, explain: "It doesn't know your company's documents unless you provide them. Paste in the facts it needs instead of hoping it knows them." },
      { q: "An AI's first draft is close, but too formal and a bit long. What's the most efficient next step?", options: ["Start a brand-new chat and write the prompt from scratch", "Accept it as is, since AI drafts can't be adjusted", "Rewrite the whole thing yourself from the beginning", "Reply with specific changes: 'more casual, half as long'"], answer: 3, explain: "Treat the first answer as a draft and iterate with specific feedback. The chat keeps the context, so it usually gets there faster than starting over." },
    ],
  },
]);
