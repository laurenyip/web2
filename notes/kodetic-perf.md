# Kodetic: performance numbers

Measured 2026-10-09 against the live site (https://laurenyip.github.io/kodetic/, deployed from `laurenyip/kodetic` @ `b4b5ec7`, 2026-09-22).
Every figure below was measured. Nothing here is estimated. The method for each number is listed under it.

---

## 1. Image weight: before vs after compression

### What counts as "before"

The repo history has the original exports. Commit `e59afdf` (2026-07-11 22:18) holds the gallery as full-resolution JPG/PNG exports. Commit `00027b2`, 22 minutes later, is *"Compress gallery images to WebP and shrink river thumbnails for faster loading."* It replaces every one of them with a WebP of the same name.

| | Files | Total | Average per image | Largest file |
|---|---|---|---|---|
| Before: originals (`e59afdf`) | 125 (124 JPG + 1 PNG) | **809.6 MB** (809,635,444 B) | **6.48 MB** (6,477,084 B) | 22.8 MB (`mixed-media/rea-crt-angel.jpg`) |
| After: WebP (`00027b2`) | 125 WebP | **22.1 MB** (22,084,572 B) | **176.7 KB** (176,677 B) | n/a |
| Change | 1:1 filename match (125/125) | **−97.3 %** (36.7× smaller) | | |

Folders covered: `public/images/{commercial,cosplay,editorial,mixed-media}`. The 40 tiny `river/` thumbnails were already WebP before the change, so they're left out.

**Method:** GitHub REST API `GET /repos/laurenyip/kodetic/git/trees/<sha>?recursive=1` for both commits. That returns each blob's exact byte size. I summed the sizes per commit and matched the files by path without the extension. The repo itself wasn't checked out.

**Caveat (important):** this before/after covers the **July gallery** (the first media kit). In `e3c5ab3` (2026-08-13, *"Rebuild gallery from updated media kit…"*) the gallery was rebuilt from Ezra's revision doc, and that commit added the new images **directly as WebP**. Originals for the **current** image set were never committed, so there's no before for them in the repo. See §4.

### Current site (HEAD `b4b5ec7`)

| Set | Files | Total | Average |
|---|---|---|---|
| Full-size WebPs (`public/images/{landing,mixed-media,commercial,creative,miscellaneous}`) | 145 | 30.7 MB (30,685,516 B) | 211.6 KB (211,624 B) |
| Grid thumbnails (`public/images/grid/**`) | 144 | 7.65 MB (7,653,410 B) | 53.1 KB (53,149 B) |
| Canvas textures (`black-canvas.png` + `white-canvas.png`) | 2 | 688 KB (523,270 + 164,284 B) | n/a |

**Method:** same GitHub trees API call on `b4b5ec7`.

How the site uses them (read from the source, `src/data/gallery.ts` and `GalleryExpandableCell.tsx`): grid cells load the `grid/` thumbnail (`src`). The full-size file (`fullSrc`) only loads when a cell is expanded. The exception is the wide Mixed Media spreads, which use the full-size file in the grid too. That's why the Mixed Media page is heavier (below).

---

## 2. Lighthouse (live site)

Lighthouse 12.2.1 (repo devDependency), Chrome 155 headless, performance category only, default simulated throttling.
- Mobile = default preset (Moto G Power emulation, 412 px, 150 ms RTT, ~1.6 Mbps, 4× CPU slowdown).
- Desktop = `--preset=desktop` (1350 px, 40 ms RTT, 10 Mbps, no CPU slowdown).

3 runs per page per form factor. Values are the **median of each metric** across the 3 runs.

| Page | Form factor | Perf score | LCP | FCP | TBT | CLS | Total page weight | Photo requests on load | Photo bytes on load |
|---|---|---|---|---|---|---|---|---|---|
| Landing `/kodetic/` | Mobile | 77 | **6.3 s** | 0.9 s | 66 ms | 0.055 | **1,085 KiB** (1,110,580 B) | **8** of 16 | 133 KiB |
| Landing `/kodetic/` | Desktop | 96 | **1.3 s** | 0.3 s | 0 ms | 0.027 | **1,310 KiB** (1,341,262 B) | **15** of 16 | 358 KiB |
| Mixed Media `/kodetic/mixed-media/` | Mobile | 68 | **10.9 s** | 0.9 s | 80 ms | 0.121 | **2,087 KiB** (2,137,382 B) | **2** of 16 | 1,129 KiB |
| Mixed Media `/kodetic/mixed-media/` | Desktop | 88 | **2.2 s** | 0.3 s | 9 ms | 0.049 | **2,625 KiB** (2,687,946 B) | **3** of 16 | 1,666 KiB |

Raw runs (score / LCP ms / bytes / photo requests):
- Landing mobile: 72/6323/1,110,700/8 · 77/6427/1,110,580/8 · 77/6244/1,110,456/8
- Landing desktop: 97/1216/1,341,134/15 · 96/1331/1,341,306/15 · 96/1365/1,341,262/15
- Mixed mobile: 68/10927/2,137,382/2 · 71/10890/2,137,462/2 · 64/10138/2,135,808/2
- Mixed desktop: 86/2200/2,687,908/3 · 88/2207/2,687,946/3 · 89/2060/2,687,978/3

**Method:**
- `npx lighthouse <url> [--preset=desktop] --only-categories=performance --output=json --chrome-flags="--headless=new"`, with `CHROME_PATH` set to the installed Chrome.
- Page weight = the `total-byte-weight` audit.
- "Photo requests on load" = entries in the `network-requests` audit with `resourceType === "Image"` and a URL under `/kodetic/images/`. That leaves out the 2 texture PNGs and inline data-URI SVG noise.
- Lighthouse doesn't scroll, so this is what loads before any interaction.
- The "of 16" total comes from the Playwright check below.
- Lighthouse's LCP-*element* audit errored in this Chrome/Lighthouse combination ("TraceElements… frame_sequence"), so I can't say which element was the LCP. The LCP *timing* audits ran normally.

### Lazy loading check (Playwright, real network, no throttling)

| Page | Viewport | Photos loaded before scrolling | Photos loaded after scrolling to the bottom |
|---|---|---|---|
| Landing | 1440×900 | 15 (363 KB) | 16 (459 KB) |
| Landing | 412×823 | 8 (134 KB) | 16 (459 KB) |
| Mixed Media | 1440×900 | 3 (1.70 MB) | 16 (6.90 MB) |
| Mixed Media | 412×823 | 2 (1.15 MB) | 16 (6.90 MB) |

**Method:** Playwright (Chrome, GPU on) logged every response under `/kodetic/images/`. It counted after `networkidle` + 2 s, then wheel-scrolled 600 px every 200 ms to the bottom, waited 2.5 s and counted again. Bytes are the summed `content-length` headers.

**Why it behaves this way** (from `src/lib/use-in-view.ts` and `GalleryExpandableCell.tsx`): each cell mounts its `<Image>` only once an IntersectionObserver sees it within 300 px of the viewport, and the `<Image>` itself uses `loading="lazy"`. On Mixed Media, 3 of 16 photos on desktop (2 on mobile) cost 1.7 MB (1.15 MB on mobile), against 6.9 MB if everything loaded up front.

### Observations (measured, not fixed)
- The black canvas texture (`black-canvas.png`, 523 KB) is bigger than all 8 first-load landing photos combined on mobile (133 KiB).
- Mixed Media mobile LCP (10.9 s) comes from the wide spreads using full-size WebPs in the grid (e.g. `mixed-media-photos-4.webp`, 834 KB). Serving the `grid/mixed-media` versions there is the obvious next fix.

---

## 3. Screen recordings (task A)

Saved to `public/images/projects/kodetic/`:

| File | Size | Spec (ffprobe) |
|---|---|---|
| `kodetic-expand-in-place.mp4` | 1,525,263 B | H.264 High, 1440×900, yuv420p, 30 fps, 8.2 s, no audio track |
| `kodetic-expand-in-place.gif` | 3,091,359 B | GIF fallback, 640 px wide, 10 fps, loops |
| `kodetic-expand-in-place-poster.webp` | 156,736 B | frame at 1.2 s |
| `kodetic-black-canvas.mp4` | 490,370 B | H.264, 1440x900, 5 s, 24 fps, no audio. Landing page with photos hidden (CSS visibility) so the black canvas + gold streaks show |
| `kodetic-white-canvas.mp4` | 398,912 B | H.264, 1440x900, 5 s, 24 fps, no audio. Landing footer scrolled into view, photos hidden: white canvas with drifting sand |
| `kodetic-black-canvas-poster.webp` / `kodetic-white-canvas-poster.webp` | 164,246 B / 147,236 B | frame at 2 s |

**Method:**
- Playwright drove Chrome at 1440×900 with GPU rasterisation on. Without the GPU, SwiftShader managed only ~7 fps on the animated gold background.
- Frames were captured with CDP `Page.startScreencast` (JPEG q92) and re-timed with their own timestamps through an ffmpeg concat list.
- Encoding: x264 `-preset slow -crf 25` (expand) / `-crf 22` (landing), `+faststart`, `-an`.
- Expand clip sequence: Mixed Media, scrolled to the Stüssy 3-up row; hover the first image; click (expands in place); hold ~1.6 s; Escape; glide to the third image; click (expands).
- Canvas clips: recorded the same way on the live landing page (crf 30). The white canvas only exists as the navbar and footer on the live site; there is no white page background.

Embed:
```html
<video autoplay loop muted playsinline poster="/images/projects/kodetic/kodetic-expand-in-place-poster.webp">
  <source src="/images/projects/kodetic/kodetic-expand-in-place.mp4" type="video/mp4" />
  <img src="/images/projects/kodetic/kodetic-expand-in-place.gif" alt="Expanding an image in place on Kodetic's Mixed Media page" />
</video>
```

---

## 4. How to get a real "before" for the current gallery

The current image set has no committed originals, so either:

1. **Original exports.** Get Ezra's original exports for the August media kit: the files behind the revision-doc boards, or the TransferNow/Drive download he sent. Sum their sizes (`du -cb <folder>/*`) and compare with the 145 full-size WebPs (30,685,516 B) using the same file names.
2. **Lazy loading off.** In a local checkout of `laurenyip/kodetic`, make `useInView` in `src/lib/use-in-view.ts` return `true` immediately and change `loading="lazy"` to `loading="eager"` in `GalleryExpandableCell.tsx`. Run `npm run build && npx next start`, then run the Lighthouse commands above against `http://localhost:3000/` and `/mixed-media/`. Also run the unmodified HEAD the same way on localhost, so both numbers share a host.
3. **Before thumbnails and in-view loading.** Check out `00027b2` (WebP, but before `9d342ad` added grid thumbnails and in-view loading), build it the same way, and Lighthouse it on localhost. Note that this is the July image set, not the current one.
