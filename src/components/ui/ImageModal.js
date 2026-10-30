'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getProtectedImageProps } from '../../lib/getProtectedImageProps'

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

/**
 * Fullscreen image modal: dark overlay, image at max readable size, caption below.
 * Closes on backdrop click, the centred × button, or Escape.
 *
 * Pass `items` ([{ src, caption, alt }]) plus `index` to browse a set with ← / → (buttons and arrow keys).
 * Focus moves into the viewer, Tab stays inside it, and focus returns to whatever opened it on close.
 */
export default function ImageModal({
  open,
  src,
  caption,
  alt,
  onClose,
  useProtectedImage = false,
  items,
  index = 0,
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [current, setCurrent] = useState(index)
  const set = items?.length ? items : null

  // Each time the viewer opens, start at the photo that was clicked.
  useEffect(() => {
    if (open) setCurrent(index)
  }, [open, index])

  const shown = set ? set[Math.min(current, set.length - 1)] : { src, caption, alt }
  const hasSet = !!set && set.length > 1
  const step = (delta) => setCurrent((i) => (i + delta + set.length) % set.length)

  // Focus in on open, back to the opener on close; lock the page behind.
  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (hasSet && e.key === 'ArrowRight') step(1)
      if (hasSet && e.key === 'ArrowLeft') step(-1)
      if (e.key === 'Tab') {
        const root = dialogRef.current
        if (!root) return
        const nodes = [...root.querySelectorAll(FOCUSABLE)]
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        const active = document.activeElement
        if (!root.contains(active)) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // step only depends on set length, which is stable while open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, hasSet])

  if (!open || !shown?.src) return null

  return (
    <div
      ref={dialogRef}
      className="image-popup fixed inset-0 z-[1200] flex items-center justify-center bg-black/85 px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={shown.caption ? `Image: ${shown.caption}` : 'Image preview'}
    >
      <div
        className="relative mx-auto flex max-h-[96dvh] max-w-[min(96vw,1400px)] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} className="image-popup-close" aria-label="Close">
          ×
        </button>
        <div className="image-popup-stage">
          {hasSet ? (
            <button
              type="button"
              className="image-popup-step image-popup-step--prev"
              onClick={() => step(-1)}
              aria-label="Previous image"
            >
              ←
            </button>
          ) : null}
          <Image
            key={shown.src}
            src={shown.src}
            alt={shown.alt || shown.caption || 'Enlarged'}
            className="max-h-[calc(96dvh-140px)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            width={1200}
            height={900}
            priority={false}
            {...(useProtectedImage ? getProtectedImageProps() : {})}
          />
          {hasSet ? (
            <button
              type="button"
              className="image-popup-step image-popup-step--next"
              onClick={() => step(1)}
              aria-label="Next image"
            >
              →
            </button>
          ) : null}
        </div>
        {shown.caption || hasSet ? (
          <p className="image-popup-caption" aria-live="polite">
            {shown.caption}
            {hasSet ? (
              <span className="image-popup-count">
                {current + 1} / {set.length}
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </div>
  )
}
