/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        space: ['var(--font-space)']
      },
      width: {
        'ctnr': 'min(90%, 64rem)',
      },
      colors: {
        primary: "#0f234e",
        secondary: "#f9f0ee"
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
