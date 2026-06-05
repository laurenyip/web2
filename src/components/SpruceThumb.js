'use client'

import { useEffect, useMemo, useRef } from 'react'
import './SpruceThumb.css'

const STAR_PATH = 'M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z'
const VIDEO_SRC = '/images/projects/spruce/parkvid.mp4'
const LOGO_SRC = '/images/projects/spruce/spruce_logo.png'

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${seeded(i, 1) * 100}%`,
    top: `${50 + seeded(i, 2) * 20}%`,
    size: 6 + Math.floor(seeded(i, 3) * 8),
    delay: `${1.5 + seeded(i, 4) * 3.3}s`,
    duration: `${0.8 + seeded(i, 5) * 0.8}s`,
    gold: seeded(i, 6) > 0.45,
    glow: seeded(i, 7) > 0.75,
  }))
}

export default function SpruceThumb({ loop = false, exportRoot = false }) {
  const rootRef = useRef(null)
  const sparkles = useMemo(() => buildSparkles(20), [])

  useEffect(() => {
    if (loop) return undefined

    const timer = window.setTimeout(() => {
      const root = rootRef.current
      if (!root) return
      root.classList.add('spruce-thumb--frozen')
      root.querySelectorAll('*').forEach((node) => {
        if (node instanceof HTMLElement) {
          node.style.animationPlayState = 'paused'
        }
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

      <div className="spruce-thumb-sparkles" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className={`spruce-sparkle${sparkle.glow ? ' spruce-sparkle--glow' : ''}`}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: sparkle.gold ? '#FFE085' : '#ffffff',
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
          >
            <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ))}
      </div>

      <div className="spruce-thumb-logo-wrap">
        <img className="spruce-thumb-logo" src={LOGO_SRC} alt="" draggable={false} />
      </div>
    </div>
  )
}
