---
target: Albums page (/albums)
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\AlbumGallery.js"
target_fingerprint: "sha256:d4de2e0728a09865072c0f8683e081d8506165c9ab2e71c11d864c255ce68839"
target_path: "C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\AlbumGallery.js"
timestamp: 2026-10-29T04-44-20Z
slug: src-pages-albumgallery-js
---
Method: dual-agent (A: design review · B: detector + browser overlay, shared across 4 pages)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Touch "armed" first tap has no hint; no external-link cue |
| 2 | Match System / Real World | 3 | Sleeve/record metaphor; album and artist never named |
| 3 | User Control and Freedom | 2 | An opened tile can't be dismissed on touch; click jumps to a new tab |
| 4 | Consistency and Standards | 2 | Footer promises Spotify; London Calling → Wikipedia, Stop Making Sense → Letterboxd |
| 5 | Error Prevention | 2 | Second tap leaves the site; empty tiles reveal blank panels |
| 6 | Recognition Rather Than Recall | 1 | Instructions only in the footer after 40 tiles; names never shown |
| 7 | Flexibility and Efficiency | n/a | Browsing surface |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, art-led; reveal overlay hides the art |
| 9 | Error Recovery | 2 | Empty overlays look broken |
| 10 | Help and Documentation | n/a | Experience surface |
| **Total** | | **17/32 (53%)** | **Acceptable** |

## Design Specificity Verdict
Partly authored: the vinyl-out-of-sleeve reveal, "record shelf" title and personal notes ("bought the disc in Vienna") are hers. At rest it reads like any cover grid, and the signature reveal is mostly hidden by a 97%-opaque cream overlay over sleeve and disc. Detector: CLI clean; overlay flagged the footer hint at 2.5:1 contrast (true positive, AlbumGallery.css:286–292), Arial (known), loader item (false positive).

## Priority Issues
1. [P1] The reveal hides the artifact — `.album-gallery-overlay` inset 0 at 97% cream (AlbumGallery.css:221–242). Fix: keep the sleeve visible (tracks on the record label, a strip, or the slid-out area only); no overlay when an album has no notes. /impeccable layout
2. [P1] No album or artist identity — no title field, alt="" (js:397), aria-label is only tracks/thought; two Blood Orange entries are indistinguishable to screen readers. Fix: add titles; "{title} by {artist}, opens Spotify in new tab"; caption in the overlay. /impeccable clarify + harden
3. [P2] Touch flow fragile — tap-tap opens a new tab, no dismiss, open sleeve overflows the viewport by 1px, long track names clipped. /impeccable adapt
4. [P2] Discoverability and honesty — hint at the bottom at 2.5:1, links not all Spotify, empty lede slot. Fix: one-line hint under the title, accurate copy, ↗ cue. /impeccable onboard
5. [P3] Small text (10–11px labels/tracks) and all 40 covers lazy-loaded, including the first row. /impeccable typeset + optimize

## Persona Red Flags
Jordan: no instructions; hover hides the cover; London Calling opens Wikipedia; page unreachable from the nav. Riley: 7 albums with no notes show blank panels; "Untitled, Lullaby" is two tracks in one string. Casey: first tap slides the sleeve off-screen; second tap anywhere leaves; instructions ~8,000px down.

## Minor Observations
- Invisible grooves; blank label (cover-art label would be lovely).
- Dead CSS (.album-gallery-lede, sleeve-gradient).
- The Pogues note reads editorial, unlike the lowercase voice elsewhere.
- Focus ring #9ca3af is low contrast; generic page title.

## Questions to Consider
- Tracks printed on the record label, or on a flipped sleeve back?
- A shelf of spines instead of a grid of fronts?
- Should albums with no notes be on the page?
