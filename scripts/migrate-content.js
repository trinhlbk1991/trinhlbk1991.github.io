#!/usr/bin/env node

/**
 * Jekyll to Astro Content Migration Script
 * Migrates blog posts from Jekyll format to Astro Content Collections
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const JEKYLL_ROOT = path.join(__dirname, '../..');
const ASTRO_CONTENT = path.join(__dirname, '../src/content/blog');

// Categories to migrate
const CATEGORIES = ['android', 'ios', 'fe', 'javascript', 'til'];

/**
 * Parse Jekyll frontmatter and convert to Astro format
 */
function convertFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.warn('No frontmatter found');
    return { frontmatter: '', body: content };
  }

  const frontmatterText = match[1];
  const body = content.slice(match[0].length).trim();

  // Parse YAML-like frontmatter (basic parsing)
  const lines = frontmatterText.split('\n');
  const parsed = {};

  for (const line of lines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();

      // Remove quotes if present
      let cleanValue = value.replace(/^["']|["']$/g, '');

      // Handle arrays
      if (line.trim().startsWith('-')) {
        continue; // Skip array items for now
      }

      // Handle categories and tags arrays
      if (key.trim() === 'categories' || key.trim() === 'tags') {
        if (value.startsWith('[')) {
          // Parse array format
          cleanValue = value
            .replace(/[\[\]]/g, '')
            .split(',')
            .map(v => v.trim().replace(/["']/g, ''));
        }
      }

      parsed[key.trim()] = cleanValue;
    }
  }

  // Build Astro frontmatter
  let astroFrontmatter = '---\n';

  // Required fields
  if (parsed.title) {
    astroFrontmatter += `title: "${parsed.title.replace(/"/g, '\\"')}"\n`;
  }

  if (parsed.date) {
    // Convert Jekyll date format to ISO
    let dateStr = parsed.date;
    if (typeof dateStr === 'string') {
      // Handle format: 2023-01-15 10:30:00 +0800
      const dateMatch = dateStr.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        dateStr = dateMatch[1];
      }
    }
    astroFrontmatter += `date: ${dateStr}\n`;
  }

  // Categories (convert to array if string)
  if (parsed.categories) {
    const categories = Array.isArray(parsed.categories)
      ? parsed.categories
      : parsed.categories.split(',').map(c => c.trim());
    astroFrontmatter += `categories: ${JSON.stringify(categories)}\n`;
  }

  // Optional fields
  if (parsed.description) {
    astroFrontmatter += `description: "${parsed.description.replace(/"/g, '\\"')}"\n`;
  }

  if (parsed.tags) {
    const tags = Array.isArray(parsed.tags)
      ? parsed.tags
      : parsed.tags.split(',').map(t => t.trim());
    astroFrontmatter += `tags: ${JSON.stringify(tags)}\n`;
  }

  if (parsed.image) {
    astroFrontmatter += `image: "${parsed.image}"\n`;
  }

  // Boolean fields with defaults
  astroFrontmatter += `toc: ${parsed.toc !== 'false'}\n`;
  astroFrontmatter += `comments: ${parsed.comments !== 'false'}\n`;

  if (parsed.pin === 'true') {
    astroFrontmatter += `pin: true\n`;
  }

  if (parsed.math === 'true') {
    astroFrontmatter += `math: true\n`;
  }

  if (parsed.mermaid === 'true') {
    astroFrontmatter += `mermaid: true\n`;
  }

  astroFrontmatter += '---\n\n';

  return {
    frontmatter: astroFrontmatter,
    body: body
  };
}

/**
 * Migrate a single post
 */
async function migratePost(category, filename, jekyllPath) {
  try {
    console.log(`  Migrating: ${filename}`);

    // Read Jekyll post
    const content = await fs.readFile(jekyllPath, 'utf-8');

    // Convert frontmatter
    const { frontmatter, body } = convertFrontmatter(content);

    // Create Astro post
    const astroContent = frontmatter + body;

    // Write to Astro content directory
    const astroPath = path.join(ASTRO_CONTENT, category, filename);
    await fs.writeFile(astroPath, astroContent, 'utf-8');

    return true;
  } catch (error) {
    console.error(`  Error migrating ${filename}:`, error.message);
    return false;
  }
}

/**
 * Migrate all posts from a category
 */
async function migrateCategory(category) {
  console.log(`\nMigrating category: ${category}`);

  const jekyllCategoryPath = path.join(JEKYLL_ROOT, category, '_posts');
  const astroCategoryPath = path.join(ASTRO_CONTENT, category);

  try {
    // Check if Jekyll category directory exists
    try {
      await fs.access(jekyllCategoryPath);
    } catch {
      console.log(`  Skipping: ${category} directory not found`);
      return { success: 0, failed: 0, total: 0 };
    }

    // Ensure Astro category directory exists
    await fs.mkdir(astroCategoryPath, { recursive: true });

    // Read all files in category
    const files = await fs.readdir(jekyllCategoryPath);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`  Found ${mdFiles.length} posts`);

    let success = 0;
    let failed = 0;

    for (const file of mdFiles) {
      const jekyllFilePath = path.join(jekyllCategoryPath, file);
      const stat = await fs.stat(jekyllFilePath);

      if (stat.isFile()) {
        const result = await migratePost(category, file, jekyllFilePath);
        if (result) {
          success++;
        } else {
          failed++;
        }
      }
    }

    return { success, failed, total: mdFiles.length };
  } catch (error) {
    console.error(`Error processing category ${category}:`, error.message);
    return { success: 0, failed: 0, total: 0 };
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Jekyll to Astro Content Migration\n');
  console.log('Source:', JEKYLL_ROOT);
  console.log('Destination:', ASTRO_CONTENT);

  const results = {};

  for (const category of CATEGORIES) {
    const result = await migrateCategory(category);
    results[category] = result;
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary');
  console.log('='.repeat(50));

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalPosts = 0;

  for (const [category, result] of Object.entries(results)) {
    console.log(`\n${category.toUpperCase()}:`);
    console.log(`  Total: ${result.total}`);
    console.log(`  ✅ Success: ${result.success}`);
    console.log(`  ❌ Failed: ${result.failed}`);

    totalSuccess += result.success;
    totalFailed += result.failed;
    totalPosts += result.total;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📝 TOTAL POSTS: ${totalPosts}`);
  console.log(`✅ Successfully migrated: ${totalSuccess}`);
  console.log(`❌ Failed: ${totalFailed}`);

  if (totalFailed === 0) {
    console.log('\n✨ Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with some errors. Please review the output above.');
  }
}

// Run migration
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
