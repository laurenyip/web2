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
  clipSocials: '/images/projects/annaviola/microinteraction-socials.gif',
  clipStar: '/images/projects/annaviola/microinteraction-release-star.gif',
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
            { label: 'Timeline', value: 'Summer 2026' },
            { label: 'Role', value: 'Website Design & Build' },
            { label: 'Live', value: 'annaviolamusic.com', href: I.live },
          ]}
        />
      </CaseStudyHero>

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>Building an all-in-one digital universe.</SectionHeading>
        <BodyText>
          Before the site, Anna Viola used Linktree, Instagram, and TikTok. She wanted a website to legitimize
          her artistic career with a centralized digital presence. I owned the information architecture end to
          end: what lived on home versus Listen, where EP / singles / documentary sat in the hierarchy, and how
          social and streaming exited the page.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Visual design decisions</SectionLabel>
        <SectionHeading>Classy, elegant, old money, playful, animated</SectionHeading>
        <BodyText>
          We called before I started working on her site so that we could align on requirements.
        </BodyText>
        <ImageBlock
          src={I.moodboard}
          alt="Animated slides from the Silver Secrets website moodboard"
          wide
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows & decisions</SectionLabel>
        <BodyText>
          The first concept was a navbar: Listen on the left, News/Home in the middle, Follow on the right,
          ornament wordmark centered across the pages.
        </BodyText>
        <ImageBlock
          src={I.navbarEarly}
          alt="Earlier Anna Viola layout — Listen, News, Follow with centered ornament and portrait"
          wide
        />
        <BodyText>
          I revised it to the navbar that shipped. Follow was an extra click once fans already knew the social
          they wanted, so TikTok, Instagram, YouTube, and Spotify moved into the bar. “Listen” stayed the path
          to the music.
        </BodyText>
        <ImageBlock
          src={I.navbarCurrent}
          alt="Current Anna Viola navbar with Listen, ornament logo, and social icons"
          wide
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Cool features</SectionLabel>
        <BodyText>
          In the Listen page, each release has its own cover image, with a muted looping canvas that plays while
          the user hovers. It&apos;s a mini-visual into the vibe and subject of the song before listening.
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
          clutter.
        </BodyText>
        <ImageBlock
          src={I.clipSocials}
          alt="Hovering across the TikTok, Instagram, YouTube, and Spotify icons in the navbar"
          className="cs-image-block--clip"
        />
        <BodyText>
          On the main page, a star icon next to the release lights up in x-ray blue when the user hovers,
          letting them know the link is live. In the background, twinkle lights and lace stay ambient; colour
          stays minimum.
        </BodyText>
        <ImageBlock
          src={I.clipStar}
          alt="Hovering over each release row lights its star in x-ray blue"
          className="cs-image-block--clip"
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <SectionHeading>Working with the artist</SectionHeading>
        <Reflection>
          <BodyText>
            I had to work within Anna&apos;s taste, which is very different from my own — and translate it into
            decisions I fully owned: IA, navbar, type. The outcome I care about is that a fan arrives in a world,
            finds the release, and leaves to stream — without feeling fatigue or confusion. Ownership meant
            defending choices to give fans the best user experience on her site.
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
