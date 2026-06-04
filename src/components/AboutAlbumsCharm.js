import Link from 'next/link'

/** Spinning circle + 4-point star — links to /albums from About vinyl shelf */
export default function AboutAlbumsCharm() {
  return (
    <Link
      href="/albums"
      className="about-albums-charm group"
      aria-label="Open record shelf — full album gallery"
    >
      <span className="about-albums-charm-orbit" aria-hidden="true">
        <svg className="about-albums-charm-circle" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <svg className="about-albums-charm-star" viewBox="0 0 56 56" fill="none">
          <path
            d="M28 14 L29.6 24.4 L40 26 L29.6 27.6 L28 38 L26.4 27.6 L16 26 L26.4 24.4 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="about-albums-charm-label about-body-text">record shelf</span>
    </Link>
  )
}
