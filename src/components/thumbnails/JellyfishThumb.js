'use client'

import { useMemo } from 'react'
import { Fraunces } from 'next/font/google'
import './JellyfishThumb.css'

// Soft, slightly wonky italic: rounded like a jellyfish bell, loose like its tentacles.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
  variable: '--font-jelly',
})

const DIR = '/images/projects/jellyfish'
const TITLE_WORDS = ['Jellyfish', 'Umbrella']

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

// Bubbles / plankton specks drifting up, like the dots around the drawing
function buildSpecks(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${6 + seeded(i, 1) * 88}%`,
    size: 1.6 + seeded(i, 2) * 3.2,
    delay: `${-seeded(i, 3) * 10}s`,
    duration: `${7 + seeded(i, 4) * 7}s`,
    drift: `${(seeded(i, 5) - 0.5) * 30}px`,
  }))
}

/* Styled after the FAS comp slide: marbled black swirl, ink-line jellyfish (now tinted), a floating, pulsing title. */
export default function JellyfishThumb() {
  const specks = useMemo(() => buildSpecks(16), [])

  return (
    <div className={`jelly-thumb ${fraunces.variable}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="jelly-thumb-swirl" src={`${DIR}/thumb-swirl.webp`} alt="" draggable={false} />
      <div className="jelly-thumb-vignette" />
      <div className="jelly-thumb-glow" />

      <div className="jelly-thumb-specks">
        {specks.map((p) => (
          <span
            key={p.id}
            className="jelly-thumb-speck"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--drift': p.drift,
            }}
          />
        ))}
      </div>

      <div className="jelly-thumb-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="jelly-thumb-drawing" src={`${DIR}/thumb-drawing.webp`} alt="" draggable={false} />
        {/* the same drawing again, slowly pulsing blue-white light through the ink lines */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="jelly-thumb-drawing jelly-thumb-drawing--glow" src={`${DIR}/thumb-drawing.webp`} alt="" draggable={false} />
        {/* colour: a gradient clipped to the ink lines, drifting through a few palettes */}
        <span className="jelly-thumb-tint" />
      </div>

      {/* the title floats and pulses like a jellyfish; each letter trails a beat behind the last, like tentacles */}
      <div className="jelly-thumb-titles">
        <span className="jelly-thumb-title">
          {TITLE_WORDS.map((word, wordIndex) => (
            <span key={word} className="jelly-thumb-word">
              {[...word].map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className="jelly-thumb-letter"
                  style={{ '--i': wordIndex * 3 + letterIndex }}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
