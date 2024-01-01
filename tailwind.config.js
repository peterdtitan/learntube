/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss-animate');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['montserrat', 'sans-serif'],
        lato: ['lato', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
      },
    },
  },
  plugins: [plugin],
};
