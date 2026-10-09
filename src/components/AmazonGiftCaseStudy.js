'use client'

import { Body, Heading, Img, Label, Meta, NextLink, gap } from './caseStudy/FramerStudy'
import './AmazonGiftCaseStudy.css'

const dir = '/images/projects/amazon-giftwrapping/case-study'
const I = {
  hero: `${dir}/hero.gif`,
  brief: `${dir}/brief.png`,
  redditGiftBags: `${dir}/reddit-gift-bags.png`,
  redditDoNotUse: `${dir}/reddit-do-not-use.png`,
  giftBag: `${dir}/gift-bag.png`,
  redditSadTortilla: `${dir}/reddit-sad-tortilla.png`,
  checkoutAnnotated: `${dir}/checkout-annotated.webp`,
  lofiFlow: `${dir}/lofi-flow.png`,
  lofiNotes: `${dir}/lofi-notes.png`,
  iteration1: `${dir}/iteration-1.png`,
  iteration2: `${dir}/iteration-2.png`,
  tshirtAnnotated: `${dir}/tshirt-annotated.webp`,
  desktopWrapping: `${dir}/desktop-wrapping.png`,
  desktopCard: `${dir}/desktop-card.png`,
  paperPicker: `${dir}/paper-picker.mp4`,
  paperPickerGif: `${dir}/paper-picker.gif`,
  paperPickerPoster: `${dir}/paper-picker-poster.webp`,
  mobileWrapping: `${dir}/mobile-wrapping.jpg`,
  mobileCard: `${dir}/mobile-card.jpg`,
  mobileCardBirthday: `${dir}/mobile-card-birthday.png`,
  logo: `${dir}/logo.png`,
  logoGiftWrapping: `${dir}/logo-gift-wrapping.webp`,
}

const FINALS = [
  { src: I.mobileWrapping, alt: 'Mobile: choose wrapping paper, ribbon colour and width', label: 'Every pick shows up on the box' },
  { src: I.mobileCard, alt: 'Mobile: choose a card and write a message', label: 'Card and message live in the same flow' },
  { src: I.mobileCardBirthday, alt: 'Mobile: a Happy Birthday card selected', label: 'The card preview updates with the design' },
]

// Full-width blue band holding one or two prototype shots.
function Band({ children, className = '', space }) {
  return (
    <div className={`fs-bleed agcs-band ${className}`.trim()} style={space}>
      {children}
    </div>
  )
}

// Caption under an image group, in the page's normal body text style.
function Caption({ children, space, className = '' }) {
  return (
    <Body space={space} className={className}>
      {children}
    </Body>
  )
}

