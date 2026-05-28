'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  sleeping: '/images/projects/spruce/sleeping.png',
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
            <Image
              className="spruce-figma-hero-gif"
              src={I.gif}
              alt="Spruce product UI preview"
              width={1400}
              height={900}
              priority
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
                <div className="spruce-figma-meta-value">48 hours (UBC UXathon 2026)</div>
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

          <section className="spruce-figma-challenge" aria-labelledby="spruce-brief-heading">
            <h2
              id="spruce-brief-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
            >
              THE BRIEF
            </h2>
            <h3 className="spruce-figma-ds-question">
              How might we help families give their kids a life offline?
            </h3>
            <p
              className="spruce-figma-body spruce-figma-brief-prompt"
              style={{ marginTop: '24px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              The initial prompt: In a world that rewards being always on, how might we design an experience that
              helps people set and keep boundaries to make recovery time feel socially safe, rewarding, and easy to
              sustain?
            </p>
          </section>

          <section className="spruce-figma-ipadkids" aria-label="Research collage on screen time and play">
            <Image
              src={I.ipadkids}
              alt="Collage: character figure, weekly screen time stats, child with tablet, and phone illustration"
              width={1400}
              height={900}
              priority={false}
            />
          </section>

          <section className="spruce-figma-challenge" aria-labelledby="spruce-reframe-heading">
            <h2
              id="spruce-reframe-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
            >
              OUR REFRAME
            </h2>
            <h3 className="spruce-figma-ds-question">
              How might we help low-income families give their children opportunities to participate in
              third-spaces, to create self-sustainable habits that prevent digital fatigue and long-term phone
              addiction?
            </h3>
            <p
              className="spruce-figma-body"
              style={{ marginTop: '24px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              I brought up an article I came across about lower-income kids had higher screen-time compared to their
              more affluent peers who spend their free time in other ways. We started to research the exact pain points
              we were addressing, through interviews with mentors at the event who were also parents, and by reading
              online forums. (Reddit, Facebook, etc)
            </p>
          </section>

          <section className="spruce-figma-challenge" aria-labelledby="spruce-problems-heading">
            <h2
              id="spruce-problems-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
              style={{ marginBottom: '32px' }}
            >
              IDENTIFIED 4 PROBLEMS
            </h2>
          </section>

          <section className="spruce-figma-insight-wrap" aria-label="Research problems">
            <div className="spruce-figma-insight-grid">
              <article className="spruce-figma-insight-card">
                <div className="spruce-insight-num">01</div>
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
                <div className="spruce-insight-num">02</div>
                <h3 className="spruce-figma-insight-title">Because of cost barriers.</h3>
                <p className="spruce-figma-insight-body">
                  Registration fees, equipment costs, time from work, and transportation expenses.
                </p>
              </article>
              <article className="spruce-figma-insight-card">
                <div className="spruce-insight-num">03</div>
                <h3 className="spruce-figma-insight-title">And information gaps.</h3>
                <p className="spruce-figma-insight-body">
                  Free programs exist, but are scattered across websites, community boards, and social media groups.
                </p>
              </article>
              <article className="spruce-figma-insight-card">
                <div className="spruce-insight-num">04</div>
                <h3 className="spruce-figma-insight-title">And time and logistics.</h3>
                <p className="spruce-figma-insight-body">
                  Working parents have little capacity to research, register, and transport multiple children to their
                  activities.
                </p>
              </article>
            </div>
            <Image
              src={I.sleeping}
              alt="Child sleeping illustration"
              className="spruce-figma-sleeping"
              width={600}
              height={600}
              priority={false}
            />
          </section>

          <section className="spruce-figma-challenge" aria-labelledby="spruce-solution-heading">
            <h2
              id="spruce-solution-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
            >
              SOLUTION IDEATION
            </h2>
            <h3 className="spruce-figma-ds-question">Helpful, easy to use, inviting</h3>
            <p
              className="spruce-figma-body"
              style={{ marginTop: '24px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              We came up with a lot of features that could reduce friction and maximize accessibility for our target
              users. Based on further research, we decided to create 4 main features.
            </p>
          </section>

          <section className="spruce-figma-split spruce-figma-split--home">
            <Image
              className="spruce-figma-card-shot spruce-figma-friction-shot"
              src={I.home}
              alt="Spruce home page with Science World imagery"
              width={900}
              height={1400}
              priority={false}
            />
            <div className="spruce-figma-split-copy" style={{ maxWidth: '300px' }}>
              <h3 className="spruce-figma-feature-title">Home page</h3>
              <p className="spruce-figma-body">
                I chose to include an image of a family at Science World and not a generic stock photo to make Spruce
                feel personal to the city. That&apos;s also the reason I suggested the name &quot;Spruce&quot;— after the
                real street in Vancouver.
              </p>
            </div>
          </section>

          <section className="spruce-figma-split spruce-figma-split--reverse spruce-figma-split--activities">
            <Image
              className="spruce-figma-card-shot spruce-figma-friction-shot"
              src={I.activities}
              alt="Filters for activities screen"
              width={900}
              height={1400}
              priority={false}
            />
            <div className="spruce-figma-split-copy" style={{ maxWidth: '300px' }}>
              <h3 className="spruce-figma-feature-title">Activities</h3>
              <p className="spruce-figma-body">
                You can filter free and low-cost activities by neighbourhood, age group, and descriptive type tags.
                This addresses the information gap and streamlines the research flow, reducing the time it takes to find
                and register for activities.
              </p>
            </div>
          </section>

          <section className="spruce-figma-split spruce-figma-split--resources">
            <Image
              className="spruce-figma-card-shot spruce-figma-friction-shot"
              src={I.resources}
              alt="Jumpstart resource card listing grants and sports tags"
              width={900}
              height={1400}
              priority={false}
            />
            <div className="spruce-figma-split-copy" style={{ maxWidth: '300px' }}>
              <h3 className="spruce-figma-feature-title">Resources</h3>
              <p className="spruce-figma-body">
                I researched relevant grants, subsidies, and community resources specifically available for lower-income
                families in Canada. This was our best solution to solve the money problem with what&apos;s in our
                control.
              </p>
            </div>
          </section>

          <section className="spruce-figma-split spruce-figma-split--tight spruce-figma-split--profiles">
            <Image
              className="spruce-figma-profile-img"
              src={I.laura}
              alt="Profile card for a family member"
              width={900}
              height={1200}
              priority={false}
            />
            <div className="spruce-figma-feature-copy">
              <h3 className="spruce-figma-feature-title">Profiles</h3>
              <p className="spruce-figma-body">
                We created profiles for parents and each child, so you can easily access information about current
                activities, and browse seamlessly through the activities your profile is eligible for based on age,
                gender, and availability provided.
              </p>
            </div>
          </section>

          <section className="spruce-figma-features-h spruce-figma-features-h--spaced spruce-figma-features-h--everyone">
            <h2 className="spruce-figma-section-label">DESIGN FEATURES THAT WORK FOR EVERYONE</h2>
          </section>

          <section className="spruce-figma-split spruce-figma-split--translation">
            <div className="spruce-figma-translate-row">
              <Image
                src={I.translate}
                alt="Language translation controls"
                className="spruce-figma-trans-img"
                width={900}
                height={1400}
                priority={false}
              />
              <Image
                src={I.spanish}
                alt="Spanish translation screen"
                className="spruce-figma-trans-spanish-img"
                width={900}
                height={1400}
                priority={false}
              />
            </div>
            <div className="spruce-figma-feature-copy">
              <h3 className="spruce-figma-feature-title">Accessibility through translation</h3>
              <p className="spruce-figma-body">
                You might have noticed— we have the translate feature on every page! Complete with sound and search, we
                created this with Vancouver&apos;s diverse community in mind.
              </p>
            </div>
          </section>

          <section
            className="spruce-figma-challenge spruce-figma-mobile-debate"
            aria-labelledby="spruce-mobile-heading"
            style={{ paddingBottom: '48px' }}
          >
            <h2
              id="spruce-mobile-heading"
              className="spruce-figma-design-challenge-label spruce-figma-section-label--center"
            >
              Mobile or Desktop?
            </h2>
            <p
              className="spruce-figma-body"
              style={{ marginTop: '24px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              This was one of our biggest debates, due to time constraints. On the pro-mobile side: my teammates
              expected that lower-income parents would be less likely to own laptops or PCs. Spruce should be usable on
              the go. On the pro-desktop side: larger screens, for more serious decisions, and better focus.
            </p>
            <p
              className="spruce-figma-body"
              style={{ marginTop: '16px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            >
              One of our mentors brought up a point we hadn&apos;t considered: What if they didn&apos;t have a phone? To
              design for the lowest possible common denominator, a desktop version would make more sense, since anyone is
              able to log into a library computer.
            </p>
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
                <Image
                  key={activeFinal.id}
                  src={activeFinal.src}
                  alt={activeFinal.alt}
                  className="spruce-figma-final-shot"
                  width={900}
                  height={1400}
                  priority={false}
                />
              </div>
            </div>
          </section>

          <section className="spruce-figma-journey">
            <h2 className="spruce-figma-section-label spruce-figma-section-label--center spruce-figma-section-label--reflections">
              Reflections
            </h2>
            <div className="spruce-figma-reflect-grid spruce-figma-reflect-grid--single">
              <div>
                <h3 className="spruce-figma-reflect-title">Reframing is a design skill</h3>
                <p className="spruce-figma-body spruce-figma-reflect-body">
                  The initial prompt was vague and didn&apos;t lead us to anything obvious. The most valuable thing I
                  did at UXathon was rewriting the problem statement. A better question unlocks better solutions.
                </p>
              </div>
            </div>
            <Image
              src="/images/projects/spruce/orca.png"
              alt="Orca illustration"
              width={920}
              height={520}
              priority={false}
              style={{ display: 'block', margin: '4rem auto', width: '100%', maxWidth: '460px', height: 'auto' }}
            />
          </section>

          <footer className="spruce-figma-footer">
            <Link href="/aurora" className="spruce-figma-next">
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
