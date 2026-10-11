import html2canvas from 'html2canvas'
import { GIFEncoder, quantize, applyPalette } from 'gifenc'

export const STARMAP_CYCLE_MS = 8000
export const STARMAP_EXPORT_WIDTH = 360
export const STARMAP_EXPORT_HEIGHT = 240

const ANIMATED =
  '.starmap-thumb-text, .starmap-thumb-star-icon, .starmap-thumb-constellation, .starmap-thumb-node'

const TWINKLE_DELAYS = [0, 0.5, 1.1, 0.3, 0.8]
const TWINKLE_MS = 2200

function pauseTimeline(root, timeMs) {
  root.querySelectorAll(ANIMATED).forEach((el) => {
    const styles = getComputedStyle(el)
    const duration = styles.animationDuration
    el.style.animationPlayState = 'paused'
    el.style.animationDuration = duration
    el.style.animationDelay = `-${timeMs}ms`
  })

  root.querySelectorAll('.starmap-thumb-node').forEach((el, i) => {
    const stagger = (TWINKLE_DELAYS[i] ?? 0) * 1000
    const t = (timeMs + stagger) % TWINKLE_MS
    el.style.animationDuration = `${TWINKLE_MS}ms`
    el.style.animationDelay = `-${t}ms`
  })
}

function resumeTimeline(root) {
  root.querySelectorAll(ANIMATED).forEach((el) => {
    el.style.animationPlayState = ''
    el.style.animationDuration = ''
    el.style.animationDelay = ''
  })
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Capture a looping starmap thumb animation as GIF (360×240 by default).
 */
export async function exportStarmapGif(rootEl, options = {}) {
  if (!rootEl) throw new Error('Missing starmap thumb element')

  const {
    width = STARMAP_EXPORT_WIDTH,
    height = STARMAP_EXPORT_HEIGHT,
    durationMs = STARMAP_CYCLE_MS,
    fps = 10,
    onProgress,
  } = options

  const frameDelay = Math.round(1000 / fps)
  const frameCount = Math.ceil(durationMs / frameDelay)
  const prevWidth = rootEl.style.width
  const prevHeight = rootEl.style.height
  const prevMinHeight = rootEl.style.minHeight

  rootEl.style.width = `${width}px`
  rootEl.style.height = `${height}px`
  rootEl.style.minHeight = `${height}px`

  const gif = GIFEncoder()
  let sharedPalette = null

  try {
    for (let i = 0; i < frameCount; i++) {
      const timeMs = Math.min(i * frameDelay, durationMs - 1)
      pauseTimeline(rootEl, timeMs)

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

      const canvas = await html2canvas(rootEl, {
        width,
        height,
        scale: 1,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      })

      const ctx = canvas.getContext('2d')
      const { data } = ctx.getImageData(0, 0, width, height)

      if (!sharedPalette) {
        sharedPalette = quantize(data, 256)
      }

      const index = applyPalette(data, sharedPalette)
      gif.writeFrame(index, width, height, {
        palette: sharedPalette,
        delay: frameDelay,
      })

      onProgress?.((i + 1) / frameCount)
    }

    gif.finish()
    const blob = new Blob([gif.bytes()], { type: 'image/gif' })
    downloadBlob(blob, 'starmap-thumb.gif')
    return blob
  } finally {
    resumeTimeline(rootEl)
    rootEl.style.width = prevWidth
    rootEl.style.height = prevHeight
    rootEl.style.minHeight = prevMinHeight
  }
}
