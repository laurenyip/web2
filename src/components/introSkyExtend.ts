import { SKY_LINES, SKY_STARS } from './introSkyCatalog'

type RGB = { r: number; g: number; b: number }

const SKY: RGB = { r: 11, g: 20, b: 39 }
const LOW: RGB = { r: 22, g: 34, b: 54 }
const STAR: RGB = { r: 228, g: 236, b: 248 }

function lum(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function css(c: RGB, a = 1) {
  const r = Math.round(c.r)
  const g = Math.round(c.g)
  const b = Math.round(c.b)
  return a >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

function sample(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  keep?: (r: number, g: number, b: number) => boolean,
): RGB | null {
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  const xa = Math.max(0, Math.floor(x0))
  const xb = Math.min(w, Math.ceil(x1))
  const ya = Math.max(0, Math.floor(y0))
  const yb = Math.min(h, Math.ceil(y1))
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) {
      const i = (y * w + x) * 4
      const pr = data[i]
      const pg = data[i + 1]
      const pb = data[i + 2]
      if (keep && !keep(pr, pg, pb)) continue
      r += pr
      g += pg
      b += pb
      n++
    }
  }
  if (!n) return null
  return { r: r / n, g: g / n, b: b / n }
}

export type IntroPalette = { sky: RGB; low: RGB }

export function paletteFromGif(gif: HTMLImageElement | null): IntroPalette {
  const fallback = { sky: SKY, low: LOW }
  if (!gif?.naturalWidth || !gif.naturalHeight) return fallback
  const nw = gif.naturalWidth
  const nh = gif.naturalHeight
  const src = document.createElement('canvas')
  src.width = nw
  src.height = nh
  const sctx = src.getContext('2d', { willReadFrequently: true })
  if (!sctx) return fallback
  sctx.drawImage(gif, 0, 0)
  let pixels: Uint8ClampedArray
  try {
    pixels = sctx.getImageData(0, 0, nw, nh).data
  } catch {
    return fallback
  }
  const sky =
    sample(pixels, nw, nh, 0, 0, Math.min(150, nw), Math.min(70, nh), (r, g, b) => lum(r, g, b) < 90) ?? SKY
  const floor = sample(pixels, nw, nh, 0, nh * 0.72, nw, nh * 0.86, (r, g, b) => lum(r, g, b) < 80) ?? LOW
  return { sky, low: mix(sky, floor, 0.55) }
}

export type SkyPlace = { lat: number; lon: number }

/** Fixed observer for the loading sky: Vancouver, BC. */
export const INTRO_SKY_PLACE: SkyPlace = { lat: 49.2827, lon: -123.1207 }

export type IntroStar = {
  x: number
  y: number
  r: number
  base: number
  phase: number
  period: number
  twinkles: boolean
}

export type IntroLine = { x1: number; y1: number; x2: number; y2: number }

export type IntroSky = { stars: IntroStar[]; lines: IntroLine[] }

const DEG = Math.PI / 180

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function wrap360(deg: number) {
  const x = deg % 360
  return x < 0 ? x + 360 : x
}

/** Greenwich mean sidereal time in degrees for a UTC instant (Meeus). */
export function greenwichSiderealDegrees(when: Date) {
  const jd = when.getTime() / 86400000 + 2440587.5
  const d = jd - 2451545.0
  const t = d / 36525
  return wrap360(280.46061837 + 360.98564736629 * d + 0.000387933 * t * t - (t * t * t) / 38710000)
}

/** J2000 RA/Dec (degrees) to altitude/azimuth. Azimuth is degrees from north toward east. */
export function equatorialToHorizontal(raDeg: number, decDeg: number, place: SkyPlace, when: Date) {
  const lst = wrap360(greenwichSiderealDegrees(when) + place.lon)
  const ha = wrap360(lst - raDeg) * DEG
  const lat = place.lat * DEG
  const dec = decDeg * DEG
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha)
  const alt = Math.asin(clamp(sinAlt, -1, 1))
  const az = Math.atan2(
    -Math.cos(dec) * Math.sin(ha),
    Math.sin(dec) * Math.cos(lat) - Math.cos(dec) * Math.sin(lat) * Math.cos(ha),
  )
  return { altDeg: alt / DEG, azDeg: wrap360(az / DEG) }
}

function angularSeparation(ra1: number, dec1: number, ra2: number, dec2: number) {
  const c =
    Math.sin(dec1 * DEG) * Math.sin(dec2 * DEG) +
    Math.cos(dec1 * DEG) * Math.cos(dec2 * DEG) * Math.cos((ra1 - ra2) * DEG)
  return Math.acos(clamp(c, -1, 1)) / DEG
}

