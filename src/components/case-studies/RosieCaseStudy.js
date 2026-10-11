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
} from './shared'
import './shared/CaseStudy.css'
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

function Clip({ name, label, caption }) {
  return (
    <figure className="rs-fig">
      <video
        src={`${P}/${name}.mp4`}
        poster={`${P}/${name}-poster.webp`}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
      />
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
          explores how people interact with and respond to virtual agents.
        </BodyText>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '2023 - 2024' },
            { label: 'Role', value: 'Research Assistant' },
            { label: 'Recognition', value: 'Co-author on the paper, presented at IROS 2024' },
          ]}
        />
      </header>

      <Clip
        name="website-scroll"
        label="Scrolling through the React to This! project website"
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
        <BodyText>
          <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">
            rosielab.github.io/react-to-this →
          </a>
        </BodyText>
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
        <BodyText className="rs-after-fig">
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
        <Clip
          name="website-design-zoom"
          label="Zooming in on the project website's title, buttons and notice"
          caption="Zooming in on the details."
        />
        <BodyText className="rs-after-fig">
          Headings and buttons are set in Urania, and body text in Hubot, with Hubot Italic for the author list. The
          title and the page&apos;s accent are a light blue (#61DAFB), a nod to React, and everything else is plain black
          on white. Tables use a pale grey header row (#F2F2F2) with thin dividers, so rows scan quickly.
        </BodyText>
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
        <SectionHeading>My first research experience</SectionHeading>
        <BodyText>
          This was my first research experience, and I learned a lot about how a study is actually run: how it works,
          and how the data is collected, used and presented.
        </BodyText>
        <BodyText>
          There are three things I&apos;ll bring into my own work. Rigor: every claim needs data behind it, and a
          process other people can check. Consistency: coding hundreds of reactions only works if everyone applies the
          same rules, every time. And asking what a finding actually means, not just what the numbers say, before
          deciding what to do with it.
        </BodyText>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
