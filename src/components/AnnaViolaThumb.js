'use client'

import { useMemo } from 'react'
import './AnnaViolaThumb.css'

const BG_SRC = '/images/projects/annaviola/silver-secrets-cover.png'
const ORNAMENT_SRC = '/images/projects/annaviola/logo-ornament-top.png'

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildGlitter(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${4 + seeded(i, 1) * 92}%`,
    top: `${4 + seeded(i, 2) * 92}%`,
    size: 1.5 + seeded(i, 3) * 2.5,
    delay: `${seeded(i, 4) * 5}s`,
    duration: `${1.4 + seeded(i, 5) * 1.8}s`,
    cyan: seeded(i, 6) > 0.62,
  }))
}

export default function AnnaViolaThumb() {
  const glitter = useMemo(() => buildGlitter(22), [])

  return (
    <div className="annaviola-thumb" aria-hidden="true">
      <div className="annaviola-thumb-bg-wrap">
        <img className="annaviola-thumb-bg" src={BG_SRC} alt="" draggable={false} />
      </div>
      <div className="annaviola-thumb-grain" />
      <div className="annaviola-thumb-overlay" />

      <div className="annaviola-thumb-glitter">
        {glitter.map((g) => (
          <span
            key={g.id}
            className={`annaviola-glitter${g.cyan ? ' annaviola-glitter--cyan' : ''}`}
            style={{
              left: g.left,
              top: g.top,
              width: `${g.size}px`,
              height: `${g.size}px`,
              animationDelay: g.delay,
              animationDuration: g.duration,
            }}
          />
        ))}
      </div>

      <div className="annaviola-thumb-mark">
        <img className="annaviola-thumb-ornament" src={ORNAMENT_SRC} alt="" draggable={false} />
        <span className="annaviola-thumb-wordmark">anna viola</span>
        <span className="annaviola-thumb-tag">pop · poetry · glitter</span>
      </div>
    </div>
  )
}
