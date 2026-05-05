module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx,mdx}', './src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}