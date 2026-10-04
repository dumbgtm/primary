/** @type {import('tailwindcss').Config} */
// dumbGTM "HR Memo" system. Square corners, no shadows, no gradients.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    borderRadius: { none: '0', DEFAULT: '0', full: '9999px' },
    boxShadow: { none: 'none' },
    extend: {
      colors: {
        memo: 'var(--memo)',
        carbon: 'var(--carbon)',
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        muted: 'var(--muted)',
        staple: 'var(--staple)',
        rule: 'var(--rule)',
        blue: 'var(--blue)',
        'blue-hover': 'var(--blue-hover)',
        highlighter: 'var(--highlighter)',
      },
      fontFamily: {
        serif: ['"Libre Caslon Text"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { container: '1120px' },
    },
  },
  plugins: [],
};
