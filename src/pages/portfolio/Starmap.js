import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [heroIframeReady, setHeroIframeReady] = useState(false)
  const showcase = SHOWCASE_SCREENS[activeTab] || SHOWCASE_SCREENS.landing

  return (
    <div className="starmap-page spruce-page bg-white min-h-screen">
      <Navbar />

      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="starmap-hero-top">
            <div className="starmap-hero-embed-wrap">
              {!heroIframeReady && (
                <img
                  src="/images/projects/starmap/dashboard.png"
                  alt="Starmap graph view"
                  style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
                />
              )}
              <iframe
                src="https://starmap.lol"
                title="starmap live preview"
                className="starmap-hero-iframe"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setHeroIframeReady(true)}
                style={{ display: heroIframeReady ? 'block' : 'none' }}
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
            <h3 className="spruce-figma-hmw-title" style={{ textAlign: 'center', marginBottom: '48px' }}>
              Why does it feel like I have no time?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div className="starmap-journey-row">
                <img
                  src="/images/projects/starmap/people.png"
                  alt="Many people illustration"
                  className="starmap-journey-img"
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
                <img
                  src="/images/projects/starmap/confused.jpg"
                  alt="Person with question marks illustration"
                  className="starmap-journey-img"
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
              className="spruce-figma-section-label"
              style={{
                color: 'var(--sm-purple, #6d4ad8)',
                textAlign: 'left',
                marginBottom: '24px',
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
            <h3 className="spruce-figma-ds-question" style={{ textAlign: 'center', marginBottom: 0 }}>
              What if I made an app for that?
            </h3>
          </section>

          <section className="starmap-features-section">
            {/* Feature #1 */}
            <div className="starmap-feature-row" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className="starmap-feature-img-col">
                <img
                  src="/images/projects/starmap/matthew.png"
                  alt="Matthew profile node"
                  className="starmap-feature-img"
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Profiles — Feature #<span className="starmap-feature-num">1</span>
                </h3>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  After creating the nodes feature, I had accomplished what my Notion doc previously did. I could hold
                  my information entries in a clean, organized way, and view my friends as nodes across a map.
                </p>

                <div className="starmap-constellation-wrap">
                  <ConstellationSVG />
                </div>
              </div>
            </div>

            <p className="starmap-feature-quote">That took a long time, so I added AI to speed it up</p>

            {/* Feature #2 */}
            <div className="starmap-feature-row" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <div className="starmap-feature-img-col">
                <img
                  src="/images/projects/starmap/importai.png"
                  alt="Import with AI modal UI"
                  className="starmap-feature-img"
                  style={{ borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Import with AI — Feature #<span className="starmap-feature-num">2</span>
                </h3>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  I made a little Gemini wrapper to let me paste in my whole doc and have it fill out information
                  automatically.
                </p>
              </div>
            </div>

            <p className="starmap-feature-quote">What if I could visualize how people in my life know each other?</p>

            {/* Feature #3 */}
            <div className="starmap-feature-row" style={{ marginTop: '16px' }}>
              <div className="starmap-feature-img-col">
                <img
                  src="/images/projects/starmap/addconnection.png"
                  alt="Add connection UI showing node linking"
                  className="starmap-feature-img"
                  style={{ borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </div>

              <div className="starmap-feature-text-col">
                <h3 className="starmap-feature-heading">
                  Constellations, Connections, and Locations — Feature #
                  <span className="starmap-feature-num">3</span>
                </h3>
                <p className="spruce-figma-body" style={{ marginTop: '12px' }}>
                  By shift-clicking two nodes, you can add a connection type between them. Constellations help you
                  organize the communities or categories you know people from. Location helps you keep your friends
                  organized as people move around.
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
                    <img src={showcase.src} alt={showcase.alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="spruce-section spruce-container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="spruce-section-tag">Reflections</div>
            <div className="spruce-reflect-grid">
              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Reframing is a design skill</h3>
                <p className="spruce-body">
                  The most valuable thing I&apos;ve done on starmap isn&apos;t any individual feature — it&apos;s
                  getting clearer on what the product is actually for. Relationship tools are easy to overbuild. Every
                  iteration where I removed something taught me more than the ones where I added.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Emailing users for feedback</h3>
                <p className="spruce-body">
                  I reached out directly to early users by email to understand how they were actually using the graph.
                  The responses shaped the roadmap more than any analytics could — people weren&apos;t using features
                  I&apos;d spent the most time on, and were asking for things I hadn&apos;t considered.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-section spruce-container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="spruce-section-tag">Next Steps</div>
            <div className="spruce-reflect-grid">
              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Notion integration</h3>
                <p className="spruce-body">
                  Most people who care about relationship context already live in Notion. A two-way sync would let
                  users pull existing notes into starmap profiles and push updates back — so it fits into an existing
                  workflow rather than asking people to build a new one from scratch.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Shift-click to connect nodes</h3>
                <p className="spruce-body">
                  Right now creating a connection requires opening a modal. The faster interaction would be: hold
                  Shift, click two nodes, and they connect — with a lightweight inline label prompt. This makes the
                  graph feel more direct and spatial, like drawing on a canvas rather than filling out a form.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Location as a dropdown</h3>
                <p className="spruce-body">
                  Location is currently a free-text field, which means the same city gets entered twelve different
                  ways. Switching to a dropdown that saves and suggests previous entries would make filtering by
                  location reliable — and open up a &ldquo;who&apos;s nearby&rdquo; view that currently isn&apos;t
                  possible.
                </p>
              </div>

              <div className="spruce-reflect-item">
                <h3 className="spruce-feature-title">Deeper user research</h3>
                <p className="spruce-body">
                  The next round of emails to users will be more structured — specific questions about which features
                  they actually return to, what&apos;s missing before they&apos;d recommend it, and whether the graph
                  view or list view is doing more work for them day-to-day.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-section spruce-container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="spruce-section-tag">Impact</div>
            <ul className="spruce-contrib-list">
              <li>Transforms long-form relationship journaling into a structured product workflow</li>
              <li>Makes social memory searchable and visual through graph + list dual modes</li>
              <li>Supports intentional follow-through with person-level notes and connection context</li>
              <li>Creates a foundation for future relationship insights, reminders, and habit loops</li>
            </ul>
          </section>

          <div
            className="spruce-container spruce-back-row"
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Link to="/spruce" className="spruce-back-link">
              See next case study &nbsp;→
            </Link>
          </div>
        </div>
      </div>
      <ScrollToTop color="#6d4ad8" />
    </div>
  )
}
