import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/App.css'

function Navbar() {
  return (
    <ul className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 md:left-[21%] md:translate-x-0 md:max-w-none md:w-[78%] z-[50] bg-white opacity-70 text-gray-700 font-[Moto] text-lg flex list-none justify-start p-4">

      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
        &nbsp;About |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects">
        &nbsp;Projects |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/portfolio">
        &nbsp;Portfolio
        </Link>
      </li>
    </ul>
  )
}

export default Navbar 