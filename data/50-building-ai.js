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
      { q: "At its core, an LLM is trained to…", options: ["Look up answers in a database", "Predict the next token given the preceding context", "Sort words alphabetically", "Compress images"], answer: 1, explain: "LLMs are next-token predictors; their broad abilities emerge from mastering that single objective." },
      { q: "Why can an LLM be confidently wrong (hallucinate)?", options: ["It queries the wrong website", "Its knowledge is baked into weights, not looked up, so it can generate plausible-but-false text", "It always tells the truth", "It runs out of memory"], answer: 1, explain: "Knowledge is encoded in parameters; the model generates likely continuations, which can be fluent yet false." },
      { q: "Which step turns a raw pretrained predictor into a helpful assistant?", options: ["Tokenization", "Post-training: instruction tuning and RLHF", "Quantization", "Data cleaning"], answer: 1, explain: "Instruction tuning and RLHF align the base model to follow instructions helpfully and safely." },
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
      { q: "LLMs typically process text as…", options: ["Whole sentences", "Sub-word tokens (e.g. byte-pair encoding)", "Raw pixels", "SQL rows"], answer: 1, explain: "Sub-word tokenization balances sequence length and vocabulary size, handling rare and novel words." },
      { q: "Context windows and API pricing are measured in…", options: ["Words", "Tokens", "Sentences", "Megabytes of RAM"], answer: 1, explain: "Both limits and costs are counted in tokens, roughly 4 English characters each." },
      { q: "Why do LLMs struggle to count the letters in a word?", options: ["They lack memory", "They see tokens, not individual characters", "The GPU is too small", "Counting is disabled"], answer: 1, explain: "Tokenization hides individual letters, making character-level operations unreliable." },
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
      { q: "Pretraining an LLM uses which learning signal?", options: ["Human-labeled answers for every example", "Self-supervised next-token prediction on raw text", "A reward model", "Manual feature engineering"], answer: 1, explain: "Pretraining predicts the next token, deriving labels for free from the text itself." },
      { q: "The direct output of pretraining is…", options: ["A helpful chat assistant", "A base model that is fluent/knowledgeable but not yet aligned to follow instructions", "A tokenizer", "A vector database"], answer: 1, explain: "Base models continue text well but need post-training to become helpful assistants." },
      { q: "In the LLM lifecycle, pretraining is…", options: ["The cheapest step", "By far the most expensive step, done once", "Repeated for every user query", "Optional"], answer: 1, explain: "Pretraining dominates cost and is performed once; fine-tuning and inference are comparatively cheap." },
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
      { q: "Self-supervised learning obtains labels by…", options: ["Paying human annotators for each example", "Manufacturing them from the data's own structure (e.g. hiding and predicting part of the input)", "Using a reward model", "Randomly guessing"], answer: 1, explain: "It creates a pretext task whose targets come free from the unlabeled data itself." },
      { q: "Masked-word prediction (BERT-style) is a form of…", options: ["Reinforcement learning", "Self-supervised learning", "Supervised learning with human labels", "Clustering"], answer: 1, explain: "The masked words serve as free labels derived from the text — self-supervision." },
      { q: "The main reason self-supervised learning transformed AI is that it…", options: ["Needs less compute", "Removes the labeling bottleneck, enabling training on virtually unlimited data", "Avoids using neural networks", "Only works on small datasets"], answer: 1, explain: "Without needing human labels, it scales to internet-sized corpora and learns transferable representations." },
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
      { q: "Fine-tuning an LLM means…", options: ["Training it from scratch", "Continuing training a pretrained model on task-specific data to adapt it", "Only changing the prompt", "Compressing the model"], answer: 1, explain: "Fine-tuning updates a pretrained model's weights on a smaller targeted dataset." },
      { q: "LoRA reduces fine-tuning cost by…", options: ["Updating all weights faster", "Freezing the base model and training small low-rank adapter matrices", "Removing the dataset", "Skipping gradients"], answer: 1, explain: "LoRA trains a tiny number of added parameters, leaving the base weights frozen — cheap and swappable." },
      { q: "To give a model up-to-date factual knowledge, the usually better tool is…", options: ["Full fine-tuning", "RAG (retrieval-augmented generation)", "Quantization", "Tokenization"], answer: 1, explain: "RAG injects fresh knowledge at query time; fine-tuning bakes data in statically and risks forgetting." },
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
      { q: "Instruction tuning fixes the problem that a base model…", options: ["Runs too slowly", "Continues text rather than following the user's request", "Has no knowledge", "Cannot be deployed"], answer: 1, explain: "Base models autocomplete; instruction tuning teaches the behavior of responding to instructions helpfully." },
      { q: "Instruction tuning is implemented as…", options: ["Reinforcement learning from rewards", "Supervised fine-tuning on (instruction, good-response) demonstrations", "Pretraining from scratch", "Quantization"], answer: 1, explain: "It's SFT on curated instruction–response pairs the model learns to imitate." },
      { q: "In the training pipeline, instruction tuning comes…", options: ["Before pretraining", "After pretraining and before RLHF", "After deployment", "Instead of tokenization"], answer: 1, explain: "The order is pretraining → instruction tuning (SFT) → RLHF/preference tuning." },
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
      { q: "RLHF is needed because…", options: ["Humans can't judge responses", "'Good' is hard to specify with a loss, but humans can easily compare which response is better", "Base models are already aligned", "It reduces model size"], answer: 1, explain: "RLHF leverages easy human preference comparisons to define quality that a fixed loss can't capture." },
      { q: "The reward model in RLHF is trained to…", options: ["Generate text", "Predict which response humans would prefer, producing a score", "Tokenize input", "Compress the model"], answer: 1, explain: "The reward model turns human preference comparisons into a scalar reward the policy optimizes toward." },
      { q: "A known failure mode induced by RLHF is…", options: ["Faster inference", "Sycophancy — telling users what they want to hear", "Better tokenization", "Lower cost"], answer: 1, explain: "Optimizing for human approval can teach the model to be agreeable rather than accurate — sycophancy." },
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
      { q: "Scaling laws describe how model performance changes as you increase…", options: ["Only the number of GPUs", "Parameters, data, and compute together — predictably", "The prompt length only", "The number of employees"], answer: 1, explain: "Loss falls along smooth power laws as parameters, data, and compute scale jointly." },
      { q: "The Chinchilla finding was that many large models were…", options: ["Overtrained on too much data", "Undertrained — they needed more data relative to their size", "Perfectly balanced", "Too small to matter"], answer: 1, explain: "For a given compute budget, optimal training uses more data (and often fewer parameters) than earlier giants used." },
      { q: "'Emergent abilities' refers to capabilities that…", options: ["Exist in every model size", "Appear only once a model passes a certain scale", "Come from tokenization", "Are manually programmed"], answer: 1, explain: "Certain capabilities seem to switch on beyond a scale threshold rather than improving smoothly." },
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
      { q: "The context window defines…", options: ["The model's parameter count", "The maximum tokens (prompt + output) the model can attend to at once", "The number of GPUs", "The training data size"], answer: 1, explain: "It's the working-memory budget: everything the model considers in one call must fit within it." },
      { q: "Long context windows are expensive largely because attention cost scales…", options: ["Linearly with length", "Quadratically with sequence length", "Not at all", "With the number of users"], answer: 1, explain: "Standard self-attention is O(n²) in sequence length, so long contexts cost sharply more." },
      { q: "The 'lost in the middle' effect means models tend to…", options: ["Ignore the beginning of the prompt", "Attend best to the start and end, neglecting the middle of long contexts", "Only read the middle", "Forget the system prompt"], answer: 1, explain: "Information buried in the middle of a long context is often under-attended compared to the edges." },
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
      { q: "LLMs generate text by…", options: ["Producing the whole answer in one step", "Autoregressively predicting one token at a time, appending, and repeating", "Retrieving it from a database", "Sorting the vocabulary"], answer: 1, explain: "Each token needs a forward pass; the model builds the output token by token." },
      { q: "Lowering the temperature makes outputs…", options: ["More random and diverse", "More focused and deterministic", "Longer automatically", "Grammatically wrong"], answer: 1, explain: "Low temperature sharpens the distribution toward the most likely tokens, reducing randomness." },
      { q: "Why can the same prompt produce different answers across calls?", options: ["The model changes size", "Sampling introduces randomness in token selection", "The GPU restarts", "The prompt is deleted"], answer: 1, explain: "When sampling (temperature > 0), token choices are stochastic, so outputs vary." },
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
      { q: "Quantization reduces a model's cost by…", options: ["Adding more parameters", "Representing weights with fewer bits (lower numerical precision)", "Deleting layers randomly", "Increasing the context window"], answer: 1, explain: "Fewer bits per weight cut memory and speed up computation, with modest quality loss." },
      { q: "Quantization works well because neural networks are…", options: ["Extremely sensitive to any numerical change", "Fairly robust to small amounts of numerical noise", "Unable to use integers", "Only trained in 4-bit"], answer: 1, explain: "Networks tolerate lower precision, so accuracy drops little while efficiency improves." },
      { q: "Distillation improves efficiency by…", options: ["Making the model bigger", "Training a small student model to mimic a large teacher", "Adding more data at inference", "Increasing precision"], answer: 1, explain: "Distillation transfers a large model's behavior into a smaller, cheaper one." },
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
      { q: "In a Mixture-of-Experts model, each token is processed by…", options: ["Every parameter in the model", "Only a few expert sub-networks chosen by a router", "A random tree", "No parameters"], answer: 1, explain: "A router sends each token to a small subset of experts — sparse activation." },
      { q: "The main benefit of MoE is…", options: ["Fewer total parameters", "Large total capacity with low active compute per token", "No need for routing", "Smaller memory footprint"], answer: 1, explain: "MoE grows total capacity while keeping per-token compute low by activating few experts." },
      { q: "A key downside of MoE is that…", options: ["It uses no memory", "All experts must be kept in memory even though few are active per token", "It cannot be trained", "It removes attention"], answer: 1, explain: "Sparse compute doesn't reduce memory — every expert must be loaded, making serving memory-heavy." },
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
      { q: "Multimodal models handle different data types by…", options: ["Using a separate unrelated model for each", "Mapping each modality into a shared embedding space one transformer can process", "Converting everything to SQL", "Ignoring all but text"], answer: 1, explain: "Images, audio, and text become embeddings in a common space, letting a single model reason across them." },
      { q: "CLIP is notable for…", options: ["Compressing models", "Aligning image and text embeddings so they share a space", "Tokenizing code", "Doing reinforcement learning"], answer: 1, explain: "CLIP learned a joint image–text embedding space, foundational for multimodal understanding." },
      { q: "For an AI engineer, a practical consideration with images in a multimodal model is that they…", options: ["Are free of cost", "Consume context tokens and must be budgeted like text", "Cannot be used in prompts", "Never affect latency"], answer: 1, explain: "Encoded images take up context tokens, so they factor into context limits and cost." },
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
      { q: "In-context learning refers to a model's ability to…", options: ["Update its weights during a chat", "Perform a new task from examples in the prompt, with no weight changes", "Retrain overnight", "Store data permanently"], answer: 1, explain: "Few-shot examples in the prompt let the model do a task without any parameter updates — in-context learning." },
      { q: "Chain-of-thought prompting improves reasoning by…", options: ["Shrinking the model", "Having the model generate intermediate step-by-step reasoning", "Removing the prompt", "Lowering temperature to zero always"], answer: 1, explain: "Producing intermediate steps helps the model solve multi-step problems more reliably." },
      { q: "Emergent abilities are called 'emergent' because they…", options: ["Are hard-coded in small models", "Appear only once models reach sufficient scale, without being explicitly trained", "Come from the tokenizer", "Require reinforcement learning to exist"], answer: 1, explain: "They show up at scale as a byproduct of large-scale training rather than direct programming." },
    ],
  },
]);
