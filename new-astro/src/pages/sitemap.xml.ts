import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'archives', priority: '0.8', changefreq: 'weekly' },
    { url: 'categories', priority: '0.8', changefreq: 'weekly' },
    { url: 'tags', priority: '0.8', changefreq: 'weekly' },
    { url: 'search', priority: '0.6', changefreq: 'monthly' },
  ];
  
  const blogPosts = posts.map(post => {
    const category = post.id.split('/')[0];
    const filename = post.id.split('/')[1];
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    
    return {
      url: `${category}/${slug}`,
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