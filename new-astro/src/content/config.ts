import { defineCollection, z } from 'astro:content';

// Tech blog post schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    date: z.date(), // Publication date
    categories: z.array(z.string()).max(2), // Max 2 categories for URL structure

    // Optional SEO and metadata
    description: z.string().optional(),
    summary: z.string().optional(), // Short summary for post cards
    image: z.string().optional(), // Preview image path
    imageAlt: z.string().optional(),

    // Optional features
    tags: z.array(z.string()).default([]),
    toc: z.boolean().default(true), // Table of contents
    comments: z.boolean().default(true), // Disqus comments
    pin: z.boolean().default(false), // Pin to homepage top
    math: z.boolean().default(false), // Enable MathJax
    mermaid: z.boolean().default(false), // Enable Mermaid diagrams

    // Timestamps
    updatedAt: z.date().optional(),
  }),
});

// Privacy policy and terms schema
const privacyPolicyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),

    // Optional fields
    image: z.string().optional(),
    author: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  'privacy-policy': privacyPolicyCollection,
};
