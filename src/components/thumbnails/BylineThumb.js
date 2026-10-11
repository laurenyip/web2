'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { getProtectedImageProps } from '../../lib/getProtectedImageProps'
import './BylineThumb.css'

function seeded(index, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildGlitter(count) {
  const cols = 3
  const rows = 3
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const left = ((col + 0.06 + seeded(i, 3) * 0.88) / cols) * 100
    const top = ((row + 0.06 + seeded(i, 8) * 0.88) / rows) * 100
    return {
      id: i,
      left: `${left}%`,
      top: `${top}%`,
      size: 2.2 + seeded(i, 5) * 1.6,
      delay: `${seeded(i, 4) * 6.2}s`,
      duration: `${2.8 + seeded(i, 2) * 2.4}s`,
    }
  })
}

export default function BylineThumb({ src, alt, imagePosition, portfolio = false }) {
  const glitter = useMemo(() => buildGlitter(9), [])

  return (
    <div className="byline-thumb">
      <Image
        src={src}
        alt={alt}
        className={portfolio ? 'portfolio-card-image' : 'work-card-img work-card-img--static'}
        width={1200}
        height={900}
        priority={false}
        style={{ objectPosition: imagePosition || 'center' }}
        {...getProtectedImageProps()}
      />
      <div className="byline-thumb-glitter" aria-hidden="true">
        {glitter.map((spark) => (
          <span
            key={spark.id}
            className="byline-glitter"
            style={{
              left: spark.left,
              top: spark.top,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              animationDelay: spark.delay,
              animationDuration: spark.duration,
            }}
          />
        ))}
      </div>
    </div>
  )
}
