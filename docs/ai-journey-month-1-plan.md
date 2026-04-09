# Month 1: 30-Day Blog Plan — Senior Engineer Edition

**For:** 10-year SE (Android/Java/Kotlin, knows Python) | ~80 hours | ~14 blog posts | 4 projects

**Philosophy:** You don't need tutorials on what a list is. You need to rewire your thinking from deterministic software to probabilistic data. This plan skips beginner overhead and focuses on the paradigm shifts, the "why," and the depth that interviews actually test.

---

## Week 1: The Data Manipulation Stack (Speed Run)

> You already code in Python. This week is about mastering the *declarative, vectorized* paradigm that replaces imperative loops — and building muscle memory with the tools you'll use every single day.

### Day 1 — NumPy Internals: Why Vectorization Matters
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Memory layout: C-contiguous vs Fortran-order, strides, and why it matters for performance
- Vectorization internals — how NumPy dispatches to BLAS/LAPACK
- Broadcasting rules and their edge cases (not just the happy path)
- Views vs copies — the subtle bugs that bite experienced devs
- Structured arrays and memory-mapped files for large datasets

**What to Do & Blog:**
Benchmark: implement matrix multiplication 4 ways (nested Python loops, list comprehension, NumPy `@`, and `np.einsum`). Profile memory allocation with `tracemalloc`. Blog: "What 10 years of Java taught me about why NumPy is fast — and it's not what you think."

**Resources:**
- NumPy internals docs: numpy.org/doc/stable/reference/internals.html
- Scott Sievert — "NumPy Internals" (blog)

---

### Day 2 — Pandas: Think in Transformations, Not Loops
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- The mental model shift: DataFrames are not ORM entities — they're lazy transformation pipelines
- Index alignment (the silent source of most pandas bugs)
- `.loc` vs `.iloc` vs `[]` — when each silently returns a copy vs view
- Method chaining with `.pipe()`, `.assign()`, `.query()` for clean data pipelines
- `SettingWithCopyWarning` — actually understand it, don't just suppress it

**What to Do & Blog:**
Load a complex dataset (NYC Taxi or Stack Overflow Survey). Write the same analysis twice: once with loops and iterrows (the "Java way"), once with vectorized pandas. Profile both. Blog: "The hardest part of pandas isn't syntax — it's unlearning imperative thinking."

**Resources:**
- Wes McKinney — Python for Data Analysis, Ch 5–8 (free: wesmckinney.com/book)
- Tom Augspurger — "Modern Pandas" blog series

---

### Day 3 — Advanced Pandas: GroupBy, Window Functions & Reshaping
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- `groupby` internals — split-apply-combine and custom aggregation with `.agg()`, `.transform()`, `.apply()`
- Window functions: `.rolling()`, `.expanding()`, `.ewm()` — the pandas equivalent of SQL window functions
- Reshaping: `pivot_table()`, `melt()`, `stack()`/`unstack()`, `crosstab()`
- MultiIndex — when it helps, when it's a trap
- Performance: when to use `groupby` vs `pivot_table` vs manual vectorization

**What to Do & Blog:**
Analyze a financial or time-series dataset. Compute rolling 7-day averages, YoY growth rates, and ranked percentiles within groups — all without loops. Blog: "GroupBy and window functions — SQL thinking in pandas."

**Resources:**
- Kaggle micro-course: Pandas (skim, fill gaps only)
- pandas docs on GroupBy: pandas.pydata.org/docs/user_guide/groupby.html

---

### Day 4 — Pandas Performance & Scaling Beyond RAM
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Why `iterrows()` is 100x slower and what to use instead (`apply` vs vectorized vs `np.where`)
- Category dtype — reduce memory 90% for string columns
- Chunked reading with `chunksize` parameter
- When pandas isn't enough: Polars (Rust-based, 10–100x faster), Dask, Vaex
- Arrow-backed DataFrames in pandas 2.x

**What to Do & Blog:**
Take a 1GB+ dataset (NYC Taxi full year). Optimize memory usage from default to minimal. Compare pandas vs Polars on the same aggregation. Blog: "Pandas at scale — what to do when your DataFrame doesn't fit in RAM."

**Resources:**
- Polars user guide: docs.pola.rs
- pandas 2.x Arrow backend docs

---

