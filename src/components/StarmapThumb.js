'use client'

import { useCallback, useRef, useState } from 'react'
import { StarIcon } from './StarIcon'
import { exportStarmapGif } from './starmapGifExport'
import './StarmapThumb.css'

export const STAR_PATH = 'M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z'

/** Cassiopeia — strong W, five twinkling stars at each vertex (ε→δ→γ→α→β) */
const CASSIOPEIA_CENTER_X = 90
const CASSIOPEIA_WIDTH_SCALE = 1.2
const CASSIOPEIA_STAR_SCALE = 1.3

const CASSIOPEIA_BASE = [
  { id: 'ε Cas', x: 10, y: 46, scale: 0.64 },
  { id: 'δ Cas', x: 46, y: 8, scale: 0.6 },
  { id: 'γ Cas', x: 90, y: 50, scale: 0.72 },
  { id: 'α Cas', x: 134, y: 8, scale: 0.6 },
  { id: 'β Cas', x: 170, y: 46, scale: 0.64 },
]

export const CASSIOPEIA = {
  lines: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ],
  nodes: CASSIOPEIA_BASE.map((node) => ({
    ...node,
    x: CASSIOPEIA_CENTER_X + (node.x - CASSIOPEIA_CENTER_X) * CASSIOPEIA_WIDTH_SCALE,
    scale: node.scale * CASSIOPEIA_STAR_SCALE,
  })),
  twinkleDelays: [0, 0.5, 1.1, 0.3, 0.8],
  viewBox: '-8 0 204 58',
}

export default function StarmapThumb({ enableGifExport = false }) {
  const rootRef = useRef(null)
  const [exporting, setExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExportGif = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!rootRef.current || exporting) return

    setExporting(true)
    setExportProgress(0)
    try {
      await exportStarmapGif(rootRef.current, {
        onProgress: setExportProgress,
      })
    } catch (err) {
      console.error('GIF export failed:', err)
    } finally {
      setExporting(false)
      setExportProgress(0)
    }
  }, [exporting])

  return (
    <div
      ref={rootRef}
      className={`starmap-thumb${enableGifExport ? ' starmap-thumb--exportable' : ''}`}
      aria-hidden={!enableGifExport}
    >
      <img
        className="starmap-thumb-bg"
        src="/images/projects/starmap/unicorn.png"
        alt=""
        draggable={false}
      />

      <div className="starmap-thumb-logo">
        <span className="starmap-thumb-text">starmap</span>
        <span className="starmap-thumb-star-wrap">
          <StarIcon className="starmap-thumb-star-icon" />
        </span>
      </div>

      <svg
        className="starmap-thumb-constellation"
        viewBox={CASSIOPEIA.viewBox}
        fill="none"
        aria-hidden="true"
      >
        <g className="starmap-thumb-constellation-lines">
          {CASSIOPEIA.lines.map(([a, b], i) => {
            const from = CASSIOPEIA.nodes[a]
            const to = CASSIOPEIA.nodes[b]
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            )
          })}
        </g>
        {CASSIOPEIA.nodes.map((node, i) => (
          <g
            key={node.id}
            transform={`translate(${node.x - 7 * node.scale}, ${node.y - 7 * node.scale}) scale(${node.scale})`}
          >
            <g
              className="starmap-thumb-node"
              style={{ '--twinkle-delay': `${CASSIOPEIA.twinkleDelays[i]}s` }}
            >
              <path d={STAR_PATH} fill="white" />
            </g>
          </g>
        ))}
      </svg>

      {enableGifExport && (
        <button
          type="button"
          className="starmap-thumb-export-btn"
          onClick={handleExportGif}
          disabled={exporting}
          aria-label="Export animation as GIF"
        >
          {exporting ? `Exporting ${Math.round(exportProgress * 100)}%` : 'Export GIF'}
        </button>
      )}
    </div>
  )
}
