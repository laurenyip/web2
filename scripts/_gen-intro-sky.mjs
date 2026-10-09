import fs from 'fs'

const lines = JSON.parse(fs.readFileSync(process.env.TEMP + '/constellations.lines.json', 'utf8'))
const stars = JSON.parse(fs.readFileSync(process.env.TEMP + '/stars.6.json', 'utf8'))

function norm(ra) {
  let x = ra
  while (x < 0) x += 360
  while (x >= 360) x -= 360
  return x
}

function sep(ra1, dec1, ra2, dec2) {
  const d = Math.PI / 180
  const c =
    Math.sin(dec1 * d) * Math.sin(dec2 * d) +
    Math.cos(dec1 * d) * Math.cos(dec2 * d) * Math.cos((ra1 - ra2) * d)
  return (Math.acos(Math.min(1, Math.max(-1, c))) * 180) / Math.PI
}

const pts = stars.features.map((f) => ({
  ra: norm(f.geometry.coordinates[0]),
  dec: f.geometry.coordinates[1],
  mag: f.properties.mag,
}))

const buckets = new Map()
for (const s of pts) {
  const k = Math.round(s.dec)
  if (!buckets.has(k)) buckets.set(k, [])
  buckets.get(k).push(s)
}

function visualMag(ra, dec) {
  let nearestMag = null
  let nearestDist = 1e9
  let blend = null
  for (let k = Math.round(dec) - 2; k <= Math.round(dec) + 2; k++) {
    const arr = buckets.get(k)
    if (!arr) continue
    for (const s of arr) {
      const dist = sep(ra, dec, s.ra, s.dec)
      if (dist < nearestDist) {
        nearestDist = dist
        nearestMag = s.mag
      }
      // Naked-eye doubles (Alpha Centauri and similar) sit inside a few arcminutes.
      if (dist < 0.04 && (blend == null || s.mag < blend)) blend = s.mag
    }
  }
  if (blend != null) return { mag: blend, bd: nearestDist }
  if (nearestMag != null && nearestDist < 0.45) return { mag: nearestMag, bd: nearestDist }
  return { mag: 4.4, bd: nearestDist }
}

const NAMES = {
  And: 'Andromeda',
  Aql: 'Aquila',
  Aur: 'Auriga',
  Boo: 'Bootes',
  CMa: 'Canis Major',
  Car: 'Carina',
  Cas: 'Cassiopeia',
  Cen: 'Centaurus',
  Cyg: 'Cygnus',
  Gem: 'Gemini',
  Leo: 'Leo',
  Lyr: 'Lyra',
  Ori: 'Orion',
  Peg: 'Pegasus',
  Per: 'Perseus',
  Sgr: 'Sagittarius',
  Sco: 'Scorpius',
  Tau: 'Taurus',
  UMa: 'Ursa Major',
  UMi: 'Ursa Minor',
  Vir: 'Virgo',
  Cru: 'Crux',
  Aqr: 'Aquarius',
  PsA: 'Piscis Austrinus',
  Eri: 'Eridanus',
  Dra: 'Draco',
  Her: 'Hercules',
  CMi: 'Canis Minor',
  TrA: 'Triangulum Australe',
  Gru: 'Grus',
  Pav: 'Pavo',
}

const catalog = []
function addStar(ra, dec, mag) {
  for (let i = 0; i < catalog.length; i++) {
    const s = catalog[i]
    if (sep(ra, dec, s[0], s[1]) < 0.08) return i
  }
  catalog.push([
    Math.round(ra * 10000) / 10000,
    Math.round(dec * 10000) / 10000,
    Math.round(mag * 100) / 100,
  ])
  return catalog.length - 1
}

const segments = []
const groups = []
let faint = 0

for (const feat of lines.features) {
  const rank = Number(feat.properties?.rank ?? 9)
  if (rank > 2) continue
  const idxs = []
  for (const line of feat.geometry.coordinates) {
    let prev = null
    for (const [ra0, dec] of line) {
      const ra = norm(ra0)
      const hit = visualMag(ra, dec)
      const mag = hit.mag
      if (hit.bd >= 0.45) faint++
      const id = addStar(ra, dec, mag)
      idxs.push(id)
      if (prev != null && prev !== id) segments.push([prev, id])
      prev = id
    }
  }
  const name = NAMES[feat.id]
  if (name) {
    groups.push({ name, stars: [...new Set(idxs)] })
  }
}

let extras = 0
for (const s of pts) {
  if (s.mag > 2.15) continue
  const before = catalog.length
  addStar(s.ra, s.dec, s.mag)
  if (catalog.length !== before) extras++
}

const seen = new Set()
const linesOut = []
for (const [a, b] of segments) {
  const k = a < b ? `${a}-${b}` : `${b}-${a}`
  if (seen.has(k)) continue
  seen.add(k)
  linesOut.push([a, b])
}

const starLines = catalog.map((s) => `  [${s[0]}, ${s[1]}, ${s[2]}],`).join('\n')
const lineLines = linesOut.map((s) => `  [${s[0]}, ${s[1]}],`).join('\n')
const groupLines = groups
  .map((g) => `  { name: '${g.name}', stars: [${g.stars.join(', ')}] },`)
  .join('\n')

const out = `/** J2000 RA/Dec (degrees) and visual magnitude for the intro sky.
 *
 * Stick-figure vertices are the rank 1–2 constellation lines from the
 * d3-celestial catalog (https://github.com/ofrohn/d3-celestial), which traces
 * real bright-star positions. RA values published in the −180…180 range are
 * normalized to 0…360. Magnitudes come from that project's magnitude ≤ 6
 * catalog: the brightest star within 0.04° (so a naked-eye double keeps the
 * primary), otherwise the nearest star within 0.45°. Stars brighter than
 * magnitude 2.15 are included even
 * when they are not part of a stick figure.
 *
 * Each star is [raHoursAsDegrees, decDegrees, visualMagnitude].
 */

export const SKY_STARS: readonly (readonly [number, number, number])[] = [
${starLines}
]

/** Undirected stick-figure segments, as indexes into SKY_STARS. */
export const SKY_LINES: readonly (readonly [number, number])[] = [
${lineLines}
]

/** Constellations that may be labeled when they sit clear of the loader art. */
export const SKY_LABELS: readonly { name: string; stars: readonly number[] }[] = [
${groupLines}
]
`

const dest = new URL('../src/components/introSkyCatalog.ts', import.meta.url)
fs.writeFileSync(dest, out)
console.log({ stars: catalog.length, lines: linesOut.length, groups: groups.length, faint, extras })

function show(name, ra, dec) {
  let best = null
  let bd = 1e9
  for (const s of catalog) {
    const d = sep(ra, dec, s[0], s[1])
    if (d < bd) {
      bd = d
      best = s
    }
  }
  console.log(name, best, 'sep', bd.toFixed(3))
}

show('Sirius', 101.287, -16.716)
show('Canopus', 95.988, -52.696)
show('Polaris', 37.955, 89.264)
show('Dubhe', 165.932, 61.751)
show('Acrux', 186.65, -63.099)
show('Betelgeuse', 88.793, 7.407)
show('Rigel', 78.634, -8.202)
show('Vega', 279.235, 38.784)
show('Antares', 247.352, -26.432)
show('Hadar', 210.956, -60.373)
show('Rigil', 219.902, -60.834)
show('Mimosa', 191.93, -59.689)
show('Gacrux', 187.791, -57.113)
show('Schedar', 10.127, 56.537)
show('Alkaid', 206.885, 49.313)
