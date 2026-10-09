'use client'

import {
  BodyText,
  BulletList,
  CaseStudy,
  CaseStudyHero,
  CaseStudySection,
  ImageBlock,
  NextCaseStudy,
  ProjectMeta,
  Reflection,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'
import './KodeticCaseStudy.css'

const P = '/images/projects/kodetic'

const I = {
  hero: `${P}/hero.webp`,
  live: 'https://laurenyip.github.io/kodetic/',
  docLanding: `${P}/revision-doc-landing.webp`,
  liveLanding: `${P}/live-landing.webp`,
  landing1: `${P}/landing-page-photos-1.webp`,
  landing10: `${P}/landing-page-photos-10.webp`,
  mec1: `${P}/client-work-photos-mec-1.webp`,
  mec2: `${P}/client-work-photos-mec-2.webp`,
  blackCanvas: `${P}/black-canvas.png`,
  whiteCanvas: `${P}/white-canvas.png`,
  blackVideo: `${P}/kodetic-black-canvas.mp4`,
  blackPoster: `${P}/kodetic-black-canvas-poster.webp`,
  whiteVideo: `${P}/kodetic-white-canvas.mp4`,
  whitePoster: `${P}/kodetic-white-canvas-poster.webp`,
  expand: `${P}/kodetic-expand-in-place.mp4`,
  expandPoster: `${P}/kodetic-expand-in-place-poster.webp`,
  expandGif: `${P}/kodetic-expand-in-place.gif`,
}

/** Same markup as the shared ImageGrid, plus a Kodetic layout modifier. */
function Grid({ images, className }) {
  const count = Math.min(images.length, 3)
  return (
    <div className={`cs-image-grid cs-image-grid--${count} ${className}`}>
      {images.map((image) => (
        <figure key={image.src} className="cs-image-grid-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} loading="lazy" />
          {image.caption ? <figcaption className="cs-body">{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}

/** Ezra's revision-doc page on the left, the shipped page on the right. */
function Compare({ doc, live }) {
  return (
    <Grid
      className="kcs-compare"
      images={[
        { ...doc, caption: `Ezra's doc: ${doc.caption}` },
        { ...live, caption: `Live: ${live.caption}` },
      ]}
    />
  )
}

function Clip({ src, poster, fallback, alt, caption }) {
  return (
    <figure className="cs-image-block">
      <video className="cs-video" autoPlay loop muted playsInline poster={poster} aria-label={alt}>
        <source src={src} type="video/mp4" />
        {fallback ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fallback} alt={alt} />
        ) : null}
      </video>
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

export default function KodeticCaseStudy({ onNext }) {
  return (
    <CaseStudy className="cs--kodetic">
      <CaseStudyHero
        title="Turning a photographer's media kit into a site that holds its sequence."
        support="I designed and built Kodetic for Ezra Gillera, a Vancouver-based multidisciplinary artist working across photography, film, design, and digital media. We met on the set of a VIYFF film! The goal: let his boards live on the web without losing their sequence."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Website Design & Build' },
            { label: 'Live', value: 'laurenyip.github.io/kodetic', href: I.live },
          ]}
        />
      </CaseStudyHero>

      <ImageBlock src={I.hero} alt="Kodetic landing: the Maison Margiela editorial spread" wide priority />

      <CaseStudySection>
        <SectionLabel>The brief</SectionLabel>
        <SectionHeading>The brief was a revision doc</SectionHeading>
        <BodyText>
          Ezra sent me a Google Doc instead of a brief. Nine pages of photo boards, each laid out in the exact order
          he wanted: Landing, Mixed Media in three parts, Client Work (MEC and Get Thrifty Fashion Show 2026),
          Cosplay, Creative in two parts, and Miscellaneous. The last page was a list of other website changes: centre
          the photos, drop the top photo carousel for a bigger header, make the logo link home, a new category order,
          purple instead of red, a Fontshare font shortlist, and his draft for the About section.
        </BodyText>
        <BodyText>His notes on the left, what shipped on the right.</BodyText>
        <Compare
          doc={{ src: I.docLanding, alt: "Ezra's landing page board from the revision doc", caption: 'landing board' }}
          live={{ src: I.liveLanding, alt: 'The live Kodetic landing page', caption: 'landing page' }}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Information architecture</SectionLabel>
        <SectionHeading>Sequence is the IA</SectionHeading>
        <BodyText>
          The board order became the page order and the nav. Each board is a page, and inside each page the photos run
          in the order he laid them out. Mixed Media&apos;s three boards run as one continuous page.
        </BodyText>
        <BodyText>
          Client Work is grouped by campaign, MEC first and then Get Thrifty Fashion Show 2026, each under its own
          heading. Commercial work reads as projects, not loose photos.
        </BodyText>
        <Grid
          className="kcs-grid-4"
          images={[
            { src: I.landing1, alt: 'Landing page, first photo: a model in black lace on white', caption: 'Landing, row 1' },
            { src: I.landing10, alt: 'Landing page photo: a model in black and blue against a red backdrop', caption: 'Landing, row 2' },
            { src: I.mec1, alt: 'MEC campaign: a red backpack and sleeping mat against a tree', caption: 'Client Work: MEC' },
            { src: I.mec2, alt: 'MEC campaign: a model resting in a blue hammock', caption: 'Client Work: MEC' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Visual system</SectionLabel>
        <SectionHeading>A tactile brand system</SectionHeading>
        <BodyText>
          I designed the navbar with a sand texture and the background with moving gold. I wanted something that
          would complement his photography and elevate it rather than competing.
        </BodyText>
        <Grid
          className="kcs-swatches"
          images={[
            { src: I.blackCanvas, alt: 'Black canvas texture', caption: 'Black canvas: the page background' },
            { src: I.whiteCanvas, alt: 'White linen canvas texture', caption: 'White canvas: the navbar and footer, with drifting sand' },
          ]}
        />
        <Clip
          src={I.blackVideo}
          poster={I.blackPoster}
          alt="The black canvas background with gold streaks drifting slowly across it, under the sand navbar"
          caption="The black canvas, with the photos hidden so the gold streaks show. Recorded on the live site."
        />
        <Clip
          src={I.whiteVideo}
          poster={I.whitePoster}
          alt="The white canvas footer and navbar with drifting sand, below the black canvas"
          caption="The white canvas: the navbar and footer, with drifting sand. Recorded on the live site."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Interaction</SectionLabel>
        <SectionHeading>Expand in place</SectionHeading>
        <BodyText>
          I chose expand-from-cell over a lightbox: the image grows from its spot in the grid, the siblings dim, and
          Escape closes it. A lightbox hides the board; this keeps you in the sequence.
        </BodyText>
        <BodyText>
          The siblings fade to 8% and lose their colour, so the open image is the only thing in colour on the page.
          The close button sits right next to the frame, and clicking anywhere outside closes it too.
        </BodyText>
        <Clip
          src={I.expand}
          poster={I.expandPoster}
          fallback={I.expandGif}
          alt="Mixed Media page: an image expands in place, closes with Escape, then a second image expands"
          caption="Live on Mixed Media: open, Escape, open the next one."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Performance</SectionLabel>
        <SectionHeading>Lazy loading and lighter images</SectionHeading>
        <BodyText>Two things keep a photo-heavy site fast: smaller files, and only loading what you can see.</BodyText>
        <BulletList
          items={[
            {
              label: 'Smaller files',
              text: "converting the first gallery from his original exports to WebP took 125 images from 809.6 MB to 22.1 MB, 97% lighter. The average image went from 6.5 MB to 177 KB.",
            },
            {
              label: 'Thumbnails in the grid',
              text: 'grid cells load a thumbnail (53 KB on average) and the full-size file only loads when you expand it. The wide Mixed Media spreads are the exception: they still load full-size files in the grid.',
            },
            {
              label: 'Lazy loading',
              text: "a cell only loads its image once it's within 300 px of the screen. Mixed Media loads 3 of its 16 photos up front on desktop and 2 on mobile: 1.7 MB instead of 6.9 MB.",
            },
            {
              label: 'Lighthouse (desktop)',
              text: 'the landing page scores 96 with a 1.3 s LCP. Mixed Media scores 88 with a 2.2 s LCP.',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            Sometimes, simplicity is key. Listening and understanding will take you where you need to go.
          </BodyText>
        </Reflection>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
