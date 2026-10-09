'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Inter } from 'next/font/google'
import BookViewer from './BookViewer'
import ImageModal from './ImageModal'
import { LYRE_VOL17_PAGES } from '../data/lyreVol17Pages'
import {
  BodyText,
  CaseStudy,
  CaseStudySection,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-inter',
})

const RESTORED_GALLERY = [
  {
    src: '/images/projects/lyre-poster-flux.png',
    alt: 'The Lyre Vol. 17 call for submissions poster, theme Flux',
  },
  {
    src: '/images/projects/lyre-poster-constant-motion.png',
    alt: 'The Lyre Vol. 17 call for submissions poster, Constant Motion',
  },
  {
    src: '/images/projects/lyre-vol16-cover.png',
    alt: 'Printed copy of The Lyre Vol. 16, Passage',
  },
  {
    src: '/images/projects/lyre-painting.png',
    alt: 'Cover painting for The Lyre Vol. 16',
  },
]

export default function LyreCaseStudy({ onNext }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!preview) return undefined
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      setPreview(null)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [preview])

  return (
    <CaseStudy className={inter.variable}>
      <BookViewer pages={LYRE_VOL17_PAGES} name="The Lyre Vol. 17" />

      <header className="cs-hero">
        <SectionHeading>I designed a magazine!</SectionHeading>
        <BodyText>
          Publishing since 2010, The Lyre is an annual student-led literary journal, supported by SFU&apos;s
          Department of World Languages and Literatures.
        </BodyText>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Editorial designer, Vol. 17; cover artist, vol 16' },
            { label: 'Theme', value: 'Flux' },
          ]}
        />
      </header>

      <CaseStudySection>
        <SectionHeading>Inspirations</SectionHeading>
        <SectionLabel>The drawing board</SectionLabel>
        <BodyText>
          I was inspired by a lot of Chinese and Japanese posters and New Wave album covers at first. Then I realized
          that the main layout design is not the same as making posters. I called{' '}
          <a href="https://madelinelmontoya.com/" target="_blank" rel="noopener noreferrer">
            Madeline Montoya
          </a>{' '}
          to ask for some advice - both in general and for this project, and she gave me a list of her favorite
          designers and inspirations. Truthfully, she&apos;s one of the designers that I admire the most, and I was
          able to pull some of her style into my spreads. I also copied lots of Yoona&apos;s spreads from the 16th
          issue.
        </BodyText>

        <div className="cs-subtopic">
          <SectionLabel>Through line</SectionLabel>
          <BodyText>
            The cover pulled it together— I wanted high energy and a vibrant and warm alive feeling. Like a roll of
            wet film, and the feeling that emanates. The clock is a painting I made of a statue called &quot;L&apos;heure
            de tous&quot; outside of Gare St Lazare in Paris. The cover design is inspired by the first image:
          </BodyText>
          <div className="cs-lyre-pair">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/lyre-inspiration-sanahunt.png"
                alt="Editorial poster with a portrait and large red vertical type, an influence on the Vol. 17 cover."
              />
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/lyre-inspiration-film.png"
                alt="Pale-pink collage of film strips and figure cutouts, with the words I feel differently."
              />
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/lyre-cover-white-runner-up.jpg"
                alt="White runner-up cover for The Lyre Vol. 17, a clock sculpture over a green film photograph."
              />
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/lyre-heure-de-tous.jpg"
                alt="The statue L'heure de tous, a column of clocks in a Paris square."
              />
            </figure>
          </div>
          <BodyText>
            The white cover was a runner up, but I wanted more impact and colour that I could call back to from inside
            the issue. I love the shapes of the lights in the photo and the people, but I also had to overexpose the
            image. The photo that I ended up choosing had natural framing and brightness in the middle that really
            complimented the clock.
          </BodyText>
        </div>
      </CaseStudySection>

      <CaseStudySection>
        <SectionHeading>Visual Design Decisions</SectionHeading>
        <SectionLabel>Colours</SectionLabel>
        <BodyText>
          Inspired by{' '}
          <a href="https://madelinelmontoya.com/" target="_blank" rel="noopener noreferrer">
            Madeline Montoya
          </a>&apos;s work with opposite colours, I worked in some high contrast palettes on a few of my favorite spreads.
          Page 2 is one of my favourites, as are pages 14/15. For the cover, I experimented with some colours and
          layouts, but ultimately I loved the pink&apos;s contrast with the green film. The background isn&apos;t a pure
          black, I used a deep blue/green to be less harsh, and I echoed it on pages 44/45 and in the font colour on
          the white pages.
        </BodyText>

        <div className="cs-subtopic">
          <SectionLabel>Typography</SectionLabel>
          <BodyText className="cs-lyre-type-freight">
            Freight: I used the standard in literary magazines for the body text.
          </BodyText>
          <BodyText className="cs-lyre-type-aileron">
            Aileron: I used this on the cover, as well as for some headers and credits.
          </BodyText>
          <BodyText className="cs-lyre-type-inter">
            Inter: The all-purpose special! I used this as tertiary text, and on the authors&apos; name credits.
          </BodyText>
        </div>

        <div className="cs-subtopic">
          <SectionLabel>Photos</SectionLabel>
          <BodyText>
            I realized something... most people don&apos;t have editorial photos on hand. Even my favorite photos fell
            short, capturing memories and colours but not the artistic quality and essence that belongs in a magazine.
            Luckily I have a super awesome friend who offered up his whole catalogue, and made this issue visually and
            texturally stunning. Even the Table of Contents is a Keane Moraes special.
          </BodyText>
          <BodyText>
            Yoona, my editor-in-chief, and last year&apos;s designer, also came through with intensely vibey photos of
            jellyfish, friends, buildings, statues. She was my #1 support at the end, formatting and final checking
            with me for hours.
          </BodyText>
        </div>

        <div className="cs-subtopic">
          <SectionLabel>Continuity</SectionLabel>
          <BodyText>
            I also tried to make the pages make sense as a book: you&apos;ll notice that a lot of spreads span both open
            pages continuously, and the background colour of the recto is the same as the verso of the next. I like
            pages 40/41/42/43 and 50/51 for this. It creates a visual continuity, and I hope a more pleasant reading
            experience.
          </BodyText>
        </div>
      </CaseStudySection>

      <CaseStudySection>
        <SectionHeading>Final Thoughts</SectionHeading>
        <BodyText>
          I had a lot of fun designing this whole magazine from scratch, all by myself. I implore you to pay
          attention to the quotes on the inner and outer covers. The first one sets the tone, and the second was
          actually pulled from the back of the clock painting. The painting exists as a bookmark with this quote on
          the back, following the style of the bookmarks sold at Shakespeare and Co.
        </BodyText>

        <div className="cs-lyre-gallery">
          {RESTORED_GALLERY.map((image) => (
            <figure key={image.src}>
              <button type="button" onClick={() => setPreview(image)} aria-label={`View larger: ${image.alt}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} />
              </button>
            </figure>
          ))}
        </div>
      </CaseStudySection>

      {preview && typeof document !== 'undefined'
        ? createPortal(
            <ImageModal
              open
              src={preview.src}
              alt={preview.alt}
              onClose={() => setPreview(null)}
            />,
            document.body,
          )
        : null}

      {onNext ? <NextCaseStudy label="Back to collection →" onClick={onNext} /> : null}
    </CaseStudy>
  )
}
