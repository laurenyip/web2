/**
 * Build out/_redirects after `next build`.
 * Merges Framer rules from public/_redirects with explicit rewrites for each exported HTML page.
 * Avoids a SPA catch-all to /index.html, which breaks direct URLs like /portfolio.
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const src = path.join(root, 'public', '_redirects')
const outDir = path.join(root, 'out')
const dest = path.join(outDir, '_redirects')

if (!fs.existsSync(src)) {
  console.error('copy-redirects: public/_redirects not found.')
  process.exit(1)
}

if (!fs.existsSync(outDir)) {
  console.error('copy-redirects: out/ not found. Run next build first.')
  process.exit(1)
}

function collectHtmlRoutes(dir, base = '') {
  const routes = []

  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const rel = base ? `${base}/${name}` : name

    if (fs.statSync(full).isDirectory()) {
      routes.push(...collectHtmlRoutes(full, rel))
      continue
    }

    if (!name.endsWith('.html') || name === '404.html') continue

    const routeSegment = name.slice(0, -5)
    const routePath = base ? `${base}/${routeSegment}` : routeSegment
    if (routePath === 'index') continue

    routes.push({
      url: `/${routePath.replace(/\\/g, '/')}`,
      file: `/${rel.replace(/\\/g, '/')}`,
    })
  }

  return routes
}

const framerRules = fs
  .readFileSync(src, 'utf8')
  .split('\n')
  .filter((line) => !line.includes('scripts/copy-redirects.js'))
  .join('\n')
  .trimEnd()

const pageRules = collectHtmlRoutes(outDir)
  .sort((a, b) => b.url.length - a.url.length)
  .flatMap(({ url, file }) => [`${url}    ${file}   200`, `${url}/    ${file}   200`])

const redirects = [framerRules, '', '# Next.js static pages', ...pageRules].join('\n').trimEnd() + '\n'

fs.writeFileSync(dest, redirects)
console.log(`copy-redirects: wrote out/_redirects (${pageRules.length / 2} routes)`)
