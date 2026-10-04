/** @type {import('tailwindcss').Config} */

const animate = require('tailwindcss-animate');
const plugin = require('tailwindcss/plugin');
const { palette, radius } = require('./src/design/tokens');

const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
const toVars = (colors) => Object.fromEntries(
  Object.entries(colors).map(([name, hex]) => [`--lt-${kebab(name)}`, rgb(hex)]),
);

// Each token becomes a utility (bg-canvas, text-muted, border-line...) backed by a CSS
// variable, so the same class switches automatically between light and dark.
const colors = Object.fromEntries(
  Object.keys(palette.light).map((name) => [kebab(name), `rgb(var(--lt-${kebab(name)}) / <alpha-value>)`]),
);

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sm: radius.sm, md: radius.md, lg: radius.lg, pill: radius.pill,
      },
      keyframes: {
        caret: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        bob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translate3d(0, -10px, 0) rotate(calc(var(--tilt, 0deg) * -1))' },
        },
        drift: {
          '0%': { transform: 'perspective(500px) rotateX(62deg) translateY(0)' },
          '100%': { transform: 'perspective(500px) rotateX(62deg) translateY(48px)' },
        },
      },
      animation: {
        caret: 'caret 1s steps(1) infinite',
        bob: 'bob 6s ease-in-out infinite',
        drift: 'drift 4s linear infinite',
      },
    },
  },
  plugins: [
    animate,
    plugin(({ addBase }) => {
      addBase({
        ':root': { ...toVars(palette.light), colorScheme: 'light' },
        '.dark': { ...toVars(palette.dark), colorScheme: 'dark' },
      });
    }),
  ],
};
