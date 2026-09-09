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
        support="I designed and built Kodetic for Ezra Gillera, a Vancouver multidisciplinary artist, across 2025–2026 — translating TransferNow boards and a PDF media kit into a client-facing site."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Product Designer & Builder' },
            { label: 'Live', value: 'laurenyip.github.io/kodetic', href: I.live },
          ]}
        />
      </CaseStudyHero>

      <ImageBlock
        src={I.hero}
        alt="Kodetic landing — Margiela editorial spread"
        caption="Landing presence — photography first, chrome second"
        wide
        priority
      />

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>The work already looked considered in print. Online, that rhythm disappeared.</SectionHeading>
        <BodyText>
          Ezra&apos;s boards had column counts, full-bleed spreads, and project groupings that made sense when you
          flipped a PDF. On a phone between emails, clients either got a flat dump of images or a generic dark
          gallery that could belong to anyone.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Moodboarding</SectionLabel>
        <SectionHeading>I treated the media kit as the moodboard — not Pinterest.</SectionHeading>
        <BodyText>
          Before I drew UI, I sat with Ezra&apos;s TransferNow boards and PDF spreads. The mood was already there:
          linen-adjacent texture, dense editorial crops, campaign grouping, and a quiet purple accent that felt
          owned rather than trendy. I pulled colour and material notes from the work itself — canvas weave,
          ash blacks, violet shadow — so the site would feel like an extension of the photographs, not a skin
          draped over them.
        </BodyText>
        <ImageGrid
          images={[
            { src: I.canvasBlack, alt: 'Black canvas texture', caption: 'Black canvas world — atmosphere from material' },
            { src: I.canvasWhite, alt: 'White canvas texture', caption: 'White canvas for nav / footer chrome' },
            { src: I.landing10, alt: 'Editorial frame', caption: 'Board density as visual reference' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Early ideas</SectionLabel>
        <BodyText>
          I started by treating the kit as assets to upload — then realized that was the wrong frame. The boards
          were already an information architecture. If I ignored their pacing, I would rebuild the same problem in
          nicer CSS.
        </BodyText>
        <BodyText>
          I mapped practice areas to routes and preserved PDF board column counts in the grid system, so Mixed
          Media could stay board-like while Client Work could read as campaigns.
        </BodyText>
        <ImageGrid
          images={[
            { src: I.landing1, alt: 'Landing photography', caption: 'Landing frames' },
            { src: I.mec1, alt: 'MEC client work', caption: 'Client work — MEC' },
            { src: I.logo, alt: 'Kodetic logo', caption: 'Early mark explorations landed here' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Earlier versions</SectionLabel>
        <SectionHeading>Version one looked like a portfolio template. Version two looked like Ezra.</SectionHeading>
        <BodyText>
          The first pass was a dark equal-tile gallery with a generic lightbox. It was clean — and completely
          wrong. Categories collapsed into one scroll, campaign sets lost their grouping, and the brand read as
          “photographer website #400.”
        </BodyText>
        <BodyText>
          I threw that out and rebuilt around board fidelity: uneven grids that follow PDF column counts,
          Client Work nested by project, expand-in-place instead of a detached lightbox, and canvas textures in
          the chrome so the UI felt tactile without competing with the images.
        </BodyText>
        <ImageText src={I.mec2} alt="Client work detail" caption="Later direction — inspect without leaving the board">
          <SectionHeading>What changed between versions</SectionHeading>
          <BulletList
            items={[
              {
                label: 'Grid',
                text: 'equal tiles → board-faithful column counts',
              },
              {
                label: 'Viewer',
                text: 'generic lightbox → expand-from-cell with dimmed siblings',
              },
              {
                label: 'IA',
                text: 'one dump of images → Mixed Media / Client Work / Creative / Cosplay / Misc',
              },
              {
                label: 'Chrome',
                text: 'flat black UI → woven canvas surfaces + purple accent',
              },
            ]}
          />
        </ImageText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Working with the client</SectionLabel>
        <SectionHeading>Feedback was visual, iterative, and tied to the boards.</SectionHeading>
        <BodyText>
          Ezra and I worked from the media kit as shared truth. I would send a build or a Loom, he would react
          to sequencing and presence — “this board feels flatter,” “MEC should read as a set” — and I would
          adjust the grid or viewer rather than arguing abstract UX principles. Licensing and contact stayed
          visible because that was part of how he already worked with clients.
        </BodyText>
        <BodyText>
          The collaboration taught me to ask for decisions in the language of the artifact: show two grids side
          by side, not a slide titled “Option A / Option B.” When the PDF was the brief, the PDF was also the
          review surface.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The gap</SectionLabel>
        <SectionHeading>Scan, inspect, and contact — in that order.</SectionHeading>
        <BodyText>
          Clients needed to find the right category quickly, open a frame without losing context, feel that the
          brand was owned (not templated), and reach out for licensing. Heavy photography also meant performance
          was a design constraint, not an engineering afterthought.
        </BodyText>
        <BulletList
          items={[
            {
              label: 'Scattered source of truth',
              text: 'PDFs and TransferNow boards do not translate to mobile browsing by default',
            },
            {
              label: 'Flattened editorial rhythm',
              text: 'Equal tiles erase full-bleed boards and campaign grouping',
            },
            {
              label: 'Inspect vs browse conflict',
              text: 'Dense scanning and close looking usually fight each other',
            },
            {
              label: 'Brand without clutter',
              text: 'Atmosphere has to feel tactile without competing with the photographs',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The brief</SectionLabel>
        <SectionHeading>
          How might we treat the PDF as layout truth while designing a product for scan → inspect → contact?
        </SectionHeading>
        <BodyText>
          I stopped optimizing for “a nice gallery” and optimized for fidelity to how Ezra already sequenced work
          — then made that sequence usable as a hiring surface.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Font choices</SectionLabel>
        <SectionHeading>Zodiak for presence. Red Hat Display for UI.</SectionHeading>
        <BodyText>
          I chose Zodiak as the display face because it carries editorial weight without looking like a fashion
          template — close to the print energy of the kit. Red Hat Display handles navigation, labels, and body
          UI: readable at small sizes, calm next to dense photography. I avoided a second decorative font so the
          type system would not compete with the images.
        </BodyText>
        <BodyText>
          The decision was less “beautiful fonts” and more hierarchy: display for brand moments, sans for
          wayfinding, photography for emotion.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Image assets</SectionLabel>
        <SectionHeading>The pipeline was part of the design.</SectionHeading>
        <BodyText>
          I designed delivery as carefully as the grids: PDF / TransferNow order → WebP exports → grid thumbs →
          static GitHub Pages. Lazy in-view loading kept the landing heavy without feeling broken. Canvas
          textures (black world, white chrome) were generated as reusable surfaces so atmosphere stayed
          consistent across nav, footer, and page worlds.
        </BodyText>
        <ImageGrid
          images={[
            { src: I.hero, alt: 'Hero export', caption: 'Hero WebP — presence first' },
            { src: I.mec1, alt: 'Campaign thumb', caption: 'Campaign thumbs for Client Work' },
            { src: I.canvasBlack, alt: 'Canvas texture', caption: 'Reusable canvas texture assets' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Design challenge</SectionLabel>
        <SectionHeading>Editorial density, without a template feel.</SectionHeading>
        <BodyText>
          When I created the brand system, two things had to be true at once:
        </BodyText>
        <BulletList
          items={[
            {
              label: 'Image-led',
              text: 'photography carries presence; chrome stays quiet',
            },
            {
              label: 'Owned',
              text: 'canvas weave, linen IA, and purple accent feel like Kodetic — not stock black UI',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows & decisions</SectionLabel>
        <ImageText
          src={I.mec1}
          alt="MEC client work set"
          caption="Client Work grouped by campaign"
        >
          <SectionHeading>Category architecture</SectionHeading>
          <BodyText>
            I separated Mixed Media, Client Work, Creative, Cosplay, and Miscellaneous so people could scan by
            how they ask for work. Client Work is grouped by project — MEC, Get Thrifty — so commercial sets
            read as campaigns.
          </BodyText>
        </ImageText>

        <ImageText
          src={I.mec2}
          alt="Client work detail"
          caption="Inspect without leaving page context"
          reverse
        >
          <SectionHeading>Expand-in-place viewing</SectionHeading>
          <BodyText>
            I chose an expand-from-cell viewer over a generic lightbox. Siblings dim, Escape closes, and caption
            slots stay ready for artist notes — so inspection never abandons the board.
          </BodyText>
        </ImageText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Microinteractions</SectionLabel>
        <SectionHeading>Small motions that protect the photographs.</SectionHeading>
        <BodyText>
          I kept interaction quiet on purpose. Expand-in-place dims siblings instead of slamming a modal.
          Interactive text and a custom cursor shift to purple on actionable targets so affordance is felt, not
          labelled. Yellow light trails and canvas weave add atmosphere on capable devices — and respect
          reduced-motion so the sensory layer never becomes a barrier.
        </BodyText>
        <BulletList
          items={[
            {
              label: 'Expand-from-cell',
              text: 'inspect without losing board context',
            },
            {
              label: 'Cursor + interactive text',
              text: 'purple state on links and controls',
            },
            {
              label: 'Canvas trails',
              text: 'ambient motion with reduced-motion fallbacks',
            },
            {
              label: 'Lazy in-view images',
              text: 'performance treated as part of the experience',
            },
          ]}
        />
        <ImageBlock
          src={I.hero}
          alt="Kodetic hero frame"
          caption="Final landing presence"
          wide
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            This project taught me that IA can come from a messy artifact if you are willing to treat it as
            layout truth. Working with Ezra reinforced that client feedback is fastest when you review against
            their own boards — not against a generic UX checklist. I would involve the artist earlier on caption
            content next time — the slots are ready, but the writing still needs to catch up to the system.
          </BodyText>
          <BodyText>
            The outcome I care about is not “I shipped Next.js.” It is that a client can scan by category,
            inspect a frame, feel the brand, and email for licensing without fighting the interface.
          </BodyText>
        </Reflection>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
