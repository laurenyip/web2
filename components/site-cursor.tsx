'use client'

import { useEffect, useRef, useState } from 'react'
import './site-cursor.css'

export default function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLImageElement>(null)
  const [enabled, setEnabled] = useState(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || coarsePointer || reducedMotion) return

    document.documentElement.classList.add('site-cursor-active')
    setEnabled(true)

    const move = (event: MouseEvent) => {
      const node = cursorRef.current
      if (!node) return

      if (!visibleRef.current) {
        visibleRef.current = true
        node.classList.add('site-cursor--visible')
      }

      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
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
        src="/images/bubble-cursor.png"
        alt=""
        draggable={false}
      />
    </div>
  )
}
