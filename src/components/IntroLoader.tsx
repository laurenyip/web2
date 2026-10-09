'use client'

import { useEffect } from 'react'
import {
  buildIntroSky,
  INTRO_SKY_PLACE,
  paintIntroSky,
  paletteFromGif,
  type IntroPalette,
  type IntroSky,
} from './introSkyExtend'

const MIN_HOLD_MS = 1100
const EXIT_MS = 480
const EMPTY_SKY: IntroSky = { stars: [], lines: [] }

function whenPageLoaded() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
}

function freezeGif(gif: HTMLImageElement) {
  if (gif.dataset.still === '1' || !gif.naturalWidth) return
  const still = document.createElement('canvas')
  still.width = gif.naturalWidth
  still.height = gif.naturalHeight
  const ctx = still.getContext('2d')
  if (!ctx) return
  ctx.drawImage(gif, 0, 0)
  gif.dataset.still = '1'
  try {
    gif.src = still.toDataURL('image/png')
  } catch {
    gif.dataset.still = ''
  }
}

export default function IntroLoader() {
  useEffect(() => {
    const root = document.documentElement
    const el = document.getElementById('intro-loader')
    if (!el) {
      root.classList.remove('intro-lock')
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minHold = reduced ? 160 : MIN_HOLD_MS
    const exit = reduced ? 220 : EXIT_MS
    let cancelled = false
    let exitTimer: number | undefined
    let resizeTimer: number | undefined
    let raf = 0

    root.classList.add('intro-lock')

    const canvas = el.querySelector<HTMLCanvasElement>('.intro-loader__sky')
    const gif = el.querySelector<HTMLImageElement>('.intro-loader__gif')
    let palette: IntroPalette = paletteFromGif(null)
    const place = INTRO_SKY_PLACE
    let sky: IntroSky = EMPTY_SKY
    let sized = { w: 0, h: 0 }
    let skyKey = ''

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const w = Math.round(rect.width)
      const h = Math.round(rect.height)
      const key = `${w}x${h}:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`
      if (key === skyKey) return
      sized = { w, h }
      skyKey = key
      sky = buildIntroSky(w, h, place, new Date())
    }

    const paint = (time: number) => {
      if (cancelled || !canvas) return
      measure()
      paintIntroSky(canvas, palette, sky, sized.w, sized.h, time, reduced)
    }

    const loop = (time: number) => {
      if (cancelled) return
      paint(time)
      raf = window.requestAnimationFrame(loop)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        skyKey = ''
        if (reduced) paint(0)
      }, 40)
    }

    paint(0)
    if (reduced) {
      window.addEventListener('resize', onResize)
    } else {
      raf = window.requestAnimationFrame(loop)
    }

    const onGif = () => {
      if (cancelled || !gif) return
      palette = paletteFromGif(gif)
      if (reduced) freezeGif(gif)
      if (reduced) paint(0)
    }
    if (gif) {
      gif.addEventListener('load', onGif)
      if (gif.complete && gif.naturalWidth) onGif()
    }

    const started = Date.now()

    Promise.all([whenPageLoaded(), new Promise((resolve) => window.setTimeout(resolve, minHold))]).then(() => {
      if (cancelled) return
      const wait = Math.max(0, minHold - (Date.now() - started))
      window.setTimeout(() => {
        if (cancelled) return
        el.classList.add('is-exit')
        exitTimer = window.setTimeout(() => {
          if (raf) window.cancelAnimationFrame(raf)
          raf = 0
          cancelled = true
          el.classList.add('is-gone')
          root.classList.remove('intro-lock')
        }, exit)
      }, wait)
    })

    return () => {
      cancelled = true
      if (raf) window.cancelAnimationFrame(raf)
      if (exitTimer) window.clearTimeout(exitTimer)
      if (resizeTimer) window.clearTimeout(resizeTimer)
      gif?.removeEventListener('load', onGif)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
