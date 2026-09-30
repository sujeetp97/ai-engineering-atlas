/* ===========================================================================
   BUILDING AI / LLMs — how large language models are actually made.
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "large-language-models",
    label: "Large Language Models",
    cluster: "llm",
    short: "Transformers trained on vast text to predict the next token — and, from that alone, learn to reason, write, and code.",
    keywords: "llm gpt claude language model foundation model next token generative",
    learn: {
      why: "LLMs are the technology you're building on as an AI engineer. Understanding what they fundamentally are — and are not — is the difference between using them effectively and being surprised by their failures.",
      sections: [
        { h: "What an LLM is", body: [
          "A large language model is a very large **transformer** (billions of parameters) trained on enormous amounts of text with one deceptively simple objective: **predict the next token**. That's it. Everything else — answering questions, writing code, translating — emerges from doing next-token prediction extremely well.",
        ]},
        { h: "How it comes to be", body: [
          { ul: [
            "**Pretraining** — learn language and world knowledge from internet-scale text via next-token prediction. Hugely expensive; done once.",
            "**Post-training** — instruction-tuning and RLHF turn the raw predictor into a helpful, safe assistant that follows instructions.",
            "**Inference** — at use time, the model generates responses token by token from your prompt.",
          ]},
        ]},
        { h: "The right mental model", body: [
          "An LLM is a **next-token predictor** shaped by training to be useful. It has no database it looks things up in; knowledge is baked into its weights, which is why it can be confidently wrong (**hallucinate**). It reasons within its **context window**, and its behavior is steered by your prompt. Treat it as a powerful, fallible pattern-completer, not an oracle.",
        ]},
      ],
      keyPoints: [
        "An LLM is a large transformer trained to predict the next token; capabilities emerge from that objective.",
        "Lifecycle: expensive pretraining → post-training (instruction tuning + RLHF) → token-by-token inference.",
        "Knowledge lives in the weights, not a lookup table — hence hallucination; steer it via prompt and context.",
      ],
      source: { title: "Andrej Karpathy — Intro to Large Language Models", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", note: "A one-hour, high-signal overview of what LLMs are." },
    },
    quiz: [
      { q: "A user asks why an LLM confidently cited a paper that doesn't exist. What's the best explanation?", options: ["It searched a database that contained a bad entry", "It predicts plausible text from its weights", "It copied the citation from another user's chat", "Its safety training requires citing some source"], answer: 1, explain: "An LLM has no lookup table. It generates likely next tokens from knowledge compressed into its weights, so it can produce confident, plausible fabrications." },
      { q: "What single objective is an LLM pretrained on?", options: ["Answering questions with human-verified answers", "Classifying text as helpful or harmful", "Predicting the next token in a piece of text", "Translating between pairs of languages"], answer: 2, explain: "Pretraining is next-token prediction over huge text corpora. Answering questions, coding and translation emerge from doing that very well." },
      { q: "Which step turns a raw next-token predictor into a helpful assistant?", options: ["More pretraining on an even larger dataset", "Increasing the context window at inference", "Running it at a lower sampling temperature", "Post-training: instruction tuning and RLHF"], answer: 3, explain: "Pretraining gives knowledge and fluency. Post-training (instruction tuning, then RLHF) teaches the model to follow instructions helpfully and safely." },
    ],
  },

  {
    id: "tokenization",
    label: "Tokenization",
    cluster: "llm",
    short: "Chopping text into the sub-word units an LLM actually reads — with big practical consequences.",
    keywords: "tokenization tokens bpe subword vocabulary context cost encoding",
    learn: {
      why: "Tokens are the atoms of everything an LLM does — context limits, pricing, and even some weird failure modes are all about tokens. As an AI engineer you pay per token and budget context in tokens, so this isn't academic.",
      sections: [
        { h: "Why not just words or characters?", body: [
          "Characters make sequences too long; whole words make the vocabulary huge and can't handle new words. LLMs use **sub-word tokenization** (like Byte-Pair Encoding): common words become one token, rare words split into pieces. 'tokenization' might be `token` + `ization`.",
        ]},
        { h: "Practical consequences", body: [
          { ul: [
            "**Cost & limits** — you're billed per token and the context window is measured in tokens (~4 chars ≈ 1 token in English).",
            "**Languages differ** — non-English text and code often use more tokens per idea, costing more.",
            "**Odd failures** — character-level tasks (counting letters, reversing strings) are hard because the model sees tokens, not letters. The classic 'how many r's in strawberry' stumble is a tokenization artifact.",
          ]},
        ]},
        { h: "Engineer's takeaway", body: [
          "Think in tokens, not words, when estimating cost and context. Count tokens with the model's tokenizer before sending huge inputs, and don't be surprised when a model fumbles a spelling or arithmetic task — it never saw the characters the way you do.",
        ]},
      ],
      keyPoints: [
        "LLMs read sub-word tokens (e.g. BPE): common words = one token, rare words split into pieces.",
        "Context windows and pricing are measured in tokens (~4 English characters ≈ 1 token).",
        "Character-level tasks are hard because the model sees tokens, not individual letters.",
      ],
      source: { title: "Karpathy — Let's build the GPT Tokenizer", url: "https://www.youtube.com/watch?v=zduSFxRajkE", note: "Builds BPE tokenization from scratch and explains the quirks." },
    },
    quiz: [
      { q: "A model miscounts the letters in 'strawberry'. What's the most likely cause?", options: ["It sees sub-word tokens, not individual letters", "Its context window is too short for the word", "It was never trained on that particular word", "Its temperature was set too high for counting"], answer: 0, explain: "The model reads sub-word tokens, so character-level tasks like counting or reversing letters are awkward for it. It's a tokenization artifact." },
      { q: "A prompt is about 3,000 English words. Roughly how many tokens is that?", options: ["About 750 tokens", "About 3,000 tokens", "About 4,000 tokens", "About 12,000 tokens"], answer: 2, explain: "At roughly 4 characters per token, an average English word is about 1.3 tokens, so 3,000 words is around 4,000 tokens. Use the model's tokenizer for real budgets." },
      { q: "Your app serves English and Hindi users with the same prompts. Why might the Hindi requests cost more?", options: ["Providers add a surcharge for non-English text", "The same idea often takes more tokens in Hindi", "Hindi responses are always longer in characters", "The model has to translate Hindi to English first"], answer: 1, explain: "Tokenizers are often trained mostly on English, so other languages (and code) can need more tokens per idea, which costs more and uses more context." },
    ],
  },

  {
    id: "pretraining",
    label: "Pretraining",
    cluster: "llm",
    short: "The massive, expensive phase where a model learns language and world knowledge from raw text.",
    keywords: "pretraining foundation compute corpus scale gpu base model self-supervised",
    learn: {
      why: "Pretraining is where an LLM's raw intelligence and knowledge come from. Understanding its scale and mechanics explains why these models cost millions to make, why data quality matters so much, and what 'base model' means before any alignment.",
      sections: [
        { h: "What happens in pretraining", body: [
          "The model is shown enormous amounts of text (trillions of tokens from the web, books, code) and trained with **self-supervised** next-token prediction. To predict the next token well across all that text, it's forced to internalize grammar, facts, reasoning patterns, and code. No human labels are needed — the text is its own supervision.",
        ]},
        { h: "The scale", body: [
          { ul: [
            "**Data** — trillions of tokens, heavily filtered and deduplicated (quality matters enormously).",
            "**Compute** — thousands of GPUs for weeks or months; costs in the millions of dollars.",
            "**Result** — a **base model**: knowledgeable and fluent, but not yet a helpful assistant. It just continues text.",
          ]},
        ]},
        { h: "Why it dominates the cost", body: [
          "Pretraining is done **once** and is by far the most expensive step; everything after (fine-tuning, RLHF) is comparatively cheap. This is why only a few organizations pretrain frontier models, while everyone else builds on top via fine-tuning, prompting, and RAG. The base model's quality caps everything downstream.",
        ]},
      ],
      keyPoints: [
        "Pretraining uses self-supervised next-token prediction over trillions of tokens to learn language and knowledge.",
        "It's enormously expensive (thousands of GPUs, millions of dollars) and done once, producing a 'base model'.",
        "A base model is fluent but not yet helpful; alignment comes after. Base quality caps everything downstream.",
      ],
      source: { title: "Brown et al. — GPT-3: Language Models are Few-Shot Learners", url: "https://arxiv.org/abs/2005.14165", note: "The paper that showed scale unlocks emergent abilities." },
    },
    quiz: [
      { q: "Why don't most companies pretrain their own frontier model?", options: ["Pretraining requires labeled data they lack", "Only open-source models can be pretrained", "Pretrained models can't be fine-tuned later", "It costs millions in data and compute"], answer: 3, explain: "Pretraining needs trillions of tokens and thousands of GPUs for weeks or months. A few labs do it once; everyone else builds on top." },
      { q: "You prompt a base model (before any post-training) with 'What is the capital of France?'. What might it do?", options: ["Refuse, since it hasn't been safety-trained yet", "Answer 'Paris' in a friendly assistant tone", "Continue with more questions, as in a quiz list", "Return an error until it is instruction-tuned"], answer: 2, explain: "A base model just continues text. A list of questions is a plausible continuation, so it may write more questions instead of answering." },
      { q: "Where do pretraining's 'labels' come from?", options: ["Human annotators rating each passage", "The next token in the text itself", "A smaller model that grades the text", "Search results matched to each page"], answer: 1, explain: "It's self-supervised: the text supervises itself. The target at each position is simply the token that comes next." },
    ],
  },

  {
    id: "self-supervised-learning",
    label: "Self-Supervised Learning",
    cluster: "llm",
    short: "Creating labels from the data itself — the trick that let AI learn from the whole internet.",
    keywords: "self-supervised pretext task labels unlabeled scale masked next token",
    learn: {
      why: "Self-supervised learning is the conceptual breakthrough that unlocked modern AI. It sidesteps the labeling bottleneck by manufacturing labels from unlabeled data, which is why models can train on essentially all the text and images humans have ever produced.",
      sections: [
        { h: "The core trick", body: [
          "Supervised learning needs labeled data, which is scarce and expensive. Self-supervised learning invents a **pretext task** whose labels come free from the data's own structure: hide part of the input and predict it from the rest.",
        ]},
        { h: "How it shows up", body: [
          { ul: [
            "**Next-token prediction** (GPT-style) — predict the following token from the preceding text.",
            "**Masked prediction** (BERT-style) — blank out words and predict them from both sides.",
            "**Contrastive learning** (vision) — learn that two augmented views of the same image should match.",
          ]},
          "In every case, the 'label' is part of the data you deliberately withheld.",
        ]},
        { h: "Why it's so powerful", body: [
          "Because no human labeling is required, self-supervision scales to unlimited data. And to solve the pretext task well, the model must learn genuinely useful representations of language or vision — which then transfer to countless downstream tasks. This is the foundation of the whole foundation-model era.",
        ]},
      ],
      keyPoints: [
        "Self-supervised learning generates labels from the data's own structure (hide part, predict it).",
        "Examples: next-token prediction, masked-word prediction, contrastive image learning.",
        "No manual labels means unlimited-scale training and rich transferable representations.",
      ],
      source: { title: "Yann LeCun — Self-Supervised Learning (overview)", url: "https://ai.meta.com/blog/self-supervised-learning-the-dark-matter-of-intelligence/", note: "Why self-supervision is central to modern AI." },
    },
    quiz: [
      { q: "What lets self-supervised learning scale to internet-sized data?", options: ["Labels come from the data itself, not from people", "It uses much smaller models than supervised learning", "It only trains on carefully curated examples", "It skips training and relies on retrieval"], answer: 0, explain: "Hiding part of the input and predicting it creates labels for free, so there's no human-labeling bottleneck." },
      { q: "How does BERT-style masked prediction differ from GPT-style next-token prediction?", options: ["It predicts the next word using only earlier text", "It needs humans to label which words to mask", "It predicts whole sentences instead of words", "It predicts hidden words from context on both sides"], answer: 3, explain: "Masked prediction blanks out words and predicts them from context on both sides. Next-token prediction only looks at what came before." },
      { q: "Why do representations learned this way transfer to so many other tasks?", options: ["The pretext task is secretly the same as every task", "Transfer only works when tasks share the same labels", "Solving the pretext task forces useful internal features", "The model memorizes answers to all common tasks"], answer: 2, explain: "To predict hidden parts well, the model must learn real structure in language or images, and those representations are useful far beyond the pretext task." },
    ],
  },

  {
    id: "fine-tuning",
    label: "Fine-Tuning",
    cluster: "llm",
    short: "Adapting a pretrained model to your specific task or style with additional targeted training.",
    keywords: "fine-tuning lora peft adaptation specialization training weights",
    learn: {
      why: "Fine-tuning is one of your main levers for customizing an LLM. Knowing when it beats prompting or RAG — and how modern parameter-efficient methods make it cheap — is core AI-engineering judgment.",
      sections: [
        { h: "What it is", body: [
          "Fine-tuning continues training a pretrained model on a smaller, task-specific dataset, nudging its weights toward your domain, format, or behavior. It's transfer learning applied to LLMs.",
        ]},
        { h: "Full vs. parameter-efficient", body: [
          { ul: [
            "**Full fine-tuning** — update all weights. Powerful but expensive and produces a full-size copy per task.",
            "**LoRA / PEFT** — freeze the base model and train tiny added matrices (low-rank adapters). Achieves most of the benefit at a fraction of the cost and storage, and you can swap adapters per task.",
          ]},
        ]},
        { h: "When to fine-tune (vs. prompt or RAG)", body: [
          "Fine-tuning shines for teaching a consistent **style/format**, a narrow **skill**, or to compress long repeated instructions into the weights. It's usually the **wrong** tool for injecting fresh **knowledge** — that's what **RAG** is for, since fine-tuning bakes data in statically and can cause forgetting. Rule of thumb: prompt first, RAG for knowledge, fine-tune for behavior.",
        ]},
      ],
      keyPoints: [
        "Fine-tuning continues training a pretrained model on task-specific data to adapt its behavior.",
        "LoRA/PEFT tune a tiny fraction of parameters, making it cheap and swappable versus full fine-tuning.",
        "Use fine-tuning for style/skill/format; use RAG for fresh knowledge; try prompting first.",
      ],
      source: { title: "Hu et al. — LoRA: Low-Rank Adaptation", url: "https://arxiv.org/abs/2106.09685", note: "The parameter-efficient fine-tuning method now widely used." },
    },
    quiz: [
      { q: "You need 20 differently fine-tuned variants of one model, one per customer, cheaply. What's the best approach?", options: ["Full fine-tuning of 20 separate full-size copies", "LoRA adapters: small per-customer add-ons, one base", "One giant prompt containing all 20 customers' rules", "Pretraining a new base model for each customer"], answer: 1, explain: "LoRA/PEFT freezes the base model and trains tiny adapters, giving most of the benefit at a fraction of the cost and storage, with an adapter per task." },
      { q: "Which goal is fine-tuning best suited for?", options: ["Answering questions about this week's sales figures", "Looking up a customer's order status in real time", "Citing the exact source behind each answer given", "A consistent house style across thousands of outputs"], answer: 3, explain: "Fine-tuning shines for consistent style, format or narrow skills. Fresh facts, live data and citations are jobs for RAG and tools." },
      { q: "What's a known risk of fine-tuning a model heavily on a narrow dataset?", options: ["It permanently doubles the model's inference cost", "It removes the model's ability to follow prompts", "It can forget some of its general abilities", "It makes the model's context window shorter"], answer: 2, explain: "Training hard on narrow data can make the model forget broader skills, and it bakes information in statically. That's part of why you prompt first and use RAG for knowledge." },
    ],
  },

  {
    id: "instruction-tuning",
    label: "Instruction Tuning",
    cluster: "llm",
    short: "Teaching a base model to actually follow instructions rather than just continue text.",
    keywords: "instruction tuning sft supervised fine-tuning alignment helpful assistant",
    learn: {
      why: "Instruction tuning is what makes a model usable as an assistant. A raw base model just autocompletes; instruction tuning is the step that turns 'predict the next token' into 'do what the user asked.' It's the first stage of alignment.",
      sections: [
        { h: "The gap it closes", body: [
          "Ask a base model 'What is the capital of France?' and it might continue with more questions, because that's a plausible text continuation. Instruction tuning trains it on many (**instruction, good response**) pairs so it learns the *behavior* of responding helpfully to requests.",
        ]},
        { h: "How it works", body: [
          "It's **supervised fine-tuning (SFT)** on curated demonstrations: humans (or strong models) write high-quality responses to a wide variety of instructions, and the model is trained to imitate them. This teaches format, helpfulness, and the general 'assistant' persona.",
        ]},
        { h: "Where it sits in the pipeline", body: [
          { ul: [
            "**Pretraining** → broad knowledge and fluency (base model).",
            "**Instruction tuning (SFT)** → follows instructions, acts like an assistant.",
            "**RLHF / preference tuning** → further refines helpfulness, harmlessness, and tone from human preferences.",
          ]},
          "Instruction tuning provides the foundation of behavior that RLHF then polishes.",
        ]},
      ],
      keyPoints: [
        "Instruction tuning trains a base model on (instruction, response) pairs to follow requests, not just continue text.",
        "It's supervised fine-tuning on curated high-quality demonstrations.",
        "In the pipeline it comes after pretraining and before RLHF, establishing assistant behavior.",
      ],
      source: { title: "Ouyang et al. — InstructGPT", url: "https://arxiv.org/abs/2203.02155", note: "The paper introducing instruction tuning + RLHF for assistants." },
    },
    quiz: [
      { q: "What data is used for instruction tuning?", options: ["Raw web text with no particular structure to it", "Pairs of instructions and high-quality responses", "Human rankings that compare two model responses", "Collections of harmful prompts it should refuse"], answer: 1, explain: "Instruction tuning is supervised fine-tuning on curated (instruction, good response) demonstrations. Pairwise rankings are what RLHF uses afterwards." },
      { q: "Which order are these training stages done in?", options: ["Instruction tuning → pretraining → RLHF", "RLHF → pretraining → instruction tuning", "Pretraining → RLHF → instruction tuning", "Pretraining → instruction tuning → RLHF"], answer: 3, explain: "Pretraining builds knowledge and fluency, instruction tuning establishes assistant behavior, and RLHF polishes helpfulness, harmlessness and tone." },
      { q: "What does instruction tuning mainly add to a base model?", options: ["The habit of responding helpfully to requests", "Most of the facts it knows about the world", "The ability to read much longer documents at once", "Faster generation of each token it outputs"], answer: 0, explain: "Knowledge comes from pretraining. Instruction tuning teaches the behavior: treating input as a request and answering it helpfully in a good format." },
    ],
  },

  {
    id: "rlhf",
    label: "RLHF & Preference Tuning",
    cluster: "llm",
    short: "Aligning a model to human preferences using a learned reward — the step that made assistants feel good.",
    keywords: "rlhf reward model human feedback dpo alignment preference tuning ppo",
    learn: {
      why: "RLHF (and newer variants like DPO) is why modern assistants are helpful, honest, and hard to provoke. It's the key alignment technique of the LLM era, and understanding it clarifies both the strengths and the failure modes (sycophancy, over-refusal) of the models you build on.",
      sections: [
        { h: "The problem", body: [
          "Even after instruction tuning, there are many valid responses of varying quality, and 'good' is hard to specify with a loss function. But humans can easily *compare* two responses and say which is better. RLHF turns those comparisons into a training signal.",
        ]},
        { h: "The three steps", body: [
          { ul: [
            "**Collect preferences** — show humans pairs of model responses; they pick the better one.",
            "**Train a reward model** — a model that predicts the human-preferred response, turning judgments into a score.",
            "**Optimize the policy** — use reinforcement learning (PPO) to make the LLM produce responses the reward model scores highly, with a **KL penalty** to keep it from drifting too far from the original.",
          ]},
          "**DPO** and similar methods achieve the same goal by optimizing preferences directly, skipping the separate RL loop — simpler and now widely used.",
        ]},
        { h: "Powers and pitfalls", body: [
          "RLHF dramatically improves helpfulness and safety, but it can also induce **sycophancy** (telling you what you want to hear), **over-refusal**, and **reward hacking** (gaming the reward model). Alignment is an active research area precisely because encoding human values is hard.",
        ]},
      ],
      keyPoints: [
        "RLHF converts easy human comparisons into a reward model, then optimizes the LLM against it (with a KL penalty).",
        "DPO and similar methods optimize preferences directly, avoiding a separate RL loop.",
        "It boosts helpfulness/safety but can cause sycophancy, over-refusal, and reward hacking.",
      ],
      source: { title: "Ouyang et al. — Training LMs to follow instructions with human feedback", url: "https://arxiv.org/abs/2203.02155", note: "The canonical RLHF paper (InstructGPT)." },
    },
    quiz: [
      { q: "Why does RLHF collect comparisons ('which response is better?') rather than hand-written scores?", options: ["Comparisons need no human involvement at all", "Scores can't be used to train neural networks", "People judge comparisons easily and consistently", "Comparisons make the model's outputs shorter"], answer: 2, explain: "'Good' is hard to specify directly, but people can easily say which of two responses is better. RLHF turns those comparisons into a reward signal." },
      { q: "Your assistant agrees with whatever the user claims, even when the user is wrong. Which RLHF side effect is this?", options: ["Over-refusal", "Hallucination", "Overfitting", "Sycophancy"], answer: 3, explain: "Optimizing for human approval can teach a model to tell people what they want to hear. Over-refusal and reward hacking are other known pitfalls." },
      { q: "What does DPO change compared with classic RLHF?", options: ["It removes the need for any human preference data", "It skips the separate reward model and RL loop", "It trains the base model from scratch on preferences", "It replaces preferences with hand-written rules"], answer: 1, explain: "DPO and similar methods optimize the model on preference pairs directly, reaching RLHF's goal without a separate reward model and RL loop." },
    ],
  },

  {
    id: "scaling-laws",
    label: "Scaling Laws",
    cluster: "llm",
    short: "The empirical finding that more data, parameters, and compute predictably improve models.",
    keywords: "scaling laws chinchilla compute parameters data emergent predictable loss",
    learn: {
      why: "Scaling laws are why the field bet billions on ever-larger models — and why that bet paid off. They govern how to spend a compute budget and explain the trajectory of AI progress you're building on.",
      sections: [
        { h: "The discovery", body: [
          "Researchers found that an LLM's loss falls **predictably** as you increase three things together — model **parameters**, **data**, and **compute** — following smooth power-law curves across many orders of magnitude. Bigger really is better, in a quantifiable way.",
        ]},
        { h: "Compute-optimal training (Chinchilla)", body: [
          "A key refinement: for a fixed compute budget, there's an optimal balance of model size and data. The **Chinchilla** result showed earlier giant models were **undertrained** — they'd have done better with fewer parameters and far more data. This reshaped how frontier models are built.",
        ]},
        { h: "Emergence and limits", body: [
          { ul: [
            "**Emergent abilities** — some capabilities appear only past a certain scale, seemingly discontinuously.",
            "**Diminishing returns & data limits** — high-quality data is finite, and gains per dollar shrink, driving interest in efficiency, better data, and post-training.",
          ]},
          "Scaling laws made progress forecastable, which is itself remarkable — and a big reason for the industry's confidence.",
        ]},
      ],
      keyPoints: [
        "Model loss decreases predictably as parameters, data, and compute scale together (power laws).",
        "Chinchilla showed a compute-optimal balance — many models were undertrained, needing more data.",
        "Some abilities emerge only at scale; but data is finite and returns diminish, pushing efficiency research.",
      ],
      source: { title: "Hoffmann et al. — Training Compute-Optimal LLMs (Chinchilla)", url: "https://arxiv.org/abs/2203.15556", note: "The compute-optimal scaling result." },
    },
    quiz: [
      { q: "What did scaling-law research show about LLM loss?", options: ["It stops improving once models pass a billion parameters", "It depends mostly on the choice of tokenizer", "It rises when models are trained on more data", "It falls predictably as parameters, data, and compute grow"], answer: 3, explain: "Loss follows smooth power laws as parameters, data and compute scale together, which made progress forecastable." },
      { q: "The Chinchilla result showed that many earlier large models were…", options: ["Overtrained: they saw far more data than they needed", "Undertrained: too many parameters for too little data", "Too small to benefit from any more training data", "Limited mainly by the length of their context"], answer: 1, explain: "For a fixed compute budget there's an optimal balance of size and data. Earlier giants would have done better with fewer parameters and far more data." },
      { q: "Why is 'just scale it up' getting harder as a strategy?", options: ["Larger models can no longer be trained on GPUs", "Scaling laws turned out to be measurement errors", "Good data is finite and gains per dollar shrink", "Bigger models always need shorter context windows"], answer: 2, explain: "High-quality data runs out and returns diminish, which is pushing work on efficiency, better data, and post-training." },
    ],
  },

  {
    id: "context-window",
    label: "Context Window",
    cluster: "llm",
    short: "The finite span of tokens a model can attend to at once — the model's working memory.",
    keywords: "context window tokens long context attention memory limit prompt",
    learn: {
      why: "The context window is the single most important practical constraint you design around as an AI engineer. It bounds how much a model can 'see' at once, and managing it well is the essence of prompt and context engineering.",
      sections: [
        { h: "What it is", body: [
          "The **context window** is the maximum number of tokens (prompt + generated output) the model can process in a single call — its working memory. Everything the model 'knows' in the moment must fit here: system prompt, conversation history, retrieved documents, and the answer it's writing.",
        ]},
        { h: "Why it's limited", body: [
          "Standard attention costs scale **quadratically** with sequence length, so doubling context roughly quadruples the attention compute and memory. This is why long context is expensive and why it's a major research frontier. Windows have grown from a few thousand tokens to hundreds of thousands, but they're never infinite.",
        ]},
        { h: "Working within it", body: [
          { ul: [
            "**Nothing outside the window exists** to the model — hence RAG, to pull in only relevant external info.",
            "**'Lost in the middle'** — models attend best to the start and end of long contexts; middle content can be neglected.",
            "**Manage it actively** — summarize history, retrieve selectively, and place critical instructions where they'll be attended to.",
          ]},
        ]},
      ],
      keyPoints: [
        "The context window is the token budget (input + output) the model can attend to — its working memory.",
        "Attention's quadratic cost makes long context expensive; windows are large but finite.",
        "Anything outside the window is invisible (motivating RAG); models can neglect the middle of long contexts.",
      ],
      source: { title: "Liu et al. — Lost in the Middle", url: "https://arxiv.org/abs/2307.03172", note: "How models use (and misuse) long contexts." },
    },
    quiz: [
      { q: "A chatbot 'forgets' the user's name after a long conversation. What's the basic reason?", options: ["The model deliberately discards personal data", "Early turns fell outside the context window", "Names are tokenized in a way it can't store", "Its weights were updated during the chat"], answer: 1, explain: "Anything outside the window doesn't exist to the model. Long chats need summarizing or external memory to keep key facts in view." },
      { q: "Why is doubling the context length expensive with standard attention?", options: ["Each extra token has to be stored twice in memory", "Longer contexts require retraining the model", "Providers charge double for tokens past a limit", "Attention cost grows roughly with length squared"], answer: 3, explain: "Standard attention compares every token with every other one, so compute and memory scale quadratically: doubling the length roughly quadruples the attention cost." },
      { q: "What counts against a model's context window in a single call?", options: ["Only the latest user message and the reply", "Only the input; the output has a separate budget", "System prompt, history, retrieved docs, and output", "Only text; images and tool results are free"], answer: 2, explain: "The window covers everything in the call: system prompt, conversation, retrieved documents, tool results, and the answer being generated." },
    ],
  },

  {
    id: "inference-decoding",
    label: "Inference & Decoding",
    cluster: "llm",
    short: "How a trained model generates text at run time — greedy, sampling, temperature, top-p.",
    keywords: "inference decoding sampling temperature top-p greedy beam generation latency",
    learn: {
      why: "Decoding parameters are direct knobs you set on every API call, controlling how creative or deterministic outputs are. Understanding inference also explains latency, cost, and why the same prompt can give different answers.",
      sections: [
        { h: "Autoregressive generation", body: [
          "At inference, the model produces a probability distribution over the next token, picks one, appends it, and repeats — **autoregressive** generation. Each new token requires a forward pass, which is why longer outputs take longer and cost more.",
        ]},
        { h: "Decoding strategies", body: [
          { ul: [
            "**Greedy** — always take the most probable token. Deterministic but can be repetitive/dull.",
            "**Sampling** — draw from the distribution, giving varied, creative outputs.",
            "**Temperature** — scales the distribution: low = focused/deterministic, high = diverse/risky.",
            "**Top-p (nucleus) / top-k** — sample only from the most probable tokens, cutting off the unlikely long tail.",
          ]},
        ]},
        { h: "Practical implications", body: [
          "For factual, reproducible tasks, use low temperature (or greedy). For brainstorming, raise it. Sampling is why identical prompts yield different answers. Under the hood, techniques like **KV caching** speed up generation, and cost is dominated by the number of output tokens and model size.",
        ]},
      ],
      keyPoints: [
        "LLMs generate autoregressively — one token per forward pass — so output length drives latency and cost.",
        "Temperature and top-p/top-k control the creativity vs. determinism of sampling.",
        "Low temperature for factual/reproducible work; higher for creative variety.",
      ],
      source: { title: "Hugging Face — How to generate text (decoding strategies)", url: "https://huggingface.co/blog/how-to-generate", note: "Greedy, beam, sampling, top-k, and top-p compared." },
    },
    quiz: [
      { q: "You need the same structured extraction every time for the same input. Which setting fits?", options: ["High temperature for more robust output", "Low temperature or greedy decoding", "A large top-k to widen the token choices", "A long max-tokens limit on every call"], answer: 1, explain: "Low temperature (or greedy decoding) makes output focused and reproducible. Higher temperature and wider sampling add variety, which you don't want here." },
      { q: "Why does a response with 1,000 output tokens take much longer than one with 100?", options: ["Long outputs are checked by a safety model first", "The prompt is re-read once per output sentence", "Longer outputs switch to a slower backup model", "Each output token needs its own forward pass"], answer: 3, explain: "Generation is autoregressive: one token per forward pass, appended, then repeat. Output length drives latency and cost." },
      { q: "Top-p (nucleus) sampling improves outputs by…", options: ["Sampling only from the most probable tokens", "Always choosing the single most likely token", "Re-ranking finished answers by their quality", "Making every token equally likely to appear"], answer: 0, explain: "Top-p samples from the smallest set of tokens that covers most of the probability, cutting off the unlikely tail while keeping variety. Always taking the top token is greedy decoding." },
    ],
  },

  {
    id: "quantization",
    label: "Quantization & Efficiency",
    cluster: "llm",
    short: "Shrinking models with lower-precision numbers so they run faster and cheaper.",
    keywords: "quantization precision int8 int4 efficiency inference memory distillation compression",
    learn: {
      why: "Quantization and related efficiency techniques are what let large models run on affordable hardware — even laptops and phones. As costs and latency dominate production AI economics, these methods are increasingly part of the engineer's toolkit.",
      sections: [
        { h: "The idea", body: [
          "Model weights are usually stored as 16- or 32-bit floating-point numbers. **Quantization** represents them with fewer bits — 8-bit or even 4-bit integers. This shrinks memory and speeds up computation, with surprisingly small quality loss when done carefully.",
        ]},
        { h: "Why it works and what it costs", body: [
          "Neural networks are robust to a bit of numerical noise, so lower precision often barely dents accuracy while cutting memory 2–4× and boosting throughput. Push precision too low and quality degrades — so it's a trade-off you tune, sometimes with calibration or quantization-aware training.",
        ]},
        { h: "The broader efficiency toolkit", body: [
          { ul: [
            "**Quantization** — fewer bits per weight.",
            "**Distillation** — train a small 'student' model to mimic a large 'teacher'.",
            "**Pruning** — remove weights that barely contribute.",
            "**Better serving** — batching, KV caching, speculative decoding, and optimized kernels.",
          ]},
          "Together these make the difference between a model that's economically viable to serve and one that isn't.",
        ]},
      ],
      keyPoints: [
        "Quantization stores weights in fewer bits (e.g. int8/int4), cutting memory and speeding inference.",
        "Networks tolerate the added numerical noise, so quality loss is small — until precision gets too low.",
        "It's part of a toolkit with distillation, pruning, and serving optimizations that control cost and latency.",
      ],
      source: { title: "Hugging Face — Quantization overview", url: "https://huggingface.co/docs/transformers/main/en/quantization/overview", note: "Practical quantization methods and trade-offs." },
    },
    quiz: [
      { q: "You need a 70B-parameter model to fit on a smaller GPU with little quality loss. What's the first technique to try?", options: ["Double the size of its context window", "Raise the temperature when sampling", "Quantize its weights to 8 or 4 bits", "Add more experts inside each layer"], answer: 2, explain: "Storing weights in fewer bits cuts memory 2–4× and speeds up inference, usually with only a small loss in quality." },
      { q: "Why can networks often be quantized with little accuracy loss?", options: ["They tolerate small amounts of numerical noise", "Most of their weights are exactly zero anyway", "Quantization retrains the model from scratch", "Lower precision makes their math more exact"], answer: 0, explain: "Neural networks are robust to a bit of numerical noise. Push precision too low, though, and quality degrades, so it's a trade-off you tune." },
      { q: "Training a small model to imitate a large model's outputs is called…", options: ["Pruning", "Distillation", "Quantization", "Speculative decoding"], answer: 1, explain: "Distillation trains a small 'student' to mimic a large 'teacher'. Pruning removes weights, quantization lowers precision, and speculative decoding speeds up serving." },
    ],
  },

  {
    id: "mixture-of-experts",
    label: "Mixture of Experts",
    cluster: "llm",
    short: "Activating only part of a huge model per token — more capacity at lower compute.",
    keywords: "mixture of experts moe sparse routing gating capacity efficiency",
    learn: {
      why: "Mixture-of-Experts is how several frontier models get enormous capacity without proportional compute cost. It's an increasingly important architectural idea that explains how models can be 'huge' yet still affordable to run.",
      sections: [
        { h: "Dense vs. sparse", body: [
          "In a normal (**dense**) model, every parameter is used for every token. A **Mixture of Experts** replaces some layers with many parallel 'expert' sub-networks and a **router** that sends each token to just a few of them. Most experts stay idle for any given token.",
        ]},
        { h: "The payoff", body: [
          "You get a model with a very large **total** parameter count (lots of stored knowledge/capacity) but a small **active** parameter count per token (cheap compute). It's a way to scale capacity and compute somewhat independently — more knowledge without paying full price on every token.",
        ]},
        { h: "The catches", body: [
          { ul: [
            "**Routing must be learned** and balanced, or some experts get overused while others starve.",
            "**Memory** — all experts must be loaded even though few are active, so MoE is memory-heavy to serve.",
            "**Complexity** — training stability and load balancing add engineering difficulty.",
          ]},
        ]},
      ],
      keyPoints: [
        "MoE routes each token to a few expert sub-networks instead of using all parameters (sparse activation).",
        "It decouples total capacity from per-token compute: huge knowledge, cheaper inference per token.",
        "Costs: learned routing/load-balancing and high memory since all experts must be resident.",
      ],
      source: { title: "Shazeer et al. — Outrageously Large Neural Networks (MoE)", url: "https://arxiv.org/abs/1701.06538", note: "The paper introducing sparsely-gated mixture of experts." },
    },
    quiz: [
      { q: "How does a Mixture-of-Experts model keep per-token compute low?", options: ["It uses a much smaller vocabulary than dense models", "It skips attention for most tokens in a sequence", "It stores its weights in 4-bit precision", "A router sends each token to only a few experts"], answer: 3, explain: "Sparse activation: there are many expert sub-networks, but each token uses only a few, so total capacity is large while active compute stays small." },
      { q: "What's a practical drawback of serving an MoE model?", options: ["It can only answer one question at a time", "It cannot be fine-tuned after training", "All experts must be kept in memory", "Its outputs are always less accurate"], answer: 2, explain: "Even though only a few experts are active per token, all of them must be loaded, so MoE models are memory-heavy to serve." },
      { q: "What goes wrong if an MoE router isn't balanced during training?", options: ["Every token gets sent to every expert at once", "Some experts get overused while others barely learn", "The model loses the ability to use attention", "The vocabulary shrinks with every training step"], answer: 1, explain: "Routing must be learned and load-balanced. Otherwise a few experts get overused while others starve, wasting capacity." },
    ],
  },

  {
    id: "multimodal-models",
    label: "Multimodal Models",
    cluster: "llm",
    short: "Models that understand and generate across text, images, audio, and more in one system.",
    keywords: "multimodal vision language image audio clip encoder fusion tokens",
    learn: {
      why: "AI is rapidly becoming multimodal — models that see, hear, and speak, not just read. Understanding how different modalities get unified explains capabilities like image understanding, document analysis, and voice interfaces you'll increasingly build with.",
      sections: [
        { h: "The unifying trick", body: [
          "Different data types (pixels, audio, text) are each converted into **tokens/embeddings in a shared space**, so a single transformer can process them together. An image is encoded into a sequence of embeddings that sit alongside text tokens, and attention lets the model relate words to image regions.",
        ]},
        { h: "How they're built", body: [
          { ul: [
            "**Encoders per modality** — e.g. a vision encoder turns an image into embeddings (CLIP popularized aligning image and text embeddings).",
            "**Fusion** — those embeddings are fed into the language model's context so it can reason across modalities.",
            "**Generation** — some models also output images/audio, often pairing an LLM with a diffusion or audio decoder.",
          ]},
        ]},
        { h: "Why it matters for engineers", body: [
          "Multimodal models unlock reading screenshots and documents, answering questions about images, transcribing and speaking, and grounding language in the visual world. The same prompt/RAG/agent patterns apply — you're just working with richer inputs and outputs, and you must account for how each modality consumes context tokens.",
        ]},
      ],
      keyPoints: [
        "Multimodal models map images/audio/text into a shared embedding space so one transformer handles them together.",
        "Modality-specific encoders (e.g. vision encoders, CLIP-style alignment) feed into the language model's context.",
        "They enable image/document understanding and voice; standard prompt/RAG/agent patterns still apply.",
      ],
      source: { title: "Radford et al. — CLIP: Learning Transferable Visual Models", url: "https://arxiv.org/abs/2103.00020", note: "Foundational work aligning image and text embeddings." },
    },
    quiz: [
      { q: "How does a multimodal LLM 'read' an image alongside text?", options: ["It converts the image to a text caption first", "It stores the image in a separate database", "It's encoded into embeddings in the context", "It reads the image's file name and metadata"], answer: 2, explain: "A vision encoder turns the image into embeddings that sit in the model's context next to text tokens, so attention can relate words to image regions." },
      { q: "What did CLIP popularize?", options: ["Aligning image and text embeddings in one space", "Generating images from noise with diffusion", "Compressing images into fewer pixels for speed", "Labeling images by hand at very large scale"], answer: 0, explain: "CLIP trained image and text encoders so that matching pairs land close together in a shared embedding space, which many multimodal systems build on." },
      { q: "You add screenshots to a support assistant's prompts. What should you watch?", options: ["Images can't be used together with RAG or tools", "Screenshots switch off the system prompt", "Multimodal models can't read text in images", "Images consume context tokens and add cost"], answer: 3, explain: "Each modality consumes context. The usual prompt, RAG and agent patterns still apply; you just budget for richer inputs." },
    ],
  },

  {
    id: "emergent-abilities",
    label: "Emergent Abilities",
    cluster: "llm",
    short: "Capabilities that appear only at scale — like in-context learning and chain-of-thought reasoning.",
    keywords: "emergent abilities in-context learning few-shot chain of thought scale reasoning",
    learn: {
      why: "Some of the most useful LLM behaviors — learning from examples in the prompt, step-by-step reasoning — weren't explicitly trained; they emerged at scale. Recognizing these abilities (and the debate around them) shapes how you prompt and what you expect.",
      sections: [
        { h: "What 'emergent' means", body: [
          "Emergent abilities are capabilities largely absent in small models that appear once a model crosses a scale threshold. They weren't directly programmed — they fell out of large-scale next-token prediction.",
        ]},
        { h: "The headline examples", body: [
          { ul: [
            "**In-context learning** — the model performs a new task from a few examples in the prompt, without any weight updates. This is what makes **few-shot prompting** work.",
            "**Chain-of-thought reasoning** — prompting the model to 'think step by step' unlocks far better performance on multi-step problems, by having it generate intermediate reasoning.",
            "**Instruction following & tool use** — general competence that grows with scale.",
          ]},
        ]},
        { h: "The nuance", body: [
          "There's real debate about whether emergence is a genuine phase change or partly an artifact of how we measure it. Either way, the practical lesson stands: large models can do things small ones can't, and prompting techniques (few-shot examples, chain-of-thought) are how you elicit those latent abilities.",
        ]},
      ],
      keyPoints: [
        "Emergent abilities appear at scale without being explicitly trained — a byproduct of large-scale pretraining.",
        "In-context (few-shot) learning and chain-of-thought reasoning are the key examples engineers exploit.",
        "Whether emergence is a true phase change is debated, but prompting is how you elicit these abilities.",
      ],
      source: { title: "Wei et al. — Emergent Abilities of Large Language Models", url: "https://arxiv.org/abs/2206.07682", note: "The paper cataloguing emergent abilities (and see critiques)." },
    },
    quiz: [
      { q: "Few-shot prompting works because of which emergent ability?", options: ["Automatic fine-tuning during each conversation", "In-context learning from examples in the prompt", "Memorizing every example seen during training", "Retrieving similar examples from a database"], answer: 1, explain: "Large models can perform a new task from a few examples in the prompt, without any weight updates. That's in-context learning." },
      { q: "A model struggles with a multi-step word problem. Which prompt change most often helps?", options: ["Ask it to answer in as few words as possible", "Ask it to answer faster with less thinking", "Ask it to reply only with the final number", "Ask it to reason step by step before answering"], answer: 3, explain: "Chain-of-thought prompting has the model write out intermediate reasoning, which markedly improves multi-step problems." },
      { q: "What's the open debate about emergent abilities?", options: ["Whether large models can follow instructions at all", "Whether small models secretly have the same skills", "Whether they're true jumps or partly how we measure", "Whether prompting can bring out any of these skills"], answer: 2, explain: "Some argue emergence is partly an artifact of the metrics used. Either way, large models do things small ones can't, and prompting is how you elicit those abilities." },
    ],
  },
]);