### Day 5 — Data Cleaning Patterns for Production
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Missing data mechanisms: MCAR, MAR, MNAR — why the *reason* data is missing matters more than the fix
- Imputation strategies beyond mean/median: KNN imputation, iterative imputation, domain-specific rules
- Outlier detection: IQR method, Z-scores, Isolation Forest (preview of ML)
- Data validation frameworks: `pandera`, `great_expectations` — think of them as unit tests for data
- Encoding strategies for categorical data: one-hot, ordinal, target encoding, and when each fails

**What to Do & Blog:**
Take Kaggle's "House Prices" dataset (deliberately messy). Build a systematic cleaning pipeline as a reusable Python class — not a notebook dump. Validate with pandera schemas. Blog: "Data cleaning as software engineering — schemas, tests, and pipelines."

**Resources:**
- Kaggle micro-course: Data Cleaning (skim for concepts)
- pandera docs: pandera.readthedocs.io

---

### Day 6 — EDA as a Discipline, Not Random Plotting
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Structured EDA framework: univariate → bivariate → multivariate (systematic, not ad hoc)
- The questions to ask before any visualization: distribution? relationship? composition? comparison?
- Seaborn for statistical plots: `pairplot`, `jointplot`, `FacetGrid`, violin/box/swarm
- Plotly for interactive exploration: hover data, zoom, filter
- When to use which: matplotlib (publication), seaborn (statistical), plotly (exploration/stakeholders)

**What to Do & Blog:**
Full structured EDA on the Stack Overflow 2024 Developer Survey. Profile every column systematically, find 3 non-obvious insights, create 12+ visualizations across all 3 libraries. Blog: "A framework for EDA — stop randomly plotting things."

**Resources:**
- seaborn gallery: seaborn.pydata.org/examples
- Plotly Express: plotly.com/python/plotly-express

---

### Day 7 — Week 1 Project: Production-Grade EDA Pipeline
**Type:** Project | **Time:** 5h

**What to Do & Blog:**
Build a reusable EDA toolkit as a Python package (not a notebook). Classes for: `DataProfiler` (auto-generates summary stats, missing data report, dtype analysis), `DistributionAnalyzer` (plots + normality tests for all numeric cols), `RelationshipMapper` (correlation matrix, pairplots, categorical vs numeric comparisons). Apply it to 2 different datasets to prove it generalizes. Push to GitHub with proper `pyproject.toml`, tests, and a README with example output. Blog: "I built an EDA toolkit because notebooks aren't software."

---

## Week 2: Statistics That Actually Matter for ML

> You're not getting a stats degree — you're building the intuition to choose the right model, interpret results correctly, and not embarrass yourself in interviews. Focus on the concepts that directly drive ML decisions.

### Day 8 — Probability Distributions & Why They're the Foundation of ML
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- Normal, Binomial, Poisson, Exponential, Beta — not just definitions but *when each models real phenomena*
- Central Limit Theorem — why it lets you use normal-based methods even on non-normal data
- Maximum Likelihood Estimation (MLE) — the optimization behind every ML training loop
- Log-likelihood — why ML uses log-loss, not raw probability
- KL Divergence — measuring how different two distributions are (foundation of many loss functions)

**What to Do & Blog:**
Implement MLE from scratch for a normal distribution: given data, estimate μ and σ by maximizing log-likelihood using `scipy.optimize.minimize`. Compare to closed-form solution. Blog: "MLE explained — every ML model is secretly doing this."

**Resources:**
- StatQuest: MLE, Normal Distribution (youtube.com/statquest)
- *Mathematics for Machine Learning* Ch 6 (free: mml-book.github.io)

---

### Day 9 — Hypothesis Testing, p-Values & The Mistakes Everyone Makes
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- p-value is NOT "probability the null is true" — the correct interpretation
- Type I vs Type II errors mapped to ML: false positives vs false negatives, precision vs recall
- Multiple comparison problem — why testing 20 features guarantees false discoveries
- Bonferroni correction, FDR (Benjamini-Hochberg)
- Effect size vs statistical significance — a significant result can be useless

**What to Do & Blog:**
Demonstrate the multiple comparison problem: generate 20 random (null) features, test each against a target, show that ~1 will be "significant" by chance. Blog: "p-value hacking — why I almost fooled myself with statistics."

