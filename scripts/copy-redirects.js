/**
 * Copy public/_redirects → out/_redirects after `next build`.
 * Next may copy public/ assets, but this guarantees Netlify gets the latest rules.
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const src = path.join(root, 'public', '_redirects')
const dest = path.join(root, 'out', '_redirects')

if (!fs.existsSync(src)) {
  console.error('copy-redirects: public/_redirects not found.')
  process.exit(1)
}

if (!fs.existsSync(path.join(root, 'out'))) {
  console.error('copy-redirects: out/ not found. Run next build first.')
  process.exit(1)
}

fs.copyFileSync(src, dest)
console.log('copy-redirects: copied public/_redirects → out/_redirects')
