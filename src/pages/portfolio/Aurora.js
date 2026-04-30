import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Aurora.css'

const I = {
  home: '/images/projects/aurora/aurora_home.png',
  hero: '/images/projects/aurora/aurora_t.png',
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

export default function Aurora() {
  const [activeTab, setActiveTab] = useState(SHOWCASE_SCREENS[0].id)
  const showcase = SHOWCASE_SCREENS.find((s) => s.id === activeTab) ?? SHOWCASE_SCREENS[0]

  return (
    <div className="spruce-figma-page aurora-figma-page">
      <Navbar />
      <header className="spruce-figma-hero aurora-figma-hero">
        <div className="spruce-figma-hero-stage">
          <img src={I.hero} className="spruce-figma-hero-gif" alt="Aurora Pet Co. home screen preview" />
        </div>
      </header>

      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas aurora-page">
        
          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-section-label">THE PRODUCT</p>
              <p className="spruce-figma-body" style={{ maxWidth: '700px' }}>
              Aurora Pet Co. is a seamless subscription platform with vet-backed delivery and a focus on chronic
              conditions, designed to make pet health more affordable and accessible across Canada. The solution
              addresses the unmet need for an online pet pharmacy in the Canadian market.
            </p>
            </div>
            <aside className="spruce-figma-meta" aria-label="Project details">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value">October 2025 — December 2025</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Role</div>
                <div className="spruce-figma-meta-value">Product Designer &amp; PM</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Recognition</div>
                <div className="spruce-figma-meta-value">Top 4 finalist</div>
              </div>
            </aside>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">DESIGN CHALLENGE</h2>
            <h2 className="spruce-figma-ds-question">
            How might we make pet medication affordable and accessible for every Canadian pet owner?
            </h2>
            <div className="spruce-figma-ds-inner" style={{ marginTop: '18px' }}>
              <div>
                <h3 className="spruce-figma-reflect-title">Market pressure</h3>
                <p className="spruce-figma-body">
                  Pet ownership is rising across Canada, but medication remains expensive and inconsistent to access.
                  More families need chronic-condition support, yet affordable options are still fragmented.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">Why this gap matters</h3>
                <p className="spruce-figma-body">
                  Canada has 16M+ pet owners and still no dominant online pet pharmacy. Regulatory complexity and
                  limited vet access slow care at the exact moment speed and trust matter most.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-figma-challenge">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center">DESIGN SYSTEM</h2>
            <h2 className="spruce-figma-ds-question">Designed to feel trustworthy, warm, and helpful.</h2>
            <div className="spruce-figma-ds-inner" style={{ marginBottom: '36px' }}>
              <div>
                <h3 className="spruce-figma-reflect-title" style={{ marginBottom: '16px' }}>
                  Colours
                </h3>
                <div className="spruce-ds-swatches">
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#fcbaff' }} />
                    <span className="spruce-ds-swatch-label">Aurora Pink</span>
                    <span className="spruce-ds-swatch-hex">#FCBAFF</span>
                    <span className="spruce-ds-swatch-note">
                      A warm accent that keeps the brand caring and approachable.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#4a7c59' }} />
                    <span className="spruce-ds-swatch-label">Trust Green</span>
                    <span className="spruce-ds-swatch-hex">#4A7C59</span>
                    <span className="spruce-ds-swatch-note">
                      Used for labels and key actions to signal safety and reliability.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#f6faf2', border: '1px solid #dbe7d6' }} />
                    <span className="spruce-ds-swatch-label">Soft Mint BG</span>
                    <span className="spruce-ds-swatch-hex">#F6FAF2</span>
                    <span className="spruce-ds-swatch-note">
                      Keeps long reading sections calm and reduces visual fatigue.
                    </span>
                  </div>
                  <div className="spruce-ds-swatch-item">
                    <div className="spruce-ds-swatch-circle" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }} />
                    <span className="spruce-ds-swatch-label">White</span>
                    <span className="spruce-ds-swatch-hex">#FFFFFF</span>
                    <span className="spruce-ds-swatch-note">
                      High contrast canvas for product details, forms, and medication info.
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
                    <div className="spruce-ds-type-sample" style={{ fontFamily: 'pepi, var(--spruce-ff-boring-reg)', fontSize: '36px' }}>
                      Pepi Trial - section prompts
                    </div>
                    <span className="spruce-ds-swatch-note">
                      Larger display sizes create clear wayfinding and a reassuring editorial tone.
                    </span>
                  </div>
                  <div className="spruce-ds-type-item" style={{ marginTop: '20px' }}>
                    <div className="spruce-ds-type-sample" style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '16px', lineHeight: 1.6 }}>
                      Inter - product details, dosage context, and support copy
                    </div>
                    <span className="spruce-ds-swatch-note">
                      Body text stays highly legible so owners can scan quickly when making care decisions.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="spruce-figma-ds-inner" style={{ marginBottom: '36px' }}>
              <div>
                <h3 className="spruce-figma-reflect-title">Typography and readability</h3>
                <p className="spruce-figma-reflect-body">
                  Display headings use a serif voice to feel professional and reassuring, while body copy stays in
                  Arial for quick scanning and high legibility. This keeps medication details easy to read on first
                  pass, especially for stressed pet owners making health decisions.
                </p>
                <p className="spruce-figma-reflect-body">
                  The type scale is intentionally calm: large section prompts for orientation, clear subheads for
                  hierarchy, and restrained body sizes for long-form product and prescription information.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">Colour, imagery, and trust signals</h3>
                <p className="spruce-figma-reflect-body">
                  Soft pink and forest-green accents create a caring tone without looking childish. Green carries
                  reliability for healthcare actions, while pink keeps the product warm and approachable.
                </p>
                <p className="spruce-figma-reflect-body">
                  I chose real pet photography to make the experience feel human and familiar, not clinical. Combined
                  with clean spacing and predictable layouts, the visuals help owners feel guided through prescriptions,
                  cart decisions, and refill workflows.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-figma-final" aria-labelledby="aurora-showcase-heading">
            <h2 id="aurora-showcase-heading" className="spruce-figma-section-label spruce-figma-section-label--center">
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