**Resources:**
- StatQuest: p-values, FDR
- Alex Reinhart — *Statistics Done Wrong* (free online)

---

### Day 10 — Bayesian Thinking & A/B Testing Done Right
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- Bayes' theorem applied: spam filters, medical diagnosis, recommendation priors
- Conjugate priors — Beta-Binomial for conversion rates (the workhorse of A/B testing)
- Bayesian A/B testing vs frequentist — why Bayesian often makes more business sense
- Credible intervals vs confidence intervals
- Thompson Sampling — the bandit approach to A/B testing (used by Netflix, Google)

**What to Do & Blog:**
Implement Bayesian A/B testing from scratch: two button variants, simulated click data, Beta posterior updating, plot evolving posteriors over time. Compare to a frequentist z-test on the same data. Blog: "Bayesian A/B testing — what Firebase doesn't tell you."

**Resources:**
- Think Bayes by Allen Downey (free: allendowney.github.io/ThinkBayes2)
- Cam Davidson-Pilon — *Bayesian Methods for Hackers* (free on GitHub)

---

### Day 11 — Linear Algebra for ML: The Computation Engine
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- Why every ML algorithm reduces to matrix operations
- Eigendecomposition — the math behind PCA (dimensionality reduction)
- SVD (Singular Value Decomposition) — powers recommendation systems and image compression
- Gradient as a vector — the geometric intuition behind gradient descent
- Computational graphs — how PyTorch/TensorFlow actually compute gradients (autograd)

**What to Do & Blog:**
Implement PCA from scratch: compute covariance matrix → eigendecomposition → project to lower dimensions. Apply to MNIST digits (784D → 2D) and visualize clusters. Compare to `sklearn.decomposition.PCA`. Blog: "PCA from scratch — the linear algebra that powers dimensionality reduction."

**Resources:**
- 3Blue1Brown: Essence of Linear Algebra (full series)
- *Mathematics for Machine Learning* Ch 2–4 (free)

---

### Day 12 — Calculus & Optimization: How Models Actually Learn
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- Partial derivatives and the gradient vector
- Gradient descent: batch, stochastic (SGD), mini-batch — the core training loop of all ML
- Learning rate — why it's the most important hyperparameter
- Convexity — why linear regression has one minimum but neural networks have millions
- Adam optimizer — the default in deep learning and why

**What to Do & Blog:**
Implement gradient descent from scratch for linear regression: randomly initialize weights, compute MSE loss, calculate gradient analytically, update weights, plot the loss curve converging. Then implement SGD and compare convergence speed. Blog: "Gradient descent — the 10 lines of code that train every AI model."

**Resources:**
- 3Blue1Brown: Gradient Descent, Neural Networks series
- Andrew Ng's ML Specialization Week 1 (Coursera, audit free)

---

