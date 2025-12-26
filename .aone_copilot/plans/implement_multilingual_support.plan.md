### implement_multilingual_support ###
通过 Astro i18n 路由和内容目录重组，实现英语和越南语的双语支持，确保博客文章按语言隔离显示。


### Phase 1: Configuration & Utilities (配置与工具)

1.  **Update Astro Config**:
    -   Modify `astro.config.mjs` to enable `i18n`.
    -   Set `defaultLocale: "en"`, `locales: ["en", "vi"]`.
    -   Set `routing.prefixDefaultLocale: false` (English at root `/`, Vietnamese at `/vi/`).

2.  **Create i18n Utilities**:
    -   Create `src/utils/i18n.ts`:
        -   Define UI translation strings (e.g., "Home", "Latest Articles", "Read more").
        -   Add helper `useTranslations(lang)` to retrieve strings.
        -   Add helper `getLangFromUrl(url)` to determine current language.
    -   Create `src/utils/content.ts`:
        -   Add `parsePostId(id)` function.
        -   Logic: Handle both `lang/category/slug.md` and legacy `category/slug.md` formats. Returns `{ lang, category, slug }`.
        -   Add `filterPostsByLang(posts, lang)` helper.

### Phase 2: Content Migration (内容迁移)

3.  **Restructure Content Directory**:
    -   Create directories: `src/content/blog/en` and `src/content/blog/vi`.
    -   Move all existing category folders (`android`, `ios`, `fe`, `personal`, `til`) into `src/content/blog/en/`.
    -   *Note*: This changes the `id` of all posts. The `parsePostId` utility from Phase 1 is crucial here.

### Phase 3: Page Refactoring (页面重构)

4.  **Refactor Home Page**:
    -   Extract logic and UI from `src/pages/index.astro` to `src/components/pages/HomePage.astro`.
    -   Update `HomePage.astro` to accept `lang` prop and filter posts using `filterPostsByLang`.
    -   Update `src/pages/index.astro` to use `<HomePage lang="en" />`.
    -   Create `src/pages/vi/index.astro` using `<HomePage lang="vi" />`.

5.  **Refactor Post Details Page**:
    -   Extract logic from `src/pages/[category]/[slug].astro` to `src/components/pages/PostPage.astro`.
    -   Update `PostPage.astro` to use `parsePostId` for extracting category and slug.
    -   Update `src/pages/[category]/[slug].astro`:
        -   `getStaticPaths`: Filter for 'en' posts.
        -   Render `<PostPage lang="en" ... />`.
    -   Create `src/pages/vi/[category]/[slug].astro`:
        -   `getStaticPaths`: Filter for 'vi' posts.
        -   Render `<PostPage lang="vi" ... />`.

6.  **Refactor Category Page**:
    -   Extract logic from `src/pages/category/[category].astro` to `src/components/pages/CategoryPage.astro`.
    -   Update `src/pages/category/[category].astro` (English) and create `src/pages/vi/category/[category].astro` (Vietnamese).

7.  **Refactor Other Pages**:
    -   Apply similar refactoring to `archives.astro`, `tags.astro`, and `search.astro` to support `/vi/` routes and language filtering.

### Phase 4: UI Components (UI 组件)

8.  **Add Language Switcher**:
    -   Create `src/components/LanguageSwitcher.astro`.
    -   Logic: Generate links to the current page in the other language (e.g., `/android/post-1` <-> `/vi/android/post-1`).
    -   *Note*: For simple implementation, it can link to the homepage of the other language if exact page mapping is complex, but we will aim for path preservation.

9.  **Update BaseLayout**:
    -   Add `lang` prop to `src/layouts/BaseLayout.astro`.
    -   Pass `lang` to `<html>` tag.
    -   Include `<LanguageSwitcher />` in the header or footer.

10. **Update Search**:
    -   Update `src/pages/api/search.json.ts` (or wherever the search index is built) to include `lang` field.
    -   Update `src/components/HeaderSearch.astro` to filter results based on the current page's language.

### Phase 5: Verification (验证)

11. **Testing**:
    -   Verify English posts load at `/category/slug`.
    -   Verify Vietnamese posts (create a dummy one) load at `/vi/category/slug`.
    -   Check that the homepage only shows posts for the current language.
    -   Ensure internal links (categories, tags) stay within the current language scope.


updateAtTime: 2025/12/26 10:21:48

planId: 996ae228-54e0-48bb-8ab0-d585008b3ff2