'use client'

import React, { useEffect } from 'react'
import './FramerCaseStudyModal.css'

const FRAMER_ORIGIN = 'https://laurenyip.framer.website'

export default function FramerCaseStudyModal({ framerPath, onClose }) {
  const src = `${FRAMER_ORIGIN}${framerPath}`
  const slug = framerPath.replace(/^\//, '')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="framer-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="framer-modal-window"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Case study"
      >
        <button type="button" className="framer-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={`framer-modal-frame-wrap framer-modal-frame-wrap--${slug}`}>
          <iframe className="framer-modal-frame" src={src} title="Case study" loading="lazy" allow="fullscreen" />
        </div>
      </div>
    </div>
  )
}
