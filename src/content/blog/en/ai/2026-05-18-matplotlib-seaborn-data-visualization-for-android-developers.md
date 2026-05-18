---
title: "Matplotlib & Seaborn: An Android Developer's Guide to Data Visualization"
date: 2026-05-18T08:00:00
categories: ["ai"]
tags: ["AI", "Machine Learning", "Python", "Matplotlib", "Seaborn", "Data Science", "Android"]
summary: "After mastering pandas, the next challenge is communicating your findings. Here's how I mapped matplotlib and seaborn to concepts I already knew as an Android developer — and why charts are just Canvas draws with better defaults."
toc: true
comments: true
image: "/assets/images/ai/matplotlib-seaborn-visualization.png"
---

In the [last post](/blog/en/ai/pandas-data-manipulation-for-android-developers), we ended with a clean, aggregated DataFrame — app download data grouped by category, revenue calculated, insights ready. And then I stared at a wall of numbers and thought: *now what?*

Here's the problem with data analysis: **tables don't persuade people. Charts do.**

The same insight — "APAC users have 3× higher revenue-per-download than NA" — lands completely differently as a number in a table versus as a bar chart where the APAC bar towers over the others. Data visualization is how analysis becomes communication.

So today, we're learning **matplotlib** and **seaborn** — the two pillars of Python data visualization.

## The Two-Library Model

Before we write a single line of code, let's understand why there are two libraries and when to use each.

**Matplotlib** is the foundation. It's low-level, verbose, and gives you pixel-level control over every element. Think of it as Android's `Canvas` API — powerful, but you'll write a lot of code to get something beautiful.

**Seaborn** is built on top of matplotlib. It's higher-level, opinionated, and produces beautiful statistical charts with minimal code. Think of it as Material Design components — sensible defaults, consistent style, and it handles the complexity for you.

| | Matplotlib | Seaborn |
|---|---|---|
| **Android analog** | `Canvas` + `Paint` | Material Design components |
| **Control** | Full pixel control | Opinionated defaults |
| **Code verbosity** | High | Low |
| **Statistical charts** | Manual | Built-in |
| **When to use** | Custom plots, precise layout | Statistical analysis, quick insights |

In practice, you'll use both together: seaborn for most charts, matplotlib to customize the details.

## Setting Up

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Set the style once at the top of your notebook
sns.set_theme(style="whitegrid", palette="husl")

# For Jupyter notebooks, render inline
%matplotlib inline
```

The `sns.set_theme()` call is like applying a Material Design theme to your Android app — one call, consistent style everywhere.

## Matplotlib Fundamentals: Figure and Axes

This is where most beginners get confused, and it's worth getting right.

In matplotlib, there are two core objects:

- **`Figure`**: The entire window/canvas — like an `Activity`
- **`Axes`**: A single plot within the figure — like a `View` inside the activity

```python
# Create a figure with one axes (the simple way)
fig, ax = plt.subplots()

# Create a figure with multiple axes (like a ConstraintLayout with multiple views)
fig, axes = plt.subplots(nrows=2, ncols=3, figsize=(12, 8))
```

![Figure and Axes Hierarchy](/assets/images/ai/matplotlib-figure-axes.png)
*Diagram: A Figure (outer rectangle labeled "Figure — the whole canvas") containing multiple Axes objects (inner rectangles labeled "Axes — individual plots"). Show the hierarchy: Figure > Axes > plot elements (title, xlabel, ylabel, data). Compare to Android: Activity > ViewGroup > View.*

The `figsize` parameter is in inches — `(12, 8)` gives you a 12×8 inch canvas. For Retina/HiDPI screens, you'll want `plt.rcParams['figure.dpi'] = 150` or higher.

### The Object-Oriented API vs. the pyplot API

You'll see matplotlib code written two ways:

```python
# pyplot API (concise, but confusing with multiple plots)
plt.plot([1, 2, 3], [4, 5, 6])
plt.title("My Plot")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()

# Object-oriented API (explicit, recommended)
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 5, 6])
ax.set_title("My Plot")
ax.set_xlabel("X")
ax.set_ylabel("Y")
plt.show()
```

Use the **object-oriented API**. When you have multiple subplots, the `plt.title()` style doesn't know *which* axes you're targeting. `ax.set_title()` is unambiguous — just like calling `view.setTitle()` vs some global setter.

## Line Charts: Trends Over Time

Line charts are the bread and butter of time-series data. Let's use our app data:

```python
# Monthly downloads over a year
months = pd.date_range('2025-01', '2025-12', freq='MS')
downloads = [45000, 48000, 52000, 49000, 61000, 58000,
             72000, 80000, 75000, 88000, 95000, 110000]

