'use client'

import posthog from 'posthog-js'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FortuneCookie from '../../components/fortune-cookie'
import Webring from './Webring'
import './SiteFooter.css'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/studio.laurenyip/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lauren-yip',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.2 9.4h3.1v10.5H5.2V9.4zm1.55-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10.4 9.4h3v1.43h.04c.42-.8 1.44-1.64 2.97-1.64 3.18 0 3.77 2.09 3.77 4.8v5.91h-3.11v-5.24c0-1.25-.02-2.86-1.74-2.86-1.75 0-2.02 1.37-2.02 2.78v5.32H10.4V9.4z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/laurenyip',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/studio_lyip',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.3 4h3.1l-6.8 7.77L21.5 20h-5.9l-4.6-6.02L5.8 20H2.7l7.27-8.33L2.5 4h6.05l4.16 5.49L17.3 4zm-1.08 14.3h1.72L7.03 5.55H5.18l11.04 12.75z" />
      </svg>
    ),
  },
]

export default function SiteFooter() {
  const pathname = usePathname()
  const year = new Date().getFullYear()
  const showWebring = pathname === '/' || pathname === '/about' || pathname === '/playground'
  const isProjects = pathname === '/projects'

  return (
    <footer className={`site-footer${isProjects ? ' site-footer--projects' : ''}`}>
      <div className="site-footer-fortune">
        <FortuneCookie />
      </div>

      <div className="site-footer-inner">
        <div className="site-footer-left">
        <nav className="site-footer-social" aria-label="Social links">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="site-footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              onClick={() => posthog.capture('social_link_clicked', { platform: item.label })}
            >
              {item.icon}
            </a>
          ))}
        </nav>
        {showWebring && <Webring />}
        </div>

        <p className="site-footer-legal">
          <span className="site-footer-copy">© {year} Lauren Yip</span>
          <span className="site-footer-sep" aria-hidden="true">·</span>
          <span className="site-footer-note">
            All artwork and photography is original. Please don&apos;t use without written permission.
          </span>
          <span className="site-footer-sep" aria-hidden="true">·</span>
          <Link href="/rights" className="site-footer-link">
            Licensing &amp; usage →
          </Link>
        </p>

      </div>
    </footer>
  )
}
