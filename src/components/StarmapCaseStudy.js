'use client'

import './StarmapCaseStudy.css'

const I = {
  hero: '/images/projects/starmap/case-study/hero.webp',
  noTime: '/images/projects/starmap/case-study/no-time.png',
  confused: '/images/projects/starmap/case-study/confused.png',
  importAi: '/images/projects/starmap/case-study/import-ai.png',
  constellation: '/images/projects/starmap/case-study/constellation.png',
  rememberProfile: '/images/projects/starmap/case-study/remember-profile.png',
  rememberEdit: '/images/projects/starmap/case-study/remember-edit.webp',
  testing: '/images/projects/starmap/case-study/testing-feedback.webp',
  homePage: '/images/projects/starmap/case-study/home-page.webp',
  friends: '/images/projects/starmap/case-study/friends-marquee.webp',
  feedback: '/images/projects/starmap/case-study/feedback-email.png',
  mobileHome: '/images/projects/starmap/case-study/mobile-home.png',
  mobileMap: '/images/projects/starmap/case-study/mobile-map.png',
}

// Space above a block: [desktop, phone] in px, measured from the original page.
const gap = (desktop, phone = desktop) => ({ '--gap': `${desktop}px`, '--gap-sm': `${phone}px` })

function Label({ children, space }) {
  return (
    <p className="smcs-label" style={space}>
      {children}
    </p>
  )
}

function Heading({ children, space, as: Tag = 'h2' }) {
  return (
    <Tag className="smcs-heading" style={space}>
      {children}
    </Tag>
  )
}

function Body({ children, space }) {
  return (
    <p className="smcs-body" style={space}>
      {children}
    </p>
  )
}

function Img({ src, className = '', space, alt = '' }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`smcs-img ${className}`.trim()} style={space} loading="lazy" />
}

