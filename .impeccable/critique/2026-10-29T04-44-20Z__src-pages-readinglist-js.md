---
target: Reading List (/reading-list)
total_score: 22
max_score: 32
na_heuristics: 7,9
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\ReadingList.js"
target_fingerprint: "sha256:82d4b85b0fee370dc16dda72cc20be62d79e0327f27ccf69e80ab6522a46dea1"
target_path: "C:\\Users\\laure\\Downloads\\web2\\web2\\src\\pages\\ReadingList.js"
timestamp: 2026-10-29T04-44-20Z
slug: src-pages-readinglist-js
---
Method: dual-agent (A: design review · B: detector + browser overlay, shared across 4 pages)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | "this year" has no year; no last-updated |
| 2 | Match System / Real World | 3 | Warm labels; ISO dates read like a database |
| 3 | User Control and Freedom | 3 | Essays open new tabs with no cue |
| 4 | Consistency and Standards | 2 | Essay links look like plain titles until hover; "Essays I like" casing |
| 5 | Error Prevention | 3 | Low stakes |
| 6 | Recognition Rather Than Recall | 2 | Can't tell links from non-links, at all on touch |
| 7 | Flexibility and Efficiency | n/a | ~42-item read-only page |
| 8 | Aesthetic and Minimalist Design | 3 | Clean; 23-item finished list is one flat column |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | 3 | "message me for all time favorites" has no link |
| **Total** | | **22/32 (69%)** | **Acceptable** |

## Design Specificity Verdict
The copy is hers ("books I have open in my room somewhere"), the container isn't: a centred white card with a hairline border, radius and soft shadow — a stock bookshelf/Notion pattern that doesn't match the site's hard-ruled nav. Detector: CLI clean; overlay flagged 5 low-contrast items (true positives: 4 section labels + footer, #9ca3af on white 2.5:1, ReadingList.css:59, :112), loader items (false positive).

## Priority Issues
1. [P1] Essay links have no visible affordance — same style as plain titles, underline only on hover (ReadingList.css:89–98). Fix: persistent subtle underline or ↗, hidden "(opens in new tab)", consider essays above the long list. /impeccable clarify
2. [P1] Section labels and footer fail contrast (2.5:1 at 11–12px). Fix: #374151 or #6b7280, 12px. /impeccable audit
3. [P2] Flat semantics — labels are p (js:40), entries are divs not ul/li, dates not <time>. /impeccable harden
4. [P2] 23 finished books with nothing signalling taste — no count, favourites, or grouping. Fix: count, mark 3–5 favourites with a line in her voice, two columns ≥768px; bring "all time favorites" into the page. /impeccable layout + delight
5. [P3] The "Read" cursor label covers the hovered title. /impeccable polish

## Persona Red Flags
Jordan: can't tell titles are links; heading has no year; essays below a 23-book wall; "message me" leads nowhere. Riley: no heading navigation; ISO dates read as numbers; no scaling strategy for more entries. Casey: 17px-tall essay tap targets; no link cue on touch; ~3,900px page with no jump; centred heading over left-aligned card.

## Minor Observations
- Unused .reading-list-lede (an intro line was planned).
- ~154px dead space above the H1.
- "Six of Crows, Crooked Kingdom" is two books in one entry.
- utm_* params on essay links; letter-spacing drifts from the 1.3px body spec.

## Questions to Consider
- What would one sentence per favourite do for your sense of taste?
- Does this need to be a card — or a shelf/stack of spines/index card?
- Why are the only actionable items (essays) last?
