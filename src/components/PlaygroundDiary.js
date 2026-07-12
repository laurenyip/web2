'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { DIARY_FRAMES, DIARY_PAGE_TEXT } from '../data/creativeContent'
import './PlaygroundDiary.css'

const CLOSE_FRAME_MS = 220

export default function PlaygroundDiary() {
  const [phase, setPhase] = useState('closed')
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (phase !== 'closing') return undefined

    const timer = window.setTimeout(() => setPhase('sealed'), CLOSE_FRAME_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  const frameSrc = DIARY_FRAMES[phase]
  const canOpen = phase === 'closed'
  const canClose = phase === 'open'
  const interactive = canOpen || canClose

  const handleClick = () => {
    if (canOpen) {
      setPhase('open')
      return
    }
    if (canClose) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setPhase(prefersReducedMotion ? 'sealed' : 'closing')
    }
  }

  const ariaLabel =
    phase === 'closed'
      ? 'Open journal'
      : phase === 'open'
        ? 'Close journal'
        : 'Journal'

  return (
    <div className="playground-diary-wrap">
      <button
        type="button"
        className={[
          'playground-diary',
          hovered && phase === 'closed' ? 'playground-diary--glow' : '',
          phase === 'open' ? 'playground-diary--open' : '',
          phase === 'sealed' ? 'playground-diary--sealed' : '',
          !interactive ? 'playground-diary--static' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={!interactive}
        aria-label={ariaLabel}
        aria-expanded={phase === 'open'}
      >
        <Image
          src={frameSrc}
          alt=""
          className="playground-diary-img"
          width={520}
          height={720}
          priority={false}
        />
        {phase === 'open' && DIARY_PAGE_TEXT ? (
          <div className="playground-diary-page about-body-text" aria-hidden="true">
            {DIARY_PAGE_TEXT}
          </div>
        ) : null}
      </button>
      {interactive ? (
        <p className="playground-diary-hint about-body-text m-0 mt-2 text-gray-500">
          {canOpen ? 'Click to open' : 'Click to close'}
        </p>
      ) : null}
    </div>
  )
}
