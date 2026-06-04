'use client'

import { useMemo } from 'react'
import './AmazonGiftThumb.css'

const STAR_PATH = 'M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z'
const LOGO_SRC = '/images/projects/amazon-giftwrapping/amazon_gift_wrapping.png'
const BG_SRC = '/images/projects/amazon-giftwrapping/birthday.mp4'

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${6 + seeded(i, 1) * 88}%`,
    top: `${4 + seeded(i, 2) * 90}%`,
    size: 8 + Math.floor(seeded(i, 3) * 7),
    delay: `${seeded(i, 4) * 6}s`,
    duration: `${1.2 + seeded(i, 5) * 0.8}s`,
    gold: seeded(i, 6) > 0.42,
  }))
}

function buildGlows(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${10 + seeded(i, 10) * 75}%`,
    top: `${8 + seeded(i, 11) * 78}%`,
    size: 20 + Math.floor(seeded(i, 12) * 11),
    delay: `${seeded(i, 13) * 4}s`,
    duration: `${2.4 + seeded(i, 14) * 1.6}s`,
  }))
}

export default function AmazonGiftThumb() {
  const sparkles = useMemo(() => buildSparkles(18), [])
  const glows = useMemo(() => buildGlows(5), [])

  return (
    <div className="amazon-gift-thumb" aria-hidden="true">
      <div className="amazon-gift-thumb-bg-wrap">
        <video
          className="amazon-gift-thumb-bg"
          src={BG_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="amazon-gift-thumb-overlay" />

      <div className="amazon-gift-thumb-sparkles" aria-hidden="true">
        {glows.map((glow) => (
          <span
            key={`glow-${glow.id}`}
            className="amazon-gift-glow"
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
        {sparkles.map((sparkle) => (
          <span
            key={`sparkle-${sparkle.id}`}
            className="amazon-gift-sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: sparkle.gold ? '#FFD580' : '#fff',
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

      <div className="amazon-gift-logo-wrap">
        <img
          className="amazon-gift-logo amazon-gift-logo-base"
          src={LOGO_SRC}
          alt=""
          draggable={false}
        />
        <img
          className="amazon-gift-logo amazon-gift-logo-bow"
          src={LOGO_SRC}
          alt=""
          draggable={false}
        />
      </div>
    </div>
  )
}
