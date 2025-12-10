<h1 align="center">🚀 Gastronaut</h1>

<p align="center">
  <strong>Culinary Adventures for the Curious Cook</strong>
</p>

<p align="center">
  A modern food blog built with Astro, featuring interactive recipes with built-in timers, beautiful typography, and blazing-fast performance on Cloudflare Pages.
</p>

<p align="center">
  <a href="https://gastronaut.pages.dev/">🌐 Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

## ✨ Features

### 🍳 Interactive Recipe System

- **Step-by-step instructions** with progress tracking
- **Built-in timers** for cooking steps (with sound notifications)
- **Ingredient lists** with serving size information
- **Difficulty levels** and time estimates

### 📝 Content Management

- Powered by **Astro Content Collections** with type-safe schemas
- Markdown-based recipes with rich frontmatter
- Categories and tags for easy navigation
- SEO-optimized meta tags

### 🎨 Design & UX

- **Monolithic Elegance** design system (clean, professional, modern)
- Fully responsive layout
- Beautiful serif/sans-serif typography pairing
- Smooth transitions and micro-interactions

### ⚡ Performance

- **Static-first** architecture with server-side rendering where needed
- Deployed on **Cloudflare Pages** (Edge runtime)
- Optimized images and assets
- Perfect Lighthouse scores

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/florianjs/gastronaut.git
cd gastronaut

# Install dependencies
npm install

# Start development server
npm run dev
```

Your site will be available at `http://localhost:4321`

---

## 🧞 Commands

| Command             | Action                                     |
| :------------------ | :----------------------------------------- |
| `npm install`       | Install dependencies                       |
| `npm run dev`       | Start local dev server at `localhost:4321` |
| `npm run build`     | Build production site to `./dist/`         |
| `npm run preview`   | Preview build locally with Wrangler        |
| `npm run deploy`    | Build and deploy to Cloudflare Pages       |
| `npm run astro ...` | Run Astro CLI commands                     |

---

## 📂 Project Structure

```
gastronaut/
├── public/
│   └── sounds/              # Audio files for timer notifications
├── src/
│   ├── components/
│   │   ├── Modal.astro      # Reusable modal component
│   │   └── RecipeInstructions.astro  # Interactive recipe steps with timers
│   ├── content/
│   │   ├── config.ts        # Content collection schemas
│   │   └── blog/            # Recipe markdown files
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout wrapper
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── about.astro      # About page
│   │   ├── gallery.astro    # Recipe gallery
│   │   └── blog/            # Blog routes
│   ├── styles/
│   │   └── global.css       # Global styles & Tailwind imports
│   └── utils/
│       └── timer-manager.ts # Timer logic for recipes
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
├── wrangler.toml            # Cloudflare Pages configuration
└── package.json
```

---

## 📖 Adding a New Recipe

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: 'Your Recipe Title'
description: 'A brief description of the dish'
publishedAt: 2024-12-04
category: 'Pasta'
prepTime: 10
cookTime: 15
servings: 4
difficulty: 'easy'
image: 'https://your-image-url.jpg'
imageAlt: 'Description of the image'
ingredients:
  - '1 lb pasta'
  - '2 cloves garlic'
instructions:
  - title: 'Prep'
    steps:
      - text: 'Boil water in a large pot.'
      - text: 'Mince the garlic.'
        timer: 60 # Optional: timer in seconds
  - title: 'Cook'
    steps:
      - text: 'Cook pasta until al dente.'
        timer: 480
tags:
  - 'italian'
  - 'quick'
---

Your additional content and notes go here...
```

---

## 🛠 Tech Stack

| Technology                                                      | Purpose                     |
| :-------------------------------------------------------------- | :-------------------------- |
| [Astro](https://astro.build)                                    | Static site generator       |
| [Tailwind CSS](https://tailwindcss.com)                         | Utility-first CSS framework |
| [TypeScript](https://typescriptlang.org)                        | Type safety                 |
| [Cloudflare Pages](https://pages.cloudflare.com)                | Edge deployment             |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | Cloudflare CLI              |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  A project by <a href="https://n0w.me">n0w.me</a>
</p>
