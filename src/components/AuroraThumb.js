'use client'

import { useEffect, useMemo, useRef } from 'react'
import './AuroraThumb.css'

const STAR_PATH = 'M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z'
const BG_SRC = '/dog.jpg'

const SPARKLE_COLORS = ['#ffffff', '#D4BAFF', '#FFCBA4']

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${18 + seeded(i, 1) * 64}%`,
    top: `${22 + seeded(i, 2) * 38}%`,
    size: 7 + Math.floor(seeded(i, 3) * 8),
    popDelay: `${1.2 + seeded(i, 4) * 1}s`,
    twinkleDuration: `${1.5 + seeded(i, 5) * 1}s`,
    twinkleDelay: `${1.7 + seeded(i, 6) * 1.2}s`,
    color: SPARKLE_COLORS[Math.floor(seeded(i, 7) * SPARKLE_COLORS.length)],
  }))
}

function buildGlows(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${20 + seeded(i, 10) * 60}%`,
    top: `${25 + seeded(i, 11) * 45}%`,
    size: 20 + Math.floor(seeded(i, 12) * 9),
    duration: `${4 + seeded(i, 13) * 2}s`,
    delay: `${seeded(i, 14) * 2}s`,
  }))
}

export default function AuroraThumb({ loop = false, exportRoot = false }) {
  const rootRef = useRef(null)
  const sparkles = useMemo(() => buildSparkles(7), [])
  const glows = useMemo(() => buildGlows(3), [])

  useEffect(() => {
    if (loop) return undefined

    const timer = window.setTimeout(() => {
      const root = rootRef.current
      if (!root) return
      root.classList.add('aurora-thumb--frozen')
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
      className={`aurora-thumb${loop ? ' aurora-thumb--loop' : ''}${exportRoot ? ' aurora-thumb--fixed' : ''}`}
      {...(exportRoot ? { 'data-export-root': 'aurora' } : {})}
      aria-hidden="true"
    >
      <img
        className="aurora-thumb-bg"
        src={BG_SRC}
        alt=""
        draggable={false}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
      />
      <div className="aurora-thumb-overlay" />

      <div className="aurora-thumb-glows" aria-hidden="true">
        {glows.map((glow) => (
          <span
            key={glow.id}
            className="aurora-glow"
            style={{
              left: glow.left,
              top: glow.top,
              width: `${glow.size}px`,
              height: `${glow.size}px`,
              animationDuration: glow.duration,
              animationDelay: glow.delay,
            }}
          />
        ))}
      </div>

      <div className="aurora-thumb-sparkles" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="aurora-sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: sparkle.color,
              '--pop-delay': sparkle.popDelay,
              '--twinkle-duration': sparkle.twinkleDuration,
              '--twinkle-delay': sparkle.twinkleDelay,
            }}
          >
            <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ))}
      </div>

      <div className="aurora-thumb-logo-wrap">
        <span className="aurora-word aurora-word--aurora">Aurora</span>
        <span className="aurora-word aurora-word--pet">Pet</span>
        <span className="aurora-word aurora-word--co">Co.</span>
      </div>
    </div>
  )
}
