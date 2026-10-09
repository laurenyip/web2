# Case study audit

Audited 2026-10-09. Nothing was edited. Questions in **bold** are gaps only you can fill. I haven't guessed at your reasoning anywhere.

## What I read

| Case study | Source of the writeup | Visuals reviewed |
|---|---|---|
| Starmap | `src/components/StarmapCaseStudy.js` | `public/images/projects/starmap/case-study/*` |
| Spruce | Live Framer page (`laurenyip.framer.website/spruce`); `src/pages/portfolio/Spruce1.js` mirrors it but isn't routed | Framer images + `public/images/projects/spruce/*` |
| Aurora Pet Co. | Live Framer page (`/aurora`); `_drafts/Aurora.full.js` is an older draft that isn't live | Framer images |
| Amazon Gift Wrapping | Live Framer page (`/amazon-giftwrapping`) | Framer images |
| The Lyre | `src/components/LyreCaseStudy.js` | Lyre images in `public/images/projects/` |
| byline | `caseStudies.js` → generic `CaseStudyModal` | `byline.png`, `byline.mp4` (not viewed frame by frame) |
| Kodetic | `src/components/KodeticCaseStudy.js` | `public/images/projects/kodetic/*` |
| Jellyfish Umbrella | `caseStudies.js` → `CaseStudyModal`, opened from Playground | `jellyfish-ui-*`, `roly-frame-*` |
| Anna Viola (also found) | `src/components/AnnaViolaCaseStudy.js` | `public/images/projects/annaviola/*` |
| Cradle, CSA, ROSIE Lab (also found) | `CradleCaseStudy.js`, `CsaSystemsCaseStudy.js`, `caseStudies.js` | Brief notes in the appendix |

I could only see the first frame of each animated GIF and video. Where a finding depends on what an animation shows, I say so.

---

## Ranking: most to least in need of work

1. **byline**: there's essentially no case study yet.
2. **Kodetic**: the work card promises three things the page never covers.
3. **Jellyfish Umbrella**: a rich interactive UI sits inside a generic template with one sentence about it.
4. **Spruce**: your stated contribution (the visual system) has no section, and the final screens contain placeholder copy.
5. **Starmap**: it's the featured card, but it explains *what* far more than *why*. One image is broken and one is "[image redacted]".
6. **Amazon Gift Wrapping**: the process story is strong, but there's no visual-design reasoning and the final screens have no captions.
7. **Aurora Pet Co.**: the key decisions are well argued, but the brand guidelines aren't explained and the pricing numbers don't reconcile.
8. **The Lyre**: it explains visual rationale best, but it points to page numbers instead of showing them.
9. **Anna Viola**: the best on microinteractions, with only a few gaps.

---

## 1. byline

The whole writeup is the `caseStudies.js` entry:
> overview: "Design and engineering for byline — keeping the publication's site current and shaping new pages as the project grows."
> myContribution: "Upkeep of website, design of new webpages."

The work card description is only `'June 2026–Present'`.

**1. Microinteractions not discussed.** I couldn't inspect the site itself, only `byline.mp4` (shown under "Media") and the cover image. **What interactive behaviour did you design or build on the pages you made?** The video probably shows some of it, but nothing names it.

**2. Visual decisions not explained.** The thumbnail is the Spring + Summer 2026 "OUT OF BODY" cover: a wavy script "byline" wordmark and pale-yellow display caps over a blue moth photo. **Is this cover your design, or the publication's existing identity?** **If it's existing, how did your new pages work within it?**

**3. Crops.** None possible yet. There are no screenshots of your pages.

**4. What without why.** "Upkeep of website, design of new webpages" is all what. **Which pages did you design? What problem did each one solve? What constraints did you inherit (CMS, existing styles, editorial team)?**

**5. Missing visuals.** A before/after of one page you redesigned. A close-up of one component you added.

**Structure:** the generic `CaseStudyModal` template (Overview → Challenge → Showcase → Solution → Media → Contribution) has no place for decisions. byline probably needs a bespoke page like Kodetic and Anna Viola have.

---

## 2. Kodetic

The work card (`workProjects.js`) says:
> "Editorial portfolio for photographer Ezra Gillera — IA from a media kit, expand-in-place gallery, and a tactile brand system."

