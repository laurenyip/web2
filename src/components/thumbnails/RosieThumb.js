'use client'

import { useRef } from 'react'
import './RosieThumb.css'

const DIR = '/images/projects/rosie/thumb2'

export default function RosieThumb() {
  const rootRef = useRef(null)
  const lensRef = useRef(null)

  // --mx / --my: pointer position from -1 to 1; --px / --py: the same as percentages for the colour spotlight
  const onMove = (event) => {
    const root = rootRef.current
    if (!root) return
    const r = root.getBoundingClientRect()
    const x = (event.clientX - r.left) / r.width
    const y = (event.clientY - r.top) / r.height
    root.style.setProperty('--mx', (x * 2 - 1).toFixed(3))
    root.style.setProperty('--my', (y * 2 - 1).toFixed(3))
    // the colour spotlight is positioned inside the round lens, so measure against it
    const lr = (lensRef.current || root).getBoundingClientRect()
    root.style.setProperty('--px', `${(((event.clientX - lr.left) / lr.width) * 100).toFixed(1)}%`)
    root.style.setProperty('--py', `${(((event.clientY - lr.top) / lr.height) * 100).toFixed(1)}%`)
    root.classList.add('rosie-thumb--live')
  }
  const onLeave = () => {
    const root = rootRef.current
    if (!root) return
    root.style.setProperty('--mx', '0')
    root.style.setProperty('--my', '0')
    root.classList.remove('rosie-thumb--live')
  }

  return (
    <div ref={rootRef} className="rosie-thumb" aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* two lab photos cross-fade slowly; each is drawn twice: black and white, and a colour copy shown by the spotlight */}
      <div ref={lensRef} className="rosie-thumb-lens">
      {[1, 2].map((n) => (
        <div key={n} className={`rosie-thumb-photo rosie-thumb-photo--${n}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rosie-thumb-bw" src={`${DIR}/lab-${n}.webp`} alt="" draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rosie-thumb-color" src={`${DIR}/lab-${n}.webp`} alt="" draggable={false} />
        </div>
      ))}
      <div className="rosie-thumb-shade" />
      </div>

      <div className="rosie-thumb-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rosie-thumb-logo" src={`${DIR}/logo.webp`} alt="" draggable={false} />
        <span className="rosie-thumb-title">React to This!</span>
      </div>
    </div>
  )
}
