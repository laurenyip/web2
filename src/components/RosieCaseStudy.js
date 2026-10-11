'use client'

import {
  BodyText,
  BulletList,
  CaseStudy,
  CaseStudySection,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'
import './RosieCaseStudy.css'

const P = '/images/projects/rosie/case-study'
const PROJECT_URL = 'https://rosielab.github.io/react-to-this/'

function Figure({ src, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`rs-fig ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

export default function RosieCaseStudy({ onNext }) {
  return (
    <CaseStudy className="cs--rosie">
      <header className="cs-hero">
        <SectionHeading as="h1">React to This! A research project on how people test virtual agents</SectionHeading>
        <BodyText>
          React to This! is a research project with ROSIE Lab (Robots with Social Intelligence and Empathy) at SFU. It
          explores how people interact with and respond to virtual agents, and I contributed across it, from recruiting
          participants to making the video and the website.
        </BodyText>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2023 - 2024' },
            { label: 'Role', value: 'Research Assistant' },
            { label: 'Recognition', value: 'Co-author on the paper' },
          ]}
        />
      </header>

      <Figure
        src={`${P}/website-hero.webp`}
        alt="The React to This! project website"
        width={1800}
        height={1131}
        className="rs-fig--wide"
        caption="The project website I designed and built."
      />

      <CaseStudySection>
        <SectionLabel>The project</SectionLabel>
        <SectionHeading>How do people use their faces and bodies to test a robot?</SectionHeading>
        <BodyText>
          Lively, believable agents are a goal for robots and virtual agents, but believability breaks down easily. The
          project builds an annotated dataset of the physical and emotional reactions people have to virtual agents,
          which is used to train and evaluate how well agents handle social interaction.
        </BodyText>
        <BodyText>
          It was a Wizard-of-Oz study: 20 participants, 6 types of agents, and 1169 nonverbal interactions. We recorded
          the behaviours people used to challenge the characters physically, emotionally and socially, and turned them
          into a codebook of 188 unique nonverbal behaviours.
        </BodyText>
        <p className="cs-body rs-link">
          <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">
            rosielab.github.io/react-to-this →
          </a>
        </p>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The characters</SectionLabel>
        <SectionHeading>Six agents, humanoid and not</SectionHeading>
        <BodyText>
          Participants interacted freely with a robot, a human, a penguin, a pufferfish, a banana and a toilet, so we
          could see how behaviour changes between humanoid and non-humanoid forms.
        </BodyText>
        <Figure
          src={`${P}/characters.webp`}
          alt="The six agents: a pufferfish, a robot, a human, a penguin, a banana and a toilet"
          width={1548}
          height={236}
          caption="The six agents."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The study</SectionLabel>
        <SectionHeading>Talking to a character on a screen</SectionHeading>
        <BodyText>
          Participants talked to the characters over a two-way Zoom display. The character on screen was animated live
          from a researcher&apos;s face and upper-body movements, tracked with an iPhone and a webcam.
        </BodyText>
        <Figure
          src={`${P}/study-setup.webp`}
          alt="Two photos of the study setup: a participant facing the animated character on a screen, and a researcher animating it with webcam and iPhone face tracking"
          width={846}
          height={411}
          caption="The setup: a two-way display on Zoom, with face tracking driving the character."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Annotation</SectionLabel>
        <SectionHeading>Coding every reaction</SectionHeading>
        <BodyText>
          I annotated the recordings for analysis in ELAN, tagging each nonverbal behaviour on a timeline so it could be
          counted and compared across characters.
        </BodyText>
        <Figure
          src={`${P}/elan-annotation.webp`}
          alt="The ELAN annotation tool, with a video of the participant and the character above a timeline of tagged behaviours"
          width={845}
          height={535}
          caption="Annotating in ELAN."
        />
        <BodyText>
          The behaviours fell into two groups: social ones people used with every agent, like greeting, affection and
          approval, and ones aimed at a specific character, like peeling the banana or flushing the toilet.
        </BodyText>
        <div className="rs-duo">
          <Figure
            src={`${P}/social-behaviours.webp`}
            alt="Chart of social behaviours with the number of times each was observed, such as greeting (121), affection (45) and good job (44)"
            width={858}
            height={780}
            caption="Social behaviours, with how often each appeared."
          />
          <Figure
            src={`${P}/character-behaviours.webp`}
            alt="Chart of character-specific behaviours for the banana, fish, toilet, penguin, robot and human"
            width={854}
            height={499}
            caption="Character-specific behaviours."
          />
        </div>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>My contribution</SectionLabel>
        <SectionHeading>Research, and making it reachable</SectionHeading>
        <BulletList
          items={[
            'Created a descriptive documentary video to communicate the research',
            'Designed and built the project website',
            'Edited and formatted the research paper',
            'Annotated data for analysis',
            'Recruited participants and volunteers for data collection',
          ]}
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The website</SectionLabel>
        <SectionHeading>One page for the paper, the video and the annotations</SectionHeading>
        <BodyText>
          The site puts the paper, the video and the annotations behind three buttons, under the title and authors. It
          keeps a calm, light layout so dense research content stays readable, with a light blue accent. Red is only for
          the note about the video data still being anonymised.
        </BodyText>
        <Figure
          src={`${P}/website-title.webp`}
          alt="The top of the project website: the title, the authors, and Paper, Video and Annotations buttons"
          width={1024}
          height={467}
        />
        <Figure
          src={`${P}/paper-abstract.webp`}
          alt="The paper's abstract and the table of character-specific nonverbal behaviours on the site"
          width={1024}
          height={478}
          caption="The abstract and the behaviour table, written up on the site."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <SectionHeading>Research as design</SectionHeading>
        <BodyText>
          Working in a research lab taught me that defining the right question is harder, and more important, than
          building the answer. Designing the data collection process and the participant experience was as much a
          design problem as the website.
        </BodyText>
        <SectionHeading>Making research accessible</SectionHeading>
        <BodyText>
          The website and the documentary weren&apos;t afterthoughts. They were the bridge between the paper and the
          people it could help. I learned how much communication design matters in academic work, where the default is
          to assume the audience will find you.
        </BodyText>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
