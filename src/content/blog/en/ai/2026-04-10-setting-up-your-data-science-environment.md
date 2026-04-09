---
title: "Setting Up Your Data Science Environment (From an Android Dev's Perspective)"
date: 2026-04-10
categories: ["ai"]
tags: ["AI", "Machine Learning", "Python", "Jupyter", "Setup"]
summary: "Goodbye Android Studio, hello Jupyter. Here's how to set up your data science environment — and why the workflow feels so alien to mobile developers."
toc: true
comments: true
image: "/assets/images/ai/android-to-ai.png"
---

Day 2 of my [Android-to-AI journey](/ai/2026-04-09-why-im-leaving-android-for-ai/), and today we're doing what every developer does at the start of a new project: **setting up the environment**.

Except this time, there's no Android Studio. No Gradle. No `build.gradle.kts` that takes 3 minutes to sync. Instead, we're entering a world of **notebooks, virtual environments, and REPL-style coding** that feels completely foreign if you've spent your career in compiled languages.

Let me walk you through the setup — and be honest about the culture shock.

## The Paradigm Shift: IDE vs. Notebook

In Android development, the workflow is clear:
1. Write code in Android Studio
2. Build the project (wait... wait... wait...)
3. Run on emulator or device
4. See the result
5. Repeat

In data science, the workflow is:
1. Write a few lines of code in a **cell**
2. Press Shift+Enter
3. See the result **immediately** below your code
4. Write the next cell based on what you just saw
5. Repeat

This is the **notebook paradigm**, and it's closer to a conversation with your data than a traditional development workflow. You explore, poke, visualize, and iterate — all in the same document. Think of it as `println()` debugging elevated to an art form.

It felt weird at first. Where's my project structure? Where are my packages? Why is everything in one file? But after a few hours, I started to get it: **notebooks are for exploration, not production**. They're the sketch pad before the painting.

## Step 1: Install Python with Miniconda

If you already have Python installed... install it again with **Miniconda** anyway. Here's why:

Android devs know the pain of dependency conflicts between projects. Different projects need different library versions. In Python, this problem is 10x worse because Python doesn't have a `build.gradle` to manage dependency resolution automatically.

**Miniconda** solves this by giving you isolated environments (think of them as separate Android virtual devices, but for Python versions and libraries).

```bash
# Download Miniconda (Linux/macOS)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Or on macOS with Homebrew
brew install --cask miniconda
```

After installation, create your first environment:

```bash
# Create a dedicated environment for the AI journey
conda create -n ai-journey python=3.11

# Activate it
conda activate ai-journey

# Install the data science essentials
pip install numpy pandas matplotlib seaborn jupyter plotly streamlit scikit-learn
```

**Why Miniconda over Anaconda?** Anaconda ships with ~250 pre-installed packages (~3GB). Miniconda is just the package manager (~80MB) — you install only what you need. As Android devs who obsess over APK size, I think the choice is obvious.

## Step 2: Jupyter Lab — Your New IDE

**JupyterLab** is the data science equivalent of Android Studio. Well, sort of. It's a browser-based IDE that runs notebooks, terminals, and file browsers.

```bash
# Install and launch
pip install jupyterlab
jupyter lab
```

This opens a browser tab at `localhost:8888`. And that's your workspace.

### The Notebook Interface

A Jupyter notebook (`.ipynb` file) is made of **cells**. Two types matter:

- **Code cells**: Write Python, press Shift+Enter, see the output right below
- **Markdown cells**: Write formatted text, explanations, and notes

Here's what blew my mind: the output can be **anything**. Text, tables, charts, images, interactive widgets. When you call `df.head()` on a pandas DataFrame, you get a beautifully rendered HTML table, not a wall of text. When you call `plt.show()`, the chart appears *inline*.

### Essential Shortcuts (Android Studio muscle memory → Jupyter)

| Action | Android Studio | Jupyter Lab |
|---|---|---|
| Run | Shift+F10 | Shift+Enter |
| Run all | — | Ctrl+Shift+Enter |
| New cell below | — | B (in command mode) |
| New cell above | — | A (in command mode) |
| Delete cell | — | DD (in command mode) |
| Toggle comment | Ctrl+/ | Ctrl+/ |
| Command palette | Ctrl+Shift+A | Ctrl+Shift+C |
| Find | Ctrl+F | Ctrl+F |