fig, ax = plt.subplots(figsize=(10, 5))

ax.plot(months, downloads,
        color='#2196F3',     # Material Blue 500
        linewidth=2,
        marker='o',          # Circle markers at each data point
        markersize=6,
        label='Downloads')

# Add a trend line
z = np.polyfit(range(len(downloads)), downloads, 1)
p = np.poly1d(z)
ax.plot(months, p(range(len(downloads))),
        '--', color='#FF9800', linewidth=1.5, label='Trend')

ax.set_title('Monthly App Downloads — 2025', fontsize=14, fontweight='bold')
ax.set_xlabel('Month')
ax.set_ylabel('Downloads')
ax.legend()
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{x/1000:.0f}K'))

plt.tight_layout()
plt.savefig('downloads_trend.png', dpi=150, bbox_inches='tight')
plt.show()
```

![Monthly Downloads Line Chart](/assets/images/ai/matplotlib-line-chart.png)
*Chart: A line chart showing monthly app downloads from Jan–Dec 2025, starting around 45K and ending around 110K. The solid blue line has circle markers at each month. An orange dashed trend line shows the overall upward trajectory. Y-axis labels in "K" format (45K, 60K, etc.). Whitegrid background.*

Key things to note:
- `plt.tight_layout()` is like `wrap_content` — it automatically adjusts spacing to prevent clipping
- `bbox_inches='tight'` ensures nothing is cropped when saving
- `yaxis.set_major_formatter` is like a custom `TextView` format — display `110000` as `110K`

## Bar Charts: Comparing Categories

```python
# App revenue by category
categories = ['Games', 'Productivity', 'Social', 'Finance', 'Health']
revenues = [285000, 142000, 98000, 176000, 63000]

fig, ax = plt.subplots(figsize=(9, 5))

bars = ax.bar(categories, revenues,
              color=sns.color_palette('husl', len(categories)),
              edgecolor='white',
              linewidth=0.8)

# Add value labels on top of each bar
for bar, revenue in zip(bars, revenues):
    ax.text(bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 2000,
            f'${revenue/1000:.0f}K',
            ha='center', va='bottom',
            fontsize=10, fontweight='bold')

ax.set_title('Annual Revenue by App Category', fontsize=14, fontweight='bold')
ax.set_ylabel('Revenue (USD)')
ax.set_ylim(0, max(revenues) * 1.15)  # Headroom for labels
sns.despine()  # Remove top and right spines (cleaner look)

plt.tight_layout()
plt.show()
```

`sns.despine()` removes the top and right border lines from the plot — a small detail that makes charts look instantly more professional. It's like removing the default button border in Material Design.

## Seaborn's Killer Feature: Statistical Charts in One Line

Here's where seaborn really shines. These charts would take 30+ lines in raw matplotlib:

### Distribution Plot (Histogram + KDE)

```python
# Show the distribution of app ratings
ratings = np.random.normal(4.2, 0.4, 1000)  # Simulated ratings
ratings = np.clip(ratings, 1.0, 5.0)

fig, ax = plt.subplots(figsize=(8, 5))
sns.histplot(ratings, bins=30, kde=True, ax=ax, color='#2196F3')
ax.set_title('Distribution of App Ratings')
ax.set_xlabel('Rating')
ax.set_ylabel('Count')
plt.tight_layout()
plt.show()
```

The `kde=True` parameter overlays a **Kernel Density Estimate** — a smoothed probability curve. This would be 20+ lines of scipy + matplotlib to do manually.

![Rating Distribution Histogram](/assets/images/ai/seaborn-histplot-ratings.png)
*Chart: A histogram of app ratings centered around 4.2, with a smooth blue KDE curve overlaid. X-axis runs from 1.0 to 5.0, showing the bell-curve shape of the data. The bars are blue with the KDE line in a slightly darker shade.*

### Box Plot: Understanding Spread

```python
# Revenue by category with box plots
df = pd.DataFrame({
    'category': np.repeat(['Games', 'Productivity', 'Social', 'Finance'], 50),
    'revenue': np.concatenate([
        np.random.lognormal(11, 0.8, 50),
        np.random.lognormal(10.5, 0.6, 50),
        np.random.lognormal(10, 0.9, 50),
        np.random.lognormal(11.2, 0.5, 50)
    ])
})