function Constellation() {
  const nodes = [
    { at: [110, 58], r: 7.2, fill: '#7c3aed', twinkle: 'a' },
    { at: [42, 30], r: 5.4, fill: '#8b5cf6', twinkle: 'b' },
    { at: [170, 24], r: 4.8, fill: '#6366f1', twinkle: 'c' },
    { at: [112, 14], r: 3.6, fill: '#a78bfa', twinkle: 'd' },
    { at: [70, 98], r: 4.8, fill: '#8b5cf6', twinkle: 'e' },
    { at: [158, 94], r: 4.2, fill: '#6366f1', twinkle: 'a' },
    { at: [24, 76], r: 3.6, fill: '#a78bfa', twinkle: 'b' },
  ]
  const lines = [
    [42, 30, 110, 58, 'main'],
    [170, 24, 110, 58, 'main'],
    [110, 58, 70, 98, 'main'],
    [110, 58, 158, 94, 'main'],
    [42, 30, 112, 14, 'sub'],
    [170, 24, 112, 14, 'sub'],
    [24, 76, 42, 30, 'faint'],
  ]
  const dash = { main: '4 3', sub: '3 4', faint: '3 5' }

  return (
    <div className="smcs-constellation-wrap">
      <svg className="smcs-constellation" viewBox="0 0 220 120" aria-hidden="true">
        <defs>
          <filter id="smcs-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map(([x1, y1, x2, y2, kind]) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={`smcs-line smcs-line--${kind}`}
            strokeDasharray={dash[kind]}
          />
        ))}

        <circle cx="200" cy="45" r="2.4" fill="#6366f1" />
        <circle cx="188" cy="108" r="1.8" fill="#8b5cf6" />
        <circle cx="10" cy="40" r="1.8" fill="#6366f1" />
        <circle cx="140" cy="108" r="2.16" fill="#8b5cf6" />

        {nodes.map(({ at, r, fill, twinkle }) => (
          <g key={at.join('-')} transform={`translate(${at[0]} ${at[1]})`}>
            <g className={`smcs-twinkle-${twinkle}`}>
              <circle r={r} fill={fill} filter="url(#smcs-node-glow)" />
              <circle r={r * 0.3} fill="rgba(255,255,255,0.3)" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function StarmapCaseStudy({ onNext }) {
  return (
    <div className="smcs">
      <article className="smcs-page">
        <Img src={I.hero} alt="starmap app — relationship graph" className="smcs-hero" space={gap(5, 6)} />

        <Heading as="h1" space={gap(29)}>
          A personal relationship map that helps you remember what matters, stay intentional, and be a better
          friend.
        </Heading>
        <Body space={gap(20, 72)}>
          starmap is a relationship management tool. Instead of treating your network as a flat contact list, it
          models your social world as a living graph: people, clusters, and connections.
        </Body>
        <Body space={gap(24)}>
          The goal is simple: remember the little things, follow through on plans, and maintain relationships
          with more consistency and intention over time.
        </Body>
        <Body space={gap(24)}>
          Curious? Go try starmap live at{' '}
          <a href="https://starmap.lol" target="_blank" rel="noopener noreferrer">
            starmap.lol
          </a>{' '}
          →
        </Body>

        <dl className="smcs-meta" style={gap(33, 58)}>
          <div>
            <dt className="smcs-label">TIMELINE</dt>
            <dd className="smcs-body">March 2026—ongoing</dd>
          </div>
          <div>
            <dt className="smcs-label">ROLE</dt>
            <dd className="smcs-body">everything!</dd>
          </div>
          <div>
            <dt className="smcs-label">RECOGNITION</dt>
            <dd className="smcs-body">40 users so far :)</dd>
          </div>
        </dl>

        <Label space={gap(0)}>MY USER JOURNEY</Label>
        <Heading space={gap(16)}>Why does it feel like I have no time?</Heading>
        <Body space={gap(18, 36)}>
          It was the busiest summer of my life between my job, travelling, courses, and time with friends and
          family. I felt really burned out and I just wanted to lie on the grass and read or paint.
        </Body>
        <Img src={I.noTime} alt="A crowd of people around one tired person" className="smcs-no-time" space={gap(20, 34)} />

        <div className="smcs-cards" style={gap(48, 15)}>
          <div className="smcs-card">
            <p className="smcs-card-number">01</p>
            <h3 className="smcs-card-title">Time Tracking</h3>
            <p className="smcs-body">
              I was tracking my time 24/7 with TogglTracker, and I was spending about 8% with friends - about 16%
              of my waking hours. I had sleep at about 32%, and family at 7%.
            </p>
          </div>
          <div className="smcs-card">
            <p className="smcs-card-number">02</p>
            <h3 className="smcs-card-title">Being picky</h3>
            <p className="smcs-body">
              It seemed like the answer was becoming choosier with who I chose to spend my time with. But how
              without data, how would I know who was real and fake?
            </p>
          </div>
          <Img src={I.confused} alt="A confused person surrounded by question marks" className="smcs-confused" />
        </div>

        <Label space={gap(40, 66)}>FIRST SOLUTION</Label>
        <Heading space={gap(16)}>A really long list (the Notion doc)</Heading>
        <Body space={gap(16)}>
          I wrote out the names of all 60+ &quot;friends&quot; I had along with journal entries on our friendship,
          how they made me feel, and things I should remember about them. I would update this whenever I saw them
          or something significant happened in our relationship.
        </Body>
        <Heading space={gap(44, 43)}>With some problems…</Heading>
        <Body space={gap(16)}>
          It was such a long document and it wasn&apos;t well organized. But on the plus side, scrolling through so
          much other information while trying to update someone&apos;s entry reminded me of other things that
          happened that I should also update.
        </Body>
        <Body space={gap(24)}>[image redacted]</Body>

        <Label space={gap(47)}>3 FOCUS AREAS</Label>
        <Heading space={gap(24)}>Making data entry fast</Heading>
        <Body space={gap(24)}>
          Updating the doc manually was helpful for staying intentional, but ultimately it was a chore and taking
          more time than I would have liked. So.. obviously I made an Import with AI feature.
        </Body>
        <Img src={I.importAi} alt="Import People with AI dialog" className="smcs-w600" space={gap(44, 38)} />

        <Heading space={gap(24, 23)}>Visualizing the social graph</Heading>
        <Body space={gap(24, 25)}>
          What brought the &quot;starmap&quot; concept together for me was making constellations. I wanted to
          visualize my high school friend group, volleyball friends, school friends, and international ones as
          clusters of stars across a night sky. Here&apos;s me and 2 Cansbridge friends lit up as I selected the
          Cansbridge constellation.
        </Body>
        <Img
          src={I.constellation}
          alt="Constellations panel with the Cansbridge constellation selected"
          className="smcs-constellation-shot smcs-rounded"
          space={gap(23, 44)}
        />

        <Heading space={gap(24, 23)}>Remembering stuff</Heading>
        <Body space={gap(25)}>
          What I actually ended up using the Notion doc more for was writing down my friends&apos; favourite books,
          shows and songs they recommended to me, their birthdays and plans we wanted to make.
        </Body>
        <div className="smcs-pair" style={gap(57, 43)}>
          <Img src={I.rememberProfile} alt="A friend's profile with tags and things to remember" className="smcs-rounded" />
          <Img src={I.rememberEdit} alt="Editing things to remember" className="smcs-rounded" />
        </div>

        <Label space={gap(69, 57)}>TESTING</Label>
        <Heading space={gap(16)}>More brains = better</Heading>
        <Body space={gap(13)}>
          I voluntold about 10 friends to help me test my MVP and give me suggestions. I also demoed at a
          Treehouse session to get comfortable explaining everything.
        </Body>
        <Img src={I.testing} alt="Feedback from friends who tested the MVP" className="smcs-w600 smcs-center" space={gap(27, 59)} />

        <Label space={gap(58, 90)}>BUILDING A BEAUTIFUL DESIGN SYSTEM</Label>
        <Heading space={gap(16)}>Home page</Heading>
        <Body space={gap(22)}>
          For the home page, I wanted some kind of motion— and the twinkling star animation worked perfectly! I
          researched lots of other landing pages, and a &quot;call to action&quot;/&quot;what we do&quot; short
          tagline worked best in the hero section. &quot;Sohne&quot; was the perfect font for my vision (found it
          on 50 fonts for 2025 (where I find all my fonts)).
        </Body>
        <Img src={I.homePage} alt="starmap home page with twinkling stars" className="smcs-home-page" space={gap(43, 50)} />
        <Body space={gap(16)}>
          I kept going back and forth between black and white backgrounds, while desperately wanting it to be
          colourful. Cursor understood my vibes and gave my a super pretty pastel gradient. I put my friends&apos;
          names into this section if you can find them. I&apos;m learning a lot about motion graphics and
          animation.
        </Body>
        <Img src={I.friends} alt="Pastel gradient section with friends' names" space={gap(39, 50)} />

        <Label space={gap(36, 67)}>VERSION 2</Label>
        <Heading space={gap(15, 16)}>Real users gave me feedback</Heading>
        <Body space={gap(33, 38)}>
          I posted my project on LinkedIn and gained 30+ new users. After a week or so I emailed all of them for
          feedback on the app and got some interesting responses. I was able to immediately implement their
          suggested improvements (you might notice if you try it out!)
        </Body>
        <Img src={I.feedback} alt="An email reply with feedback on starmap" space={gap(24, 49)} />

        <Heading space={gap(33)}>Mobile works too</Heading>
        <div className="smcs-mobile" style={gap(18, 29)}>
          <Img src={I.mobileHome} alt="starmap home page on a phone" />
          <Img src={I.mobileMap} alt="starmap map view on a phone" />
          <p className="smcs-body">I love the mobile version :)</p>
        </div>

        <Label space={gap(61, 36)}>REFLECTIONS</Label>
        <Body space={gap(10)}>It&apos;s fun to make stuff that real people use.</Body>

        <div className="smcs-outro" style={gap(10, 92)}>
          <Constellation />
        </div>
      </article>

      <p className="smcs-next">
        <button type="button" onClick={onNext}>
          See next case study →
        </button>
      </p>
    </div>
  )
}
