'use client'

import { useEffect, useRef } from 'react'
import './SpruceThumb.css'

const VIDEO_SRC = '/images/projects/spruce/parkvid.mp4'
const LOGO_SRC = '/images/projects/spruce/spruce_logo.png'

export default function SpruceThumb({ loop = false, exportRoot = false }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (loop) return undefined

    const timer = window.setTimeout(() => {
      const root = rootRef.current
      if (!root) return
      root.classList.add('spruce-thumb--frozen')
      root.querySelectorAll('*').forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        if (node.closest('.spruce-thumb-light')) return
        node.style.animationPlayState = 'paused'
      })
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [loop])

  return (
    <div
      ref={rootRef}
      className={`spruce-thumb${loop ? ' spruce-thumb--loop' : ''}`}
      {...(exportRoot ? { 'data-export-root': 'spruce' } : {})}
      aria-hidden="true"
    >
      <video
        className="spruce-thumb-bg"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="spruce-thumb-overlay" />

      <div className="spruce-thumb-light" aria-hidden="true">
        <span className="spruce-thumb-light-drift spruce-thumb-light-drift--sun" />
        <span className="spruce-thumb-light-drift spruce-thumb-light-drift--canopy" />
        <span className="spruce-thumb-light-sheen" />
      </div>

      <div className="spruce-thumb-logo-wrap">
        <img className="spruce-thumb-logo" src={LOGO_SRC} alt="" draggable={false} />
      </div>
    </div>
  )
}
