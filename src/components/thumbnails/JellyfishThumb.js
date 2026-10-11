'use client'

import { useMemo } from 'react'
import './JellyfishThumb.css'

const DIR = '/images/projects/jellyfish'

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

/* Styled after the FAS comp slide: marbled black swirl, ink-line jellyfish (now tinted), Syne title. */
export default function JellyfishThumb() {
  const specks = useMemo(() => buildSpecks(16), [])

  return (
    <div className="jelly-thumb" aria-hidden="true">
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

      <div className="jelly-thumb-titles">
        <span className="jelly-thumb-title">Jellyfish Umbrella</span>
      </div>
    </div>
  )
}
