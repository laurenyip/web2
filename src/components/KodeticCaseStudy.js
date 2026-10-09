'use client'

import {
  BodyText,
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

const I = {
  hero: '/images/projects/kodetic/hero.webp',
  live: 'https://laurenyip.github.io/kodetic/',
}

export default function KodeticCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <CaseStudyHero
        title="Turning a photographer's media kit into a site that holds its sequence."
        support="I designed and built Kodetic for Ezra Gillera, a Vancouver-based multidisciplinary artist working across photography, film, design, and digital media. We met on the set of a VIYFF film!"
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: 'Summer 2026' },
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
        <SectionLabel>Working with the client</SectionLabel>
        <SectionHeading>Communication 🔑</SectionHeading>
        <BodyText>
          My main job was to understand his vision of how he wanted his work presented. This project was light
          lifting on the design side, since Kodetic already knew what he wanted. All I had to do was focus on the
          technical side, optimizing for quick loading, making sure that there were no bugs or edge case
          glitches.
        </BodyText>
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
