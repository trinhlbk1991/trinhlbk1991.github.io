import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function parsePostId(id: string) {
  // Handle both "lang/category/slug.md" and legacy "category/slug.md"
  const parts = id.split('/');
  if (parts.length >= 3) {
    // New format: lang/category/slug.md
    return {
      lang: parts[0],
      category: parts[1],
      slug: parts.slice(2).join('/').replace(/\.md$/, ''),
    };
  } else {
    // Legacy format: category/slug.md (assume 'en')
    return {
      lang: 'en',
      category: parts[0],
      slug: parts.slice(1).join('/').replace(/\.md$/, ''),
    };
  }
}

export async function getPostsByLang(lang: string) {
  const posts = await getCollection('blog');
  return posts.filter((post) => {
    const { lang: postLang } = parsePostId(post.id);
    return postLang === lang;
  });
}
