/** @type {import('next').NextConfig} */
const FRAMER_AURORA = 'https://laurenyip.framer.website'

const nextConfig = {
  // Static site output → folder `out/`. On Cloudflare Pages, set build output directory to `out` (not `build`).
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Legacy UI lives in src/pages as .js files; only `app/` should define routes (tsx/ts).
  pageExtensions: ['tsx', 'ts'],
  // Proxy /aurora to Framer in local dev (Netlify edge + redirects handle production).
  async rewrites() {
    return [
      {
        source: '/aurora',
        destination: `${FRAMER_AURORA}/aurora`,
      },
      {
        source: '/aurora/',
        destination: `${FRAMER_AURORA}/aurora`,
      },
      {
        source: '/aurora/:path*',
        destination: `${FRAMER_AURORA}/aurora/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