function projectAbove(altDeg: number, azDeg: number, width: number, height: number) {
  const reach = Math.hypot(width, height) / 2
  const rad = ((90 - altDeg) / 90) * reach
  const az = azDeg * DEG
  return {
    x: width / 2 - rad * Math.sin(az),
    y: height / 2 - rad * Math.cos(az),
  }
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** Faint catalog stars stay field-weight. Only the brightest lift a little. */
function appearance(mag: number, index: number) {
  const rare = mag < 0.4
  const bright = mag < 1.6
  const mid = mag < 2.8
  return {
    r: rare ? 1.2 : bright ? 1.0 : mid ? 0.78 : 0.62,
    base: rare ? 0.66 : bright ? 0.52 : mid ? 0.38 : 0.28,
    phase: (index % 19) * 0.41,
    period: 2800 + (index % 13) * 280,
    twinkles: mag < 2.0,
  }
}

/** Quiet filler matching the earlier GIF night sky: small, pale, not a chart. */
function fieldStars(width: number, height: number): IntroStar[] {
  const stars: IntroStar[] = []
  for (let y = 6; y < height; y += 15) {
    for (let x = 8; x < width; x += 20) {
      const n = hash(x + 2.1, y + 4.4)
      if (n > 0.085) continue
      const jy = hash(y + 5.6, x + 2.8)
      stars.push({
        x: Math.min(width - 1, x + hash(x + 8.2, y + 1.4) * 16),
        y: Math.min(height - 1, y + jy * 12),
        r: n < 0.022 ? 1.15 : 0.7,
        base: 0.3 + n * 3.4,
        phase: jy * Math.PI * 2,
        period: 2400 + hash(x, y + 8) * 2600,
        twinkles: n < 0.028,
      })
    }
  }
  return stars
}

/** Equidistant all-sky view: zenith at center, north up, east to the left (looking up). */
export function buildIntroSky(width: number, height: number, place: SkyPlace, when: Date): IntroSky {
  const stars: IntroStar[] = width < 8 || height < 8 ? [] : fieldStars(width, height)
  const lines: IntroLine[] = []
  if (width < 8 || height < 8) return { stars, lines }
  const placed = new Map<number, { x: number; y: number }>()
  for (let i = 0; i < SKY_STARS.length; i++) {
    const [ra, dec, mag] = SKY_STARS[i]
    const { altDeg, azDeg } = equatorialToHorizontal(ra, dec, place, when)
    if (altDeg <= 0) continue
    const { x, y } = projectAbove(altDeg, azDeg, width, height)
    placed.set(i, { x, y })
    const look = appearance(mag, i)
    stars.push({ x, y, ...look })
  }
  for (const [a, b] of SKY_LINES) {
    const pa = placed.get(a)
    const pb = placed.get(b)
    if (!pa || !pb) continue
    const starA = SKY_STARS[a]
    const starB = SKY_STARS[b]
    if (!starA || !starB) continue
    if (angularSeparation(starA[0], starA[1], starB[0], starB[1]) > 42) continue
    lines.push({ x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y })
  }
  return { stars, lines }
}

export function paintIntroSky(
  canvas: HTMLCanvasElement,
  palette: IntroPalette,
  sky: IntroSky,
  width: number,
  height: number,
  time: number,
  reduced: boolean,
) {
  if (width < 2 || height < 2) return
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const bw = Math.max(1, Math.round(width * dpr))
  const bh = Math.max(1, Math.round(height * dpr))
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw
    canvas.height = bh
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const wash = ctx.createLinearGradient(0, 0, 0, height)
  wash.addColorStop(0, css(palette.sky))
  wash.addColorStop(0.55, css(mix(palette.sky, palette.low, 0.45)))
  wash.addColorStop(1, css(palette.low))
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, width, height)

  ctx.lineWidth = 0.45
  ctx.lineCap = 'round'
  ctx.strokeStyle = css(STAR, 0.045)
  for (const line of sky.lines) {
    ctx.beginPath()
    ctx.moveTo(line.x1, line.y1)
    ctx.lineTo(line.x2, line.y2)
    ctx.stroke()
  }

  for (const star of sky.stars) {
    let alpha = star.base
    if (!reduced && star.twinkles) {
      const wave = 0.5 + 0.5 * Math.sin((time / star.period) * Math.PI * 2 + star.phase)
      alpha = star.base * (0.62 + 0.38 * wave)
    }
    ctx.fillStyle = css(STAR, alpha)
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fill()
  }
}
