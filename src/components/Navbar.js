import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/App.css'

function Navbar() {
  return (
    <ul className="navbar">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects">
          Projects |
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