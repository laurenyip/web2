'use client'

import { useMemo } from 'react'
import './AmazonGiftThumb.css'

const LOGO_SRC = '/images/projects/amazon-giftwrapping/amazon_gift_wrapping.png'
const BG_SRC = '/images/projects/amazon-giftwrapping/birthday.mp4'
const FOILS = [
  'gold',
  'gold',
  'gold',
  'champagne',
  'champagne',
  'champagne',
  'copper',
  'copper',
  'silver',
  'silver',
  'rose',
  'patina',
]

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildConfetti(count) {
  return Array.from({ length: count }, (_, i) => {
    const shape = seeded(i, 7) > 0.82 ? 'circle' : 'rect'
    const strip = shape === 'rect' && seeded(i, 3) > 0.68
    const w = shape === 'circle' ? 5 + seeded(i, 8) * 4 : strip ? 3 + seeded(i, 8) * 1.5 : 7 + seeded(i, 8) * 5
    const h = shape === 'circle' ? w : strip ? 8 + seeded(i, 9) * 6 : 3.5 + seeded(i, 9) * 2.5
    const still = i % 5 === 0
    const onLeft = seeded(i, 11) < 0.5

    return {
      id: i,
      shape,
      still,
      left: still
        ? `${onLeft ? 5 + seeded(i, 1) * 16 : 78 + seeded(i, 1) * 15}%`
        : `${3 + seeded(i, 1) * 94}%`,
      top: still ? `${10 + seeded(i, 2) * 74}%` : '0%',
      w,
      h,
      delay: `${seeded(i, 4) * 5.5}s`,
      duration: `${6.4 + seeded(i, 5) * 4.2}s`,
      foil: FOILS[Math.floor(seeded(i, 6) * FOILS.length)],
      foilAngle: `${28 + Math.floor(seeded(i, 15) * 124)}deg`,
      shine: `${2.2 + seeded(i, 16) * 1.8}s`,
      drift: `${(seeded(i, 10) - 0.5) * 42}px`,
      rotate: `${Math.floor(seeded(i, 9) * 360)}deg`,
    }
  })
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
  const confetti = useMemo(() => buildConfetti(30), [])
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

      <div className="amazon-gift-thumb-confetti" aria-hidden="true">
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
        {confetti.map((piece) => (
          <span
            key={`confetti-${piece.id}`}
            className={`amazon-gift-confetti amazon-gift-confetti--${piece.shape} amazon-gift-confetti--${piece.foil}${piece.still ? ' amazon-gift-confetti--still' : ''}`}
            style={{
              left: piece.left,
              top: piece.top,
              width: `${piece.w}px`,
              height: `${piece.h}px`,
              animationDuration: `${piece.duration}, ${piece.shine}`,
              animationDelay: piece.delay,
              '--drift': piece.drift,
              '--rot': piece.rotate,
              '--foil-angle': piece.foilAngle,
            }}
          />
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
