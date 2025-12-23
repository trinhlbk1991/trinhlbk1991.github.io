export const SITE = {
  title: 'Iced Tea Labs',
  description: 'A technical blog managed by a geek who loves climbing',
  author: 'Trinh Le',
  url: 'https://icedtealabs.com',
  email: 'trinhlbk1991@gmail.com',

  // Social links
  social: {
    github: 'https://github.com/trinhlbk1991',
    twitter: 'https://twitter.com/trinhlbk1991',
    linkedin: 'https://www.linkedin.com/in/trinhlbk1991/',
  },

  // Analytics
  googleAnalyticsId: 'UA-48722139-1', // Legacy Universal Analytics (deprecated)
  ga4MeasurementId: 'G-1QY9E6KEP6', // TODO: Add your GA4 Measurement ID (format: G-XXXXXXXXXX)

  // Comments
  comments: {
    enabled: true,
    provider: 'giscus', // Using Giscus (GitHub Discussions)
    giscus: {
      repo: 'trinhlbk1991/trinhlbk1991.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnk0ODQ0MzU1Mw==',
      category: 'Announcements', // Or your chosen category name
      categoryId: 'DIC_kwDOAuMwoc4C0Ji9', // TODO: Get from https://giscus.app
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme', // Supports dark mode
      lang: 'en',
    },
  },

  // Legacy Disqus config (kept for reference, not used)
  disqus: {
    shortname: 'icetea09',
  },

  // Page Views
  pageViews: {
    enabled: false, // Temporarily disabled - KV namespace needs to be configured first
    provider: 'cloudflare-kv',
  },

  // Pagination
  postsPerPage: 10,

  // Avatar
  avatar: '/logo.png',

  // Tagline
  tagline: 'Glasses 👓 Geek 💻 Backpacker 🎒 Climber 🧗‍♂️',
} as const;
