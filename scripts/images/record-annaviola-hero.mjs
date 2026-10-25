/**
 * Record a short walkthrough of annaviolamusic.com for the Anna Viola case study hero:
 * hover the socials, hover the release stars, open Listen and hover the cover videos.
 * Run: node scripts/images/record-annaviola-hero.mjs
 * Needs Playwright's Chromium and ffmpeg (npx playwright install chromium ffmpeg).
 */

import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const OUT_DIR = path.join(ROOT, 'public/images/projects/annaviola')
const OUT_VIDEO = path.join(OUT_DIR, 'hero-walkthrough.webm')
const OUT_POSTER = path.join(OUT_DIR, 'hero-walkthrough-poster.jpg')
const SITE_URL = 'https://annaviolamusic.com/'
const VIEWPORT = { width: 1440, height: 900 }
const VIDEO_SIZE = { width: 1280, height: 800 }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Playwright has no visible pointer, so draw one that follows the mouse on every page.
const CURSOR_SCRIPT = () => {
  const add = () => {
    const cursor = document.createElement('div')
    cursor.innerHTML =
      '<svg width="22" height="32" viewBox="0 0 18 26"><path d="M1 1 L1 20 L6 15.5 L9.5 24 L12.5 22.8 L9 14.5 L16 14.5 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    Object.assign(cursor.style, {
      position: 'fixed',
      left: '-60px',
      top: '-60px',
      zIndex: '2147483647',
      pointerEvents: 'none',
    })
    document.body.appendChild(cursor)
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    })
  }
  if (document.body) add()
  else document.addEventListener('DOMContentLoaded', add)
}

function ffmpegPath() {
  const base = path.join(os.homedir(), 'AppData/Local/ms-playwright')
  const dir = fs.readdirSync(base).find((d) => d.startsWith('ffmpeg-'))
  if (!dir) throw new Error('Playwright ffmpeg not found; run: npx playwright install ffmpeg')
  const exe = fs.readdirSync(path.join(base, dir)).find((f) => f.startsWith('ffmpeg'))
  return path.join(base, dir, exe)
}

async function centerOf(page, selector) {
  return page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect()
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
  })
}

async function smoothScroll(page, deltaY, steps = 30, stepMs = 40) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, deltaY / steps)
    await sleep(stepMs)
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'annaviola-rec-'))

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: tmpDir, size: VIDEO_SIZE },
  })
  await context.addInitScript(CURSOR_SCRIPT)
  const recordingStarted = Date.now()
  const page = await context.newPage()

  console.log(`Opening ${SITE_URL}…`)
  await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 60000 })
  await page.evaluate(() => document.fonts?.ready)
  await sleep(1200)
  await page.mouse.move(520, 420)
  await sleep(300)

  // The walkthrough starts here; everything before it is trimmed off.
  const showStart = (Date.now() - recordingStarted) / 1000
  await page.screenshot({ path: OUT_POSTER, type: 'jpeg', quality: 85 })
  await sleep(600)

  // 1. Socials in the navbar grow on hover.
  for (const label of ['TikTok', 'Instagram', 'YouTube', 'Spotify']) {
    const c = await centerOf(page, `a[aria-label="${label}"]`)
    await page.mouse.move(c.x, c.y, { steps: 14 })
    await sleep(550)
  }

  // 2. Scroll to the singles; each release's star lights up on hover.
  await page.mouse.move(720, 500, { steps: 14 })
  await smoothScroll(page, 640)
  await sleep(500)
  const stars = await page.$$eval('a.group.block.border-b', (els) =>
    els.slice(0, 3).map((el) => {
      const svg = el.querySelector('svg') || el
      const r = svg.getBoundingClientRect()
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
    })
  )
  for (const star of stars) {
    await page.mouse.move(star.x - 140, star.y, { steps: 14 })
    await sleep(800)
  }

  // 3. Back up to Listen.
  await smoothScroll(page, -640)
  await sleep(400)
  const listen = await centerOf(page, 'a[href="/music"]')
  await page.mouse.move(listen.x, listen.y, { steps: 18 })
  await sleep(500)
  await Promise.all([page.waitForURL('**/music', { timeout: 30000 }), page.mouse.click(listen.x, listen.y)])
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {})
  await page.mouse.move(listen.x, listen.y)
  await sleep(900)

  // 4. Each cover plays its canvas video while hovered.
  for (const alt of ['Parallel Lines cover', 'Right Time, Wrong Person cover']) {
    const c = await centerOf(page, `img[alt="${alt}"]`)
    await page.mouse.move(c.x, c.y, { steps: 20 })
    await sleep(2600)
  }
  await page.mouse.move(1240, 560, { steps: 16 })
  await sleep(700)

  const showEnd = (Date.now() - recordingStarted) / 1000
  const raw = await page.video().path()
  await context.close()
  await browser.close()

  // Trim the page load off the front and re-encode at a size that suits a hero.
  execFileSync(ffmpegPath(), [
    '-y',
    '-ss', showStart.toFixed(2),
    '-to', showEnd.toFixed(2),
    '-i', raw,
    '-an',
    '-c:v', 'libvpx',
    '-b:v', '1600k',
    '-auto-alt-ref', '0',
    OUT_VIDEO,
  ], { stdio: 'inherit' })
  fs.rmSync(tmpDir, { recursive: true, force: true })

  console.log(`Video saved → ${OUT_VIDEO} (${(showEnd - showStart).toFixed(1)}s)`)
  console.log(`Poster saved → ${OUT_POSTER}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
