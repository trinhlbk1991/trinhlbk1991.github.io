### Jekyll to Astro Migration Plan ###
Comprehensive migration plan from Jekyll (Chirpy theme) to Astro (Gastronaut base) while preserving SEO, URLs, and all existing features. The plan transforms a food blog theme into a technical blog while maintaining content structure and functionality.

## Phase 1: Project Initialization

### 1.1 Set Up New Astro Project
- Clone Gastronaut repository as starting point
- Install dependencies: `npm install`
- Update `package.json` with project-specific metadata
- Configure Git to point to your repository

### 1.2 Configure Astro for Technical Blog
**File: `astro.config.mjs`**
- Keep Cloudflare adapter configuration
- Add sitemap integration for SEO
- Configure output mode (server or hybrid)
- Set up base URL: `https://icedtealabs.com`

**File: `wrangler.toml`**
- Configure Cloudflare Pages settings
- Set compatibility date
- Configure routes if needed

### 1.3 Update Dependencies
- Install additional packages:
  - `@astrojs/sitemap` for SEO
  - `@astrojs/rss` for RSS feed
  - `fuse.js` for search functionality
  - Reading time calculation library

---

## Phase 2: Content Collections Schema

### 2.1 Define Blog Post Schema
**File: `src/content/config.ts`**

Create schema mapping Jekyll frontmatter to Astro:
- `title`: string (required)
- `date`: date (publishedAt equivalent)
- `categories`: array of strings (for URL structure)
- `tags`: array of strings
- `description`: string (optional)
- `image`: string (optional)
- `toc`: boolean (default: true)
- `comments`: boolean (default: true)
- `pin`: boolean (for pinned posts)
- `math`: boolean (for mathematical content)
- `mermaid`: boolean (for diagrams)

### 2.2 Content Directory Structure
```
src/content/
├── blog/           # All blog posts
│   ├── android/    # Android category posts
│   ├── ios/        # iOS category posts
│   ├── fe/         # Frontend category posts
│   ├── javascript/ # JavaScript category posts
│   └── til/        # Today I Learned posts
└── config.ts       # Schema definitions
```

---

## Phase 3: Content Migration

### 3.1 Migrate Blog Posts
For each directory (android, ios, fe, javascript, til):
- Copy all `.md` files to corresponding `src/content/blog/[category]/`
- Update frontmatter format from Jekyll to Astro schema
- Preserve original filename for URL generation
- Update image paths to Astro's public directory structure

### 3.2 Jekyll → Astro Frontmatter Conversion
Transform fields:
- `layout: post` → (removed, handled by Astro)
- `date:` → `date:` (ensure ISO format)
- `categories:` → `categories:` (keep as array)
- `permalink:` → (removed, generated from categories + slug)

### 3.3 Asset Migration
- Move images from Jekyll's structure to `public/assets/images/`
- Update image references in markdown files
- Copy favicon and other static assets
- Preserve directory structure for images referenced in posts

---

## Phase 4: URL Structure & Routing

### 4.1 Dynamic Route Configuration
**File: `src/pages/[...category]/[slug].astro`**
- Implement dynamic routing to match `/:categories/:title/` pattern
- Use `getStaticPaths()` to generate all post routes
- Extract category from post's categories array (first item)
- Use post slug for title part of URL

### 4.2 Category & Tag Pages
**Files:**
- `src/pages/categories/[category].astro` - Individual category pages
- `src/pages/tags/[tag].astro` - Individual tag pages
- Generate static paths for all categories and tags

### 4.3 Pagination
**File: `src/pages/[...page].astro` or similar**
- Implement pagination for homepage (10 posts per page)
- Preserve pagination format from Jekyll
- Create pagination component

---

## Phase 5: Core Features Implementation

### 5.1 Disqus Comments Integration
**Component: `src/components/Disqus.astro`**
- Create Disqus component with shortname: `icetea09`
- Add conditional rendering based on post's `comments` frontmatter
- Include Disqus script with proper configuration
- Pass page URL and identifier for comment threading

### 5.2 Google Analytics
**Component: `src/components/GoogleAnalytics.astro`**
- Integrate GA tracking code: `UA-48722139-1`
- Add to base layout
- Respect DNT (Do Not Track) header

### 5.3 Search Functionality
**Files:**
- `src/components/Search.astro` - Search UI component
- `src/pages/api/search.json.ts` - Search index endpoint
- Implement client-side search using Fuse.js
- Index all posts by title, content, categories, tags

### 5.4 Table of Contents (TOC)
**Component: `src/components/TableOfContents.astro`**
- Extract headings from markdown content
- Generate nested TOC structure
- Add smooth scrolling to anchors
- Show/hide based on post's `toc` frontmatter

