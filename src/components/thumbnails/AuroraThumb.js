'use client'

import './AuroraThumb.css'

const BG_SRC = '/dog.jpg'
const PAW_PATH =
  'M8 14c-2.2 0-4-1.5-4-4.2 0-2.4 1.4-3.8 2.8-3.8 1 0 1.6.6 2.2 1.6.6-1 1.2-1.6 2.2-1.6 1.4 0 2.8 1.4 2.8 3.8C13 12.5 11.2 14 8 14zm-5.2-5.8c-1.3 0-2.3-1.2-2.3-2.7S1.5 3.2 2.8 3.2c.9 0 1.5.5 2 1.3.5-.8 1.1-1.3 2-1.3 1.3 0 2.3 1.2 2.3 2.7s-1 2.7-2.3 2.7c-.9 0-1.5-.5-2-1.3-.5.8-1.1 1.3-2 1.3zm10.4 0c-1.3 0-2.3-1.2-2.3-2.7s1-2.7 2.3-2.7c.9 0 1.5.5 2 1.3.5-.8 1.1-1.3 2-1.3 1.3 0 2.3 1.2 2.3 2.7s-1 2.7-2.3 2.7c-.9 0-1.5-.5-2-1.3-.5.8-1.1 1.3-2 1.3z'

export default function AuroraThumb({ loop = true, exportRoot = false }) {
  return (
    <div
      className={`aurora-thumb${loop ? ' aurora-thumb--loop' : ''}${exportRoot ? ' aurora-thumb--fixed' : ''}`}
      {...(exportRoot ? { 'data-export-root': 'aurora' } : {})}
      aria-hidden="true"
    >
      <div className="aurora-thumb-bg-wrap">
        <img className="aurora-thumb-bg" src={BG_SRC} alt="" draggable={false} />
      </div>

      <div className="aurora-thumb-overlay" />

      <div className="aurora-thumb-logo-wrap">
        <div className="aurora-thumb-logo-cluster">
          <svg className="aurora-flourish aurora-flourish--left" viewBox="0 0 28 40" aria-hidden="true">
            <path d="M22 4 C8 12, 8 28, 22 36" />
          </svg>

          <div className="aurora-thumb-logo-line">
            <span className="aurora-word aurora-word--aurora">Aurora</span>
            <span className="aurora-dot aurora-dot--1" aria-hidden="true" />
            <span className="aurora-word aurora-word--pet">Pet</span>
            <span className="aurora-dot aurora-dot--2" aria-hidden="true" />
            <span className="aurora-word aurora-word--co">Co.</span>
          </div>

          <svg className="aurora-flourish aurora-flourish--right" viewBox="0 0 28 40" aria-hidden="true">
            <path d="M6 4 C20 12, 20 28, 6 36" />
          </svg>
        </div>

        <span className="aurora-paw-accent" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d={PAW_PATH} />
          </svg>
        </span>
      </div>
    </div>
  )
}
