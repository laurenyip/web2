import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Rosie.css'

export default function Rosie() {
  return (
    <div className="rosie-page spruce-page bg-white min-h-screen">
      <Navbar />

      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="spruce-hero-label">Research Assistant • 2023-2024</div>
          <h1 className="spruce-hero-title">React to This!</h1>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Overview</div>
        <p className="spruce-body">
          React to This! is a research project with ROSIE Lab (Robots with Social Intelligence and Empathy) that
          explores how people interact with and respond to virtual agents. As a research assistant, I contributed
          across multiple dimensions of the project, from participant recruitment to multimedia production and data
          analysis.
        </p>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">Design Showcase</div>
          <h2 className="spruce-section-title">Project Website</h2>
          <p className="spruce-meta-value">
            The project focuses on creating a comprehensive, annotated dataset of common physical and emotional
            reactions to virtual agents. The dataset is used to train and evaluate the performance of virtual agents
            in social interaction tasks. I created a website to showcase the findings, common interactions, and an overview of the project.
          </p>

          <div className="spruce-showcase-frame">
            <div
              className="spruce-showcase-scroll"
              tabIndex={0}
              role="region"
              aria-label="React to This! project site and dataset overview"
            >
              <img
                src="/images/projects/rosie/rosielab.github.io.png"
                alt="React to This! website and dataset snapshot"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">My Contribution</div>
        <p className="spruce-body">
          I made significant contributions across multiple areas: created a descriptive/documentary video to
          communicate the research, designed and built the project website, edited the research paper, annotated data
          for analysis, and recruited participants and volunteers for data collection.
        </p>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Impact</div>
        <ul className="spruce-contrib-list">
          <li>Enhanced project visibility through website design and development</li>
          <li>Improved research communication through documentary video production</li>
          <li>Contributed to data quality through annotation and participant recruitment</li>
          <li>Supported academic publication by editing and formatting the paper</li>
        </ul>
      </section>

      <div className="spruce-container spruce-back-row">
        <Link to="/projects" className="spruce-back-link">
          ← Back to Projects
        </Link>
      </div>
    </div>
  )
}
