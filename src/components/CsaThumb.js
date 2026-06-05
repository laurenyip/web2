'use client'

import './CsaThumb.css'

const BG_SRC = '/images/projects/heart.jpg'
const LOGO_SRC = '/images/projects/csa.png'

export default function CsaThumb({ revealed = false }) {
  return (
    <div className={`csa-thumb${revealed ? ' csa-thumb--revealed' : ''}`} aria-hidden="true">
      <img className="csa-thumb-bg" src={BG_SRC} alt="" draggable={false} />
      <img className="csa-thumb-logo" src={LOGO_SRC} alt="" draggable={false} />
      <div className="csa-nda-caption">
        <p className="csa-nda-caption-title">Under NDA</p>
        <p className="csa-nda-caption-note">Details available upon request</p>
      </div>
    </div>
  )
}
