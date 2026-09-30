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
      { q: "Why does a deep network need non-linear activations between its matrix layers?", options: ["Matrix multiplication only works on positive numbers", "Stacked linear layers collapse into a single layer", "Non-linearity makes each layer multiply faster", "Linear layers can't handle more than two dimensions"], answer: 1, explain: "Composing linear maps gives another linear map, so without non-linearity a hundred layers act like one. Activations are what give depth its power." },
      { q: "In a neural-network layer, what does the weight matrix do to the incoming vector?", options: ["Sorts its numbers from largest to smallest", "Stores it for later lookup by the model", "Converts it into a single probability", "Applies a linear transformation to it"], answer: 3, explain: "A matrix encodes a linear transformation: multiplying by it moves, rotates, scales or projects the vector into a new space." },
      { q: "A function f satisfies f(a + b) = f(a) + f(b) and f(c·a) = c·f(a). What does that make it?", options: ["Non-linear", "Random", "Linear", "Recursive"], answer: 2, explain: "Preserving addition and scaling is the definition of linearity, and it's what makes linear maps predictable to compose and analyze." },
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
      { q: "Two document embeddings point in the same direction, but one is much longer. For semantic search, how similar are they?", options: ["Not similar, since their lengths differ", "Very similar; direction carries the meaning", "Impossible to tell without a third vector", "Similar only if both lengths equal one"], answer: 1, explain: "In embeddings, direction usually carries the meaning and magnitude is secondary, which is why cosine similarity (the angle) is so common." },
      { q: "What is the L2 norm (length) of the vector [3, 4]?", options: ["7", "12", "5", "25"], answer: 2, explain: "The L2 norm is √(3² + 4²) = √25 = 5. Seven is the plain sum of the components, and 25 is the squared length." },
      { q: "Why do embedding spaces use hundreds or thousands of dimensions?", options: ["Computers can only store vectors of that size", "Fewer dimensions would make vectors too long", "Each dimension stores one specific word", "More dimensions leave room to separate concepts"], answer: 3, explain: "High dimensions give capacity to place many concepts and relationships distinctly, though they also bring the curse of dimensionality." },
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
      { q: "A weight matrix is 512×1024. What does it do to vectors?", options: ["Maps 512-dimensional inputs to 1024-dimensional outputs", "Maps 1024-dimensional inputs to 512-dimensional outputs", "Stores 512 separate vectors of length 1024 for lookup", "Sorts inputs into 512 groups of 1024 items each"], answer: 1, explain: "An m×n matrix maps n-dimensional vectors to m-dimensional ones, so here 1024 inputs become 512 outputs." },
      { q: "You apply transformation A, then transformation B. Which single matrix does the same thing?", options: ["A·B", "B·A", "A + B", "A − B"], answer: 1, explain: "Composition is multiplication, applied right to left: first A, then B, gives B·A. Order matters, since matrix multiplication isn't commutative." },
      { q: "You double the batch size and the number of output units in a layer (inputs unchanged). Roughly how does the layer's matmul compute change?", options: ["It doubles", "It stays the same", "It halves", "It quadruples"], answer: 3, explain: "Matmul cost scales with the product of the dimensions (batch × inputs × outputs), so doubling two of them multiplies compute by four. Shapes drive cost." },
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
      { q: "Two non-zero vectors have a dot product of zero. What does that say about them?", options: ["They're identical and point the same way", "At least one of them must be all zeros", "They're perpendicular: unrelated directions", "They point in exactly opposite directions"], answer: 2, explain: "The dot product equals ‖a‖‖b‖cos θ. Zero means cos θ = 0, a 90° angle, so the vectors are orthogonal. Opposite directions give a negative value." },
      { q: "In a transformer, what is the dot product used for?", options: ["Converting tokens from text into numbers", "Scoring how relevant each key is to a query", "Choosing the learning rate for each layer", "Counting how many tokens are in the prompt"], answer: 1, explain: "Attention dots each query against every key to score relevance. Those scores, after softmax, weight the values." },
      { q: "Why is cosine similarity usually preferred over the raw dot product for comparing embeddings?", options: ["It is always larger than the dot product", "It works without multiplying any numbers", "It only returns whole numbers from 0 to 10", "It compares direction only, not length"], answer: 3, explain: "Dividing by both lengths leaves cos θ, from −1 to 1, so long and short vectors pointing the same way count as equally similar." },
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
      { q: "Applying matrix A to vector v gives exactly 3v. What is v?", options: ["The inverse of A multiplied by three", "An eigenvector of A with eigenvalue 3", "A vector that A rotates by 3 degrees", "The third column of the matrix A"], answer: 1, explain: "A·v = λ·v means A only scales v, without changing its direction. So v is an eigenvector, and λ = 3 is its eigenvalue." },
      { q: "Keeping only the top-k singular values of a matrix gives you…", options: ["The k largest numbers stored in the matrix", "A matrix that is exactly k times smaller", "The best rank-k approximation of that matrix", "The first k rows of the original matrix"], answer: 2, explain: "SVD orders directions by importance; truncating to the top k gives the best possible low-rank approximation, the core of compression and PCA." },
      { q: "Why can LoRA fine-tune a huge model with only a few new parameters?", options: ["It only updates the model's first layer", "It deletes most of the original weights", "Eigenvalues make the model file smaller", "Weight updates are often close to low-rank"], answer: 3, explain: "Large weight-update matrices are often approximately low-rank, so they can be represented as the product of two thin matrices." },
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
      { q: "The derivative of the loss with respect to a weight is +2.5. What should gradient descent do to that weight?", options: ["Increase it", "Decrease it", "Set it to 2.5", "Leave it unchanged"], answer: 1, explain: "A positive derivative means increasing the weight raises the loss, so step the opposite way: move each parameter against its derivative." },
      { q: "What does a derivative measure?", options: ["The total area under a function's curve", "The largest value the function ever reaches", "The average of all of the function's outputs", "How much the output moves when the input nudges"], answer: 3, explain: "A derivative is the instantaneous rate of change, the slope: how sensitively the output responds to a tiny change in the input." },
      { q: "Why is the chain rule essential for training neural networks?", options: ["It removes the need to compute derivatives", "It only applies to the network's last layer", "A network is functions nested inside functions", "It makes the loss function convex"], answer: 2, explain: "Networks compose many functions. The chain rule gives the derivative of a composition as the product of the local derivatives along the way." },
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
      { q: "In which direction does the gradient of the loss point?", options: ["Toward the steepest decrease in loss", "Toward the nearest local minimum", "Toward the steepest increase in loss", "Toward the origin of parameter space"], answer: 2, explain: "The gradient points toward the steepest increase, which is why training steps in the opposite direction, −∇loss." },
      { q: "The early layers of a very deep network barely learn, because their gradients are near zero. What's this called?", options: ["Exploding gradients", "Vanishing gradients", "Overfitting", "Data leakage"], answer: 1, explain: "Multiplying many small local derivatives shrinks the signal toward zero. ReLU, residual connections and normalization were adopted partly to fix this." },
      { q: "Training becomes unstable as gradients suddenly become enormous. What's a standard fix?", options: ["Removing the loss function", "Adding more layers", "Using a larger learning rate", "Gradient clipping"], answer: 3, explain: "Exploding gradients destabilize training. Clipping caps their size, and normalization helps keep signals in range." },
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
      { q: "A language model computes P(next word | previous words). What kind of probability is that?", options: ["An independent probability", "A conditional probability", "A uniform probability", "A joint probability of all words"], answer: 1, explain: "P(A | B) is the probability of A given B. Next-token prediction is exactly this: the next word, given everything before it." },
      { q: "Knowing it's raining doesn't change the chance of a coin landing heads. What does that mean?", options: ["The two events are mutually exclusive", "The coin has a 100% chance of heads", "The two events are independent", "Rain causes the coin to land heads"], answer: 2, explain: "Independence means P(A | B) = P(A): knowing one event tells you nothing about the other." },
      { q: "Training a classifier by minimizing cross-entropy is equivalent to…", options: ["Minimizing the number of model parameters", "Making all predicted probabilities equal", "Maximizing the model's training speed", "Maximizing the likelihood of the labels"], answer: 3, explain: "Maximum likelihood picks the parameters that make the observed data most probable; minimizing cross-entropy is exactly that." },
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
      { q: "What does softmax do to a model's raw scores (logits)?", options: ["Sorts them and keeps only the highest one", "Rounds each of them to the nearest integer", "Turns them into probabilities that sum to 1", "Sets every negative score equal to zero"], answer: 2, explain: "Softmax exponentiates and normalizes the logits into a valid probability distribution. The largest gets the most probability, but every class gets some." },
      { q: "You lower the sampling temperature from 1.0 to 0.2. What happens to the output distribution?", options: ["It flattens, so outputs get more varied and risky", "It sharpens, so outputs get safer and more repetitive", "It stays the same; temperature affects only speed", "It becomes uniform across the whole vocabulary"], answer: 1, explain: "Temperature rescales the logits before softmax. Low temperature sharpens the distribution toward the top choices; high temperature flattens it." },
      { q: "A binary spam classifier outputs 'spam' with probability p. Which distribution describes that output?", options: ["Gaussian", "Uniform", "Categorical over 10 classes", "Bernoulli"], answer: 3, explain: "A single yes/no outcome with probability p is a Bernoulli distribution. Categorical covers several classes; Gaussian models continuous values." },
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
      { q: "A disease affects 1 in 1,000 people. A test is 99% accurate, and you test positive. What's most likely true?", options: ["You're 99% likely to have the disease", "You're probably still healthy; it's so rare", "The test result is meaningless and random", "You're exactly 50% likely to have the disease"], answer: 1, explain: "With a 1-in-1,000 base rate, false positives among the 999 healthy people far outnumber the true positives. Ignoring the prior is the base-rate fallacy." },
      { q: "In Bayes' theorem, what is the prior?", options: ["How well the evidence fits the hypothesis", "The updated belief after seeing the evidence", "The total probability of the evidence itself", "How plausible the hypothesis was beforehand"], answer: 3, explain: "Posterior = likelihood × prior / evidence. The prior is your starting plausibility; the likelihood is how well the hypothesis predicts the evidence." },
      { q: "How do Bayesian methods treat a model's parameters?", options: ["As fixed values chosen once, with no uncertainty", "As random noise that should be ignored", "As distributions that capture uncertainty", "As labels that must be provided by humans"], answer: 2, explain: "Bayesian inference represents parameters as probability distributions rather than single point estimates, so uncertainty is explicit." },
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
      { q: "Household incomes in your sample are heavily skewed by a few billionaires. Which statistic best describes a typical household?", options: ["The mean", "The median", "The maximum", "The variance"], answer: 1, explain: "The median resists outliers; a few extreme values drag the mean far from what's typical." },
      { q: "You quadruple your sample size. What happens to the standard error of your estimate?", options: ["It quadruples", "It stays the same", "It roughly halves", "It doubles"], answer: 2, explain: "Standard error shrinks with the square root of the sample size, so four times the data halves it. More data, tighter estimates." },
      { q: "An A/B test gives p = 0.03. What does that mean?", options: ["There is a 3% chance the new version is better", "The new version is 3% better than the old one", "There is a 97% chance the change caused the effect", "Results this extreme are rare if there's no effect"], answer: 3, explain: "A p-value is the probability of a result at least this extreme if there were truly no effect. It isn't the probability that the change works, a very common misreading." },
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
      { q: "Why does logistic regression reliably reach its best solution, while deep networks may not?", options: ["It uses far more training data than deep nets", "Its loss is convex, with a single global minimum", "Deep networks have no loss function at all", "Logistic regression never uses gradients"], answer: 1, explain: "A convex, bowl-shaped loss has one global minimum, so going downhill always works. Deep networks are non-convex, yet still train well in practice." },
      { q: "Why is a model with millions of parameters trained iteratively rather than solved in one step?", options: ["Iteration always finds the global minimum", "One-step solutions are banned in ML libraries", "The loss changes each time you look at it", "Solving directly isn't feasible at that scale"], answer: 3, explain: "With millions of parameters there's no practical closed-form solution, so training takes many small, gradient-guided steps downhill." },
      { q: "Gradient descent on a deep network rarely gets permanently stuck. What's part of the reason?", options: ["Deep network losses are always perfectly convex", "The learning rate automatically becomes zero", "Most bad points in high dimensions are saddles", "Every local minimum is exactly the global one"], answer: 2, explain: "In very high dimensions most bad critical points are saddle points you can escape, and many local minima are nearly as good as the global one." },
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
      { q: "Your training loss bounces around wildly, then shoots up to infinity. What's the most likely culprit?", options: ["The learning rate is far too low", "The learning rate is far too high", "The batch size is exactly 32", "The loss function is convex"], answer: 1, explain: "Steps that are too large overshoot the minimum and can diverge. Lower the learning rate, or add a warmup and decay schedule." },
      { q: "In θ ← θ − η·∇loss, why is there a minus sign?", options: ["It keeps every parameter value negative over time", "It cancels out the effect of the learning rate", "It makes each new step larger than the last one", "The gradient points uphill; we step the other way"], answer: 3, explain: "The gradient points toward the steepest increase in loss, so subtracting it moves the parameters downhill." },
      { q: "Why train on mini-batches rather than the full dataset at each step?", options: ["Mini-batches always reach the global minimum", "The full dataset doesn't have a gradient", "Steps are cheaper, and the noise helps escape", "Mini-batches remove the need for a learning rate"], answer: 2, explain: "Full-dataset gradients are expensive. Mini-batch estimates make each step affordable, and their noise helps escape poor regions of the loss landscape." },
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
      { q: "Which has the higher entropy: a fair coin, or a coin that lands heads 99% of the time?", options: ["The 99% heads coin", "They're equal", "The fair coin", "Neither has any entropy"], answer: 2, explain: "Entropy is average surprise. A fair coin is maximally uncertain (1 bit); a coin that almost always lands heads is rarely surprising." },
      { q: "A classifier puts 95% probability on the wrong class. How does cross-entropy loss respond?", options: ["The loss is zero, since it made a confident call", "The loss is high; confident mistakes are punished", "The loss is low, since 95% is a high probability", "Cross-entropy ignores how confident a model was"], answer: 1, explain: "Cross-entropy measures surprise at the true answer under the model's prediction. Confidently wrong means a tiny probability on the truth, and so a large loss." },
      { q: "In RLHF, what is a KL-divergence penalty used for?", options: ["Making the reward model train much faster", "Shrinking the tokenizer's vocabulary size", "Increasing the model's context window", "Keeping the tuned model near the original"], answer: 3, explain: "KL divergence measures how far one distribution is from another. In RLHF it stops the fine-tuned model drifting too far from where it started." },
    ],
  },
]);
