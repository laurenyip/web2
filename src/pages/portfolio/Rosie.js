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
        <div className="spruce-section-tag">THE PRODUCT</div>
        <div className="spruce-product-layout">
          <div className="spruce-col-wide">
            <p className="spruce-body">
              React to This! is a research project with ROSIE Lab (Robots with Social Intelligence and Empathy) that
              explores how people interact with and respond to virtual agents. The project focuses on creating a comprehensive, annotated dataset of common physical and emotional
              reactions to non-verbal virtual agents. The dataset is used to train and evaluate the performance of virtual agents
              in social interaction tasks.
            </p>
          </div>
          <div className="spruce-meta-row spruce-meta-row--stacked">
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Timeline</div>
              <div className="spruce-meta-value">2023–2024</div>
            </div>
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Role</div>
              <div className="spruce-meta-value">Research Assistant</div>
            </div>
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Recognition</div>
              <div className="spruce-meta-value">ROSIE Lab collaboration</div>
            </div>
          </div>
        </div>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">Design Showcase</div>
          <h2 className="spruce-section-title">Project Website</h2>
       

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
