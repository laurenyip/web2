import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/App.css'

function Navbar({ className = '' }) {
  return (
    <ul
      className={`navbar fixed top-1 left-0 w-full max-w-md px-2 md:max-w-none z-[50] bg-white opacity-70 text-gray-700 font-[Moto] text-lg flex list-none justify-start p-2 ${className}`}
    >

      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home<span className="nav-pipe">&nbsp;|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About<span className="nav-pipe">&nbsp;|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects">
          Projects<span className="nav-pipe">&nbsp;|</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/portfolio">
          Portfolio
        </Link>
      </li>
    </ul>
  )
}

export default Navbar