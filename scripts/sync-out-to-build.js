/**
 * Cloudflare Pages is often still set to "build" (CRA). Next static export uses `out/`.
 * After `next build`, mirror `out/` → `build/` so that setting keeps working.
 * Prefer setting the Pages "Build output directory" to `out` and removing this step later.
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const outDir = path.join(root, 'out')
const buildDir = path.join(root, 'build')

if (!fs.existsSync(outDir)) {
  console.error('sync-out-to-build: out/ not found. Run next build first.')
  process.exit(1)
}

if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true })
}

fs.cpSync(outDir, buildDir, { recursive: true })
console.log('sync-out-to-build: copied out/ → build/')
