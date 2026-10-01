/* ===========================================================================
   CLASSIC MACHINE LEARNING — learning patterns from data without neural nets.
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "machine-learning",
    label: "Machine Learning",
    cluster: "ml",
    short: "Programs that improve at a task by learning patterns from data instead of being explicitly coded.",
    keywords: "machine learning model training generalization pattern algorithm",
    learn: {
      why: "Machine learning is the paradigm shift underneath all of modern AI: instead of writing rules by hand, we let a program infer them from examples. Every model in this atlas — from linear regression to GPT — is machine learning.",
      sections: [
        { h: "The core idea", body: [
          "Traditional programming: a human writes explicit rules (`if income > X and age < Y then …`). Machine learning inverts this: you give the computer **examples** (inputs and desired outputs) and an algorithm finds the rules — the **model** — that best map inputs to outputs.",
          "Tom Mitchell's classic definition: a program learns from experience E at task T measured by performance P, if its performance at T (measured by P) improves with E.",
        ]},
        { h: "The three families", body: [
          { ul: [
            "**Supervised** — learn from labeled examples (input → correct output).",
            "**Unsupervised** — find structure in unlabeled data (clusters, compression).",
            "**Reinforcement** — learn by trial and error from rewards.",
          ]},
        ]},
        { h: "Generalization is the goal", body: [
          "The point isn't to memorize the training data — it's to **generalize** to new, unseen data. A model that aces training examples but fails on new ones has learned nothing useful. Everything in ML — splitting data, regularization, the bias–variance trade-off — is in service of generalization.",
        ]},
      ],
      keyPoints: [
        "ML learns rules from examples instead of having them hand-coded.",
        "Three families: supervised (labeled), unsupervised (unlabeled), reinforcement (rewards).",
        "Success is generalization to unseen data, not memorization of training data.",
      ],
      source: { title: "Google — Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", note: "A free, hands-on introduction to the core ideas." },
    },
    quiz: [
      { q: "A bank wants to flag fraudulent transactions. Instead of writing rules like 'amount > $5,000', it trains on past labeled transactions. What's the key shift?", options: ["The rules become simpler, so fraud is easier to spot", "The rules are learned from examples, not written by hand", "The computer no longer needs any data to decide", "Every past transaction is stored and looked up later"], answer: 1, explain: "Machine learning inverts programming: you supply examples, and an algorithm infers the mapping instead of a human coding the rules." },
      { q: "A model scores 99% on its training data but 60% on new data. What's gone wrong?", options: ["It's working as intended — training score is what counts", "The new data must have been labeled incorrectly", "It memorized training data instead of generalizing", "It needs to be tested on the training data again"], answer: 2, explain: "The goal is generalization to unseen data. A big gap between training and new-data performance means the model memorized rather than learned." },
      { q: "A robot learns to walk by trying moves and getting rewards for staying upright. Which learning family is this?", options: ["Supervised learning", "Unsupervised learning", "Self-supervised learning", "Reinforcement learning"], answer: 3, explain: "Learning by trial and error from rewards is reinforcement learning. Supervised learning needs labeled answers; unsupervised learning finds structure without labels." },
    ],
  },

  {
    id: "supervised-learning",
    label: "Supervised Learning",
    cluster: "ml",
    short: "Learning a mapping from inputs to known correct outputs — the workhorse of applied ML.",
    keywords: "supervised learning labels classification regression prediction training",
    learn: {
      why: "Most deployed ML — spam filters, credit scoring, medical diagnosis, and even the next-token prediction that trains LLMs — is supervised learning. It's the family you'll use most, and the one with the clearest success criteria.",
      sections: [
        { h: "Learning from answers", body: [
          "In supervised learning you have a dataset of inputs paired with correct outputs (**labels**). The algorithm learns a function that maps inputs to outputs, and you measure it against held-out labeled examples.",
        ]},
        { h: "Two sub-types", body: [
          { ul: [
            "**Classification** — predict a category (spam/not-spam, which digit, which disease).",
            "**Regression** — predict a continuous number (house price, temperature, demand).",
          ]},
          "The distinction drives your choice of model, loss function, and metric.",
        ]},
        { h: "Why LLMs count", body: [
          "Language models are trained by **self-supervised** learning — a clever form of supervised learning where the labels come free from the data itself: predict the next token, using the actual next token as the label. No human labeling needed, which is why it scales to the entire internet.",
        ]},
      ],
      keyPoints: [
        "Supervised learning maps inputs to known labeled outputs.",
        "Classification predicts categories; regression predicts continuous numbers.",
        "LLM pretraining is self-supervised — the next token serves as its own free label.",
      ],
      source: { title: "Google — Supervised learning framing", url: "https://developers.google.com/machine-learning/crash-course/framing/supervised", note: "Clean framing of labels, features, and targets." },
    },
    quiz: [
      { q: "Predicting tomorrow's electricity demand in megawatts is which kind of task?", options: ["Classification", "Regression", "Clustering", "Dimensionality reduction"], answer: 1, explain: "Predicting a continuous number is regression. Classification predicts categories; clustering and dimensionality reduction are unsupervised." },
      { q: "Which of these is a classification problem?", options: ["Estimating how many minutes a ticket takes to close", "Forecasting next month's total ticket volume", "Deciding which of 5 product categories a ticket is", "Predicting a customer's lifetime spend in dollars"], answer: 2, explain: "Classification predicts a category. The other three predict continuous numbers, which is regression." },
      { q: "How does LLM pretraining fit into supervised learning?", options: ["Human annotators label the next token for each page", "It isn't learning at all; it only memorizes text", "It uses reward signals instead of any labels", "The next token is a free label taken from the text"], answer: 3, explain: "Self-supervised pretraining is supervised learning with labels that come free from the data: the actual next token is the target." },
    ],
  },

  {
    id: "unsupervised-learning",
    label: "Unsupervised Learning",
    cluster: "ml",
    short: "Finding hidden structure in data that has no labels.",
    keywords: "unsupervised clustering dimensionality reduction structure patterns unlabeled",
    learn: {
      why: "Most of the world's data is unlabeled. Unsupervised learning finds structure — groups, patterns, compressed representations — without being told the answers. It powers customer segmentation, anomaly detection, and the representation learning behind embeddings.",
      sections: [
        { h: "No labels, just structure", body: [
          "Unsupervised learning receives only inputs — no correct answers — and tries to discover inherent structure. Because there's no ground truth, evaluating it is subtler than supervised learning.",
        ]},
        { h: "Main tasks", body: [
          { ul: [
            "**Clustering** — group similar items together (e.g. customer segments).",
            "**Dimensionality reduction** — compress many features into a few informative ones (e.g. PCA).",
            "**Density estimation / anomaly detection** — model what 'normal' looks like and flag outliers.",
            "**Representation learning** — learn useful embeddings from raw data.",
          ]},
        ]},
        { h: "Its role in modern AI", body: [
          "Self-supervised pretraining — the engine behind LLMs and modern vision models — is a close cousin of unsupervised learning: it manufactures its own labels from unlabeled data. This is how models learn rich representations from vast unlabeled corpora before any task-specific fine-tuning.",
        ]},
      ],
      keyPoints: [
        "Unsupervised learning finds structure in unlabeled data; there's no ground truth to score against directly.",
        "Key tasks: clustering, dimensionality reduction, anomaly detection, representation learning.",
        "Self-supervised pretraining extends this idea and underlies modern foundation models.",
      ],
      source: { title: "StatQuest — Clustering and PCA playlists", url: "https://statquest.org/video-index/", note: "Intuitive walkthroughs of the main unsupervised methods." },
    },
    quiz: [
      { q: "A retailer wants to discover natural customer groups, with no predefined labels. Which task is this?", options: ["Regression", "Classification", "Clustering", "Reinforcement learning"], answer: 2, explain: "Grouping similar items without labels is clustering, a core unsupervised task often used for customer segmentation." },
      { q: "Why is evaluating an unsupervised model harder than a supervised one?", options: ["Unsupervised models can't be run on new data", "There's no ground-truth answer to score against", "They always take much longer to train", "Their outputs can't be plotted or inspected"], answer: 1, explain: "With no labels, there's no direct accuracy to measure, so you rely on indirect metrics and domain knowledge to judge the structure found." },
      { q: "A payments team wants to flag unusual transactions but has no labeled fraud examples. Which approach fits?", options: ["Train a classifier on labeled fraud cases", "Use regression to predict transaction amounts", "Cluster users by name in alphabetical order", "Model normal behavior and flag outliers"], answer: 3, explain: "Anomaly detection models what 'normal' looks like and flags what doesn't fit, with no labels needed." },
    ],
  },

  {
    id: "reinforcement-learning",
    label: "Reinforcement Learning",
    cluster: "ml",
    short: "Learning to act by trial and error to maximize reward — and the basis of RLHF.",
    keywords: "reinforcement learning agent reward policy environment exploration rlhf",
    learn: {
      why: "Reinforcement learning is how agents learn to make sequences of decisions — from game-playing AIs to robotics. It's also the 'RL' in RLHF, the technique that turned raw language models into helpful assistants, making it directly relevant to modern AI engineering.",
      sections: [
        { h: "The setup", body: [
          "An **agent** observes a **state**, takes an **action**, and receives a **reward** and a new state from the **environment**. Over many steps it learns a **policy** — a strategy mapping states to actions — that maximizes cumulative reward. Unlike supervised learning, there's no labeled 'correct action'; feedback comes only as reward.",
        ]},
        { h: "The core tension", body: [
          "**Exploration vs. exploitation**: should the agent try new actions to discover better rewards (explore) or stick with what works (exploit)? Balancing this is central to RL, and rewards are often **delayed** — a move's true value may only show up many steps later (the credit-assignment problem).",
        ]},
        { h: "RL in modern AI", body: [
          "Landmark results: AlphaGo mastering Go, RL agents beating video games. In LLMs, **RLHF** (RL from Human Feedback) uses a reward model trained on human preferences to fine-tune the model toward helpful, harmless responses — a decisive step in making assistants usable.",
        ]},
      ],
      keyPoints: [
        "An agent learns a policy by taking actions and receiving rewards from an environment.",
        "Exploration vs. exploitation and delayed rewards (credit assignment) are the central challenges.",
        "RLHF applies RL to align LLMs with human preferences via a learned reward model.",
      ],
      source: { title: "Sutton & Barto — Reinforcement Learning: An Introduction (free)", url: "http://incompleteideas.net/book/the-book-2nd.html", note: "The canonical RL textbook, freely available." },
    },
    quiz: [
      { q: "A game-playing agent keeps using one decent strategy and never discovers a much better one. Which tension is it failing to balance?", options: ["Bias versus variance in the model", "Exploration versus exploitation", "Precision versus recall of its moves", "Training speed versus inference speed"], answer: 1, explain: "Exploiting what works earns reward now; exploring new actions may find something better. RL agents must balance the two." },
      { q: "A chess agent's move looks bad now but wins the game 30 moves later. Which RL challenge does this illustrate?", options: ["Overfitting to the games it trained on", "Vanishing gradients deep in the network", "Credit assignment with delayed rewards", "Class imbalance in its reward data"], answer: 2, explain: "When rewards arrive much later, it's hard to tell which earlier actions deserve the credit. That's the credit-assignment problem." },
      { q: "How is RL used to build modern AI assistants?", options: ["RLHF optimizes it against human-preference rewards", "RL replaces pretraining entirely for language models", "RL is used only to choose the model's temperature", "RL makes the model search the web for each answer"], answer: 0, explain: "RLHF trains a reward model on human preferences and uses RL to push the LLM toward responses that model scores highly." },
    ],
  },

  {
    id: "linear-regression",
    label: "Linear Regression",
    cluster: "ml",
    short: "Fitting a straight-line relationship — the simplest model, and the mental foundation for all others.",
    keywords: "linear regression line fit coefficients least squares prediction baseline",
    learn: {
      why: "Linear regression is the 'hello world' of machine learning. Understanding it deeply — how it fits, what its coefficients mean, when it fails — gives you the mental model for nearly everything else, including a single neuron in a neural network.",
      sections: [
        { h: "The model", body: [
          "Linear regression predicts a number as a weighted sum of the inputs plus a constant:",
          { formula: "ŷ = w₁x₁ + w₂x₂ + ... + wₙxₙ + b" },
          "Each **weight** (coefficient) says how much that feature moves the prediction. **b** is the bias/intercept. That's it — a single neuron with no activation function is exactly this.",
        ]},
        { h: "How it's fit", body: [
          "Training finds the weights that minimize the **squared error** between predictions and actual values (least squares). This can be solved directly with linear algebra, or iteratively with gradient descent — the same optimization that trains deep networks.",
        ]},
        { h: "Reading and limits", body: [
          "A big advantage is **interpretability**: a coefficient of 2.5 on 'bedrooms' means each bedroom adds 2.5 units to the predicted price, holding others fixed. Limits: it assumes a linear relationship, is sensitive to outliers, and can't capture curves or interactions unless you engineer them in.",
        ]},
      ],
      keyPoints: [
        "Linear regression predicts a weighted sum of features plus a bias — a single neuron without activation.",
        "It's fit by minimizing squared error, solvable directly or by gradient descent.",
        "Highly interpretable, but assumes linearity and is sensitive to outliers.",
      ],
      source: { title: "StatQuest — Linear Regression, clearly explained", url: "https://www.youtube.com/watch?v=nk2CQITm_eo", note: "Builds intuition for fitting and interpreting the line." },
    },
    quiz: [
      { q: "A house-price model has a coefficient of 12,000 on 'bedrooms'. What does that mean?", options: ["Houses need 12,000 bedrooms to reach the average price", "Bedrooms explain 12,000 of the model's total error", "The model saw 12,000 houses with bedrooms in training", "Each bedroom adds about 12,000 to the price, others fixed"], answer: 3, explain: "Linear coefficients are directly interpretable: holding other features fixed, each extra bedroom moves the prediction by the coefficient." },
      { q: "Sales grow slowly, then sharply, as ad spend rises. Why might plain linear regression fit poorly?", options: ["It can't handle numbers larger than one million", "It needs at least ten input features to work", "It can only fit a straight-line relationship", "It only works when the target is a category"], answer: 2, explain: "Linear regression assumes linearity. Curves and interactions need engineered features (like squared terms) or a more flexible model." },
      { q: "How are linear regression's weights typically found?", options: ["Randomly trying weights until one looks good", "By minimizing squared error on the training data", "Copying the weights from a pretrained network", "Setting every weight equal to the feature's mean"], answer: 1, explain: "Least squares minimizes squared error. It can be solved in closed form with linear algebra, or iteratively with gradient descent." },
    ],
  },

  {
    id: "logistic-regression",
    label: "Logistic Regression",
    cluster: "ml",
    short: "Linear regression bent into a probability — the baseline classifier everywhere.",
    keywords: "logistic regression classification sigmoid probability binary decision boundary",
    learn: {
      why: "Logistic regression is the default first model for classification and a direct bridge to neural networks: it's a single neuron with a sigmoid activation trained with cross-entropy. Master it and the output layer of any classifier makes sense.",
      sections: [
        { h: "From line to probability", body: [
          "Linear regression outputs any number, but a probability must lie in [0, 1]. Logistic regression takes the linear combination and squashes it through the **sigmoid** function:",
          { formula: "p = 1 / (1 + e^{−(w·x + b)})" },
          "The output is the probability of the positive class; you threshold it (e.g. at 0.5) to decide.",
        ]},
        { h: "How it learns", body: [
          "It's trained by minimizing **cross-entropy loss** (a.k.a. log loss) — exactly the loss used to train classifiers and language models. This penalizes confident wrong predictions heavily, pulling probabilities toward the truth.",
        ]},
        { h: "Why it's everywhere", body: [
          "Fast, interpretable, and a strong baseline. The **decision boundary** it learns is linear, so for tangled data you either engineer features or move to a more flexible model. But 'try logistic regression first' is sound advice — beating a good baseline is how you know a complex model earns its keep.",
        ]},
      ],
      keyPoints: [
        "Logistic regression squashes a linear combination through a sigmoid to output a probability.",
        "It's trained with cross-entropy loss — the same loss as neural-net classifiers and LLMs.",
        "It's a single sigmoid neuron and a strong, interpretable classification baseline.",
      ],
      source: { title: "StatQuest — Logistic Regression", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8", note: "Sigmoid, log-loss, and interpretation explained visually." },
    },
    quiz: [
      { q: "Why can't plain linear regression output the probability that an email is spam?", options: ["It can't take word counts as input features", "It always outputs negative numbers for text", "It needs images rather than text as input", "Its output isn't limited to between 0 and 1"], answer: 3, explain: "A probability must lie between 0 and 1. Logistic regression squashes the linear combination through a sigmoid to produce one." },
      { q: "Your deep model beats a logistic-regression baseline by 0.2%, but it's 100× slower and opaque. What's the sound conclusion?", options: ["Always ship the deep model; it scored higher", "The complex model may not be earning its keep", "Logistic regression must have been overfitting", "Baselines don't matter once deep models exist"], answer: 1, explain: "A strong, fast, interpretable baseline tells you whether complexity pays off. A tiny gain may not justify the cost." },
      { q: "Which loss trains logistic regression?", options: ["Mean squared error (MSE)", "Hinge loss (as in SVMs)", "Cross-entropy (log loss)", "Mean absolute error (MAE)"], answer: 2, explain: "Logistic regression minimizes cross-entropy, the same loss behind neural-network classifiers and LLMs; it penalizes confident wrong predictions heavily." },
    ],
  },

  {
    id: "decision-trees",
    label: "Decision Trees",
    cluster: "ml",
    short: "A flowchart of yes/no questions — interpretable, and the building block of the best tabular models.",
    keywords: "decision tree splits gini entropy interpretable classification regression cart",
    learn: {
      why: "Decision trees are intuitive, interpretable, and the foundation of random forests and gradient boosting — which remain the top performers on tabular data. Understanding a single tree unlocks the most practically useful family of classic ML models.",
      sections: [
        { h: "How a tree decides", body: [
          "A decision tree splits the data with a sequence of simple questions ('is age > 30?'). Each **split** sends data left or right; you follow the branches to a **leaf**, which gives the prediction. It's literally a learned flowchart.",
        ]},
        { h: "How it's grown", body: [
          "At each node the algorithm picks the split that best separates the outcomes, measured by **impurity** (Gini or entropy for classification, variance for regression). It greedily repeats until leaves are pure or a stopping rule kicks in.",
        ]},
        { h: "Strengths and the overfitting trap", body: [
          { ul: [
            "**Strengths** — interpretable, handle non-linearities and feature interactions, need little preprocessing, mix numeric and categorical inputs.",
            "**Weakness** — a single deep tree **overfits** badly, memorizing noise. It also has high variance: small data changes can reshape the whole tree.",
          ]},
          "The fix that made trees dominant: combine many of them into **ensembles** (random forests, boosting).",
        ]},
      ],
      keyPoints: [
        "A decision tree is a learned flowchart of splits ending in prediction leaves.",
        "Splits are chosen to reduce impurity (Gini/entropy) or variance.",
        "Single trees overfit and are high-variance; ensembles of trees fix this and dominate tabular ML.",
      ],
      source: { title: "StatQuest — Decision Trees", url: "https://www.youtube.com/watch?v=_L39rN6gz7Y", note: "Step-by-step tree building and impurity." },
    },
    quiz: [
      { q: "A single deep decision tree fits the training data perfectly but does poorly on new data. What's happening?", options: ["It's underfitting because trees are too simple", "Trees can't make predictions on unseen data", "It's overfitting by memorizing noise in the data", "The tree needs its features scaled first"], answer: 2, explain: "Deep trees can carve out every training point, memorizing noise. They're also high-variance, which is why ensembles of trees work much better." },
      { q: "How does a decision tree choose each split?", options: ["A random feature and threshold at every node", "The split that most reduces impurity, like Gini", "The feature with the largest numeric values", "Whichever split keeps the tree most balanced"], answer: 1, explain: "At each node the algorithm greedily picks the split that best separates the outcomes, measured by Gini or entropy (or variance, for regression)." },
      { q: "Why are decision trees convenient with messy tabular data?", options: ["They never overfit, whatever their depth", "They need every feature scaled to the same range", "They only work with numeric, not categorical, data", "They mix numeric and categorical data with little prep"], answer: 3, explain: "Trees handle mixed data types, non-linearities and interactions with little preprocessing, though a single tree overfits easily." },
    ],
  },

  {
    id: "random-forests",
    label: "Random Forests & Bagging",
    cluster: "ml",
    short: "Averaging many decorrelated trees to cut variance — a robust, low-fuss default.",
    keywords: "random forest bagging ensemble bootstrap variance trees averaging",
    learn: {
      why: "Random forests are the go-to robust baseline for tabular problems: strong accuracy with almost no tuning. They also teach a deep lesson — that averaging many diverse weak models beats polishing one.",
      sections: [
        { h: "Bagging", body: [
          "**Bagging** (bootstrap aggregating) trains many models on random resamples of the data and averages their predictions. Averaging cancels out the individual models' random errors, dramatically reducing **variance** without adding bias.",
        ]},
        { h: "The 'random' in random forest", body: [
          "A random forest is bagging applied to decision trees, with an extra twist: at each split, only a **random subset of features** is considered. This decorrelates the trees so they don't all make the same mistakes — and decorrelation is what makes averaging powerful.",
        ]},
        { h: "Why practitioners love them", body: [
          { ul: [
            "Strong out-of-the-box accuracy with minimal tuning.",
            "Resistant to overfitting compared to a single tree.",
            "Provide **feature importance** estimates.",
            "Handle mixed data types and non-linearities naturally.",
          ]},
          "The trade-off vs. boosting: forests are easier and more parallel; boosting usually squeezes out higher accuracy.",
        ]},
      ],
      keyPoints: [
        "Bagging averages models trained on bootstrap resamples, reducing variance.",
        "Random forests decorrelate trees by sampling features at each split, making averaging effective.",
        "They're a robust, low-tuning default that also yields feature importances.",
      ],
      source: { title: "Leo Breiman — Random Forests (2001)", url: "https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf", note: "The original paper introducing the method." },
    },
    quiz: [
      { q: "Why does averaging many trees in a random forest reduce error?", options: ["Each tree is trained to be more biased", "Averaging makes each tree individually deeper", "Their independent errors partly cancel out", "More trees mean the data is memorized better"], answer: 2, explain: "Bagging averages models trained on different resamples. Their random errors partly cancel, cutting variance without adding bias." },
      { q: "What does sampling a random subset of features at each split accomplish?", options: ["It makes each tree train on fewer data rows", "It decorrelates the trees so errors differ", "It guarantees the forest finds the best tree", "It removes the need for bootstrap resampling"], answer: 1, explain: "Without it, trees would split on the same strong features and make the same mistakes. Decorrelation is what makes averaging powerful." },
      { q: "You need a strong tabular baseline fast, with little time for tuning. What's a good default?", options: ["A 50-layer neural network", "A single very deep tree", "k-means clustering", "A random forest"], answer: 3, explain: "Random forests give strong accuracy out of the box, resist overfitting better than a single tree, and handle mixed data naturally." },
    ],
  },

  {
    id: "gradient-boosting",
    label: "Gradient Boosting",
    cluster: "ml",
    short: "Building an ensemble sequentially, each model fixing the last one's mistakes — the tabular champion.",
    keywords: "gradient boosting xgboost lightgbm ensemble residuals boosting kaggle",
    learn: {
      why: "Gradient-boosted trees (XGBoost, LightGBM) win the majority of tabular ML competitions and power countless production systems. When your data is rows and columns rather than images or text, this is very often the best model — outperforming deep learning.",
      sections: [
        { h: "Boosting vs. bagging", body: [
          "Where bagging trains models **in parallel** and averages them, boosting trains them **sequentially**: each new tree focuses on the examples the current ensemble gets wrong. Errors are corrected step by step.",
        ]},
        { h: "The gradient part", body: [
          "Each new tree is fit to the **negative gradient** of the loss — essentially the residual errors of the ensemble so far. Adding it (scaled by a small learning rate) nudges predictions toward the truth. It's gradient descent, but each 'step' is a whole new tree in function space.",
        ]},
        { h: "Why it dominates tabular", body: [
          { ul: [
            "Captures complex non-linear interactions with high accuracy.",
            "Modern implementations (XGBoost, LightGBM, CatBoost) are fast and battle-tested.",
            "Handles missing values and mixed types well.",
          ]},
          "The cost: more hyperparameters to tune than a random forest, and it can overfit if pushed too hard. But for structured data, it's usually the model to beat.",
        ]},
      ],
      keyPoints: [
        "Boosting trains trees sequentially, each correcting the running ensemble's errors.",
        "Each tree fits the negative gradient (residuals) of the loss — gradient descent in function space.",
        "XGBoost/LightGBM-style boosting is typically the strongest model on tabular data.",
      ],
      source: { title: "Chen & Guestrin — XGBoost paper", url: "https://arxiv.org/abs/1603.02754", note: "The system that made gradient boosting ubiquitous." },
    },
    quiz: [
      { q: "How does boosting differ from bagging?", options: ["Trees are built in parallel on bootstrap resamples", "Trees are built in sequence, each fixing past errors", "Boosting uses a single tree instead of many trees", "Boosting only works on text, bagging on tables"], answer: 1, explain: "Bagging trains trees in parallel and averages them; boosting adds trees one by one, each focused on what the ensemble still gets wrong." },
      { q: "What does each new tree in gradient boosting fit?", options: ["The original target values from scratch", "A random subset of the model's features only", "The average prediction of all previous trees", "The loss's negative gradient (the residuals)"], answer: 3, explain: "Each tree fits the negative gradient (roughly the residual errors); adding it with a small learning rate nudges predictions toward the truth." },
      { q: "Your data is 200,000 rows of customer features in a table. Which model is usually the one to beat?", options: ["A convolutional neural network (CNN)", "A naive Bayes classifier on raw values", "Gradient-boosted trees like XGBoost", "k-nearest neighbors with k set to 1"], answer: 2, explain: "On structured, tabular data, gradient-boosted trees usually outperform other models, including deep learning." },
    ],
  },

  {
    id: "knn",
    label: "k-Nearest Neighbors",
    cluster: "ml",
    short: "Predict by looking at the most similar examples — the intuition behind vector search.",
    keywords: "knn nearest neighbors distance similarity instance-based lazy retrieval",
    learn: {
      why: "k-NN is the simplest possible learner and the conceptual seed of modern **vector search** and RAG: 'find the most similar known items and go with them.' Understanding it demystifies how semantic search and retrieval actually work.",
      sections: [
        { h: "The whole algorithm", body: [
          "To predict for a new point, find the **k** training examples closest to it (by a distance metric like Euclidean or cosine), and let them vote (classification) or average (regression). There's no real 'training' — it just stores the data. That's why it's called a **lazy** or instance-based learner.",
        ]},
        { h: "What makes or breaks it", body: [
          { ul: [
            "**Distance metric** — how you measure 'similar' is everything; features must be scaled or big-range features dominate.",
            "**k** — small k is noisy/overfit; large k over-smooths. It's the key knob.",
            "**Curse of dimensionality** — in very high dimensions, distances lose meaning, hurting naive k-NN.",
          ]},
        ]},
        { h: "From k-NN to vector search", body: [
          "RAG systems embed documents into vectors and, at query time, retrieve the nearest neighbors of the question's embedding — k-NN at massive scale. **Approximate nearest neighbor** algorithms (in vector databases) make this fast over millions of vectors. Same idea, industrial-strength.",
        ]},
      ],
      keyPoints: [
        "k-NN predicts using the k most similar stored examples — no training, just distance lookups.",
        "The distance metric, feature scaling, and choice of k determine its behavior.",
        "Vector search / RAG is k-NN over embeddings at scale, sped up by approximate-nearest-neighbor methods.",
      ],
      source: { title: "StatQuest — k-nearest neighbors", url: "https://www.youtube.com/watch?v=HVXime0nqeI", note: "The algorithm and its trade-offs in a few minutes." },
    },
    quiz: [
      { q: "Your k-NN model uses income (tens of thousands) and age (tens). Its predictions ignore age. Why?", options: ["k-NN can't use more than one feature at a time", "Unscaled income dominates the distance calculation", "Age is categorical, so k-NN skips it", "k was set too high for the number of features"], answer: 1, explain: "Distances are dominated by large-range features unless you scale them. How you measure 'similar' is everything in k-NN." },
      { q: "What happens as you increase k in k-NN?", options: ["The model trains longer on every data point", "Each prediction uses only the single closest point", "Predictions smooth out; too large over-smooths", "The distance metric switches from cosine to Euclidean"], answer: 2, explain: "Small k is noisy and overfits; large k averages over more neighbors and can over-smooth. k is the key knob." },
      { q: "How does RAG retrieval relate to k-NN?", options: ["It trains a k-NN classifier on every document", "It replaces nearest neighbors with keyword rules", "It uses k-NN to choose the model's temperature", "It finds a query's nearest document embeddings"], answer: 3, explain: "Retrieval embeds the query and fetches the nearest document vectors: k-NN at scale, sped up with approximate nearest-neighbor search." },
    ],
  },

  {
    id: "svm",
    label: "Support Vector Machines",
    cluster: "ml",
    short: "Finding the widest-margin boundary between classes — and the kernel trick for non-linearity.",
    keywords: "svm support vector machine margin kernel hyperplane classification",
    learn: {
      why: "SVMs were the dominant classifier before deep learning and remain excellent for small-to-medium, high-dimensional data (like text). They introduce two ideas worth owning: the maximum-margin boundary, and the kernel trick for handling non-linear data.",
      sections: [
        { h: "Maximum margin", body: [
          "Among all boundaries that separate two classes, an SVM picks the one with the widest **margin** — the largest gap to the nearest points of either class. Those nearest points are the **support vectors**; they alone define the boundary. Wide margins tend to generalize better.",
        ]},
        { h: "The kernel trick", body: [
          "Real data often isn't linearly separable. The **kernel trick** implicitly maps data into a higher-dimensional space where it *is* separable, without ever computing that space explicitly — using a kernel function (e.g. RBF) that computes similarities directly. This lets SVMs draw curved boundaries efficiently.",
        ]},
        { h: "Where they fit today", body: [
          "SVMs shine when features outnumber samples and the signal is subtle — classic for text and bioinformatics. They struggle to scale to huge datasets and have been superseded by deep learning for images/audio, but the margin and kernel concepts echo throughout ML.",
        ]},
      ],
      keyPoints: [
        "An SVM chooses the separating boundary with the maximum margin, defined by the support vectors.",
        "The kernel trick handles non-linear data by implicit mapping to higher dimensions.",
        "Strong for high-dimensional, small/medium data (e.g. text); doesn't scale to massive data as well.",
      ],
      source: { title: "StatQuest — Support Vector Machines", url: "https://www.youtube.com/watch?v=efR1C6CvhmE", note: "Margins and the kernel trick, visualized." },
    },
    quiz: [
      { q: "Of all the boundaries that separate two classes, which one does an SVM choose?", options: ["The one passing through the average of both classes", "The one with the widest margin to the nearest points", "The one that uses the fewest input features", "The first one found by gradient descent"], answer: 1, explain: "SVMs maximize the margin. The nearest points (the support vectors) alone define the boundary, and wide margins tend to generalize better." },
      { q: "Your two classes form concentric circles, so no straight line separates them. What lets an SVM handle this?", options: ["Removing the points closest to the boundary", "Using many more support vectors per class", "A kernel mapping to a higher-dimensional space", "Converting the features into categories"], answer: 2, explain: "The kernel trick computes similarities as if the data lived in a higher-dimensional space where it's separable, giving curved boundaries efficiently." },
      { q: "Where do SVMs still shine today?", options: ["Many features, modest samples, as with text", "Huge image datasets with millions of examples", "Generating realistic images from random noise", "Streaming audio that needs real-time decoding"], answer: 0, explain: "SVMs do well when features outnumber samples and the signal is subtle, like text. They scale poorly to massive datasets." },
    ],
  },

  {
    id: "naive-bayes",
    label: "Naive Bayes",
    cluster: "ml",
    short: "A fast probabilistic classifier that applies Bayes' theorem with a bold independence assumption.",
    keywords: "naive bayes probabilistic classifier spam text independence bayes",
    learn: {
      why: "Naive Bayes is astonishingly effective for text classification (spam, sentiment) given how simple it is. It's a direct, practical application of Bayes' theorem and a great lesson in how a 'wrong' assumption can still work brilliantly.",
      sections: [
        { h: "The idea", body: [
          "To classify an item, compute the probability of each class given the features using **Bayes' theorem**, and pick the most probable class. For spam: given these words, is 'spam' or 'not spam' more likely?",
        ]},
        { h: "The 'naive' assumption", body: [
          "It assumes all features are **conditionally independent** given the class — e.g. that the word 'free' and the word 'prize' occur independently within spam. This is almost never true, yet the classifier is robust to the violation and works remarkably well in practice.",
          "The payoff of the assumption: probabilities multiply simply, so training and prediction are extremely fast and need little data.",
        ]},
        { h: "Where it wins", body: [
          "Text is its home turf — high-dimensional word counts where its speed and low data requirements shine. It's a superb baseline: cheap to train, hard to beat by much on simple text tasks, and easy to reason about.",
        ]},
      ],
      keyPoints: [
        "Naive Bayes picks the most probable class via Bayes' theorem.",
        "It 'naively' assumes features are conditionally independent given the class — usually false but effective.",
        "That assumption makes it fast and data-efficient; it's a strong text-classification baseline.",
      ],
      source: { title: "StatQuest — Naive Bayes", url: "https://www.youtube.com/watch?v=O2L2Uv9pdDA", note: "Why the naive assumption works, with a spam example." },
    },
    quiz: [
      { q: "Naive Bayes assumes the words 'free' and 'prize' occur independently in spam. That's false, so why does it still work well?", options: ["The assumption is actually true for most text", "It secretly learns word pairs during training", "It only works when the assumption holds exactly", "The ranking of classes is often right despite it"], answer: 3, explain: "Its probabilities are off, but it's robust to the violation and usually still ranks the right class highest." },
      { q: "What does the independence assumption buy you?", options: ["Perfectly calibrated probabilities every time", "Fast training and prediction with little data", "The ability to model word order in sentences", "Automatic handling of images and audio"], answer: 1, explain: "With independent features, probabilities just multiply, so training and prediction are very fast and need little data." },
      { q: "You need a quick, cheap spam-filter baseline on word counts. What's a strong first choice?", options: ["A 1-billion-parameter transformer", "k-means clustering", "Naive Bayes", "Linear regression"], answer: 2, explain: "On high-dimensional word counts, naive Bayes is cheap and fast, and hard to beat by much on simple text tasks." },
    ],
  },

  {
    id: "kmeans",
    label: "k-Means Clustering",
    cluster: "ml",
    short: "Partitioning data into k groups by iterative refinement — the default clustering method.",
    keywords: "kmeans clustering centroids unsupervised segmentation groups iterative",
    learn: {
      why: "k-means is the most widely used clustering algorithm — for customer segmentation, image compression, and quick unsupervised exploration. It's a clean example of an iterative optimization you can reason about by hand.",
      sections: [
        { h: "The algorithm", body: [
          "Pick **k** (the number of clusters). Then repeat: (1) assign each point to its nearest **centroid**, (2) move each centroid to the mean of its assigned points. Iterate until assignments stop changing. It converges quickly to a local optimum.",
        ]},
        { h: "Choosing k and the catches", body: [
          { ul: [
            "**k is a choice** — the 'elbow method' or silhouette scores help, but there's no free answer.",
            "**Sensitive to initialization** — different starting centroids give different results (k-means++ helps).",
            "**Assumes round, similar-sized clusters** — it struggles with elongated or varied-density shapes.",
            "**Scale matters** — features must be standardized or large-range features dominate the distance.",
          ]},
        ]},
        { h: "How to think about it", body: [
          "k-means minimizes within-cluster variance — it's an optimization, just like supervised training, but with no labels to check against. Because evaluation is indirect, sanity-checking clusters against domain knowledge is essential.",
        ]},
      ],
      keyPoints: [
        "k-means alternates assigning points to nearest centroids and moving centroids to cluster means.",
        "You must choose k; results depend on initialization and assume roughly round, similar-sized clusters.",
        "Standardize features first; validate clusters with domain knowledge since there's no ground truth.",
      ],
      source: { title: "StatQuest — K-means clustering", url: "https://www.youtube.com/watch?v=4b5d3muPQmA", note: "The iterative procedure and how to choose k." },
    },
    quiz: [
      { q: "What does each k-means iteration do?", options: ["Pick new random centroids and restart from scratch", "Merge the two closest clusters into a single one", "Assign points to nearest centroids, then re-center them", "Label each point using its known correct class"], answer: 2, explain: "k-means alternates two steps, assigning each point to its nearest centroid and moving each centroid to the mean of its points, until nothing changes." },
      { q: "Running k-means twice on the same data gives different clusters. Why?", options: ["The data changes every time k-means reads it in", "It converges to local optima from random starts", "k-means picks a new value of k on each run", "It uses labels that shuffle between the runs"], answer: 1, explain: "k-means converges to a local optimum that depends on initialization. k-means++ picks better starting centroids." },
      { q: "Your data has long, stretched-out clusters of very different sizes. What's the concern with k-means?", options: ["It can only find exactly two clusters", "It requires labeled data for each cluster", "It runs too slowly on stretched shapes", "It assumes round, similar-sized clusters"], answer: 3, explain: "k-means minimizes within-cluster variance, which favors compact, roughly round clusters of similar size. Other shapes fit poorly." },
    ],
  },

  {
    id: "dimensionality-reduction",
    label: "Dimensionality Reduction",
    cluster: "ml",
    short: "Compressing many features into a few informative ones — for visualization, speed, and denoising.",
    keywords: "dimensionality reduction pca tsne umap embedding visualization compression",
    learn: {
      why: "High-dimensional data is hard to visualize, slow to model, and prone to the curse of dimensionality. Dimensionality reduction compresses it while keeping the important structure — essential for exploration and for understanding what embeddings capture.",
      sections: [
        { h: "The goal", body: [
          "Represent data with far fewer dimensions while preserving as much meaningful structure as possible. This speeds up models, reduces noise and overfitting, and lets you plot high-dimensional data in 2D or 3D to see it.",
        ]},
        { h: "The main methods", body: [
          { ul: [
            "**PCA** — linear; finds the orthogonal directions of greatest variance (via SVD/eigen-decomposition) and keeps the top few. Fast, interpretable, great for compression.",
            "**t-SNE / UMAP** — non-linear; preserve local neighborhoods to make gorgeous 2D visualizations of clusters. Excellent for *seeing* structure, but distances/sizes in the plot can mislead.",
          ]},
        ]},
        { h: "Connection to embeddings", body: [
          "Reducing dimensions to a compact, meaningful representation *is* what an **embedding** does. PCA on word co-occurrences was an early word embedding; today neural networks learn these representations. Plotting embeddings with t-SNE/UMAP is how people visualize what a model has learned.",
        ]},
      ],
      keyPoints: [
        "Dimensionality reduction compresses features while keeping structure — for speed, denoising, and visualization.",
        "PCA is linear (variance-maximizing directions via SVD); t-SNE/UMAP are non-linear and great for 2D plots.",
        "It's conceptually the same as learning an embedding: a compact meaningful representation.",
      ],
      source: { title: "StatQuest — PCA and t-SNE", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", note: "Clear walkthroughs of both PCA and t-SNE." },
    },
    quiz: [
      { q: "You need to compress 300 correlated features into 20 for a faster, interpretable model. Which method fits?", options: ["t-SNE", "PCA", "UMAP", "k-NN"], answer: 1, explain: "PCA is linear, fast and interpretable, keeping the directions of greatest variance. t-SNE and UMAP are mainly for 2D visualization." },
      { q: "In a UMAP plot of embeddings, one cluster looks twice as big as another. What can you conclude?", options: ["That cluster has exactly twice as many points", "That cluster's items are twice as different", "Not much; these plots distort sizes", "The bigger cluster is twice as important"], answer: 2, explain: "t-SNE and UMAP preserve local neighborhoods to reveal clusters, but cluster sizes and the distances between clusters aren't reliable." },
      { q: "How does dimensionality reduction relate to embeddings?", options: ["Both give compact representations that keep meaning", "Embeddings always have more dimensions than the input", "They're unrelated; embeddings are only for text", "Reduction deletes the meaning embeddings capture"], answer: 0, explain: "An embedding is a compact, meaningful representation, which is what dimensionality reduction aims for. PCA on word co-occurrences was an early word embedding." },
    ],
  },

  {
    id: "bias-variance",
    label: "Bias–Variance Tradeoff",
    cluster: "ml",
    short: "The central tension of ML: too-simple models underfit, too-complex ones overfit.",
    keywords: "bias variance tradeoff overfitting underfitting generalization complexity capacity",
    learn: {
      why: "The bias–variance tradeoff is the single most important concept for understanding *why* models fail to generalize. Every regularization technique, ensemble method, and model-size decision is really a move in this tradeoff.",
      sections: [
        { h: "Two ways to be wrong", body: [
          { ul: [
            "**Bias** — error from wrong assumptions: the model is too simple to capture the pattern. High bias = **underfitting** (bad on both training and test data).",
            "**Variance** — error from over-sensitivity to the training data: the model memorizes noise. High variance = **overfitting** (great on training, poor on test).",
          ]},
        ]},
        { h: "The tradeoff", body: [
          "As you increase model complexity, bias falls but variance rises. Total error is minimized somewhere in the middle — flexible enough to capture the signal, constrained enough to ignore the noise. Diagnosing which side you're on (via the train–validation gap) tells you what to do next.",
        ]},
        { h: "What to do about it", body: [
          { ul: [
            "**High bias?** Use a more expressive model, add features, train longer.",
            "**High variance?** Get more data, regularize, simplify, or use ensembles.",
          ]},
          "Note: very large modern deep networks complicate the classic picture (see 'double descent'), but the tradeoff remains the essential mental model.",
        ]},
      ],
      keyPoints: [
        "Bias = underfitting (too simple); variance = overfitting (too sensitive to training data).",
        "Increasing complexity trades bias for variance; the sweet spot minimizes total error.",
        "Diagnose via the train–validation gap, then either add capacity (bias) or regularize/get data (variance).",
      ],
      source: { title: "Google — Generalization, overfitting, and the tradeoff", url: "https://developers.google.com/machine-learning/crash-course/overfitting/overfitting", note: "The tradeoff framed with concrete diagnostics." },
    },
    quiz: [
      { q: "Your model scores poorly on both training and validation data. Which diagnosis and fix fit?", options: ["High variance: add regularization or more data", "High bias: use a more expressive model or features", "It's perfect; low scores mean the task is hard", "High variance: remove the validation set"], answer: 1, explain: "Poor on both means underfitting (high bias). Add capacity or features; regularization would make it worse." },
      { q: "Training accuracy is 98%, validation accuracy 71%. What should you try?", options: ["A much bigger model with many more parameters", "Training for many more epochs", "Removing regularization entirely", "More data, regularization, or a simpler model"], answer: 3, explain: "A large train–validation gap signals high variance (overfitting). Reduce it with more data, regularization, a simpler model, or ensembles." },
      { q: "As model complexity increases, what typically happens?", options: ["Bias and variance both fall", "Bias rises and variance falls", "Bias falls and variance rises", "Neither bias nor variance changes"], answer: 2, explain: "More flexible models fit the signal better (lower bias) but also chase noise (higher variance). Total error is lowest somewhere in between." },
    ],
  },

  {
    id: "regularization",
    label: "Regularization",
    cluster: "ml",
    short: "Deliberately constraining a model so it generalizes instead of memorizing.",
    keywords: "regularization l1 l2 ridge lasso dropout overfitting penalty weight decay",
    learn: {
      why: "Regularization is the primary toolkit for fighting overfitting — the number-one obstacle to models that work in the real world. From ridge regression to dropout in deep nets, it's the same idea applied everywhere.",
      sections: [
        { h: "The core idea", body: [
          "Regularization adds a preference for **simpler** models, discouraging the model from fitting noise. Usually this means penalizing large parameter values, so the model uses only as much complexity as the data justifies.",
        ]},
        { h: "L1 and L2", body: [
          { ul: [
            "**L2 (ridge / weight decay)** — penalizes the sum of squared weights, shrinking them toward zero smoothly. The default in deep learning.",
            "**L1 (lasso)** — penalizes the sum of absolute weights, driving some exactly to zero. This performs automatic **feature selection**.",
          ]},
          "A tuning parameter (λ) controls the strength: too much regularization causes underfitting, too little lets overfitting return.",
        ]},
        { h: "Beyond the penalty", body: [
          "Regularization is broader than weight penalties: **dropout** (randomly zeroing neurons), **early stopping** (halt before overfitting), **data augmentation** (more varied training data), and **ensembling** all reduce variance. Anything that constrains the model or diversifies the data is, in spirit, regularization.",
        ]},
      ],
      keyPoints: [
        "Regularization biases the model toward simplicity to prevent memorizing noise.",
        "L2 shrinks weights smoothly; L1 zeroes some out, doing feature selection; λ tunes the strength.",
        "Dropout, early stopping, augmentation, and ensembling are also forms of regularization.",
      ],
      source: { title: "Google — Regularization for simplicity", url: "https://developers.google.com/machine-learning/crash-course/regularization-for-simplicity/l2-regularization", note: "L2, L1, and the intuition for penalties." },
    },
    quiz: [
      { q: "You want a model that automatically drops irrelevant features by setting their weights to exactly zero. Which penalty?", options: ["L2 (ridge)", "Dropout", "Early stopping", "L1 (lasso)"], answer: 3, explain: "L1 penalizes absolute weights and drives some to exactly zero, performing feature selection. L2 shrinks weights smoothly toward zero." },
      { q: "You raised the regularization strength λ a lot, and now the model does poorly on both training and validation data. What happened?", options: ["Regularization always makes models overfit", "Too much regularization caused underfitting", "λ only affects the validation score", "The model now has too many parameters"], answer: 1, explain: "λ sets the strength. Too much pushes the model toward simplicity until it can't capture the signal; too little lets overfitting return." },
      { q: "Which of these is also a form of regularization, in spirit?", options: ["Training longer after validation loss starts rising", "Removing the validation set to use more data", "Stopping training when validation loss starts rising", "Raising the learning rate to converge faster"], answer: 2, explain: "Early stopping, dropout, data augmentation and ensembling all reduce variance: anything that constrains the model or diversifies the data." },
    ],
  },

  {
    id: "cross-validation",
    label: "Cross-Validation",
    cluster: "ml",
    short: "Squeezing a reliable performance estimate out of limited data by rotating the validation set.",
    keywords: "cross validation k-fold model selection evaluation robust estimate",
    learn: {
      why: "A single train/validation split can be lucky or unlucky, especially with limited data. Cross-validation gives a more reliable estimate of how a model generalizes and is the standard way to tune hyperparameters and compare models honestly.",
      sections: [
        { h: "k-fold cross-validation", body: [
          "Split the data into **k** equal folds. Train on k−1 of them and validate on the held-out one; repeat k times so every fold serves as validation once. Average the k scores for a robust performance estimate with an uncertainty range.",
        ]},
        { h: "Why it beats a single split", body: [
          "Every data point contributes to both training and validation (across folds), so the estimate uses the data efficiently and is less sensitive to a single unlucky split. The spread across folds also tells you how stable the model is.",
        ]},
        { h: "Doing it correctly", body: [
          { ul: [
            "**Preprocessing inside the loop** — fit scalers/encoders on each fold's training portion only, or you leak.",
            "**Stratify** for imbalanced classification so each fold keeps the class ratio.",
            "**Respect structure** — use time-series or grouped CV when data has temporal or group dependencies.",
            "Keep a **final test set** untouched; CV is for tuning/selection, not the final unbiased estimate.",
          ]},
        ]},
      ],
      keyPoints: [
        "k-fold CV rotates the validation fold k times and averages, giving a robust estimate with a variance.",
        "It uses limited data efficiently and reveals model stability across folds.",
        "Fit preprocessing within each fold, stratify or group as needed, and still hold out a final test set.",
      ],
      source: { title: "scikit-learn — Cross-validation guide", url: "https://scikit-learn.org/stable/modules/cross_validation.html", note: "Practical CV variants and pitfalls." },
    },
    quiz: [
      { q: "You have only 500 labeled rows. Why prefer 5-fold cross-validation over a single 80/20 split?", options: ["It trains the final model about five times faster", "Each row is validated once; the estimate is steadier", "It removes the need to keep a separate test set", "It effectively grows the dataset to 2,500 rows"], answer: 1, explain: "Rotating the validation fold uses limited data efficiently and averages out a lucky or unlucky split. The spread across folds also shows stability." },
      { q: "You standardize the whole dataset, then run cross-validation. What's wrong?", options: ["Standardization makes cross-validation run slower", "Cross-validation can't be used with scaled data", "Nothing — preprocessing first is the right order", "Statistics from validation folds leak into training"], answer: 3, explain: "Fit scalers and encoders on each fold's training portion only. Fitting on everything first leaks validation information and inflates scores." },
      { q: "You're forecasting daily sales. How should you set up cross-validation?", options: ["Shuffle all days randomly into five folds", "Use a single fold containing all the data", "Train on the past, validate on later periods", "Validate on the earliest days, train on later"], answer: 2, explain: "With temporal structure, use time-series CV so validation always comes after training. Random folds let the future leak into the past." },
    ],
  },

  {
    id: "recommender-systems",
    label: "Recommender Systems",
    cluster: "ml",
    short: "Predicting what a user will like — one of ML's biggest real-world footprints.",
    keywords: "recommender collaborative filtering matrix factorization embeddings personalization",
    learn: {
      why: "Recommenders drive a huge share of what people watch, buy, and read online. They're a beautiful application of matrix factorization and embeddings, and they show how the same 'similarity in vector space' idea behind retrieval powers personalization at scale.",
      sections: [
        { h: "Two classic approaches", body: [
          { ul: [
            "**Content-based** — recommend items similar to what a user already liked, using item features.",
            "**Collaborative filtering** — recommend based on patterns across many users: 'people similar to you liked X.' It needs no item features, just the interaction history.",
          ]},
        ]},
        { h: "Matrix factorization", body: [
          "Represent the giant, sparse user–item interaction matrix as the product of two smaller matrices: **user embeddings** and **item embeddings**. A user's predicted affinity for an item is the **dot product** of their vectors. Learned latent factors capture taste dimensions (genre, tone) automatically — the same embedding-and-dot-product idea as retrieval.",
        ]},
        { h: "Real-world realities", body: [
          "Production recommenders juggle the **cold-start problem** (new users/items with no history), popularity bias, feedback loops (recommendations shape future data), and business goals beyond accuracy. Modern systems increasingly use deep learning, but the embedding foundation remains.",
        ]},
      ],
      keyPoints: [
        "Content-based uses item features; collaborative filtering uses cross-user interaction patterns.",
        "Matrix factorization learns user and item embeddings; affinity is their dot product.",
        "Cold-start, popularity bias, and feedback loops are the hard real-world challenges.",
      ],
      source: { title: "Google — Recommendation systems course", url: "https://developers.google.com/machine-learning/recommendation", note: "Content-based, collaborative filtering, and matrix factorization." },
    },
    quiz: [
      { q: "A brand-new user has no history. Which problem is this, and what helps?", options: ["Overfitting; add more regularization to the model", "Feedback loops; stop recommending anything at all", "Cold start; use content or popularity signals", "Data leakage; remove the user from the dataset"], answer: 2, explain: "Collaborative filtering needs interaction history. For new users or items, content features or popularity help until data builds up." },
      { q: "In matrix factorization, how is a user's affinity for an item predicted?", options: ["The number of times the item appears in the data", "The dot product of the user and item embeddings", "The item's price divided by the user's average spend", "A decision tree trained on the user's name"], answer: 1, explain: "Users and items get learned embeddings, and their dot product scores affinity: the same idea behind vector retrieval." },
      { q: "A news app recommends whatever is clicked most, so popular stories get even more clicks and niche ones vanish. What's this?", options: ["The cold-start problem for brand-new stories", "Underfitting in the recommendation model itself", "A privacy leak in the app's click logs", "A feedback loop that amplifies popularity bias"], answer: 3, explain: "Recommendations shape future data. Without care, a feedback loop keeps boosting what's already popular." },
    ],
  },
]);
