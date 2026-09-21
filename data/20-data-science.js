/* ===========================================================================
   DATA SCIENCE — turning raw data into signal.
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "data-science",
    label: "Data Science",
    cluster: "data",
    short: "The craft of extracting reliable insight and predictions from data.",
    keywords: "data science analysis insight pipeline workflow signal",
    learn: {
      why: "AI is only as good as the data it learns from. Data science is the discipline that turns messy real-world data into the clean, well-understood, well-evaluated datasets that models actually need — and the judgment to know when a result is real.",
      sections: [
        { h: "What data science actually is", body: [
          "Data science sits between statistics, software engineering, and domain expertise. Its job: ask a question, gather and clean the relevant data, explore it, model it, and — critically — judge whether the answer is trustworthy.",
          "For AI, data science is the *upstream* work. Before any model is trained, someone decided what data to collect, how to clean it, what features matter, and how success will be measured. Those decisions cap the ceiling of what any model can achieve.",
        ]},
        { h: "The typical workflow", body: [
          { ul: [
            "**Frame** the question and define what 'good' means (the metric).",
            "**Collect** and **clean** the data — usually the largest chunk of effort.",
            "**Explore** (EDA) to build intuition and catch problems.",
            "**Model** — fit something, from a simple baseline upward.",
            "**Evaluate** honestly, and **communicate** the result.",
          ]},
        ]},
        { h: "Garbage in, garbage out", body: [
          "The oldest rule in the field: a model trained on biased, leaky, or mislabeled data will confidently produce biased, misleading answers. Most 'model problems' are really data problems. This is why serious AI teams invest far more in data quality than in exotic model tweaks.",
        ]},
      ],
      keyPoints: [
        "Data science is the upstream work that determines the ceiling of any model's performance.",
        "The workflow: frame → collect → clean → explore → model → evaluate → communicate.",
        "Most model failures are data failures — quality of data beats cleverness of model.",
      ],
      source: { title: "R. Peng & E. Matsui — The Art of Data Science (free)", url: "https://bookdown.org/rdpeng/artofdatascience/", note: "A concise, practitioner view of the data-science process." },
    },
    quiz: [
      { q: "In most real AI projects, where does the majority of effort typically go?", options: ["Choosing an exotic model architecture", "Collecting, cleaning, and understanding the data", "Buying more GPUs", "Writing the final report"], answer: 1, explain: "Data collection and cleaning dominate real projects; data quality caps what any model can do." },
      { q: "The phrase 'garbage in, garbage out' means…", options: ["Bigger models fix bad data", "A model trained on flawed data produces flawed results, however good the model", "Data should be deleted after use", "Outputs are always garbage"], answer: 1, explain: "Model outputs inherit the flaws of their training data; quality upstream is essential." },
      { q: "Defining the success metric should happen…", options: ["After the model is built", "Early, when framing the question", "Never — accuracy is always the metric", "Only if the model fails"], answer: 1, explain: "Deciding what 'good' means up front keeps the whole project aimed at the right target." },
    ],
  },

  {
    id: "data-collection",
    label: "Data Collection & Sourcing",
    cluster: "data",
    short: "Where data comes from — and how sampling choices bake in bias from the start.",
    keywords: "data collection sampling sources scraping bias representativeness",
    learn: {
      why: "The data you collect defines the world your model can see. If your sample isn't representative, no amount of modeling will fix it — the model will faithfully learn a skewed picture of reality.",
      sections: [
        { h: "Sources", body: [
          "Data comes from databases and logs, APIs, sensors, surveys, public datasets, and web scraping. Large language models are trained on enormous web-scale corpora; a churn model might use a company's own event logs. Each source carries its own biases and gaps.",
        ]},
        { h: "Sampling and representativeness", body: [
          "A **sample** is meant to stand in for a larger **population**. **Selection bias** happens when the sample systematically differs from the population — e.g. training a medical model only on data from one hospital, or a voice model only on one accent.",
          "The model can only be as fair and general as the data is representative. Representativeness is a data-collection decision, not something modeling can repair later.",
        ]},
        { h: "Practical and ethical constraints", body: [
          { ul: [
            "**Consent & privacy**: personal data brings legal and ethical obligations (GDPR, etc.).",
            "**Licensing**: not all data you *can* scrape is data you *may* use.",
            "**Cost & freshness**: data ages; a model trained on last year's behavior may already be stale.",
          ]},
        ]},
      ],
      keyPoints: [
        "Your sample defines the world the model can perceive; gaps become blind spots.",
        "Selection bias — a non-representative sample — cannot be fixed by better modeling.",
        "Collection carries privacy, consent, and licensing obligations, not just technical ones.",
      ],
      source: { title: "Google — Data Preparation and Feature Engineering (ML Crash Course)", url: "https://developers.google.com/machine-learning/data-prep", note: "Practical guidance on sourcing and sampling data." },
    },
    quiz: [
      { q: "Selection bias occurs when…", options: ["The model has too many parameters", "The sample systematically differs from the population it should represent", "You collect too much data", "The learning rate is too high"], answer: 1, explain: "Selection bias means the collected sample is unrepresentative, so the model learns a skewed view." },
      { q: "A face-recognition model trained mostly on one demographic will likely…", options: ["Work equally well for everyone", "Perform worse on under-represented groups", "Refuse to run", "Need no evaluation"], answer: 1, explain: "Under-representation in the data produces systematically worse performance on those groups." },
      { q: "Which is a non-technical constraint on data collection?", options: ["Matrix multiplication cost", "Consent, privacy, and licensing obligations", "GPU memory", "Learning-rate schedules"], answer: 1, explain: "Legal and ethical obligations around consent, privacy, and licensing govern what data may be used." },
    ],
  },

  {
    id: "data-cleaning",
    label: "Data Cleaning & Preprocessing",
    cluster: "data",
    short: "Fixing missing values, outliers, and inconsistencies so the model learns signal, not mess.",
    keywords: "cleaning preprocessing missing values outliers normalization imputation",
    learn: {
      why: "Raw data is messy: missing fields, typos, duplicates, wildly different scales. Cleaning turns it into something a model can learn from without being misled — and it's usually the least glamorous, most valuable step.",
      sections: [
        { h: "Common problems", body: [
          { ul: [
            "**Missing values** — fields that are blank; must be dropped or **imputed** (filled in with a sensible estimate).",
            "**Outliers** — extreme values that may be errors or rare truths; handle deliberately, not by reflex.",
            "**Duplicates & inconsistencies** — the same entity recorded twice, or '`NY`' vs '`New York`'.",
            "**Wrong types & units** — dates as strings, mixed currencies, etc.",
          ]},
        ]},
        { h: "Scaling and encoding", body: [
          "Models are sensitive to scale. **Normalization/standardization** rescales numeric features to comparable ranges so one large-valued feature doesn't dominate. **Categorical** values (like country) must be **encoded** into numbers (e.g. one-hot) before a model can use them.",
        ]},
        { h: "The discipline of it", body: [
          "Cleaning decisions must be recorded and applied identically to training and future data, or you'll get subtle bugs. Crucially, cleaning statistics (like the mean used to standardize) must be computed on the *training* set only — computing them on all data leaks information (see Data Leakage).",
        ]},
      ],
      keyPoints: [
        "Cleaning handles missing values, outliers, duplicates, inconsistent formats, and wrong types/units.",
        "Numeric features usually need scaling; categorical features need encoding.",
        "Compute cleaning statistics on training data only, and apply the same transforms everywhere, to avoid leakage.",
      ],
      source: { title: "Google — Handling missing/outlier data", url: "https://developers.google.com/machine-learning/data-prep/construct/collect/data-cleaning", note: "Concrete cleaning techniques and pitfalls." },
    },
    quiz: [
      { q: "Imputation refers to…", options: ["Deleting the entire dataset", "Filling in missing values with sensible estimates", "Adding more GPUs", "Encrypting the data"], answer: 1, explain: "Imputation replaces missing entries with estimated values (mean, median, model-based, etc.)." },
      { q: "Why do many models need numeric features to be scaled?", options: ["To save disk space", "So one large-valued feature doesn't dominate the others", "To make the data categorical", "It is never necessary"], answer: 1, explain: "Without scaling, features with big numeric ranges can dominate distance/gradient computations." },
      { q: "The mean used to standardize a feature should be computed from…", options: ["The entire dataset including test data", "The training set only", "Random noise", "The labels"], answer: 1, explain: "Using all data (including test) to compute preprocessing stats leaks information into training." },
    ],
  },

  {
    id: "eda",
    label: "Exploratory Data Analysis",
    cluster: "data",
    short: "Looking hard at your data before modeling — the step that catches disasters early.",
    keywords: "eda exploratory analysis visualization distribution correlation summary",
    learn: {
      why: "Before trusting any model, you need to understand the data's shape, quirks, and relationships. EDA is where you build intuition, spot problems, and form hypotheses — skipping it is how teams ship models built on broken data.",
      sections: [
        { h: "What EDA looks like", body: [
          "Exploratory Data Analysis, championed by John Tukey, means summarizing and **visualizing** data to see what's there: distributions of each variable, relationships between variables, missingness patterns, and anomalies.",
          "Typical moves: histograms of each feature, scatter plots between pairs, correlation heatmaps, and simple group-by summaries.",
        ]},
        { h: "What you're looking for", body: [
          { ul: [
            "**Distributions** — is a feature skewed? bimodal? full of zeros?",
            "**Relationships** — which features move with the target?",
            "**Anomalies** — impossible values, sudden gaps, suspicious spikes.",
            "**Leakage clues** — a feature that predicts the target *too* perfectly is a red flag.",
          ]},
        ]},
        { h: "Why it saves you", body: [
          "EDA is cheap insurance. A five-minute histogram can reveal that 'age' contains values of 999 (a missing-data code), or that your positive class is 2% of the data (a class-imbalance problem). Catching these before modeling saves days of confused debugging later.",
        ]},
      ],
      keyPoints: [
        "EDA = summarize + visualize data to understand distributions, relationships, and anomalies.",
        "A feature that predicts the target suspiciously well often signals data leakage.",
        "Cheap up-front exploration prevents expensive downstream mistakes.",
      ],
      source: { title: "John Tukey — Exploratory Data Analysis (concept)", url: "https://en.wikipedia.org/wiki/Exploratory_data_analysis", note: "The origin and philosophy of EDA." },
    },
    quiz: [
      { q: "The main goal of EDA is to…", options: ["Train the final model", "Understand the data's distributions, relationships, and problems before modeling", "Deploy to production", "Delete outliers automatically"], answer: 1, explain: "EDA builds understanding and surfaces issues before any modeling commitment is made." },
      { q: "A feature that predicts the target almost perfectly during EDA is often a sign of…", options: ["A great model", "Data leakage", "Too little data", "A hardware fault"], answer: 1, explain: "Suspiciously perfect prediction usually means information about the target has leaked into that feature." },
      { q: "Discovering that the positive class is only 2% of rows reveals…", options: ["A class-imbalance problem to plan for", "That the data is perfect", "That you need a bigger GPU", "Nothing useful"], answer: 0, explain: "Severe class imbalance changes which metrics and techniques you should use — better to know early." },
    ],
  },

  {
    id: "feature-engineering",
    label: "Feature Engineering",
    cluster: "data",
    short: "Crafting the inputs that make patterns learnable — often more decisive than the model.",
    keywords: "feature engineering transformation encoding representation domain knowledge",
    learn: {
      why: "A model can only find patterns that its inputs make visible. Feature engineering — creating, transforming, and selecting the right inputs — is frequently the single highest-leverage activity in classic ML, and it's where domain knowledge pays off.",
      sections: [
        { h: "What a feature is", body: [
          "A **feature** is an individual measurable input to a model — a column. Feature engineering is the craft of turning raw data into features that expose the signal: extracting `day_of_week` from a timestamp, computing a ratio, bucketing ages, or combining fields.",
        ]},
        { h: "Common techniques", body: [
          { ul: [
            "**Transformations** — log-scaling skewed values, normalizing ranges.",
            "**Encoding** — turning categories into numbers (one-hot, target encoding).",
            "**Interactions** — combining features (price ÷ size = price per sq ft).",
            "**Domain features** — hand-crafted signals a practitioner knows matter.",
          ]},
        ]},
        { h: "The deep-learning shift", body: [
          "Classic ML leans heavily on manual feature engineering. **Deep learning** changed this: neural networks learn their own features (representations) from raw data, which is why they dominate images, audio, and text. But for tabular business data, thoughtful hand-engineered features still often beat deep nets.",
        ]},
      ],
      keyPoints: [
        "A feature is one input column; engineering them well exposes patterns the model can learn.",
        "Techniques: transform, encode categoricals, build interactions, add domain-specific signals.",
        "Deep learning learns features automatically from raw data — but hand features still win on tabular data.",
      ],
      source: { title: "Google — Feature Engineering", url: "https://developers.google.com/machine-learning/crash-course/representation/feature-engineering", note: "Turning raw data into good model inputs." },
    },
    quiz: [
      { q: "In machine learning, a 'feature' is…", options: ["A bug in the model", "An individual measurable input variable (a column)", "The final prediction", "A type of GPU"], answer: 1, explain: "Features are the input variables a model uses to make predictions." },
      { q: "The key difference deep learning introduced for features is that neural networks…", options: ["Require more manual feature engineering", "Learn their own feature representations from raw data", "Cannot use features at all", "Only work on tabular data"], answer: 1, explain: "Deep nets learn representations automatically, reducing manual feature engineering — especially for images/audio/text." },
      { q: "For which data type does hand-crafted feature engineering still frequently beat deep learning?", options: ["Raw images", "Tabular/business data", "Raw audio", "Raw text"], answer: 1, explain: "On structured tabular data, gradient-boosted trees with good features often outperform deep nets." },
    ],
  },

  {
    id: "data-splitting",
    label: "Train / Validation / Test Split",
    cluster: "data",
    short: "Holding out data to measure real generalization instead of fooling yourself.",
    keywords: "train test validation split holdout generalization overfitting data split",
    learn: {
      why: "A model that memorizes its training data can look perfect and still be useless. Splitting data into separate sets is the fundamental discipline that lets you estimate how a model performs on data it has never seen — the only performance that matters.",
      sections: [
        { h: "The three sets", body: [
          { ul: [
            "**Training set** — the model learns its parameters from this.",
            "**Validation set** — used to tune hyperparameters and choose between models.",
            "**Test set** — touched **once**, at the very end, to estimate real-world performance.",
          ]},
        ]},
        { h: "Why separation matters", body: [
          "If you evaluate on data the model trained on, you measure memorization, not learning. The gap between training and validation performance reveals **overfitting**. The test set stays sealed so its estimate stays honest — the moment you make decisions based on it, it's contaminated.",
        ]},
        { h: "Doing it right", body: [
          "Splits must respect structure: time-series data splits by time (never shuffle the future into the past); grouped data (e.g. multiple rows per patient) splits by group so the same entity isn't in both train and test. Getting this wrong is a common, silent source of **leakage** and over-optimistic results.",
        ]},
      ],
      keyPoints: [
        "Train to fit, validation to tune/select, test once for an honest final estimate.",
        "Evaluating on training data measures memorization; the train–val gap reveals overfitting.",
        "Split by time or group when the data has that structure, or you leak and overstate performance.",
      ],
      source: { title: "Google — Training, validation, and test sets", url: "https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets", note: "Why and how to partition data." },
    },
    quiz: [
      { q: "The test set should be used…", options: ["Continuously during training", "Once, at the very end, for an honest performance estimate", "To train the model", "To pick the learning rate"], answer: 1, explain: "The test set must stay untouched until the end; using it for decisions contaminates the estimate." },
      { q: "A large gap between high training accuracy and low validation accuracy indicates…", options: ["Underfitting", "Overfitting", "A perfect model", "A hardware error"], answer: 1, explain: "The model fits training data far better than unseen data — the signature of overfitting." },
      { q: "For time-series data, you should split…", options: ["Randomly by shuffling all rows", "By time, keeping the future out of training", "By alphabet", "Not at all"], answer: 1, explain: "Random shuffling leaks future information into the past; time-series must split chronologically." },
    ],
  },

  {
    id: "evaluation-metrics",
    label: "Evaluation Metrics",
    cluster: "data",
    short: "Choosing the number that actually reflects success — accuracy is often a trap.",
    keywords: "accuracy precision recall f1 roc auc rmse metric confusion matrix",
    learn: {
      why: "The metric you optimize is the behavior you get. Pick the wrong one and your 'great' model fails in production. Understanding metrics — especially beyond raw accuracy — is essential for both classic ML and evaluating AI systems.",
      sections: [
        { h: "Why accuracy misleads", body: [
          "If 99% of transactions are legitimate, a model that always predicts 'legit' is 99% accurate and catches zero fraud. With **imbalanced** data, accuracy is meaningless. You need metrics that account for the kinds of mistakes.",
        ]},
        { h: "Classification metrics", body: [
          { ul: [
            "**Precision** — of the things you flagged positive, how many were right? (avoids false alarms)",
            "**Recall** — of all the real positives, how many did you catch? (avoids misses)",
            "**F1** — the harmonic mean of precision and recall, one balanced number.",
            "**ROC-AUC** — how well the model ranks positives above negatives across all thresholds.",
          ]},
          "Precision and recall trade off: cranking one usually lowers the other, and the right balance depends on whether false alarms or misses are costlier.",
        ]},
        { h: "Regression metrics", body: [
          "For predicting numbers, common metrics are **RMSE** (root mean squared error — penalizes big errors heavily) and **MAE** (mean absolute error — treats errors linearly). The choice reflects how much you care about large mistakes.",
        ]},
      ],
      keyPoints: [
        "On imbalanced data, accuracy is misleading — use precision, recall, F1, or AUC.",
        "Precision avoids false alarms; recall avoids misses; they trade off against each other.",
        "For regression, RMSE punishes large errors more than MAE — pick based on cost of big mistakes.",
      ],
      source: { title: "Google — Classification metrics (precision, recall, ROC/AUC)", url: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall", note: "Clear definitions with worked examples." },
    },
    quiz: [
      { q: "Why is accuracy a poor metric when 99% of examples are one class?", options: ["It is too hard to compute", "A model that always predicts the majority class scores 99% while being useless", "Accuracy needs a GPU", "It only works for text"], answer: 1, explain: "With heavy imbalance, always guessing the majority yields high accuracy but catches none of the rare, important cases." },
      { q: "Recall measures…", options: ["Of the items flagged positive, how many were correct", "Of all real positives, how many the model caught", "The training speed", "The number of features"], answer: 1, explain: "Recall = true positives / all actual positives — the fraction of real positives you found." },
      { q: "Compared to MAE, RMSE…", options: ["Ignores large errors", "Penalizes large errors more heavily", "Is only for classification", "Requires labels to be text"], answer: 1, explain: "Squaring errors makes RMSE grow faster with big mistakes, emphasizing large errors." },
    ],
  },

  {
    id: "experimentation",
    label: "A/B Testing & Experimentation",
    cluster: "data",
    short: "Proving a change actually helped, instead of assuming it did.",
    keywords: "ab testing experiment control treatment causal significance randomization",
    learn: {
      why: "Shipping an AI feature isn't the end — you have to know if it actually improved anything. Controlled experiments (A/B tests) are how products, including AI features, are honestly evaluated against reality rather than intuition.",
      sections: [
        { h: "The core idea", body: [
          "Randomly split users into a **control** group (current experience) and a **treatment** group (the change). Because assignment is random, the groups are comparable, so any difference in outcomes can be attributed to the change — this is how you get **causal** evidence, not just correlation.",
        ]},
        { h: "Reading the result", body: [
          "You compare a metric (conversion, retention, latency) between groups and apply a **significance** test to ask: is this difference bigger than random noise would routinely produce? A small p-value or a confidence interval that excludes zero suggests a real effect.",
          "You also need enough sample size (**statistical power**) to detect a meaningful effect — underpowered tests miss real improvements.",
        ]},
        { h: "Common traps", body: [
          { ul: [
            "**Peeking** — repeatedly checking and stopping when it looks good inflates false positives.",
            "**Multiple comparisons** — test enough metrics and something looks 'significant' by chance.",
            "**Novelty effects** — a change looks great briefly just because it's new.",
          ]},
        ]},
      ],
      keyPoints: [
        "Random assignment makes control and treatment comparable, yielding causal (not just correlational) evidence.",
        "Significance testing separates a real effect from noise; adequate sample size (power) is required.",
        "Beware peeking, multiple comparisons, and novelty effects — classic ways to fool yourself.",
      ],
      source: { title: "Kohavi, Tang & Xu — Trustworthy Online Controlled Experiments", url: "https://experimentguide.com/", note: "The definitive practitioner reference on A/B testing." },
    },
    quiz: [
      { q: "Why does random assignment let an A/B test show causation?", options: ["It makes the groups comparable, so differences can be attributed to the change", "It increases the sample size automatically", "It removes the need for a control group", "It guarantees a positive result"], answer: 0, explain: "Randomization balances all other factors on average, so the treatment is the only systematic difference." },
      { q: "'Peeking' — repeatedly checking results and stopping when they look good — causes…", options: ["More reliable results", "Inflated false-positive rates", "Faster GPUs", "Lower variance"], answer: 1, explain: "Repeated looks with early stopping dramatically raise the chance of a spurious 'significant' result." },
      { q: "An underpowered A/B test (too small a sample) tends to…", options: ["Always find effects", "Miss real effects that exist", "Need no randomization", "Prove causation more strongly"], answer: 1, explain: "Insufficient sample size lacks the power to detect true effects, producing false negatives." },
    ],
  },

  {
    id: "data-visualization",
    label: "Data Visualization",
    cluster: "data",
    short: "Turning numbers into pictures that reveal truth — and mislead if done carelessly.",
    keywords: "visualization charts plots graphs communication tufte perception",
    learn: {
      why: "Humans reason far better about pictures than tables of numbers. Good visualization is how data scientists find patterns during analysis and communicate findings so decisions get made — and it's easy to accidentally (or deliberately) mislead.",
      sections: [
        { h: "Two jobs", body: [
          "Visualization serves **exploration** (charts you make for yourself to understand the data during EDA) and **explanation** (polished charts you make for others to communicate a conclusion). The design priorities differ, but both rely on matching the chart type to the data.",
        ]},
        { h: "Matching chart to question", body: [
          { ul: [
            "**Distribution** of one variable → histogram / box plot.",
            "**Relationship** between two → scatter plot.",
            "**Comparison** across categories → bar chart.",
            "**Change over time** → line chart.",
            "**Composition** of a whole → stacked bar (rarely a pie).",
          ]},
        ]},
        { h: "Honesty in charts", body: [
          "Charts can lie: truncated y-axes exaggerate differences, dual axes imply false links, and 3D effects distort. Tufte's principle is **maximize the data-ink ratio** — show the data, cut the decoration. A clear, honest chart respects both the data and the reader.",
        ]},
      ],
      keyPoints: [
        "Exploration charts build your understanding; explanation charts communicate a conclusion.",
        "Match the chart to the question: distribution, relationship, comparison, trend, or composition.",
        "Truncated axes and chart junk mislead; favor honest, high data-ink visuals.",
      ],
      source: { title: "Edward Tufte — The Visual Display of Quantitative Information", url: "https://www.edwardtufte.com/tufte/books_vdqi", note: "The foundational text on principled data visualization." },
    },
    quiz: [
      { q: "To show how one numeric variable is distributed, the natural choice is…", options: ["A pie chart", "A histogram", "A network graph", "A word cloud"], answer: 1, explain: "Histograms (or box plots) reveal the shape, spread, and skew of a single variable's distribution." },
      { q: "Truncating a bar chart's y-axis so it doesn't start at zero can…", options: ["Improve honesty", "Exaggerate small differences and mislead the reader", "Reduce the data", "Only affect line charts"], answer: 1, explain: "A non-zero baseline visually inflates differences, a classic way charts mislead." },
      { q: "Tufte's 'data-ink ratio' principle advises you to…", options: ["Add more decoration and 3D effects", "Maximize the ink devoted to actual data and cut chart junk", "Always use pie charts", "Hide the axes"], answer: 1, explain: "Spend ink on data, not decoration — clarity comes from removing non-informative elements." },
    ],
  },

  {
    id: "data-pipelines",
    label: "Data Pipelines & ETL",
    cluster: "data",
    short: "The plumbing that moves and transforms data reliably and repeatably.",
    keywords: "pipeline etl elt ingestion transformation batch streaming orchestration",
    learn: {
      why: "In production, data isn't a static file — it flows continuously from sources to models. Data pipelines are the engineering that makes this reliable, repeatable, and fresh. Without solid pipelines, models are fed stale or broken data and quietly degrade.",
      sections: [
        { h: "ETL and ELT", body: [
          "A pipeline **Extracts** data from sources, **Transforms** it (clean, join, aggregate), and **Loads** it where it's needed — hence **ETL**. Modern warehouses often flip the order (**ELT**): load raw first, transform inside the warehouse for flexibility.",
        ]},
        { h: "Batch vs. streaming", body: [
          { ul: [
            "**Batch** — process chunks on a schedule (e.g. nightly). Simple, great for training data and reports.",
            "**Streaming** — process events continuously as they arrive. Needed for real-time features and fraud detection.",
          ]},
        ]},
        { h: "What makes a pipeline good", body: [
          "Reliability comes from being **idempotent** (re-running produces the same result), **observable** (you can see failures), and **tested** (data quality checks catch bad inputs). **Orchestration** tools (Airflow, Dagster) schedule and monitor the steps. This is where data science meets software engineering — and where MLOps builds on top.",
        ]},
      ],
      keyPoints: [
        "ETL/ELT = extract, transform, load — the repeatable flow of data from source to use.",
        "Batch processes on a schedule; streaming processes events in real time.",
        "Good pipelines are idempotent, observable, and quality-tested; orchestration schedules them.",
      ],
      source: { title: "Fundamentals of Data Engineering (Reis & Housley) — overview", url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/", note: "The standard reference for the data-engineering lifecycle." },
    },
    quiz: [
      { q: "What does ETL stand for?", options: ["Evaluate, Test, Learn", "Extract, Transform, Load", "Encode, Train, Log", "Explore, Tune, Launch"], answer: 1, explain: "ETL pipelines extract data from sources, transform it, and load it to a destination." },
      { q: "Real-time fraud detection most needs which kind of pipeline?", options: ["Nightly batch", "Streaming (continuous, event-by-event)", "Manual copy-paste", "No pipeline"], answer: 1, explain: "Fraud must be caught as it happens, requiring streaming rather than scheduled batch processing." },
      { q: "An 'idempotent' pipeline step means…", options: ["It can only run once ever", "Re-running it produces the same result without duplication or corruption", "It requires a GPU", "It deletes its inputs"], answer: 1, explain: "Idempotency lets you safely retry steps — reruns don't double-count or corrupt data." },
    ],
  },

  {
    id: "data-labeling",
    label: "Data Labeling & Annotation",
    cluster: "data",
    short: "Creating the ground-truth answers that supervised learning and evals depend on.",
    keywords: "labeling annotation ground truth supervision quality inter-annotator agreement",
    learn: {
      why: "Supervised models learn from labeled examples, and AI systems are judged against labeled test sets. The quality of those human-created labels sets a hard ceiling on model quality — noisy labels teach the model noise. Labeling is also where a lot of real-world AI cost and effort goes.",
      sections: [
        { h: "What labeling is", body: [
          "Labeling attaches the correct answer (the **ground truth**) to each example: this image is a cat, this email is spam, this response is helpful. It's the raw material of **supervised learning** and of **evaluation**.",
        ]},
        { h: "Quality is everything", body: [
          "Labels are made by humans, and humans disagree and err. **Inter-annotator agreement** measures how consistently different labelers assign the same label — low agreement means the task is ambiguous or the guidelines are poor. Clear guidelines, training, and adjudication of disagreements are what produce trustworthy labels.",
        ]},
        { h: "Modern twists", body: [
          { ul: [
            "**Active learning** — the model flags the examples it's most unsure about, so humans label the most informative ones first.",
            "**Weak supervision** — generate noisy labels cheaply from rules/heuristics, then denoise.",
            "**AI-assisted labeling** — models pre-label and humans correct, and LLMs increasingly serve as judges (with care about their own biases).",
          ]},
        ]},
      ],
      keyPoints: [
        "Labels are the ground truth for supervised training and evaluation; their quality caps model quality.",
        "Inter-annotator agreement gauges label reliability; clear guidelines raise it.",
        "Active learning, weak supervision, and AI-assisted labeling reduce cost — but noisy labels teach noise.",
      ],
      source: { title: "Snorkel — Weak supervision and programmatic labeling", url: "https://www.snorkel.org/blog/", note: "How teams scale labeling beyond pure manual annotation." },
    },
    quiz: [
      { q: "In supervised learning, labels provide…", options: ["The GPU configuration", "The ground-truth answers the model learns to predict", "The learning rate", "The chart colors"], answer: 1, explain: "Labels are the correct outputs; the model learns the mapping from inputs to these answers." },
      { q: "Low inter-annotator agreement usually indicates…", options: ["A perfect dataset", "Ambiguous tasks or poor labeling guidelines", "Too many GPUs", "The model is overfitting"], answer: 1, explain: "When labelers disagree, the task definition or guidelines are unclear — labels will be noisy." },
      { q: "Active learning improves labeling efficiency by…", options: ["Labeling every example twice", "Prioritizing the examples the model is most uncertain about", "Removing all humans", "Only labeling easy cases"], answer: 1, explain: "By focusing human effort on the most informative (uncertain) examples, active learning gets more value per label." },
    ],
  },

  {
    id: "data-leakage",
    label: "Data Leakage",
    cluster: "data",
    short: "When information from the future or the answer sneaks into training — the silent model killer.",
    keywords: "data leakage target leakage train test contamination overfitting evaluation",
    learn: {
      why: "Data leakage is the most dangerous bug in machine learning because it makes a broken model look excellent. It's the reason models that score 99% in the lab collapse in production — and spotting it is a mark of real expertise.",
      sections: [
        { h: "What leakage is", body: [
          "Leakage is when information that wouldn't be available at prediction time — or information about the answer itself — sneaks into the model's training inputs. The model 'cheats', so evaluation is wildly optimistic, and then it fails on genuinely unseen data.",
        ]},
        { h: "Common forms", body: [
          { ul: [
            "**Target leakage** — a feature is a stand-in for the answer (e.g. using `was_refunded` to predict fraud, when refunds only happen after fraud is confirmed).",
            "**Train/test contamination** — the same rows, or preprocessing statistics computed over all data, bleed across the split.",
            "**Temporal leakage** — future information used to predict the past (shuffling time series).",
          ]},
        ]},
        { h: "How to prevent it", body: [
          "Ask of every feature: *would I actually have this value at the moment of prediction?* Fit all preprocessing on the training set only, split by time/group when relevant, and be deeply suspicious of any feature or model that looks too good. If results seem too good to be true, look for leakage first.",
        ]},
      ],
      keyPoints: [
        "Leakage = future or answer information entering training, making a bad model look great.",
        "Watch for target leakage, train/test contamination, and temporal leakage.",
        "Prevent it by asking whether each feature is truly available at prediction time and fitting preprocessing on train only.",
      ],
      source: { title: "Kaufman et al. — Leakage in Data Mining", url: "https://dl.acm.org/doi/10.1145/2020408.2020496", note: "The formal treatment of leakage and how to avoid it." },
    },
    quiz: [
      { q: "Data leakage typically causes evaluation results that are…", options: ["Too pessimistic", "Overly optimistic, then failing in production", "Exactly correct", "Impossible to compute"], answer: 1, explain: "Leakage lets the model 'cheat', inflating lab performance that then collapses on real unseen data." },
      { q: "Using a feature that only becomes known *after* the outcome is an example of…", options: ["Good feature engineering", "Target leakage", "Regularization", "Cross-validation"], answer: 1, explain: "Such a feature encodes the answer and won't exist at real prediction time — classic target leakage." },
      { q: "The best mental check for leakage is asking…", options: ["Is my GPU fast enough?", "Would I actually have this feature's value at the moment of prediction?", "Is the model big enough?", "Are the labels colorful?"], answer: 1, explain: "If a value wouldn't be available at prediction time, using it in training leaks information." },
    ],
  },
]);
