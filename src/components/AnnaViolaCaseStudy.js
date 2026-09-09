'use client'

import {
  BodyText,
  CaseStudy,
  CaseStudyHero,
  CaseStudySection,
  CoverHoverDemo,
  ImageBlock,
  NextCaseStudy,
  ProjectMeta,
  Reflection,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

const I = {
  banner: '/images/projects/annaviola/banner-home.png',
  cover: '/images/projects/annaviola/silver-secrets-cover.png',
  parallel: '/images/projects/annaviola/parallel-lines.png',
  rtwp: '/images/projects/annaviola/right-time-wrong-person.png',
  moodboard: '/images/projects/annaviola/moodboard.gif',
  navbarCurrent: '/images/projects/annaviola/navbar-current.png',
  navbarEarly: '/images/projects/annaviola/navbar-early.png',
  canvasParallel: '/images/projects/annaviola/videos/parallel-lines.mov',
  canvasRtwp: '/images/projects/annaviola/videos/right-time-wrong-person.mov',
  canvasSilver: '/images/projects/annaviola/videos/silver-secrets.mov',
  live: 'https://annaviolamusic.com/',
}

export default function AnnaViolaCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <ImageBlock
        src={I.banner}
        alt="Anna Viola site banner — Listen, ornament wordmark, socials, hero portrait, Releases"
        wide
        priority
      />

      <CaseStudyHero
        title="Designed a brand stage for an emerging pop artist."
        support="As one of my first freelance projects, I designed and built Anna Viola’s official site over summer 2026."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: 'June–Aug 2026' },
            { label: 'Role', value: 'Website Design & Build' },
            { label: 'Live', value: 'annaviolamusic.com', href: I.live },
          ]}
        />
      </CaseStudyHero>

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>Building an all-in-one digital universe.</SectionHeading>
        <BodyText>
          Before the site, Anna Viola used Linktree, her Instagram, and TikTok. She wanted to legitimize her
          artistic career with a stronger digital presence. I owned the information architecture end to end:
          what lived on home versus Listen, where EP / singles / documentary sat in the hierarchy, how social
          and streaming exited the page, and which brand signals (filigree, glitter, lace dust) were ambient
          versus interactive. Every placement decision was mine to defend, not from a template.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Moodboarding</SectionLabel>
        <SectionHeading>A playful take on Old Hollywood</SectionHeading>
        <BodyText>
          We boiled the aesthetic down to 5 words: classy, elegant, old money, playful, and animated.
        </BodyText>
        <BodyText>
          Anna wanted lace details in the brand, so I incorporated a subtle lace texture into the black background, and I found and
          cleaned a filigree pattern for the logo mark and side scrolls.
        </BodyText>
        <ImageBlock
          src={I.moodboard}
          alt="Animated slides from the Silver Secrets website moodboard"
          wide
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>EARLY IDEAS AND RESEARCH</SectionLabel>
        <SectionHeading>Understanding the domain by looking at similar artists.</SectionHeading>
        <BodyText>
          I looked at how similar and trending artists stage presence on the web — especially Addison Rae,
          Ariana Grande, and Madison Beer — for navbar density, social placement, the kind of images they used. A key difference between their sites and the one I was building was that they were all selling albums and merch, and Anna is not.
        </BodyText>
        <BodyText>
          The first navbar put Listen on the left, News/Home in the middle, and Follow on the right, with the ornament wordmark centered and present across all three pages.
        </BodyText>
        <ImageBlock
          src={I.navbarEarly}
          alt="Earlier Anna Viola layout — Listen, News, Follow with centered ornament and portrait"
          wide
        />
      </CaseStudySection>


      <CaseStudySection>
        <SectionLabel>Key flows & decisions</SectionLabel>
        <SectionHeading>Socials into the bar.</SectionHeading>
        <BodyText>
          An earlier navbar put Listen on the left and Follow on the right, with the ornament wordmark centered.
          It was clear, but Follow was an extra click when fans already knew the socials they wanted. Inspired
          by how other artist sites had their social bars prominently shown on the main page, I moved TikTok,
          Instagram, YouTube, and Spotify into the right side of the navbar — Listen stays the primary product path;
          follow actions sit one tap away.
        </BodyText>
        <ImageBlock
          src={I.navbarCurrent}
          alt="Current Anna Viola navbar with Listen, ornament logo, and social icons"
          wide
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>COOL FEATURES</SectionLabel>
        <SectionHeading>Hover canvases</SectionHeading>
        <BodyText>
          In the Listen page, each release has it's own cover image, with a muted looping canvas that plays while the user hovers. It's a mini-visual into the vibe and subject of the song before listening..
        </BodyText>
        <CoverHoverDemo
          covers={[
            {
              title: 'Parallel Lines',
              image: I.parallel,
              canvas: I.canvasParallel,
              href: 'https://push.fm/fl/annaviolaparallellines',
              isNew: true,
            },
            {
              title: 'Right Time, Wrong Person',
              image: I.rtwp,
              canvas: I.canvasRtwp,
            },
            {
              title: 'Silver Secrets',
              image: I.cover,
              canvas: I.canvasSilver,
              href: 'https://push.fm/fl/tmkzovyo',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Microinteractions</SectionLabel>
        <BodyText>
          The social icons in the navbar expand slightly on hover so follow actions feel alive without adding
          clutter. On the main page, a star icon next to the release lights up in x-ray blue when the user hovers, letting them know the link is live. In the background, twinkle lights and lace stay ambient; colour stays minimum.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            I had to work within Anna&apos;s taste, which is very different than my own — and translate it into
            decisions I fully owned: IA, navbar, type. Ownership meant defending quiet choices (less colour, no
            autoplay) when louder options were easier.
          </BodyText>
          <BodyText>
            The outcome I care about is that a fan arrives in a world, finds the release, and leaves to stream —
            without feeling fatigue or confusion. I want them to feel like they've entered the world of Anna Viola's music.
          </BodyText>
        </Reflection>
      </CaseStudySection>

      {onNext ? (
        <NextCaseStudy label="See next case study →" onClick={onNext} />
      ) : (
        <NextCaseStudy href="https://laurenyip.framer.website/spruce" label="See next case study →" />
      )}
    </CaseStudy>
  )
}
