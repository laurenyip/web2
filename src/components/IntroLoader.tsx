'use client'

import { useEffect } from 'react'
import { paintIntroSky } from './introSkyExtend'

const MIN_HOLD_MS = 1100
const EXIT_MS = 480

function whenPageLoaded() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
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

    root.classList.add('intro-lock')

    const gif = el.querySelector<HTMLImageElement>('.intro-loader__gif')
    const canvas = el.querySelector<HTMLCanvasElement>('.intro-loader__extend')

    const paint = () => {
      if (cancelled || !gif || !canvas) return
      if (!gif.naturalWidth) return
      paintIntroSky(canvas, gif, el)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(paint, 40)
    }

    if (gif) {
      if (gif.complete) paint()
      else gif.addEventListener('load', paint)
    }
    window.addEventListener('resize', onResize)
    window.requestAnimationFrame(paint)
    window.setTimeout(paint, 50)

    const started = Date.now()

    Promise.all([whenPageLoaded(), new Promise((resolve) => window.setTimeout(resolve, minHold))]).then(() => {
      if (cancelled) return
      const wait = Math.max(0, minHold - (Date.now() - started))
      window.setTimeout(() => {
        if (cancelled) return
        el.classList.add('is-exit')
        exitTimer = window.setTimeout(() => {
          el.classList.add('is-gone')
          root.classList.remove('intro-lock')
        }, exit)
      }, wait)
    })

    return () => {
      cancelled = true
      if (exitTimer) window.clearTimeout(exitTimer)
      if (resizeTimer) window.clearTimeout(resizeTimer)
      gif?.removeEventListener('load', paint)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
