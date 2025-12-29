# Iced Tea Labs - Project Context File

## Project Overview

**Iced Tea Labs** is a technical blog built with Astro 5.x, managed by Trinh Le. The project supports bilingual content in English and Vietnamese, focusing on sharing programming knowledge about Android, iOS, frontend development, and more. The project uses SSR mode deployed on Cloudflare Pages, providing high-performance static site experience.

### Core Technology Stack

- **Astro 5.16.4** - Static site generator (SSR mode)
- **TypeScript** - Type safety (strict mode)
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Cloudflare Pages** - Edge deployment platform
- **Wrangler 4.52.1** - Cloudflare CLI tool
- **Fuse.js 7.1.0** - Client-side fuzzy search
- **@astrojs/rss 4.0.14** - RSS Feed generation

### Project Architecture

- **Multilingual Support**: English (default, root path `/`) and Vietnamese (`/vi/`)
- **Content Management**: Using Astro Content Collections, blog posts are stored separately by language in `src/content/blog/{lang}/` directory
- **Comment System**: Integrated with Giscus (based on GitHub Discussions)
- **Search Functionality**: Client-side search using Fuse.js with keyboard shortcuts (⌘K / Ctrl+K)
- **Page View Statistics**: Cloudflare KV storage (KV namespace configured, but feature temporarily disabled)
- **Theme Toggle**: Light/dark theme switching with persistent storage
- **Mobile Responsive**: Responsive design with mobile navigation menu

---

## Building and Running

### Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit: http://localhost:4321
```

### Production Build

```bash
# Build production version
npm run build

# Preview build locally (using Wrangler)
npm run preview
```

### Deployment

```bash
# Build and deploy to Cloudflare Pages
npm run deploy
```

### Other Commands

```bash
# Run any Astro CLI command
npm run astro [command]

# Jekyll content migration script (deprecated, multilingual structure is complete)
npm run migrate
```

---

## Project Structure

```
trinhlbk1991.github.io/
├── src/
│   ├── components/           # Astro components
│   │   ├── pages/           # Page-level components (11 components)
│   │   │   ├── HomePage.astro
│   │   │   ├── PostPage.astro
│   │   │   ├── CategoryPage.astro
│   │   │   ├── CategoriesPage.astro
│   │   │   ├── TagsPage.astro
│   │   │   ├── ArchivesPage.astro
│   │   │   ├── AboutPage.astro
│   │   │   ├── SearchPage.astro
│   │   │   ├── GalleryPage.astro
│   │   │   ├── PrivacyPolicyPage.astro
│   │   │   └── PrivacyPolicyPostPage.astro
│   │   ├── HeaderSearch.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── Modal.astro
│   │   ├── PageViewCounter.astro
│   │   ├── RecipeInstructions.astro
│   │   ├── Search.astro
│   │   ├── SearchButton.astro
│   │   ├── SearchModal.astro
│   │   ├── TableOfContents.astro
│   │   └── ThemeToggle.astro
│   ├── content/             # Content collections
│   │   ├── blog/            # Blog posts (separated by language)
│   │   │   ├── en/          # English posts directory
│   │   │   └── vi/          # Vietnamese posts directory
│   │   ├── privacy-policy/  # Privacy policies and terms
│   │   └── config.ts        # Content Collections Schema
│   ├── layouts/             # Layout components
│   │   └── BaseLayout.astro # Main layout (includes navigation, footer, theme toggle, etc.)
│   ├── pages/               # Page routes
│   │   ├── index.astro      # Homepage (English)
│   │   ├── about.astro
│   │   ├── archives.astro
│   │   ├── categories.astro
│   │   ├── tags.astro
│   │   ├── gallery.astro
│   │   ├── search.astro
│   │   ├── [category]/[slug].astro  # Post detail page (English)
│   │   ├── category/[category].astro  # Category page (English)
│   │   ├── blog/index.astro # Blog list page
│   │   ├── privacy-policy/   # Privacy policy pages
│   │   ├── api/              # API routes
│   │   │   └── search.json.ts # Search index API
│   │   ├── vi/               # Vietnamese pages (mirrored structure)
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── archives.astro
│   │   │   ├── categories.astro
│   │   │   ├── tags.astro
│   │   │   ├── gallery.astro
│   │   │   ├── search.astro
│   │   │   ├── [category]/[slug].astro
│   │   │   └── category/[category].astro
│   │   ├── rss.xml.ts       # RSS Feed generation
│   │   └── sitemap.xml.ts   # Sitemap generation
│   ├── styles/              # Style files
│   │   └── global.css       # Global styles (includes CSS variable definitions)
│   ├── utils/               # Utility functions
│   │   ├── content.ts       # Content parsing utilities (parsePostId, getPostsByLang)
│   │   ├── i18n.ts          # Internationalization utilities (UI translations)
│   │   ├── readingTime.ts   # Reading time calculation
│   │   └── timer-manager.ts # Timer management (for recipe features)
│   └── config.ts            # Site global configuration
├── public/                  # Static assets
│   ├── assets/              # Images, CSS, JS
│   │   ├── images/          # Category images (android, ios, javascript, privacy)
│   │   ├── css/             # Style files
│   │   ├── js/              # JavaScript files
│   │   └── img/             # Icons and favicons
│   └── sounds/              # Audio files (timer notifications)
├── functions/               # Cloudflare Functions
│   └── api/
│       └── pageviews.ts     # Page view statistics API
├── scripts/                 # Build scripts
│   └── migrate-content.js   # Jekyll to Astro content migration script (deprecated)
├── astro.config.mjs         # Astro configuration (i18n, Cloudflare adapter)
├── tailwind.config.mjs      # Tailwind CSS configuration
├── wrangler.toml            # Cloudflare Pages configuration (KV namespace configured)
├── tsconfig.json            # TypeScript configuration (strict mode)
└── package.json             # Project dependencies and scripts
```

---

## Development Conventions

### Content Organization

#### Blog Post Structure

Blog posts are stored in `src/content/blog/{lang}/{category}/{slug}.md`, where:
- `lang`: Language code (`en` or `vi`)
- `category`: Category (max 2, used for URL structure)
- `slug`: Post identifier (format: `YYYY-MM-DD-title.md`)

#### Frontmatter Schema

```yaml
---
title: 'Article Title'
date: 2024-12-29
categories: ['Android', 'Kotlin']  # Max 2 categories
description: 'Article description'
summary: 'Article summary (for card display)'
image: '/images/path/to/image.jpg'
imageAlt: 'Image description'
tags: ['tag1', 'tag2']
toc: true              # Show table of contents (default: true)
comments: true          # Enable comments (default: true)
pin: false             # Pin to homepage (default: false)
math: false            # Enable MathJax (default: false)
mermaid: false         # Enable Mermaid diagrams (default: false)
updatedAt: 2024-12-29  # Update time (optional)
---

