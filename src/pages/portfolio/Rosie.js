import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Rosie.css'

const I = {
  hero: '/images/projects/rosie/rosielab.github.io.png',
  website: '/images/projects/rosie/rosielab.github.io.png',
}

const SHOWCASE_SCREENS = [
  {
    id: 'website',
    label: 'Website',
    src: I.website,
    alt: 'React to This! website and dataset snapshot',
  },
]

export default function Rosie() {
  const [activeTab, setActiveTab] = useState(SHOWCASE_SCREENS[0].id)
  const showcase = SHOWCASE_SCREENS.find((s) => s.id === activeTab) ?? SHOWCASE_SCREENS[0]

  return (
    <div className="spruce-figma-page rosie-figma-page">
      <Navbar />
      <header className="spruce-figma-hero rosie-figma-hero">
        <div className="spruce-figma-hero-stage">
          <img src={I.hero} className="spruce-figma-hero-gif" alt="React to This! project website preview" />
        </div>
      </header>

      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas rosie-page">
          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">
              Research Assistant • ROSIE Lab • 2023–2024
            </h2>
            <h1 className="spruce-figma-hmw-title">React to This!</h1>
            <p className="spruce-figma-tagline">
              A dataset and study of how people physically and emotionally react to virtual social agents.
            </p>
          </section>

          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-section-label">THE PROJECT</p>
              <p className="spruce-figma-body">
                React to This! is a research project with ROSIE Lab (Robots with Social Intelligence and Empathy) that
                explores how people interact with and respond to virtual agents. The project focuses on creating a
                comprehensive, annotated dataset of common physical and emotional reactions to non-verbal virtual
                agents. The dataset is used to train and evaluate the performance of virtual agents in social
                interaction tasks.
              </p>
              <p className="spruce-figma-body">
                The dataset captures multimodal reactions - facial expressions, body language, and self-reported
                emotions - from participants interacting with non-verbal virtual agents across different social
                scenarios. The goal is to give future agents the data they need to respond appropriately to humans.
              </p>
            </div>
            <aside className="spruce-figma-meta" aria-label="Project details">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value">2023–2024</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Role</div>
                <div className="spruce-figma-meta-value">Research Assistant</div>
              </div>
              <div className="spruce-figma-meta-row spruce-figma-meta-row--last">
                <div className="spruce-figma-meta-label">Recognition</div>
                <div className="spruce-figma-meta-value">ROSIE Lab collaboration</div>
              </div>
            </aside>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">DESIGN CHALLENGE</h2>
            <h2 className="spruce-figma-ds-question">
              How might we capture authentic human reactions to non-verbal virtual agents at scale?
            </h2>
            <p className="spruce-figma-body">
              Existing datasets focus on verbal interaction. ROSIE Lab identified a gap: there was no large-scale
              annotated dataset specifically for non-verbal social agent responses. React to This! was built to fill
              it.
            </p>
          </section>

          <section className="spruce-figma-split" style={{ paddingTop: '50px' }}>
            <div>
              <h2 className="spruce-figma-section-label">MY CONTRIBUTION</h2>
              <p className="spruce-figma-body">
                I made significant contributions across multiple areas: created a descriptive/documentary video to
                communicate the research, designed and built the project website, edited the research paper, annotated
                data for analysis, and recruited participants and volunteers for data collection.
              </p>
            </div>
          </section>

          <section className="spruce-figma-final" aria-labelledby="rosie-showcase-heading">
            <h2 id="rosie-showcase-heading" className="spruce-figma-section-label spruce-figma-section-label--center">
              DESIGN SHOWCASE
            </h2>
            <div className="spruce-figma-final-browser-h">
              <div className="spruce-figma-final-tabs-h" role="tablist" aria-label="Choose a screen to preview">
                {SHOWCASE_SCREENS.map((screen) => (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    id={`tab-${screen.id}`}
                    className={`spruce-figma-final-tab-h${activeTab === screen.id ? ' spruce-figma-final-tab-h--active' : ''}`}
                    aria-selected={activeTab === screen.id}
                    aria-controls="spruce-final-tabpanel"
                    tabIndex={activeTab === screen.id ? 0 : -1}
                    onClick={() => setActiveTab(screen.id)}
                  >
                    {screen.label}
                  </button>
                ))}
              </div>
              <div
                id="spruce-final-tabpanel"
                className="spruce-figma-final-viewport"
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
              >
                <img src={showcase.src} alt={showcase.alt} className="spruce-figma-final-shot" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">REFLECTIONS</h2>
            <div className="spruce-figma-reflect-grid">
              <div>
                <h3 className="spruce-figma-reflect-title">Research as design</h3>
                <p className="spruce-figma-reflect-body">
                  Working in a research lab taught me that defining the right question is harder - and more important -
                  than building the answer. Designing the data collection process and the participant experience was as
                  much a design problem as the website.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">Making research accessible</h3>
                <p className="spruce-figma-reflect-body">
                  The website and documentary weren&apos;t afterthoughts - they were the bridge between the paper and
                  the people it could help. I learned how much communication design matters in academic work, where the
                  default is to assume the audience will find you.
                </p>
              </div>
            </div>
          </section>

          <footer className="spruce-figma-footer">
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Link to="/starmap" className="spruce-figma-next">
                See next case study →
              </Link>
            </div>
          </footer>
        </div>
      </div>
      <ScrollToTop color="#2d9ab8" />
    </div>
  )
}
