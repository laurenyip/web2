---
target: Work page (home, /)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\Work.js"
target_fingerprint: "sha256:db0d726142b464d82137dff106815a4edfb26dec0cd2566a3e7ee9443456e666"
target_path: "C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\Work.js"
timestamp: 2026-10-29T04-06-36Z
slug: src-pages-work-js
---
Method: dual-agent (A: design review · B: detector + browser overlay)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hash updates on open, active nav marked; faded continued-work cards look disabled on touch |
| 2 | Match System / Real World | 3 | Passport metaphor is warm; "23A", "FM/TO", "Status @ SFU" read as puzzles; byline caption is only a date |
| 3 | User Control and Freedom | 2 | Esc/backdrop/× close the modal, but "Next" closes it for 5 of 9 studies (NEXT_STUDY incomplete); focus never enters the dialog |
| 4 | Consistency and Standards | 2 | Titles on hover for only CSA/Lyre/byline; resume link styled like a label; "please reach out!" card has no link |
| 5 | Error Prevention | 3 | NDA card explains itself; unknown hashes ignored safely |
| 6 | Recognition Rather Than Recall | 2 | On desktop, what each project is lives only behind hover |
| 7 | Flexibility and Efficiency | n/a | Portfolio landing, no expert workflows |
| 8 | Aesthetic and Minimalist Design | 3 | Strong top half; 5-in-4 orphan (ROSIE) and a tall empty band before the footer |
| 9 | Error Recovery | 2 | No loading/fallback if a case study is slow or fails; "Next" silently closes |
| 10 | Help and Documentation | n/a | Not applicable to a portfolio home |
| **Total** | | **20/32 (62%)** | **Acceptable** |

## Design Specificity Verdict

LLM assessment: the top of the page is authored for Lauren (passport charm with 宝怡, FM VANCOUVER/YVR TO THEWORLD/!!!, the stamp, Melo wordmark, bespoke animated per-project thumbnails). Below row 2 it drops into a category-standard square bento grid, a stock "Thanks for visiting" box and a white-wash fade; the passport idea never returns. The passport card itself mixes 4–5 type voices that physically collide.

Deterministic scan: CLI on Work.js clean; 5 findings in thumbnail CSS (2 bounce-easing in AuroraThumb.css:120/137, real but minor; 3 "overused-font: Arial" in CsaThumb/KodeticThumb/StarmapThumb — false positives, Arial is the site's deliberate body/caption face). In-page overlay: 10 issues at 1440 (6 undersized 10px items in the passport card incl. both contact links; wide-tracking on the hero subtitle; low contrast on "click the cookie" 2.5:1; SoundBook thumb title flagged 1.1:1 — false positive, it sits over a photo the detector didn't measure), 23 at 390 (adds nav links at 10.56px, wide-tracking + 4 stragglers on mobile card descriptions, intro-loader note).

## Priority Issues

1. [P1] Contact and resume are the smallest text on the page — email/LinkedIn 10px desktop, 9px mobile (App.css:108-113, :447); RESUME has no affordance and is positioned with &nbsp; runs (Work.js:228); stamp overlaps "TO"/"Age"/"23A". Detector confirms (6 undersized items). Fix: real 14–16px contact line or a "CONTACT" stamp/button; underline/box RESUME; grid instead of &nbsp;; move the stamp off text. Command: /impeccable typeset (+ layout).
2. [P1] Case-study modal is not an accessible dialog and "Next" dead-ends — focus stays behind the dialog, no focus trap, generic aria-label (LocalCaseStudyModal.js:118); NEXT_STUDY lacks soundbook, jellyfish, rosie, annaviola, lyre so Next closes. Fix: focus into dialog on open, trap Tab + inert background, label with project title, derive next order from WORK_ROW*. Command: /impeccable harden.
3. [P2] Faded continued-work row (deliberate choice) reads as disabled — five real studies look greyed at rest; on touch nothing un-fades them except scrolling; ROSIE orphaned in the 4-col grid. Fix within intent: add a quiet "More work" label, lighten the wash, keep cards clear while in view on touch, fix the 5-in-4 orphan. Command: /impeccable layout.
4. [P2] The sign-off is mid-page and has no action — "Thanks for visiting… please reach out!" is row 3 cell 1 (Work.js:281-287) with 8 projects after it and no link. Fix: move to the end, make "reach out" a mailto, bring back the passport voice. Command: /impeccable clarify.
5. [P2] Desktop hides "what is this" behind hover — titles suppressed (showTitle={false}), descriptions/tags hover-only; byline's caption is just a date; ROSIE's has no outcome. Fix: one-line caption under each card at rest (as mobile does); real one-liners for byline and ROSIE. Command: /impeccable clarify.

## Persona Red Flags

Jordan: "23A"/"FM/TO"/"Status @ SFU YEAR4" read as noise; Spruce/SoundBook show no title; can't tell faded row is clickable; "please reach out!" has no link.
Riley: Next closes the modal for SoundBook/Jellyfish/ROSIE; Tab escapes the open modal; no loading state for case studies; deep links and refresh work.
Casey: ~6,400px page at 390px; 9px email/LinkedIn targets side by side; bottom projects fade once scrolling stops; nav links 10.56px; no persistent contact.

## Minor Observations

- "click the cookie" hint 2.5:1 contrast (needs 4.5:1).
- Hero subtitle and mobile card descriptions use wide tracking; 4 descriptions end on a single-word line.
- Giant "Y" glyph overlaps "2003" in the passport.
- Lyre poster cropped ("CALL FOR SUBMISSIONS" cut in half).
- No h2 headings; aria-label on a plain div (Work.js:302) is ignored; custom <p2>/<p3>/<p3b> tags carry no semantics.
- Inconsistent tokens (#374151 / #001c80 / #6b7280); inline-styled h1.
- Large empty band between the last row and the footer.
- CSA NDA card is a focusable button that does nothing.
- Aurora thumbnail pop-in easing overshoots slightly (bounce-easing, low impact).

## Questions to Consider

- If the passport is the identity, why doesn't the work look stamped — could the grid be the itinerary?
- Do you want visitors to see 12 projects, or remember 4?
- Where is the visitor when they decide to email you, and is anything readable waiting there?
