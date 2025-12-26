import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  const searchIndex = posts.map((post) => {
    // Extract category and slug from id
    const [lang, category, ...rest] = post.id.split('/');
    const filename = rest.join('/');
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');

    return {
      title: post.data.title,
      description: post.data.description || '',
      categories: post.data.categories || [],
      tags: post.data.tags || [],
      date: post.data.date.toISOString(),
      url: lang === 'en' ? `/${category}/${slug}/` : `/${lang}/${category}/${slug}/`,
      lang: lang,
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};