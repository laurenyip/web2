'use client'

import { useEffect, useRef, useState } from 'react'
import './site-cursor.css'

const BUBBLE_DEFAULT = '/images/bubble-cursor.png'
const BUBBLE_LIGHT = '/images/bubble-cursor-light.png?v=3'

let sampleCanvas: HTMLCanvasElement | null = null

function parseRgb(color: string): [number, number, number, number] | null {
  const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i)
  if (!match) return null
  return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] !== undefined ? Number(match[4]) : 1]
}

function rgbString(r: number, g: number, b: number) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

function isFullyWhite(color: string): boolean {
  const rgba = parseRgb(color)
  if (!rgba) return false
  const [r, g, b, a] = rgba
  if (a < 0.05) return false
  return r >= 248 && g >= 248 && b >= 248
}

function isTransparent(color: string): boolean {
  const rgba = parseRgb(color)
  if (!rgba) return true
  return rgba[3] < 0.05
}

function sampleImagePixel(img: HTMLImageElement, x: number, y: number): string | null {
  const rect = img.getBoundingClientRect()
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null
  if (!img.complete || !img.naturalWidth) return null

  if (!sampleCanvas) sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = 1
  sampleCanvas.height = 1
  const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  const scaleX = img.naturalWidth / rect.width
  const scaleY = img.naturalHeight / rect.height
  const sx = (x - rect.left) * scaleX
  const sy = (y - rect.top) * scaleY

  try {
    ctx.clearRect(0, 0, 1, 1)
    ctx.drawImage(img, sx, sy, 1, 1, 0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    if (a < 20) return null
    return rgbString(r, g, b)
  } catch {
    return null
  }
}

function isOverMedia(x: number, y: number): boolean {
  const elements = document.elementsFromPoint(x, y)

  for (const el of elements) {
    if (!(el instanceof Element) || el.closest('.site-cursor')) continue

    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) {
      if (el instanceof HTMLImageElement) {
        const color = sampleImagePixel(el, x, y)
        if (!color || !isFullyWhite(color)) return true
        continue
      }
      return true
    }
  }

  return false
}

function resolveBackgroundColor(x: number, y: number): string | null {
  const elements = document.elementsFromPoint(x, y)

  for (const el of elements) {
    if (!(el instanceof Element) || el.closest('.site-cursor')) continue

    let node: Element | null = el
    while (node && node !== document.documentElement) {
      const bg = window.getComputedStyle(node).backgroundColor
      if (!isTransparent(bg)) return bg
      node = node.parentElement
    }
    break
  }

  const bodyBg = window.getComputedStyle(document.body).backgroundColor
  if (!isTransparent(bodyBg)) return bodyBg

  return window.getComputedStyle(document.documentElement).backgroundColor
}

function isOverWhiteBackground(x: number, y: number): boolean {
  if (isOverMedia(x, y)) return false
  const bg = resolveBackgroundColor(x, y)
  return bg !== null && isFullyWhite(bg)
}

export default function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLImageElement>(null)
  const [enabled, setEnabled] = useState(false)
  const visibleRef = useRef(false)
  const variantRef = useRef<'light' | 'default'>('default')

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || coarsePointer || reducedMotion) return

    document.documentElement.classList.add('site-cursor-active')
    setEnabled(true)

    const preload = new Image()
    preload.src = BUBBLE_LIGHT

    const updateCursor = (x: number, y: number) => {
      const node = cursorRef.current
      const bubble = bubbleRef.current
      if (!node || !bubble) return

      node.style.transform = `translate3d(${x}px, ${y}px, 0)`

      const useLight = isOverWhiteBackground(x, y)
      const nextVariant = useLight ? 'light' : 'default'
      if (nextVariant !== variantRef.current) {
        variantRef.current = nextVariant
        bubble.src = useLight ? BUBBLE_LIGHT : BUBBLE_DEFAULT
      }
    }

    const move = (event: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true
        cursorRef.current?.classList.add('site-cursor--visible')
      }
      updateCursor(event.clientX, event.clientY)
    }

    const leave = () => {
      visibleRef.current = false
      cursorRef.current?.classList.remove('site-cursor--visible')
    }

    const enter = () => {
      visibleRef.current = true
      cursorRef.current?.classList.add('site-cursor--visible')
    }

    const down = () => {
      const bubble = bubbleRef.current
      if (!bubble) return
      bubble.classList.remove('site-cursor-bubble--pop')
      void bubble.offsetWidth
      bubble.classList.add('site-cursor-bubble--pop')
      window.setTimeout(() => bubble.classList.remove('site-cursor-bubble--pop'), 250)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', down, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      document.documentElement.classList.remove('site-cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={cursorRef} className="site-cursor" aria-hidden="true">
      <img
        ref={bubbleRef}
        className="site-cursor-bubble"
        src={BUBBLE_DEFAULT}
        alt=""
        draggable={false}
      />
    </div>
  )
}
