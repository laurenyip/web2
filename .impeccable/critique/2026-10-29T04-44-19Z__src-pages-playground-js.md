---
target: Playground page (/playground)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\Playground.js"
target_fingerprint: "sha256:45abb69607ab6762b99de0f362897e14f893e78b29523cd106d7cf3cae4439b0"
target_path: "C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\Playground.js"
timestamp: 2026-10-29T04-44-19Z
slug: src-pages-playground-js
---
Method: dual-agent (A: design review · B: detector + browser overlay, shared across 4 pages)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | 7px low-contrast carousel dots, no "3 / 8"; lightbox has no position |
| 2 | Match System / Real World | 3 | Warm copy; "03 Languages" holds piano/guitar |
| 3 | User Control and Freedom | 2 | Lightbox has no prev/next across 13 photos |
| 4 | Consistency and Standards | 2 | "drafts" styled like a link but inert; arrow styles compete |
| 5 | Error Prevention | 3 | Little to break |
| 6 | Recognition Rather Than Recall | 2 | Guitar affordance is hover-only; all 13 tiles aria-label "Open photo" |
| 7 | Flexibility and Efficiency | n/a | Experience surface |
| 8 | Aesthetic and Minimalist Design | 3 | Calm; large dead right columns by 00 and 01 |
| 9 | Error Recovery | 2 | No image placeholders; layout jumps |
| 10 | Help and Documentation | n/a | Inline carousel instruction suffices |
| **Total** | | **21/32 (66%)** | **Acceptable** |

## Design Specificity Verdict
Content is hers (own oil paintings, 花樣年華, Substack essays, the glowing guitar → playlist), but the page reuses About's exact template and class names, so "play" has the same rhythm as "about". The intro "Reasons to play / don't be boring" is the most boring block. PlaygroundDiary.js is built but never imported. Detector: CLI clean; overlay flagged wide tracking (intentional body style), stragglers ("imagination'" at 1440, "Chinese." at 390), Arial (known), loader items (false positive).

## Priority Issues
1. [P1] Lightbox keyboard handling broken (ImageModal.js:24–61) — focus escapes to the footer, isn't restored, no scroll lock, no prev/next. Fix: trap + restore focus, lock scroll, ←/→ with "n / 13". /impeccable harden
2. [P1] No headings at all; 80px numerals outrank 16px titles (Playground.js:34–35, 109–110, 125–126, 165–166, 201–202). Fix: real h1, labels as h2, numerals decorative. /impeccable typeset
3. [P2] Intro under-delivers on "play" (L32–38); the unused diary could be the fold's object. /impeccable delight
4. [P2] Touch: 7px dots, 21px writing links, guitar has no visible cue, carousel before its label on mobile, no swipe. /impeccable adapt
5. [P3] Label/content mismatches — "03 Languages" vs music, inert "drafts", identical tile labels, stray "+ building some cool stuff." /impeccable clarify

## Persona Red Flags
Jordan: nothing to do above the fold; doesn't know the guitar is clickable; "drafts" does nothing. Riley: guitar/tile/dot transforms not gated by reduced motion; blank tiles on slow network; carousel resets on refresh. Casey: untappable dots, lightbox close out of thumb reach, ~3,000px photo grid with no skip.

## Minor Observations
- Carousel arrows render dark while App.css:705 specifies white.
- Modal caption font set inline.
- Vienna feature tile, copy talks about sunrises/hiking/dragonboat.
- Generic page title.

## Questions to Consider
- What would only exist on the play page?
- What's the one thing to open at the fold — is it the unused diary?
- Is the 00–04 index helping anyone?
