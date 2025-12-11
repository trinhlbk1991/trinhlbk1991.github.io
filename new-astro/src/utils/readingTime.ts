/**
 * Calculate reading time for a blog post
 * Assumes average reading speed of 200 words per minute
 */
export function readingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Format reading time as a string
 */
export function formatReadingTime(content: string): string {
  const minutes = readingTime(content);
  return `${minutes} min read`;
}