fig, ax = plt.subplots(figsize=(9, 5))
sns.boxplot(data=df, x='category', y='revenue', palette='husl', ax=ax)
ax.set_title('Revenue Distribution by Category')
ax.set_ylabel('Revenue (USD)')
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'${x/1000:.0f}K'))
sns.despine()
plt.tight_layout()
plt.show()
```

Box plots show median, quartiles, and outliers in one view — something a bar chart completely hides. As an Android developer, I think of it as the difference between showing one user review versus showing the full rating distribution.

### Scatter Plot with Regression: Finding Correlations

```python
fig, ax = plt.subplots(figsize=(8, 6))

sns.regplot(data=df_apps,
            x='downloads',
            y='revenue',
            scatter_kws={'alpha': 0.6, 's': 50},
            line_kws={'color': 'red', 'linewidth': 2},
            ax=ax)

ax.set_title('Downloads vs Revenue Correlation')
ax.set_xlabel('Downloads')
ax.set_ylabel('Revenue (USD)')
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{x/1000:.0f}K'))
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'${x/1000:.0f}K'))

plt.tight_layout()
plt.show()
```

`sns.regplot` draws the scatter plot AND fits a linear regression line — two operations in one call. The shaded area around the line is the 95% confidence interval, calculated automatically.

## Heatmaps: Correlation Matrices

One of the most useful charts for understanding feature relationships before building an ML model:

```python
# Correlation matrix heatmap
df_numeric = df_apps[['downloads', 'revenue', 'rating', 'size_mb', 'update_frequency']]
correlation_matrix = df_numeric.corr()

fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(correlation_matrix,
            annot=True,          # Show numbers in cells
            fmt='.2f',           # 2 decimal places
            cmap='coolwarm',     # Red = positive, Blue = negative
            center=0,            # Center colormap at 0
            vmin=-1, vmax=1,
            square=True,
            ax=ax)

ax.set_title('Feature Correlation Matrix', fontsize=13, fontweight='bold')
plt.tight_layout()
plt.show()
```

![Correlation Heatmap](/assets/images/ai/seaborn-correlation-heatmap.png)
*Diagram: A 5×5 heatmap correlation matrix with features: downloads, revenue, rating, size_mb, update_frequency. Cells are colored on a blue-to-red scale (blue = negative correlation, red = positive). Numbers like "0.82" are shown in each cell. The diagonal is all 1.00 (deep red). Particularly strong correlation between downloads and revenue.*

This is like an `android.graphics.Matrix` but for statistical relationships — one chart that shows how every feature relates to every other feature.

## Subplots: The ConstraintLayout of Matplotlib

When you want multiple charts in one figure (a dashboard):

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle('App Analytics Dashboard', fontsize=16, fontweight='bold', y=1.02)

# Top-left: Downloads trend
axes[0, 0].plot(months, downloads, color='#2196F3', linewidth=2, marker='o')
axes[0, 0].set_title('Monthly Downloads')
axes[0, 0].yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{x/1000:.0f}K'))

# Top-right: Revenue by category
axes[0, 1].bar(categories, revenues, color=sns.color_palette('husl', len(categories)))
axes[0, 1].set_title('Revenue by Category')
axes[0, 1].tick_params(axis='x', rotation=30)

# Bottom-left: Rating distribution
sns.histplot(ratings, bins=25, kde=True, ax=axes[1, 0], color='#4CAF50')
axes[1, 0].set_title('Rating Distribution')

# Bottom-right: Correlation heatmap (smaller version)
small_corr = df_apps[['downloads', 'revenue', 'rating']].corr()
sns.heatmap(small_corr, annot=True, fmt='.2f', cmap='coolwarm',
            center=0, ax=axes[1, 1])
axes[1, 1].set_title('Key Correlations')

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
plt.show()
```

`axes[0, 0]` is the top-left, `axes[1, 2]` is the bottom-right — just like a 2D array. This is exactly how I think about `GridLayout` in Android: `row=0, col=0`.

![App Analytics Dashboard](/assets/images/ai/matplotlib-dashboard.png)
*Diagram: A 2×2 subplot grid showing: (top-left) line chart of monthly downloads with upward trend, (top-right) colorful bar chart of revenue by category, (bottom-left) rating distribution histogram with KDE curve, (bottom-right) 3×3 correlation heatmap. Clean whitegrid theme throughout, with a bold title "App Analytics Dashboard" at the top.*

