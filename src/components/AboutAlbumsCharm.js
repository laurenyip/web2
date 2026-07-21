import Link from 'next/link'
import Image from 'next/image'

/** White Lotus mark — links to /albums from About vinyl shelf */
export default function AboutAlbumsCharm() {
  return (
    <Link
      href="/albums"
      className="about-albums-charm group"
      aria-label="Open record shelf — full album gallery"
    >
      <span className="about-albums-charm-orbit" aria-hidden="true">
        <Image
          src="/images/about/favorites/music/white-lotus.png"
          alt=""
          className="about-albums-charm-icon"
          width={120}
          height={120}
          priority={false}
        />
      </span>
      <span className="about-albums-charm-label about-body-text">record shelf</span>
    </Link>
  )
}
