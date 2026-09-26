'use client'

import {
  BodyText,
  CaseStudy,
  CaseStudyHero,
  CaseStudySection,
  ImageGrid,
  NextCaseStudy,
  ProjectMeta,
  Reflection,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

const LYRE_PAGES = [
  {
    src: '/images/projects/lyre-vol17/lyre-17-02.png',
    alt: 'The Lyre Vol. 17, page 2',
  },
  {
    src: '/images/projects/lyre-vol17/lyre-17-10.png',
    alt: 'The Lyre Vol. 17, page 10',
  },
  {
    src: '/images/projects/lyre-vol17/lyre-17-11.png',
    alt: 'The Lyre Vol. 17, page 11',
  },
  {
    src: '/images/projects/lyre-vol17/lyre-17-48.png',
    alt: 'The Lyre Vol. 17, page 48 — interview with Jeremy Tiang',
  },
  {
    src: '/images/projects/lyre-vol17/lyre-17-49.png',
    alt: 'The Lyre Vol. 17, page 49 — interview with Jeremy Tiang',
  },
]

export default function LyreCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <CaseStudyHero
        title="Found the throughline in eighty voices, then let the design echo the issue rather than sit on top of it."
        support="Editorial designer for SFU's World Literatures literary magazine, Vol. 17, and cover artist for Vol. 16. Found the throughline to mesh 80+ pieces into a coherent narrative."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Editorial designer, Vol. 17' },
            { label: 'Theme', value: 'Flux' },
          ]}
        />
      </CaseStudyHero>

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>Design a &quot;flux&quot; themed literary magazine in Figma.</SectionHeading>
        <BodyText>
          I created the visual language and layout for each page to communicate the transient and surreal nature of
          this year&apos;s issue.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Process</SectionLabel>
        <SectionHeading>Pull the sentences doing the most work, then let design echo them.</SectionHeading>
        <BodyText>
          As part of the editorial team, I reviewed submissions and highlighted key quotes and sentences that captured
          what made each piece distinct — the phrases doing the most work. Those highlights informed decisions about
          visual language (layout, typography, pacing) so the issue&apos;s design echoed its editorial voice rather
          than sitting on top of it.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows &amp; decisions</SectionLabel>
        <SectionHeading>Flux, in contrast</SectionHeading>
        <BodyText>
          The issue theme was Flux. I pulled interview quotes that carried that tension and set them in high contrast
          against complementary color, so the quotes became visual rest stops rather than captions sitting on top of
          the layout. Typography and pacing were meant to make flux felt — high contrast, complementary color, a
          strong visual language — instead of illustrating the word.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Work</SectionLabel>
        <SectionHeading>The issue as one reading experience.</SectionHeading>
        <BodyText>
          About 80 submissions reviewed into an ~80-page issue under the theme Flux. Full editorial design by me —
          from the phrases that carried each piece to the layout, typography, and pacing that held the issue together.
        </BodyText>
        <ImageGrid variant="pages" images={LYRE_PAGES} />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            Identifying which words carry an experience&apos;s voice, and making design decisions that reinforce
            rather than compete with that voice, is the same skill as maintaining a brand voice across in-product copy
            — just applied to prose instead of UI strings.
          </BodyText>
        </Reflection>
      </CaseStudySection>

      {onNext ? <NextCaseStudy label="Back to collection →" onClick={onNext} /> : null}
    </CaseStudy>
  )
}