Article content...
```

### Internationalization (i18n)

- **Default Language**: English (`en`)
- **Supported Languages**: English (`en`), Vietnamese (`vi`)
- **Routing Strategy**:
  - English: `/` (no prefix)
  - Vietnamese: `/vi/` (with prefix)
- **Utility Functions** (`src/utils/i18n.ts`):
  - `getLangFromUrl(url)` - Get current language from URL
  - `useTranslations(lang)` - Get translation function
- **Content Utility Functions** (`src/utils/content.ts`):
  - `parsePostId(id)` - Parse post ID (supports old and new formats)
  - `getPostsByLang(lang)` - Get posts by language

UI translation strings are defined in `src/utils/i18n.ts`, including navigation, search, categories, and other interface text.

### Style Guidelines

The project uses Tailwind CSS with the **Tech Blog - Clean & Professional** design system:

- **Color System**: Using CSS variables for theme support (defined in `src/styles/global.css`)
  - `surface-root`, `surface-1/2/3` - Background colors
  - `primary` - Primary color
  - `content` - Content colors (default, muted, subtle)
- **Font System**:
  - `serif`: Playfair Display (headings)
  - `sans`: Plus Jakarta Sans / Inter (body)
  - `mono`: JetBrains Mono (code)
- **Dark Mode**: Enabled via `darkMode: 'class'`, supports persistent storage
- **Responsive Design**: Mobile-first, using Tailwind default breakpoints

### TypeScript Configuration

- Using Astro strict mode: `extends: "astro/tsconfigs/strict"`
- All files included in type checking (`.astro/types.d.ts`)
- Excludes `dist` directory

### Component Development Conventions

1. **Page Components**: Place in `src/components/pages/`, for reusable page logic (11 page components)
2. **General Components**: Place in `src/components/`, for UI elements
3. **Props Types**: All components should define TypeScript interfaces
4. **Internationalization**: Components should accept `lang` prop and use `useTranslations` to get translations
5. **Layout Component**: `BaseLayout.astro` accepts `lang` prop, used to set HTML lang attribute and generate correct links

### Search Functionality Implementation

Search functionality is based on Fuse.js, using a Spotlight-style modal:

- **Search API**: `src/pages/api/search.json.ts` - Builds search index (includes `lang` field)
- **Search Component**: `src/components/SearchModal.astro` - Search UI
- **Language Filtering**: Search results are filtered based on the current page's language
- **Keyboard Shortcuts**:
  - `⌘K` / `Ctrl+K` - Open search
  - `ESC` - Close search
- **Search Fields**: Title (weight 2), description (weight 1.5), categories (weight 1), tags (weight 0.5)

---

## Configuration

### Site Configuration (`src/config.ts`)

```typescript
{
  title: 'Iced Tea Labs',
  description: 'A technical blog managed by a geek who loves climbing',
  author: 'Trinh Le',
  url: 'https://icedtealabs.com',
  email: 'trinhlbk1991@gmail.com',
  social: { github, twitter, linkedin },
  googleAnalyticsId: 'UA-48722139-1',  // Legacy Universal Analytics (deprecated)
  ga4MeasurementId: 'G-1QY9E6KEP6',    // GA4 Measurement ID
  comments: {
    enabled: true,
    provider: 'giscus',
    giscus: { repo, repoId, category, categoryId, mapping, ... }
  },
  pageViews: {
    enabled: false,  // Feature temporarily disabled
    provider: 'cloudflare-kv'
  },
  postsPerPage: 10,
  avatar: '/logo.png',
  tagline: 'Glasses 👓 Geek 💻 Backpacker 🎒 Climber 🧗‍♂️'
}
```

### Astro Configuration (`astro.config.mjs`)

```javascript
{
  site: 'https://icedtealabs.com',
  output: 'server',  // SSR mode
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    routing: { prefixDefaultLocale: false }
  },
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: { enabled: true }
  }),
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-dark', wrap: true },
    rehypePlugins: [rehypeSlug]
  }
}
```

### Cloudflare KV Configuration (`wrangler.toml`)

KV namespace for page view statistics is configured:

```toml
kv_namespaces = [
  { binding = "PAGEVIEWS", id = "e77e459a811c447da15794eb2475fbb6" }
]
```

Note: Although KV namespace is configured, the page view statistics feature is disabled in `src/config.ts` (`pageViews.enabled: false`).

### Giscus Comment Configuration

Comment system uses Giscus (GitHub Discussions), configured in `src/config.ts`:
- `repo`: `trinhlbk1991/trinhlbk1991.github.io`
- `repoId`: `MDEwOlJlcG9zaXRvcnk0ODQ0MzU1Mw==`
- `category`: `Announcements`
- `categoryId`: `DIC_kwDOAuMwoc4C0Ji9`
- `mapping`: `pathname`
- `theme`: `preferred_color_scheme` (supports dark mode)

---

## Deployment Process

The project is deployed using Cloudflare Pages:

1. **Build Output**: `./dist/`
2. **Adapter**: `@astrojs/cloudflare` (version 12.6.12)
3. **Image Service**: Cloudflare Images
4. **Platform Proxy**: Enabled (supports Cloudflare specific APIs)
5. **SSR External Modules**: Configured `node:fs/promises`, `node:path`, `node:url`, `node:cryto`

Deployment command automatically builds and uploads to Cloudflare Pages.

---

## Page Route Structure

### English Routes (No Prefix)

- `/` - Homepage
- `/about` - About page
- `/archives` - Archives page
- `/categories` - Categories list
- `/tags` - Tags list
- `/gallery` - Gallery page
- `/search` - Search page
- `/[category]/[slug]` - Post detail page
- `/category/[category]` - Category page
- `/privacy-policy/[slug]` - Privacy policy detail
- `/privacy-policy` - Privacy policy list
- `/rss.xml` - RSS Feed

### Vietnamese Routes (`/vi/` Prefix)

- `/vi/` - Homepage
- `/vi/about` - About page
- `/vi/archives` - Archives page
- `/vi/categories` - Categories list
- `/vi/tags` - Tags list
- `/vi/gallery` - Gallery page
- `/vi/search` - Search page
- `/vi/[category]/[slug]` - Post detail page
- `/vi/category/[category]` - Category page

---

## Important Notes

### Multilingual Content Migration

Multilingual structure is implemented and complete, no need to run migration scripts anymore.

### Page View Statistics

KV namespace for page view statistics is configured, but the feature is temporarily disabled (`pageViews.enabled: false`). To enable:
1. Set `pageViews.enabled: true` in `src/config.ts`
2. Ensure `PageViewCounter.astro` component is properly integrated

### Math Formulas and Diagrams

- **MathJax**: Set `math: true` in frontmatter to enable
- **Mermaid**: Set `mermaid: true` in frontmatter to enable

### Code Highlighting

- Uses Shiki for syntax highlighting
- Theme: `github-dark`
- Supports automatic line wrapping

### SEO Optimization

- Auto-generates Open Graph and Twitter Card meta tags
- Supports canonical URLs
- Auto-generates sitemap (`sitemap.xml`)
- Supports RSS Feed (`rss.xml`)
- Integrated with Google Analytics 4 (Measurement ID: G-1QY9E6KEP6)

---

## TODO

- [ ] Enable page view statistics feature (KV namespace is configured)
- [ ] Complete Vietnamese content translation
- [ ] Add more categories and tags
- [ ] Optimize mobile experience
- [ ] Add more interactive features (e.g., post likes, bookmarks, etc.)

---

## Development Tools

### VS Code Extensions

Project includes recommended VS Code extensions configuration (`.vscode/extensions.json`).

### EditorConfig

Project uses EditorConfig for unified editor configuration (`.editorconfig`).

### Git Configuration

- Git remote repository: `git@github.com:trinhlbk1991/trinhlbk1991.github.io.git`
- GitHub Actions: Auto-deploy to Cloudflare Pages (`.github/workflows/pages-deploy.yml`)
- GitLab CI: Backup CI/CD configuration (`.gitlab-ci.yml`)

---

## Additional Directories

- `.aone_copilot/` - AI copilot plans and configurations
- `.github/` - GitHub Actions workflows
- `.vscode/` - VS Code workspace settings
- `.well-known/` - Web resource verification files
- `assets/` - Additional asset files
- `ios/` - iOS related files
- `personal/` - Personal directory
- `til/` - Today I Learned notes