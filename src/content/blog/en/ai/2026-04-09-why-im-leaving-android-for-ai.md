---
title: "Why I'm Leaving Comfortable Android Development for AI"
date: 2026-04-09
categories: ["ai"]
tags: ["AI", "Machine Learning", "Career Change", "Android"]
summary: "After 10+ years of Android development, I'm diving into AI and Machine Learning. Here's why, how, and what my 6-month roadmap looks like."
toc: true
comments: true
image: "/assets/images/ai/android-to-ai.png"
---

If you've been following [Iced Tea Labs](https://icedtealabs.com) for a while, you know me as the Android guy. Custom Views, Dagger, Hilt, Clean Architecture, RxJava — that's been my world for over a decade. I've shipped apps at Lazada, built side projects like [Buckist](https://buckist.app) and myMoney, and honestly? Android development has been *very* good to me.

But something has been nagging at me for the past year.

Every time I open tech news, every conference talk, every job posting that catches my eye — it all points to the same direction: **AI and Machine Learning**. And I'm not talking about the hype. I'm talking about the fundamental shift in how software is being built.

So here I am, publicly committing to a new chapter: **I'm spending the next 6 months transitioning from Android engineering to Machine Learning.** And I'm going to document every step of it on this blog.

## The Comfortable Trap

Let's be honest. After 10+ years of Android development, I can build pretty much anything thrown at me. New Jetpack library? Give me a weekend. Compose migration? Been there. Complex RecyclerView with custom animations? Easy.

And that's exactly the problem.

**Comfort is the enemy of growth.** It's like staying on `compileSdkVersion 28` while the rest of the world has moved to SDK 35. Your app still compiles, it still runs — but you're slowly becoming irrelevant. You don't notice it until one day you look up and the ecosystem has moved on without you.

Meanwhile, the world around us is changing fast:

- The **edge AI market** is projected to grow from $25 billion to **$119 billion by 2033**
- Google, Apple, Samsung, and Meta are actively hiring for **"Mobile ML Engineer"** roles — positions that explicitly demand both Android AND ML skills
- On-device inference is becoming the standard, not the exception. LiteRT (formerly TensorFlow Lite), ML Kit, PyTorch Mobile — these aren't experimental anymore

The intersection of mobile and ML isn't some far-off future. It's happening *right now*. And I don't want to watch from the sidelines.

## Why AI? Why Now?

Here's what convinced me this isn't just hype:

**The job market is screaming for ML engineers.** ML engineering postings have seen a **150% year-over-year increase** as of mid-2025. But here's the surprising part: **entry-level ML roles make up only 3% of job postings**. Companies don't want fresh graduates for ML — they want it as a *second career stage*. They want people who already know how to ship production software.

That's... literally us. Software engineers.

Another stat that blew my mind: **23.9% of ML job listings don't even mention degree requirements**. A strong portfolio can substitute for a master's degree. You don't need to go back to university — you need to build things.

And then there's the niche that made me go "wait, this role was *designed* for me": **the Mobile ML Engineer**. Google has open positions (base salary $141K–$202K+) that explicitly require *"familiarity with edge device development on Android"* combined with *"general AI and ML methods."* Apple, Samsung, Meta, Snap, and Qualcomm have similar roles.

The competition for general ML Engineer positions? Brutal. The competition for Mobile ML Engineer positions that need someone who can both train a model AND deploy it on Android with smooth performance? **Much, much thinner.**

## My Android Background Is Not Baggage

This is the insight that really changed my perspective. When I first thought about switching to ML, my instinct was: "I need to forget everything I know and start from scratch."

Wrong.

My Android experience isn't baggage to shed — it's a **rare competitive weapon**. Here's how the skills translate:

- **Clean Architecture / MVVM** → ML pipeline architecture. Most ML candidates write monolithic Jupyter notebooks. I'll instinctively structure code with separation of concerns, testability, and maintainability.
- **Performance optimization** → Model optimization. Years of fighting with Android memory constraints, APK size, and render performance? That maps directly to model quantization, pruning, and latency profiling. ProGuard/R8 ≈ model compression.
- **JUnit + Espresso testing** → ML testing. Unit testing models, integration testing APIs, CI/CD for ML pipelines — this is a *massive* gap in the ML world that software engineers can fill.
- **Firebase A/B testing** → ML model A/B testing. Same concepts: controlled experiments, statistical significance, measuring impact on user metrics.

While thousands of career changers flood into ML from non-engineering backgrounds, I already know how to write production-grade code, set up CI/CD, handle edge cases, and ship software that real users depend on. **Most ML candidates can't say that.**

This isn't a career restart. It's a career **expansion**.

## The 6-Month Roadmap

Here's the high-level plan. I'll go deeper into each phase in future posts:

**Month 1 — Python for Data Science + Statistics**
NumPy, pandas, matplotlib, seaborn. Statistical foundations: distributions, hypothesis testing, Bayesian thinking. Capstone: a full EDA project deployed as a Streamlit app.

**Month 2 — SQL + Visualization + First ML Course**
Analytical SQL (window functions, CTEs), Tableau/Power BI dashboards. Start Andrew Ng's Machine Learning Specialization on Coursera.

**Month 3 — Machine Learning with scikit-learn**
Classical ML algorithms (random forests, XGBoost, SVMs). Feature engineering, handling messy data, the full modeling workflow. Project: customer churn prediction end-to-end.

**Month 4 — Deep Learning + MLOps**
PyTorch, CNNs, transformers, transfer learning. MLflow for experiment tracking, FastAPI + Docker for model serving. Project: NLP sentiment analysis pipeline.

**Month 5 — The Capstone: ML-Powered Android App**
This is the killer differentiator. Train a model in Python, optimize it, deploy on Android with Kotlin. On-device inference with LiteRT or PyTorch Mobile. Very few ML engineers can build polished Android apps — this is my unfair advantage.

**Month 6 — Certification + Interview Prep + Job Search**
One cloud ML certification (AWS/GCP/Azure). System design for ML. Polish the portfolio and start applying.

## Building in Public

I'm not just learning in private — I'm writing about every step. This is part of a **12-post blog series** covering the entire journey:

1. **Why I'm leaving Android for AI** *(this post)*
2. Math for ML: a software engineer's survival guide
3. My first ML model: what tutorials didn't teach me
4. SQL for data science: beyond SELECT *
5. PyTorch from a software engineer's perspective
6. Building my first end-to-end ML project
7. The 80% nobody talks about: data wrangling
8. MLOps for software engineers: CI/CD for ML
9. Deploying ML on Android: my mobile background as a career advantage
10. Kaggle competitions vs. real-world projects
11. Building in public: how blogging opened unexpected doors
12. 6 months in: the honest retrospective

Why blog about it? Three reasons:

- **The Feynman technique works.** If I can't explain something clearly in writing, I don't truly understand it.
- **Accountability.** Publicly committing to a 6-month plan makes it much harder to quit when things get tough (and they will).
- **Paying it forward.** When I started Android development, other developers' blog posts were invaluable. Time to return the favor for the next person making this transition.

***

I'm not going to pretend this will be easy. I'll struggle with statistics (I already know I will). I'll feel like an imposter when comparing myself to people with CS PhDs. There will be weeks where nothing makes sense and I'll want to go back to my comfortable RecyclerView adapters.

But as I've learned from bouldering: **Analyze → Attempt → Fail → Adjust → Send.**

The wall is set. Time to start climbing.

See you in the next post — where we'll get our hands dirty with NumPy and discover why arrays are NOT lists.

Happy learning! 💻🧠
