'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FortuneCookie from '../../components/fortune-cookie'
import Webring from './Webring'
import './SiteFooter.css'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lauren.yip_/',
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
  const showWebring = pathname === '/' || pathname === '/about'
  const isProjects = pathname === '/projects'

  return (
    <footer className={`site-footer${isProjects ? ' site-footer--projects' : ''}`}>
      <div className="site-footer-fortune">
        <FortuneCookie />
      </div>

      <div className="site-footer-inner">
        <nav className="site-footer-social" aria-label="Social links">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="site-footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </nav>

        <p className="site-footer-copy">© {year} Lauren Yip. All rights reserved.</p>

        <p className="site-footer-note">
          All artwork and photography on this site is original work. Do not reproduce, distribute, or use without
          written permission.
        </p>

        <Link href="/rights" className="site-footer-link">
          Licensing &amp; Usage →
        </Link>

        {showWebring && <Webring />}
      </div>
    </footer>
  )
}
