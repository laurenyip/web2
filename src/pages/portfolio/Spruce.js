import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'
import '../App.css'
import './Spruce.css'

const I = {
  gif: '/images/projects/spruce/spruce.gif',
  progress: '/images/projects/spruce/progress.png',
  team: '/images/projects/spruce/team.jpg',
  spruceLogo: '/images/projects/spruce/spruce_logo.png',
  bubble: '/images/projects/spruce/bubble.png',
  map: encodeURI('/images/projects/spruce/Map.png'),
  resourceCard: encodeURI('/images/projects/spruce/Resource Card.png'),
  kidProfile: encodeURI('/images/projects/spruce/Kid Profile.png'),
  translate: encodeURI('/images/projects/spruce/Translate.png'),
  home: '/images/projects/spruce/spruce_home.png',
  finalActivities: '/images/projects/spruce/spruce_activities.png',
  finalResources: '/images/projects/spruce/spruce_resources.png',
  profile: '/images/projects/spruce/spruce_profile.png',
  activities: '/images/projects/spruce/activities.png',
  resources: '/images/projects/spruce/resources.png',
  ipadkids: '/images/projects/spruce/ipadkids.png',
  laura: '/images/projects/spruce/laura.png',
  spanish: '/images/projects/spruce/spanish.png',
}

const FINAL_SCREENS = [
  {
    id: 'home',
    label: 'Home',
    src: I.home,
    alt: 'Spruce home — marketing page and product overview',
  },
  {
    id: 'activities',
    label: 'Activities',
    src: I.finalActivities,
    alt: 'Spruce activities — map, filters, and program cards',
  },
  {
    id: 'resources',
    label: 'Resources',
    src: I.finalResources,
    alt: 'Spruce resources — grants and support programs',
  },
  {
    id: 'profile',
    label: 'Profile',
    src: I.profile,
    alt: 'Spruce profile — family members and saved filters',
  },
]

