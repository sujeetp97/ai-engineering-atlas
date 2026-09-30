/* ===========================================================================
   DEEP LEARNING — neural networks and how they learn.
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "deep-learning",
    label: "Deep Learning",
    cluster: "dl",
    short: "Stacking many layers of neurons to learn representations directly from raw data.",
    keywords: "deep learning neural network layers representation features hierarchy",
    learn: {
      why: "Deep learning is the engine behind the modern AI revolution — image recognition, speech, and every large language model. Its key move: instead of hand-crafting features, let a deep stack of layers learn them, from simple to abstract.",
      sections: [
        { h: "What 'deep' means", body: [
          "A deep neural network is just many layers of the linear-algebra-plus-non-linearity you already know, stacked. 'Deep' refers to the number of layers. Each layer transforms the previous layer's output, building progressively more abstract representations.",
          "In vision, early layers detect edges, middle layers detect textures and parts, later layers detect whole objects — a **hierarchy of features** learned automatically.",
        ]},
        { h: "Why it beat classic ML", body: [
          "Classic ML needs humans to engineer features. Deep learning does **representation learning**: it discovers the useful features itself from raw pixels, audio, or text. Given enough data and compute, this scales far better on perceptual and language tasks than hand-engineering ever could.",
        ]},
        { h: "What made it work", body: [
          { ul: [
            "**Data** — huge labeled datasets (and later, self-supervised web-scale data).",
            "**Compute** — GPUs turning training from months to days.",
            "**Algorithms** — better activations (ReLU), normalization, and architectures (CNNs, transformers).",
          ]},
          "The 2012 ImageNet moment (AlexNet) kicked off the era; transformers (2017) extended it to language and beyond.",
        ]},
      ],
      keyPoints: [
        "Deep learning stacks many layers, each building more abstract features from the last.",
        "Its superpower is representation learning — discovering features from raw data instead of hand-crafting them.",
        "Data + GPU compute + better algorithms (ReLU, normalization, transformers) made it dominate.",
      ],
      source: { title: "3Blue1Brown — Neural Networks series", url: "https://www.3blue1brown.com/topics/neural-networks", note: "The best visual introduction to how neural nets work." },
    },
    quiz: [
      { q: "In an image network, what do early and later layers typically learn?", options: ["Early: whole objects; later: individual pixels", "Early: edges and textures; later: parts and objects", "All layers learn the same features at every depth", "Early: colors only; later: the image's file format"], answer: 1, explain: "Each layer builds on the last, forming a hierarchy from edges, to textures and parts, to whole objects, all learned automatically." },
      { q: "Why did deep learning overtake classic ML on images and speech?", options: ["It needs far less training data than classic ML", "It runs faster than classic ML on a CPU", "It makes every prediction easy to explain", "It learns useful features from raw data itself"], answer: 3, explain: "Representation learning discovers features directly from pixels, audio or text instead of relying on hand-engineered ones, and it scales with data and compute." },
      { q: "Which combination made deep learning practical around 2012?", options: ["Smaller models, less data, and faster CPUs", "Hand-built features, rules, and expert systems", "Big datasets, GPU compute, and better algorithms", "Quantum chips, symbolic logic, and search trees"], answer: 2, explain: "Large labeled datasets, GPUs cutting training from months to days, and algorithmic advances like ReLU and normalization came together, marked by AlexNet in 2012." },
    ],
  },

  {
    id: "neural-networks",
    label: "Neural Networks",
    cluster: "dl",
    short: "Layers of simple weighted-sum units that together approximate almost any function.",
    keywords: "neural network neuron perceptron mlp weights layers universal approximation",
    learn: {
      why: "The neural network is the fundamental architecture all of deep learning builds on. Understanding a single neuron and how they compose into layers demystifies everything from image classifiers to GPT.",
      sections: [
        { h: "The neuron", body: [
          "A single artificial neuron does exactly what linear/logistic regression does: it computes a weighted sum of its inputs, adds a bias, and passes the result through a non-linear **activation function**.",
          { formula: "output = activation( w₁x₁ + w₂x₂ + ... + b )" },
        ]},
        { h: "Layers and the network", body: [
          "Stack neurons side by side into a **layer**; stack layers front to back into a network. The **input layer** takes the data, **hidden layers** transform it, and the **output layer** produces the prediction. A plain stack like this is a **multilayer perceptron (MLP)** — still a component inside modern transformers.",
        ]},
        { h: "Universal approximation", body: [
          "A remarkable theorem: a network with enough hidden units can approximate essentially any continuous function. That's why neural networks are so flexible. The catch is that the theorem says such a network *exists*, not that training will easily *find* it — which is why architecture, data, and optimization all matter so much.",
        ]},
      ],
      keyPoints: [
        "A neuron = weighted sum + bias + non-linear activation (a generalized regression unit).",
        "Neurons form layers; layers stack into input → hidden → output; a plain stack is an MLP.",
        "Universal approximation says big networks can represent almost any function — but finding it still takes good data and optimization.",
      ],
      source: { title: "Michael Nielsen — Neural Networks and Deep Learning (free book)", url: "http://neuralnetworksanddeeplearning.com/", note: "A superb, intuitive online textbook." },
    },
    quiz: [
      { q: "What does a single artificial neuron compute?", options: ["A lookup of the input in a table of stored values", "The plain average of its inputs, with no weights", "A weighted sum plus bias, then a non-linearity", "A random number that breaks symmetry in training"], answer: 2, explain: "A neuron is a generalized regression unit: a weighted sum of its inputs, plus a bias, passed through a non-linear activation." },
      { q: "The universal approximation theorem says a big enough network can represent almost any function. What's the catch?", options: ["It only holds for networks with a single neuron", "It doesn't mean training will actually find it", "It only applies to linear functions of the inputs", "It requires the network to have no hidden layers"], answer: 1, explain: "The theorem says such a network exists, not that optimization will find it. Architecture, data and training all still matter." },
      { q: "Where do plain multilayer perceptrons (MLPs) still show up in modern models?", options: ["Only in outdated models from before the year 2000", "As the tokenizer that splits text into tokens", "As the database that stores retrieved documents", "As the feed-forward part of each transformer block"], answer: 3, explain: "Each transformer block pairs self-attention with a position-wise feed-forward MLP, so the humble MLP is still everywhere." },
    ],
  },

  {
    id: "activation-functions",
    label: "Activation Functions",
    cluster: "dl",
    short: "The non-linearities that give networks their power — mostly ReLU these days.",
    keywords: "activation relu sigmoid tanh gelu nonlinearity vanishing gradient",
    learn: {
      why: "Activation functions are what let deep networks learn complex, non-linear patterns. Without them, a hundred layers would collapse into one. The choice of activation also shaped the practical breakthroughs that made deep learning trainable.",
      sections: [
        { h: "Why non-linearity is non-negotiable", body: [
          "Recall: stacking linear layers just gives another linear layer. The activation function inserts a **non-linearity** between layers, which is what allows the network to bend, fold, and carve up input space into complex shapes.",
        ]},
        { h: "The main activations", body: [
          { ul: [
            "**Sigmoid / tanh** — smooth S-curves; historically popular but they **saturate** (flat tails), causing vanishing gradients in deep nets.",
            "**ReLU** — `max(0, x)`. Simple, cheap, doesn't saturate for positive inputs. Its introduction was pivotal in making deep networks trainable.",
            "**GELU / SiLU** — smooth ReLU-like curves used in modern transformers for slightly better performance.",
          ]},
        ]},
        { h: "The vanishing-gradient link", body: [
          "Sigmoid/tanh squash large inputs into flat regions where the gradient is near zero, so learning signal dies as it flows back through many layers. ReLU keeps a healthy gradient (1) for positive inputs, letting gradients flow through deep networks — a key reason depth became practical.",
        ]},
      ],
      keyPoints: [
        "Activations provide the non-linearity that stops deep networks from collapsing into a single linear map.",
        "ReLU (max(0,x)) largely replaced sigmoid/tanh because it avoids saturation and vanishing gradients.",
        "Modern transformers often use smooth variants like GELU/SiLU.",
      ],
      source: { title: "Glorot et al. — Deep Sparse Rectifier Networks (ReLU)", url: "https://proceedings.mlr.press/v15/glorot11a.html", note: "The paper that popularized ReLU." },
    },
    quiz: [
      { q: "You remove every activation function from a 50-layer network. What happens?", options: ["It becomes 50 times more expressive than before", "It trains faster with no change in what it can learn", "It collapses into the equivalent of one linear layer", "It turns into a decision tree with 50 levels"], answer: 2, explain: "Stacked linear layers compose into a single linear map. Non-linear activations between them are what let depth add expressive power." },
      { q: "Why did ReLU largely replace sigmoid in deep networks?", options: ["It doesn't saturate for positive inputs, so gradients flow", "It outputs probabilities between 0 and 1 for each unit", "It is smooth everywhere, unlike sigmoid", "It makes every neuron output a negative value"], answer: 0, explain: "Sigmoid and tanh flatten out for large inputs, so gradients vanish in deep stacks. ReLU keeps a gradient of 1 for positive inputs." },
      { q: "Which activations do modern transformers often use?", options: ["Step functions that output only 0 or 1", "Smooth ReLU-like curves such as GELU or SiLU", "Sigmoid in every layer for stable outputs", "No activation, since attention is enough"], answer: 1, explain: "GELU and SiLU are smooth variants of ReLU that tend to perform slightly better in transformers." },
    ],
  },

  {
    id: "backpropagation",
    label: "Backpropagation",
    cluster: "dl",
    short: "The algorithm that computes every parameter's gradient efficiently — how networks actually learn.",
    keywords: "backpropagation backprop chain rule gradient autodiff training",
    learn: {
      why: "Backpropagation is *the* learning algorithm of deep networks. Every framework (PyTorch, TensorFlow) is essentially an engine for doing it automatically. Understanding it turns training from magic into mechanism.",
      sections: [
        { h: "The problem it solves", body: [
          "To train a network you need the gradient of the loss with respect to *every* weight — often billions of them. Computing each separately would be hopeless. Backpropagation gets them all in essentially one backward pass.",
        ]},
        { h: "Forward then backward", body: [
          "**Forward pass**: run the input through the network, computing and caching each layer's outputs, ending at the loss. **Backward pass**: apply the **chain rule** from the loss back toward the inputs, multiplying local derivatives layer by layer, to get each parameter's gradient. Then an optimizer steps the weights against those gradients.",
        ]},
        { h: "Automatic differentiation", body: [
          "Modern frameworks implement backprop as **automatic differentiation**: they record every operation as a graph during the forward pass and mechanically apply the chain rule backward. You write the forward computation; the gradient comes free. This is why building novel architectures is fast today.",
        ]},
      ],
      keyPoints: [
        "Backprop computes gradients for all parameters efficiently in one backward pass.",
        "It's the chain rule applied from the loss backward, reusing cached forward-pass values.",
        "Frameworks automate it as autodiff — you write the forward pass, gradients are derived automatically.",
      ],
      source: { title: "Karpathy — The spelled-out intro to backpropagation (micrograd)", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", note: "Builds a working autodiff engine from scratch." },
    },
    quiz: [
      { q: "Why is backpropagation essential for training networks with billions of weights?", options: ["It avoids needing gradients to train the network", "It randomly guesses weights until the loss drops", "It trains each weight separately, one at a time", "It gets every weight's gradient in one backward pass"], answer: 3, explain: "Computing each gradient separately would be hopeless at that scale. Backprop applies the chain rule backward once, reusing cached forward-pass values." },
      { q: "What does the forward pass store that the backward pass reuses?", options: ["A copy of the entire training set", "Each layer's intermediate outputs", "The final answer for every input", "A list of the model's hyperparameters"], answer: 1, explain: "The forward pass caches each layer's outputs; the backward pass multiplies local derivatives using those values to get every gradient." },
      { q: "In PyTorch you only write the forward computation. How do you get the gradients?", options: ["You derive and code each gradient formula by hand", "The framework estimates them with random sampling", "Autodiff records the ops and applies the chain rule", "Gradients aren't needed when using a framework"], answer: 2, explain: "Automatic differentiation records every operation as a graph during the forward pass and mechanically applies the chain rule backward." },
    ],
  },

  {
    id: "loss-functions",
    label: "Loss Functions",
    cluster: "dl",
    short: "The single number that defines what 'wrong' means — and thus what the model optimizes toward.",
    keywords: "loss function objective cross entropy mse mae training signal",
    learn: {
      why: "The loss function encodes the goal. Training does nothing but push this number down, so choosing the right loss is choosing what the model will actually try to do. Get it wrong and you optimize the wrong behavior perfectly.",
      sections: [
        { h: "What a loss is", body: [
          "A loss function maps the model's predictions and the true targets to a single number measuring how wrong the model is. Training uses its gradient to adjust parameters. Lower loss = better fit to the objective you encoded.",
        ]},
        { h: "The standard losses", body: [
          { ul: [
            "**Cross-entropy** — for classification and language models; penalizes confident wrong predictions and matches probability outputs. It's what trains every LLM.",
            "**Mean squared error (MSE)** — for regression; penalizes large errors heavily.",
            "**Mean absolute error (MAE)** — for regression; more robust to outliers.",
          ]},
        ]},
        { h: "Loss is where you inject intent", body: [
          "Beyond the basics, custom losses encode priorities: weighting rare classes, penalizing certain mistakes more, or adding regularization terms. In alignment, the reward model in RLHF effectively becomes a learned loss for 'helpfulness'. Whatever you can express as a differentiable objective, the model will optimize — including loopholes, so design carefully.",
        ]},
      ],
      keyPoints: [
        "The loss is a single differentiable measure of wrongness that training minimizes.",
        "Cross-entropy for classification/LLMs; MSE/MAE for regression (MAE is more outlier-robust).",
        "The loss encodes your true objective — models optimize exactly what you specify, loopholes included.",
      ],
      source: { title: "Google — Descending into ML: Loss", url: "https://developers.google.com/machine-learning/crash-course/descending-into-ml/training-and-loss", note: "How loss drives training." },
    },
    quiz: [
      { q: "You're predicting house prices, and a few extreme outlier listings shouldn't dominate training. Which loss fits better?", options: ["Mean squared error (MSE)", "Mean absolute error (MAE)", "Cross-entropy loss (CE)", "Hinge loss (SVM-style)"], answer: 1, explain: "MSE squares errors, so outliers dominate. MAE penalizes errors linearly and is more robust to them. Cross-entropy is for classification." },
      { q: "Which loss trains essentially every LLM?", options: ["Mean squared error on the output text length", "Mean absolute error on word counts", "Hinge loss on sentence classifications", "Cross-entropy on next-token prediction"], answer: 3, explain: "Cross-entropy compares the predicted probability distribution with the actual next token, penalizing confident wrong predictions." },
      { q: "A fraud model trained to minimize overall error learns to predict 'not fraud' for everything. What's the loss-level fix?", options: ["Remove the fraud examples from the training data", "Weight the rare fraud class more heavily in the loss", "Train for more epochs with the same loss", "Switch the loss to mean squared error"], answer: 1, explain: "The loss encodes your goal. If the rare class matters, weight it so mistakes on it cost more; otherwise the model optimizes exactly what you asked, loopholes included." },
    ],
  },

  {
    id: "optimizers",
    label: "Optimizers (SGD, Adam)",
    cluster: "dl",
    short: "The rules that turn gradients into parameter updates — Adam is the modern default.",
    keywords: "optimizer sgd adam momentum learning rate adaptive schedule training",
    learn: {
      why: "Optimizers decide how to use the gradients backprop provides. The right optimizer and learning-rate schedule are often the difference between a model that trains smoothly and one that diverges or stalls — practical knowledge every practitioner needs.",
      sections: [
        { h: "From gradient to update", body: [
          "Backprop gives the gradient; the optimizer decides the actual step. Plain **SGD** just steps a fixed learning rate against the gradient. Everything else adds refinements to make this faster and more stable.",
        ]},
        { h: "Momentum and adaptivity", body: [
          { ul: [
            "**Momentum** — accumulate a running average of gradients, like a ball rolling downhill, to power through noise and small bumps.",
            "**Adaptive rates (Adam)** — keep a per-parameter step size using running estimates of the gradient's mean and variance. Parameters with small, consistent gradients take bigger steps; noisy ones take smaller steps.",
          ]},
          "**Adam** (and AdamW) combines momentum and adaptivity and is the default for training most deep networks and LLMs.",
        ]},
        { h: "The learning-rate schedule", body: [
          "Even with Adam, the base learning rate and its **schedule** matter enormously. Common practice: a brief **warmup** (ramp up to avoid early instability) then a **decay** (cosine or linear) so steps shrink as you near a good solution. Poor schedules waste compute or blow up training.",
        ]},
      ],
      keyPoints: [
        "Optimizers convert gradients into updates; SGD is the baseline, Adam/AdamW the modern default.",
        "Momentum smooths noisy gradients; adaptive methods set a per-parameter step size.",
        "Learning-rate schedules (warmup + decay) are critical even with good optimizers.",
      ],
      source: { title: "Kingma & Ba — Adam optimizer", url: "https://arxiv.org/abs/1412.6980", note: "The paper introducing Adam." },
    },
    quiz: [
      { q: "Adam differs from plain SGD mainly because it…", options: ["Doesn't need gradients to update the weights", "Always converges to the global minimum", "Adapts each parameter's step and uses momentum", "Uses a single fixed step size for all weights"], answer: 2, explain: "Adam keeps running estimates of each parameter's gradient mean and variance, combining momentum with per-parameter adaptive steps." },
      { q: "Training loss spikes and diverges in the first few hundred steps. Which schedule change is standard?", options: ["Raise the learning rate for the early steps", "Add a learning-rate warmup at the start", "Remove momentum from the optimizer", "Double the batch size every step"], answer: 1, explain: "A brief warmup ramps the learning rate up to avoid early instability; then a decay shrinks steps as training nears a good solution." },
      { q: "What does momentum add to gradient descent?", options: ["A random jump to escape every local minimum", "A separate learning rate for every data point", "A check that stops training when loss rises", "A running average of gradients that smooths noise"], answer: 3, explain: "Like a ball rolling downhill, momentum accumulates past gradients so updates push through noise and small bumps." },
    ],
  },

  {
    id: "dl-regularization",
    label: "Dropout & Normalization",
    cluster: "dl",
    short: "The tricks that keep big networks stable and generalizing — dropout, batch/layer norm.",
    keywords: "dropout batch normalization layer normalization regularization stability training",
    learn: {
      why: "Two families of techniques quietly make deep networks trainable and robust: dropout (regularization) and normalization (stability). They appear in nearly every modern architecture, including transformers, so knowing what they do is essential.",
      sections: [
        { h: "Dropout", body: [
          "During training, **dropout** randomly sets a fraction of neurons to zero on each step. The network can't rely on any single neuron, so it learns redundant, robust features — a powerful regularizer against overfitting. At inference, dropout is turned off and activations are scaled to compensate.",
        ]},
        { h: "Normalization", body: [
          "Normalization keeps the scale of activations under control as they flow through many layers, which stabilizes and speeds up training.",
          { ul: [
            "**Batch normalization** — normalizes each feature across the current mini-batch. Great for CNNs.",
            "**Layer normalization** — normalizes across features within each single example. The choice for transformers and sequence models, since it doesn't depend on batch statistics.",
          ]},
        ]},
        { h: "Why they matter together", body: [
          "Before these techniques, very deep networks were finicky and prone to overfitting. Normalization tamed the training dynamics (allowing higher learning rates and deeper stacks) while dropout curbed overfitting. Transformers use layer norm and residual connections as core structural elements.",
        ]},
      ],
      keyPoints: [
        "Dropout randomly zeroes neurons in training to force redundancy and reduce overfitting.",
        "Normalization controls activation scale to stabilize and speed training.",
        "Batch norm suits CNNs; layer norm suits transformers/sequence models.",
      ],
      source: { title: "Srivastava et al. — Dropout", url: "https://jmlr.org/papers/v15/srivastava14a.html", note: "The original dropout paper." },
    },
    quiz: [
      { q: "Your network does great on training data but poorly on validation data. Which technique targets this directly?", options: ["Removing the validation set so training is faster", "Dropout, which forces redundant, robust features", "Raising the learning rate by a factor of ten", "Adding more layers without any other change"], answer: 1, explain: "That's overfitting. Dropout randomly zeroes neurons during training so the network can't lean on any single one, which improves generalization." },
      { q: "Why do transformers use layer normalization rather than batch normalization?", options: ["It is the only normalization that works on GPUs", "It removes the need for any residual connections", "It makes attention scale linearly with length", "It normalizes per example, not across a batch"], answer: 3, explain: "Layer norm normalizes across features within one example, so it doesn't depend on batch statistics, which suits sequence models." },
      { q: "What happens to dropout at inference time?", options: ["It stays on, so outputs are randomly different", "It doubles, to make predictions more robust", "It's turned off, with activations scaled to match", "It's replaced by batch normalization"], answer: 2, explain: "Dropout is a training-time regularizer. At inference it's disabled, and activations are scaled so their expected size matches training." },
    ],
  },

  {
    id: "cnn",
    label: "Convolutional Neural Networks",
    cluster: "dl",
    short: "Networks built for images — sharing small filters across space to detect patterns anywhere.",
    keywords: "cnn convolution image vision filters kernels pooling feature maps",
    learn: {
      why: "CNNs powered the deep-learning breakthrough in computer vision and remain central to image, video, and even some audio tasks. Their core ideas — weight sharing and locality — are elegant and broadly instructive.",
      sections: [
        { h: "Convolution: local, shared filters", body: [
          "Instead of connecting every pixel to every neuron, a CNN slides small **filters** (kernels) across the image, computing the same operation at every location. This encodes two priors: patterns are **local** (an edge is a few nearby pixels) and **translation-invariant** (an edge is an edge wherever it appears).",
          "Weight sharing means far fewer parameters than a dense network, and it lets the model detect a feature anywhere in the image.",
        ]},
        { h: "The architecture", body: [
          { ul: [
            "**Convolutional layers** produce **feature maps** highlighting where each learned pattern appears.",
            "**Pooling** downsamples, adding a bit more position-invariance and shrinking the data.",
            "Stacking these builds the edge → texture → part → object hierarchy.",
          ]},
        ]},
        { h: "Legacy and present", body: [
          "AlexNet's 2012 ImageNet win with a CNN launched the deep-learning era. CNNs still dominate many vision tasks, though **vision transformers** now compete or win at large scale. The convolution idea — exploit structure with shared local operations — remains a template for efficient architectures.",
        ]},
      ],
      keyPoints: [
        "CNNs slide small shared filters across the image, encoding locality and translation invariance.",
        "Weight sharing slashes parameters and detects features anywhere; pooling downsamples.",
        "They launched modern computer vision; vision transformers now rival them at scale.",
      ],
      source: { title: "Stanford CS231n — Convolutional Neural Networks", url: "https://cs231n.github.io/convolutional-networks/", note: "The definitive course notes on CNNs." },
    },
    quiz: [
      { q: "Why does a CNN need far fewer parameters than a fully connected network on images?", options: ["It only looks at the pixels in the image's center", "It converts each image to text before processing", "It stores every image at a much lower resolution", "The same small filters are reused across the image"], answer: 3, explain: "Weight sharing: one small filter slides over every location, so the parameter count doesn't grow with image size, and a feature is detected anywhere." },
      { q: "A cat detector should work whether the cat is in the corner or the center. Which CNN property helps?", options: ["Pooling layers memorize each cat's position", "Shared filters give translation invariance", "Fully connected layers weight every pixel equally", "Larger images always improve position accuracy"], answer: 1, explain: "Applying the same filter at every location means a pattern is recognized wherever it appears; pooling adds a little more position invariance." },
      { q: "What has recently rivaled CNNs on large-scale vision tasks?", options: ["Recurrent networks", "Decision trees", "Vision transformers", "k-means clustering"], answer: 2, explain: "CNNs launched modern computer vision and still dominate many tasks, but vision transformers now compete or win at large scale." },
    ],
  },

  {
    id: "rnn-lstm",
    label: "RNNs & LSTMs",
    cluster: "dl",
    short: "The pre-transformer way to model sequences — processing one step at a time with memory.",
    keywords: "rnn lstm gru sequence recurrent memory time series hidden state",
    learn: {
      why: "Before transformers, recurrent networks were how AI handled sequences — text, speech, time series. Understanding their memory mechanism and their limitations explains exactly what problem the transformer's attention was invented to solve.",
      sections: [
        { h: "Recurrence: a loop with memory", body: [
          "A **recurrent neural network** processes a sequence one element at a time, maintaining a **hidden state** that carries information forward — a form of memory. Each step's output depends on the current input and everything seen so far, compressed into that state.",
        ]},
        { h: "The vanishing-gradient problem", body: [
          "Plain RNNs struggle with **long-range dependencies**: over many steps, gradients vanish (or explode), so the network forgets distant context. **LSTMs** and **GRUs** fix this with gating mechanisms that explicitly decide what to keep, forget, and output — letting information persist across long sequences.",
        ]},
        { h: "Why transformers replaced them", body: [
          { ul: [
            "RNNs are **inherently sequential** — step t needs step t−1 — so they can't parallelize across a sequence, making them slow to train on modern hardware.",
            "Even LSTMs struggle with very long contexts.",
            "**Transformers** process all positions in parallel via attention and model long-range links directly — winning decisively for language.",
          ]},
        ]},
      ],
      keyPoints: [
        "RNNs process sequences step by step, carrying a hidden state as memory.",
        "LSTMs/GRUs use gates to fix vanishing gradients and remember long-range context.",
        "Their sequential nature prevents parallelization, which is why transformers replaced them for language.",
      ],
      source: { title: "Chris Olah — Understanding LSTMs", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", note: "The classic visual explanation of LSTM gates." },
    },
    quiz: [
      { q: "Why are RNNs slow to train on long sequences with modern GPUs?", options: ["They use far more parameters than transformers do", "They can only process sequences of numbers, not text", "Each step depends on the previous one, so no parallelism", "They need a separate model for every sequence length"], answer: 2, explain: "Recurrence is inherently sequential: step t needs step t−1. Transformers process all positions in parallel, which suits GPUs." },
      { q: "What problem do LSTM gates fix?", options: ["Losing long-range context to vanishing gradients", "Running out of memory on very short sequences", "Needing labeled data for every time step", "Being unable to process more than one input"], answer: 0, explain: "Gates explicitly decide what to keep, forget and output, so information and gradients can persist across long sequences." },
      { q: "What carries information forward from one step to the next in an RNN?", options: ["The loss function", "The learning rate", "The attention weights", "The hidden state"], answer: 3, explain: "The hidden state is the RNN's memory: each step combines the current input with it and passes an updated state on." },
    ],
  },

  {
    id: "embeddings",
    label: "Embeddings",
    cluster: "dl",
    short: "Turning words, items, or anything into meaningful vectors — the lingua franca of modern AI.",
    keywords: "embeddings vectors representation word2vec semantic similarity latent space",
    learn: {
      why: "Embeddings are how AI represents meaning. They power semantic search, RAG, recommendation, and the internal workings of every LLM. If you understand embeddings, you understand the bridge between raw symbols and the geometry of meaning.",
      sections: [
        { h: "What an embedding is", body: [
          "An **embedding** maps a discrete thing (a word, a product, a user, an image) to a dense vector of numbers, positioned so that **similar things sit close together** and relationships show up as directions. Meaning becomes geometry.",
          "The famous example: `king − man + woman ≈ queen`. The vector arithmetic works because the embedding space captured 'royalty' and 'gender' as directions.",
        ]},
        { h: "Where they come from", body: [
          "Early methods (word2vec, GloVe) learned word embeddings from co-occurrence statistics. Modern **contextual embeddings** from transformers give a word a different vector depending on its sentence ('bank' by a river vs. a bank loan). Dedicated **embedding models** turn whole sentences or documents into single vectors for search.",
        ]},
        { h: "Why engineers care", body: [
          { ul: [
            "**Semantic search / RAG** — embed query and documents, retrieve by nearest neighbors (cosine/dot product).",
            "**Clustering & classification** — operate on embeddings instead of raw text.",
            "**Recommendation** — user/item embeddings, compared by dot product.",
          ]},
          "Embeddings are the practical interface between unstructured data and everything downstream.",
        ]},
      ],
      keyPoints: [
        "An embedding places discrete items as vectors so similarity = closeness and relationships = directions.",
        "Contextual embeddings (from transformers) give word meaning based on surrounding context.",
        "They power semantic search/RAG, clustering, and recommendation via nearest-neighbor comparison.",
      ],
      source: { title: "Jay Alammar — The Illustrated Word2vec", url: "https://jalammar.github.io/illustrated-word2vec/", note: "A visual, intuitive introduction to embeddings." },
    },
    quiz: [
      { q: "Your search matches 'car' but misses documents that only say 'automobile'. What fixes that?", options: ["Adding every synonym to each document by hand", "Searching by embedding similarity, not keywords", "Lowercasing all the text before searching", "Sorting the results by document length"], answer: 1, explain: "Embeddings place similar meanings close together, so 'car' and 'automobile' land near each other even though the strings differ." },
      { q: "Why does 'bank' get different vectors in 'river bank' and 'bank loan' in a modern model?", options: ["The tokenizer splits 'bank' differently each time", "Embeddings are randomly re-sampled on every call", "The model stores one vector per sentence it has seen", "Contextual embeddings depend on the surrounding words"], answer: 3, explain: "Transformers produce contextual embeddings: a word's vector reflects its sentence. Older word2vec-style embeddings gave one vector per word." },
      { q: "What does `king − man + woman ≈ queen` show about embedding spaces?", options: ["Relationships like gender appear as directions", "Embeddings store a dictionary of word meanings", "Every word is exactly one unit from its neighbors", "Vector math only works for royalty-related words"], answer: 0, explain: "Meaning becomes geometry: concepts like royalty and gender show up as consistent directions, so vector arithmetic can capture analogies." },
    ],
  },

  {
    id: "attention",
    label: "Attention Mechanism",
    cluster: "dl",
    short: "Letting a model dynamically focus on the most relevant parts of its input — the key idea of transformers.",
    keywords: "attention self-attention query key value transformer context weighting",
    learn: {
      why: "Attention is the single most important idea in modern AI. It's the mechanism that made transformers — and therefore LLMs — possible. Understanding it is understanding how models weigh context to decide what matters.",
      sections: [
        { h: "The problem it solves", body: [
          "When processing a word, which other words matter? In 'the animal didn't cross the street because *it* was tired', what does 'it' refer to? Attention lets the model, for each position, dynamically pull in information from the most relevant other positions — regardless of distance.",
        ]},
        { h: "Query, key, value", body: [
          "Each token produces three vectors: a **query** (what am I looking for?), a **key** (what do I offer?), and a **value** (the information I carry). A token's query is compared (dot product) against every token's key to get **attention weights**; those weights then blend the values.",
          { formula: "attention = softmax( Q·Kᵀ / √d ) · V" },
          "So each position's new representation is a weighted mix of all positions' values, weighted by relevance. **Self-attention** is this applied within one sequence.",
        ]},
        { h: "Why it changed everything", body: [
          { ul: [
            "**Long-range** — directly connects distant tokens, unlike RNNs.",
            "**Parallel** — all positions computed at once, ideal for GPUs.",
            "**Multi-head** — several attention operations in parallel capture different relationship types.",
          ]},
        ]},
      ],
      keyPoints: [
        "Attention lets each position focus on the most relevant other positions, at any distance.",
        "Query·Key dot products (softmaxed) produce weights that blend the Values.",
        "It's parallelizable and long-range — the properties that made transformers dominate.",
      ],
      source: { title: "Jay Alammar — The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", note: "The clearest visual explanation of attention." },
    },
    quiz: [
      { q: "In 'The animal didn't cross the street because it was tired', how does attention help the model with 'it'?", options: ["It reads the sentence strictly left to right, word by word", "'it' weighs 'animal' highly when building its representation", "It looks up 'it' in a dictionary of pronouns", "It skips pronouns since they carry no meaning"], answer: 1, explain: "For each position, attention pulls in information from the most relevant other positions, at any distance, so 'it' can draw on 'animal'." },
      { q: "In attention, what are a token's query and key used for?", options: ["The query stores the token's meaning; keys are unused", "They pick which tokens are deleted from the input", "Their dot products decide how much each value counts", "They set the model's learning rate for that token"], answer: 2, explain: "Each query is compared with every key; the softmaxed scores become weights that blend the values into the new representation." },
      { q: "Why does multi-head attention use several heads instead of one?", options: ["More heads let the model read longer documents", "Heads split the vocabulary so each learns fewer words", "Multiple heads remove the need for positional encodings", "Each head can capture a different kind of relationship"], answer: 3, explain: "Parallel attention heads let the model track several kinds of relationship at once, such as syntax in one head and coreference in another." },
    ],
  },

  {
    id: "transformers",
    label: "Transformers",
    cluster: "dl",
    short: "The attention-based architecture behind virtually every modern large model.",
    keywords: "transformer attention architecture encoder decoder positional encoding gpt bert",
    learn: {
      why: "The transformer is the architecture of the current AI era — GPT, BERT, Claude, image and audio models all build on it. 'Attention Is All You Need' (2017) is arguably the most consequential ML paper of the decade. This node ties the deep-learning cluster to how LLMs are built.",
      sections: [
        { h: "The design", body: [
          "A transformer is a stack of identical blocks, each containing **self-attention** (mix information across positions) and a **feed-forward MLP** (process each position), wrapped with **residual connections** and **layer normalization** for stable training. Because attention has no inherent sense of order, **positional encodings** inject where each token sits.",
        ]},
        { h: "Encoder, decoder, or both", body: [
          { ul: [
            "**Encoder-only** (BERT) — reads bidirectionally; great for understanding/classification.",
            "**Decoder-only** (GPT, Claude) — predicts the next token left-to-right; the basis of generative LLMs.",
            "**Encoder–decoder** (original transformer, T5) — reads input, generates output; good for translation.",
          ]},
        ]},
        { h: "Why it scales", body: [
          "Transformers are massively parallelizable and improve predictably as you add data and parameters (**scaling laws**). That scalability is exactly why they, and not RNNs, became the substrate for models with billions of parameters. The main cost: attention scales quadratically with sequence length, driving much research on efficiency and long context.",
        ]},
      ],
      keyPoints: [
        "A transformer stacks self-attention + feed-forward blocks with residuals, layer norm, and positional encodings.",
        "Decoder-only transformers (GPT/Claude) power generative LLMs; encoder-only (BERT) power understanding.",
        "They parallelize and scale predictably — but attention's quadratic cost in sequence length is the key bottleneck.",
      ],
      source: { title: "Vaswani et al. — Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", note: "The 2017 paper that introduced the transformer." },
    },
    quiz: [
      { q: "Why does a transformer need positional encodings?", options: ["They let it read more than one language", "They compress the text to save memory", "Attention alone has no sense of word order", "They replace the feed-forward layers"], answer: 2, explain: "Self-attention treats the input as an unordered set; positional encodings inject where each token sits, so order can matter." },
      { q: "You need a model that reads a whole review at once to classify its sentiment, not generate text. Which is the classic fit?", options: ["Decoder-only, like GPT", "Encoder-only, like BERT", "A recurrent LSTM", "A diffusion model"], answer: 1, explain: "Encoder-only models read bidirectionally and suit understanding and classification. Decoder-only models generate text left to right." },
      { q: "What's the main scaling bottleneck of the standard transformer?", options: ["It can't be parallelized across positions on GPUs", "It stops improving once data passes a set size", "Its parameters can't be split across several GPUs", "Attention cost grows with sequence length squared"], answer: 3, explain: "Transformers parallelize and scale predictably with data and parameters, but attention's cost rises quadratically with context length." },
    ],
  },

  {
    id: "transfer-learning",
    label: "Transfer Learning",
    cluster: "dl",
    short: "Reusing a model trained on one task as a starting point for another — the basis of the foundation-model era.",
    keywords: "transfer learning pretraining fine-tuning foundation model features reuse",
    learn: {
      why: "Transfer learning is why you don't need millions of examples or a data-center to build a strong model anymore. Pretrained models — the whole 'foundation model' paradigm — let you adapt vast general knowledge to your specific task cheaply. It's the economic engine of applied AI.",
      sections: [
        { h: "The idea", body: [
          "Train a big model once on a huge general dataset so it learns broadly useful representations. Then **transfer** that model to a new, narrower task — reusing what it already knows instead of learning from scratch. The features learned on the big task give the small task a massive head start.",
        ]},
        { h: "How you transfer", body: [
          { ul: [
            "**Feature extraction** — freeze the pretrained model, train only a small new head on your task.",
            "**Fine-tuning** — continue training the whole model (or parts) on your data with a low learning rate.",
            "**Parameter-efficient** methods (LoRA, adapters) — tune a tiny fraction of parameters, cheaply.",
          ]},
        ]},
        { h: "Why it defines modern AI", body: [
          "The **foundation model** paradigm is transfer learning at scale: pretrain once on internet-scale data, adapt everywhere. It slashes data and compute needs for downstream tasks and is why a startup can build serious AI products without training a model from zero. In the LLM world, prompting and RAG are even lighter-weight ways to 'transfer' a general model to your task without any training.",
        ]},
      ],
      keyPoints: [
        "Transfer learning reuses a model pretrained on a large general task to jump-start a new, narrower task.",
        "You can freeze-and-add-a-head, fully fine-tune, or use parameter-efficient methods like LoRA.",
        "It underlies the foundation-model era — pretrain once, adapt everywhere — cutting data and compute needs.",
      ],
      source: { title: "Sebastian Ruder — Transfer Learning in NLP", url: "https://ruder.io/transfer-learning/", note: "A thorough overview of the paradigm." },
    },
    quiz: [
      { q: "You have 800 labeled photos of machine defects. What's the most practical way to build a good classifier?", options: ["Train a large CNN from scratch on the 800 photos", "Fine-tune a pretrained vision model on them", "Collect a million photos before trying anything", "Use k-means to cluster the photos into classes"], answer: 1, explain: "Transfer learning reuses features learned on a huge dataset, giving a small task a big head start with far less data and compute." },
      { q: "With very little data and compute, which transfer approach is usually safest?", options: ["Retrain every layer with a high learning rate", "Randomly re-initialize the pretrained weights", "Pretrain a new base model from scratch", "Freeze the base and train a small new head"], answer: 3, explain: "Feature extraction keeps the pretrained features fixed and learns only a small task head, which is cheap and less prone to overfitting a small dataset." },
      { q: "How do prompting and RAG relate to transfer learning in the LLM world?", options: ["They are ways of pretraining a model from scratch", "They replace the need for a pretrained model", "They adapt a general model to a task without training", "They only work on models trained for one task"], answer: 2, explain: "They're even lighter-weight ways to 'transfer' a general model's knowledge to your task, with no training at all." },
    ],
  },

  {
    id: "generative-models",
    label: "Generative Models",
    cluster: "dl",
    short: "Models that create new data — images, audio, text — including GANs, VAEs, and diffusion.",
    keywords: "generative gan vae diffusion image generation sampling latent",
    learn: {
      why: "Generative AI — image generators, voice synthesis, and LLMs themselves — rests on models that learn a data distribution and sample new examples from it. Knowing the main approaches (especially diffusion, behind today's image models) rounds out how AI creates rather than just classifies.",
      sections: [
        { h: "Discriminative vs. generative", body: [
          "A **discriminative** model learns to tell classes apart (`P(label | data)`). A **generative** model learns the data distribution itself (`P(data)`), so it can produce brand-new samples that look like the training data. That's the difference between recognizing a cat and drawing one.",
        ]},
        { h: "The main families", body: [
          { ul: [
            "**VAEs** — encode data into a smooth latent space and decode samples from it; stable but often blurry.",
            "**GANs** — a generator and a discriminator compete; the generator learns to fool the critic. Sharp results, but tricky to train.",
            "**Diffusion models** — start from noise and iteratively denoise into an image, learning to reverse a gradual noising process. They power modern image generators (Stable Diffusion, DALL·E, Midjourney) with high quality and stable training.",
            "**Autoregressive** — generate one token/pixel at a time; this is how LLMs generate text.",
          ]},
        ]},
        { h: "The unifying theme", body: [
          "All of them learn to turn randomness into realistic structure by capturing the training distribution. Diffusion currently dominates images; autoregressive transformers dominate text; the field mixes and matches these ideas rapidly.",
        ]},
      ],
      keyPoints: [
        "Generative models learn P(data) and sample new examples, versus discriminative models that learn P(label|data).",
        "Key families: VAEs, GANs, diffusion (modern image gen), and autoregressive (LLM text).",
        "Diffusion iteratively denoises from noise to a sample; LLMs generate autoregressively, one token at a time.",
      ],
      source: { title: "Lilian Weng — What are Diffusion Models?", url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/", note: "A rigorous but readable guide to diffusion." },
    },
    quiz: [
      { q: "What's the key difference between a generative and a discriminative model?", options: ["Generative models are always larger than discriminative ones", "Generative learns the data itself, so it can make new samples", "Discriminative models can only handle image inputs", "Generative models need no training data to work"], answer: 1, explain: "A discriminative model learns P(label | data) to tell classes apart; a generative model learns P(data) and can sample new examples." },
      { q: "Modern image generators like Stable Diffusion produce images by…", options: ["Copying and blending images from their training set", "Predicting one full image in a single forward pass", "Searching the web for the closest matching image", "Starting from noise and denoising it step by step"], answer: 3, explain: "Diffusion models learn to reverse a gradual noising process, iteratively denoising random noise into a realistic image." },
      { q: "A team's GAN produces sharp images, but training keeps collapsing. What's the likely reason?", options: ["GANs can't produce sharp images, so it isn't a GAN", "GANs need text prompts, which the team didn't provide", "The two competing networks make training unstable", "GANs only work on audio, not on image data"], answer: 2, explain: "A GAN's generator and discriminator compete. That yields sharp results but makes training tricky, one reason diffusion took over image generation." },
    ],
  },
]);