### 5.5 Reading Time
**Utility: `src/utils/readingTime.ts`**
- Calculate reading time from post content
- Average reading speed: ~200 words per minute
- Display in post header

### 5.6 Related Posts
**Component: `src/components/RelatedPosts.astro`**
- Find posts with matching categories or tags
- Display 3-5 related posts at bottom of post
- Sort by relevance and date

---

## Phase 6: Layout & Design Customization

### 6.1 Modify Color Scheme
**File: `tailwind.config.mjs`**

Replace Gastronaut's warm orange tones with tech blog colors:
- Primary: Blue/Purple shades (e.g., `#3b82f6` or `#6366f1`)
- Background: Clean whites/grays for readability
- Accent: Green for success states, blue for links
- Code blocks: Dark theme syntax highlighting
- Surface colors: Subtle grays for cards and sections

### 6.2 Update Typography
**File: `tailwind.config.mjs`**

Change fonts for technical content:
- Headings: System sans-serif or modern tech font (Inter, Roboto, Source Sans Pro)
- Body: Readable sans-serif (System UI, Segoe UI, Inter)
- Code: Monospace (JetBrains Mono, Fira Code, Source Code Pro)
- Remove decorative serif fonts from Gastronaut

### 6.3 Base Layout
**File: `src/layouts/BaseLayout.astro`**
- Header with site title "Iced Tea Labs" and tagline
- Navigation menu (Home, About, Archives, Categories, Tags)
- Sidebar with author info, recent posts, categories
- Footer with social links and copyright
- Responsive mobile menu

### 6.4 Post Layout
**File: `src/layouts/PostLayout.astro`**
- Post header: title, date, categories, tags, reading time
- Post content with proper typography
- Code syntax highlighting
- TOC component (if enabled)
- Author info
- Disqus comments (if enabled)
- Related posts section
- Social sharing buttons

### 6.5 Home Page Layout
**File: `src/pages/index.astro`**
- Hero section with site introduction
- List of recent posts (paginated, 10 per page)
- Sidebar with categories, tags, about section
- Pinned posts at top (if any)

---

## Phase 7: Static Pages Migration

### 7.1 About Page
**File: `src/pages/about.astro`**
- Migrate content from `_tabs/about.md`
- Preserve author bio, social links, app store links
- Add profile image: `/assets/images/ic_iced_tea_labs.png`
- Maintain social links: Twitter, GitHub, LinkedIn

### 7.2 Archives Page
**File: `src/pages/archives.astro`**
- List all posts grouped by year and month
- Sort chronologically (newest first)
- Show post count per month
- Link to individual posts

### 7.3 Categories Page
**File: `src/pages/categories.astro`**
- Display all categories with post counts
- Grid or card layout for categories
- Link to individual category pages
- Show category descriptions if available

### 7.4 Tags Page
**File: `src/pages/tags.astro`**
- Tag cloud or list view
- Show post count per tag
- Link to individual tag pages
- Sort by popularity or alphabetically

---

## Phase 8: SEO & Meta Configuration

### 8.1 Site Configuration
**File: `src/config.ts` or similar**
Create site config with:
- Site title: "Iced Tea Labs"
- Site description: "A technical blog managed by a geek who loves climbing"
- Author: "Trinh Le"
- Base URL: `https://icedtealabs.com`
- Social profiles
- Default OG image

### 8.2 Meta Tags Component
**Component: `src/components/MetaTags.astro`**
- Dynamic meta title and description
- Open Graph tags for social sharing
- Twitter Card meta
- Canonical URLs
- Schema.org structured data for blog posts

### 8.3 RSS Feed
**File: `src/pages/rss.xml.ts`**
- Generate RSS feed for all posts
- Include full content or excerpt
- Proper date formatting
- Link to `/rss.xml`

### 8.4 Sitemap
- Configure `@astrojs/sitemap` in `astro.config.mjs`
- Auto-generate sitemap.xml
- Include all posts, pages, categories, tags

### 8.5 robots.txt
**File: `public/robots.txt`**
- Allow all crawlers
- Link to sitemap
- Preserve existing rules if any

---

## Phase 9: Additional Features

### 9.1 Dark Mode Toggle
**Component: `src/components/ThemeToggle.astro`**
- Light/dark mode switcher
- Save preference to localStorage
- Smooth transitions between themes
- Update Tailwind config for dark mode

### 9.2 Syntax Highlighting
- Configure code block highlighting in Astro
- Choose theme suitable for dark/light modes
- Support multiple languages (Kotlin, Java, JavaScript, TypeScript, etc.)
- Line numbers and copy button