export default function Spruce() {
  const [finalScreenId, setFinalScreenId] = useState(FINAL_SCREENS[0].id)
  const activeFinal = FINAL_SCREENS.find((s) => s.id === finalScreenId) ?? FINAL_SCREENS[0]

  return (
    <div className="spruce-figma-page">
      <Navbar />
      <header className="spruce-figma-hero">
        <div className="spruce-figma-hero-inner">
          <div className="spruce-figma-hero-stage">
            <img
              className="spruce-figma-hero-gif"
              src={I.gif}
              alt="Spruce product UI preview"
            />
          </div>
        </div>
      </header>
      <div className="spruce-figma-gutter">
        <div className="spruce-figma-canvas">
          <section className="spruce-figma-intro">
            <div className="spruce-figma-intro-main">
              <p className="spruce-figma-tagline">
                A platform to discover free and low-cost activities— so kids can learn, play, and
                socialize offline.
              </p>
              <p className="spruce-figma-lede">
                Spruce is a free platform that helps low-income families in Vancouver discover art
                gallery workshops, swim lessons, concerts, coding camps in one simple search.
              </p>
            </div>
            <aside className="spruce-figma-meta" aria-label="Project details">
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Timeline</div>
                <div className="spruce-figma-meta-value">48 hours (UXathon 2026)</div>
              </div>
              <div className="spruce-figma-meta-row">
                <div className="spruce-figma-meta-label">Role</div>
                <div className="spruce-figma-meta-value">Product Designer</div>
              </div>
              <div className="spruce-figma-meta-row spruce-figma-meta-row--last">
                <div className="spruce-figma-meta-label">Recognition</div>
                <div className="spruce-figma-meta-value">🏆 Best UI Design</div>
              </div>
            </aside>
          </section>

          <section className="spruce-figma-challenge" aria-labelledby="spruce-design-challenge-heading">
            <h2
              id="spruce-design-challenge-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
            >
              DESIGN CHALLENGE
            </h2>
            <h3 className="spruce-figma-ds-question">
              How might we help families give their kids a life offline?
            </h3>
          </section>

          <section className="spruce-figma-ipadkids" aria-label="Research collage on screen time and play">
            <img
              src={I.ipadkids}
              alt="Collage: character figure, weekly screen time stats, child with tablet, and phone illustration"
            />
          </section>

          <section className="spruce-figma-insight-grid" aria-label="Prompt and research highlights">
            <article className="spruce-figma-insight-card">
              <div className="spruce-insight-num">01</div>
              <h3 className="spruce-figma-insight-title">THE ORIGINAL PROMPT</h3>
              <p className="spruce-figma-insight-body spruce-figma-insight-body--italic">
                In a world that rewards being always on, how might we design an experience that helps people
                set and keep boundaries to make recovery time feel socially safe, rewarding, and easy to
                sustain?
              </p>
            </article>
            <article className="spruce-figma-insight-card">
              <div className="spruce-insight-num">02</div>
              <h3 className="spruce-figma-insight-title">Lower-Income Predicts Increased Smartphone Use and...</h3>
              <p className="spruce-figma-insight-body">
                As the coronavirus disease 2019 (COVID-19) has continued for a...
              </p>
              <a
                className="spruce-figma-insight-link"
                href="https://pmc.ncbi.nlm.nih.gov"
                target="_blank"
                rel="noreferrer"
              >
                pmc.ncbi.nlm.nih.gov
              </a>
            </article>
            <article className="spruce-figma-insight-card">
              <div className="spruce-insight-num">03</div>
              <h3 className="spruce-figma-insight-title">Spruce removes friction.</h3>
              <p className="spruce-figma-insight-body">
                Third spaces — the places between home and school where kids can play and learn — are
                disproportionately inaccessible to families without disposable income or time to look for them.
              </p>
            </article>
            <article className="spruce-figma-insight-card">
              <div className="spruce-insight-num">04</div>
              <h3 className="spruce-figma-insight-title">OUR REFRAME</h3>
              <p className="spruce-figma-insight-body spruce-figma-insight-body--italic">
                How might we help low-income families give their children opportunities to participate in
                third-spaces, to create self-sustainable habits that prevent digital fatigue and long-term
                phone addiction?
              </p>
            </article>
          </section>

          <section className="spruce-figma-features-h spruce-figma-features-h--friction">
            <h2 className="spruce-figma-section-label">FEATURES THAT REMOVE FRICTION</h2>
          </section>

          <section className="spruce-figma-split spruce-figma-split--resources">
            <img
              className="spruce-figma-card-shot spruce-figma-friction-shot"
              src={I.resources}
              alt="Jumpstart resource card listing grants and sports tags"
            />
            <div className="spruce-figma-split-copy" style={{ maxWidth: '300px' }}>
              <h3 className="spruce-figma-feature-title">Resources</h3>
              <p className="spruce-figma-body">
                We provide a page full of relevant grants, subsidies, and community resources specifically
                for low-income families.
              </p>
            </div>
          </section>

          <section className="spruce-figma-split spruce-figma-split--reverse spruce-figma-split--activities">
            <img
              className="spruce-figma-card-shot spruce-figma-friction-shot"
              src={I.activities}
              alt="Filters for activities screen"
            />
            <div className="spruce-figma-split-copy" style={{ maxWidth: '300px' }}>
              <h3 className="spruce-figma-feature-title">Filters for activities</h3>
              <p className="spruce-figma-body">
                Filter free and low-cost activities by neighbourhood, age group, and descriptive type tags.
              </p>
            </div>
          </section>

          <section className="spruce-figma-ds-band">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center spruce-figma-section-label--ds">
              Design system
            </h2>
            <h3 className="spruce-figma-ds-question">
              How do we create an inviting and accessible user experience?
            </h3>
            <div className="spruce-figma-ds-inner">
              <div className="spruce-figma-ds-copy">
                <img src={I.spruceLogo} alt="Spruce logo" className="spruce-figma-ds-logo" />
                <p className="spruce-figma-body">
                  Spruce was named after the street in Vancouver. We wanted it to have real ties to the
                  city.
                </p>
              </div>
              <div className="spruce-figma-ds-copy">
                <img src={I.bubble} alt="Speech bubble color motif" className="spruce-figma-ds-bubble" />
                <p className="spruce-figma-body spruce-figma-body--tight">
                  The blue was chosen for the mountains, green for the forests, and red for the salmon.
                </p>
              </div>
            </div>
          </section>

          <section className="spruce-figma-features-h spruce-figma-features-h--spaced spruce-figma-features-h--everyone">
            <h2 className="spruce-figma-section-label">FEATURES THAT WORK FOR EVERYONE</h2>
          </section>

          <section className="spruce-figma-split spruce-figma-split--tight spruce-figma-split--profiles">
            <img
              className="spruce-figma-profile-img"
              src={I.laura}
              alt="Profile card for a family member"
            />
            <div className="spruce-figma-feature-copy">
              <h3 className="spruce-figma-feature-title">Profiles for each family member</h3>
              <p className="spruce-figma-body">
                Profiles for parents and each child enable filtered, personalized search results. The
                profiles also hold a calendar to keep upcoming events organized.
              </p>
            </div>
          </section>

          <section className="spruce-figma-split spruce-figma-split--translation">
            <div className="spruce-figma-translate-row">
              <img src={I.translate} alt="Language translation controls" className="spruce-figma-trans-img" />
              <img src={I.spanish} alt="Spanish translation screen" className="spruce-figma-trans-spanish-img" />
            </div>
            <div className="spruce-figma-feature-copy">
              <h3 className="spruce-figma-feature-title">Translation</h3>
              <p className="spruce-figma-body">
                Built-in translation makes Spruce accessible to non-English-speaking families — a critical
                consideration for Vancouver&apos;s diverse population.
              </p>
            </div>
          </section>

          <section className="spruce-figma-final" aria-labelledby="spruce-final-screens-heading">
            <h2
              id="spruce-final-screens-heading"
              className="spruce-figma-section-label spruce-figma-section-label--center spruce-figma-section-label--final"
            >
              Final screens
            </h2>
            <div className="spruce-figma-final-browser-h">
              <div className="spruce-figma-final-tabs-h" role="tablist" aria-label="Choose a screen to preview">
                {FINAL_SCREENS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    id={`tab-${s.id}`}
                    className={`spruce-figma-final-tab-h${finalScreenId === s.id ? ' spruce-figma-final-tab-h--active' : ''}`}
                    aria-selected={finalScreenId === s.id}
                    aria-controls="spruce-final-tabpanel"
                    tabIndex={finalScreenId === s.id ? 0 : -1}
                    onClick={() => setFinalScreenId(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div
                id="spruce-final-tabpanel"
                className="spruce-figma-final-viewport"
                role="tabpanel"
                aria-labelledby={`tab-${finalScreenId}`}
                tabIndex={0}
              >
                <img
                  key={activeFinal.id}
                  src={activeFinal.src}
                  alt={activeFinal.alt}
                  className="spruce-figma-final-shot"
                />
              </div>
            </div>
          </section>

          <section className="spruce-figma-journey">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center spruce-figma-section-label--reflections">
              Reflections
            </h2>
            <div className="spruce-figma-reflect-grid">
              <div>
                <h3 className="spruce-figma-reflect-title">Reframing is a design skill</h3>
                <p className="spruce-figma-body spruce-figma-reflect-body">
                  The initial prompt was vague and didn&apos;t lead us to anything obvious. The most
                  valuable thing I did at UXathon was rewriting the problem statement. A better question
                  unlocks better solutions.
                </p>
              </div>
              <div>
                <h3 className="spruce-figma-reflect-title">Mapping the journey</h3>
                <p className="spruce-figma-body spruce-figma-reflect-body">
                  We mapped the low-income family journey from awareness (&ldquo;my kid is on their phone
                  too much&rdquo;) through search, cost-checking, registration, and repeat use. Each step
                  surfaced a new friction point to design around.
                </p>
              </div>
            </div>
            <img
              src="/images/projects/spruce/orca.png"
              alt="Orca illustration"
              style={{ display: 'block', margin: '4rem auto', maxWidth: '460px', height: 'auto' }}
            />
          </section>

          <footer className="spruce-figma-footer">
            <Link to="/projects" className="spruce-figma-next">
              See next case study &nbsp;
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  marginLeft: '8px',
                  fontSize: '20px',
                  lineHeight: 1,
                  verticalAlign: 'middle',
                }}
              >
                →
              </span>
            </Link>
          </footer>
        </div>
      </div>
      <ScrollToTop color="#3e5d39" />
    </div>
  )
}
