/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design System: Tech Blog - Clean & Professional
        surface: {
          root: '#f8fafc', // slate-50
          1: '#ffffff',
          2: '#f1f5f9', // slate-100
          3: '#e2e8f0', // slate-200
          inverse: '#0f172a', // slate-900
        },
        primary: {
          DEFAULT: '#19A485', // old green primary
          hover: '#0e5546', // darker green
          light: '#d4f4ed', // light green
        },
        content: {
          DEFAULT: '#0f172a', // slate-900
          muted: '#475569', // slate-600
          subtle: '#94a3b8', // slate-400
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
