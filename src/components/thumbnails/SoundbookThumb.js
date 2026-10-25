'use client'

import './SoundbookThumb.css'

const PHOTO = '/images/projects/soundbook/thumb/phone.webp'

/** SoundBook thumbnail: a child using a phone with a parent, with the glowing logo above. */
export default function SoundbookThumb() {
  return (
    <div className="sb-thumb" aria-hidden="true">
      <div className="sb-thumb-photo-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sb-thumb-photo" src={PHOTO} alt="" draggable={false} />
      </div>

      <div className="sb-thumb-brand">
        <svg className="sb-thumb-mark" viewBox="0 0 200 130" fill="none">
          <g strokeWidth="10" strokeLinecap="round">
            <path className="sb-thumb-arc sb-thumb-arc--3" stroke="#8fa9f5" d="M12 100 A88 88 0 0 1 188 100" />
            <path className="sb-thumb-arc sb-thumb-arc--2" stroke="#6fd3c6" d="M34 100 A66 66 0 0 1 166 100" />
            <path className="sb-thumb-arc sb-thumb-arc--1" stroke="#9ad672" d="M56 100 A44 44 0 0 1 144 100" />
            <path stroke="#6fd3c6" d="M8 116 H192" />
          </g>
          <path d="M78 116 A22 22 0 0 1 122 116 Z" fill="#6fd3c6" className="sb-thumb-dome" />
        </svg>
        <p className="sb-thumb-title">SoundBook</p>
      </div>
    </div>
  )
}
