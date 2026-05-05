import React from 'react'
import Link from 'next/link'
import '../pages/App.css'

function Navbar({ className = '' }) {
  return (
    <ul
      className={`navbar fixed top-0 left-0 w-full max-w-md pl-6 pr-4 md:max-w-none md:px-8 z-[50] bg-white opacity-90 text-gray-700 font-[Moto] text-lg flex list-none justify-start ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        marginTop: 0,
        zIndex: 999,
      }}
    >

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