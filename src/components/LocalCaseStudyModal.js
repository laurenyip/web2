'use client'

import React, { useEffect } from 'react'
import KodeticCaseStudy from './KodeticCaseStudy'
import AnnaViolaCaseStudy from './AnnaViolaCaseStudy'
import './FramerCaseStudyModal.css'

const LOCAL_STUDIES = {
  kodetic: KodeticCaseStudy,
  annaviola: AnnaViolaCaseStudy,
}

const NEXT_STUDY = {
  kodetic: 'annaviola',
  annaviola: null,
}

export default function LocalCaseStudyModal({ studyId, onClose, onChangeStudy }) {
  const Study = LOCAL_STUDIES[studyId]
  const nextId = NEXT_STUDY[studyId]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const scroll = document.querySelector('.framer-modal-local-scroll')
    if (scroll) scroll.scrollTop = 0
  }, [studyId])

  if (!Study) return null

  const handleNext = () => {
    if (nextId && onChangeStudy) {
      onChangeStudy(nextId)
      return
    }
    onClose()
  }

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
        <div className="framer-modal-frame-wrap framer-modal-frame-wrap--ready framer-modal-frame-wrap--local">
          <div className="framer-modal-local-scroll">
            <Study onNext={handleNext} />
          </div>
        </div>
      </div>
    </div>
  )
}