### 9.3 Image Optimization
- Use Astro's built-in image optimization
- Serve responsive images
- Lazy loading
- WebP format support

### 9.4 Social Sharing
**Component: `src/components/ShareButtons.astro`**
- Twitter, LinkedIn, Facebook share buttons
- Copy link button
- Email share option

### 9.5 Newsletter/Subscribe (Optional)
- Add email subscription form
- Integrate with email service if needed

---

## Phase 10: Cloudflare Pages Deployment

### 10.1 Cloudflare Pages Setup
- Connect GitHub repository to Cloudflare Pages
- Configure build settings:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Node version: 18+

### 10.2 Environment Variables
Set in Cloudflare dashboard:
- `PUBLIC_GA_ID`: Google Analytics ID
- `PUBLIC_DISQUS_SHORTNAME`: Disqus shortname
- Any other API keys or secrets

### 10.3 Custom Domain
- Configure DNS: `icedtealabs.com` → Cloudflare Pages
- Set up CNAME file: `CNAME` in public directory with domain
- Enable HTTPS (automatic with Cloudflare)

### 10.4 Redirects (if needed)
**File: `public/_redirects`**
- Add any 301 redirects for changed URLs
- Redirect old RSS feed path if changed
- Redirect deprecated pages

---

## Phase 11: Testing & Quality Assurance

### 11.1 URL Preservation Validation
- Create script to list all current Jekyll URLs
- Compare with generated Astro URLs
- Verify exact matches for all posts
- Test redirects if any

### 11.2 Feature Testing Checklist
- [ ] All blog posts render correctly
- [ ] Categories and tags work
- [ ] Search returns accurate results
- [ ] Disqus comments load on posts
- [ ] Google Analytics tracking works
- [ ] TOC appears and functions correctly
- [ ] Reading time displays accurately
- [ ] Pagination works on homepage
- [ ] Related posts show relevant content
- [ ] RSS feed validates
- [ ] Sitemap includes all pages

### 11.3 Cross-browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Mobile responsiveness (iOS Safari, Chrome Mobile)
- Dark mode on all browsers

### 11.4 Performance Optimization
- Run Lighthouse audit
- Optimize images (compression, formats)
- Minimize JavaScript bundle
- Check Core Web Vitals
- Test on slow networks (3G simulation)

### 11.5 SEO Validation
- Google Search Console verification
- Check meta tags with SEO tools
- Validate structured data
- Test social sharing previews
- Verify canonical URLs

---

## Phase 12: Migration Checklist

### Pre-Migration
- [ ] Backup current Jekyll site and database
- [ ] Document current traffic and analytics
- [ ] Export Disqus comments (if changing identifiers)
- [ ] Create list of all current URLs

### Migration
- [ ] Complete all phases above
- [ ] Test thoroughly on staging environment
- [ ] Get stakeholder approval on design
- [ ] Prepare rollback plan

### Post-Migration
- [ ] Monitor analytics for traffic changes
- [ ] Check for 404 errors in logs
- [ ] Submit new sitemap to search engines
- [ ] Update external links if necessary
- [ ] Monitor Disqus comment migration
- [ ] Check social media previews

---

## Additional Considerations

### Content Updates During Migration
- Use feature branch for development
- Document content freeze period if needed
- Plan for handling new posts during migration

### Training/Documentation
- Document Astro content creation workflow
- Create guide for adding new posts
- Document deployment process
- Create troubleshooting guide

### Maintenance
- Set up automated dependency updates (Dependabot/Renovate)
- Configure error monitoring (Sentry, etc.)
- Set up uptime monitoring
- Regular backup strategy

---

## Estimated Timeline

- **Phase 1-2**: Project setup and schema design (1-2 days)
- **Phase 3**: Content migration (2-3 days, depending on post count)
- **Phase 4-5**: Routing and core features (3-4 days)
- **Phase 6**: Design customization (2-3 days)
- **Phase 7-8**: Static pages and SEO (2 days)
- **Phase 9**: Additional features (2-3 days)
- **Phase 10**: Deployment setup (1 day)
- **Phase 11**: Testing and QA (2-3 days)

**Total estimated time: 15-21 days** (depending on complexity and post volume)

---

## Success Criteria

✅ All blog posts accessible at original URLs
✅ All features working (comments, analytics, search, etc.)
✅ Design suitable for technical content
✅ Performance score >90 on Lighthouse
✅ No loss in search engine rankings after 30 days
✅ Cloudflare Pages successfully serving site
✅ Dark/light mode functioning properly
✅ Mobile-responsive across all devices


updateAtTime: 2025/12/10 17:03:10

planId: e60e6fa1-544e-484a-ab01-aa0c3377a5b9