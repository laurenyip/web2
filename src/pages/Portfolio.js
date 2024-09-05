import React from "react";
import "./Portfolio.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <div className="Portfolio">
      <ul className="navbar">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/About">
            About |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Projects">
            Projects |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Portfolio">
            Portfolio
          </Link>
        </li>
      </ul>

      <div className="container">
        <h1 className="text-left">Portfolio</h1>
        <br></br>
        <img
          src="/images/portfolio/lily.jpg"
          alt="Portfolio 1"
          style={{ width: "30%" }}
        />
      </div>
    </div>
  );
}

export default Portfolio;
