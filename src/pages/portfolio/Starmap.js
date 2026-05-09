'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'
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

function ConstellationSVG() {
  return (
    <svg
      viewBox="0 0 260 180"
      width="100%"
      height="auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Animated constellation of relationship nodes"
      role="img"
    >
      <style>{`
        @keyframes sm-twinkle-a {
          0%,100%{opacity:1;r:5px}
          45%{opacity:0.4;r:3.5px}
          72%{opacity:1;r:6px}
        }
        @keyframes sm-twinkle-b {
          0%,100%{opacity:1;r:4.5px}
          38%{opacity:0.3;r:3px}
          68%{opacity:0.95;r:5.5px}
        }
        @keyframes sm-twinkle-c {
          0%,100%{opacity:1;r:5px}
          55%{opacity:0.5;r:3.5px}
          78%{opacity:1;r:5.5px}
        }
        @keyframes sm-line-pulse {
          0%,100%{opacity:0.35}
          50%{opacity:0.65}
        }
        .sm-line{animation:sm-line-pulse 3s ease-in-out infinite}
        .sm-line-b{animation:sm-line-pulse 2.6s ease-in-out infinite;animation-delay:.4s}
        .sm-line-c{animation:sm-line-pulse 3.4s ease-in-out infinite;animation-delay:.8s}
        .sm-node-a{animation:sm-twinkle-a 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .sm-node-b{animation:sm-twinkle-b 1.9s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .sm-node-c{animation:sm-twinkle-c 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .sm-node-d{animation:sm-twinkle-a 1.7s ease-in-out infinite;transform-box:fill-box;transform-origin:center;animation-delay:.5s}
        .sm-node-e{animation:sm-twinkle-b 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;animation-delay:.3s}
      `}</style>

      {/* Connection lines */}
      <line x1="80" y1="60" x2="140" y2="40" stroke="#9b7fe8" strokeWidth="1.2" className="sm-line" />
      <line x1="140" y1="40" x2="200" y2="70" stroke="#9b7fe8" strokeWidth="1.2" className="sm-line-b" />
      <line x1="80" y1="60" x2="100" y2="120" stroke="#9b7fe8" strokeWidth="1.2" className="sm-line-c" />
      <line x1="140" y1="40" x2="180" y2="130" stroke="#9b7fe8" strokeWidth="1" className="sm-line" />
      <line x1="100" y1="120" x2="180" y2="130" stroke="#9b7fe8" strokeWidth="1" className="sm-line-b" />
      <line x1="200" y1="70" x2="180" y2="130" stroke="#9b7fe8" strokeWidth="1" className="sm-line-c" />

      {/* Nodes */}
      <circle cx="80" cy="60" r="5" fill="#7c3aed" className="sm-node-a" />
      <circle cx="140" cy="40" r="4.5" fill="#9b7fe8" className="sm-node-b" />
      <circle cx="200" cy="70" r="5" fill="#7c3aed" className="sm-node-c" />
      <circle cx="100" cy="120" r="4.5" fill="#9b7fe8" className="sm-node-d" />
      <circle cx="180" cy="130" r="5" fill="#7c3aed" className="sm-node-e" />

      {/* Glow rings */}
      <circle cx="80" cy="60" r="9" fill="none" stroke="#7c3aed" strokeWidth="0.6" opacity="0.3" className="sm-node-a" />
      <circle cx="140" cy="40" r="8" fill="none" stroke="#9b7fe8" strokeWidth="0.6" opacity="0.3" className="sm-node-b" />
      <circle cx="200" cy="70" r="9" fill="none" stroke="#7c3aed" strokeWidth="0.6" opacity="0.3" className="sm-node-c" />
      <circle cx="100" cy="120" r="8" fill="none" stroke="#9b7fe8" strokeWidth="0.6" opacity="0.3" className="sm-node-d" />
      <circle cx="180" cy="130" r="9" fill="none" stroke="#7c3aed" strokeWidth="0.6" opacity="0.3" className="sm-node-e" />
    </svg>
  )
}

