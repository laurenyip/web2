import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Aurora.css'

const I = {
  home: '/images/projects/aurora/aurora_t.png',
  products: '/images/projects/aurora/products.png',
  medications: '/images/projects/aurora/medications.png',
  dropdown: '/images/projects/aurora/dropdown.png',
  cart: '/images/projects/aurora/cart.png',
  signin: '/images/projects/aurora/signin.png',
  faq: '/images/projects/aurora/faq.png',
  progress: '/images/projects/aurora/progress.png',
}

const SHOWCASE_SCREENS = [
  {
    id: 'home',
    label: 'Home',
    src: I.home,
    alt: 'Aurora Pet Co. home screen',
  },
  {
    id: 'products',
    label: 'Products',
    src: I.products,
    alt: 'Aurora Pet Co. products listing',
  },
  {
    id: 'medications',
    label: 'Medications',
    src: I.medications,
    alt: 'Aurora Pet Co. medication details',
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    src: I.dropdown,
    alt: 'Aurora Pet Co. product selection dropdown',
  },
  {
    id: 'cart',
    label: 'Cart',
    src: I.cart,
    alt: 'Aurora Pet Co. cart and checkout screen',
  },
  {
    id: 'signin',
    label: 'Signin',
    src: I.signin,
    alt: 'Aurora Pet Co. sign in and account flow',
  },
  {
    id: 'faq',
    label: 'FAQ',
    src: I.faq,
    alt: 'Aurora Pet Co. FAQ and support section',
  },
]

const FEATURE_CARDS = [
  {
    title: 'Subscription medication delivery',
    body: 'Recurring delivery for chronic-condition meds with reminders and refill tracking built in.',
    src: I.progress,
    alt: 'Subscription progress tracker UI',
  },
  {
    title: 'Vet-backed prescription validation',
    body: 'Prescription-aware purchase flow with trusted checkout and safe delivery pathways.',
    src: I.cart,
    alt: 'Vet-backed checkout and prescription flow',
  },
  {
    title: 'Transparent pricing model',
    body: 'Clear product pricing and quantity options up front so owners can compare and plan.',
    src: I.products,
    alt: 'Product grid showing clear prices',
  },
  {
    title: 'Accessible support and onboarding',
    body: 'Simple sign-in, guided dropdown choices, and FAQ support reduce barriers for first-time users.',
    src: I.signin,
    alt: 'Sign-in and onboarding screen',
  },
]