The case study discusses **none of those three**. Its only body section is:
> "This project was light lifting on the design side, since Kodetic already knew what he wanted. All I had to do was focus on the technical side, optimizing for quick loading, making sure that there were no bugs or edge case glitches."

**1. Microinteractions not discussed.**
- The "expand-in-place gallery" is named on the card but never shown or described. **How does it expand? Why expand in place instead of using a lightbox or a new page?**
- **Are there any hover or loading states on the image-heavy pages?** Image loading is the one thing you say you optimized.

**2. Visual decisions not explained.**
- `public/images/projects/kodetic/` contains `logo.png`, `black-canvas.png`, `white-canvas.png`, `client-work-photos-mec-*.webp` and `landing-page-photos-*.webp`, and **none of them appear in the case study**. The black and white canvases look like brand-system assets. **What is the "tactile brand system"? Did you design it, or did Ezra bring it?**
- The title promises "a site that holds its sequence". **What sequence is that, and how does the layout hold it?**

**3. Crops.** The only image is `hero.webp`, a wide Margiela collage of two spreads. It shows Ezra's photography, not a design decision. Swap it for, or add, a crop of the site's layout: the grid, a caption treatment, or the gallery in its expanded state.

**4. What without why.**
- "IA from a media kit" on the card. **What was in the media kit, and how did it map to pages?**
- "optimizing for quick loading". **What did you do (formats, lazy loading, sizes), and what were the before/after load times?**
- Reflection: "Sometimes, simplicity is key." **Which choice did you simplify, and what did you leave out?**

**5. Missing visuals.**
- A GIF of the expand-in-place gallery.
- Media kit → site IA side by side.
- A load-time before/after (numbers, or a waterfall screenshot).

---

## 3. Jellyfish Umbrella

It renders through the generic `CaseStudyModal`. The only line about the website:
> "I also designed the interactive website."

The work card description is just `'zine'`.

**1. Microinteractions not discussed.** The `jellyfish-ui-1/2/3.png` screenshots show a full control panel:
- A colour wheel with a draggable handle, a live hex readout in the centre, and RED/GREEN/BLUE/HEX SENT values.
- "✦ DESCRIBE A COLOUR", an AI text-to-colour input ("Describe a mood, memory, or feeling and we'll translate it into a colour for you").
- A brightness slider with a sun icon at each end.
- A "LIVE PREVIEW" jellyfish glow with "Solid · Brightness 192" readout.
- STEP 3 pattern picker with a selected state, plus "**Hover any pattern** to preview it above."
- STEP 4 tentacle modes IN / OUT / CONTINUOUS / STOP, with a live status line: "Stopped — tentacles resting. · State: resting".
- An "● Offline" connection badge.
- "Send to Jellyfish", with helper text "Sends a 6-character hex colour + brightness to the ESP32 over Wi-Fi".
- A fun facts page with a circular "next fun fact" button, a "1 / 10" counter, and floating bubble backgrounds.

None of this is mentioned.
- **Why split the controls into four numbered steps?**
- **Why preview on hover rather than on tap? Kids on a tablet can't hover.**
- **What happens when the device is Offline and someone presses Send?**
- **Why is STOP styled differently from the other modes?**

**2. Visual decisions not explained.**
- The dark navy UI with cyan glow. **Was it chosen to match the umbrella's LEDs, the underwater theme, or something else?**
- The zine cover (`roly-frame-1.png`) pairs a heavy geometric sans ("the immortal jellyfish") with scientific line illustration and photo inserts. **Why that pairing?**
- **How do the zine, the umbrella fabric and the website form "a coherent visual and conceptual system"?** That phrase appears in keyFeatures but is never shown.

**3. Crops.** The modal's showcase grid crops each image to 4:3 with `bg-cover`, so the UI is cut arbitrarily. Use tight crops instead: (a) the colour wheel and hex readout, (b) the tentacle modes and status line, (c) the Offline badge.

**4. What without why.**
- "designed the fabric and decorative elements so the object reads as a single, recognizable artifact". **What alternatives did you try?**
- "to spark childrens' interest in engineering". **How does the UI's copy and level of complexity target kids, given labels like "ESP32 over Wi-Fi" and hex values?**
- **Why add an AI colour feature?**

**5. Missing visuals.**
- A GIF or video of pressing Send, then the umbrella lighting up. Physical feedback is the payoff, and the page only shows `jellyfish-progress-video.mp4` under "Project Progress".
- A side-by-side of the hover-preview and live-preview states.

