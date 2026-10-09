'use client'

import { Body, Heading, Img, Label, Meta, NextLink, gap } from './caseStudy/FramerStudy'
import './SpruceCaseStudy.css'

const I = {
  hero: '/images/projects/spruce/case-study/hero.gif',
  brief: '/images/projects/spruce/case-study/brief.png',
  features: '/images/projects/spruce/case-study/features.png',
  homePage: '/images/projects/spruce/case-study/home-page.png',
  sketchFinal: '/images/projects/spruce/case-study/sketch-final.webp',
  visualSystem: '/images/projects/spruce/case-study/visual-system.webp',
  filters: '/images/projects/spruce/case-study/activities-filters.webp',
  editFilters: '/images/projects/spruce/case-study/edit-filters.webp',
  resourceCard: '/images/projects/spruce/case-study/resource-card.webp',
  profileLaura: '/images/projects/spruce/case-study/profile-laura.webp',
  profileHugo: '/images/projects/spruce/case-study/profile-hugo.webp',
  translateFloating: '/images/projects/spruce/case-study/translate-floating.webp',
  translateClip: '/images/projects/spruce/case-study/translate.mp4',
  team: '/images/projects/spruce/case-study/team.webp',
  mobile: '/images/projects/spruce/case-study/mobile.png',
  outro: '/images/projects/spruce/case-study/outro.png',
}

const PROBLEMS = [
  {
    number: '01',
    title: 'Lower-Income Predicts Increased Smartphone Use and...',
    text: 'As the coronavirus disease 2019 (COVID-19) has continued for a...',
    source: 'pmc.ncbi.nlm.nih.gov',
  },
  {
    number: '02',
    title: 'Because of cost barriers.',
    text: 'Registration fees, equipment costs, time from work, and transportation expenses.',
  },
  {
    number: '03',
    title: 'And information gaps.',
    text: 'Free programs exist, but are scattered across websites, community boards, and social media groups.',
  },
  {
    number: '04',
    title: 'And time and logistics.',
    text: 'Working parents have little capacity to research, register, and transport multiple children to their activities.',
  },
]

// Final screens scroll inside a fixed-height window, like the original.
function ScreenWindow({ src, alt, space, className = '' }) {
  return (
    <div className={`spcs-window ${className}`.trim()} style={space}>
      <Img src={src} alt={alt} />
    </div>
  )
}

// On phones, wide screenshots keep a readable size and pan sideways inside their own box.
function Pan({ src, alt, className = '', space }) {
  return (
    <div className={`spcs-pan ${className}`.trim()} style={space}>
      <Img src={src} alt={alt} />
    </div>
  )
}

