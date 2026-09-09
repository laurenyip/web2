'use client'

import { useEffect, useRef, useState } from 'react'
import './CoverHoverDemo.css'

/**
 * Mirrors Anna Viola Listen covers: static art + muted canvas video on hover.
 */
export default function CoverHoverDemo({ covers }) {
  return (
    <div className="cs-cover-demo">
      {covers.map((cover) => (
        <CoverCard key={cover.title} {...cover} />
      ))}
    </div>
  )
}

function CoverCard({ title, image, canvas, href, isNew }) {
  const [hovering, setHovering] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !canvas) return

    if (hovering) {
      video.muted = true
      video.volume = 0
      video.currentTime = 0
      const playPromise = video.play()
      if (playPromise?.catch) playPromise.catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [hovering, canvas])

  const handlers = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onFocus: () => setHovering(true),
    onBlur: () => setHovering(false),
  }

  const inner = (
    <div className="cs-cover-demo-frame">
      {isNew ? <span className="cs-cover-demo-badge cs-body">NEW</span> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={`${title} cover`} className="cs-cover-demo-img" draggable={false} />
      {canvas ? (
        <video
          ref={videoRef}
          className={`cs-cover-demo-video${hovering ? ' is-playing' : ''}`}
          src={canvas}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : null}
    </div>
  )

  if (href) {
    return (
      <a
        className="cs-cover-demo-card"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...handlers}
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="cs-cover-demo-card" tabIndex={0} {...handlers}>
      {inner}
    </div>
  )
}
