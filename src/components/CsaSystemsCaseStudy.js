'use client'

import {
  BodyText,
  BulletList,
  CaseStudy,
  CaseStudyHero,
  CaseStudySection,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'

export default function CsaSystemsCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <CaseStudyHero
        title="Structured a fragmented research network into a content system the mission could query."
        support="As a Mission Science Apprentice on the Terrestrial Snow Mass Mission (TSMM), Canadian Sun-Earth systems research and contacts existed as a fragmented network — no shared structure for identifying who knew what, or how findings connected to the mission roadmap."
      >
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2025' },
            { label: 'Role', value: 'Mission Science Apprentice' },
            { label: 'Mission', value: 'Terrestrial Snow Mass Mission' },
          ]}
        />
      </CaseStudyHero>

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>
          The team couldn&apos;t answer &quot;who has done work on X&quot; without asking around.
        </SectionHeading>
        <BodyText>
          The team couldn&apos;t answer &quot;who has done work on X&quot; without asking around informally, which
          slowed down roadmap decisions. We had an incomplete spreadsheet containing out of date contact information
          for the relevant scientists across Canada that badly needed to be updated.
        </BodyText>
        <BodyText>
          Without a shared content system, findings could not be queried against the mission, and collaboration across
          agencies stayed dependent on who happened to be in the conversation.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Process</SectionLabel>
        <SectionHeading>Categorize by subject matter and region, from the documents already in play.</SectionHeading>
        <BodyText>
          I researched across university websites and resources like Rate My Prof. People and findings were categorized
          by subject matter and region.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows &amp; decisions</SectionLabel>
        <SectionHeading>A content system for institutional knowledge.</SectionHeading>
        <BodyText>
          I built a structured stakeholder database and mission intelligence resource — effectively a content system
          for institutional knowledge — that let the team query by expertise and relevance rather than relying on
          memory or word-of-mouth.
        </BodyText>
        <BulletList
          items={[
            { label: 'Subject matter', text: 'what someone had actually worked on' },
            { label: 'Region', text: 'where that work sat geographically' },
            { label: 'Mission relevance', text: 'how a finding connected to the TSMM roadmap' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Outcome</SectionLabel>
        <SectionHeading>Roadmap decisions with a shared map of who knows what.</SectionHeading>
        <BodyText>
          The system directly informed the TSMM roadmap and supported collaboration across CSA, ESA, NASA, and
          Environment &amp; Climate Change Canada.
        </BodyText>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
