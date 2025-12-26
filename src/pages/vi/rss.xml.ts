import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../config';
import type { APIRoute } from 'astro';
import { parsePostId } from '../../utils/content';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog');
  
  // Filter for Vietnamese posts and sort by date
  const sortedPosts = posts
    .filter(post => {
      const { lang } = parsePostId(post.id);
      return lang === 'vi';
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: sortedPosts.map((post) => {
      const { category, slug } = parsePostId(post.id);
      const link = `/vi/${category}/${slug}/`;
      
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || '',
        link: link,
        categories: post.data.categories || [],
        author: SITE.author,
      };
    }),
    customData: `<language>vi-vn</language>`,
    stylesheet: '/rss-styles.xsl',
  });
};
