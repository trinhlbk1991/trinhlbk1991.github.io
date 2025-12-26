export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'site.description': 'A technical blog managed by a geek who loves climbing',
    'nav.home': 'Home',
    'nav.archives': 'Archives',
    'nav.categories': 'Categories',
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'home.welcome': 'Welcome to',
    'home.latest': 'Latest Articles',
    'home.viewAll': 'View all',
    'home.hero.title': 'Technical',
    'home.hero.titleHighlight': 'Sharing',
    'home.hero.subtitle': 'from Another Indie Hacker',
    'home.hero.description': 'Exploring Android, iOS, frontend development, and everything in between. A geek\'s journey through code, climbing, and continuous learning.',
    'home.hero.browseArticles': 'Browse Articles',
    'post.readTime': 'min read',
    'post.share': 'Share this article',
    'post.related': 'Related Posts',
    'post.comments': 'Comments',
    'footer.rights': 'All rights reserved.',
    'search.placeholder': 'Search posts...',
    'search.noResults': 'No results found for',
    'search.tryDifferent': 'Try different keywords',
    'search.searching': 'Searching...',
    'search.startTyping': 'Start typing to search...',
    'category.article': 'article',
    'category.articles': 'articles',
    'category.inCategory': 'in this category',
    'category.viewAllCategories': 'View all categories',
    'category.viewAllPosts': 'View all posts',
  },
  vi: {
    'site.description': 'Blog công nghệ của một geek yêu thích leo núi',
    'nav.home': 'Trang chủ',
    'nav.archives': 'Lưu trữ',
    'nav.categories': 'Danh mục',
    'nav.tags': 'Thẻ',
    'nav.about': 'Giới thiệu',
    'home.welcome': 'Chào mừng đến với',
    'home.latest': 'Bài viết mới nhất',
    'home.viewAll': 'Xem tất cả',
    'home.hero.title': 'Technial',
    'home.hero.titleHighlight': 'Sharing',
    'home.hero.subtitle': 'Từ Góc Nhìn Của Một Indie Hacker',
    'home.hero.description': 'Nơi mình lưu lại và chia sẻ kiến thức và trải nghiệm của bản thân. Hành trình của một geek qua code, leo núi và học hỏi.',
    'home.hero.browseArticles': 'Xem Bài Viết',
    'post.readTime': 'phút đọc',
    'post.share': 'Chia sẻ bài viết này',
    'post.related': 'Bài viết liên quan',
    'post.comments': 'Bình luận',
    'footer.rights': 'Đã đăng ký Bản quyền.',
    'search.placeholder': 'Tìm kiếm bài viết...',
    'search.noResults': 'Không tìm thấy kết quả cho',
    'search.tryDifferent': 'Thử từ khóa khác',
    'search.searching': 'Đang tìm kiếm...',
    'search.startTyping': 'Nhập để tìm kiếm...',
    'category.article': 'bài viết',
    'category.articles': 'bài viết',
    'category.inCategory': 'trong danh mục này',
    'category.viewAllCategories': 'Xem tất cả danh mục',
    'category.viewAllPosts': 'Xem tất cả bài viết',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
