'use client'

import './RosieThumb.css'

const DIR = '/images/projects/rosie/thumb2'

// Black-and-white slideshow behind the title. Each slide peels away (top-left corner stays) to reveal the next.
const SLIDES = [
  { src: `${DIR}/lab-1.webp`, pos: '38% 48%', zoom: 1.15 },
  { src: `${DIR}/elan.webp`, pos: '30% 40%', zoom: 1.25 },
  { src: `${DIR}/lab-2.webp`, pos: '62% 40%', zoom: 1.15 },
  { src: `${DIR}/characters.webp`, pos: '58% 50%', zoom: 1.1 },
]

export default function RosieThumb() {
  return (
    <div className="rosie-thumb" aria-hidden="true">
      <div className="rosie-thumb-stage">
      {SLIDES.map((slide, i) => (
        <div key={slide.src} className={`rosie-thumb-slide rosie-thumb-slide--${i}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt=""
            draggable={false}
            style={{ objectPosition: slide.pos, '--zoom': slide.zoom }}
          />
        </div>
      ))}
      </div>
      <div className="rosie-thumb-glitch" />
      <div className="rosie-thumb-flash" />
      <div className="rosie-thumb-shade" />
      <span className="rosie-thumb-title">
        {'React to This!'.split('').map((ch, i) => (
          <span key={i} className="rosie-thumb-ch" style={{ '--d': `${(i * 0.07).toFixed(2)}s` }}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </div>
  )
}