export default function SpruceCaseStudy({ onNext }) {
  return (
    <div className="fs spcs">
      <article className="fs-page">
        <div className="fs-bleed spcs-topbar" aria-hidden="true" />
        <Img src={I.hero} alt="The Spruce home, activities and resources pages on a laptop" className="fs-bleed spcs-hero" eager space={{ margin: 0 }} />

        <Heading as="h1" space={gap(24, 24, 216)}>
          A platform to discover free and low-cost activities— so kids can learn, play, and socialize offline.
        </Heading>
        <Body space={gap(14, 63, 84)}>
          Spruce is a free platform that helps low-income families in Vancouver discover art gallery workshops,
          swim lessons, concerts, coding camps in one simple search.
        </Body>

        <Meta
          space={gap(13, 60)}
          items={[
            { label: 'TIMELINE', value: '48 hours (UBC UXathon 2026)' },
            { label: 'ROLE', value: 'Product Designer' },
            { label: 'RECOGNITION', value: '🏆 Best UI Design' },
          ]}
        />

        <Label space={gap(0, 36)}>THE BRIEF</Label>
        <Heading space={gap(15, 16, 130)}>How might we help families give their kids a life offline?</Heading>
        <Body space={gap(18, 17, 105)}>
          The initial prompt: In a world that rewards being always on, how might we design an experience that
          helps people set and keep boundaries to make recovery time feel socially safe, rewarding, and easy to
          sustain?
        </Body>
        <Img src={I.brief} alt="Kids absorbed in screens and screen time stats" className="spcs-brief" space={gap(17, 42)} />

        <Label space={gap(64, 80)}>OUR REFRAME</Label>
        <Heading space={gap(23, 36, 432)}>
          How might we help low-income families give their children opportunities to participate in third-spaces,
          to create self-sustainable habits that prevent digital fatigue and long-term phone addiction?
        </Heading>
        <Body space={gap(24, 36, 189)}>
          I brought up an article I came across about lower-income kids had higher screen-time compared to their
          more affluent peers who spend their free time in other ways. We started to research the exact pain
          points we were addressing, through interviews with mentors at the event who were also parents, our own
          parents, and by reading online forums. (Reddit, Facebook, etc)
        </Body>

        <Label space={gap(31, 74)}>IDENTIFIED 4 PROBLEMS</Label>
        <div className="spcs-problems" style={gap(16, 40)}>
          {PROBLEMS.map((problem) => (
            <div key={problem.number} className="spcs-problem">
              <p className="spcs-problem-number">{problem.number}</p>
              <h3 className="spcs-problem-title">{problem.title}</h3>
              <p className="fs-body">{problem.text}</p>
              {problem.source ? <p className="spcs-problem-source">{problem.source}</p> : null}
            </div>
          ))}
        </div>

        <Label space={gap(55, 37)}>PROCESS</Label>
        <Heading space={gap(15, 16, 86)}>Helpful, easy to use, inviting</Heading>
        <Body space={gap(13, 17, 84)}>
          We came up with a lot of features that could reduce friction and maximize accessibility for our target
          users. Based on further research, we decided to create 4 main features.
        </Body>
        <div className="spcs-features" style={gap(16, 42)}>
          <Img src={I.features} alt="Spruce's four main features" />
        </div>
        <Body space={gap(32)}>
          I sketched the sitemap and each page on paper first, then took the strongest layouts into Figma.
        </Body>
        <Pan src={I.sketchFinal} alt="Paper sketches and sitemap next to the final Activities page" space={gap(20)} />
        <Heading space={gap(43)}>What we cut</Heading>
        <Body space={gap(16)}>
          Our sketches had more: stamps and a stampbook for events you&apos;ve attended, an AI translator pop-up on
          the home page, and a &quot;pages you viewed recently&quot; list. We dropped all three. None of them helped
          with a family&apos;s core need, finding something their kids can do this week, and in 48 hours we
          didn&apos;t have time to build them well.
        </Body>

        <Label space={gap(60)}>VISUAL SYSTEM</Label>
        <Heading space={gap(15, 16)}>Local, outdoorsy, and friendly</Heading>
        <Body space={gap(16)}>
          I designed Spruce&apos;s logo, palette, and typography.
        </Body>
        <Img src={I.visualSystem} alt="Spruce logo, colour palette with hex codes, and display type" className="fs-rounded" space={gap(20)} />
        <Body space={gap(24)}>
          <strong>Palette.</strong> Cream and forest green, inspired by BC and Vancouver&apos;s parks and nature, so
          Spruce feels local and outdoorsy, the opposite of a screen.
        </Body>
        <Body space={gap(16)}>
          <strong>Type.</strong> A rounded display sans: warm, friendly and casual, but not sloppy. It reads as
          professional and active, which matters when parents are trusting it with their kids&apos; time.
        </Body>
        <Body space={gap(16)}>
          <strong>Logo.</strong> The tree mark represents growth, the thing every one of these activities is for.
        </Body>
        <Body space={gap(16)}>
          <strong>Navy.</strong> Profile headers use navy as a grounding contrast to all the greens, keeping each
          family member&apos;s card easy to pick out while staying in a Vancouver palette.
        </Body>

        <Heading space={gap(60, 43)}>Home page</Heading>
        <Body space={gap(16, 16, 105)}>
          I chose to include an image of a family at Science World and not a generic stock photo to make Spruce
          feel personal to the city. That&apos;s also the reason I suggested the name &quot;Spruce&quot;— after the
          real street in Vancouver.
        </Body>
        <ScreenWindow src={I.homePage} alt="Spruce home page" className="spcs-window--home" space={gap(20, 71)} />

        <Heading space={gap(43)}>Activities</Heading>
        <Body space={gap(16, 16, 126)}>
          You can filter free and low-cost activities by neighbourhood, age group, and descriptive type tags. This
          addresses the information gap and streamlines the research flow, reducing the time it takes to find and
          register for activities.
        </Body>
        <Pan src={I.filters} alt="Filter bar, search, the hide-past-events toggle, and tag pills on activity cards" className="fs-rounded" space={gap(20)} />
        <Body space={gap(24)}>
          Tags have two weights on purpose. Light-green pills label each card, so they stay quiet and scannable.
          The dark-green &quot;Edit Filters&quot; button is a call to action, so it gets the heavier weight.
        </Body>
        <Img src={I.editFilters} alt="Light-green filter pills next to a dark-green Edit Filters button" className="spcs-edit-filters" space={gap(16)} />
        <Body space={gap(24)}>
          The &quot;Hide events that have already begun&quot; toggle is on by default, which keeps the list relevant:
          parents only see things their kids can still join.
        </Body>

        <Heading space={gap(43)}>Resources</Heading>
        <Body space={gap(16, 16, 105)}>
          I researched relevant grants, subsidies, and community resources specifically available for
          lower-income families in Canada. This was our best solution to solve the money problem with what&apos;s
          in our control.
        </Body>
        <Img src={I.resourceCard} alt="Resource card for Canadian Tire Jumpstart" className="spcs-resource-card" space={gap(20)} />

        <Heading space={gap(43)}>Profiles</Heading>
        <Body space={gap(16, 16, 126)}>
          We created profiles for parents and each child, so you can easily access information about current
          activities, and browse seamlessly through the activities your profile is eligible for based on age,
          gender, and availability provided.
        </Body>
        <div className="spcs-profiles" style={gap(20)}>
          <Img src={I.profileLaura} alt="Laura's profile: age 7, enrolled in Intro to Ballet I, with her own filters" />
          <Img src={I.profileHugo} alt="Hugo's profile: age 11, enrolled in Painting 101, with his own filters" />
        </div>

        <Label space={gap(60, 39)}>DESIGN FEATURES THAT WORK FOR EVERYONE</Label>
        <Heading space={gap(10)}>Accessibility through translation</Heading>
        <Body space={gap(16)}>
          The translate button is on every page, so a parent never has to hunt for it or start over in another
          language. It floats in the bottom-right corner instead of living in the nav, so it&apos;s always in reach
          without competing with the main navigation. Translations include audio, for parents who are more
          comfortable listening than reading.
        </Body>
        <div className="spcs-translate" style={gap(20)}>
          <Img src={I.translateFloating} alt="The translate button floating over activity cards" className="fs-rounded" />
          <video className="fs-img fs-rounded" src={I.translateClip} autoPlay loop muted playsInline />
        </div>

        <Heading space={gap(60, 71)}>Mobile or Desktop?</Heading>
        <div className="spcs-mobile" style={gap(17)}>
          <Img src={I.mobile} alt="Spruce home page on a phone" />
          <div className="spcs-mobile-copy">
            <p className="fs-body">
              This was one of our biggest debates, due to time constraints.
              <br />
              <br />
              One the pro-mobile side: my teammates expected that lower-income parents would be less likely to own
              laptops or PCs. Spruce should be usable on the go.
              <br />
              <br />
              On the pro-desktop side: larger screens, for more serious decisions, and better focus.
            </p>
            <p className="fs-body">
              One of our mentors brought up a point we hadn&apos;t considered: What if they didn&apos;t have a phone?
              To design for the lowest possible common denominator, a desktop version would make more sense, since
              anyone is able to log into a library computer.
            </p>
          </div>
        </div>

        <Label space={gap(0, 36)}>TEAM</Label>
        <Body space={gap(9, 10)}>
          Four of us designed Spruce in 48 hours at UBC UXathon 2026, and we took home Best UI Design.
        </Body>
        <Img src={I.team} alt="The Spruce team holding their Best UI Design certificates" className="fs-rounded spcs-team" space={gap(20)} />

        <Label space={gap(60)}>REFLECTIONS</Label>
        <Heading space={gap(9, 10)}>Reframing is a design skill</Heading>
        <Body space={gap(24, 24, 105)}>
          The initial prompt was vague and didn&apos;t lead us to anything obvious. The most valuable thing I did at
          UXathon was rewriting the problem statement. A better question unlocks better solutions.
        </Body>
        <Img src={I.outro} alt="Illustrated tiles: a dandelion, a salmon, orcas, and a spruce tree" className="spcs-outro" space={gap(59, 79)} />

        <NextLink onNext={onNext} className="fs-bleed spcs-next" space={gap(124, 89)} />
      </article>
    </div>
  )
}
