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
      { q: "How does machine learning differ from traditional programming?", options: ["It runs without electricity", "Rules are learned from examples rather than hand-coded", "It never uses data", "It only works on images"], answer: 1, explain: "ML infers the mapping from data, whereas traditional programming encodes rules explicitly by hand." },
      { q: "The ultimate goal of a trained model is to…", options: ["Memorize the training set perfectly", "Generalize well to new, unseen data", "Use the most parameters possible", "Avoid all math"], answer: 1, explain: "Performance on unseen data is what matters; memorizing training data is not learning." },
      { q: "Which is NOT one of the three main families of ML?", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Compiled learning"], answer: 3, explain: "The three families are supervised, unsupervised, and reinforcement learning." },
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
      { q: "Supervised learning requires…", options: ["No data at all", "Inputs paired with known correct outputs (labels)", "Only images", "A reward signal instead of labels"], answer: 1, explain: "Supervised learning learns from labeled input–output pairs." },
      { q: "Predicting tomorrow's temperature (a number) is a…", options: ["Classification task", "Regression task", "Clustering task", "Reinforcement task"], answer: 1, explain: "Predicting a continuous value is regression; predicting a category is classification." },
      { q: "Why is LLM next-token prediction called self-supervised?", options: ["Humans label every token", "The label (the next token) comes free from the data itself", "It uses no data", "It needs a reward model"], answer: 1, explain: "The next token in the text is the target, so labels are generated automatically from raw text." },
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
      { q: "The defining feature of unsupervised learning is that…", options: ["It uses labeled data", "It works with unlabeled data to find structure", "It requires a reward function", "It only does regression"], answer: 1, explain: "Unsupervised learning discovers patterns in data without labels." },
      { q: "Grouping customers into segments without predefined categories is…", options: ["Regression", "Clustering", "Classification", "Labeling"], answer: 1, explain: "Clustering groups similar items when no predefined labels exist." },
      { q: "Why is evaluating unsupervised learning harder than supervised?", options: ["It uses more GPUs", "There is no ground-truth answer to compare against", "It has no data", "The math is illegal"], answer: 1, explain: "Without labels, there's no direct correct answer, so evaluation relies on indirect measures and judgment." },
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
      { q: "In reinforcement learning, the agent learns from…", options: ["Labeled correct answers", "Rewards received after taking actions", "Nothing — it is random", "Only images"], answer: 1, explain: "RL uses a reward signal, not labeled outputs, to learn which actions are good." },
      { q: "The exploration–exploitation trade-off is about…", options: ["Choosing a GPU", "Trying new actions vs. relying on known-good ones", "Cleaning data", "Splitting the dataset"], answer: 1, explain: "The agent must balance discovering better strategies (explore) against using what already works (exploit)." },
      { q: "RLHF uses reinforcement learning to…", options: ["Pretrain the model from scratch", "Fine-tune an LLM toward human-preferred responses using a reward model", "Label the training data", "Compress the model"], answer: 1, explain: "RLHF optimizes the model against a reward model built from human preference data." },
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
      { q: "A coefficient (weight) in linear regression tells you…", options: ["The number of data points", "How much the prediction changes per unit change in that feature", "The learning rate", "The GPU count"], answer: 1, explain: "Each weight is the marginal effect of its feature on the prediction, holding others fixed." },
      { q: "Linear regression is typically fit by minimizing…", options: ["The number of features", "The squared error between predictions and actual values", "The accuracy", "The cross-entropy over classes"], answer: 1, explain: "Least-squares regression minimizes the sum of squared residuals." },
      { q: "How does linear regression relate to neural networks?", options: ["They are unrelated", "A single neuron without an activation function is exactly linear regression", "It is more complex than any network", "It uses no weights"], answer: 1, explain: "A neuron computes a weighted sum plus bias; without a non-linear activation that's linear regression." },
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
      { q: "What does the sigmoid function do in logistic regression?", options: ["Adds more features", "Squashes the linear output into a probability between 0 and 1", "Removes the bias term", "Sorts the data"], answer: 1, explain: "The sigmoid maps any real number to (0,1), turning a linear score into a probability." },
      { q: "Logistic regression is trained by minimizing…", options: ["Squared error", "Cross-entropy (log) loss", "Accuracy", "The number of epochs"], answer: 1, explain: "Cross-entropy loss is the standard objective for logistic regression and classification generally." },
      { q: "The decision boundary learned by plain logistic regression is…", options: ["Always circular", "Linear", "Random", "Nonexistent"], answer: 1, explain: "Logistic regression separates classes with a linear boundary unless you engineer non-linear features." },
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
      { q: "A decision tree makes predictions by…", options: ["Multiplying matrices", "Following a series of yes/no splits down to a leaf", "Computing a sigmoid", "Averaging all features equally"], answer: 1, explain: "Trees route an example through learned splits to a leaf that holds the prediction." },
      { q: "Splits in a classification tree are chosen to…", options: ["Maximize impurity", "Reduce impurity (e.g. Gini or entropy)", "Increase the tree depth arbitrarily", "Match the GPU count"], answer: 1, explain: "Good splits make the resulting groups purer (more homogeneous in the target)." },
      { q: "A single deep decision tree tends to…", options: ["Underfit severely", "Overfit and have high variance", "Ignore the data", "Always generalize perfectly"], answer: 1, explain: "Unrestricted trees memorize noise and are unstable — motivating ensembles." },
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
      { q: "Bagging reduces error primarily by lowering…", options: ["Bias", "Variance", "The number of features", "The learning rate"], answer: 1, explain: "Averaging many models cancels their independent errors, cutting variance." },
      { q: "What extra randomness does a random forest add beyond bagging?", options: ["Random labels", "Considering only a random subset of features at each split", "Random GPUs", "Random loss functions"], answer: 1, explain: "Feature subsampling at each split decorrelates the trees, making the ensemble average more effective." },
      { q: "Why does decorrelating the trees matter?", options: ["It makes them slower", "Averaging helps most when models don't all make the same mistakes", "It increases bias on purpose", "It removes the need for data"], answer: 1, explain: "If trees were identical, averaging wouldn't help; diversity is what reduces variance." },
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
      { q: "How does boosting differ from bagging?", options: ["It trains models in parallel and averages them", "It trains models sequentially, each correcting the previous ones' errors", "It uses no trees", "It requires labeled images"], answer: 1, explain: "Boosting is sequential and error-focused; bagging is parallel and averaging." },
      { q: "In gradient boosting, each new tree is fit to approximately…", options: ["Random noise", "The residual errors / negative gradient of the current ensemble", "The raw labels only", "The feature names"], answer: 1, explain: "New trees target what the ensemble still gets wrong — the negative gradient of the loss." },
      { q: "For which kind of data is gradient boosting usually the strongest choice?", options: ["Raw images", "Structured tabular data", "Raw audio waveforms", "Long free text"], answer: 1, explain: "Gradient-boosted trees typically outperform other methods, including deep nets, on tabular data." },
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
      { q: "k-NN makes a prediction by…", options: ["Fitting a global equation during training", "Finding the k most similar stored examples and letting them vote/average", "Building a decision tree", "Running gradient descent"], answer: 1, explain: "k-NN is instance-based: it looks up the nearest stored examples at prediction time." },
      { q: "Why is k-NN called a 'lazy' learner?", options: ["It is slow to predict only", "It does no real training — it just stores the data and computes at query time", "It refuses to run", "It ignores distances"], answer: 1, explain: "There is no model-fitting step; work is deferred to prediction time." },
      { q: "Modern vector search / RAG is essentially…", options: ["Linear regression", "k-NN over embeddings, accelerated by approximate-nearest-neighbor methods", "A decision tree", "Reinforcement learning"], answer: 1, explain: "Retrieval finds nearest embedding neighbors of a query — k-NN at scale." },
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
      { q: "An SVM selects the decision boundary that…", options: ["Passes through the most points", "Maximizes the margin to the nearest points of each class", "Is always vertical", "Uses every data point equally"], answer: 1, explain: "SVMs maximize the margin; only the closest points (support vectors) define the boundary." },
      { q: "The kernel trick allows an SVM to…", options: ["Skip training", "Handle non-linear separation by implicitly mapping to a higher-dimensional space", "Avoid using any features", "Reduce accuracy"], answer: 1, explain: "Kernels compute similarities as if in a higher-dimensional space, enabling non-linear boundaries efficiently." },
      { q: "SVMs are especially well-suited to…", options: ["Massive image datasets", "High-dimensional data with relatively few samples, like text", "Real-time video", "Unlabeled data"], answer: 1, explain: "SVMs excel when features are many and samples are limited, common in text and bioinformatics." },
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
      { q: "Naive Bayes classifies by choosing the class that…", options: ["Has the most training examples", "Is most probable given the features, via Bayes' theorem", "Minimizes squared error", "Has the widest margin"], answer: 1, explain: "It computes posterior class probabilities with Bayes' theorem and picks the highest." },
      { q: "The 'naive' assumption is that features are…", options: ["Perfectly correlated", "Conditionally independent given the class", "All numeric", "Always missing"], answer: 1, explain: "It assumes features are independent given the class, simplifying the probability computation." },
      { q: "Despite the assumption often being false, Naive Bayes…", options: ["Never works", "Works remarkably well, especially for text, and is very fast", "Requires deep learning", "Cannot classify spam"], answer: 1, explain: "It's robust to the violated assumption and is a fast, strong baseline for text." },
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
      { q: "Each iteration of k-means does which two steps?", options: ["Split and merge clusters", "Assign points to the nearest centroid, then move centroids to the cluster means", "Train a tree and prune it", "Compute gradients and backprop"], answer: 1, explain: "k-means alternates assignment (nearest centroid) and update (recompute centroids as means)." },
      { q: "A key limitation of k-means is that…", options: ["It needs labeled data", "You must choose k, and it assumes roughly round, similar-sized clusters", "It cannot use numeric features", "It always finds the global optimum"], answer: 1, explain: "k is a required input, and the method struggles with non-spherical or unequal clusters and only reaches a local optimum." },
      { q: "Before running k-means you should usually…", options: ["Delete half the data", "Standardize the features so distances are comparable", "Add labels", "Increase the learning rate"], answer: 1, explain: "Unscaled features let large-range dimensions dominate the distance, distorting clusters." },
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
      { q: "PCA reduces dimensions by keeping the directions that…", options: ["Have the least variance", "Capture the most variance in the data", "Are chosen at random", "Match the labels"], answer: 1, explain: "PCA keeps the top principal components — the orthogonal directions of greatest variance." },
      { q: "t-SNE and UMAP are mainly used for…", options: ["Training final classifiers", "Non-linear 2D/3D visualization of high-dimensional structure", "Encrypting data", "Speeding up gradient descent"], answer: 1, explain: "They preserve local neighborhoods to reveal clusters visually, though plot distances can be misleading." },
      { q: "Dimensionality reduction is conceptually similar to…", options: ["Learning an embedding — a compact meaningful representation", "Adding more features", "Deleting the labels", "Increasing the batch size"], answer: 0, explain: "Both produce a low-dimensional representation that preserves meaningful structure." },
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
      { q: "A model with high bias is likely…", options: ["Overfitting the training data", "Underfitting — too simple to capture the pattern", "Perfectly generalizing", "Out of memory"], answer: 1, explain: "High bias means the model is too simple, performing poorly on both training and test data." },
      { q: "High variance shows up as…", options: ["Poor training and poor test performance", "Great training performance but poor test performance", "Identical train and test error", "No error at all"], answer: 1, explain: "Overfitting (high variance) fits training data well but fails to generalize to test data." },
      { q: "If a model is overfitting (high variance), a good remedy is to…", options: ["Add more parameters", "Get more data, regularize, or simplify the model", "Train even longer on the same data", "Remove the validation set"], answer: 1, explain: "Reducing variance calls for more data, regularization, simpler models, or ensembling." },
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
      { q: "The purpose of regularization is to…", options: ["Speed up the GPU", "Reduce overfitting by discouraging unnecessary complexity", "Increase the number of features", "Delete the validation set"], answer: 1, explain: "Regularization penalizes complexity so the model generalizes rather than memorizing noise." },
      { q: "Which regularizer tends to drive some weights exactly to zero (feature selection)?", options: ["L2 (ridge)", "L1 (lasso)", "Dropout", "Batch normalization"], answer: 1, explain: "L1's absolute-value penalty produces sparse solutions, zeroing out some weights entirely." },
      { q: "Dropout regularizes a neural network by…", options: ["Adding more layers", "Randomly zeroing out neurons during training", "Increasing the learning rate", "Removing the loss function"], answer: 1, explain: "Randomly dropping neurons forces redundancy and prevents co-adaptation, reducing overfitting." },
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
      { q: "In k-fold cross-validation, each fold is used…", options: ["Only for training, never validation", "As the validation set exactly once, training on the rest", "As the test set every time", "Not at all"], answer: 1, explain: "Each of the k folds serves as validation once while the other k−1 folds train the model." },
      { q: "The main advantage of cross-validation over a single split is…", options: ["It needs less code", "A more reliable estimate that's less sensitive to one lucky/unlucky split", "It guarantees zero error", "It removes the need for data"], answer: 1, explain: "Averaging over folds uses data efficiently and reduces dependence on a single arbitrary split." },
      { q: "To avoid leakage during cross-validation, preprocessing should be fit…", options: ["On the whole dataset before splitting", "Inside each fold, on that fold's training portion only", "On the test set", "Never"], answer: 1, explain: "Fitting scalers/encoders on all data leaks validation information; do it within each fold's training data." },
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
      { q: "Collaborative filtering recommends items based on…", options: ["Only the item's text description", "Patterns across many users' interactions ('people like you liked…')", "The GPU model", "Random selection"], answer: 1, explain: "Collaborative filtering leverages the collective behavior of similar users, needing no item features." },
      { q: "In matrix factorization, a user's affinity for an item is computed as…", options: ["The sum of all ratings", "The dot product of the user and item embedding vectors", "A decision tree split", "The learning rate"], answer: 1, explain: "User and item are embedded as vectors; their dot product estimates affinity — echoing retrieval." },
      { q: "The 'cold-start problem' refers to difficulty recommending when…", options: ["The servers are cold", "A user or item is new and has little/no interaction history", "The dataset is too large", "The model is overfit"], answer: 1, explain: "New users or items lack the history that collaborative methods rely on." },
    ],
  },
]);
