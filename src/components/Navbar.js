import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/App.css'

function Navbar() {
  return (
    <ul className="fixed top-10  w-full md:left-[21%] md:w-[80%] z-[50] bg-white opacity-70 text-[#0a0748] font-[Moto] text-lg flex list-none justify-start p-4">

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