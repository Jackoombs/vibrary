/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ibm)', ...fontFamily.sans],
      },
      width: {
        'ctnr': 'min(90%, 64rem)',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