---

## 4. Spruce (Framer)

**1. Microinteractions not discussed.** From `spruce_activities.png`:
- A floating circular translate button (bottom-right of the viewport, over the cards). The page says "we have the translate feature on every page!" but not why it's a floating button, or what happens when you tap it ("Complete with sound and search").
- A "Hide events that have already began" checkbox toggle. Not mentioned. (Note the typo: "began" should be "begun".)
- A filter icon next to search, map pins and map zoom/locate controls. **Do pins and cards highlight each other on hover?**
- A "Learn More" button on every card. **Where does it go?**
- The Final screens browser has tabs (Home / Activities / Resources / Profile), but no flow between them is shown.

**2. Visual decisions not explained.** You list "built the visual system (logo, palette, typography)" as your contribution (`caseStudies.js`), yet **the page has no visual system section at all**.
- **Why the cream background with forest green?**
- **Why does the profile card (`laura.png`) use a navy header when the rest of the palette is greens?**
- **Why that rounded display sans?**
- **What's the thinking behind the tree mark in the logo?**
- **Who drew the illustrations (sleeping child, orca, iPad kids collage), and why illustrate rather than photograph?**
- Tags have two weights: light-green pills on cards, dark-green "Edit Filters". **Is that hierarchy intentional?**
- The "Home page" section explains the Science World photo and the name, which is good. That's the only visual decision explained.

