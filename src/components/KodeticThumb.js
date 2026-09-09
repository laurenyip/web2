'use client'

import { useMemo } from 'react'
import './KodeticThumb.css'

const BG_SRC = '/images/projects/kodetic/hero.webp'
const CANVAS_SRC = '/images/projects/kodetic/black-canvas.png'
const LOGO_SRC = '/images/projects/kodetic/logo.png'
const LABELS = ['MIXED MEDIA', 'CLIENT WORK', 'CREATIVE', 'COSPLAY']

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildDust(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${seeded(i, 1) * 100}%`,
    top: `${seeded(i, 2) * 100}%`,
    size: 1 + Math.floor(seeded(i, 3) * 2.5),
    delay: `${seeded(i, 4) * 4}s`,
    duration: `${3 + seeded(i, 5) * 4}s`,
  }))
}

export default function KodeticThumb() {
  const dust = useMemo(() => buildDust(18), [])

  return (
    <div className="kodetic-thumb" aria-hidden="true">
      <div className="kodetic-thumb-bg-wrap">
        <img className="kodetic-thumb-bg" src={BG_SRC} alt="" draggable={false} />
      </div>
      <div
        className="kodetic-thumb-canvas"
        style={{ backgroundImage: `url(${CANVAS_SRC})` }}
      />
      <div className="kodetic-thumb-haze" />
      <div className="kodetic-thumb-overlay" />

      <div className="kodetic-thumb-dust">
        {dust.map((d) => (
          <span
            key={d.id}
            className="kodetic-dust"
            style={{
              left: d.left,
              top: d.top,
              width: `${d.size}px`,
              height: `${d.size}px`,
              animationDelay: d.delay,
              animationDuration: d.duration,
            }}
          />
        ))}
      </div>

      <div className="kodetic-thumb-labels">
        {LABELS.map((label) => (
          <span key={label} className="kodetic-thumb-label">
            {label}
          </span>
        ))}
      </div>

      <div className="kodetic-thumb-logo-wrap">
        <img className="kodetic-thumb-logo" src={LOGO_SRC} alt="" draggable={false} />
        <span className="kodetic-thumb-wordmark">KODETIC</span>
        <span className="kodetic-thumb-sub">photography · mixed media</span>
      </div>
    </div>
  )
}
