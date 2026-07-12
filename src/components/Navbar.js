'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../pages/App.css'
import './SiteNav.css'

const NAV_LINKS = [
  { href: '/', label: 'Work', position: 'start' },
  { href: '/about', label: 'About', position: 'center' },
  { href: '/playground', label: 'Playground', position: 'end' },
]

function Navbar({ className = '' }) {
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className={`site-nav${className ? ` ${className}` : ''}`} aria-label="Main">
      <div className="site-nav-stack">
        <div className="site-nav-logo-row">
          <Link href="/" className="site-nav-mark" aria-label="Lauren Yip home">
            <img
              src="/images/site-logo.png"
              srcSet="/images/site-logo.png 1x, /images/site-logo@2x.png 2x"
              alt=""
              className="site-nav-logo"
              width={48}
              height={48}
              decoding="async"
            />
          </Link>
        </div>

        <div className="site-nav-rule site-nav-rule--dark" aria-hidden="true" />

        <div className="site-nav-band">
          <div className="site-nav-links-row">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link site-nav-link--${link.position}${isActive(link.href) ? ' site-nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-nav-rule site-nav-rule--dark" aria-hidden="true" />
      </div>
    </nav>
  )
}

export default Navbar
