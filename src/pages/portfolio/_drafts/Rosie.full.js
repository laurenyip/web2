'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollToTop from '../../components/ScrollToTop'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Rosie.css'

const I = {
  hero: '/images/projects/rosie/rosie_t.png',
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
          <Image
            src={I.hero}
            className="spruce-figma-hero-gif"
            alt="React to This! project website preview"
            width={1400}
            height={900}
            priority
          />
        </div>
      </header>

      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas rosie-page">
          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-section-label">THE PROJECT</p>
              <p className="spruce-figma-body">
                React to This! is a ROSIE Lab research project about how people respond to non-verbal virtual agents.
                We built an annotated dataset to support training and evaluation of socially intelligent agent
                behavior.
              </p>
              <p className="spruce-figma-body">
                The dataset captures multimodal reactions - facial expression, body language, and self-reported
                emotion - across different social scenarios, so future agents can respond in more appropriate human
                contexts.
              </p>
            </div>
            <aside className="spruce-figma-meta" aria-label="Project details">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value rosie-year-numeric">2023–2024</div>
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

          <section className="spruce-figma-split" style={{ paddingTop: '50px' }}>
            <div>
              <h2 className="spruce-figma-section-label">MY CONTRIBUTION</h2>
              <p className="spruce-figma-body">
                I made significant contributions across multiple areas: created a descriptive/documentary video to
                communicate the research, designed and built the project website, edited the research paper, annotated
                data for analysis, and recruited participants and volunteers for data collection.
              </p>
            </div>
            <div className="rosie-project-link-col">
              <h2 className="spruce-figma-section-label">PROJECT LINK</h2>
              <a
                href="https://rosielab.github.io/react-to-this/"
                target="_blank"
                rel="noopener noreferrer"
                className="rosie-project-link-btn"
              >
                rosielab.github.io/react-to-this/
              </a>
            </div>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">DESIGN CHOICES</h2>
    
            <div className="spruce-figma-ds-inner" style={{ marginBottom: '36px' }}>
              <div>
                <h3 className="spruce-figma-reflect-title" style={{ marginBottom: '16px' }}>
                  Colour system
                </h3>
                <div className="spruce-ds-swatches">
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#d03419' }} />
                    <span className="spruce-ds-swatch-label">Sensitive-info Red</span>
                    <span className="spruce-ds-swatch-hex">#D03419</span>
                    <span className="spruce-ds-swatch-note">
                      Used to flag sensitive information and caution states that need extra attention.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#61dafb' }} />
                    <span className="spruce-ds-swatch-label">React Blue</span>
                    <span className="spruce-ds-swatch-hex">#61DAFB</span>
                    <span className="spruce-ds-swatch-note">
                      Used as a supportive brand colour to keep the interface approachable.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }} />
                    <span className="spruce-ds-swatch-label">White</span>
                    <span className="spruce-ds-swatch-hex">#FFFFFF</span>
                    <span className="spruce-ds-swatch-note">
                      Clean background so dense research content stays readable.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }} />
                    <span className="spruce-ds-swatch-label">Light Gray</span>
                    <span className="spruce-ds-swatch-hex">#F3F4F6</span>
                    <span className="spruce-ds-swatch-note">
                      Subtle separators for table rows and metadata blocks.
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title" style={{ marginBottom: '16px' }}>
                  Typography
                </h3>
                <div className="spruce-ds-type-stack">
                  <div className="spruce-ds-type-item">
                    <div className="spruce-ds-type-sample" style={{ fontFamily: 'urania, var(--spruce-ff-boring-reg)', fontSize: '32px' }}>
                      Urania - headings and section prompts
                    </div>
                    <span className="spruce-ds-swatch-note">
                      Clear hierarchy for long case-study reading without feeling technical or cold.
                    </span>
                  </div>
                  <div className="spruce-ds-type-item" style={{ marginTop: '20px' }}>
                    <div className="spruce-ds-type-sample" style={{ fontFamily: 'Hubot, Arial, sans-serif', fontSize: '16px', lineHeight: 1.6 }}>
                      Hubot - body copy, annotations, and captions
                    </div>
                    <span className="spruce-ds-swatch-note">
                      Familiar and legible for paragraph content, notes, and supporting explanations.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="spruce-figma-ds-inner">
              <div>
                <h3 className="spruce-figma-reflect-title">Tables and annotation structure</h3>
                <p className="spruce-figma-body">
                  Dataset tables were structured for fast scanning: consistent column order, clear labels, and compact
                  row spacing so coders could move quickly without losing context.
                </p>
                <p className="spruce-figma-body">
                  Grouping fields by modality (facial, body, self-report) made annotation review easier and reduced
                  mistakes during quality checks.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">Why these choices mattered</h3>
                <p className="spruce-figma-body">
                  The goal was not visual novelty - it was clarity and trust for researchers, participants, and future
                  readers of the dataset.
                </p>
                <p className="spruce-figma-body">
                  A calm colour system, readable typography, and structured tables made the project easier to use and
                  easier to communicate.
                </p>
              </div>
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
                <Image
                  src={showcase.src}
                  alt={showcase.alt}
                  className="spruce-figma-final-shot"
                  width={1200}
                  height={1600}
                  priority={false}
                />
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
              <Link href="/starmap" className="spruce-figma-next">
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