**Pro tip**: Press `Esc` to enter command mode (cell border turns blue), then use single-key shortcuts. Press `Enter` to go back to edit mode (cell border turns green). It's like Vim's modal editing — strange at first, essential once you get it.

## Step 3: Google Colab — The Free Alternative

If you don't want to install anything locally, **Google Colab** is Jupyter in the cloud — for free. And it comes with **free GPU access**, which you'll need later for deep learning.

Go to [colab.research.google.com](https://colab.research.google.com), sign in with Google, and you're coding in seconds.

### When to Use Which?

| | Jupyter Lab (Local) | Google Colab |
|---|---|---|
| **Setup** | Install required | Zero setup |
| **Speed** | Depends on your machine | Free GPU/TPU |
| **Internet** | Works offline | Requires internet |
| **Storage** | Local files | Google Drive |
| **Customization** | Full control, extensions | Limited |
| **Collaboration** | Git-based | Google Docs-style sharing |
| **Best for** | Daily work, large datasets | Quick experiments, GPU tasks |

**My recommendation**: Use **Jupyter Lab locally** for daily learning (it's faster and works offline). Use **Colab** when you need GPU power or want to share notebooks quickly.

## Step 4: Useful Extensions

Jupyter Lab supports extensions, just like Android Studio plugins. Here are the ones I'm using:

```bash
# Auto-format code (like Android Studio's Ctrl+Alt+L)
pip install jupyterlab-code-formatter black isort

# Variable inspector (like Android Studio's debugger variable view)
# Built into JupyterLab 4.x — just right-click a notebook and select "New Console for Notebook"

# Table of contents (like Android Studio's Structure view)
# Built into JupyterLab 4.x — click the TOC icon in the left sidebar
```

## The Honest Culture Shock

Let me be real about what feels uncomfortable coming from Android Studio:

**No type safety.** Python is dynamically typed. After years of Kotlin's null safety and type inference, writing code where `x` could be an integer, a string, or a DataFrame depending on which cell you ran last feels... *dangerous*. You will make type errors. Often.

**No project structure.** In Android, you have `app/src/main/java/com/...` and everything has its place. In a notebook, it's one long document. The discipline to keep things organized has to come from you, not the IDE.

**Execution order matters.** Cells can be run in any order. If you run cell 5 before cell 3, you might get different results. This is like having `onCreate()` run after `onDestroy()`. Chaos. Always use "Restart Kernel and Run All" (Kernel → Restart Kernel and Run All Cells) to verify your notebook works top-to-bottom.

**No compile step = no safety net.** In Android, the compiler catches errors before you even run the app. In Python, you discover errors at runtime. Every single time.

**But here's the upside:** The feedback loop is *instant*. No 30-second build times. No emulator boot-up. Write a line, run it, see the result. For data exploration, this speed is addictive.

## My First Notebook: A Sanity Check

To make sure everything works, I created a simple test notebook. You should too:

```python
# Cell 1: Import libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("All imports successful!")
print(f"NumPy version: {np.__version__}")
print(f"pandas version: {pd.__version__}")
```

```python
# Cell 2: Create some fake data
data = {
    'day': range(1, 31),
    'hours_studied': np.random.uniform(2, 5, 30),
    'confidence': np.cumsum(np.random.uniform(0.5, 2, 30))
}
df = pd.DataFrame(data)
df.head()
```

```python
# Cell 3: Your first data visualization
plt.figure(figsize=(10, 5))
plt.plot(df['day'], df['confidence'], marker='o', color='#19a485')
plt.title('AI Learning Journey — Confidence Over Time (Simulated)')
plt.xlabel('Day')
plt.ylabel('Cumulative Confidence Score')
plt.grid(True, alpha=0.3)
plt.show()
```

If you see a line chart trending upward — congratulations, your environment is ready. If you see error messages — welcome to Python debugging. It's just like LogCat, except the stack traces are in English.

***

The setup is done. The tools are ready. Tomorrow we dive into the real stuff: **NumPy fundamentals** — where we'll discover why arrays are not lists and why vectorized operations are 100x faster than Python loops.

Coming from Java's `ArrayList` and Kotlin's `List<T>`, this is going to be a wild ride.

See you in the next cell! 💻
