import React, { useEffect } from 'react'

/**
 * Fullscreen image modal: dark overlay, image at max readable size, caption below.
 * Closes on backdrop click, X button, or Escape.
 */
export default function ImageModal({ open, src, caption, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !src) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div
        className="relative mx-auto flex max-h-[92vh] max-w-[min(96vw,1400px)] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 z-10 flex h-9 w-9 -translate-y-full items-center justify-center rounded-full bg-white/15 text-2xl font-light leading-none text-white transition hover:bg-white/25 md:right-0 md:top-0 md:translate-x-full md:translate-y-0"
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={src}
          alt={caption || 'Enlarged'}
          className="max-h-[calc(92vh-88px)] w-auto max-w-full object-contain shadow-2xl"
        />
        {caption ? (
          <p
            className="mt-4 max-w-2xl text-center text-sm text-white/90 md:text-base"
            style={{ fontFamily: "'Moto', serif" }}
          >
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  )
}
