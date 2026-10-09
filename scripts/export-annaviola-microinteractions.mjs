/**
 * Record hover microinteractions from annaviolamusic.com as GIFs for the case study.
 * Run: node scripts/export-annaviola-microinteractions.mjs
 * Set CHROME_PATH if Chrome is not at the default Windows location.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import { PNG } from 'pngjs'
import gifenc from 'gifenc'

const { GIFEncoder, quantize, applyPalette } = gifenc

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public/images/projects/annaviola')
const SITE_URL = 'https://annaviolamusic.com/'
const CHROME_PATH =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const FRAME_INTERVAL_MS = 50

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Puppeteer has no visible pointer, so draw one that follows the mouse.
async function injectCursor(page) {
  await page.evaluate(() => {
    const cursor = document.createElement('div')
    cursor.innerHTML =
      '<svg width="18" height="26" viewBox="0 0 18 26"><path d="M1 1 L1 20 L6 15.5 L9.5 24 L12.5 22.8 L9 14.5 L16 14.5 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    Object.assign(cursor.style, {
      position: 'fixed',
      left: '-40px',
      top: '-40px',
      zIndex: '2147483647',
      pointerEvents: 'none',
    })
    document.body.appendChild(cursor)
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    })
  })
}

async function center(page, selector) {
  return page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect()
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
  })
}

// Screenshot the clip on a timer while `actions` runs, keeping real frame timing.
async function record(page, clip, actions) {
  const frames = []
  let running = true
  const loop = (async () => {
    while (running) {
      const started = Date.now()
      const buffer = await page.screenshot({ type: 'png', clip })
      frames.push({ buffer, at: started })
      const wait = FRAME_INTERVAL_MS - (Date.now() - started)
      if (wait > 0) await sleep(wait)
    }
  })()
  await actions()
  running = false
  await loop
  return frames
}

function writeGif(frames, outPath) {
  const gif = GIFEncoder()
  frames.forEach((frame, i) => {
    const png = PNG.sync.read(frame.buffer)
    const next = frames[i + 1]
    const delay = next ? next.at - frame.at : 600
    const palette = quantize(png.data, 256)
    const index = applyPalette(png.data, palette)
    gif.writeFrame(index, png.width, png.height, { palette, delay })
  })
  gif.finish()
  fs.writeFileSync(outPath, Buffer.from(gif.bytes()))
  console.log(`GIF saved → ${outPath} (${frames.length} frames)`)
}

async function recordSocials(page) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(400)

  const icons = ['TikTok', 'Instagram', 'YouTube', 'Spotify']
  const first = await center(page, 'a[aria-label="TikTok"]')
  const clip = { x: first.x - 70, y: first.y - 40, width: 260, height: 80 }

  await page.mouse.move(clip.x + 4, clip.y + clip.height - 6)
  const frames = await record(page, clip, async () => {
    await sleep(500)
    for (const label of icons) {
      const c = await center(page, `a[aria-label="${label}"]`)
      await page.mouse.move(c.x, c.y, { steps: 10 })
      await sleep(700)
    }
    await page.mouse.move(clip.x + clip.width - 4, clip.y + clip.height - 6, { steps: 10 })
    await sleep(500)
  })
  writeGif(frames, path.join(OUT_DIR, 'microinteraction-socials.gif'))
}

async function recordReleaseStar(page) {
  const rows = 'a.group.block.border-b'
  await page.$eval(rows, (el) => el.scrollIntoView({ block: 'center' }))
  await sleep(600)

  const box = await page.$$eval(rows, (els) => {
    const list = els.slice(0, 3).map((el) => el.getBoundingClientRect())
    const top = list[0].top
    const bottom = list[list.length - 1].bottom
    return { x: list[0].left, y: top, width: list[0].width, height: bottom - top, scrollY: window.scrollY }
  })
  const pad = 24
  // Mouse moves use viewport coordinates; screenshot clips use page coordinates.
  const view = {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  }
  const clip = { ...view, y: view.y + box.scrollY }

  await page.mouse.move(view.x + 6, view.y + 6)
  const frames = await record(page, clip, async () => {
    await sleep(500)
    const stars = await page.$$eval(rows, (els) =>
      els.slice(0, 3).map((el) => {
        const svg = el.querySelector('svg') || el
        const r = svg.getBoundingClientRect()
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
      })
    )
    for (const star of stars) {
      await page.mouse.move(star.x - 120, star.y, { steps: 12 })
      await sleep(900)
    }
    await page.mouse.move(view.x + 6, view.y + view.height - 6, { steps: 12 })
    await sleep(600)
  })
  writeGif(frames, path.join(OUT_DIR, 'microinteraction-release-star.gif'))
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, executablePath: CHROME_PATH })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })

  console.log(`Opening ${SITE_URL}…`)
  await page.goto(SITE_URL, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(() => document.fonts?.ready)
  await sleep(1500)
  await injectCursor(page)

  await recordSocials(page)
  await recordReleaseStar(page)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