export default function Aurora() {
  const [activeTab, setActiveTab] = useState(SHOWCASE_SCREENS[0].id)
  const showcase = SHOWCASE_SCREENS.find((s) => s.id === activeTab) ?? SHOWCASE_SCREENS[0]

  return (
    <div className="spruce-figma-page aurora-figma-page">
      <Navbar />
      <header className="spruce-figma-hero aurora-figma-hero">
        <div className="spruce-figma-hero-stage">
          <img src={I.home} className="spruce-figma-hero-gif" alt="Aurora Pet Co. home screen preview" />
        </div>
      </header>

      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas aurora-page">
          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">Product Designer & Product Manager</h2>
            <h1 className="spruce-figma-hmw-title">Aurora Pet Co.</h1>
          </section>

          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-section-label">THE PRODUCT</p>
              <p className="spruce-figma-body">
              Aurora Pet Co. is a seamless subscription platform with vet-backed delivery and a focus on chronic
              conditions, designed to make pet health more affordable and accessible across Canada. The solution
              addresses the unmet need for an online pet pharmacy in the Canadian market.
            </p>
            </div>
            <aside className="spruce-figma-meta" aria-label="Project details">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value">2025</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Role</div>
                <div className="spruce-figma-meta-value">Product Designer &amp; PM</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Recognition</div>
                <div className="spruce-figma-meta-value">Top 4 finalist</div>
              </div>
              <div className="spruce-figma-meta-row spruce-figma-meta-row--last">
                <div className="spruce-figma-meta-label">Competition</div>
                <div className="spruce-figma-meta-value">Cansbridge x Simple Ventures</div>
              </div>
            </aside>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">DESIGN CHALLENGE</h2>
            <h2 className="spruce-figma-hmw-title">
            How might we make pet medication affordable and accessible for every Canadian pet owner?
            </h2>
            <p className="spruce-figma-body">
            Rising pet ownership, growing demand for affordable care, and no dominant online pet pharmacy in Canada
            create a perfect storm of unmet need, regulatory barriers, and timing. Canada&apos;s 16M+ pet owners
            struggle with high medication costs and limited access to affordable pet healthcare.
            </p>
            <p className="spruce-figma-body">
            Canada has 16M+ pet owners but no dominant online pet pharmacy. High medication costs, limited vet
            access, and regulatory complexity leave chronic-condition pets underserved. The opportunity is real —
            the execution gap is larger.
            </p>
          </section>

          <section className="spruce-figma-split">
            <div>
              <h2 className="spruce-figma-section-label">MY ROLE</h2>
              <p className="spruce-figma-body">
              I joined Simple Ventures as a Product Designer and PM on Aurora Pet Co., working across the full
              product surface — from information architecture to visual design to pitch deck narrative.
              </p>
              <p className="spruce-figma-body">
              I led the design of all seven product screens, defined the pricing and subscription model UX, and
              collaborated on the competitive positioning that shaped our finalist presentation.
              </p>
              <ul className="spruce-contrib-list">
                <li>Product screen design (7 screens end-to-end)</li>
                <li>Subscription model UX and pricing architecture</li>
                <li>Competitive landscape research</li>
                <li>Pitch deck design and narrative</li>
                <li>Prototype build for finalist presentation</li>
              </ul>
            </div>
            <div className="spruce-img-placeholder" aria-label="Team or process placeholder">
              Team / process photo
            </div>
          </section>

          <section className="spruce-figma-final" aria-labelledby="aurora-showcase-heading">
            <h2 id="aurora-showcase-heading" className="spruce-figma-section-label spruce-figma-section-label--center">
              DESIGN SHOWCASE
            </h2>
            <h2 className="spruce-figma-hmw-title">The Solution</h2>
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
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">KEY FEATURES</h2>
            <h2 className="spruce-figma-hmw-title">Four features that make Aurora work for pet owners.</h2>
            <div className="spruce-features-grid">
              {FEATURE_CARDS.map((feature) => (
                <div key={feature.title} className="spruce-feature-card">
                  <div className="spruce-feature-title">{feature.title}</div>
                  <p className="spruce-feature-body">{feature.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">IMPACT</h2>
            <div className="spruce-impact-row">
              <article className="spruce-impact-card">
                <div className="spruce-impact-icon" aria-hidden>
                  🏆
                </div>
                <h3 className="spruce-impact-label">Top 4 finalist</h3>
                <p className="spruce-impact-sub">Cansbridge x Simple Ventures</p>
              </article>
              <article className="spruce-impact-card">
                <div className="spruce-impact-icon" aria-hidden>
                  ✦
                </div>
                <h3 className="spruce-impact-label">Best prototype</h3>
                <p className="spruce-impact-sub">acknowledged for design and slide quality</p>
              </article>
              <article className="spruce-impact-card">
                <div className="spruce-impact-icon" aria-hidden>
                  $
                </div>
                <h3 className="spruce-impact-label">$50–$100+ saved</h3>
                <p className="spruce-impact-sub">per pet owner per year on chronic medications</p>
              </article>
            </div>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">REFLECTIONS</h2>
            <div className="spruce-figma-reflect-grid">
              <div>
                <h3 className="spruce-figma-reflect-title">Designing for trust in healthcare</h3>
                <p className="spruce-figma-reflect-body">
              Pet owners making medication decisions need to feel safe. Every design choice — from the
              prescription validation flow to the pricing display — had to reduce anxiety, not create it. I
              learned how much tone and visual hierarchy matter in high-stakes purchase decisions.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">PM and design at the same time</h3>
                <p className="spruce-figma-reflect-body">
              Working across both roles meant I had to make decisions about what to build before I designed how
              it would look. That tension made the product sharper — every screen had a clear job, because
              I&apos;d already argued about whether it should exist at all.
                </p>
              </div>
            </div>
          </section>

          <footer className="spruce-figma-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/projects" className="spruce-figma-next">
                ← Back to Projects
              </Link>
              <Link to="/rosie" className="spruce-figma-next">
                See next case study →
              </Link>
            </div>
          </footer>
        </div>
      </div>
      <ScrollToTop color="#4a7c59" />
    </div>
  )
}
