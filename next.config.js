/** @type {import('next').NextConfig} */
const FRAMER_ORIGIN = 'https://laurenyip.framer.website'

const nextConfig = {
  // Static site output → folder `out/`. On Cloudflare Pages, set build output directory to `out` (not `build`).
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Legacy UI lives in src/pages as .js files; only `app/` should define routes (tsx/ts).
  pageExtensions: ['tsx', 'ts'],
  // Proxy Framer case studies in local dev (redirects handle production).
  async rewrites() {
    return [
      {
        source: '/aurora',
        destination: `${FRAMER_ORIGIN}/aurora`,
      },
      {
        source: '/aurora/',
        destination: `${FRAMER_ORIGIN}/aurora`,
      },
      {
        source: '/aurora/:path*',
        destination: `${FRAMER_ORIGIN}/aurora/:path*`,
      },
      {
        source: '/spruce',
        destination: `${FRAMER_ORIGIN}/spruce`,
      },
      {
        source: '/spruce/',
        destination: `${FRAMER_ORIGIN}/spruce`,
      },
      {
        source: '/spruce/:path*',
        destination: `${FRAMER_ORIGIN}/spruce/:path*`,
      },
      {
        source: '/amazon-giftwrapping',
        destination: `${FRAMER_ORIGIN}/amazon-giftwrapping`,
      },
      {
        source: '/amazon-giftwrapping/',
        destination: `${FRAMER_ORIGIN}/amazon-giftwrapping`,
      },
      {
        source: '/amazon-giftwrapping/:path*',
        destination: `${FRAMER_ORIGIN}/amazon-giftwrapping/:path*`,
      },
      {
        source: '/starmap',
        destination: `${FRAMER_ORIGIN}/starmap`,
      },
      {
        source: '/starmap/',
        destination: `${FRAMER_ORIGIN}/starmap`,
      },
      {
        source: '/starmap/:path*',
        destination: `${FRAMER_ORIGIN}/starmap/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
