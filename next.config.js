/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static site output → folder `out/`. On Cloudflare Pages, set build output directory to `out` (not `build`).
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Legacy UI lives in src/pages as .js files; only `app/` should define routes (tsx/ts).
  pageExtensions: ['tsx', 'ts'],
}

module.exports = nextConfig
