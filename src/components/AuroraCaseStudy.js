'use client'

import { Body, Heading, Img, Label, Meta, NextLink, gap } from './caseStudy/FramerStudy'
import './AuroraCaseStudy.css'

const I = {
  hero: '/images/projects/aurora/case-study/hero.gif',
  ideaQuestion: '/images/projects/aurora/case-study/idea-question.png',
  ideaFuneral: '/images/projects/aurora/case-study/idea-funeral.png',
  ideaCostPlus: '/images/projects/aurora/case-study/idea-costplus.png',
  ideaFelix: '/images/projects/aurora/case-study/idea-felix.png',
  ideaChewy: '/images/projects/aurora/case-study/idea-chewy.png',
  gap: '/images/projects/aurora/case-study/gap.png',
  felisRx: '/images/projects/aurora/case-study/felis-rx.png',
  koala: '/images/projects/aurora/case-study/koala.png',
  koalaMenu: '/images/projects/aurora/case-study/koala-menu.png',
  auroraMenu: '/images/projects/aurora/case-study/aurora-menu.png',
  faq: '/images/projects/aurora/case-study/faq.png',
  aiDirections: '/images/projects/aurora/case-study/ai-directions.png',
  brandGuidelines: '/images/projects/aurora/case-study/brand-guidelines.png',
  // Cropped from the Aurora pitch deck
  homepage: '/images/projects/aurora/case-study/deck-homepage.webp',
  medication: '/images/projects/aurora/case-study/deck-medication.webp',
  howItWorks: '/images/projects/aurora/case-study/deck-how-it-works.webp',
  cart: '/images/projects/aurora/case-study/deck-cart.webp',
  checkout: '/images/projects/aurora/case-study/deck-checkout.webp',
  tracker: '/images/projects/aurora/case-study/deck-confirmation-tracker.webp',
  orderSummary: '/images/projects/aurora/case-study/deck-confirmation-summary.webp',
  guarantee: '/images/projects/aurora/case-study/deck-confirmation-guarantee.webp',
  support: '/images/projects/aurora/case-study/deck-confirmation-support.webp',
}

const FEEL = ['Safe, secure, calm', 'Like they’re saving time and money', 'Like they’re making a good decision']
const BRAND = ['Premium', 'Transparent', 'Honest']

// Image with the original's 1px teal frame and rounded corners.
function Framed({ src, alt, className = '', space }) {
  return (
    <div className={`fs-framed ${className}`.trim()} style={space}>
      <Img src={src} alt={alt} />
    </div>
  )
}

