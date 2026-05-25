import React from 'react'
import Link from 'next/link'
import '../pages/App.css'

function Navbar({ className = '' }) {
  return (
    <ul className={`navbar${className ? ` ${className}` : ''}`}>

      <li className="nav-item">
        <Link className="nav-link" href="/">
          Home<span className="nav-pipe">|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/about">
          About<span className="nav-pipe">|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/projects">
          Projects<span className="nav-pipe">|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/portfolio">
          Portfolio
        </Link>
      </li>
    </ul>
  )
}

export default Navbar