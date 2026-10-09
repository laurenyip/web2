/**
 * Roly Poly Zine page images, in reading order.
 * Rendered from public/rolypolyzine.pdf (4 pages, 4.25 × 5.5 in) at 300 dpi.
 */

const BASE = '/images/projects/jellyfish-zine'

export const ROLY_POLY_ZINE_PDF = '/rolypolyzine.pdf'

export const ROLY_POLY_ZINE_PAGES = [
  { src: `${BASE}/00-cover.webp`, alt: 'Roly Poly Zine cover: the immortal jellyfish', label: 'Cover' },
  { src: `${BASE}/01-page-01.webp`, alt: 'Roly Poly Zine page 1: how we built the umbrella', label: '1' },
  { src: `${BASE}/02-page-02.webp`, alt: 'Roly Poly Zine page 2: what is applied science?', label: '2' },
  { src: `${BASE}/03-back-cover.webp`, alt: 'Roly Poly Zine back cover: jellyfish facts and credits', label: 'Back cover' },
]
