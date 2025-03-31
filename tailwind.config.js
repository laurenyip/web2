/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        melo: ['Melo', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
