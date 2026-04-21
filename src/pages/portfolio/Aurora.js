import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import '../App.css'
import './Spruce.css'
import './Aurora.css'

const SHOWCASE_SCREENS = {
  home: {
    src: '/images/projects/aurora/aurora_home.png',
    alt: 'Aurora Pet Co. home screen',
  },
  products: {
    src: '/images/projects/aurora/products.png',
    alt: 'Aurora Pet Co. products listing',
  },
  medications: {
    src: '/images/projects/aurora/medications.png',
    alt: 'Aurora Pet Co. medication details',
  },
  dropdown: {
    src: '/images/projects/aurora/dropdown.png',
    alt: 'Aurora Pet Co. product selection dropdown',
  },
  cart: {
    src: '/images/projects/aurora/cart.png',
    alt: 'Aurora Pet Co. cart and checkout screen',
  },
  signin: {
    src: '/images/projects/aurora/signin.png',
    alt: 'Aurora Pet Co. sign in and account flow',
  },
  faq: {
    src: '/images/projects/aurora/faq.png',
    alt: 'Aurora Pet Co. FAQ and support section',
  },
}

const FEATURE_CARDS = [
  {
    title: 'Subscription medication delivery',
    body: 'Recurring delivery for chronic-condition meds with reminders and refill tracking built in.',
    src: '/images/projects/aurora/progress.png',
    alt: 'Subscription progress tracker UI',
  },
  {
    title: 'Vet-backed prescription validation',
    body: 'Prescription-aware purchase flow with trusted checkout and safe delivery pathways.',
    src: '/images/projects/aurora/cart.png',
    alt: 'Vet-backed checkout and prescription flow',
  },
  {
    title: 'Transparent pricing model',
    body: 'Clear product pricing and quantity options up front so owners can compare and plan.',
    src: '/images/projects/aurora/products.png',
    alt: 'Product grid showing clear prices',
  },
  {
    title: 'Accessible support and onboarding',
    body: 'Simple sign-in, guided dropdown choices, and FAQ support reduce barriers for first-time users.',
    src: '/images/projects/aurora/signin.png',
    alt: 'Sign-in and onboarding screen',
  },
]

export default function Aurora() {
  const [activeTab, setActiveTab] = useState('home')
  const showcase = SHOWCASE_SCREENS[activeTab] || SHOWCASE_SCREENS.home

  return (
    <div className="aurora-page spruce-page bg-white min-h-screen">
      <Navbar />

      <section className="spruce-hero">
        <div className="spruce-container">
          <div className="spruce-hero-label">Product Designer & Product Manager</div>
          <h1 className="spruce-hero-title">Aurora Pet Co.</h1>
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Overview</div>
        <div className="spruce-col-wide">
          <p className="spruce-body">
            Aurora Pet Co. is a seamless subscription platform with vet-backed delivery and a focus on chronic
            conditions, designed to make pet health more affordable and accessible across Canada. The solution
            addresses the unmet need for an online pet pharmacy in the Canadian market.
          </p>
        </div>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">The Challenge</div>
          <p className="spruce-body">
            Rising pet ownership, growing demand for affordable care, and no dominant online pet pharmacy in Canada
            create a perfect storm of unmet need, regulatory barriers, and timing. Canada&apos;s 16M+ pet owners
            struggle with high medication costs and limited access to affordable pet healthcare.
          </p>
        </div>
      </section>

      <section className="spruce-section spruce-section--tinted">
        <div className="spruce-container">
          <div className="spruce-section-tag">Design Showcase</div>
          <h2 className="spruce-section-title">The Solution</h2>
          <p className="spruce-meta-value">
            A seamless subscription platform with vet-backed delivery and a focus on chronic conditions to make pet
            health more affordable and accessible across Canada. The platform features transparent pricing, convenient
            subscription management, and reliable delivery, helping pet owners save $50-$100+ per year on medications.
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
        <div className="spruce-section-tag">Key Features</div>
        <div className="spruce-features-grid">
          {FEATURE_CARDS.map((feature) => (
            <div key={feature.title} className="spruce-feature-card">
              <div className="spruce-feature-title">{feature.title}</div>
              <p className="spruce-feature-body">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="spruce-section spruce-container">
        <div className="spruce-section-tag">Impact</div>
        <ul className="spruce-contrib-list">
          <li>Top 4 finalist in Cansbridge x Simple Ventures pitch competition</li>
          <li>Acknowledged for best prototype and slide design</li>
          <li>Addresses unmet need for 16M+ Canadian pet owners</li>
          <li>Potential savings of $50-$100+ per year per pet owner</li>
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
