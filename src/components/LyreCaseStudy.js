'use client'

import BookViewer from './BookViewer'
import { LYRE_VOL17_PAGES } from '../data/lyreVol17Pages'
import {
  BodyText,
  CaseStudy,
  CaseStudySection,
  ImageGrid,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

export default function LyreCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <BookViewer pages={LYRE_VOL17_PAGES} name="The Lyre Vol. 17" />

      <header className="cs-hero">
        <ImageGrid
          variant="pages"
          images={[
            {
              src: '/images/projects/lyre-poster-flux.png',
              alt: 'The Lyre Vol. 17 call for submissions poster, theme Flux',
              caption: 'Vol. 17 poster — Flux',
            },
            {
              src: '/images/projects/lyre-poster-constant-motion.png',
              alt: 'The Lyre Vol. 17 call for submissions poster, Constant Motion',
              caption: 'Vol. 17 poster — Constant Motion',
            },
          ]}
        />
        <ImageGrid
          variant="pages"
          images={[
            {
              src: '/images/projects/lyre-vol16-cover.png',
              alt: 'Printed copy of The Lyre Vol. 16, Passage',
              caption: 'Vol. 16 cover — Passage',
            },
            {
              src: '/images/projects/lyre-painting.png',
              alt: 'Cover painting for The Lyre Vol. 16',
              caption: 'Cover painting, Vol. 16',
            },
          ]}
        />
        <p className="cs-body">
          Editorial designer for SFU&apos;s World Literatures literary magazine, Vol. 17, and cover artist for Vol.
          16. Found the throughline to mesh 80+ pieces into a coherent narrative.
        </p>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025–2026' },
            { label: 'Role', value: 'Editorial designer, Vol. 17' },
            { label: 'Theme', value: 'Flux' },
          ]}
        />
      </header>

      <CaseStudySection>
        <SectionLabel>Inspirations</SectionLabel>
        <BodyText className="cs-placeholder">[Add: inspirations for Vol. 17]</BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Friends who helped</SectionLabel>
        <SectionHeading>Keane and Yoona</SectionHeading>
        <BodyText className="cs-placeholder">[Add: what Keane helped with]</BodyText>
        <BodyText className="cs-placeholder">[Add: what Yoona helped with]</BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Finding a through line</SectionLabel>
        <SectionHeading>Once the cover existed</SectionHeading>
        <BodyText>
          Found the throughline to mesh 80+ pieces into a coherent narrative. The issue theme was Flux.
        </BodyText>
        <BodyText className="cs-placeholder">[Add: how the cover led the rest of the issue]</BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Visual design decisions</SectionLabel>
        <SectionHeading>Typography</SectionHeading>
        <BodyText className="cs-placeholder">[Add: the typefaces you chose and why]</BodyText>

        <div className="cs-subtopic">
          <SectionLabel>Influences</SectionLabel>
          <SectionHeading>Madeline Montoya</SectionHeading>
          <BodyText>Madeline Montoya, from byline.</BodyText>
          <BodyText className="cs-placeholder">
            [Add: who Madeline Montoya is in this project, and which of her work you were looking at]
          </BodyText>
          <BodyText className="cs-placeholder">
            [Add: Madeline Montoya&apos;s inspirations, and how they shaped the Vol. 17 layouts, type, or pacing]
          </BodyText>
        </div>

        <div className="cs-subtopic">
          <SectionLabel>Other inspirations</SectionLabel>
          <SectionHeading>Other inspirations and influences</SectionHeading>
          <BodyText className="cs-placeholder">
            [Add: other inspirations and influences for Vol. 17]
          </BodyText>
        </div>

        <div className="cs-subtopic">
          <SectionLabel>Colour</SectionLabel>
          <SectionHeading>Colour choices for Flux</SectionHeading>
          <BodyText className="cs-placeholder">[Add: the colours chosen for Flux, and why]</BodyText>
        </div>

        <div className="cs-subtopic">
          <SectionLabel>Photos</SectionLabel>
          <SectionHeading>Choice of photos</SectionHeading>
          <BodyText className="cs-placeholder">[Add: how the photos were chosen]</BodyText>
        </div>
      </CaseStudySection>

      {onNext ? <NextCaseStudy label="Back to collection →" onClick={onNext} /> : null}
    </CaseStudy>
  )
}
