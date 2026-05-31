import React from 'react'
import Link from 'next/link'
import '../pages/App.css'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/portfolio', label: 'Portfolio' },
]

function Navbar({ className = '' }) {
  return (
    <ul className={`navbar${className ? ` ${className}` : ''}`}>
      {NAV_LINKS.map((link, index) => (
        <React.Fragment key={link.href}>
          <li className="nav-item">
            <Link className="nav-link" href={link.href}>
              {link.label}
            </Link>
          </li>
          {index < NAV_LINKS.length - 1 ? (
            <li className="nav-sep" aria-hidden="true">
              |
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  )
}

export default Navbar
