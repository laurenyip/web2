'use client'

import { useState } from 'react'
import {
  BodyText,
  CaseStudy,
  CaseStudySection,
  NextCaseStudy,
  ProjectMeta,
  SectionHeading,
  SectionLabel,
} from './shared'
import './shared/CaseStudy.css'
import './SoundbookCaseStudy.css'

const P = '/images/projects/soundbook/case-study'
const LIVE_URL = 'https://laurenyip.github.io/svsd/'

/** The real app, in a phone-sized frame. It only loads on tap, so the page doesn't ask for the mic on open. */
function LiveDemo() {
  const [started, setStarted] = useState(false)
  return (
    <div className="sb-live">
      <div className="sb-live-stage">
        <div className="sb-live-phone">
          {started ? (
            <iframe
              className="sb-live-frame"
              src={LIVE_URL}
              title="SoundBook, running live"
              allow="microphone; autoplay"
              loading="lazy"
            />
          ) : (
            <button type="button" className="sb-live-start" onClick={() => setStarted(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}/app-icon.webp`} alt="" width={72} height={72} />
              <span>Tap to open SoundBook</span>
            </button>
          )}
        </div>
      </div>
      <p className="cs-body sb-live-note">
        This is the real app. Allow the microphone and make an SSS or SHH to move the story.
        <br />
        <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
          Open it full screen →
        </a>
      </p>
    </div>
  )
}

function Figure({ src, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`sb-fig ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

/**
 * `crop` shows one band of the recording ({ x, y, w, h } in the video's own pixels) inside a frame of
 * `frameRatio`, placed so the video's `anchorY` sits `anchorAt` (0–1) of the way down the frame.
 */
function cropStyles({ videoWidth, x, y, w, h, frameRatio, anchorY, anchorAt }) {
  const frameH = w / frameRatio
  const bandTop = anchorAt * frameH - (anchorY - y)
  return {
    frame: { aspectRatio: String(frameRatio) },
    band: { top: `${(bandTop / frameH) * 100}%`, height: `${(h / frameH) * 100}%` },
    // margins in % resolve against the band's width, which is the crop width
    video: { width: `${(videoWidth / w) * 100}%`, marginLeft: `${(-x / w) * 100}%`, marginTop: `${(-y / w) * 100}%` },
  }
}

/** `loopEnd` (seconds) restarts the clip early, skipping a still tail at the end of the recording. */
function Clip({ name, label, caption, className = '', crop, loopEnd }) {
  const styles = crop ? cropStyles(crop) : null
  const video = (
    <video
      src={`${P}/${name}.mp4`}
      poster={`${P}/${name}-poster.webp`}
      aria-label={label}
      autoPlay
      loop
      muted
      playsInline
      style={styles?.video}
      onTimeUpdate={
        loopEnd
          ? (event) => {
              if (event.currentTarget.currentTime >= loopEnd) event.currentTarget.currentTime = 0
            }
          : undefined
      }
    />
  )
  return (
    <figure className={`sb-fig ${className}`.trim()}>
      {crop ? (
        <div className="sb-crop" style={styles.frame}>
          <div className="sb-crop-band" style={styles.band}>
            {video}
          </div>
        </div>
      ) : (
        video
      )}
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

export default function SoundbookCaseStudy({ onNext }) {
  return (
    <CaseStudy className="cs--soundbook">
      <header className="cs-hero">
        <SectionHeading as="h1">SoundBook. A storybook that lets children see their voice</SectionHeading>
        <BodyText>
          SoundBook is a mobile storybook for deaf and hard-of-hearing children who are practising speech sounds. The
          child makes a sound to move the story forward, and the app shows how that sound is landing, so practice
          doesn&apos;t depend on hearing it.
        </BodyText>
        <ProjectMeta
          items={[
            { label: 'Timeline', value: '5 days - Oct 2026' },
            { label: 'Event', value: 'Silicon Valley School of Design competition' },
            {
              label: 'Team',
              value: (
                <>
                  Lauren Yip
                  <br />
                  Riya Daiya
                </>
              ),
            },
          ]}
        />
      </header>

      <Figure
        src={`${P}/hero-1.webp`}
        alt="Three phones showing SoundBook: the story list, a story page with a pitch slider, and a weekly practice summary"
        width={1600}
        height={900}
        caption="See what your voice looks like."
      />

      <CaseStudySection>
        <SectionLabel>Try it</SectionLabel>
        <SectionHeading>SoundBook, running live</SectionHeading>
        <LiveDemo />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The problem</SectionLabel>
        <SectionHeading>Some sounds can&apos;t be heard, so they&apos;re hard to copy</SectionHeading>
        <BodyText>
          Hearing aids and cochlear implants don&apos;t pick up certain high frequencies, like the &ldquo;ch&rdquo;,
          &ldquo;sh&rdquo;, &ldquo;ff&rdquo; and &ldquo;th&rdquo; sounds. Riya couldn&apos;t tell &quot;chair&quot; from
          &quot;share&quot; for years.
        </BodyText>
        <BodyText>
          Children usually work on this in speech therapy, where a therapist and a parent help them make sounds they
          can&apos;t hear. Practice is meant to continue outside sessions, but it gets slow and frustrating when there&apos;s
          no way to tell whether a sound is right.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>The idea</SectionLabel>
        <SectionHeading>Make the voice visible, and let it drive the story</SectionHeading>
        <BodyText>
          A parent or therapist picks a family of sounds to practise, and each family has its own story. The adult reads
          along, and the child has to make the sound to move the plot: a long SSS to call Sid the snake&apos;s friend, a
          soft SHH to help a stuck ship sail.
        </BodyText>
        <Figure
          src={`${P}/hero-2.webp`}
          alt="Two story pages: Sid the snake calling a friend with a long SSS, and Sid and Snip helping a ship move with a soft SHH"
          width={1600}
          height={900}
          caption="Every sound moves the story."
        />
        <BodyText className="sb-after-fig">
          Knowing you&apos;ve made a sound correctly also tells you how to shape your mouth to make it again, like where to
          put your tongue so the air can flow out. The app is a visual aid and engagement strategy for building that muscle
          memory, rather than relying on hearing the child may not have.
        </BodyText>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Who it&apos;s for</SectionLabel>
        <SectionHeading>The child, the parent and the therapist</SectionHeading>
        <BodyText>
          The child uses it to learn and practice. The parents and therapist see every badge and track the progress
          through statistics that we collect and visualize.
        </BodyText>
        <Figure
          src={`${P}/hero-4.webp`}
          alt="Three SoundBook screens: the child's story, the parent's badge collection, and the therapist's practice summary"
          width={1600}
          height={900}
          caption="Built for the child, the parent and the therapist."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Process</SectionLabel>
        <SectionHeading>Using AI to explore, and our own judgement to decide</SectionHeading>
        <BodyText>
          We used Claude Code to generate a lot of options quickly: logo designs, particle stars, glowing orbs, glass
          sliders, and dark and light themes. For each one we asked what would actually work for a five-year-old with a
          cochlear implant, and we had Riya&apos;s lived experience to check those decisions against.
        </BodyText>
        <Figure
          src={`${P}/ai-directions.webp`}
          alt="A wall of explored directions: particle stars, glowing orbs, glass sliders, dark app screens and logo options"
          width={1600}
          height={728}
          caption="Some of the directions we generated and sorted through."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Decisions</SectionLabel>
        <SectionHeading>Three things we changed our minds on</SectionHeading>

        <BodyText>
          The particle star was beautiful, and it showed success unidirectionally. What I hadn&apos;t fully understood
          was that the bigger problem isn&apos;t only succeeding, it&apos;s telling similar sounds apart. A slider
          gives the child a guide for which way to adjust.
        </BodyText>
        <div className="sb-phones">
          <Clip name="particle-stars" label="The particle star that lights up when a sound is right" caption="The particle star." />
          <Clip name="slider-sss" label="The slider showing which way to adjust" caption="The slider." />
        </div>

        <BodyText>
          I wanted a glass knob over the indicator to work like a magnifying glass. We went with a simpler circle
          indicator that made the most sense for the user.
        </BodyText>
        <div className="sb-duo">
          <Clip name="glass-sliders" label="The glass knob over the slider" caption="The glass knob." />
          <Clip
            name="slider-sss"
            label="The final prototype's slider: a soft dot moving toward the dashed SSS target"
            caption="The slider in the final prototype."
            className="sb-fig--white"
            crop={{
              // the slider band of the 400×838 phone recording, inside the bezel and clear of the mic button
              videoWidth: 400,
              x: 13,
              y: 562,
              w: 373,
              h: 124,
              // framed like the glass knob clip beside it (800×456), track centred at the same height
              frameRatio: 800 / 456,
              anchorY: 604.5,
              anchorAt: 203 / 456,
            }}
            loopEnd={10.5}
          />
        </div>

        <BodyText>
          Dark mode was polished and looked slick, with stars and lights. We went with the light, colourful storybook
          because our research told us kids find light mode easier to read from and more familiar. Sleep interference
          wasn&apos;t something we considered too much, since the app is meant to be used in the daytime when the child is
          most focused and ready to learn.
        </BodyText>
        <Figure
          src={`${P}/dark-light-themes.webp`}
          alt="The same screens in a dark theme with stars and lights, and a light colourful storybook theme"
          width={1800}
          height={332}
          caption="Dark theme on the left, light storybook theme on the right."
        />
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Our own ideas</SectionLabel>
        <SectionHeading>Pages that flip, a target to aim for, and a silhouette</SectionHeading>
        <BodyText>
          On top of what AI gave us, we added three ideas of our own: pages that only flip one way, a dotted target zone,
          and a silhouette of who is about to appear.
        </BodyText>
        <div className="sb-phones">
          <Clip name="pages-flip" label="A story page flipping forward" caption="Pages that flip in one direction." />
          <Clip
            name="slider-shh"
            label="The final prototype's slider: a soft SHH moves the dot into the dashed target to help the ship sail"
            caption="The slider, in the full app."
          />
        </div>
        <BodyText className="sb-after-fig">A dotted target zone shows where to aim.</BodyText>
        <Clip
          name="dotted-target"
          label="The dotted target zone the child aims for"
          className="sb-fig--narrow"
        />
        <BodyText className="sb-after-fig">A silhouette hints at who is about to appear.</BodyText>
        <Clip
          name="silhouette"
          label="A silhouette of Sid's friend that turns into the friend when the child makes the sound"
          className="sb-fig--medium"
          crop={{
            // the 800×714 recording without its black side bars, the close button and the strip of page below
            videoWidth: 800,
            x: 10,
            y: 62,
            w: 780,
            h: 639,
            frameRatio: 780 / 639,
            anchorY: 62,
            anchorAt: 0,
          }}
        />
        <BodyText className="sb-after-fig">
          We also redrew the characters. The first set was simple and flat, and the new Sid and squirrel are more
          expressive and easier for a child to connect with.
        </BodyText>
        <div className="sb-duo">
          <Figure
            src={`${P}/characters-before.webp`}
            alt="The first version of Sid the snake and a mouse in a flat illustration style"
            width={900}
            height={553}
            caption="Before."
            className="sb-fig--chars"
          />
          <Figure
            src={`${P}/characters-after.webp`}
            alt="The redesigned Sid the snake and a squirrel in a richer illustration style"
            width={900}
            height={585}
            caption="After."
            className="sb-fig--chars"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection>
        <SectionLabel>Reflections</SectionLabel>
        <SectionHeading>AI gave us a starting point, not the answer</SectionHeading>
        <BodyText>
          AI has never been this easy to use. It always gave us a good place to start, but we challenged its assumptions at
          every design touchpoint and pushed the quality higher with each iteration.
        </BodyText>
      </CaseStudySection>

      <figure className="sb-fig sb-video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/Q-yDGDBv2L4"
          title="SoundBook"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </figure>

      {onNext ? <NextCaseStudy onClick={onNext} /> : null}
    </CaseStudy>
  )
}
