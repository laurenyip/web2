'use client'

import BookViewer from './BookViewer'
import { ROLY_POLY_ZINE_PAGES, ROLY_POLY_ZINE_PDF } from '../data/rolyPolyZinePages'
import {
  BodyText,
  CaseStudy,
  CaseStudySection,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './caseStudy'
import './caseStudy/CaseStudy.css'
import './JellyfishCaseStudy.css'

const DIR = '/images/projects/jellyfish'

// Control-panel stills and clips were captured from the panel at 1440x900, device scale 2.
// width/height are the files' real pixel sizes; they display at half that (1 CSS px = 2 image px),
// never upscaled, at their natural aspect ratio.
const I = {
  aiColour: { src: `${DIR}/panel-ai-colour.webp`, width: 904, height: 326 },
  previewHover: { src: `${DIR}/panel-preview-hover.webp`, width: 932, height: 648 },
  previewLive: { src: `${DIR}/panel-preview-live.webp`, width: 932, height: 648 },
  offline: { src: `${DIR}/panel-offline.webp`, width: 224, height: 100 },
  send: { src: `${DIR}/panel-send.webp`, width: 1920, height: 174 },
  sendError: { src: `${DIR}/panel-send-error.webp`, width: 1920, height: 174 },
  panel: { src: `${DIR}/panel-full.webp`, width: 2880, height: 2254 },
}

const PANEL_CLIPS = {
  colourWheel: { src: `${DIR}/panel-colour-wheel.mp4`, poster: `${DIR}/panel-colour-wheel.webp`, width: 932, height: 688 },
  brightness: { src: `${DIR}/panel-brightness.mp4`, poster: `${DIR}/panel-brightness-preview.webp`, width: 932, height: 940 },
  patterns: { src: `${DIR}/panel-patterns.mp4`, poster: `${DIR}/panel-patterns.webp`, width: 1280, height: 910 },
  tentacles: { src: `${DIR}/panel-tentacles.mp4`, poster: `${DIR}/panel-tentacles.webp`, width: 1280, height: 242 },
  funFacts: { src: `${DIR}/panel-fun-facts.mp4`, poster: `${DIR}/panel-fun-facts.webp`, width: 836, height: 690 },
}

const CLIPS = {
  glow: {
    src: `${DIR}/umbrella-glow.mp4`,
    poster: `${DIR}/umbrella-glow-poster.webp`,
    gif: `${DIR}/umbrella-glow.gif`,
  },
}

const FEATURES = [
  {
    text: 'Original jellyfish umbrella concept and form language',
    src: '/images/projects/jellyfish-progress-2.png',
    alt: 'The finished jellyfish umbrella held up, with its blue tentacles hanging from the canopy',
    width: 685,
    height: 913,
  },
  {
    text: 'Custom fabric and tentacle design for the umbrella',
    src: '/images/projects/jellyfish-progress-4.png',
    alt: 'Fabric tentacles draped over a chair while the umbrella canopy is fitted',
    width: 685,
    height: 913,
  },
  {
    text: 'Roly Poly Zine—full zine design and art direction',
    src: '/images/projects/jellyfish-zine/00-cover.webp',
    alt: 'Roly Poly Zine cover: the immortal jellyfish',
    width: 1275,
    height: 1650,
  },
  {
    text: 'Coherent visual and conceptual system across zine and product',
    src: '/images/projects/jellyfish-progress-6.png',
    alt: 'The glowing umbrella on display with the team in a hallway',
    width: 685,
    height: 913,
  },
]

// Team (add each person's site or LinkedIn as href)
const TEAM = [
  { name: 'Chloe Yip', href: 'https://chloeyip.xyz' },
  { name: 'Lauren Yip', href: 'https://laurenyip.com' },
  { name: 'Eric Cosma', href: null },
  { name: 'Matthew Nikolic', href: 'https://matthewnikolic.ca' },
]

const PROGRESS = [
  { n: 1, width: 1024, height: 768 },
  { n: 2, width: 685, height: 913 },
  { n: 3, width: 685, height: 913 },
  { n: 4, width: 685, height: 913 },
  { n: 5, width: 685, height: 913 },
  { n: 6, width: 685, height: 913 },
  { n: 7, width: 1024, height: 563 },
].map(({ n, width, height }) => ({
  src: `/images/projects/jellyfish-progress-${n}.png`,
  alt: `Jellyfish umbrella build progress, photo ${n}`,
  width,
  height,
}))

// 2x panel capture at its natural aspect ratio, shown at half its pixel width so it stays crisp.
function Still({ image, alt, caption, className = "" }) {
  return (
    <figure className={`jf-media ${className}`.trim()} style={{ width: image.width / 2, maxWidth: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={alt} width={image.width} height={image.height} loading="lazy" />
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

// Looping clip. Panel clips pass width/height (2x pixels) so they size like Still.
function Clip({ clip, label, children, className = '' }) {
  const sized = clip.width ? { width: clip.width / 2, maxWidth: '100%' } : undefined
  return (
    <figure className={`jf-media ${className}`.trim()} style={sized}>
      <video
        src={clip.src}
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
      >
        {children}
      </video>
    </figure>
  )
}

function Beat({ title, children, media, side = false }) {
  return (
    <div className={`jf-beat${side ? ' jf-beat--side' : ''}`}>
      <BodyText>
        <strong>{title}</strong> {children}
      </BodyText>
      {media}
    </div>
  )
}

export default function JellyfishCaseStudy({ onNext }) {
  return (
    <CaseStudy className="cs--jellyfish">
      <header className="cs-hero">
        <SectionHeading as="h1">Jellyfish Umbrella</SectionHeading>
        <BodyText>
          We wanted to create a project where art imitates nature. Inspired by our summers swimming with jellyfish on
          the BC Coast, we combined the familiar form of an umbrella with the novelty of lights and movement, to spark
          childrens&apos; interest in engineering.
        </BodyText>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: 'January 2026 - March 2026' },
            { label: 'Role', value: 'Product Designer & Artistic Director' },
            { label: 'Recognition', value: '3rd place at SFU FAS comp 2026' },
          ]}
        />
      </header>

      <CaseStudySection>
        <SectionLabel>The zine</SectionLabel>
        <BookViewer pages={ROLY_POLY_ZINE_PAGES} name="Roly Poly" kind="zine" pageWidth={306} pageHeight={396} />
        <p className="cs-next">
          <a href={ROLY_POLY_ZINE_PDF} target="_blank" rel="noopener noreferrer">
            View Project (PDF) →
          </a>
        </p>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The challenge</SectionLabel>
        <SectionHeading>Inspiring kids to learn and build by showing them what engineering can be.</SectionHeading>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The solution</SectionLabel>
        <BodyText>
          A cohesive vision across two outputs: a zine that documents and extends the world of the project, and a
          jellyfish umbrella with moving, light-up tentacles.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>My contribution</SectionLabel>
        <BodyText>
          I created the zine from concept to final design, defined the jellyfish umbrella concept, and designed the
          fabric and decorative elements so the object reads as a single, recognizable artifact.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Key features</SectionLabel>
        <ul className="jf-features">
          {FEATURES.map((feature) => (
            <li key={feature.text} className="jf-feature">
              <BodyText>{feature.text}</BodyText>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={feature.src} alt={feature.alt} width={feature.width} height={feature.height} loading="lazy" />
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Interactive control panel</SectionLabel>
        <BodyText className="jf-intro">
          I also designed the control panel that brings the umbrella to life. It talks to the ESP32 inside the umbrella
          over Wi-Fi: pick a colour, set the brightness, choose a pattern, move the tentacles, then send.
        </BodyText>

        <Beat
          side
          title="Colour wheel with a live readout."
          media={
            <Clip
              clip={PANEL_CLIPS.colourWheel}
              label="Dragging the colour wheel handle: the centre hex and the RED, GREEN, BLUE and HEX SENT values update live"
            />
          }
        >
          Drag the handle and the centre shows the hex code, with the red, green and blue values underneath. You see
          exactly what&apos;s being sent.
        </Beat>

        {/* [TODO: Lauren — needs clip: typing "sunset", "cotton candy" and "underwater" with the wheel jumping to each result. The AI call can't run locally: the panel repo mounts the route at /api/ai-color/ai-color, so /api/ai-color returns 404, and there's no Gemini key. panel-ai-colour.mp4 only records the "Couldn't get a colour" error.] */}
        <Beat
          side
          title="AI colour."
          media={
            <Still
              className="jf-media--ui"
              image={I.aiColour}
              alt="The Describe a colour field, with AI-generated helper text: describe a mood, memory, or feeling and we'll translate it into a colour"
            />
          }
        >
          I added a text-to-colour feature so people can describe a vibe like &quot;sunset&quot;, &quot;cotton
          candy&quot; or &quot;underwater&quot; instead of picking a hex.
        </Beat>

        <Beat
          side
          title="Brightness slider and live preview."
          media={
            <Clip
              clip={PANEL_CLIPS.brightness}
              label="Dragging the brightness slider: the live preview glow dims and brightens and the Brightness readout changes"
            />
          }
        >
          The LIVE PREVIEW shows the colour, pattern and brightness together, so you see the result before sending it
          to the physical umbrella.
        </Beat>

        <Beat
          title="Pattern picker with hover-to-preview."
          media={
            <>
              <Clip
                className="jf-media--ui"
                clip={PANEL_CLIPS.patterns}
                label="Hovering Twinkle, Rainbow, Pulse and Wave changes the live preview above, then clicking Wave selects it"
              />
              <div className="jf-pair">
                <Still
                  image={I.previewHover}
                  alt="Hovering Rainbow shows a green-to-blue jellyfish labelled Previewing: Rainbow, Cycles through all hues"
                  caption="Hovering Rainbow."
                />
                <Still
                  image={I.previewLive}
                  alt="The resting live preview shows a solid blue jellyfish labelled Solid, Brightness 192"
                  caption="The live preview of what will be sent."
                />
              </div>
            </>
          }
        >
          Five patterns: Solid, Twinkle, Rainbow, Pulse and Wave. Hover any pattern to preview it above, then click to
          choose it.
        </Beat>

        <Beat
          title="Tentacle modes with a live status line."
          media={
            <Clip
              className="jf-media--ui"
              clip={PANEL_CLIPS.tentacles}
              label="Clicking IN, OUT, CONTINUOUS and STOP while the status line updates, ending on Stopped — tentacles resting · State: resting"
            />
          }
        >
          IN, OUT, CONTINUOUS and STOP. The hardware is invisible from the screen, so the UI always says what state
          it&apos;s in: &quot;Stopped — tentacles resting.&quot;
        </Beat>

        <Beat
          title="Honest about the connection."
          media={
            <div className="jf-stack">
              <Still image={I.offline} alt="Offline status badge with a red dot" />
              <Still
                className="jf-media--ui"
                image={I.send}
                alt="Send to Jellyfish button, with helper text: Sends a 6-character hex colour + brightness to the ESP32 over Wi-Fi"
              />
              <Still
                className="jf-media--ui"
                image={I.sendError}
                alt="After pressing Send while offline: Failed — retry? with the message Could not reach the ESP32. Check Wi-Fi and IP address."
              />
            </div>
          }
        >
          An Offline badge, and helper text under Send that says what&apos;s going to the ESP32 over Wi-Fi. If the
          umbrella isn&apos;t connected, the panel never fails silently.
        </Beat>

        <Beat
          side
          title="Fun facts."
          media={
            <Clip
              clip={PANEL_CLIPS.funFacts}
              label="Clicking next fun fact through three facts while the counter goes from 1 / 10 to 4 / 10 and bubbles float behind"
            />
          }
        >
          A fun facts page keeps kids learning between interactions, one fact at a time.
        </Beat>

        <Beat
          title="Visual style."
          media={
            <Still
              className="jf-media--ui jf-media--ui-lg"
              image={I.panel}
              alt="The full control panel: colour wheel, brightness, live preview, patterns, tentacle movement and the Send to Jellyfish button on a dark navy background"
            />
          }
        >
          A dark navy UI with a cyan glow, chosen to match the umbrella&apos;s LEDs and the underwater theme.
        </Beat>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Send → glow</SectionLabel>
        <BodyText>
          The payoff: tap Send on screen, and the umbrella lights up. This was our first successful light up, at 1am.
        </BodyText>
        {/* [TODO: Lauren — needs clip: the phone recording (umbrella-send.mp4) of tapping "Send to Jellyfish" and the umbrella lighting up, for a synced send → glow split-screen. This clip is the umbrella only, 0.00–2.33s of jellyfish-progress-video.mp4 played forward then back.] */}
        <Clip clip={CLIPS.glow} className="jf-media--glow" label="The jellyfish umbrella glowing blue on a table">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CLIPS.glow.gif} alt="The jellyfish umbrella glowing blue on a table" />
        </Clip>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Project progress</SectionLabel>
        <div className="jf-masonry">
          <figure className="jf-media jf-media--video">
            <video className="cs-video" src="/images/projects/jellyfish-progress-video.mp4" controls playsInline />
          </figure>
          {PROGRESS.map((image) => (
            <figure key={image.src} className="jf-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
            </figure>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The team</SectionLabel>
        <BodyText>
          Built with the rest of the Roly-Polies:{' '}
          {TEAM.map((member, i) => (
            <span key={member.name}>
              {member.href ? (
                <a href={member.href} target="_blank" rel="noopener noreferrer">
                  {member.name}
                </a>
              ) : (
                member.name
              )}
              {i < TEAM.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </BodyText>
      </CaseStudySection>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
