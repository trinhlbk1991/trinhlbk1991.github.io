import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  
  const searchIndex = posts.map((post) => {
    // Extract category and slug from id
    const category = post.id.split('/')[0];
    const filename = post.id.split('/')[1];
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    
    return {
      title: post.data.title,
      description: post.data.description || '',
      categories: post.data.categories || [],
      tags: post.data.tags || [],
      date: post.data.date.toISOString(),
      url: `/${category}/${slug}/`,
    };
  });
  
  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
