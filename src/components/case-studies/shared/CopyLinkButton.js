'use client'

import { useEffect, useRef, useState } from 'react'
import './CopyLinkButton.css'

/** Copies the address of the open case study (the page URL carries its #id). */
export default function CopyLinkButton({ className = '' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async (event) => {
    event.stopPropagation()
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const field = document.createElement('textarea')
      field.value = url
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } catch {
        /* nothing more to try */
      }
      field.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      className={`cs-copylink ${className}`.trim()}
      onClick={copy}
      aria-label={copied ? 'Link copied' : 'Copy link to this case study'}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
        <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
      </svg>
      <span className="cs-copylink-text" aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
    </button>
  )
}