### Day 13 — Information Theory: Entropy, Cross-Entropy & Why Your Model Uses Log-Loss
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Shannon entropy — measuring uncertainty/surprise in data
- Cross-entropy — the loss function for classification (and why, not just how)
- KL divergence — measuring how far your model's predictions are from truth
- Information gain — how decision trees choose splits
- Connection: cross-entropy loss ↔ MLE ↔ minimizing KL divergence (they're the same thing)

**What to Do & Blog:**
Implement a decision tree split criterion from scratch using information gain. Compare to Gini impurity. Show they usually agree but sometimes don't. Blog: "Entropy explained — from information theory to decision trees in 50 lines of Python."

**Resources:**
- StatQuest: Entropy, Information Gain, Cross-Entropy
- *Elements of Statistical Learning* Ch 9 (free: hastie.su.domains/ElemStatLearn)

---

### Day 14 — Week 2 Project: Statistical Analysis That Tells a Story
**Type:** Project | **Time:** 5h

**What to Do & Blog:**
Pick a business question with real stakes. Suggested: "What factors most predict employee attrition?" (IBM HR Analytics dataset on Kaggle). Apply the full statistical toolkit: distributions, hypothesis tests with effect sizes, Bayesian estimation, PCA for exploration, correlation analysis with multiple comparison corrections. Structure it as a consulting report — executive summary, methodology, findings, recommendations. Deploy as a Streamlit app. Blog: "Statistical analysis as a senior engineer — rigor over ritual."

---

## Week 3: From Statistics to Machine Learning

> This is the bridge week. You go from understanding data to predicting with it. The goal: understand the ML workflow deeply enough that Month 2 (scikit-learn mastery) is execution, not learning.

### Day 15 — The ML Mental Model: How It Differs from Software
**Type:** Concept | **Time:** 3h

**What to Learn:**
- The fundamental paradigm shift: you don't write rules, you learn them from data
- Supervised vs unsupervised vs reinforcement learning — taxonomy and when each applies
- Training vs inference — the two phases of every ML system
- Overfitting vs underfitting — the central tension (bias-variance tradeoff)
- The ML workflow: data → features → train → evaluate → deploy → monitor → retrain
- Why "accuracy" is almost never the right metric

**What to Do & Blog:**
Map ML concepts to Android/SWE analogies: training ≈ compilation, inference ≈ runtime, overfitting ≈ hardcoding test cases, hyperparameters ≈ build config, validation set ≈ QA environment. Blog: "ML for software engineers — a mental model translation guide."

**Resources:**
- Google ML Crash Course: Introduction (developers.google.com/machine-learning/crash-course)

---

### Day 16 — Linear Regression from Scratch (Not sklearn.fit)
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- The closed-form solution (Normal Equation) and why it connects to linear algebra
- Gradient descent solution (you built this on Day 12 — now apply to real data)
- Feature scaling — why gradient descent fails without it
- Polynomial features — fitting non-linear data with a linear model
- Regularization: L1 (Lasso), L2 (Ridge), ElasticNet — the tradeoff between fit and simplicity
- Assumptions of linear regression and what happens when they're violated

**What to Do & Blog:**
Implement linear regression 3 ways: Normal Equation, batch gradient descent, and SGD. Add L2 regularization from scratch. Apply to California Housing. Plot learning curves, residuals, and regularization path. Compare to `sklearn.LinearRegression`. Blog: "Linear regression from scratch — 3 implementations and what each teaches you."

**Resources:**
- Andrew Ng ML Specialization Course 1, Weeks 1–2
- *Hands-On ML* by Géron, Ch 4

---

### Day 17 — Logistic Regression & Classification Metrics
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- Sigmoid function — squashing linear output to probability
- Binary cross-entropy loss — why MSE fails for classification
- Decision boundary — the geometric interpretation
- Metrics that matter: confusion matrix, precision, recall, F1, AUC-ROC, PR curves
- When to optimize for precision vs recall (spam filter vs cancer detection)
- Threshold tuning — precision-recall tradeoff in practice

**What to Do & Blog:**
Implement logistic regression from scratch with gradient descent. Train on Titanic dataset. Plot the ROC curve and precision-recall curve manually. Show how changing the threshold changes precision/recall. Blog: "Classification metrics — why accuracy is lying to you."

**Resources:**
- StatQuest: Logistic Regression, ROC/AUC
- *Hands-On ML* by Géron, Ch 3

---

### Day 18 — Decision Trees & The Path to Ensemble Methods
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- How trees split: Gini impurity vs information gain (you built this Day 13)
- Tree depth, min samples, pruning — controlling overfitting
- Why single trees overfit but are highly interpretable
- Random Forests — bagging + feature randomness = variance reduction
- Gradient Boosting — sequential error correction (XGBoost, LightGBM)
- Why gradient-boosted trees win most tabular data competitions

**What to Do & Blog:**
Train a decision tree, visualize it with `sklearn.tree.plot_tree`. Show overfitting. Then train a Random Forest and XGBoost on the same data. Compare with learning curves. Blog: "From one tree to a forest to XGBoost — the evolution of the most practical ML algorithm."

**Resources:**
- StatQuest: Decision Trees, Random Forest, XGBoost (full series)
- *Hands-On ML* by Géron, Ch 6–7

---

### Day 19 — Model Evaluation: Cross-Validation, Leakage & Selection
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- K-fold cross-validation — why a single train/test split is unreliable
- Stratified K-fold — preserving class balance
- Data leakage — the #1 reason models fail in production (and it's subtle)
- Common leakage patterns: scaling before splitting, using future data, target leakage
- Model selection workflow: cross-validate multiple models → pick best → final test evaluation
- Nested cross-validation for unbiased model comparison

**What to Do & Blog:**
Demonstrate data leakage: scale the entire dataset first (wrong) vs scale within CV folds (right). Show the inflated accuracy from leakage. Blog: "Data leakage — the silent killer of ML projects (with a live demo)."

**Resources:**
- *Hands-On ML* by Géron, Ch 2 (end-to-end project)
- sklearn docs on cross-validation

---

### Day 20 — Feature Engineering: Where Domain Knowledge Meets ML
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Feature engineering > model selection (the dirty truth of applied ML)
- Numerical transforms: log, sqrt, binning, polynomial interactions
- Categorical encoding: one-hot, ordinal, target encoding, frequency encoding
- Datetime features: day-of-week, month, is_holiday, time_since_event
- Text features: TF-IDF, count vectors (preview — deep NLP comes in Month 4)
- sklearn `Pipeline` and `ColumnTransformer` — reproducible preprocessing

**What to Do & Blog:**
Take a raw dataset (Airbnb listings or used car prices). Engineer 15+ features from existing columns. Show the model performance improvement from raw features → engineered features. Blog: "Feature engineering is 80% of ML — here's the 20% that matters most."

**Resources:**
- *Feature Engineering and Selection* by Kuhn & Johnson (free: bookdown.org/max/FES)
- Kaggle "Feature Engineering" micro-course

---

### Day 21 — Week 3 Project: End-to-End ML Pipeline (No Notebooks)
**Type:** Project | **Time:** 6h

**What to Do & Blog:**
Build a complete ML prediction project as **production-quality Python code** (not a notebook): data loading → cleaning → feature engineering → model training (compare 3+ algorithms) → evaluation → prediction API. Use sklearn `Pipeline` for the full workflow. Structure as a proper Python project with `src/`, `tests/`, `configs/`. Use `pytest` for model tests (e.g., assert accuracy > baseline, assert no data leakage). Push to GitHub with CI via GitHub Actions. Blog: "My first ML project — written like a software engineer, not a data scientist."

---

## Week 4: Advanced Topics & Month 1 Capstone

> You're now dangerous. This week adds the advanced concepts that separate strong candidates from average ones, and your capstone proves it.

### Day 22 — Unsupervised Learning: Clustering & Dimensionality Reduction
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- K-means: algorithm, elbow method, silhouette score, limitations (assumes spherical clusters)
- DBSCAN: density-based clustering, handles irregular shapes, identifies outliers
- t-SNE and UMAP: visualization of high-dimensional data (not for modeling, only visualization)
- PCA revisited: variance explained ratio, choosing n_components, reconstruction error
- Use cases: customer segmentation, anomaly detection, data exploration

**What to Do & Blog:**
Cluster a customer dataset (Mall Customers or an e-commerce dataset). Compare K-means vs DBSCAN. Visualize clusters with PCA + UMAP. Create customer personas from cluster profiles. Blog: "Customer segmentation from scratch — clustering as a business tool."

**Resources:**
- *Hands-On ML* by Géron, Ch 8–9
- StatQuest: K-means, DBSCAN, t-SNE

---

### Day 23 — SQL for Analytics: Window Functions & Interview-Ready Queries
**Type:** Deep Dive | **Time:** 4h

**What to Learn:**
- You know basic SQL (Room/SQLite). Level up to analytical SQL:
- Window functions: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, running totals with `SUM() OVER()`
- CTEs (Common Table Expressions) for readable complex queries
- Self-joins, correlated subqueries, EXISTS vs IN
- Date manipulation and cohort analysis patterns
- The difference between SQLite (your background) and PostgreSQL/BigQuery (analytics world)

**What to Do & Blog:**
Solve 20 medium/hard SQL problems on DataLemur (real FAANG interview questions). Implement a cohort retention analysis query — the classic analytics interview question. Blog: "From Room to BigQuery — SQL patterns every ML engineer needs."

**Resources:**
- DataLemur: datalemur.com (free, best interview prep)
- Mode Analytics SQL tutorial (advanced sections)

---

### Day 24 — Data Visualization for Senior Audiences
**Type:** Deep Dive | **Time:** 3h

**What to Learn:**
- Visualization as argumentation — every chart should answer one question
- Chart selection matrix: comparison → bar/line, distribution → histogram/violin, relationship → scatter, composition → stacked bar/treemap
- Matplotlib OO API — `fig, ax` pattern for full control (skip `plt.plot()`)
- Seaborn for statistical plots, Plotly for interactive dashboards
- Design principles: data-ink ratio, preattentive attributes, annotation > decoration

**What to Do & Blog:**
Take your Week 3 ML project results. Create a 6-chart "executive dashboard" that a non-technical stakeholder could understand. Each chart should be self-explanatory. Blog: "Data viz for engineers — stop making charts for yourself."

**Resources:**
- Storytelling with Data by Cole Nussbaumer Knaflic (key chapters)
- seaborn gallery + Plotly Express docs

---

### Day 25–28 — Capstone: End-to-End Analytics + ML Project
**Type:** Capstone | **Time:** 20h across 4 days

**The Project:** Pick a real-world problem with business value. Suggested options:
- **Demand Forecasting**: Predict next month's sales for a retail chain (Walmart or Store Sales dataset). Involves time series features, multiple models, and actionable business recommendations.
- **Credit Risk Scoring**: Predict loan defaults (Lending Club dataset). Involves class imbalance, cost-sensitive evaluation, and regulatory fairness considerations.
- **App Store Analytics**: Analyze and predict app ratings/downloads (Google Play Store dataset). Directly leverages your Android domain knowledge.

**Day 25 — Data acquisition, profiling, cleaning pipeline**
Implement as a Python package with data validation (pandera). Document data quality issues and decisions.

**Day 26 — Feature engineering, EDA, statistical analysis**
Engineer 20+ features. Run hypothesis tests. Create a comprehensive visual analysis. Identify the key predictive signals.

**Day 27 — Model training, evaluation, and comparison**
Train 5+ models (linear/logistic baseline, Random Forest, XGBoost, plus others). Proper CV, leakage prevention, hyperparameter tuning. Create comparison table with multiple metrics.

**Day 28 — Deployment, documentation, and polish**
Serve the best model via Streamlit app with interactive predictions. Write the README as if onboarding a new team member. Add architecture diagram, setup instructions, and example usage. Deploy on Streamlit Community Cloud.

**Deliverables:**
- GitHub repo with proper project structure, tests, CI
- Deployed Streamlit app
- Capstone blog post with problem framing, methodology, findings, and business recommendations

---

### Day 29 — Write the Capstone Blog Post
**Type:** Story | **Time:** 4h

**What to Do:**
Write a long-form blog post about the capstone. Structure: business problem → data challenges → methodology → key findings → model comparison → deployment → lessons learned. Include architecture diagrams, key visualizations, and code highlights. This is your portfolio centerpiece for Month 1.

---

### Day 30 — Month 1 Retrospective & Month 2 Strategy
**Type:** Story | **Time:** 3h

**What to Do:**
Write your retrospective: what was harder than expected (probably statistics or the mindset shift from deterministic to probabilistic), what your SE background made easy (project structure, testing, deployment), and what gaps remain. Preview Month 2: deep scikit-learn, advanced SQL, first Kaggle competition, and the start of Andrew Ng's ML Specialization. Share on LinkedIn — this post is a networking tool.

---

## Month 1 Summary

| Metric | Value |
|---|---|
| Total days | 30 |
| Blog posts | ~14 |
| Projects | 4 (weekly + capstone) |
| Total time | ~80 hours |
| Key skills | NumPy internals · pandas at scale · Polars · MLE · Bayesian inference · Hypothesis testing · Linear algebra for ML · Gradient descent · Linear & logistic regression from scratch · Decision trees · XGBoost · Cross-validation · Feature engineering · sklearn Pipelines · Clustering · PCA · Analytical SQL · Data visualization · Streamlit deployment |
| Deliverables | Reusable EDA toolkit (GitHub) · Statistical analysis report · ML pipeline with tests and CI · Deployed capstone Streamlit app |

### What Changed From the Beginner Plan
- **Removed:** Environment setup, basic NumPy/pandas syntax, intro probability, matplotlib basics — you already know this or can pick it up in 30 minutes
- **Added:** NumPy internals, pandas performance & Polars, MLE, information theory, linear/logistic regression from scratch, gradient descent from scratch, PCA from scratch, sklearn Pipelines, data leakage, production code structure with tests and CI
- **Shifted:** Every project outputs production-quality Python packages, not notebooks. Your SWE standards are your competitive edge — lean into them.
