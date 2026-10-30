/** PostCSS config for Next.js — plugins must be string keys, not require() functions. */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    './scripts/build/postcss-gate-hover.js': {},
  },
}
