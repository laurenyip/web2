'use client'

import {
  BodyText,
  BulletList,
  CaseStudy,
  CaseStudyHero,
  CaseStudySection,
  ImageBlock,
  ImageGrid,
  ImageText,
  NextCaseStudy,
  ProjectMeta,
  Reflection,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

const I = {
  hero: '/images/projects/kodetic/hero.webp',
  landing1: '/images/projects/kodetic/landing-page-photos-1.webp',
  landing10: '/images/projects/kodetic/landing-page-photos-10.webp',
  margiela: '/images/projects/kodetic/landing-margiela-spread.webp',
  mec1: '/images/projects/kodetic/client-work-photos-mec-1.webp',
  mec2: '/images/projects/kodetic/client-work-photos-mec-2.webp',
  canvasBlack: '/images/projects/kodetic/black-canvas.png',
  canvasWhite: '/images/projects/kodetic/white-canvas.png',
  logo: '/images/projects/kodetic/logo.png',
  live: 'https://laurenyip.github.io/kodetic/',
}

export default function KodeticCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <CaseStudyHero
        title="Designed an editorial portfolio so a photographer's media kit could live on the web without losing its sequencing or presence."
        support="I designed and built Kodetic for Ezra Gillera (Kodetic), a Vancouver multidisciplinary artist — translating TransferNow boards and a PDF media kit into a client-facing site."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Website Design & Build' },
            { label: 'Live', value: 'laurenyip.github.io/kodetic', href: I.live },
          ]}
        />
      </CaseStudyHero>

      <ImageBlock
        src={I.hero}
        alt="Kodetic landing — Margiela editorial spread"
        wide
        priority
      />

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>Print already had a rhythm. The web needed the same ownership.</SectionHeading>
        <BodyText>
          Kodetic — also known as Ezra — is a multidisciplinary artist primarily based in Vancouver, BC. Over
          several years he has built a practice in photography, film, design, and digital media, blending
          mediums to explore people, culture, and the world around him. Through collaboration with artists,
          brands, organizations, and communities, his work sits at the intersection of art and communication.
        </BodyText>
        <BodyText>
          The site had to carry that belief: creativity as a way of understanding and connecting — not a generic
          dark gallery. His boards already sequenced Landing, Mixed Media, Client Work, Cosplay, Creative, and
          Miscellaneous with intentional order. Online, that rhythm disappeared into equal tiles and template
          chrome.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Earlier versions</SectionLabel>
        <SectionHeading>First version was modelled on Jordan Robson — then we made it Kodetic.</SectionHeading>
        <BodyText>
          The first version took structural cues from{' '}
          <a href="https://jordandrobson.com/?ref=siteinspire" target="_blank" rel="noopener noreferrer">
            Jordan Robson&apos;s site
          </a>
          : image-led portfolio density, category browsing, a strong header presence. It was a useful starting
          frame for “photographer site,” but it still read as inspired-by rather than owned. Photos sat too far
          right, a top photo carousel competed with the header, and the mark did not clearly return you home.
        </BodyText>
        <BodyText>
          From Ezra&apos;s notes we tightened the product: center every page&apos;s photo grid, remove the top
          carousel and enlarge the header, make logo/typography on the right return to the landing/home page,
          reorder categories, and shift the accent from red toward purple.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Working with the client</SectionLabel>
        <SectionHeading>The boards were the brief — order, categories, and accent included.</SectionHeading>
        <BodyText>
          Ezra delivered sequenced boards for Landing, Mixed Media (parts 1–3), Client Work (MEC; Get Thrifty
          Fashion Show 2026), Cosplay, Creative (parts 1–2), and Miscellaneous — plus website change notes and
          an About draft. Feedback was visual: alignment, category order, accent colour, what the header should
          do. I treated those boards as layout truth and turned the change list into product decisions.
        </BodyText>
        <BulletList
          items={[
            {
              label: 'Center the grids',
              text: 'photos were reading too far right on category pages',
            },
            {
              label: 'Header over carousel',
              text: 'remove the top photo carousel; make the header larger',
            },
            {
              label: 'Logo → home',
              text: 'right-side logo/typography returns to the landing page',
            },
            {
              label: 'Category order',
              text: 'Mixed Media, Client Work, Creative, Miscellaneous',
            },
            {
              label: 'Accent',
              text: 'move from red toward purple',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Image assets</SectionLabel>
        <SectionHeading>Sequencing was the IA.</SectionHeading>
        <BodyText>
          I preserved board order when exporting: Landing spreads first, then Mixed Media across three boards,
          Client Work nested as campaigns (MEC; Get Thrifty Fashion Show 2026), Cosplay, Creative in two parts,
          then Miscellaneous. PDF / TransferNow order → WebP → grid thumbs → static GitHub Pages. Lazy in-view
          loading kept density from fighting performance.
        </BodyText>
        <ImageGrid
          images={[
            { src: I.landing1, alt: 'Landing photography', caption: 'Landing — board order' },
            { src: I.mec1, alt: 'MEC client work', caption: 'Client Work — MEC' },
            { src: I.landing10, alt: 'Editorial frame', caption: 'Editorial density from the kit' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Font choices</SectionLabel>
        <SectionHeading>Shortlisted on Fontshare — locked Zodiak + Red Hat Display.</SectionHeading>
        <BodyText>
          We reviewed a Fontshare shortlist together: Zodiak, Gambarino, Recia, Literata, Crimson Pro,
          Montserrat, and Red Hat Display. I chose Zodiak for display — editorial weight without fashion-template
          gloss — and Red Hat Display for navigation, labels, and About body so UI stays calm beside dense
          photography. One display + one UI sans keeps type from competing with the images.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>About</SectionLabel>
        <SectionHeading>Voice that matches the practice.</SectionHeading>
        <BodyText>
          The About panel carries Ezra&apos;s own framing: Kodetic as an evolving creative practice built on
          curiosity, authenticity, and meaningful connection — photography, film, design, and collaborative
          projects as ways of understanding the world. I kept that copy close to his draft so the site speaks in
          his voice, not portfolio-template English.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows & decisions</SectionLabel>
        <ImageText src={I.mec1} alt="MEC client work set" caption="Client Work grouped by campaign">
          <SectionHeading>Category architecture</SectionHeading>
          <BodyText>
            Nav settled on Mixed Media, Client Work, Creative, and Miscellaneous for scan order, with Client Work
            still grouped by project so commercial sets read as campaigns. Cosplay and Creative boards kept their
            board-faithful grids even as the primary nav tightened.
          </BodyText>
        </ImageText>

        <ImageText src={I.mec2} alt="Client work detail" caption="Inspect without leaving page context" reverse>
          <SectionHeading>Expand-in-place viewing</SectionHeading>
          <BodyText>
            I chose expand-from-cell over a generic lightbox. Siblings dim, Escape closes, and caption slots stay
            ready — so inspection never abandons the board.
          </BodyText>
        </ImageText>

        <ImageText src={I.canvasBlack} alt="Black canvas atmosphere">
          <SectionHeading>Purple, canvas, centered grids</SectionHeading>
          <BodyText>
            Centering the grids fixed the “too far right” read. Purple replaced red as the interactive accent on
            cursor and links. Canvas weave on black/white chrome keeps atmosphere tactile without fighting the
            photographs.
          </BodyText>
        </ImageText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Microinteractions</SectionLabel>
        <SectionHeading>Quiet motion that protects the work.</SectionHeading>
        <BodyText>
          Expand-in-place, purple cursor/link states, and canvas trails stay secondary to the images.
          Reduced-motion turns atmosphere down without breaking the brand.
        </BodyText>
        <ImageBlock src={I.margiela} alt="Kodetic landing presence" wide />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            Starting from Jordan Robson taught me how fast a reference becomes a cage. The breakthrough was
            treating Ezra&apos;s boards and change list as the product spec — order, centering, header, home link,
            accent — and defending those quiet choices until the site felt like Kodetic, not “a photographer
            template with his photos.”
          </BodyText>

        </Reflection>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
