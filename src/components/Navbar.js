'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../pages/App.css'
import './SiteNav.css'

const NAV_LINKS = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
]

function Navbar({ className = '' }) {
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className={`site-nav${className ? ` ${className}` : ''}`} aria-label="Main">
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-mark" aria-label="Lauren Yip home">
          <Image
            src="/images/site-logo.png"
            alt=""
            className="site-nav-logo"
            width={52}
            height={32}
            priority
          />
        </Link>
        <ul className="site-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="site-nav-item">
              <Link
                className={`site-nav-link${isActive(link.href) ? ' site-nav-link--active' : ''}`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
