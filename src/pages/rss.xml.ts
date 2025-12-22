import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: sortedPosts.map((post) => {
      const category = post.id.split('/')[0];
      const filename = post.id.split('/')[1];
      const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      const link = `/${category}/${slug}/`;
      
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || '',
        link: link,
        categories: post.data.categories || [],
        author: SITE.author,
      };
    }),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
};