export default function AuroraCaseStudy({ onNext }) {
  return (
    <div className="fs aucs">
      <article className="fs-page">
        <div className="fs-bleed aucs-hero">
          <Img src={I.hero} alt="Aurora Pet Co. home page" eager />
        </div>

        <Heading as="h1" space={gap(24)}>
          Designed an end-to-end subscription pharmacy for Canadian pet owners managing chronic conditions.
        </Heading>
        <Body space={gap(14, 10)}>
          I worked on this first for an ideation pitch for the Cansbridge x Simple Ventures Pitch competition in
          July 2025, and then as a concept project with Simple Ventures.
        </Body>

        <Meta
          space={gap(23)}
          items={[
            { label: 'TIMELINE', value: 'July, October 2025' },
            { label: 'ROLE', value: 'Product Designer & PM' },
            { label: 'RECOGNITION', value: 'Top 4 finalist /20' },
          ]}
        />

        <Label space={gap(0)}>THE CHALLENGE</Label>
        <Heading space={gap(16, 16, 130)}>Validating a proven model for the Canadian market</Heading>
        <Body space={gap(18, 18, 126)}>
          This was the initial prompt for the ideation pitch competition: business ideas that are successful in
          other countries, that have yet to be introduced to Canada. I had one week to put together a pitch (and
          fly to Toronto to present it!!)
        </Body>

        <Label space={gap(25, 36)}>EARLY IDEAS</Label>
        <div className="aucs-ideas" style={gap(52, 25)}>
          <Img src={I.ideaQuestion} alt="A figure leaning on a giant question mark" className="aucs-idea-question" />
          <Img src={I.ideaFuneral} alt="Pet memorial icon" className="aucs-idea-square" />
          <Img src={I.ideaCostPlus} alt="Mark Cuban Cost Plus Drug Company" className="aucs-idea-wide" />
          <Img src={I.ideaFelix} alt="felix logo" className="aucs-idea-square" />
          <Img src={I.ideaChewy} alt="Chewy Health logo" className="aucs-idea-square" />
        </div>
        <div className="aucs-idea-notes" style={gap(56, 26)}>
          <p className="fs-body" style={gap(0, 0, 84)}>
            I know people can spend a lot of money on pets and pet health. I thought about pet funeral services,
            then I found out they already exist here…
          </p>
          <p className="fs-body" style={gap(0, 0, 105)}>
            My mentor suggested I look into Mark Cuban&apos;s Cost Plus Drugs. He sells drugs at wholesale + a
            transparent 15% markup. But this was not something Canada needed.
          </p>
          <p className="fs-body" style={gap(0, 0, 168)}>
            I researched felix, a company that offers telehealth consultations and delivers specialty drugs and
            treatments. I saw an opportunity: &quot;Felix for Pets&quot;
            <br />
            <br />I found an American company &quot;Chewy Health&quot; running an online pet pharmacy—validating my
            idea!
          </p>
        </div>

        <Label space={gap(73, 62)}>THE GAP</Label>
        <Img src={I.gap} alt="A vet buried in paperwork beside a long queue of pets" className="aucs-gap" space={gap(1, 0)} />
        <Body>
          Canada has <strong>16M+ pet owners</strong> and no dominant online pet pharmacy. Chronic conditions like
          diabetes, arthritis, and thyroid disease require consistent medication — but owners are stuck calling
          vets, waiting on physical pharmacies, and overpaying with no subscription option.
        </Body>
        <Body space={gap(24)}>An unmet need meets regulatory barriers…</Body>

        <Label space={gap(58, 36)}>FIRST PROTOTYPE</Label>
        <div className="fs-bleed aucs-prototype" style={gap(22, 5)}>
          <Framed src={I.felisRx} alt="FELIS RX, the first prototype" className="aucs-felis" />
        </div>
        <Body space={gap(24, 24, 147)}>
          This was my first prototype that I presented to the panel of judges and my Cansbridge peers! I did my
          best to put my vision to life in the time constraint, placing in the top 4 for my research and ideation
          pitch, winning a spot at a future company dinner.
        </Body>

        <Label space={gap(30, 44)}>THE BRIEF</Label>
        <Heading space={gap(16, 16, 216)}>
          How might we make pet medication affordable and accessible for every Canadian pet owner?
        </Heading>
        <Body space={gap(15, 45, 63)}>
          This time, I was working for Simple Ventures on a landing page based on Koala.Health
        </Body>
        <Framed src={I.koala} alt="Koala.Health home page" className="aucs-koala aucs-pan" space={gap(28, 25)} />
        <Body space={gap(16, 15, 42)}>My supervisor told me to emulate their premium, trustworthy feeling.</Body>

        <Label space={gap(47, 28)}>BRAINSTORMING</Label>
        <Heading space={gap(15, 16)}>How do I make this better?</Heading>
        <div className="aucs-pair aucs-menus" style={gap(34, 21)}>
          <Framed src={I.koalaMenu} alt="Koala's Cat menu" className="aucs-pan" />
          <Framed src={I.auroraMenu} alt="Aurora's Medications menu, sorted by condition" className="aucs-pan" />
        </div>
        <Body space={gap(13, 15)}>
          Koala splits everything into Cat and Dog tabs, so the same products show up twice. I sorted the menu by
          what the owner is actually treating instead, and added a dog/cat filter inside each of the Medications,
          Treatments, and Nutrition &amp; Wellness pages. I also introduced sorting to the FAQ page.
        </Body>
        <Framed src={I.faq} alt="Aurora's FAQ page with sorting" className="aucs-faq aucs-pan" space={gap(24, 17)} />

        <Label space={gap(64, 48)}>DESIGN CHALLENGE</Label>
        <Heading space={gap(15, 16)}>Designing for trust</Heading>
        <Body space={gap(16)}>
          Aurora asks people to buy their pet&apos;s prescription medication online, from a brand they&apos;ve never
          heard of. That only works if they trust it. So before designing any screens, I defined the feeling I was
          designing for, and every decision after this traces back to it.
        </Body>
        <div className="aucs-trust" style={gap(28, 24)}>
          <div>
            <p className="fs-label">HOW THE CUSTOMER SHOULD FEEL</p>
            <ul className="fs-body aucs-list">
              {FEEL.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="fs-label">WHAT THE BRAND NEEDS TO BE</p>
            <ul className="fs-body aucs-list">
              {BRAND.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Framed src={I.aiDirections} alt="Two AI-generated directions: clinical and playful" className="aucs-directions aucs-pan" space={gap(36, 28)} />
        <Body space={gap(22, 20)}>
          Before committing to a design language, I used AI to rapid-prototype two directions: clinical/medical,
          with realistic images and red/blue colours, and playful/pet-first, with casual pet illustrations. The
          first felt like a hospital website, and the second undermined credibility. Neither felt premium, and
          neither felt calm.
        </Body>
        <Body space={gap(16)}>Aurora had to be two things at once:</Body>
        <ul className="fs-body aucs-list" style={gap(12)}>
          <li>
            <strong>Affordable</strong> — subscription pricing, transparent costs, no surprise markups
          </li>
          <li>
            <strong>Trustworthy</strong> — vet-backed, prescription-validated, not a grey-market workaround
          </li>
        </ul>

        <Label space={gap(72, 56)}>DESIGN DECISIONS</Label>

        <Heading space={gap(15, 16)}>Homepage: look expensive</Heading>
        <Framed src={I.homepage} alt="Aurora home page: a dog sniffing a dropper next to “Pet health made easy.”" space={gap(24, 20)} />
        <Body space={gap(20)}>
          The homepage has a few seconds to say &quot;premium&quot; before anyone reads a word, so I led with
          expensive-looking imagery: a close-up photo of a dog and a dropper instead of illustrations or product
          shots. The copy covers the value side: no shipping cost, no hidden fees.
        </Body>
        <Body space={gap(12)}>I chose this image for its clear, beautiful lighting. It reminds me of Aesop, and the dropper makes it look
          like a premium skincare ad.</Body>

        <Heading space={gap(56, 44)}>Medication: a banner of proof</Heading>
        <Framed src={I.medication} alt="Allergy Relief page under a pink trust banner" space={gap(24, 20)} />
        <Body space={gap(20)}>
          Every medication page sits under a trust banner: 4.8/5 from 18k reviews, no shipping fees, perfect for
          pets with chronic conditions, trusted by vets, secure checkout, free refills. Each one is a legitimacy
          or value signal, so &quot;is this real?&quot; and &quot;is this worth it?&quot; are answered before the
          customer has to ask.
        </Body>
        <Body space={gap(12)}>
          [TODO: Lauren — why a banner across every page rather than placing these signals next to the price or
          the Add to cart button?]
        </Body>

        <Heading space={gap(56, 44)}>How it works: show the savings</Heading>
        <Framed src={I.howItWorks} alt="Apoquel product page: buy once vs Autoship, and a price comparison table" className="aucs-how" space={gap(24, 20)} />
        <Body space={gap(20)}>
          Autoship is cheaper, so I show exactly how much. Buy once is $114; Autoship is $99.60, 13% cheaper. Under
          the button, a table compares the price per tablet and per 60 tablets at a vet clinic ($3.20 / $192), a
          big box pet store ($2.40 / $144) and Aurora Autoship ($1.66 / $99.60): <strong>48% less</strong>.
        </Body>
        <Body space={gap(16)}>
          I used transparency as a tool to build trust: the table shows what pet pharmacies usually hide, the vet
          markup. The savings are quantified, and the line underneath (vet-verified, no hidden fees, cancel
          Autoship anytime) keeps the claims honest.
        </Body>

        <Heading space={gap(56, 44)}>Cart: no subscription traps</Heading>
        <Framed src={I.cart} alt="Cart with items grouped by pet, each with a Cancel anytime link" className="aucs-pan" space={gap(24, 20)} />
        <Body space={gap(20)}>
          Every item in the cart has a visible &quot;Unsure? Cancel anytime&quot; link right next to its quantity
          and frequency. I made cancelling visible from day one so the subscription feels like a convenience, not
          a trap. Items are grouped by pet, so an owner with two animals can check each one&apos;s medication at a
          glance.
        </Body>
        <Body space={gap(12)}>
          I saw this grouping on Koala. It makes more sense to keep track by pet, so nothing gets confused.
        </Body>

        <Heading space={gap(56, 44)}>Checkout: answer the question before asking for payment</Heading>
        <Framed src={I.checkout} alt="Next step: We'll verify your prescription with your vet" className="aucs-checkout" space={gap(24, 20)} />
        <Body space={gap(20)}>
          Right before payment, I highlight what the customer wants to know. We verify the prescription with their
          vet first, and their card isn&apos;t charged until verification is complete. Until then, there&apos;s
          nothing else they need to do.
        </Body>
        <Body space={gap(12)}>
          I knew these were the questions customers have at checkout from a mix of all three: our research, how
          Koala&apos;s flow handles it, and my own experience buying online.
        </Body>

        <Heading space={gap(56, 44)}>Confirmation: reduce anxiety after purchase</Heading>
        <Body space={gap(16)}>
          The moment after paying is when doubt sets in, especially when the order can&apos;t ship until a vet
          signs off. I surfaced the relevant information and progress on the confirmation page, so the customer
          doesn&apos;t have to dig through the FAQ or their email.
        </Body>
        <div className="aucs-confirm-grid" style={gap(24, 20)}>
          <div className="aucs-confirm-left">
            <Framed src={I.tracker} alt="Order received, with a tracker: order placed, vet verification, pack and ship, delivered" />
            <Framed src={I.orderSummary} alt="Order summary with an Edit vet info link" />
          </div>
          <Framed src={I.guarantee} alt="Zero Risk Guarantee: your card has not been charged yet" />
        </div>
        <Framed
          src={I.support}
          alt="Flexibility Guarantee, and buttons to contact the vet team or live chat"
          className="aucs-support"
          space={gap(18, 16)}
        />
        <ul className="fs-body aucs-list" style={gap(20)}>
          <li>
            <strong>Progress tracker</strong> — order placed → vet verification → pack &amp; ship → delivered, so
            they always know where the order is.
          </li>
          <li>
            <strong>Edit vet info</strong> — they can see if they entered anything wrong and fix it right there.
          </li>
          <li>
            <strong>Zero Risk Guarantee</strong> — a reminder that their card hasn&apos;t been charged yet.
          </li>
          <li>
            <strong>Flexibility Guarantee</strong> — pause, skip, or cancel anytime from the dashboard, no questions
            asked.
          </li>
          <li>
            <strong>A direct line to the vet team</strong> — Contact Vet Team and Live chat, for prescription or
            delivery questions.
          </li>
        </ul>

        <Label space={gap(72, 56)}>VISUAL SYSTEM</Label>
        <Heading space={gap(15, 16)}>From Felis RX to Aurora</Heading>
        <div className="aucs-pair aucs-system" style={gap(24, 20)}>
          <Framed src={I.felisRx} alt="FELIS RX: green accents and monospace type" />
          <div className="fs-rounded aucs-brand">
            <Img src={I.brandGuidelines} alt="Aurora Pet Co. brand guidelines: pink and sage palette, Pepi and Inter" />
          </div>
        </div>
        <Body space={gap(20)}>
          Felis RX used green and monospace type. Aurora moved to a soft pink and sage palette with rounded type
          (Pepi for headers, Inter for body).
        </Body>
        <Body space={gap(12)}>I chose the pink for warmth and the green for health and grounding. The specific hues also reference the
          name &quot;Aurora&quot;. Pepi is our main font because it feels very human and looks good, and Inter is a
          perfect, versatile sans-serif.</Body>

        <Label space={gap(72, 56)}>WHAT I LEARNED</Label>
        <Heading space={gap(15, 16)}>How to design for trust, visually and through information architecture</Heading>
        <Body space={gap(16)}>
          Trust isn&apos;t one feature. It&apos;s <strong>signalling quality and legitimacy</strong> (expensive
          imagery, a banner of proof, honest price comparisons) and <strong>reducing anxiety and friction</strong>{' '}
          at every touchpoint: cancel links in the cart, no charge until the vet signs off, a tracker and an easy
          way to fix mistakes after purchase.
        </Body>
        <Body space={gap(16)}>
          As this was a concept project, I didn&apos;t have access to formal user testing and mostly relied on
          friends to look over my work. Next time, I would set up A/B testing earlier and define clear success
          metrics with my supervisor.
        </Body>

        <NextLink onNext={onNext} className="aucs-next" space={gap(127, 106)} />
      </article>
    </div>
  )
}
