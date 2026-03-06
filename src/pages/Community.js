import React from 'react'
import Navbar from '../components/Navbar'
import './Community.css'

function Community() {

  return (
    <div className="community-page">
      <Navbar />

      {/* Section 1: Landing Page */}
      <section className="community-section landing-section">
        <div className="grid-background"></div>
        <div className="landing-image-container">
          <img 
            src="/images/community/treehouse-landing.png" 
            alt="Treehouse landing"
            className="section-image"
          />
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="community-section how-it-works-section">
        <div className="grid-background"></div>
        <div className="section-image-container">
          <img 
            src="/images/community/how-it-works.png" 
            alt="How it works"
            className="section-image"
          />
        </div>
      </section>

      {/* Section 3: Who We Are */}
      <section className="community-section who-we-are-section">
        <div className="grid-background"></div>
        <div className="section-image-container">
          <img 
            src="/images/community/who-we-are.png" 
            alt="Who we are"
            className="section-image"
          />
        </div>
        
        {/* Scrolling Text Strip */}
        <div className="scrolling-text-strip">
          <div className="scrolling-wrapper">
            <div className="scrolling-content">
              needed ☆ impromptu hangout after? everyone is welcome here ☆ free snacks provided ☆ the third space you never knew you needed ☆
            </div>
            <div className="scrolling-content">
              needed ☆ impromptu hangout after? everyone is welcome here ☆ free snacks provided ☆ the third space you never knew you needed ☆
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Community
