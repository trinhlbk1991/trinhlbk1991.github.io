/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design System: Tech Blog - Clean & Professional
        // Using CSS variables for theme support
        surface: {
          root: 'rgb(var(--color-surface-root) / <alpha-value>)',
          1: 'rgb(var(--color-surface-1) / <alpha-value>)',
          2: 'rgb(var(--color-surface-2) / <alpha-value>)',
          3: 'rgb(var(--color-surface-3) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--color-content) / <alpha-value>)',
          muted: 'rgb(var(--color-content-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-content-subtle) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-2xl': [
          '4.5rem',
          { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'display-xl': [
          '3.75rem',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'display-l': [
          '3rem',
          { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'heading-l': [
          '2.25rem',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        'heading-m': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'heading-s': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-l': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-s': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: [
          '0.75rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          },
        ],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        'soft-hover': '0 10px 25px -5px rgba(28, 25, 23, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
