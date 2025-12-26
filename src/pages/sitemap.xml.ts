import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { parsePostId } from '../utils/content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  const staticPages = [
    // English pages
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'archives', priority: '0.8', changefreq: 'weekly' },
    { url: 'categories', priority: '0.8', changefreq: 'weekly' },
    { url: 'tags', priority: '0.8', changefreq: 'weekly' },
    { url: 'search', priority: '0.6', changefreq: 'monthly' },
    { url: 'privacy-policy', priority: '0.5', changefreq: 'monthly' },

    // Vietnamese pages
    { url: 'vi', priority: '1.0', changefreq: 'daily' },
    { url: 'vi/about', priority: '0.8', changefreq: 'monthly' },
    { url: 'vi/archives', priority: '0.8', changefreq: 'weekly' },
    { url: 'vi/categories', priority: '0.8', changefreq: 'weekly' },
    { url: 'vi/tags', priority: '0.8', changefreq: 'weekly' },
    { url: 'vi/search', priority: '0.6', changefreq: 'monthly' },
    { url: 'vi/privacy-policy', priority: '0.5', changefreq: 'monthly' },
  ];

  const blogPosts = posts.map(post => {
    const { lang, category, slug } = parsePostId(post.id);
    const url = lang === 'en' ? `${category}/${slug}` : `${lang}/${category}/${slug}`;

    return {
      url: url,
      lastmod: post.data.date.toISOString(),
      priority: '0.7',
      changefreq: 'monthly'
    };
  });

  const allPages = [...staticPages, ...blogPosts];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE.url}/${page.url}</loc>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};