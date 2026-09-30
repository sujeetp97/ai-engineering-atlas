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
      { q: "Your churn model underperforms. Following 'garbage in, garbage out', where should you look first?", options: ["A more exotic model architecture with more layers", "The quality of the data: labels, leakage, and bias", "A faster GPU so the model can train for longer", "A different programming language for the pipeline"], answer: 1, explain: "Most model problems are really data problems. Biased, leaky or mislabeled data caps what any model can achieve." },
      { q: "What's the first step of a data-science project?", options: ["Training the most powerful model available", "Building a dashboard to share the results", "Framing the question and defining a success metric", "Collecting as much data as possible, of any kind"], answer: 2, explain: "Frame the question and decide what 'good' means before collecting or modeling. The metric shapes everything downstream." },
      { q: "Which part of the typical workflow usually takes the most effort?", options: ["Tuning the model's hyperparameters", "Writing the final report for stakeholders", "Choosing between two similar model types", "Collecting and cleaning the data"], answer: 3, explain: "Gathering and cleaning data is usually the biggest chunk of the work, and it's what most determines the result." },
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
      { q: "A skin-condition classifier is trained only on photos from one hospital, whose patients are mostly light-skinned. What's the core risk?", options: ["Overfitting: the photos are too high-resolution", "Selection bias: poor results for unseen groups", "Leakage: the hospital's name is in the file names", "None, as long as the model is large enough"], answer: 1, explain: "A non-representative sample becomes a blind spot. Better modeling can't repair it; the fix is at collection." },
      { q: "You can technically scrape a site's user reviews to train a model. What should you check before using them?", options: ["Whether the reviews contain enough emojis", "Whether scraping is faster than an API", "Licensing, consent, and privacy obligations", "Only whether the dataset is large enough"], answer: 2, explain: "Not all data you can scrape is data you may use. Personal data and licensing carry legal and ethical obligations." },
      { q: "A demand model trained on 2019 shopping behavior performs badly today. What collection issue is this?", options: ["The model has too few parameters for 2019 data", "The data was collected by an external vendor", "Old data can't be stored in modern databases", "The data is stale; behavior has changed since"], answer: 3, explain: "Data ages. A model trained on old behavior can go stale, so freshness is part of collection decisions." },
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
      { q: "A customer table has 'NY', 'New York', and 'new york' in the city column. What's the right move?", options: ["Drop every row that mentions New York", "Standardize them into one consistent value", "Leave them; the model will figure it out", "Convert each one to a random number"], answer: 1, explain: "Inconsistent formats split one entity into several. Standardize them so the model sees the same thing consistently." },
      { q: "You standardize a feature using the mean and standard deviation of the whole dataset, before splitting. What's the problem?", options: ["Standardizing makes the feature impossible to read", "The mean of a dataset can't be computed in code", "Test-set information leaks into the training step", "Standardization only works on categorical data"], answer: 2, explain: "Compute cleaning statistics on the training set only and apply them everywhere. Otherwise information from the test data leaks into training." },
      { q: "A salary column has a few values of 9,999,999. What's the right approach?", options: ["Always delete every outlier automatically", "Always keep them, since all data is valid", "Replace the whole column with its average", "Check whether they're errors or real first"], answer: 3, explain: "Outliers may be placeholder codes or rare truths. Handle them deliberately, not by reflex." },
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
      { q: "A histogram shows many 'age' values of 999. What does that suggest?", options: ["The dataset includes many very old customers", "It's probably a missing-data code, not a real age", "The model should treat 999 as the typical age", "Histograms can't be used on age values"], answer: 1, explain: "A quick histogram exposes impossible values like placeholder codes before they quietly corrupt a model." },
      { q: "In your first look at the data, one feature predicts the target almost perfectly. What should you suspect?", options: ["You've found the perfect feature; ship it", "The model will need more regularization", "The target variable was sorted alphabetically", "Data leakage — it may encode the answer itself"], answer: 3, explain: "A suspiciously predictive feature is a classic leakage red flag. Check whether it would really be available at prediction time." },
      { q: "EDA shows that only 2% of rows are fraud cases. What have you learned?", options: ["The model will easily reach 98% useful accuracy", "Fraud rows should be deleted as outliers", "The classes are imbalanced, which affects metrics", "The dataset is too small to use for anything"], answer: 2, explain: "Class imbalance changes how you train and evaluate, and accuracy alone will mislead. Catching it early saves confused debugging." },
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
      { q: "A ride-share demand model uses raw timestamps and misses rush-hour patterns. What feature would help most?", options: ["The timestamp converted into a very long string", "Hour of day and weekday taken from the timestamp", "A random ID assigned to every ride in the data", "The total number of rows in the dataset"], answer: 1, explain: "Extracting the hour and day exposes cyclical patterns the model can't easily see in a raw timestamp." },
      { q: "You have listing price and floor area. Which engineered feature best captures value for money?", options: ["Price plus area, added together", "The first digit of the price", "Area rounded to the nearest 1,000", "Price per square foot (price ÷ area)"], answer: 3, explain: "Interaction features like ratios combine raw fields into the signal that actually matters." },
      { q: "Why do image models rely less on hand-crafted features than tabular models do?", options: ["Images contain no useful features to engineer", "Feature engineering is banned for image data", "Deep nets learn features from raw pixels", "Image models never need training data"], answer: 2, explain: "Representation learning discovers features automatically for images, audio and text. On tabular data, thoughtful hand-made features still often win." },
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
      { q: "You tried 30 model variants and kept whichever scored best on the test set. What's the problem?", options: ["Thirty variants is too few to find a good one", "The test set is no longer an honest estimate", "The training set was probably too large", "Test sets should be used before training"], answer: 1, explain: "Once you make decisions based on the test set, it's contaminated. Tune on validation data and touch the test set once, at the end." },
      { q: "A hospital dataset has several rows per patient. How should you split it?", options: ["Randomly by row, so the split is perfectly even", "Alphabetically by the patient's last name", "Put the newest rows in training, oldest in test", "By patient, so no patient is in both train and test"], answer: 3, explain: "Grouped data should be split by group. Otherwise the model sees the same patient in training and testing, which inflates results." },
      { q: "What is the validation set used for?", options: ["Training the model's weights directly", "Reporting the final, unbiased performance", "Tuning hyperparameters and choosing models", "Storing data that couldn't be cleaned"], answer: 2, explain: "Train to fit parameters, validate to tune and select, and test once for the honest final estimate." },
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
      { q: "A cancer-screening model must miss as few real cases as possible, even if some healthy people get flagged. Which metric matters most?", options: ["Precision", "Recall", "Accuracy", "RMSE"], answer: 1, explain: "Recall measures how many real positives you catch. When misses are costliest, prioritize recall and accept more false alarms." },
      { q: "A spam filter sends important emails to the spam folder, and users hate it. Which metric should you improve?", options: ["Recall: catching more of the real spam emails", "Accuracy: the share of all emails classified right", "RMSE: the average size of each prediction error", "Precision: fewer false alarms among flagged emails"], answer: 3, explain: "Precision asks how many flagged items were really positive. Legitimate mail in the spam folder means false positives, so raise precision." },
      { q: "Only 1% of transactions are fraud, and your model is 99% accurate. What should you conclude?", options: ["The model is excellent and ready to ship", "Nothing yet; always saying 'legit' gets 99% too", "The model must be overfitting the fraud cases", "Accuracy above 95% guarantees it catches fraud"], answer: 1, explain: "On imbalanced data, accuracy misleads. Look at precision, recall, F1 or AUC to see whether fraud is actually being caught." },
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
      { q: "Why are users randomly assigned to control and treatment groups in an A/B test?", options: ["So each group ends up with exactly the same size", "So the test finishes faster than it otherwise would", "So differences can be credited to the change itself", "So users can choose which version they prefer"], answer: 2, explain: "Random assignment makes the groups comparable, so a difference in outcomes can be attributed to the change: causal evidence, not just correlation." },
      { q: "A PM checks an A/B test every hour and stops it the moment it shows a significant win. What's wrong?", options: ["Hourly checks slow down the website for users", "Peeking inflates the chance of a false positive", "Tests should always run for exactly one week", "Nothing — stopping early saves time and money"], answer: 1, explain: "Checking repeatedly and stopping when it looks good makes chance fluctuations look like wins. Fix the sample size up front, or use methods designed for repeated looks." },
      { q: "A redesigned page lifts clicks by 20% in its first week, then fades back to baseline. What's the likely explanation?", options: ["The test had too much statistical power", "The control group grew bored of the old page", "Randomization failed during the second week", "A novelty effect: it drew clicks by being new"], answer: 3, explain: "New things attract attention for a while. Run tests long enough to see past novelty effects." },
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
      { q: "You want to show how monthly revenue changed over two years. Which chart fits?", options: ["A pie chart", "A histogram", "A line chart", "A scatter plot"], answer: 2, explain: "Change over time is a line chart's job. Pie charts show parts of a whole; histograms show one variable's distribution." },
      { q: "A bar chart's y-axis starts at 95 instead of 0, making a 2% difference look huge. What's the issue?", options: ["Bar charts can't show percentages at all", "A truncated axis exaggerates the difference", "The bars should have been drawn in 3D", "The chart uses too little color to be clear"], answer: 1, explain: "Truncated axes exaggerate differences. Honest charts show the data plainly and cut distortion and decoration." },
      { q: "What's the difference between exploration charts and explanation charts?", options: ["Exploration charts must always be in 3D", "Explanation charts never use real data", "There's no difference; both have the same goal", "Exploration is for you; explanation communicates"], answer: 3, explain: "Exploration charts help you understand the data during analysis; explanation charts are polished to communicate a conclusion to others." },
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
      { q: "A nightly job failed halfway, and re-running it doubled some records. Which property was missing?", options: ["Streaming: processing each event as it arrives", "Encoding: converting categories into numbers", "Idempotency: re-runs should give the same result", "Sampling: using only part of the data each night"], answer: 2, explain: "An idempotent pipeline produces the same result however many times it runs, so failures can be retried safely." },
      { q: "A fraud system must score each card swipe within a second. Which pipeline style fits?", options: ["Batch, processing everything once a night", "Streaming, processing events as they arrive", "Manual, with an analyst exporting a CSV", "Monthly, rebuilding all tables at once"], answer: 1, explain: "Real-time decisions need streaming. Batch processing is simpler and great for training data and reports, but it's too slow here." },
      { q: "A source system starts sending prices in cents instead of dollars. What catches this before the model is fed bad data?", options: ["A faster orchestration tool like Airflow", "Switching from ETL to ELT ordering", "Adding more rows to the training data", "Data-quality checks on the incoming values"], answer: 3, explain: "Good pipelines are tested and observable. Quality checks on inputs catch unit changes and broken data before models quietly degrade." },
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
      { q: "Two labelers agree on only 60% of 'toxic comment' labels. What does that suggest?", options: ["One labeler must be deliberately cheating", "The model will learn faster from disagreement", "The task or guidelines are ambiguous", "Labels don't matter once there's enough data"], answer: 2, explain: "Low inter-annotator agreement signals an ambiguous task or unclear guidelines. Clarify them and adjudicate the disagreements." },
      { q: "Your labeling budget is small. How can the model help choose which examples to label?", options: ["Label only the examples it already gets right", "Active learning: label where it's least sure", "Label examples in alphabetical order by ID", "Skip labeling and train on unlabeled data"], answer: 1, explain: "Active learning sends the most informative, uncertain examples to humans first, getting more value from each label." },
      { q: "Why does label quality set a ceiling on model quality?", options: ["Labels are used only for display, not training", "Noisy labels make training run more slowly", "Models ignore labels once they are large enough", "Models learn what labels say, noise and all"], answer: 3, explain: "Labels are the ground truth for training and evaluation. Noisy labels teach noise and make evaluation unreliable." },
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
      { q: "A fraud model uses a `was_refunded` feature and scores 99% offline, then fails in production. Why?", options: ["The model was too small to learn refund patterns", "Production data uses different column names", "Refunds happen after fraud is confirmed, so it leaks", "99% offline always means 99% in production"], answer: 2, explain: "That's target leakage: the feature is only known after the answer. Ask of every feature whether you'd really have it at prediction time." },
      { q: "You shuffle a time series before splitting it into train and test. What's the risk?", options: ["Shuffling makes the data harder to store on disk", "The model trains on the future to predict the past", "The test set becomes much larger than intended", "Time series can't be used for machine learning"], answer: 1, explain: "That's temporal leakage: shuffling lets future information into training, so offline results look far better than real forecasting would." },
      { q: "Your first model scores unbelievably well. What's the best first reaction?", options: ["Ship it before anything changes", "Add more features to push it higher", "Report it as a new state of the art", "Look for leakage before celebrating"], answer: 3, explain: "If results seem too good to be true, look for leakage first. It's the classic reason lab scores collapse in production." },
    ],
  },
]);