## Pair Plots: The EDA Swiss Army Knife

Before building an ML model, this single call gives you a complete overview of your dataset:

```python
# Pair plot: scatter plots for every feature combination
df_sample = df_apps[['downloads', 'revenue', 'rating', 'category']].sample(200)

g = sns.pairplot(df_sample,
                 hue='category',      # Color by category
                 diag_kind='kde',     # KDE on diagonal instead of histogram
                 plot_kws={'alpha': 0.6, 's': 30})

g.fig.suptitle('Pairwise Feature Relationships', y=1.02, fontsize=14)
plt.show()
```

This generates an N×N grid of plots automatically. On the diagonal: the distribution of each feature. On the off-diagonal: scatter plots of every pair. One call that would take hours to build manually in Android's `MPAndroidChart`.

## Styling: Beyond the Defaults

Matplotlib and seaborn ship with several built-in themes:

```python
# Available seaborn styles
# 'darkgrid', 'whitegrid', 'dark', 'white', 'ticks'
sns.set_theme(style='whitegrid')

# Available matplotlib styles
# plt.style.use('seaborn-v0_8-poster')  # Large fonts for presentations
# plt.style.use('ggplot')               # R's ggplot aesthetic
# plt.style.use('dark_background')      # Dark mode!

# Custom color palettes
colors = sns.color_palette('husl', 8)    # Bright, perceptually uniform
colors = sns.color_palette('Blues', 6)   # Sequential blues
colors = sns.color_palette('RdYlGn', 6)  # Diverging red→yellow→green
```

For presentation slides, I switch to `plt.rcParams['figure.dpi'] = 200` and a dark background theme — like switching to a dark Material Design theme for an important demo.

## Saving Charts for Production

```python
# High-quality PNG for web
plt.savefig('chart.png', dpi=150, bbox_inches='tight', transparent=False)

# SVG for scalable/print quality
plt.savefig('chart.svg', bbox_inches='tight')

# PDF for reports
plt.savefig('chart.pdf', bbox_inches='tight')

# Batch generation pattern
charts = [
    ('downloads_trend.png', make_downloads_chart),
    ('revenue_by_category.png', make_revenue_chart),
    ('correlation_heatmap.png', make_heatmap),
]

for filename, chart_func in charts:
    fig = chart_func()
    fig.savefig(f'output/{filename}', dpi=150, bbox_inches='tight')
    plt.close(fig)  # Free memory — critical in loops!
```

`plt.close(fig)` is the Python equivalent of calling `bitmap.recycle()` in Android. Skip it in a loop and you'll get a memory warning after the 20th chart.

## Practical Example: Visualizing the App Store Analysis

Let's bring it together with the DataFrame we built in the pandas post:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style='whitegrid', palette='husl')

# Load and prepare (from the pandas post)
df = (pd.read_csv('app_downloads.csv')
      .dropna(subset=['revenue', 'downloads'])
      .query('downloads > 0'))

df['revenue_per_download'] = df['revenue'] / df['downloads']
df['is_high_rated'] = df['rating'] >= 4.5

# --- Dashboard ---
fig = plt.figure(figsize=(14, 10))
fig.suptitle('App Store Intelligence Report — Q1 2026',
             fontsize=16, fontweight='bold', y=1.01)

# 1. Revenue by category (top-left)
ax1 = fig.add_subplot(2, 3, 1)
category_revenue = df.groupby('category')['revenue'].sum().sort_values(ascending=True)
category_revenue.plot(kind='barh', ax=ax1,
                      color=sns.color_palette('husl', len(category_revenue)))
ax1.set_title('Total Revenue by Category')
ax1.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'${x/1000:.0f}K'))

# 2. Downloads vs Revenue scatter (top-middle)
ax2 = fig.add_subplot(2, 3, 2)
sns.scatterplot(data=df, x='downloads', y='revenue',
                hue='category', alpha=0.6, s=50, ax=ax2)
ax2.set_title('Downloads vs Revenue')
ax2.get_legend().remove()

# 3. Rating distribution (top-right)
ax3 = fig.add_subplot(2, 3, 3)
sns.histplot(df['rating'], bins=20, kde=True, ax=ax3, color='#2196F3')
ax3.set_title('Rating Distribution')
ax3.axvline(df['rating'].mean(), color='red', linestyle='--', label=f"Mean: {df['rating'].mean():.2f}")
ax3.legend()

