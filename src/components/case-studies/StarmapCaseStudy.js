'use client'

import './StarmapCaseStudy.css'

const BASE = '/images/projects/starmap/case-study'
const I = {
  noTime: `${BASE}/no-time.png`,
  confused: `${BASE}/confused.png`,
  importAi: `${BASE}/import-ai.png`,
  feedback: `${BASE}/feedback-email.png`,
  mobileHome: `${BASE}/mobile-home.png`,
  mobileMap: `${BASE}/mobile-map.png`,
  graphLight: `${BASE}/graph-light.webp`,
  emptyState: `${BASE}/empty-state.webp`,
  annNodes: `${BASE}/annotated-node-hierarchy.webp`,
  annActions: `${BASE}/annotated-action-bar.webp`,
  annPanel: `${BASE}/annotated-constellation-panel.webp`,
  annSelected: `${BASE}/annotated-constellation-selected.webp`,
  annDrawer: `${BASE}/annotated-profile-drawer.webp`,
  locations: `${BASE}/locations-list.webp`,
  sharedGraphs: `${BASE}/shared-graphs-button.webp`,
  minimap: `${BASE}/minimap-zoom.webp`,
  highlighted: `${BASE}/highlighted-node.webp`,
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

function Img({ src, className = '', space, alt = '', w }) {
  const style = w ? { ...space, '--w': `${w}px` } : space
  const cls = `smcs-img ${w ? 'smcs-fixed' : ''} ${className}`.replace(/\s+/g, ' ').trim()
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={cls} style={style} loading="lazy" />
}

// Looping clip with a poster still: <video autoPlay loop muted playsInline>
function Clip({ name, ratio, className = '', space, alt = '', w }) {
  const style = { ...space, ...(w ? { '--w': `${w}px` } : {}), ...(ratio ? { aspectRatio: ratio } : {}) }
  const cls = `smcs-img ${w ? 'smcs-fixed' : ''} ${className}`.replace(/\s+/g, ' ').trim()
  return (
    <video
      className={cls}
      style={style}
      src={`${BASE}/${name}.mp4`}
      poster={`${BASE}/${name}-poster.webp`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  )
}

function Sub({ children, space }) {
  return (
    <h3 className="smcs-sub" style={space}>
      {children}
    </h3>
  )
}

function Caption({ children, space }) {
  return (
    <p className="smcs-caption" style={space}>
      {children}
    </p>
  )
}

function Todo({ children, space }) {
  return (
    <p className="smcs-todo" style={space}>
      [TODO: Lauren — {children}]
    </p>
  )
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
        <Clip name="hero-app-functions" ratio="1440 / 900" alt="Starmap in use: switching between graph and list, opening a profile, flipping to dark mode and selecting a constellation" className="smcs-hero" space={gap(5, 6)} />

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

        <Img
          src={I.graphLight}
          alt="A full starmap graph: the user in the centre with friends around them, grouped into constellations"
          className="smcs-rounded smcs-bordered"
          space={gap(40, 36)}
        />
        <Caption space={gap(10)}>A full graph. Demo account, made-up names.</Caption>

        <Label space={gap(60, 66)}>MY USER JOURNEY</Label>
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
          more time than I would have liked. That&apos;s why I built an Import with AI feature: paste in a pile of
          notes about people and it turns them into profiles for you to review.
        </Body>
        <Clip
          name="import-with-ai"
          ratio="1440 / 1080"
          alt="Pasting notes into Import with AI, waiting for it to extract people, reviewing the cards, then adding them to the graph"
          className="smcs-rounded smcs-bordered"
          space={gap(44, 38)}
        />
        <Body space={gap(20)}>
          I went with AI over a CSV import or a faster manual form because not everyone has a CSV, but everyone has
          something they can paste into AI. A faster manual form would still not save that much time.
        </Body>
        <Body space={gap(12)}>
          I show review cards before anything gets added because I don&apos;t want to miss things.
        </Body>

        <Heading space={gap(48, 40)}>Visualizing the social graph</Heading>
        <Body space={gap(24, 25)}>
          What brought the &quot;starmap&quot; concept together for me was making constellations. I wanted to
          visualize my high school friend group, volleyball friends, school friends, and international ones as
          clusters of stars across a night sky. Select a constellation and just that group lights up.
        </Body>
        <Clip
          name="select-constellation"
          ratio="1440 / 900"
          alt="Selecting a constellation lights up its group of people, then another"
          className="smcs-rounded smcs-bordered"
          space={gap(23, 30)}
        />
        <Body space={gap(20)}>
          Constellation colours are chosen by the user, so each person picks what represents their groups.
        </Body>
        <Body space={gap(12)}>
          I went with constellations over tags or folders for the vibes, branding and style. Folders don&apos;t display
          or visualize anything.
        </Body>

        <Heading space={gap(48, 40)}>Remembering stuff</Heading>
        <Body space={gap(25)}>
          What I actually ended up using the Notion doc more for was writing down my friends&apos; favourite books,
          shows and songs they recommended to me, their birthdays and plans we wanted to make.
        </Body>
        <Clip
          name="profile-drawer"
          ratio="1440 / 900"
          alt="Opening a person's profile, picking a relationship, adding a custom tag and expanding the edit history"
          className="smcs-rounded smcs-bordered"
          space={gap(32, 30)}
        />

        <Label space={gap(60, 57)}>FIRST RUN</Label>
        <Heading space={gap(16)}>The empty state</Heading>
        <Body space={gap(16)}>This is what a brand new user sees: just you, ready to add your first person.</Body>
        <Img
          src={I.emptyState}
          alt="An empty starmap graph with only the You node"
          className="smcs-rounded smcs-bordered"
          space={gap(28, 30)}
        />

        <Label space={gap(69, 57)}>TESTING</Label>
        <Heading space={gap(16)}>More brains = better</Heading>
        <Body space={gap(13)}>
          I voluntold about 10 friends to help me test my MVP and give me suggestions. I also demoed at a
          Treehouse session to get comfortable explaining everything.
        </Body>
        <Clip name="testing-feedback" ratio="1024 / 576" alt="Feedback from friends who tested the MVP" className="smcs-w600 smcs-center" space={gap(27, 59)} />

        <Label space={gap(58, 90)}>BUILDING A BEAUTIFUL DESIGN SYSTEM</Label>
        <Heading space={gap(16)}>Nodes</Heading>
        <Body space={gap(16)}>
          &quot;You&quot; is larger with a dark ring. You can add profile pictures for your friends, and save any other
          significant photos in their node. Letters keep it simple. I think generated or AI avatars feel tacky.
        </Body>
        <Img src={I.annNodes} alt="Node types: You with a dark ring, a photo avatar, and a letter circle" w={618} space={gap(24, 24)} />
        <Caption space={gap(8)}>You (larger, dark ring) · Photo avatar · Letter circle</Caption>

        <Heading space={gap(48, 40)}>Button hierarchy</Heading>
        <Body space={gap(16)}>
          &quot;+ Add person&quot; is primary because adding someone is the most common action. Import with AI is
          secondary: you only need it when you have a lot of data at once.
        </Body>
        <Img src={I.annActions} alt="The action bar: a filled + Add person button and outlined secondary buttons" w={576} space={gap(24, 24)} />
        <Caption space={gap(8)}>Primary: + Add person · Secondary: the outlined buttons</Caption>

        <Heading space={gap(48, 40)}>Type</Heading>
        <Body space={gap(16)}>
          &quot;Sohne&quot; was the perfect font for my vision: futuristic, grotesque, clean. It fit the vibe (found
          it on 50 fonts for 2025, where I find all my fonts).
        </Body>

        <Heading space={gap(48, 40)}>Dark and light</Heading>
        <Body space={gap(16)}>
          I kept going back and forth between black and white backgrounds, so I made both.
        </Body>
        <Clip
          name="dark-light-toggle"
          ratio="1440 / 900"
          alt="Toggling between dark and light mode"
          className="smcs-rounded smcs-bordered"
          space={gap(24, 24)}
        />

        <Heading space={gap(48, 40)}>Home page</Heading>
        <Body space={gap(22)}>
          For the home page, I wanted some kind of motion— and the twinkling star animation worked perfectly! I
          researched lots of other landing pages, and a &quot;call to action&quot;/&quot;what we do&quot; short
          tagline worked best in the hero section.
        </Body>
        <Clip name="landing-hero-twinkle" ratio="2160 / 936" alt="starmap home page with twinkling stars" className="smcs-rounded" space={gap(43, 50)} />
        <Body space={gap(16)}>
          I loved the shifting colourful background. I put my friends&apos; names into this section if you can find
          them. I&apos;m learning a lot about motion graphics and animation.
        </Body>
        <Clip name="landing-adopted" ratio="2160 / 392" alt="Pastel gradient section with friends' names scrolling past" space={gap(39, 50)} />

        <Label space={gap(60, 57)}>FEATURES</Label>
        <Heading space={gap(16)}>The small stuff</Heading>

        <Sub space={gap(32, 28)}>Graph ⇄ List</Sub>
        <Body space={gap(10)}>The same people, as a graph or as a list. One toggle to switch.</Body>
        <Clip name="graph-list-toggle" ratio="1440 / 900" alt="Switching between graph and list view" className="smcs-rounded smcs-bordered" space={gap(16)} />

        <Sub space={gap(44, 40)}>Constellation panel</Sub>
        <Body space={gap(10)}>
          Show or hide a group with the eye, edit it with the pencil, or collapse the whole panel with the ‹ tab.
        </Body>
        <Clip name="constellation-panel" ratio="1440 / 900" alt="Hiding and showing a group, then collapsing the panel" className="smcs-rounded smcs-bordered" space={gap(16)} />
        <div className="smcs-duo" style={gap(24)}>
          <figure className="smcs-fig">
            <Img src={I.annPanel} alt="Constellation panel with the eye and pencil icons labelled" w={374} />
            <Caption>eye icon = show / hide · pencil = edit</Caption>
          </figure>
          <figure className="smcs-fig">
            <Img src={I.annSelected} alt="A selected group is outlined by a rounded box" w={356} />
            <Caption>rounded box = selected group</Caption>
          </figure>
        </div>

        <Sub space={gap(44, 40)}>Locations and Shared Graphs</Sub>
        <Body space={gap(10)}>Locations come with counts so you can see where your people are. Shared Graphs sits up top.</Body>
        <div className="smcs-duo" style={gap(16)}>
          <figure className="smcs-fig">
            <Img src={I.locations} alt="Locations list with count badges" w={216} />
            <Caption>Locations, with counts</Caption>
          </figure>
          <figure className="smcs-fig">
            <Img src={I.sharedGraphs} alt="The Shared Graphs button" w={140} />
            <Caption>Shared Graphs</Caption>
          </figure>
        </div>

        <Sub space={gap(44, 40)}>Profile drawer</Sub>
        <Body space={gap(10)}>
          Relationship chips, custom tags, and &quot;Things to remember&quot; with an edit history.
        </Body>
        <Img src={I.annDrawer} alt="Profile drawer with the relationship chip, custom tag field and edit history toggle labelled" w={468} space={gap(16)} />
        <Caption space={gap(8)}>Filled relationship chip · Add custom tag · Edit-history toggle</Caption>

        <Sub space={gap(44, 40)}>Minimap and zoom</Sub>
        <Body space={gap(10)}>Zoom controls and a minimap, for when the graph gets big.</Body>
        <Img src={I.minimap} alt="The zoom controls and minimap" w={295} space={gap(16)} />

        <Label space={gap(36, 67)}>VERSION 2</Label>
        <Heading space={gap(15, 16)}>Real users gave me feedback</Heading>
        <Body space={gap(33, 38)}>
          I posted my project on LinkedIn and gained 30+ new users. After a week or so I emailed all of them for
          feedback on the app and got some interesting responses. One reply had four things in it:
        </Body>
        <Img src={I.feedback} alt="An email reply with feedback on starmap" space={gap(24, 49)} />
        <ol className="smcs-list smcs-body" style={gap(24)}>
          <li>A way to get to the home page from the dashboard.</li>
          <li>Location on the profile as a dropdown of existing locations, instead of typing it every time.</li>
          <li>The person whose profile you&apos;re viewing highlighted on the map, not just their connection to you.</li>
          <li>A bug: a new connection&apos;s relationship didn&apos;t save, even after clicking save changes.</li>
        </ol>
        <Body space={gap(16)}>
          I shipped all of her requested changes, because they all aligned with my vision for the app and what&apos;s best
          for users.
        </Body>
        <Img src={I.highlighted} alt="The person whose profile is open glows with a cyan ring on the map" w={310} space={gap(24, 24)} />
        <Caption space={gap(8)}>Now: the node you&apos;re viewing glows on the map while its drawer is open.</Caption>

        <Heading space={gap(33)}>Mobile works too</Heading>
        <div className="smcs-mobile" style={gap(18, 29)}>
          <Img src={I.mobileHome} alt="starmap home page on a phone" />
          <Img src={I.mobileMap} alt="starmap map view on a phone" />
          <p className="smcs-body">I love the mobile version :)</p>
        </div>

        <Label space={gap(61, 36)}>REFLECTIONS</Label>
        <Body space={gap(10)}>It&apos;s fun to make stuff that real people use.</Body>
        <Body space={gap(16)}>
          Next time I&apos;d build integrations with tools I already use, like Notion, so starmap fits into my
          existing workflows instead of being one more place to update.
        </Body>

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
