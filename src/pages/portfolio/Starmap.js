import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Starmap.css'

const SHOWCASE_SCREENS = {
  landing: {
    src: '/images/projects/starmap/starmap.lol.png',
    alt: 'starmap landing page with relationship-focused onboarding',
  },
  dashboard: {
    src: '/images/projects/starmap/dashboard.png',
    alt: 'starmap graph dashboard showing people and relationship links',
  },
}

const FEATURE_CARDS = [
  {
    title: 'Remember everything',
    body: "Every person gets a profile with context that actually matters: birthdays, allergies, favourite things, where you met, and notes you don't want to lose over time.",
    src: '/images/projects/starmap/list.png',
    alt: 'Starmap list view showing profiles and relationship tags',
  },
  {
    title: 'Connect anyone',
    body: 'Add relationship edges between any two people so your graph reflects real social dynamics: friends, rivals, family, classmates, mentors, and more.',
    src: '/images/projects/starmap/addconnection.png',
    alt: 'Add connection modal with relationship tags and notes',
  },
  {
    title: 'Create constellations',
    body: 'Group people into custom constellations and instantly see clusters light up in your graph. Organize your world by context, not just contact lists.',
    src: '/images/projects/starmap/constellation.png',
    alt: 'Constellation panel with categories and highlighted groups',
  },
  {
    title: 'Fast profile capture',
    body: 'The New Person flow is built for speed so adding someone right after meeting them takes seconds, not a full journaling session.',
    src: '/images/projects/starmap/addnode.png',
    alt: 'New person modal with profile fields and relationship tags',
  },
  {
    title: 'Import with AI',
    body: 'Paste notes, upload docs, or drop meeting recaps to extract draft profiles into editable cards before saving to your graph.',
    src: '/images/projects/starmap/importai.png',
    alt: 'Import with AI modal with text and file upload options',
  },
]

export default function Starmap() {
  const [activeTab, setActiveTab] = useState('landing')
  const showcase = SHOWCASE_SCREENS[activeTab] || SHOWCASE_SCREENS.landing

  return (
    <div className="starmap-page spruce-page bg-white min-h-screen">
      <Navbar />

      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="spruce-hero-label">Founder • Product Design • Full-Stack Build</div>
          <h1 className="spruce-hero-title starmap-main-title">starmap</h1>
          <p className="spruce-hero-tagline">
            A personal relationship map that helps you remember what matters, stay intentional, and be a better
            friend.
          </p>
        </div>

        <div className="spruce-container">
          <p className="starmap-live-cta">
            Curious?{' '}
            <a href="https://starmap.lol" target="_blank" rel="noreferrer">
              Go try starmap live at starmap.lol →
            </a>
          </p>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Overview</div>
        <div className="spruce-col-wide">
          <p className="spruce-body">
            starmap is a relationship management tool for people who care deeply but struggle to keep every detail in
            their head. Instead of treating your network as a flat contact list, it models your social world as a
            living graph: people, clusters, and connections.
          </p>
          <p className="spruce-body">
            The goal is simple: remember the little things, follow through on plans, and maintain relationships with
            more consistency and intention over time.
          </p>
        </div>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">How It Works</div>
          <div className="spruce-col-wide">
            <p className="spruce-body">
              Each person gets a profile where you can store context like location, relationship tags, memory notes,
              and custom attributes. Then you can draw links between people to represent how they relate to each
              other, not just how they relate to you.
            </p>
            <p className="spruce-body">
              You can create constellations for different parts of life and switch between graph and list views based
              on the task: discover patterns in graph mode, then review and edit quickly in list mode.
            </p>
          </div>
        </div>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">Design Showcase</div>
          <h2 className="spruce-section-title starmap-showcase-title">From onboarding to your relationship graph</h2>
          <p className="spruce-meta-value">
            The experience moves from a clear call to action into a live map where you can add people, create
            constellations, and track relationships as they evolve.
          </p>

          <div className="spruce-tabs">
            {Object.keys(SHOWCASE_SCREENS).map((key) => (
              <button
                key={key}
                type="button"
                className={`spruce-tab ${activeTab === key ? 'spruce-tab--active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="spruce-showcase-frame">
            <p className="spruce-showcase-hint">Scroll inside the frame to see the full page</p>
            <div
              className="spruce-showcase-scroll"
              tabIndex={0}
              role="region"
              aria-label={`Full-page ${activeTab} design — scroll for full length`}
            >
              <img src={showcase.src} alt={showcase.alt} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Features</div>
        <div className="spruce-features-grid starmap-features-grid">
          {FEATURE_CARDS.map((feature) => (
            <article key={feature.title} className="spruce-feature-card">
              <div className="spruce-feature-title">{feature.title}</div>
              <p className="spruce-feature-body">{feature.body}</p>
              <div className="spruce-feature-media starmap-feature-media">
                <img src={feature.src} alt={feature.alt} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Why starmap Exists</div>
        <div className="spruce-col-wide">
          <p className="spruce-body">
            I built starmap because I wanted to be a better friend.
          </p>
          <p className="spruce-body">
            Before this, I had a 2,000-word Notion document with notes on around 70 people. A friend joked that I was
            running version control on my relationships. At first I wrote to process how I felt when life was busy and
            I wasn&apos;t sure who my real friends were.
          </p>
          <p className="spruce-body">
            Over time, those notes became practical: allergies, favorite films, what we last talked about, and plans
            we keep saying we&apos;ll make. Starmap turns that habit into a clear product that helps me show up with
            consistency and care.
          </p>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Impact</div>
        <ul className="spruce-contrib-list">
          <li>Transforms long-form relationship journaling into a structured product workflow</li>
          <li>Makes social memory searchable and visual through graph + list dual modes</li>
          <li>Supports intentional follow-through with person-level notes and connection context</li>
          <li>Creates a foundation for future relationship insights, reminders, and habit loops</li>
        </ul>
      </section>

      <div className="spruce-container spruce-back-row">
        <Link to="/portfolio" className="spruce-back-link">
          ← Back to Case Studies
        </Link>
      </div>
    </div>
  )
}
