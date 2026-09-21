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
      { q: "What does 'deep' in deep learning refer to?", options: ["The size of the hard drive", "The number of layers stacked in the network", "How long training takes", "The depth of the dataset folder"], answer: 1, explain: "'Deep' means many layers, each transforming the previous layer's output." },
      { q: "The defining advantage of deep learning over classic ML is…", options: ["It needs no data", "It learns feature representations automatically from raw data", "It always uses fewer parameters", "It avoids matrix multiplication"], answer: 1, explain: "Representation learning removes the need for manual feature engineering on perceptual and language data." },
      { q: "In a vision network, what do early layers typically learn compared to later layers?", options: ["Whole objects first, then edges", "Simple features like edges first, then complex parts and objects", "Only colors, never shapes", "Nothing until the last layer"], answer: 1, explain: "Features grow hierarchically: edges → textures/parts → whole objects." },
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
      { q: "A single artificial neuron computes…", options: ["A database join", "A weighted sum of inputs plus bias, passed through an activation function", "A random number", "A sort operation"], answer: 1, explain: "Each neuron is a weighted sum with bias followed by a non-linear activation." },
      { q: "The universal approximation theorem says a sufficiently large network can…", options: ["Train instantly", "Approximate essentially any continuous function", "Run without data", "Only fit straight lines"], answer: 1, explain: "Enough hidden units can represent almost any continuous function — existence, not easy discovery." },
      { q: "A plain stack of fully-connected layers is called…", options: ["A convolutional network", "A multilayer perceptron (MLP)", "A decision tree", "A recurrent network"], answer: 1, explain: "Stacked dense layers form an MLP, a core component still used inside transformers." },
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
      { q: "Without any activation functions, a deep network is equivalent to…", options: ["A single linear transformation", "A convolutional network", "A decision tree", "A perfect classifier"], answer: 0, explain: "Composed linear layers collapse to one linear map; non-linear activations are what add power." },
      { q: "ReLU is defined as…", options: ["1/(1+e^-x)", "max(0, x)", "x squared", "the average of inputs"], answer: 1, explain: "ReLU outputs the input if positive, else zero: max(0, x)." },
      { q: "A key reason ReLU helped deep networks train is that it…", options: ["Saturates like sigmoid", "Keeps a strong gradient for positive inputs, avoiding vanishing gradients", "Removes all non-linearity", "Requires no computation"], answer: 1, explain: "ReLU doesn't saturate for positive inputs, so gradients flow well through deep stacks." },
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
      { q: "Backpropagation computes the gradient of the loss with respect to…", options: ["Only the last layer's weights", "Every parameter in the network, efficiently in one backward pass", "The input data labels", "Nothing — it's random"], answer: 1, explain: "Backprop yields gradients for all parameters at once via the chain rule." },
      { q: "The forward pass must cache layer outputs because…", options: ["They are printed to the user", "The backward pass needs them to compute local derivatives", "It saves disk space", "They are the final prediction"], answer: 1, explain: "Cached activations from the forward pass are reused when applying the chain rule backward." },
      { q: "Automatic differentiation in frameworks like PyTorch means…", options: ["You must derive gradients by hand", "Gradients are derived mechanically from the recorded forward operations", "There is no gradient", "Training needs no loss"], answer: 1, explain: "Autodiff records the computation graph and applies the chain rule automatically, so you only write the forward pass." },
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
      { q: "During training, the loss function is…", options: ["Maximized", "Minimized", "Kept constant", "Ignored"], answer: 1, explain: "Training reduces the loss, moving parameters to make predictions closer to targets." },
      { q: "Which loss is standard for classification and language models?", options: ["Mean squared error", "Cross-entropy", "Mean absolute error", "Hinge-free error"], answer: 1, explain: "Cross-entropy matches probabilistic outputs and penalizes confident mistakes — used for classifiers and LLMs." },
      { q: "Choosing the loss function matters because…", options: ["It only affects speed", "The model optimizes exactly what the loss encodes, including unintended loopholes", "It has no effect on behavior", "It replaces the data"], answer: 1, explain: "The loss defines the objective; the model will exploit whatever you actually specify." },
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
      { q: "What is the role of an optimizer, given the gradients from backprop?", options: ["To compute the gradients", "To decide how to update the parameters using those gradients", "To label the data", "To draw the loss curve"], answer: 1, explain: "Backprop provides gradients; the optimizer turns them into actual weight updates." },
      { q: "Momentum helps optimization by…", options: ["Randomizing the gradient", "Accumulating a running average of gradients to move through noise and small bumps", "Removing the learning rate", "Deleting parameters"], answer: 1, explain: "Momentum smooths the trajectory, like a ball gaining speed downhill, improving stability and speed." },
      { q: "A typical learning-rate schedule for training large models involves…", options: ["A constant rate forever", "A warmup followed by a decay", "Only increasing the rate", "No schedule at all"], answer: 1, explain: "Warmup avoids early instability; decay shrinks steps as the model converges." },
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
      { q: "Dropout reduces overfitting by…", options: ["Adding more layers", "Randomly zeroing neurons during training so the net can't rely on any single one", "Increasing the learning rate", "Removing the loss function"], answer: 1, explain: "Randomly dropping neurons forces redundant, robust representations, regularizing the network." },
      { q: "Normalization layers primarily help by…", options: ["Labeling the data", "Keeping activation scales controlled, stabilizing and speeding training", "Deleting parameters", "Replacing the optimizer"], answer: 1, explain: "Normalizing activations tames training dynamics, allowing deeper nets and higher learning rates." },
      { q: "Which normalization is standard in transformers?", options: ["Batch normalization", "Layer normalization", "No normalization", "Label normalization"], answer: 1, explain: "Transformers use layer norm, which normalizes within each example and doesn't depend on batch statistics." },
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
      { q: "The key idea of a convolutional layer is to…", options: ["Connect every pixel to every neuron", "Slide small shared filters across the image, applying the same operation everywhere", "Sort the pixels", "Use no weights"], answer: 1, explain: "Shared local filters encode locality and translation invariance with far fewer parameters." },
      { q: "Weight sharing in CNNs provides which benefit?", options: ["More parameters", "Detecting a feature anywhere in the image with far fewer parameters", "Slower training", "No effect"], answer: 1, explain: "The same filter reused across positions means fewer weights and position-independent feature detection." },
      { q: "Pooling layers in a CNN mainly…", options: ["Add color", "Downsample feature maps, adding position-invariance and reducing size", "Increase the resolution", "Compute the loss"], answer: 1, explain: "Pooling reduces spatial dimensions and grants a bit more invariance to exact position." },
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
      { q: "How does an RNN carry information across a sequence?", options: ["It processes all positions at once", "Through a hidden state updated at each step, acting as memory", "By storing the whole sequence in a database", "It doesn't — each step is independent"], answer: 1, explain: "The recurrent hidden state passes information forward from step to step." },
      { q: "LSTMs and GRUs were designed to solve…", options: ["Slow GPUs", "The vanishing-gradient problem, so networks can remember long-range context", "Overfitting only", "Image classification"], answer: 1, explain: "Gating mechanisms let LSTMs/GRUs preserve information over long sequences, mitigating vanishing gradients." },
      { q: "A major reason transformers replaced RNNs for language is that RNNs…", options: ["Use too little memory", "Are inherently sequential and can't parallelize across a sequence", "Cannot use gradients", "Only work on images"], answer: 1, explain: "RNNs must process steps in order, preventing the parallelism transformers exploit." },
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
      { q: "An embedding represents an item as…", options: ["A single integer id", "A dense vector positioned so similar items are close together", "A row in a spreadsheet", "A decision tree"], answer: 1, explain: "Embeddings map items to vectors where geometric closeness reflects semantic similarity." },
      { q: "The fact that `king − man + woman ≈ queen` works shows that embeddings…", options: ["Are random", "Capture relationships as consistent directions in the vector space", "Store exact dictionary definitions", "Cannot do arithmetic"], answer: 1, explain: "Semantic relationships (like gender or royalty) become directions, enabling vector arithmetic." },
      { q: "In RAG, embeddings are used to…", options: ["Compile code", "Retrieve documents whose vectors are nearest to the query's vector", "Train the GPU", "Label images"], answer: 1, explain: "The query and documents are embedded and compared by nearest-neighbor similarity for retrieval." },
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
      { q: "The attention mechanism lets a model…", options: ["Ignore all context", "Dynamically focus on the most relevant other positions when processing each token", "Only look at the previous single word", "Sort the vocabulary"], answer: 1, explain: "Attention weights how much each position should draw from every other position, by relevance." },
      { q: "In attention, the relevance between two tokens is computed from…", options: ["Their colors", "The dot product of one token's query with another's key", "The learning rate", "Random noise"], answer: 1, explain: "Query·Key dot products (scaled and softmaxed) produce the attention weights over values." },
      { q: "Compared to RNNs, attention is advantageous because it is…", options: ["Sequential and slow", "Parallelizable and directly models long-range dependencies", "Unable to use GPUs", "Limited to short inputs"], answer: 1, explain: "Attention computes all positions at once and links distant tokens directly — unlike sequential RNNs." },
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
      { q: "A transformer block combines self-attention with…", options: ["A convolutional filter", "A position-wise feed-forward MLP, plus residuals and layer norm", "A decision tree", "A recurrent loop"], answer: 1, explain: "Each block interleaves attention and an MLP, with residual connections and layer normalization." },
      { q: "Generative LLMs like GPT and Claude are based on which transformer variant?", options: ["Encoder-only", "Decoder-only (next-token prediction)", "Convolutional", "Recurrent"], answer: 1, explain: "Decoder-only transformers predict the next token autoregressively — the generative LLM design." },
      { q: "Because attention has no built-in sense of order, transformers add…", options: ["Dropout", "Positional encodings", "More GPUs", "Extra labels"], answer: 1, explain: "Positional encodings tell the model where each token is in the sequence." },
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
      { q: "Transfer learning means…", options: ["Training every model from scratch", "Reusing a model pretrained on a large task as a starting point for a new task", "Copying data between hard drives", "Deleting a model's weights"], answer: 1, explain: "It leverages representations learned on a big general task to accelerate a new, related task." },
      { q: "Fine-tuning differs from feature extraction in that fine-tuning…", options: ["Freezes the entire model", "Continues training the pretrained weights (often at a low learning rate)", "Uses no data", "Removes the pretrained model"], answer: 1, explain: "Fine-tuning updates the pretrained weights on new data; feature extraction freezes them and trains only a new head." },
      { q: "The foundation-model paradigm is essentially transfer learning that…", options: ["Avoids pretraining", "Pretrains once at massive scale, then adapts to many downstream tasks", "Only works on tabular data", "Requires labeling the whole internet"], answer: 1, explain: "Pretrain once on internet-scale data, then adapt via fine-tuning, prompting, or RAG — transfer learning at scale." },
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
      { q: "A generative model differs from a discriminative one because it…", options: ["Only classifies inputs", "Learns the data distribution and can produce new samples", "Cannot use neural networks", "Needs no training data"], answer: 1, explain: "Generative models learn P(data) to synthesize new examples, not just separate classes." },
      { q: "Modern image generators like Stable Diffusion are based on…", options: ["Decision trees", "Diffusion models that iteratively denoise from random noise", "k-means", "Linear regression"], answer: 1, explain: "Diffusion models learn to reverse a noising process, denoising random noise into an image." },
      { q: "LLMs generate text using which generative approach?", options: ["GANs", "Autoregressive, one token at a time", "Diffusion over words only", "k-nearest neighbors"], answer: 1, explain: "LLMs are autoregressive: they generate each next token conditioned on the previous ones." },
    ],
  },
]);
