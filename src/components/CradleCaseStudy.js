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

const CRADLE_UI = '/images/projects/cradle-referrals.png'

export default function CradleCaseStudy({ onNext }) {
  return (
    <CaseStudy>
      <CaseStudyHero
        title="Made tacit clinical workflows usable by grouping the information architecture by urgency."
        support="Healthcare practitioners' workflows existed as tacit knowledge — routines, judgment calls, and terminology that lived in practitioners' heads, not in any documented structure. This SFU special research project with Prof. Brian Fraser asked how that knowledge could be made usable for people who weren't already in the room."
      >
        <ProjectMeta
          items={[
            { label: 'Context', value: 'SFU Special Research Project' },
            { label: 'Role', value: 'Information architecture & product design' },
            { label: 'With', value: 'Prof. Brian Fraser' },
          ]}
        />
      </CaseStudyHero>

      <ImageBlock src={CRADLE_UI} alt="Cradle referrals board — patients listed by urgency signals" wide />

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>New practitioners had no reference for how decisions were actually made.</SectionHeading>
        <BodyText>
          Existing documentation described official procedure, not the judgment calls, shortcuts, and terminology
          practitioners actually used. New staff had no reference for how decisions were made at the bedside, so they
          either shadowed indefinitely or invented their own inconsistent versions of the same workflow.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Process</SectionLabel>
        <SectionHeading>Surface how people actually worked, then translate it.</SectionHeading>
        <BodyText>
          I led contextual interviews with healthcare practitioners to surface how they actually worked, not how
          workflows were formally documented. Example workflows included the &quot;Papagaio Study Workflow&quot;.
          Findings were synthesized into journey maps and design principles, then clinical terminology and decision
          logic were translated into a structure non-specialists could follow.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key flows &amp; decisions</SectionLabel>
        <SectionHeading>Grouped by urgency, not by role.</SectionHeading>
        <BodyText>
          The information architecture was grouped by urgency — what needs to happen now versus what can wait —
          rather than by role or department. Workflows could be in process for up to a few months, so it made sense to
          order tasks by what was most urgent to the patient, and then look at what could be done in the background
          later.
        </BodyText>
        <BulletList
          items={[
            { label: 'Now', text: 'bedside decisions that cannot wait' },
            { label: 'Soon', text: 'follow-through inside the shift' },
            { label: 'Later', text: 'reference, record, and what can wait' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Outcome</SectionLabel>
        <SectionHeading>A structure the interface could keep.</SectionHeading>
        <BodyText>
          Delivered wireframes, prototypes, and high-fidelity UI that reflected the new urgency-based structure,
          collaborating with frontend developers to keep it consistent with the design system. Clinical terms stayed
          in the language of practice, but sat inside a sequence a non-specialist could scan.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <Reflection>
          <BodyText>
            At scale, I would keep a tighter history of how the taxonomy changed — what we grouped, what we split, and
            why — so later decisions are easy to make and rationalize.
          </BodyText>
        </Reflection>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
