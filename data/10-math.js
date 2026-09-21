/* ===========================================================================
   MATH FOUNDATIONS
   The language underneath everything in AI. Each node: a scoped lesson + quiz.
   Schema:
     { id, label, cluster, short, keywords,
       learn: { why, sections:[{h, body:[str | {ul:[]} | {formula:""}]}], keyPoints:[], source:{title,url,note} },
       quiz: [ {q, options:[], answer:idx, explain} ] }
   =========================================================================== */
ATLAS.addNodes([
  {
    id: "linear-algebra",
    label: "Linear Algebra",
    cluster: "math",
    short: "The math of vectors and matrices — how AI represents and transforms data.",
    keywords: "vector matrix tensor space transformation",
    learn: {
      why: "Every input to an AI model — a word, a pixel, a user — becomes a vector of numbers, and every layer of a neural network is a matrix transformation. Linear algebra is literally the data structure and the operation of modern AI.",
      sections: [
        { h: "The core objects", body: [
          "Linear algebra studies **vectors** (ordered lists of numbers), **matrices** (grids of numbers), and the operations that transform them. In AI these aren't abstract: a sentence embedding is a vector; the weights of a neural layer are a matrix; a batch of images is a **tensor** (a higher-dimensional array).",
          "The central idea is the **linear transformation**: multiplying a vector by a matrix moves, rotates, scales, or projects it into a new space. Stacking such transformations (with a bit of non-linearity between them) is what a neural network *is*.",
        ]},
        { h: "Why 'linear'", body: [
          "A transformation is *linear* if it preserves vector addition and scaling: `f(a + b) = f(a) + f(b)` and `f(c·a) = c·f(a)`. This constraint is what makes the math tractable and composable — you can analyze and stack linear maps predictably.",
          "Real intelligence needs non-linearity too (or stacked linear layers collapse into one). That's why deep networks alternate linear transformations with non-linear **activation functions** — but the heavy lifting of *representation* is linear algebra.",
        ]},
        { h: "The operations that matter", body: [
          { ul: [
            "**Matrix–vector multiply**: applies a transformation to a data point — the atomic operation of a neural layer.",
            "**Matrix–matrix multiply**: composes transformations, or applies one to a whole batch at once (why GPUs matter).",
            "**Dot product**: measures alignment between two vectors — the basis of similarity and attention.",
            "**Decompositions** (eigen, SVD): reveal the hidden structure of data — the basis of PCA and dimensionality reduction.",
          ]},
        ]},
      ],
      keyPoints: [
        "Data → vectors; transformations → matrices; a neural layer is a matrix multiply plus a non-linearity.",
        "Linear means addition- and scaling-preserving, which makes transformations composable.",
        "Stacked *purely* linear layers collapse to one — non-linearity is what gives depth its power.",
      ],
      source: { title: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", note: "The best visual intuition for vectors, matrices, and transformations." },
    },
    quiz: [
      { q: "In a neural network, what does a single dense (fully-connected) layer fundamentally compute?", options: ["A sort of the input values", "A matrix multiply of the input, plus a bias, then a non-linearity", "A random shuffle of neurons", "A database lookup"], answer: 1, explain: "A dense layer is `activation(W·x + b)` — a linear transformation (matrix multiply plus bias) followed by a non-linear activation." },
      { q: "Why do deep networks insert non-linear activation functions between layers?", options: ["To make training slower on purpose", "Because stacking only linear layers is equivalent to a single linear layer", "To save memory", "Non-linearities are decorative and optional"], answer: 1, explain: "Composing linear maps yields another linear map, so without non-linearity, depth adds no expressive power." },
      { q: "How is a batch of many data points typically pushed through a layer efficiently?", options: ["One at a time in a Python loop", "As a matrix–matrix multiply on a GPU", "By emailing them to a server", "It cannot be batched"], answer: 1, explain: "Stacking data points into a matrix turns per-sample transforms into one matrix–matrix multiply, which GPUs execute in massive parallel." },
    ],
  },

  {
    id: "vectors",
    label: "Vectors & Vector Spaces",
    cluster: "math",
    short: "Points and directions in high-dimensional space — how meaning gets encoded as coordinates.",
    keywords: "vector space dimension norm magnitude direction embedding coordinates",
    learn: {
      why: "When an AI model 'understands' a word or an image, it places it as a point in a high-dimensional space where distance and direction carry meaning. Vectors are how that meaning is stored and compared.",
      sections: [
        { h: "A vector is a point and a direction", body: [
          "A vector is just an ordered list of numbers: `[0.2, -1.4, 3.0]`. Geometrically it's a point in space (here, 3D) or equivalently an arrow from the origin to that point. AI models routinely work in spaces of hundreds or thousands of dimensions — you can't picture them, but the algebra is identical to 2D.",
          "A **vector space** is the set of all such vectors you can reach by adding vectors and scaling them. The number of independent directions is the **dimension**.",
        ]},
        { h: "Length and direction", body: [
          "A vector's **norm** (magnitude) measures its length. The most common is the L2 (Euclidean) norm:",
          { formula: "‖v‖ = sqrt(v₁² + v₂² + ... + vₙ²)" },
          "Its **direction** is what remains after you divide out the length (**normalization**). In many AI systems — especially embeddings — direction carries the meaning and magnitude is secondary, which is why cosine similarity (angle) is so common.",
        ]},
        { h: "Why high dimensions", body: [
          "More dimensions = more capacity to separate concepts. A good embedding space might place 'king' and 'queen' close, with the direction from 'man' to 'woman' echoing the direction from 'king' to 'queen'. That structure only fits in many dimensions.",
          "High dimensions are also strange (the *curse of dimensionality*): distances concentrate and intuition breaks. Data science spends real effort managing this.",
        ]},
      ],
      keyPoints: [
        "A vector is an ordered list of numbers — a point/direction in a space of that many dimensions.",
        "Norm = length; normalizing keeps direction only.",
        "Embeddings put semantically similar things near each other in a high-dimensional vector space.",
      ],
      source: { title: "Immersive Math — Interactive Linear Algebra", url: "http://immersivemath.com/ila/index.html", note: "Free, interactive chapters on vectors and spaces." },
    },
    quiz: [
      { q: "What does the dimension of a vector space count?", options: ["The number of data points you have", "The number of independent directions in the space", "The maximum value any number can take", "The number of GPUs required"], answer: 1, explain: "Dimension is the count of independent directions (basis vectors) needed to reach any point in the space." },
      { q: "In many embedding systems, why is direction often more meaningful than magnitude?", options: ["Magnitude is impossible to compute", "Semantic similarity is captured by the angle between vectors, measured with cosine similarity", "Vectors have no magnitude", "It is a rendering trick"], answer: 1, explain: "Embeddings encode meaning largely in direction, so cosine similarity (the angle) compares meaning while ignoring length." },
      { q: "The 'curse of dimensionality' refers to the fact that as dimensions grow…", options: ["Computers get faster", "Distances tend to concentrate and intuition/geometry behave unexpectedly", "Vectors become two-dimensional", "Data becomes free"], answer: 1, explain: "In very high dimensions, pairwise distances become similar and sampling gets sparse, which complicates learning and search." },
    ],
  },

  {
    id: "matrices-matmul",
    label: "Matrices & Matrix Multiplication",
    cluster: "math",
    short: "The operation that composes transformations — and the workhorse of every model's forward pass.",
    keywords: "matrix multiplication matmul weights transformation gpu tensor",
    learn: {
      why: "The single most-executed operation in AI is matrix multiplication. Training and running any model is, at the hardware level, mostly a torrent of matmuls — which is exactly what GPUs and TPUs are built to do fast.",
      sections: [
        { h: "What a matrix does", body: [
          "A matrix is a grid of numbers, but its *meaning* is a linear transformation: feed it a vector, get back a transformed vector. An `m×n` matrix maps vectors from an n-dimensional space to an m-dimensional one.",
          "Multiplying a matrix by a vector, `W·x`, takes a weighted combination of x's components to produce each output component. In a neural network, `W` is the learned weights and `x` is the incoming activations.",
        ]},
        { h: "Composition = multiplication", body: [
          "Applying transformation A then B is the same as applying the single matrix `B·A`. This is why matrix multiplication is defined the (initially odd) way it is — it must compose transformations.",
          "Order matters: `A·B ≠ B·A` in general. Matrix multiplication is **not commutative**. It *is* associative, which lets frameworks group operations efficiently.",
        ]},
        { h: "Why the whole industry is matmul", body: [
          "One matmul can transform an entire batch of inputs through an entire layer at once. Modern accelerators (GPUs/TPUs) are essentially matmul engines with thousands of parallel units.",
          "Costs scale roughly with the product of the dimensions, so model size, sequence length, and batch size directly drive compute and dollars. Understanding matmul shapes is understanding cost.",
        ]},
      ],
      keyPoints: [
        "A matrix encodes a linear transformation from one space to another.",
        "Matrix multiply composes transformations; it's associative but not commutative.",
        "Nearly all AI compute is matmul — which is why specialized hardware exists and why shapes drive cost.",
      ],
      source: { title: "MIT 18.06 (Gilbert Strang) — Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "The canonical university course; lecture 1–3 cover matrices and multiplication." },
    },
    quiz: [
      { q: "If matrix A is 3×4 and matrix B is 4×2, what is the shape of A·B?", options: ["4×4", "3×2", "2×3", "The multiplication is undefined"], answer: 1, explain: "Inner dimensions (4 and 4) must match; the result takes the outer dimensions: 3×2." },
      { q: "Applying transformation A and then transformation B to a vector equals multiplying by which single matrix?", options: ["A·B", "B·A", "A + B", "A − B"], answer: 1, explain: "Right-to-left: B·A applies A first, then B, matching function composition B(A(x))." },
      { q: "Why is specialized hardware (GPUs/TPUs) so central to AI?", options: ["It stores more files", "It performs the massive matrix multiplications of training/inference in parallel", "It writes Python faster", "It reduces the need for data"], answer: 1, explain: "Model math is dominated by matmul, which these chips execute with thousands of parallel arithmetic units." },
    ],
  },

  {
    id: "dot-product",
    label: "Dot Product & Similarity",
    cluster: "math",
    short: "One number that says how aligned two vectors are — the seed of attention and search.",
    keywords: "dot product cosine similarity projection alignment attention retrieval",
    learn: {
      why: "Retrieval ('find the most relevant document'), attention ('which tokens should I focus on'), and recommendation all reduce to the same question: how similar are these two vectors? The dot product answers it.",
      sections: [
        { h: "The operation", body: [
          "The dot product multiplies two vectors element-wise and sums the result:",
          { formula: "a · b = a₁b₁ + a₂b₂ + ... + aₙbₙ" },
          "Geometrically it equals `‖a‖ · ‖b‖ · cos(θ)`, where θ is the angle between them. So a big positive dot product means the vectors point the same way; zero means they're perpendicular (unrelated); negative means opposed.",
        ]},
        { h: "Cosine similarity", body: [
          "If you divide the dot product by both lengths, you get **cosine similarity** — just `cos(θ)`, ranging from −1 to 1. This ignores magnitude and compares pure direction, which is why it's the default for comparing embeddings in search and RAG.",
        ]},
        { h: "Where it shows up", body: [
          { ul: [
            "**Attention**: a query vector is dotted against key vectors to score relevance (the heart of transformers).",
            "**Vector search / RAG**: your question's embedding is compared (dot product / cosine) against stored document embeddings.",
            "**Recommendation**: user and item vectors are dotted to predict preference.",
          ]},
        ]},
      ],
      keyPoints: [
        "Dot product = element-wise multiply then sum = alignment of two vectors.",
        "Cosine similarity is the dot product normalized to [−1, 1], comparing direction only.",
        "Attention and vector search are, at their core, dot products at scale.",
      ],
      source: { title: "3Blue1Brown — Dot products and duality", url: "https://www.youtube.com/watch?v=LyGKycYT2v0", note: "Builds geometric intuition for what the dot product means." },
    },
    quiz: [
      { q: "Two unit vectors point in exactly the same direction. What is their dot product?", options: ["0", "1", "−1", "Undefined"], answer: 1, explain: "For unit vectors, dot product equals cos(θ); identical direction means θ=0 and cos(0)=1." },
      { q: "What does cosine similarity ignore that a raw dot product does not?", options: ["The direction of the vectors", "The magnitude (length) of the vectors", "The sign of the result", "The number of dimensions"], answer: 1, explain: "Cosine similarity divides out both magnitudes, comparing angle/direction only." },
      { q: "In a transformer's attention, what is compared with a dot product?", options: ["Pixels against pixels", "A query vector against key vectors to score relevance", "File names against timestamps", "Learning rate against batch size"], answer: 1, explain: "Attention scores come from dot products of queries with keys, indicating how much each token should attend to others." },
    ],
  },

  {
    id: "eigen-svd",
    label: "Eigenvectors & SVD",
    cluster: "math",
    short: "Finding the axes a transformation really cares about — the math behind PCA and compression.",
    keywords: "eigenvalue eigenvector singular value decomposition pca dimensionality reduction",
    learn: {
      why: "Matrix decompositions reveal the hidden low-dimensional structure inside high-dimensional data. They power PCA (dimensionality reduction), recommendation systems, and give the deep intuition for why big models can be compressed.",
      sections: [
        { h: "Eigenvectors: the directions that don't turn", body: [
          "Most vectors get rotated when you apply a matrix. An **eigenvector** is special: the matrix only stretches or shrinks it, without changing its direction. The stretch factor is its **eigenvalue**.",
          { formula: "A·v = λ·v   (v is an eigenvector, λ its eigenvalue)" },
          "Eigenvectors expose the 'natural axes' of a transformation — the directions along which it acts simply.",
        ]},
        { h: "SVD: decomposition for any matrix", body: [
          "**Singular Value Decomposition** factors *any* matrix into three: a rotation, a scaling along axes (the **singular values**), and another rotation. The largest singular values capture the directions of greatest variance in the data.",
          "Keep only the top-k singular values and you get the best possible low-rank approximation — the mathematical core of compression and dimensionality reduction.",
        ]},
        { h: "Why AI cares", body: [
          { ul: [
            "**PCA** uses these ideas to project data onto the few directions that carry most of the information.",
            "**Recommendation** (matrix factorization) decomposes a user–item matrix into latent factors.",
            "**Model compression / LoRA** exploits the fact that large weight-update matrices are often approximately low-rank.",
          ]},
        ]},
      ],
      keyPoints: [
        "An eigenvector's direction is unchanged by its matrix; the eigenvalue is the scale factor.",
        "SVD decomposes any matrix; top singular values give the best low-rank approximation.",
        "This is the engine behind PCA, matrix-factorization recommenders, and low-rank model compression.",
      ],
      source: { title: "Gilbert Strang — Eigenvalues and SVD (MIT 18.06)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "See the eigenvalue and SVD lectures." },
    },
    quiz: [
      { q: "What is special about an eigenvector of a matrix A?", options: ["It is always the zero vector", "A only scales it, leaving its direction unchanged", "It has exactly two dimensions", "It cannot be multiplied by A"], answer: 1, explain: "By definition A·v = λv: the eigenvector's direction is preserved and it is merely scaled by λ." },
      { q: "Keeping only the largest singular values from an SVD gives you…", options: ["A random matrix", "The best low-rank approximation of the original matrix", "A larger matrix", "The inverse matrix"], answer: 1, explain: "Truncating SVD to the top-k singular values yields the optimal rank-k approximation (Eckart–Young theorem)." },
      { q: "PCA reduces dimensionality by projecting data onto…", options: ["Random directions", "The directions (principal components) of greatest variance", "The smallest eigenvalue only", "The time axis"], answer: 1, explain: "PCA keeps the top principal components — directions capturing the most variance/information." },
    ],
  },

  {
    id: "calculus-derivatives",
    label: "Calculus & Derivatives",
    cluster: "math",
    short: "The math of change — how a model measures the effect of nudging a parameter.",
    keywords: "calculus derivative slope rate of change limit function",
    learn: {
      why: "Training a model means adjusting millions of parameters to reduce error. A derivative tells you which way to nudge each parameter to make the error go down. No calculus, no learning.",
      sections: [
        { h: "Derivative = sensitivity", body: [
          "The **derivative** of a function at a point is its instantaneous rate of change — the slope of the tangent line. It answers: 'if I wiggle the input a tiny bit, how much does the output move, and in which direction?'",
          "In training, the 'function' is the **loss** (how wrong the model is) as a function of a parameter. The derivative says whether increasing that parameter raises or lowers the loss, and how steeply.",
        ]},
        { h: "From slope to learning", body: [
          "If the derivative of the loss with respect to a weight is positive, increasing that weight increases the loss — so you should decrease it. Move each parameter *against* its derivative and the loss drops. That's gradient descent in one sentence.",
          "The size of the step is the **learning rate**; the direction is set by the derivatives.",
        ]},
        { h: "Building blocks", body: [
          { ul: [
            "**Rules** (power, product, quotient) let you differentiate the arithmetic inside a model.",
            "**The chain rule** handles compositions — essential because a network is functions inside functions.",
            "**Higher derivatives** (curvature) inform advanced optimizers about how the slope itself changes.",
          ]},
        ]},
      ],
      keyPoints: [
        "A derivative measures how sensitively an output responds to a small change in an input.",
        "Training moves each parameter opposite to the derivative of the loss, shrinking the error.",
        "The chain rule is what makes derivatives usable through many stacked layers.",
      ],
      source: { title: "3Blue1Brown — Essence of Calculus", url: "https://www.3blue1brown.com/topics/calculus", note: "Visual, intuition-first introduction to derivatives." },
    },
    quiz: [
      { q: "What does the derivative of the loss with respect to a weight tell you?", options: ["The final accuracy", "How much and in which direction the loss changes as that weight changes", "The number of layers", "The dataset size"], answer: 1, explain: "It is the local sensitivity of the loss to that weight — direction and steepness of change." },
      { q: "If the derivative of the loss w.r.t. a parameter is positive, to reduce loss you should…", options: ["Increase the parameter", "Decrease the parameter", "Delete the parameter", "Do nothing"], answer: 1, explain: "Positive slope means increasing the parameter raises loss, so you move in the opposite (negative) direction." },
      { q: "Why is the chain rule essential for neural networks?", options: ["Networks avoid composition", "A network is functions composed within functions, and the chain rule differentiates compositions", "It speeds up file I/O", "It replaces matrix multiply"], answer: 1, explain: "Backpropagation is the chain rule applied through many composed layers to get each parameter's gradient." },
    ],
  },

  {
    id: "gradients",
    label: "Gradients & the Chain Rule",
    cluster: "math",
    short: "The multi-dimensional derivative that points downhill — and how it flows backward through a network.",
    keywords: "gradient partial derivative jacobian chain rule backpropagation direction",
    learn: {
      why: "A model has millions of parameters, so its 'slope' isn't one number — it's a gradient: a vector of partial derivatives, one per parameter. Backpropagation is just the chain rule computing this gradient efficiently.",
      sections: [
        { h: "The gradient", body: [
          "When a function has many inputs, its derivative is a vector called the **gradient** (∇). Each component is a **partial derivative** — how the output changes if you wiggle just that one input, holding the rest fixed.",
          "Crucially, the gradient points in the direction of **steepest increase**. To minimize loss, you step in the *opposite* direction: `−∇loss`. That single fact drives essentially all model training.",
        ]},
        { h: "The chain rule at scale", body: [
          "A network computes a long chain of operations. The chain rule says the derivative through a composition is the product of the local derivatives along the way. Applied cleverly from output back to input, this is **backpropagation**.",
          "Backprop reuses shared computations so the full gradient over millions of parameters costs about the same as one forward pass — the efficiency breakthrough that made deep learning practical.",
        ]},
        { h: "What can go wrong", body: [
          { ul: [
            "**Vanishing gradients**: repeated multiplication of small numbers shrinks signals to near zero, so early layers barely learn.",
            "**Exploding gradients**: repeated multiplication of large numbers blows up, destabilizing training (fixed with clipping/normalization).",
            "These failure modes shaped modern architecture choices (ReLU, residual connections, normalization).",
          ]},
        ]},
      ],
      keyPoints: [
        "The gradient is the vector of partial derivatives; it points toward steepest increase, so descent goes against it.",
        "Backpropagation = the chain rule applied efficiently from output back to every parameter.",
        "Vanishing/exploding gradients motivated ReLU, residual connections, and normalization.",
      ],
      source: { title: "3Blue1Brown — Backpropagation, intuitively", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", note: "Connects the chain rule to how networks actually learn." },
    },
    quiz: [
      { q: "The gradient of a multi-input function points in the direction of…", options: ["Steepest decrease", "Steepest increase", "No change", "Random noise"], answer: 1, explain: "By definition the gradient points toward steepest ascent; gradient descent therefore steps along its negative." },
      { q: "Backpropagation is essentially which mathematical rule applied efficiently?", options: ["The quadratic formula", "The chain rule", "Bayes' theorem", "The Pythagorean theorem"], answer: 1, explain: "Backprop propagates derivatives through composed layers using the chain rule, reusing intermediate results." },
      { q: "Repeatedly multiplying many small derivatives through deep layers causes…", options: ["Exploding gradients", "Vanishing gradients", "Faster convergence guaranteed", "More parameters"], answer: 1, explain: "Products of small numbers shrink toward zero, so early layers receive almost no learning signal — the vanishing gradient problem." },
    ],
  },

  {
    id: "probability",
    label: "Probability",
    cluster: "math",
    short: "Reasoning under uncertainty — and the lens through which models express confidence.",
    keywords: "probability random variable conditional independence likelihood uncertainty",
    learn: {
      why: "AI systems are almost never certain. A classifier outputs probabilities; a language model predicts the probability of the next token. Probability is the grammar of everything a model 'believes'.",
      sections: [
        { h: "Probability as belief and frequency", body: [
          "A probability is a number in [0, 1] expressing how likely an outcome is. It can mean long-run frequency ('this coin lands heads 50% of the time') or degree of belief ('70% chance it rains'). Both interpretations show up in AI.",
          "A **random variable** is a quantity whose value is uncertain; a **distribution** assigns probabilities across its possible values.",
        ]},
        { h: "Conditional probability", body: [
          "`P(A | B)` is the probability of A **given that** B happened. This is the workhorse of AI: a language model computes `P(next word | all previous words)`.",
          "Two events are **independent** if knowing one tells you nothing about the other: `P(A | B) = P(A)`. Recognizing (in)dependence is central to modeling correctly.",
        ]},
        { h: "Likelihood and learning", body: [
          "Training often means **maximum likelihood**: choose the parameters that make the observed data most probable. Minimizing cross-entropy loss (the standard for classifiers and LLMs) is exactly maximizing likelihood.",
          "This links directly to information theory: the loss measures how 'surprised' the model is by the true answer.",
        ]},
      ],
      keyPoints: [
        "Models output probabilities, not certainties; probability is how they express confidence.",
        "Conditional probability P(A|B) underlies next-token prediction and most inference.",
        "Training by maximum likelihood ≈ minimizing cross-entropy ≈ reducing the model's surprise.",
      ],
      source: { title: "Seeing Theory (Brown University)", url: "https://seeing-theory.brown.edu/", note: "A visual, interactive introduction to probability and statistics." },
    },
    quiz: [
      { q: "What does P(A | B) denote?", options: ["The probability of A and B both never happening", "The probability of A given that B has occurred", "The probability of B given A", "That A and B are independent"], answer: 1, explain: "The bar means 'given': P(A|B) is A's probability once B is known to have happened." },
      { q: "A language model predicting the next token is computing which kind of probability?", options: ["Unconditional probability of a random word", "The conditional probability of the next token given the preceding context", "The probability the GPU fails", "A fixed 50% for every word"], answer: 1, explain: "LLMs model P(next token | previous tokens), a conditional distribution over the vocabulary." },
      { q: "Two events are independent when…", options: ["They always happen together", "Knowing one gives no information about the other", "One causes the other", "They have the same probability"], answer: 1, explain: "Independence means P(A|B) = P(A): B carries no information about A." },
    ],
  },

  {
    id: "distributions",
    label: "Probability Distributions",
    cluster: "math",
    short: "The shapes uncertainty takes — Gaussian, Bernoulli, and the softmax that models output.",
    keywords: "distribution gaussian normal bernoulli softmax sampling temperature",
    learn: {
      why: "Every model output is a distribution: a classifier's softmax over classes, an LLM's distribution over the vocabulary. Understanding distributions is understanding what a model is actually saying — and how sampling from it produces varied outputs.",
      sections: [
        { h: "Common distributions", body: [
          { ul: [
            "**Bernoulli**: a single yes/no with probability p — the model for binary classification.",
            "**Categorical**: a probability over several discrete classes — what softmax produces.",
            "**Gaussian (normal)**: the bell curve; models continuous noise and appears everywhere via the Central Limit Theorem.",
            "**Uniform**: all outcomes equally likely — the baseline of 'no information'.",
          ]},
        ]},
        { h: "Softmax: turning scores into a distribution", body: [
          "A model produces raw scores (**logits**). Softmax exponentiates and normalizes them so they sum to 1, becoming a probability distribution:",
          { formula: "softmax(z)_i = e^{z_i} / Σ_j e^{z_j}" },
          "The largest logit gets the most probability, but all classes get some. This is the final step of essentially every classifier and language model.",
        ]},
        { h: "Sampling and temperature", body: [
          "To generate text, an LLM **samples** from its output distribution rather than always taking the top choice — that's why outputs vary. **Temperature** rescales the logits before softmax: low temperature sharpens the distribution (safer, repetitive); high temperature flattens it (more diverse, riskier).",
        ]},
      ],
      keyPoints: [
        "Model outputs are distributions: Bernoulli/categorical for classes, Gaussian for continuous noise.",
        "Softmax converts raw logits into a valid probability distribution that sums to 1.",
        "Sampling with temperature controls the creativity/consistency trade-off in generation.",
      ],
      source: { title: "Distribution Explorer", url: "https://distribution-explorer.github.io/", note: "Reference and intuition for the standard probability distributions." },
    },
    quiz: [
      { q: "What does the softmax function produce from a vector of logits?", options: ["A single integer label", "A probability distribution that sums to 1", "The gradient", "A sorted list only"], answer: 1, explain: "Softmax exponentiates and normalizes logits into non-negative values summing to 1 — a categorical distribution." },
      { q: "Raising the sampling temperature of an LLM tends to make outputs…", options: ["More deterministic and repetitive", "More diverse and random", "Shorter always", "Grammatically incorrect always"], answer: 1, explain: "Higher temperature flattens the distribution, spreading probability and increasing variety (and risk)." },
      { q: "Which distribution models a single binary (yes/no) outcome?", options: ["Gaussian", "Bernoulli", "Uniform over 100 values", "Exponential"], answer: 1, explain: "The Bernoulli distribution describes one trial with two outcomes and probability p of success." },
    ],
  },

  {
    id: "bayes",
    label: "Bayes' Theorem",
    cluster: "math",
    short: "How to update beliefs when new evidence arrives — the logic of learning from data.",
    keywords: "bayes theorem prior posterior likelihood evidence update inference",
    learn: {
      why: "Bayes' theorem is the mathematically correct way to revise a belief given evidence. It underpins spam filters, medical-test reasoning, Bayesian ML, and the everyday judgment of how much to trust a noisy signal.",
      sections: [
        { h: "The theorem", body: [
          "Bayes' theorem relates the probability of a hypothesis before and after seeing evidence:",
          { formula: "P(H | E) = P(E | H) · P(H) / P(E)" },
          "In words: **posterior = likelihood × prior / evidence**. Your updated belief (posterior) combines how well the hypothesis predicts the evidence (likelihood) with how plausible it was to begin with (prior).",
        ]},
        { h: "Why the prior matters", body: [
          "A classic trap: a test is '99% accurate' for a rare disease, you test positive — are you likely sick? Often not, because the disease is rare (low prior). Bayes forces you to weigh the base rate. Ignoring priors is the **base-rate fallacy**.",
        ]},
        { h: "Bayesian thinking in AI", body: [
          { ul: [
            "**Naive Bayes** classifiers apply the theorem directly (assuming feature independence) — still strong for text.",
            "**Bayesian inference** treats model parameters as distributions, capturing uncertainty rather than single point estimates.",
            "The **prior/posterior** mindset frames how any system should rationally update on new data.",
          ]},
        ]},
      ],
      keyPoints: [
        "Posterior ∝ likelihood × prior: update beliefs by combining evidence with prior plausibility.",
        "Ignoring base rates (priors) leads to the base-rate fallacy — a common reasoning error.",
        "Bayesian methods represent uncertainty explicitly as distributions over parameters.",
      ],
      source: { title: "3Blue1Brown — Bayes' theorem", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM", note: "A visual derivation and the base-rate intuition." },
    },
    quiz: [
      { q: "In Bayes' theorem, the 'prior' represents…", options: ["Your belief after seeing the evidence", "Your belief before seeing the evidence", "The accuracy of the test", "The size of the dataset"], answer: 1, explain: "The prior P(H) is the initial plausibility of the hypothesis before evidence is incorporated." },
      { q: "A very accurate test for a very rare condition returns positive. Why might you still probably not have it?", options: ["Tests are always wrong", "The low prior (rarity) means most positives can be false positives — the base-rate effect", "Bayes' theorem does not apply to medicine", "Accuracy is irrelevant"], answer: 1, explain: "When the condition is rare, even a small false-positive rate produces many false positives relative to true ones." },
      { q: "Posterior probability is proportional to…", options: ["Prior divided by likelihood", "Likelihood times prior", "Evidence times posterior", "One minus the prior"], answer: 1, explain: "Bayes: posterior ∝ likelihood × prior (dividing by the evidence normalizes it)." },
    ],
  },

  {
    id: "statistics",
    label: "Statistics & Estimation",
    cluster: "math",
    short: "Drawing trustworthy conclusions from limited, noisy data — including whether a result is real.",
    keywords: "statistics mean variance sampling estimation confidence significance p-value bias",
    learn: {
      why: "Data science and ML evaluation live or die on statistics: is this model actually better, or did we get lucky? Statistics separates real signal from noise and quantifies how sure we can be.",
      sections: [
        { h: "Describing data", body: [
          "**Mean** (average) and **median** (middle value) summarize center; **variance** and **standard deviation** summarize spread. The median resists outliers; the mean does not — choosing well matters when data is skewed.",
          "These summaries are the first thing you compute in any data analysis, and the foundation of feature scaling in ML.",
        ]},
        { h: "Samples vs. populations", body: [
          "You almost never see all the data (the **population**) — only a **sample**. Statistics is the discipline of inferring population truths from samples, and quantifying the uncertainty of doing so.",
          "The **standard error** shrinks as your sample grows, which is why more data yields more confident estimates. A **confidence interval** expresses a range the true value plausibly lies in.",
        ]},
        { h: "Is the result real?", body: [
          "**Statistical significance** asks whether an observed difference is bigger than what random chance would routinely produce. A **p-value** is the probability of seeing a result this extreme if there were truly no effect — small p-values suggest a real effect (but are widely misinterpreted).",
          "This is the backbone of **A/B testing**, the standard way products (including AI features) are evaluated.",
        ]},
      ],
      keyPoints: [
        "Mean/median for center, variance/SD for spread; median is outlier-robust.",
        "We infer populations from samples; more data shrinks the standard error and tightens confidence.",
        "Significance and p-values judge whether an effect exceeds what chance alone would produce — central to A/B testing.",
      ],
      source: { title: "Seeing Theory — Statistical Inference", url: "https://seeing-theory.brown.edu/frequentist-inference/index.html", note: "Interactive sampling, estimation, and significance." },
    },
    quiz: [
      { q: "Why is the median often preferred over the mean for skewed data?", options: ["It is faster to compute", "It is more robust to outliers", "It is always larger", "It requires no data"], answer: 1, explain: "Extreme values pull the mean but barely move the median, so the median better represents the center of skewed data." },
      { q: "A confidence interval expresses…", options: ["The exact true value", "A plausible range for the true value given sampling uncertainty", "The number of samples", "The model's accuracy"], answer: 1, explain: "It quantifies uncertainty from sampling, giving a range within which the true parameter plausibly falls." },
      { q: "A small p-value in an A/B test suggests that…", options: ["The effect is definitely huge", "The observed difference is unlikely to be due to chance alone", "The sample was too small", "The two versions are identical"], answer: 1, explain: "A small p-value means such an extreme result would be unlikely if there were no real effect — evidence against 'no difference'." },
    ],
  },

  {
    id: "optimization",
    label: "Optimization",
    cluster: "math",
    short: "Finding the parameters that minimize error — the mathematical goal of all training.",
    keywords: "optimization loss landscape minimum convex objective function global local",
    learn: {
      why: "Training a model *is* an optimization problem: define an error (loss) and search for the parameters that make it smallest. Every learning algorithm is a strategy for this search.",
      sections: [
        { h: "Objective, minimize", body: [
          "Optimization means finding the input that minimizes (or maximizes) an **objective function**. In ML the objective is the **loss** — a single number measuring how wrong the model is on the training data. Lower loss = better fit.",
          "The set of all parameter values and their losses forms a **loss landscape** — imagine a hilly surface where you're trying to reach the lowest valley.",
        ]},
        { h: "Convex vs. non-convex", body: [
          "A **convex** landscape is bowl-shaped: one global minimum, and going downhill always works. Linear/logistic regression are convex — reassuringly solvable.",
          "Deep networks are **non-convex**: many hills, valleys, saddle points, and local minima. Surprisingly, gradient descent still works well in practice, partly because in very high dimensions most 'bad' points are saddles you can escape, and many local minima are nearly as good as the global one.",
        ]},
        { h: "Why it's iterative", body: [
          "For a handful of parameters you might solve for the minimum directly. With millions, you can't — you must search **iteratively**, taking small steps downhill using gradients. This is why training is a loop of many small updates rather than a one-shot calculation.",
        ]},
      ],
      keyPoints: [
        "Training = minimizing a loss (objective) over parameters — searching a loss landscape for its lowest point.",
        "Convex problems have a single global minimum; deep learning is non-convex but works anyway.",
        "With millions of parameters the search must be iterative and gradient-guided, not solved in closed form.",
      ],
      source: { title: "Boyd & Vandenberghe — Convex Optimization", url: "https://web.stanford.edu/~boyd/cvxbook/", note: "The free reference text; skim ch.1 for the framing." },
    },
    quiz: [
      { q: "In machine learning, what is being minimized during training?", options: ["The number of parameters", "The loss (a measure of the model's error)", "The learning rate", "The dataset size"], answer: 1, explain: "Training searches for parameters that minimize the loss function — the model's total error signal." },
      { q: "What characterizes a convex optimization problem?", options: ["Many local minima and saddle points", "A single global minimum where going downhill always reaches the best solution", "No solution exists", "It requires no gradients"], answer: 1, explain: "Convex objectives are bowl-shaped with one global minimum, so gradient descent is guaranteed to find it." },
      { q: "Why is training done iteratively with small steps rather than solved directly?", options: ["To waste compute", "Because with millions of parameters there is no practical closed-form solution", "Because gradients don't exist", "Because loss is always zero"], answer: 1, explain: "High-dimensional, non-convex objectives have no closed-form minimum, so we descend iteratively using gradients." },
    ],
  },

  {
    id: "gradient-descent",
    label: "Gradient Descent",
    cluster: "math",
    short: "The step-by-step algorithm that actually trains almost every model.",
    keywords: "gradient descent learning rate stochastic sgd minibatch step convergence",
    learn: {
      why: "Gradient descent is *the* algorithm of modern AI. From logistic regression to GPT-scale models, training is overwhelmingly variations on this one loop. Understanding it is understanding how machines learn.",
      sections: [
        { h: "The loop", body: [
          "Gradient descent repeats three steps: (1) compute the loss on some data, (2) compute the gradient — the direction of steepest increase, (3) step the parameters a little in the *opposite* direction. Repeat until the loss stops improving.",
          { formula: "θ ← θ − η · ∇loss(θ)     (η is the learning rate)" },
        ]},
        { h: "The learning rate", body: [
          "The **learning rate** η sets the step size and is the single most important hyperparameter. Too large and training overshoots or diverges; too small and it crawls or gets stuck. Schedules that lower it over time (warmup then decay) are standard.",
        ]},
        { h: "Stochastic and mini-batch", body: [
          "Computing the gradient over the *entire* dataset each step is too expensive. **Stochastic gradient descent (SGD)** estimates it from one or a few examples; in practice we use **mini-batches** (e.g. 32–1024 examples). The noise in these estimates is actually helpful — it helps escape bad spots in the landscape.",
          "Modern optimizers like **Adam** improve on plain SGD by adapting the step size per parameter using running estimates of the gradient and its variance.",
        ]},
      ],
      keyPoints: [
        "Repeat: compute loss → compute gradient → step opposite the gradient. That loop is training.",
        "Learning rate is the make-or-break hyperparameter: too big diverges, too small stalls.",
        "Mini-batch SGD (and adaptive variants like Adam) make it scalable, and the batch noise aids optimization.",
      ],
      source: { title: "Andrej Karpathy — micrograd / building backprop", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", note: "Builds gradient descent and backprop from scratch, by hand." },
    },
    quiz: [
      { q: "In the update θ ← θ − η·∇loss, why is there a minus sign?", options: ["To increase the loss", "Because the gradient points uphill, so we step the opposite way to descend", "It is a typo", "To normalize the parameters"], answer: 1, explain: "The gradient points toward steepest increase; subtracting it moves parameters toward lower loss." },
      { q: "What typically happens if the learning rate is set far too high?", options: ["Training is slow but stable", "Training overshoots and can diverge instead of converging", "The model needs no data", "Nothing changes"], answer: 1, explain: "Large steps overshoot the minimum and can bounce out of the valley, causing divergence or oscillation." },
      { q: "Why do we use mini-batches instead of the full dataset for each gradient step?", options: ["To get a slower algorithm", "Full-dataset gradients are too expensive; mini-batches are cheaper and their noise even helps optimization", "Mini-batches guarantee the global minimum", "The full dataset has no gradient"], answer: 1, explain: "Mini-batches make each step affordable and add helpful stochasticity that can escape poor regions of the landscape." },
    ],
  },

  {
    id: "information-theory",
    label: "Information Theory",
    cluster: "math",
    short: "Measuring surprise, uncertainty, and the loss functions that train classifiers and LLMs.",
    keywords: "entropy cross entropy kl divergence information bits surprise loss",
    learn: {
      why: "Cross-entropy — the standard loss for classifiers and language models — comes straight from information theory. Entropy quantifies uncertainty; cross-entropy quantifies how badly a model's predicted distribution matches reality. This is the number training actually minimizes.",
      sections: [
        { h: "Entropy = average surprise", body: [
          "Information theory measures information in **bits**. A surprising (rare) event carries more information than an expected one. **Entropy** is the average surprise of a distribution — high when outcomes are uncertain/uniform, low when one outcome dominates.",
          "A fair coin has 1 bit of entropy; a two-headed coin has 0 (no surprise). This formalizes 'how uncertain am I?'",
        ]},
        { h: "Cross-entropy: the loss function", body: [
          "**Cross-entropy** measures the average surprise of the true outcomes *under the model's predicted distribution*. If the model confidently predicts the right answer, cross-entropy is low; if it's confidently wrong, it's high.",
          "Minimizing cross-entropy is exactly what training a classifier or LLM does — it pushes the model's predicted probabilities toward the truth. It's equivalent to maximum likelihood.",
        ]},
        { h: "KL divergence", body: [
          "**KL divergence** measures how far one distribution is from another — the extra surprise from using the wrong distribution. It appears throughout AI: in **RLHF** (keeping a fine-tuned model close to the original), in variational methods, and in model distillation.",
        ]},
      ],
      keyPoints: [
        "Entropy = average surprise/uncertainty of a distribution, measured in bits.",
        "Cross-entropy loss penalizes confident wrong predictions and is what classifiers/LLMs minimize.",
        "KL divergence measures the gap between two distributions — used in RLHF, distillation, and variational methods.",
      ],
      source: { title: "Claude Shannon — A Mathematical Theory of Communication", url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf", note: "The founding 1948 paper; even skimming the intro is worthwhile." },
    },
    quiz: [
      { q: "Entropy is highest when a distribution is…", options: ["Concentrated on one certain outcome", "Spread out / uniform across many equally likely outcomes", "Empty", "Negative"], answer: 1, explain: "Maximum uncertainty (uniform outcomes) means maximum average surprise, hence maximum entropy." },
      { q: "What does cross-entropy loss heavily penalize?", options: ["Being confidently correct", "Being confidently wrong", "Making no prediction", "Using a GPU"], answer: 1, explain: "Cross-entropy grows large when the model assigns high probability to the wrong answer — confident mistakes cost the most." },
      { q: "In RLHF, KL divergence is commonly used to…", options: ["Increase the learning rate", "Keep the fine-tuned model from drifting too far from the original model", "Delete training data", "Measure GPU temperature"], answer: 1, explain: "A KL penalty constrains the updated policy to stay close to the reference model, preventing reward hacking and collapse." },
    ],
  },
]);
