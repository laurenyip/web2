'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ImageModal from '../ui/ImageModal'
import KodeticCaseStudy from './KodeticCaseStudy'
import AnnaViolaCaseStudy from './AnnaViolaCaseStudy'
import CradleCaseStudy from './CradleCaseStudy'
import CsaSystemsCaseStudy from './CsaSystemsCaseStudy'
import LyreCaseStudy from './LyreCaseStudy'
import StarmapCaseStudy from './StarmapCaseStudy'
import SpruceCaseStudy from './SpruceCaseStudy'
import AuroraCaseStudy from './AuroraCaseStudy'
import AmazonGiftCaseStudy from './AmazonGiftCaseStudy'
import JellyfishCaseStudy from './JellyfishCaseStudy'
import RosieCaseStudy from './RosieCaseStudy'
import SoundbookCaseStudy from './SoundbookCaseStudy'
import CopyLinkButton from './shared/CopyLinkButton'
import './FramerCaseStudyModal.css'

const LOCAL_STUDIES = {
  kodetic: KodeticCaseStudy,
  annaviola: AnnaViolaCaseStudy,
  cradle: CradleCaseStudy,
  'csa-content': CsaSystemsCaseStudy,
  lyre: LyreCaseStudy,
  starmap: StarmapCaseStudy,
  spruce: SpruceCaseStudy,
  aurora: AuroraCaseStudy,
  'amazon-giftwrapping': AmazonGiftCaseStudy,
  jellyfish: JellyfishCaseStudy,
  rosie: RosieCaseStudy,
  soundbook: SoundbookCaseStudy,
}

const NEXT_STUDY = {
  kodetic: 'annaviola',
  annaviola: null,
  cradle: 'csa-content',
  'csa-content': 'lyre',
  lyre: null,
  starmap: 'aurora',
  aurora: 'spruce',
  spruce: 'amazon-giftwrapping',
  'amazon-giftwrapping': 'starmap',
}

/** Images that already do something on click, or are too small to be worth enlarging, stay as they are. */
function zoomableImage(target) {
  if (!(target instanceof HTMLImageElement)) return null
  if (target.closest('a, button, .book-viewer, [data-no-zoom]')) return null
  if (target.getBoundingClientRect().width < 120) return null
  return target
}

/** next/image serves "/_next/image?url=…"; enlarge the original file instead. */
function originalSrc(img) {
  const src = img.currentSrc || img.src
  const url = new URL(src, window.location.href)
  if (url.pathname === '/_next/image' && url.searchParams.get('url')) return url.searchParams.get('url')
  return url.origin === window.location.origin ? url.pathname + url.search : src
}

export default function LocalCaseStudyModal({ studyId, onClose, onChangeStudy }) {
  const Study = LOCAL_STUDIES[studyId]
  const nextId = NEXT_STUDY[studyId]
  const [zoomed, setZoomed] = useState(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // While an image is enlarged, Escape closes just the image: caught first, before the page's own handlers.
  useEffect(() => {
    if (!zoomed) return undefined
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopImmediatePropagation()
      setZoomed(null)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [zoomed])

  useEffect(() => {
    const scroll = document.querySelector('.framer-modal-local-scroll')
    if (scroll) scroll.scrollTop = 0
    setZoomed(null)
  }, [studyId])

  // Click any image in a case study to see it bigger.
  const handleImageClick = (event) => {
    const img = zoomableImage(event.target)
    if (!img) return
    setZoomed({ src: originalSrc(img), alt: img.alt })
  }

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
        <CopyLinkButton className="cs-copylink--float" />
        <button type="button" className="framer-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="framer-modal-frame-wrap framer-modal-frame-wrap--ready framer-modal-frame-wrap--local">
          <div className="framer-modal-local-scroll" onClick={handleImageClick}>
            <Study onNext={handleNext} />
          </div>
        </div>
      </div>
      {zoomed && typeof document !== 'undefined'
        ? createPortal(
            <div onClick={(event) => event.stopPropagation()} role="presentation">
              <ImageModal open src={zoomed.src} alt={zoomed.alt} onClose={() => setZoomed(null)} />
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
