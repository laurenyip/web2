'use client'

import { useEffect, useRef, useState } from 'react'
import './CsaThumb.css'

const LOGO_SRC = '/images/projects/csa.png'

const BG_IMAGES = [
  '/images/projects/ca_csa.jpg',
  '/images/projects/hunter_csa.jpg',
  '/images/projects/cart_csa.jpg',
  '/images/projects/selfie_csa.jpg',
]

const CYCLE_MS = 4500
const SLIDE_MS = 900

export default function CsaThumb({ revealed = false }) {
  const [current, setCurrent] = useState(0)
  const [incoming, setIncoming] = useState(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const advance = () => {
      const next = (indexRef.current + 1) % BG_IMAGES.length
      setIncoming(next)

      window.setTimeout(() => {
        indexRef.current = next
        setCurrent(next)
        setIncoming(null)
      }, SLIDE_MS)
    }

    const timer = window.setInterval(advance, CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className={`csa-thumb${revealed ? ' csa-thumb--revealed' : ''}`} aria-hidden="true">
      <div className="csa-thumb-bg-stack">
        <img
          className="csa-thumb-bg csa-thumb-bg--base"
          src={BG_IMAGES[current]}
          alt=""
          draggable={false}
        />
        {incoming !== null && (
          <img
            className="csa-thumb-bg csa-thumb-bg--incoming"
            src={BG_IMAGES[incoming]}
            alt=""
            draggable={false}
          />
        )}
      </div>

      <div className="csa-thumb-logo-wrap">
        <img className="csa-thumb-logo" src={LOGO_SRC} alt="" draggable={false} />
        <span className="csa-thumb-logo-shine" aria-hidden="true" />
      </div>

      <div className="csa-nda-caption">
        <p className="csa-nda-caption-title">Under NDA</p>
        <p className="csa-nda-caption-note">Details available upon request</p>
      </div>
    </div>
  )
}