export default function Starmap() {
  const [activeTab, setActiveTab] = useState('landing')
  const showcase = SHOWCASE_SCREENS[activeTab] || SHOWCASE_SCREENS.landing

  return (
    <div className="starmap-page spruce-page bg-white min-h-screen">
      <Navbar />

      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="starmap-hero-top">
            <div className="starmap-hero-embed-wrap">
              <Image
                src="/images/projects/starmap/starmap.gif"
                alt="Starmap hero preview"
                width={1400}
                height={900}
                priority
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas">
          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-tagline">
                A personal relationship map that helps you remember what matters, stay intentional, and be a better
                friend.
              </p>
              <p className="spruce-figma-lede">
                starmap is a relationship management tool. Instead of treating your network as a flat contact list, it
                models your social world as a living graph: people, clusters, and connections. 
              </p>
              <p className="spruce-figma-lede" style={{ marginTop: '12px' }}>
                The goal is simple: remember the little things, follow through on plans, and maintain relationships
                with more consistency and intention over time.
              </p>
              <p className="spruce-figma-lede" style={{ marginTop: '16px' }}>
                Curious? Go try starmap live at{' '}
                <a
                  href="https://starmap.lol"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  starmap.lol
                </a>{' '}
                →
              </p>
            </div>

            <aside className="spruce-figma-meta">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value">March 2026–ongoing</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Role</div>
                <div className="spruce-figma-meta-value">everything!</div>
              </div>
              <div className="spruce-figma-meta-row spruce-figma-meta-row--last">
                <div className="spruce-figma-meta-label">Recognition</div>
                <div className="spruce-figma-meta-value">40 users so far :)</div>
              </div>
            </aside>
          </section>

          <section style={{ padding: '56px var(--spruce-pad-x, 95px) 48px' }}>
            <h2
              className="spruce-figma-design-challenge-label"
              style={{ textAlign: 'center', color: 'var(--sm-purple, #6d4ad8)' }}
            >
              MY USER JOURNEY
            </h2>
            <h3 className="spruce-figma-ds-question" style={{ textAlign: 'center', marginBottom: '48px' }}>
              Why does it feel like I have no time?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div className="starmap-journey-row">
                <Image
                  src="/images/projects/starmap/people.png"
                  alt="Many people illustration"
                  className="starmap-journey-img"
                  width={700}
                  height={700}
                  priority={false}
                />
                <div className="starmap-journey-copy">
                  <h4 className="starmap-journey-heading">Time tracking</h4>
                  <p className="spruce-figma-body">
                    It was the busiest summer of my life between my job, courses, and time with friends and family. I
                    was tracking my time 24/7 with TogglTracker, and I was spending about 8% with friends - about 16%
                    of my waking hours.
                  </p>
                </div>
              </div>

              <div className="starmap-journey-row">
                <Image
                  src="/images/projects/starmap/confused.jpg"
                  alt="Person with question marks illustration"
                  className="starmap-journey-img"
                  width={700}
                  height={700}
                  priority={false}
                />
                <div className="starmap-journey-copy">
                  <h4 className="starmap-journey-heading">Being picky</h4>
                  <p className="spruce-figma-body">
                    It seemed like the answer was becoming choosier with who I chose to spend my time with. But how
                    without data, how would I know who was real and fake?
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ padding: '0 var(--spruce-pad-x, 95px) 56px' }}>
            <h2
              className="spruce-figma-design-challenge-label"
              style={{
                color: 'var(--sm-purple, #6d4ad8)',
                textAlign: 'left',
                marginTop: '26px',
                marginBottom: '16px',
              
              }}
            >
              FIRST SOLUTION
            </h2>

            <div className="starmap-insight-grid">
              <div className="starmap-insight-card">
                <h3 className="spruce-figma-insight-title">NOTION DOC</h3>
                <p className="spruce-figma-insight-body">
                  I wrote out the names of all 60+ &quot;friends&quot; I had along with journal entries on our
                  friendship, how they made me feel, and things I should remember about them. I would update this
                  whenever I saw them or something significant happened in our relationship.
                </p>
              </div>

              <div className="starmap-insight-card">
                <h3 className="spruce-figma-insight-title">PROBLEMS</h3>
                <p className="spruce-figma-insight-body">
                  It was such a long document and it wasn&apos;t well organized.
                </p>
              </div>
            </div>
          </section>

          <section style={{ padding: '48px var(--spruce-pad-x, 95px) 56px' }}>
            <h2
              className="spruce-figma-design-challenge-label"
              style={{ textAlign: 'center', color: 'var(--sm-purple, #6d4ad8)' }}
            >
              WHY STARMAP EXISTS
            </h2>
            <h3 className="spruce-figma-ds-question">
              What if I made an app for that?
            </h3>
          </section>

          <section style={{ padding: '0 var(--spruce-pad-x, 95px) 24px' }}>
            <h2
              className="spruce-figma-design-challenge-label"
              style={{
                color: 'var(--sm-purple, #6d4ad8)',
                textAlign: 'left',
                marginBottom: '12px',
              }}
            >
              SECOND SOLUTION — your social world as a living graph
            </h2>
          </section>

          <section className="starmap-focus-section">
            <p className="starmap-focus-eyebrow">Focus Areas</p>
            <h3 className="starmap-focus-heading">three things that needed to work</h3>
            <div className="starmap-focus-grid">
              <div className="starmap-focus-card">
                <div className="starmap-focus-num">01</div>
                <h4 className="starmap-focus-title">Holding relationship context</h4>
                <p className="starmap-focus-body">
                  Replacing the Notion doc with structured, per-person profiles.
                </p>
              </div>
              <div className="starmap-focus-card">
                <div className="starmap-focus-num">02</div>
                <h4 className="starmap-focus-title">Making data entry fast</h4>
                <p className="starmap-focus-body">
                  The doc failed partly because updating it was a chore.
                </p>
              </div>
              <div className="starmap-focus-card">
                <div className="starmap-focus-num">03</div>
                <h4 className="starmap-focus-title">Visualizing the social graph</h4>
                <p className="starmap-focus-body">
                  Seeing not just who you know, but how they connect.
                </p>
              </div>
            </div>
          </section>

          <section className="starmap-features-section">
            {/* Feature #1 */}
            <div className="starmap-feature-row" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className="starmap-feature-img-col">
                <Image
                  src="/images/projects/starmap/matthew.png"
                  alt="Matthew profile node"
                  className="starmap-feature-img"
                  width={900}
                  height={1400}
                  priority={false}
                  style={{ marginTop: '-8px' }}
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Profiles &amp; Nodes — Feature #<span className="starmap-feature-num">1</span>
                </h3>
                <p className="starmap-feature-subhead">making the notion doc obsolete</p>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  The first thing I built was the nodes feature — each person gets a profile card where you can log
                  relationship notes, memories, and context. Visually, they exist as nodes on the map.
                </p>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  This accomplished what my Notion doc did, but in a clean, browsable, spatial format instead of an
                  infinite scroll of text.
                </p>

                <div className="starmap-constellation-wrap">
                  <ConstellationSVG />
                </div>
              </div>
            </div>

            {/* Feature #2 */}
            <div className="starmap-feature-row" style={{ marginTop: '64px', marginBottom: '16px' }}>
              <div className="starmap-feature-img-col">
                <Image
                  src="/images/projects/starmap/importai.png"
                  alt="Import with AI modal UI"
                  className="starmap-feature-img"
                  width={900}
                  height={1400}
                  priority={false}
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Import with AI — Feature #<span className="starmap-feature-num">2</span>
                </h3>
                <p className="starmap-feature-subhead">
                  because nobody wants to type <span className="starmap-feature-num">60</span> names
                </p>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  The biggest friction point for new users was getting started — copying years of relationship notes
                  into a new tool is a hard ask. I built a small Gemini wrapper that lets you paste your existing doc
                  and have it auto-populate profiles.
                </p>
                <p className="starmap-feature-punch">One paste. Done.</p>
              </div>
            </div>

            <p className="starmap-feature-quote">What if I could visualize how people in my life know each other?</p>

            {/* Feature #3 */}
            <div className="starmap-feature-row" style={{ marginTop: '16px' }}>
              <div className="starmap-feature-img-col">
                <Image
                  src="/images/projects/starmap/addconnection.png"
                  alt="Add connection UI showing node linking"
                  className="starmap-feature-img"
                  width={900}
                  height={1400}
                  priority={false}
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Constellations, Connections &amp; Locations — Feature #
                  <span className="starmap-feature-num">3</span>
                </h3>
                <p className="starmap-feature-subhead">what if you could see how your worlds overlap?</p>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  The graph view becomes most powerful when you can map relationships between people, not just people
                  themselves.
                </p>
                <ul className="starmap-feature-list">
                  <li>
                    <strong>Connections</strong> — shift-click two nodes to define how they know each other
                  </li>
                  <li>
                    <strong>Constellations</strong> — group people into communities (work, college, family, etc.)
                  </li>
                  <li>
                    <strong>Locations</strong> — track where people are as they move around
                  </li>
                </ul>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  This turned Starmap from a glorified contact list into something that actually reflected how my
                  social world was structured.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-section">
            <div className="spruce-container">
              <div className="spruce-section-tag">Design Showcase</div>
              <div className="spruce-figma-final-browser-h">
                <div className="spruce-figma-final-tabs-h" role="tablist" aria-label="Choose a screen to preview">
                  {Object.keys(SHOWCASE_SCREENS).map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      id={`tab-${key}`}
                      className={`spruce-figma-final-tab-h${activeTab === key ? ' spruce-figma-final-tab-h--active' : ''}`}
                      aria-selected={activeTab === key}
                      aria-controls="spruce-final-tabpanel"
                      tabIndex={activeTab === key ? 0 : -1}
                      onClick={() => setActiveTab(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div className="spruce-showcase-frame">
                  <div
                    id="spruce-final-tabpanel"
                    className="spruce-showcase-scroll"
                    tabIndex={0}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    aria-label={`Full-page ${activeTab} design — scroll for full length`}
                  >
                    <Image src={showcase.src} alt={showcase.alt} width={1200} height={2600} priority={false} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="spruce-section spruce-container" style={{ paddingTop: '50px', paddingBottom: '24px' }}>
            <div className="spruce-section-tag">Key Takeaways</div>
            <div className="spruce-reflect-grid spruce-reflect-grid--3">
              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Talk to your users directly, not just through analytics.</h3>
                <p className="spruce-body">
                  Emailing early users revealed that the features I&apos;d spent the most time on weren&apos;t the
                  ones people returned to. Direct conversations shaped the roadmap faster than any dashboard could.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Fit into existing workflows, don&apos;t replace them.</h3>
                <p className="spruce-body">
                  Most people who care about relationship context already live in Notion. A two-way sync isn&apos;t a
                  nice-to-have — it&apos;s the difference between Starmap being a tool people adopt vs. one they try
                  and abandon.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Interactions should feel spatial.</h3>
                <p className="spruce-body">
                  Shift-click to connect nodes. Draw on a canvas, don&apos;t fill out a form. The graph metaphor only
                  works if the interactions reinforce it.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-section spruce-container" style={{ paddingTop: '24px', paddingBottom: '60px' }}>
            <div className="spruce-section-tag">What&apos;s Next</div>
            <div className="spruce-reflect-grid spruce-reflect-grid--3">
              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Notion integration</h3>
                <p className="spruce-body">
                  Two-way sync so Starmap fits into existing workflows rather than asking people to build a new one
                  from scratch.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Shift-click to connect</h3>
                <p className="spruce-body">
                  Replace the modal with a faster, more direct interaction — hold Shift, click two nodes, and they
                  connect.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Structured user research</h3>
                <p className="spruce-body">
                  Targeted questions about which features people actually return to, and what&apos;s missing before
                  they&apos;d recommend it.
                </p>
              </div>
            </div>
          </section>

          <section className="starmap-try-live spruce-container">
            <p className="starmap-try-live-text">
              Try it live at{' '}
              <a href="https://starmap.lol" target="_blank" rel="noreferrer">
                starmap.lol
              </a>
              {' '}→
            </p>
          </section>

          <div
            className="spruce-container spruce-back-row"
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Link href="/spruce" className="spruce-back-link">
              See next case study &nbsp;→
            </Link>
          </div>
        </div>
      </div>
      <ScrollToTop color="#6d4ad8" />
    </div>
  )
}
