'use client'

import React, { useEffect, useRef, useState } from 'react'
import './FramerCaseStudyModal.css'

export const FRAMER_ORIGIN = 'https://laurenyip.framer.website'

const warmedIframes = new Map()
const warmedReady = new Set()

function styleAsHiddenPreload(iframe) {
  iframe.setAttribute('aria-hidden', 'true')
  iframe.tabIndex = -1
  iframe.title = 'Case study preload'
  Object.assign(iframe.style, {
    position: 'fixed',
    left: '-9999px',
    top: '0',
    width: '1100px',
    height: '900px',
    opacity: '0',
    pointerEvents: 'none',
    border: 'none',
  })
}

/** Warm a Framer case-study URL in a hidden iframe so the modal can open faster. */
export function prefetchFramerPath(framerPath) {
  if (typeof document === 'undefined' || !framerPath || warmedIframes.has(framerPath)) return

  const iframe = document.createElement('iframe')
  iframe.src = `${FRAMER_ORIGIN}${framerPath}`
  iframe.allow = 'fullscreen'
  styleAsHiddenPreload(iframe)
  iframe.addEventListener(
    'load',
    () => {
      warmedReady.add(framerPath)
    },
    { once: true }
  )
  document.body.appendChild(iframe)
  warmedIframes.set(framerPath, iframe)
}

export default function FramerCaseStudyModal({ framerPath, onClose }) {
  const wrapRef = useRef(null)
  const [loaded, setLoaded] = useState(() => warmedReady.has(framerPath))
  const slug = framerPath.replace(/^\//, '')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined

    const alreadyReady = warmedReady.has(framerPath)
    setLoaded(alreadyReady)

    let iframe = warmedIframes.get(framerPath)
    if (iframe) {
      warmedIframes.delete(framerPath)
      iframe.className = 'framer-modal-frame'
      iframe.removeAttribute('aria-hidden')
      iframe.removeAttribute('tabIndex')
      iframe.title = 'Case study'
      iframe.style.cssText = ''
    } else {
      iframe = document.createElement('iframe')
      iframe.className = 'framer-modal-frame'
      iframe.src = `${FRAMER_ORIGIN}${framerPath}`
      iframe.title = 'Case study'
      iframe.allow = 'fullscreen'
    }

    const markLoaded = () => {
      warmedReady.add(framerPath)
      setLoaded(true)
    }
    iframe.addEventListener('load', markLoaded)
    wrap.appendChild(iframe)

    return () => {
      iframe.removeEventListener('load', markLoaded)
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
      styleAsHiddenPreload(iframe)
      if (!iframe.isConnected) document.body.appendChild(iframe)
      warmedIframes.set(framerPath, iframe)
    }
  }, [framerPath])

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
        {!loaded ? (
          <div className="framer-modal-loading" aria-live="polite">
            Loading case study…
          </div>
        ) : null}
        <div
          ref={wrapRef}
          className={`framer-modal-frame-wrap framer-modal-frame-wrap--${slug}${loaded ? ' framer-modal-frame-wrap--ready' : ''}`}
        />
      </div>
    </div>
  )
}
