'use client'

import { useEffect, useState } from 'react'

const STATES = ['demo', 'worst', 'empty', 'one']

/** Dev-only: shows once a ?data= param is in the URL. Never renders in production. */
export default function WorstCaseToggle() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    setActive(new URLSearchParams(window.location.search).get('data'))
  }, [])

  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        display: 'flex',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: '#e5e7eb',
        font: '12px system-ui, sans-serif',
      }}
    >
      {STATES.map((state) => (
        <a
          key={state}
          href={`?data=${state}`}
          style={{
            padding: '4px 10px',
            borderRadius: 999,
            color: '#111827',
            textDecoration: 'none',
            background: state === active ? '#fff' : 'transparent',
          }}
        >
          {state}
        </a>
      ))}
    </div>
  )
}
