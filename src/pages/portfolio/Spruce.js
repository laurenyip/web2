import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'

/** Full-page screen captures — scroll inside frame to view length */
const SHOWCASE_SCREENS = {
  home: {
    src: '/images/projects/spruce/spruce_home.png',
    alt: 'Spruce — full home page design',
  },
  activities: {
    src: '/images/projects/spruce/spruce_activities.png',
    alt: 'Spruce — Activities page',
  },
  resources: {
    src: '/images/projects/spruce/spruce_resources.png',
    alt: 'Spruce — Resources page',
  },
  profile: {
    src: '/images/projects/spruce/spruce_profile.png',
    alt: 'Spruce — Profile dashboard',
  },
}

/** Key Features — UI detail crops (paths include spaces → encodeURI) */
const FEATURE_UI = {
  map: encodeURI('/images/projects/spruce/Map.png'),
  resourceCard: encodeURI('/images/projects/spruce/Resource Card.png'),
  translate: encodeURI('/images/projects/spruce/Translate.png'),
  kidProfile: encodeURI('/images/projects/spruce/Kid Profile.png'),
}

export default function Spruce() {
  const [activeTab, setActiveTab] = useState('home')
  const showcase = SHOWCASE_SCREENS[activeTab]

  return (
    <div className="spruce-page bg-white min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="spruce-hero-label">
            Product Designer &nbsp;•&nbsp; UXathon 2026
          </div>
          <h1 className="spruce-hero-title">Spruce</h1>
          <p className="spruce-hero-tagline">
            Helping low-income families in Vancouver discover free and low-cost
            activities so kids can learn, play, and socialize <em>offline.</em>
          </p>
        </div>

        <div className="spruce-container">
          <div className="spruce-hero-img spruce-hero-img-wrap">
            <img
              src="/images/projects/spruce/spruce.gif"
              alt="Spruce — third spaces for children in Vancouver, product UI preview"
              className="spruce-hero-media"
              decoding="async"
            />
          </div>
        </div>

      </section>

      {/* ── Overview ── */}
      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">THE PRODUCT</div>
        <div className="spruce-product-layout">
          <div className="spruce-col-wide">
            <p className="spruce-body">
              Spruce is a free platform that helps low-income families in Vancouver
              discover free and low-cost "third-space" activities — art gallery
              workshops, swim lessons, concerts, coding camps — all in one simple
              search. Built during UXathon 2026 in 48 hours, it won <strong>Best UI
              Design</strong> by delivering a warm, trustable experience that feels
              socially safe and easy to keep up.
            </p>
          </div>
          <div className="spruce-meta-row spruce-meta-row--stacked">
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Timeline</div>
              <div className="spruce-meta-value">48 hours (UXathon 2026)</div>
            </div>
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Role</div>
              <div className="spruce-meta-value">Product Designer</div>
            </div>
            <div className="spruce-meta-item">
              <div className="spruce-meta-label">Recognition</div>
              <div className="spruce-meta-value">🏆 Best UI Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">DESIGN CHALLENGE</div>
          <h2 className="spruce-section-title spruce-section-title--large">
            How might we help families give kids a life <em>offline</em>?
          </h2>
          <p className="spruce-body">
            Third spaces — the places between home and school where kids can play,
            learn, and build social skills outside of a screen — are disproportionately
            inaccessible to families without disposable income. Spruce removes the
            friction of finding them.
          </p>
          <div className="spruce-callout-block">
            <div className="spruce-callout-prompt">
              The original prompt:
            </div>
            <blockquote className="spruce-blockquote">
              "In a world that rewards being always on, how might we design an
              experience that helps people set and keep boundaries to make recovery
              time feel socially safe, rewarding, and easy to sustain?"
            </blockquote>
          </div>
          <div className="spruce-reframe">
            <div className="spruce-reframe-label">Our reframe ✦</div>
            <p className="spruce-reframe-body">
              How might we help low-income families give their children opportunities
              to participate in third-spaces, to create self-sustainable habits that
              prevent digital fatigue and long-term phone addiction?
            </p>
          </div>
        </div>
      </section>

      {/* ── My Contribution ── */}
      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">MY ROLE</div>
        <div className="spruce-two-col">
          <div className="spruce-col-wide">
            <p className="spruce-body">
              I led the reframing of the original hackathon prompt into our focused
              problem statement — the pivot that shaped everything downstream.
              From there, I mapped and presented the journey for low-income families,
              identifying key moments of friction and opportunity.
            </p>
            <p className="spruce-body">
              On the visual side, I built the full design system from scratch:
              the Spruce logo, colour palette, and typography. I led the slide
              design for our final presentation, and my team and I collaborated on
              the profile, home, and activities pages in Figma.
            </p>
            <ul className="spruce-contrib-list">
              <li>Problem reframing & research synthesis</li>
              <li>User journey mapping (low-income family lens)</li>
              <li>Logo, colour palette & typography system</li>
              <li>Presentation slide design</li>
              <li>Profile, Home & Activities page design</li>
            </ul>
          </div>
          <div className="spruce-col-narrow">
            <figure className="spruce-impact-team" style={{ marginTop: 0 }}>
              <img
                src="/images/projects/spruce/team.jpg"
                alt="Team 19 — Spruce, Best UI Design award at UXathon 2026"
                loading="lazy"
              />
              <figcaption className="spruce-impact-team-caption">
                Best UI Design · UXathon 2026 — Team Spruce
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Design Showcase ── */}
      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">THE SOLUTION</div>
          <h2 className="spruce-section-title spruce-section-title--large">
            What if art gallery workshops, swim lessons, concerts, and coding camps
            could all be found in one simple search — filtered by cost, age, and
            neighbourhood?
          </h2>

          <div className="spruce-showcase-layout">
            {/* Showcase tabs */}
            <div className="spruce-tabs">
              <button
                type="button"
                className={`spruce-tab ${activeTab === 'home' ? 'spruce-tab--active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                Home
              </button>
              <button
                type="button"
                className={`spruce-tab ${activeTab === 'activities' ? 'spruce-tab--active' : ''}`}
                onClick={() => setActiveTab('activities')}
              >
                Activities
              </button>
              <button
                type="button"
                className={`spruce-tab ${activeTab === 'resources' ? 'spruce-tab--active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              <button
                type="button"
                className={`spruce-tab ${activeTab === 'profile' ? 'spruce-tab--active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
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
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">KEY FEATURES</div>
        <h2 className="spruce-section-title spruce-section-title--large">
          Four features that make Spruce <em>work</em> for families.
        </h2>
        <div className="spruce-features-grid">

          <div className="spruce-feature-card">
            <div className="spruce-feature-icon">🗺</div>
            <div className="spruce-feature-title">Location-aware discovery</div>
            <p className="spruce-feature-body">
              Filter free and low-cost activities by neighbourhood, age group, and
              descriptive type tags. No paywall, no hidden costs — every listing is
              vetted for accessibility.
            </p>
            <div className="spruce-feature-media">
              <img
                src={FEATURE_UI.map}
                alt="Map of Greater Vancouver with activity location pins"
                loading="lazy"
              />
            </div>
          </div>

          <div className="spruce-feature-card">
            <div className="spruce-feature-icon">📋</div>
            <div className="spruce-feature-title">Resources page</div>
            <p className="spruce-feature-body">
              A dedicated section for grants, subsidies, and community resources
              specifically for low-income families — because finding the activity
              is only half the battle.
            </p>
            <div className="spruce-feature-media">
              <img
                src={FEATURE_UI.resourceCard}
                alt="Resource card — Jumpstart grant listing"
                loading="lazy"
              />
            </div>
          </div>

          <div className="spruce-feature-card">
            <div className="spruce-feature-icon">🌐</div>
            <div className="spruce-feature-title">Translate feature</div>
            <p className="spruce-feature-body">
              Built-in translation makes Spruce accessible to non-English-speaking
              families — a critical consideration for Vancouver's diverse
              low-income communities.
            </p>
            <div className="spruce-feature-media spruce-feature-media--translate">
              <img
                src={FEATURE_UI.translate}
                alt="Translate UI — English to Spanish"
                className="spruce-feature-translate-img"
                loading="lazy"
              />
            </div>
          </div>

          <div className="spruce-feature-card">
            <div className="spruce-feature-icon">👤</div>
            <div className="spruce-feature-title">User & child profiles</div>
            <p className="spruce-feature-body">
              Profiles for parents and each child enable filtered, personalized
              search results — so a 7-year-old's swim lesson doesn't compete with
              a teenager's coding camp.
            </p>
            <div className="spruce-feature-media">
              <img
                src={FEATURE_UI.kidProfile}
                alt="Child profile card — Laura Lee with filters"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Process ── */}
      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">PROCESS</div>
          <h2 className="spruce-section-title spruce-section-title--large">
            From a broad prompt to a focused product — in 48 hours.
          </h2>

          <div className="spruce-process-steps">
            <div className="spruce-process-step">
              <div className="spruce-step-num">01</div>
              <div className="spruce-step-content">
                <div className="spruce-step-title">Reframe the prompt</div>
                <p className="spruce-step-body">
                  The original prompt was broad — "recovery time that feels socially safe."
                  We noticed it could apply to many populations, but low-income families
                  faced a specific compounding problem: the free alternative to screens
                  (third spaces) was effectively invisible to them. We narrowed there.
                </p>
              </div>
            </div>
            <div className="spruce-process-step">
              <div className="spruce-step-num">02</div>
              <div className="spruce-step-content">
                <div className="spruce-step-title">Map the journey</div>
                <p className="spruce-step-body">
                  I mapped the low-income family journey from awareness ("my kid is on
                  their phone too much") through search, cost-checking, registration,
                  and repeat use. Each step surfaced a new friction point to design around.
                </p>
              </div>
            </div>
            <div className="spruce-process-step">
              <div className="spruce-step-num">03</div>
              <div className="spruce-step-content">
                <div className="spruce-step-title">Build the visual system</div>
                <p className="spruce-step-body">
                  Spruce needed to feel warm and trustable — not clinical, not corporate.
                  I designed the logo, palette (earthy greens and soft neutrals), and
                  typography system to signal safety and approachability.
                </p>
              </div>
            </div>
            <div className="spruce-process-step">
              <div className="spruce-step-num">04</div>
              <div className="spruce-step-content">
                <div className="spruce-step-title">Design & iterate</div>
                <p className="spruce-step-body">
                  With the system defined, the team worked in parallel on key screens.
                  I collaborated on profile, home, and activities — aligning layouts
                  to our journey map and pressure-testing for accessibility.
                </p>
              </div>
            </div>
          </div>

          <figure className="spruce-process-image-wrap" style={{ marginTop: '2.5rem' }}>
            <img
              src="/images/projects/spruce/progress.png"
              alt="Spruce process board and design progress"
              className="spruce-process-image"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">IMPACT</div>
        <h2 className="spruce-section-title spruce-section-title--large">
          Won <em>Best UI Design</em> — here&apos;s what we built.
        </h2>
        <div className="spruce-impact-row">
          <div className="spruce-impact-stat">
            <div className="spruce-impact-num">🏆</div>
            <div className="spruce-impact-label">Best UI Design</div>
            <div className="spruce-impact-sub">UXathon 2026</div>
          </div>
          <div className="spruce-impact-stat">
            <div className="spruce-impact-num">↓</div>
            <div className="spruce-impact-label">Reduced search friction</div>
            <div className="spruce-impact-sub">for cost-sensitive families by curating vetted options in one place</div>
          </div>
          <div className="spruce-impact-stat">
            <div className="spruce-impact-num">✦</div>
            <div className="spruce-impact-label">Safer offline path</div>
            <div className="spruce-impact-sub">creating a more rewarding route to offline habits for kids</div>
          </div>
        </div>

      </section>

      {/* ── Reflections ── */}
      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">Reflections</div>
          <div className="spruce-reflections">
            <div className="spruce-reflection">
              <div className="spruce-reflection-icon">✎ᝰ</div>
              <div>
                <div className="spruce-reflection-title">Reframing is a design skill</div>
                <p className="spruce-reflection-body">
                  The most valuable thing I did at UXathon wasn't a screen — it was
                  rewriting the problem statement. A better question unlocks better
                  solutions. Getting comfortable challenging the brief, especially
                  under time pressure, is something I want to keep building.
                </p>
              </div>
            </div>
            <div className="spruce-reflection">
              <div className="spruce-reflection-icon">𝄞</div>
              <div>
                <div className="spruce-reflection-title">Designing for dignity</div>
                <p className="spruce-reflection-body">
                  Designing for low-income families means being thoughtful about tone.
                  Nothing in Spruce should feel like a charity product. The visual
                  warmth and simple language were intentional — families should feel
                  like they belong on the platform, not like they're being helped.
                </p>
              </div>
            </div>
            <div className="spruce-reflection">
              <div className="spruce-reflection-icon">⋆</div>
              <div>
                <div className="spruce-reflection-title">Speed sharpens decisions</div>
                <p className="spruce-reflection-body">
                  48 hours forces you to trust your instincts. There's no time to
                  second-guess every choice, which — surprisingly — led to a more
                  cohesive visual system than I might have produced with more time
                  and more debate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="spruce-next-case">
        <div className="spruce-container">
          <Link to="/projects" className="spruce-next-card">
            <div className="spruce-next-eyebrow">Next case study</div>
            <div className="spruce-next-title">View all projects →</div>
            <div className="spruce-next-sub">Aurora Pet Co. · Starmap · React to This!</div>
          </Link>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="spruce-container spruce-back-row">
        <Link to="/projects" className="spruce-back-link">
          ← Back to Projects
        </Link>
      </div>

    </div>
  )
}