// Samsung Galaxy-style bezel: thin rounded frame, side keys and a centred punch-hole camera. Pure CSS.
// `width` is the outer width in px; the screen inside keeps whatever aspect ratio its content has.
function PhoneShell({ children, width = 286, className = '' }) {
  return (
    <div className={`agcs-shell ${className}`.trim()} style={{ '--shell-w': `${width}px` }}>
      <div className="agcs-shell-screen">
        {children}
        <span className="agcs-shell-cam" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function AmazonGiftCaseStudy({ onNext }) {
  return (
    <div className="fs agcs">
      <article className="fs-page">
        <div className="agcs-topspace" aria-hidden="true" />
        <Img src={I.hero} alt="Amazon cart with the Send as a gift option" className="agcs-hero" eager />

        <Heading as="h1" space={gap(24, 24, 216)}>
          An improved gift wrapping and card customization experience for Amazon
        </Heading>
        <Body space={gap(14, 19, 42)}>Because we care about making gifts feel personal and special :)</Body>

        <Meta
          space={gap(34, 29)}
          items={[
            { label: 'TIMELINE', value: '5.5 days (SparkJam 2026)' },
            { label: 'ROLE', value: 'Product Designer' },
            { label: 'RECOGNITION', value: '🏆 Best UI Design', phoneValue: 'People said it was cool' },
          ]}
        />

        <Label space={gap(0, 29)}>THE BRIEF</Label>
        <Heading space={gap(16, 16, 173)}>
          Add a new creation-centric feature to a typically non-creation-oriented experience
        </Heading>
        <Body space={gap(14, 51, 105)}>
          Create an experience that allows users to imagine, think, and build through a research backed extension
          that would exist within or alongside a current experience.
        </Body>
        <Img src={I.brief} alt="" className="fs-bleed agcs-brief" space={gap(51, 22)} />

        <Label space={gap(24)}>RESEARCH</Label>
        <Heading space={gap(24)}>Something Amazon has somehow never gotten right</Heading>
        <Body space={gap(24, 24, 105)}>
          We started by surveying 24 real people how they shop for gifts online. Over 70% of Amazon users had{' '}
          <em>never</em> used the gift wrapping or note feature. It just wasn&apos;t worth using.
        </Body>
        <Body space={gap(16)}>
          We asked how often they buy on Amazon, what makes it a good place to buy gifts, whether they use gift
          wrap and gift notes, and what makes those features worthwhile or hard to use. [TODO: Lauren — which
          finding besides the 70% most shaped the design?]
        </Body>

        <Label space={gap(46, 47)}>LOOK AT THE STATE OF YOU…</Label>
        <div className="agcs-reddit" style={gap(81, 36)}>
          <Img src={I.redditGiftBags} alt="Reddit comment: the gift bags are poor quality and ugly" className="agcs-reddit-1" />
          <Img src={I.redditDoNotUse} alt="Reddit post: Do not use amazon gift wrapping" className="agcs-reddit-2" />
          <Img src={I.giftBag} alt="An Amazon gift bag" className="agcs-reddit-3" />
          <Img src={I.redditSadTortilla} alt="Reddit comment comparing Amazon's gift bag to a sad tortilla" className="agcs-reddit-4" />
        </div>
        <Caption space={gap(24)}>What people online say about Amazon&apos;s gift bags.</Caption>

        <Body space={gap(56, 40)}>
          And today, it all hangs on one small checkbox under Proceed to Checkout.
        </Body>
        <Img
          src={I.checkoutAnnotated}
          alt="Amazon's mobile cart with the small Send as a gift checkbox circled: the whole gifting experience starts here"
          className="agcs-annotated agcs-checkout"
          space={gap(32, 24)}
        />
        <Caption space={gap(12)}>Amazon&apos;s cart today. The whole gifting experience starts at this checkbox.</Caption>

        <Label space={gap(111, 79)}>PROTOTYPING</Label>
        <Heading space={gap(16)}>What goes in a gift wrapping portal?</Heading>
        <Body space={gap(16, 16, 126)}>
          Our lo-fi contained a lot of features we might bring into a version 2: wax seals and stickers for the
          card envelope, tissue paper and confetti in a lidded box, uploading your own images to be the wrapping
          paper or card design.
        </Body>
        <Band className="agcs-band--lofi" space={gap(80, 29)}>
          <Img src={I.lofiFlow} alt="Lo-fi flow" className="agcs-lofi-flow" />
          <Img src={I.lofiNotes} alt="Lo-fi wireframes and feature notes" className="agcs-lofi-notes" />
        </Band>
        <Caption space={gap(12)}>Lo-fi flow and feature notes.</Caption>

        <Heading space={gap(55, 34)}>First Iteration</Heading>
        <Body space={gap(16)}>
          Inspired by dress-up games and 3D modelling softwares. We realized it wasn&apos;t intuitive enough and it
          was too far from Amazon&apos;s style.
        </Body>
        <Body space={gap(16)}>
          It had undo/redo and click-and-drag to rotate. I dropped undo/redo in the final: every choice is a single
          tap to switch back, so undo/redo was redundant.
        </Body>
        <Band space={gap(55, 34)}>
          <Img src={I.iteration1} alt="First iteration: a 3D gift box editor" className="agcs-iteration" />
        </Band>
        <Caption space={gap(12)}>Iteration 1: a 3D editor with undo/redo and click-and-drag to rotate.</Caption>

        <Heading space={gap(40, 43)}>Second Iteration</Heading>
        <Body space={gap(16, 16, 126)}>
          We looked at Amazon&apos;s T-shirt customization flow this time. I pushed a pivot with 6 hours til
          submission, because I strongly believed that this was more intuitive and a better user experience
          overall, and a mentor critique pointed the same way.
        </Body>
        <Body space={gap(16)}>
          Following Amazon&apos;s custom t-shirt flow, with the preview on the left, options on the right, price
          fixed at the bottom.
        </Body>
        <Band className="agcs-band--auto" space={gap(52, 50)}>
          <Img
            src={I.tshirtAnnotated}
            alt="Amazon's T-shirt customizer, annotated: preview on the left, options on the right, price fixed at the bottom"
            className="agcs-tshirt agcs-desk"
          />
          <Img src={I.iteration2} alt="Amazon's T-shirt customization flow" className="agcs-iteration agcs-phone" />
        </Band>

        <Label space={gap(48)}>FINAL SUBMISSION</Label>
        <Heading space={gap(12, 16, 86)}>Last minute decision to take this to mobile</Heading>
        <Body space={gap(16, 51, 126)}>
          We had almost settled on this for our final submission, but we never settle!! I suggested that we take
          our mentor&apos;s advice: over our 4 critique sessions, 2 of them suggested that gifters on the go would
          be purchasing from their phones.
        </Body>
        <Body space={gap(16)}>The layout went vertical, and the flow became one step at a time.</Body>
        <div className="agcs-desktops" style={gap(31)}>
          <Img src={I.desktopWrapping} alt="Desktop gift wrapping customizer" className="agcs-desktop" />
          <Img src={I.desktopCard} alt="Desktop card customizer" className="agcs-desktop" />
        </div>
        <Caption space={gap(12)}>The desktop version we almost submitted.</Caption>

        <Label space={gap(48)}>VISUAL DESIGN</Label>
        <Heading space={gap(12, 16)}>A real Amazon feature, not a concept</Heading>
        <Body space={gap(16)}>
          I kept Amazon&apos;s yellow CTA and near-black header exactly, for brand fidelity. This should feel like a
          real Amazon feature, not a concept that ignores the brand.
        </Body>
        <Body space={gap(16)}>
          The one addition is the &ldquo;amazon gift wrapping&rdquo; sub-lockup with a bow. It adds some flair and
          sets the feature apart, the way Amazon&apos;s other sub-brand logos like Prime do.
        </Body>
        <div className="agcs-lockup" style={gap(32, 24)}>
          <Img src={I.logoGiftWrapping} alt="amazon gift wrapping sub-lockup with a bow" />
        </div>

        <Label space={gap(48)}>FINAL SCREENS</Label>
        <Heading space={gap(10, 10, 86)}>Customize each gift and card</Heading>
        <Band className="agcs-band--auto" space={gap(24, 16)}>
          <PhoneShell width={286} className="agcs-shell--clip">
            <video
              className="fs-img agcs-clip"
              src={I.paperPicker}
              poster={I.paperPickerPoster}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Tapping through wrapping papers: the box rewraps in each one"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={I.paperPickerGif} alt="Tapping through wrapping papers: the box rewraps in each one" />
            </video>
          </PhoneShell>
        </Band>
        <Caption space={gap(12)}>Pick a paper and the box rewraps in it.</Caption>

        <div className="agcs-screens" style={gap(40, 24)}>
          {FINALS.map((s) => (
            <figure key={s.src}>
              <PhoneShell width={286}>
                <Img src={s.src} alt={s.alt} className="agcs-screen-img" />
              </PhoneShell>
              <Body className="agcs-screen-label">{s.label}</Body>
            </figure>
          ))}
        </div>
        <Caption space={gap(12)}>The final mobile screens.</Caption>

        <Label space={gap(59, 33)}>IN THE FUTURE</Label>
        <Heading space={gap(9, 9, 130)}>Adding smart suggestions and auto suggestions</Heading>
        <Body space={gap(7, 31)}>
          Based on the time of year and on the user&apos;s previous history, we want to suggest wrapping paper
          styles and card messages tailored to the receiver.
        </Body>

        <Label space={gap(60)}>REFLECTIONS</Label>
        <Body space={gap(10, 10, 105)}>
          I don&apos;t mind last minute changes and working past midnight if it&apos;s with a team like this ;)
          <br />I worked with{' '}
          <a href="https://ca.linkedin.com/in/kelgi" target="_blank" rel="noopener noreferrer">
            Kelly Nguyen
          </a>
          ,{' '}
          <a href="https://isabellekwan.ca" target="_blank" rel="noopener noreferrer">
            Isabelle Kwan
          </a>
          , and{' '}
          <a href="https://sophiadt.ca/" target="_blank" rel="noopener noreferrer">
            Sophia Don Tranho
          </a>
          .
        </Body>

        <NextLink onNext={onNext} space={gap(174, 130)} />

        <div className="fs-bleed agcs-footer" style={gap(52, 88)}>
          <Img src={I.logo} alt="amazon gift wrapping" />
        </div>
      </article>
    </div>
  )
}
