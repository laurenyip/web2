import React from "react";
import "./Projects.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Projects() {
  return (
    <div className="Projects">
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

      <div className="container">
        <h1 className="text-left">Projects</h1>
        <div className="project-list">
          <div className="project-item">
            <a href="https://github.com/laurenyip/ai4good" target="_blank"  rel="noreferrer">
              <button class="btn custom-btn">Brig.AI</button>
            </a>
            <p>
              Brig.ai empowers women affected by PCOS and Endometriosis to take
              charge of their health journey. We provide personalized insights
              and recommended diagnostic tests, bridging the gap between patient
              advocacy and medical understanding. [Jun 2024][AI4GOOD Lab]
            </p>
          </div>

          <div className="project-item">
            <a
              href="https://devpost.com/software/emergency-response-bc-erbc"
              target="_blank"  rel="noreferrer"
            >
              <button class="btn custom-btn">Emergency Response BC</button>
            </a>
            <p>
              This was my first hackathon project! With my amazing team, I
              helped design and implement a functional webapp that can take
              location data and output a list of the nearest hospitals and their
              emergency room wait time. [Jan 2024][nwHACKS 2024]
            </p>
          </div>

          <div className="project-item">
            <a href="laurenyip.com" target="_blank">
              <button class="btn custom-btn">This Website!</button>
            </a>
            <p>
              Was coded with the help of HTML, Bootstrap CSS, JS, and lots of
              edits... [Dec 2023]
            </p>
          </div>
          <div className="project-item">
            <a href="https://rosielab.github.io/react-to-this/" target="_blank"  rel="noreferrer">
              <button class="btn custom-btn">React to This!</button>
            </a>
            <p>
              One of my first REACT projects! A project website I made as the
              undergraduate research assistant for Rosie Lab. My project is
              called <strong>"Aware Like an Animal."</strong>
            </p>
            <p>
              We researched interactions between people and virtual agents,
              towards the overall goal of making believable, interaction-aware
              virtual characters.
            </p>
            <p>
              I analyzed and annotated participants' videos, helped to edit and
              proofread the paper, and participated and collaborated in
              meetings. I also created a supplementary video and designed a website,
              overviewing our project to submit to CHI '24 and IROS '24.
            </p>
          </div>
        </div>

        <div className="project-item">
          <a href="https://github.com/laurenyip" target="_blank"  rel="noreferrer">
            <button class="btn custom-btn">GITHUB</button>

           
          </a>
        </div>
        <p>See the repositories!</p>
      </div>
    </div>
  );
}

export default Projects;