# 4. Revenue per download by category (bottom-left)
ax4 = fig.add_subplot(2, 3, 4)
sns.boxplot(data=df, x='category', y='revenue_per_download', ax=ax4)
ax4.set_title('Revenue / Download by Category')
ax4.tick_params(axis='x', rotation=30)

# 5. High-rated app proportion (bottom-middle)
ax5 = fig.add_subplot(2, 3, 5)
high_rated = df.groupby('category')['is_high_rated'].mean() * 100
high_rated.sort_values().plot(kind='bar', ax=ax5, color='#4CAF50')
ax5.set_title('% High-Rated Apps (≥4.5) by Category')
ax5.set_ylabel('Percentage (%)')
ax5.tick_params(axis='x', rotation=30)

# 6. Correlation heatmap (bottom-right)
ax6 = fig.add_subplot(2, 3, 6)
corr = df[['downloads', 'revenue', 'rating', 'revenue_per_download']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', center=0, ax=ax6, square=True)
ax6.set_title('Feature Correlations')

plt.tight_layout()
plt.savefig('app_store_dashboard.png', dpi=150, bbox_inches='tight')
plt.show()
```

In less than 60 lines, we produced a six-panel dashboard that would have taken a full sprint to build as a custom `View` hierarchy in Android.

## Common Gotchas

### 1. The plt.show() Timing

```python
# WRONG: modifying after show() does nothing
plt.plot([1, 2, 3])
plt.show()
plt.title("Title")  # This title won't appear!

# RIGHT: set everything before show()
plt.plot([1, 2, 3])
plt.title("Title")
plt.show()
```

Think of `plt.show()` as `setContentView()` — once the view is inflated and displayed, late modifications don't re-render automatically.

### 2. Figure State Leak Between Cells

In Jupyter notebooks, matplotlib reuses the same figure across cells unless you explicitly create a new one:

```python
# Always start with fig, ax = plt.subplots() or plt.figure()
# Never rely on "the current figure" — always be explicit
fig, ax = plt.subplots()
```

### 3. The Figure Size vs DPI Confusion

- `figsize=(10, 6)` is in **inches**
- `dpi=150` is **dots per inch**
- Final pixel resolution: `10 × 150 = 1500px wide`, `6 × 150 = 900px tall`

For web images, `dpi=150` is usually sufficient. For print, use `dpi=300`.

### 4. Seaborn vs matplotlib kwargs

Seaborn wraps matplotlib, but the kwargs sometimes differ:

```python
# matplotlib uses 'color'
ax.plot([1, 2], color='blue')

# seaborn uses 'color' for the whole palette OR specific kwargs
sns.histplot(data, color='blue')           # Single color
sns.histplot(data, palette='husl')         # Multiple colors
```

When in doubt, check which object you're calling on — `ax.*` methods take matplotlib kwargs, `sns.*` methods take seaborn kwargs, and seaborn passes through `**kwargs` to matplotlib underneath.

## What's Next

We've now completed the core data science toolkit:
- **NumPy**: Fast numerical computation (post 2)
- **Pandas**: Data manipulation and analysis (post 3)
- **Matplotlib + Seaborn**: Visualization and communication (this post)

The next step is putting it all together for a **real ML project**. In the next post, we'll train our first model with scikit-learn — using all the data we've cleaned with pandas and the charts we've built here to understand what features actually matter.

The Android muscle memory kicks in more than I expected: thinking in layouts (subplots), components (seaborn charts), and lifecycles (figure state). The paradigms translate.

## Key Takeaways

1. **matplotlib is Canvas; seaborn is Material Design** — use the right level of abstraction for the task
2. **Always use the OO API**: `fig, ax = plt.subplots()` then `ax.set_*()`, not `plt.title()`
3. **`sns.set_theme()` once**: Set style globally rather than per-chart
4. **`plt.close(fig)` in loops**: Prevent memory leaks the same way you'd `recycle()` a Bitmap
5. **`bbox_inches='tight'`**: Always use when saving to prevent cropping
6. **Save before show**: `plt.savefig()` before `plt.show()`, or the figure is consumed
7. **Pair plots for EDA**: One call that replaces hours of manual chart generation

See you in the next post!

Happy learning!