**3. Crops.**
- "Activities" shows a full page. Crop to the tag pills plus the filter bar, which is what the text ("filter … by neighbourhood, age group, and descriptive type tags") talks about.
- "Resources" is also full page. Crop to one resource card (`Resource Card.png` exists but isn't used).
- "Profiles": `laura.png` is already a tight crop. Good. `Kid Profile.png` exists too but isn't used.

**4. What without why.**
- "Based on further research, we decided to create 4 main features." **What research, and which features were cut?** `progress.png` (unused) shows sketches with "Stamp (for events you've gone to!)", "Stampbook", "AI Translator (home page pop-up?)" and "Pages you viewed recently", none of which shipped. **Why were they dropped?**
- "Profiles … eligible for based on age, gender, and availability". **Why is gender a filter for kids' activities?** Reviewers may ask.
- Mobile or Desktop: the debate is laid out well, but the page never explicitly says what you chose, or what changed in the design because of it.

**5. Missing visuals.**
- The final Activities screen shows placeholder copy on every card ("Placeholder text hello there text I am writing text") and the footer says "Copyright 2025" for a 2026 event. **Do you want to leave the competition screens untouched, or clean them up?**
- `progress.png` (sketches → wireframe) would make a strong before/after against the final Activities screen.
- A GIF of the translate flow: English → Spanish, using `Translate.png` and `spanish.png`.
- `team.jpg` and `parkvid.mp4` exist but aren't used.

---

## 5. Starmap

This is the featured card on the Work page, so its gaps count the most.

**1. Microinteractions not discussed.** From the screenshots:
- **Graph ⇄ List toggle** and the **dark-mode toggle** (moon icon), both in `hero.webp`. The constellation shot is dark mode, while the hero is light.
- **Constellation panel**: per-group eye icons (show/hide), pencil edit, a collapsible side panel (‹ tab), and the selected constellation drawn with a rounded bounding box (`constellation.png`).
- **Locations** list with count badges ("General 6"). Locations aren't mentioned anywhere in the writeup.
- **Shared Graphs** button. Sharing isn't mentioned anywhere.
- **Profile drawer** (`remember-profile.png`): the selected relationship chip fills black, there's an "Add custom tag" field, a camera overlay on the avatar, and a collapsible "THINGS TO REMEMBER — EDIT HISTORY". Edit history is a significant feature and goes unmentioned.
- Minimap (bottom-right), zoom controls and a dotted-grid canvas.
- **Import with AI**: "We'll extract people into editable cards before adding them." **What do the loading state and the review-cards state look like?** **Why review before adding, rather than adding automatically?**
- Empty state: **what does a brand-new user see, with only the "You" node?**

**2. Visual decisions not explained.**
- Constellation colours (pink Atelier, purple Cansbridge, blue Pinetree, orange SFU). **How were they chosen? Is there a limit on how many groups stay distinguishable?**
- Nodes: the "You" node is larger with a dark ring, people with photos get avatars, and everyone else gets a grey letter circle. **Why letters rather than generated avatars?**
- Button hierarchy: "+ Add person" is filled black and the other three are outlined. **Why is Add person primary rather than Import with AI?**
- "'Sohne' was the perfect font for my vision". **What about it fits the vision?**
- "Cursor understood my vibes and gave my a super pretty pastel gradient". This says where the gradient came from, not why you kept it. **What made the gradient beat black or white?** (Also a typo: "gave my" should be "gave me".)

**3. Crops.**
- `hero.webp` is the full graph. Make a second, tight crop of the "You" node and its ring to explain node hierarchy, or of the bottom action bar to explain button hierarchy.
- `constellation.png` is already fairly tight. Annotate the eye/pencil icons and the bounding box.
- `remember-profile.png`: crop to the chips plus "Things to remember", and annotate the edit-history toggle.

**4. What without why.**
- "So.. obviously I made an Import with AI feature." The "obviously" stands in for the reasoning. **Why AI rather than a faster manual form or a CSV import?**
- "Here's me and 2 Cansbridge friends lit up as I selected the Cansbridge constellation." **Why clusters/constellations instead of tags or folders?** This is the core concept and deserves its why.
- "I was able to immediately implement their suggested improvements". **Which ones?** `feedback-email.png` lists four: a home link from the dashboard, a location dropdown, highlighting the viewed node, and a relationship-save bug. **Which did you ship, and which did you decline (and why)?**
- "I voluntold about 10 friends…" **What did testing change?**
- Reflection: "It's fun to make stuff that real people use." **What would you do differently?**

**5. Missing visuals.**
- `testing-feedback.webp` renders as a blank white frame for me (at least the first frame). **Please check it renders on the page.**
- "[image redacted]" under "With some problems…": **can you show a blurred or mocked-up version of the Notion doc?** It's the "before" for the whole project.
- A before/after for each feedback item you implemented, starting with "node highlighted on the map".
- A GIF of selecting a constellation (stars lighting up) and of the twinkle animation on the home page. The text says "the twinkling star animation worked perfectly!" but the page only shows a still `home-page.webp`.

---

## 6. Amazon Gift Wrapping (Framer)

**1. Microinteractions not discussed.**
- The **live preview**. On mobile the card preview changes from a blank card to the "Happy Birthday" card when the dropdown changes (final screens 2 → 3), and the 3D box has rotate arrows. Your lo-fi notes say "Live 3D box preview updates as you design". The writeup never mentions the preview, which is arguably the feature's core.
- **Selected states**: the gold ribbon swatch has a blue outline, the "Default" ribbon width is a selected segmented control, and the envelope colour shows a label ("Envelope Colour: **Gold**").
- **"500 characters remaining"** counter on the message body.
- **Multi-gift sequencing**: "Gift 1: LEGO Botanicals Orchid…" and "Go to next gift". **How does a user know how many gifts are left?**
- Lo-fi notes mention a "Toggle a 'peek layer'" for tissue paper. **Did it make it in?**
- Iteration 1 had **undo/redo** and "Click and drag to rotate". **Did undo/redo survive into the final?**

**2. Visual decisions not explained.** There's no visual-design section.
- **Why keep Amazon's yellow CTA and near-black header exactly?** (Presumably brand fidelity, since you note iteration 1 was "too far from Amazon's style", but say it.)
- **Why the "amazon gift wrapping" sub-lockup with a bow on the logo?**
- **Why numbered step cards (1. Choose wrapping paper, 2. Choose ribbon colour…) on mobile?**
- The desktop card screen has "Choose envelope colour" but the mobile card screen doesn't. **Was it cut on mobile on purpose?**

**3. Crops.**
- "LOOK AT THE STATE OF YOU…" has four images with no captions. Annotate the current Amazon screen to circle the tiny "Send as a gift" checkbox, which is the problem.
- "Second Iteration" shows Amazon's T-shirt flow full-screen. Crop and annotate the pattern you borrowed (preview left, options right, price fixed at bottom).
- "FINAL SCREENS — Customize each gift and card" has no captions. Annotate each one with the decision it shows.

**4. What without why.**
- "We started by surveying 24 real people how they shop for gifts online." **What did you ask besides the 70% stat, and did anything else shape the design?**
- "I pushed a pivot with 6 hours til submission, because I strongly believed that this was more intuitive". **What made you believe it: a mentor critique, a quick test, the survey?**
- "Last minute decision to take this to mobile". **What changed when you went from desktop to mobile (layout, step order, what got cut)?**
- Pricing tiers appear in the lo-fi notes ("$7.95 for 'everything'", "$3.95 just wrapping paper"). **Did pricing make it into the final, and why or why not?**

**5. Missing visuals.**
- A GIF of picking a wrapping paper and the box updating. This is the single most important missing visual.
- Before/after: today's Amazon gift checkbox vs. your flow entry point. The hero GIF may already show this; I could only see its first frame, which is the cart with "Send as a gift".
- Iteration 1 → 2 → final side by side at the same size.

---

## 7. Aurora Pet Co. (Framer)

**1. Microinteractions not discussed.**
- **Mega-menu** (Medications dropdown) with a **pink underline on the active nav item**. The menu restructure is discussed; the indicator isn't.
- **Cart**: quantity stepper (− 1 +), "Monthly" frequency dropdown, Rx badge, strike-through price ($8.18 → $7.80 "with autoship"), and "**Unsure? Cancel anytime" link.
- **Products carousel** ("Our trusted products") appears to be a GIF. I could only see the first frame. **What does it animate?**
- "I chose to make cancellation and **pause** options visible from day one". The cart crop shows "Cancel anytime" but I can't see a pause control. **Where does pause live?**

**2. Visual decisions not explained.**
- The **brand guidelines** image (pink/mint/charcoal/white palette, Pepi Trial + Inter, icon set, moodboard, buttons) is shown but not explained. **Why pink for a pet-health brand? Why Pepi Trial?**
- In the guidelines, the **Primary CTA button is outlined and the Secondary is filled**, the reverse of the usual convention. **Is that intentional?**
- The "»" double-chevron on CTAs. **Why that over an arrow?**
- First prototype "FELIS RX" used a typewriter/monospace face; the final uses Pepi. **Why the name change to Aurora Pet Co., and why drop the mono?**
- The old draft (`_drafts/Aurora.full.js`) has design-system rationale that isn't on the live page. It also contradicts the live guidelines ("body copy stays in Arial" vs. "Body: Inter, Regular"). **Is any of that draft reasoning yours and worth restoring?**

**3. Crops.**
- "FIRST PROTOTYPE" shows the full Felis RX page. Fine as context, but pair it with a crop of the category tiles (photo vs. pill render alternation). **Is that alternation deliberate?**
- "BRAINSTORMING": Koala's menu and yours are already cropped side by side. Annotate the dog/cat filter that replaced the tabs.
- The pricing table is already tight. Good.

**4. What without why.**
- "Before committing to the final design language, I used AI to do some rapid prototyping in two directions… The first felt like a hospital website, and the second undermined credibility." **What did you keep from each?** The final is neither, so show how you got from them to it.
- "My supervisor told me to emulate their premium, trustworthy feeling." **What specifically makes Koala feel premium, and which of those did you adopt?**

**5. Missing visuals.**
- **Pricing numbers don't reconcile.** The table shows Aurora Autoship at $99.60 for 60 tablets, but the CTA says "Add to cart — $90.34/month". "49% less" works out to 48.1% ($92.40 / $192). "$1108.8" is missing a trailing zero. Since this section is about honesty and transparency, reviewers will check the maths. **Which figures are right?**
- A before/after of the nav: Koala's Dog/Cat tabs vs. your Medications/Treatments/Nutrition structure.
- A GIF of changing "Monthly" frequency and the price updating, if the prototype does that.

---

## 8. The Lyre

This is the strongest case study on visual rationale: it covers colours, three typefaces, photos and continuity.

**1. Microinteractions not discussed.** Not applicable for print. The BookViewer (page turn, arrow keys) is portfolio chrome rather than the design work itself.

**2. Visual decisions not explained.**
- "Freight: I used the standard in literary magazines for the body text." This says what is conventional, not why it suits *Flux*. **Why Aileron for the cover and headers? What does it bring that Freight doesn't?**
- **The grid, margins and type scale aren't discussed. How do poetry spreads differ from prose spreads?**
- **The Vol. 17 posters (Flux, Constant Motion) appear only in the end gallery, with no explanation of how they relate to the issue design.**

**3. Crops.** These sentences point at page numbers but show nothing inline. The reader has to flip the book to find them:
- "Page 2 is one of my favourites, as are pages 14/15."
- "I echoed it on pages 44/45 and in the font colour on the white pages."
- "I like pages 40/41/42/43 and 50/51 for this."

Each should become an inline spread crop with a one-line annotation (the opposite-colour pairing, the deep blue/green instead of black, the recto/verso colour carry-over).

**4. What without why.**
- "I also copied lots of Yoona's spreads from the 16th issue." **Which spreads, and why carry them over: continuity between volumes, or time?**
- "I was able to pull some of her style into my spreads." **Which parts of Madeline Montoya's style, and on which spreads?**
- "I implore you to pay attention to the quotes on the inner and outer covers." **Show and quote them; don't send the reader looking.**

**5. Missing visuals.**
- The white runner-up cover and the final cover side by side, at the same size and apart from the inspirations. Right now the runner-up sits in a 4-up grid mixed with inspiration images.
- "I also had to overexpose the image": a before/after of that photo.
- A close-up showing that the background "isn't a pure black", with a pure-black swatch next to it.

---

## 9. Anna Viola

This is the only case study with a dedicated Microinteractions section, with GIFs.

**1. Microinteractions not discussed.**
- The **"NEW" badge** on Parallel Lines. **When does it appear and disappear?**
- **The cover hover video can't be triggered by hover on phones. What happens on touch?**
- Twinkle lights and lace are described as "ambient". **Do they respect reduced-motion?**

**2. Visual decisions not explained.**
- "Classy, elegant, old money, playful, animated" heads the section, followed only by "We called before I started working on her site so that we could align on requirements." **Which parts of the moodboard turned into which site decisions (filigree, starfield, script wordmark)?**
- The reflection says you owned "IA, navbar, type", but **type is never discussed. Why the script face for the wordmark and "Listen"?**
- "a star icon … lights up in x-ray blue". **Why blue, when the same paragraph says "colour stays minimum"?**

**3. Crops.**
- The banner (`annaviola-home.jpg`) is a full homepage. Keep it as the hero, but the IA claims would be clearer with a crop of the home → Releases transition.
- The navbar before/after is already well cropped. Annotate the move of Follow → icons.

**4. What without why.**
- "I owned the information architecture end to end: what lived on home versus Listen, where EP / singles / documentary sat in the hierarchy". This says what you owned, but none of the decisions are shown. **Where did each piece go, and why?**

**5. Missing visuals.**
- A simple sitemap (home / Listen / documentary).
- A mobile view of the navbar. **How do four social icons and the ornament fit on a phone?**

---

## Appendix: other case studies found

- **Cradle** (`CradleCaseStudy.js`, unlisted content-systems page): there's one image (`cradle-referrals.png`) for "Delivered wireframes, prototypes, and high-fidelity UI". The Now / Soon / Later urgency grouping is described as a list but never shown in the UI. **Can you show an annotated crop of the referrals board mapped to Now / Soon / Later?**
- **Canadian Space Agency**: two versions exist. On the Work grid it opens the generic modal, which has no images (`caseStudies.js`). The content-systems version (`CsaSystemsCaseStudy.js`) is richer but also has no visuals. **Is a redacted or mocked schema of the stakeholder database shareable?**
- **ROSIE Lab / React to This!** (`caseStudies.js`, `Projects.js`): impact bullets are all output ("Enhanced project visibility through website design and development") with no decisions. Lower priority if it isn't linked from Work.

## Patterns across the portfolio

- The generic `CaseStudyModal` (byline, Jellyfish, ROSIE, CSA on Work) has no slot for decisions or captions, and it crops every image to 4:3 with `bg-cover`. Every study that uses it ranks low.
- Your strongest studies (Anna Viola, Lyre, Aurora's "Key flows") pair one image with one decision. The weakest show screens with no caption, as in Amazon's "FINAL SCREENS" and Spruce's tabbed final screens.
- Several pages narrate tools or sources instead of reasoning: "Cursor understood my vibes", "found it on 50 fonts for 2025", "I used AI to do some rapid prototyping". These are fine as colour, but each needs a sentence after it saying why you kept the result.
