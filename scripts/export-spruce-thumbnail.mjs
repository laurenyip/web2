/**
 * Capture SpruceThumb at 30fps and export GIF + poster JPEG.
 * Requires dev server: npm run dev
 * Run: node scripts/export-spruce-thumbnail.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import { PNG } from 'pngjs'
import { GIFEncoder, quantize, applyPalette } from 'gifenc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const WIDTH = 360
const HEIGHT = 240
const DURATION_MS = 5000
const FPS = 30
const FRAME_DELAY = Math.round(1000 / FPS)
const PREVIEW_URL = process.env.THUMBNAIL_PREVIEW_URL || 'http://localhost:3000/thumbnail-preview'
const GIF_OUT = path.join(ROOT, 'public/thumbnails/spruce-case-study.gif')
const POSTER_OUT = path.join(ROOT, 'public/thumbnails/spruce-poster.jpg')

const ANIMATED =
  '.spruce-thumb-logo-wrap, .spruce-sparkle'

async function seekFrame(page, timeMs) {
  await page.evaluate(
    (t, selector) => {
      const root = document.querySelector('[data-export-root="spruce"]')
      if (!root) return

      const video = root.querySelector('.spruce-thumb-bg')
      if (video && Number.isFinite(video.duration)) {
        video.currentTime = (t / 1000) % video.duration
      }

      root.querySelectorAll(selector).forEach((el) => {
        const styles = getComputedStyle(el)
        if (styles.animationName === 'none') return

        el.style.animationPlayState = 'paused'

        if (el.classList.contains('spruce-sparkle')) {
          const dur = parseFloat(styles.animationDuration) * 1000 || 1200
          const delay = parseFloat(styles.animationDelay) * 1000 || 0
          el.style.animationDelay = `-${((t + delay) % dur)}ms`
        } else {
          el.style.animationDuration = '5000ms'
          el.style.animationDelay = `-${t}ms`
        }
      })
    },
    timeMs,
    ANIMATED
  )

  await new Promise((r) => setTimeout(r, 50))
}

function pngBufferToRgba(buffer) {
  const png = PNG.sync.read(buffer)
  return { data: png.data, width: png.width, height: png.height }
}

async function captureElement(page) {
  const el = await page.$('[data-export-root="spruce"]')
  if (!el) throw new Error('Export root not found — is the dev server running?')
  return el.screenshot({ type: 'png', omitBackground: false })
}

async function main() {
  fs.mkdirSync(path.dirname(GIF_OUT), { recursive: true })

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 })

  console.log(`Opening ${PREVIEW_URL}…`)
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle0', timeout: 60000 })

  await page.waitForSelector('[data-export-root="spruce"]')
  await page.waitForFunction(() => {
    const v = document.querySelector('.spruce-thumb-bg')
    return v && v.readyState >= 2
  }, { timeout: 15000 })

  const frameCount = Math.ceil(DURATION_MS / FRAME_DELAY)
  const gif = GIFEncoder()
  let sharedPalette = null

  console.log(`Capturing ${frameCount} frames…`)

  for (let i = 0; i < frameCount; i++) {
    const timeMs = Math.min(i * FRAME_DELAY, DURATION_MS - 1)
    await seekFrame(page, timeMs)

    const pngBuffer = await captureElement(page)
    const { data, width, height } = pngBufferToRgba(pngBuffer)

    if (width !== WIDTH || height !== HEIGHT) {
      console.warn(`Frame ${i}: expected ${WIDTH}×${HEIGHT}, got ${width}×${height}`)
    }

    if (!sharedPalette) {
      sharedPalette = quantize(data, 256)
    }

    const index = applyPalette(data, sharedPalette)
    gif.writeFrame(index, width, height, {
      palette: sharedPalette,
      delay: FRAME_DELAY,
    })

    if ((i + 1) % 30 === 0) {
      console.log(`  ${i + 1}/${frameCount}`)
    }
  }

  gif.finish()
  fs.writeFileSync(GIF_OUT, Buffer.from(gif.bytes()))
  console.log(`GIF saved → ${GIF_OUT}`)

  await seekFrame(page, 1200)
  const posterEl = await page.$('[data-export-root="spruce"]')
  await posterEl.screenshot({ path: POSTER_OUT, type: 'jpeg', quality: 90 })
  console.log(`Poster saved → ${POSTER_OUT}`)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
