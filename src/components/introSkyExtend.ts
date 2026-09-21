type RGB = { r: number; g: number; b: number }

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
): RGB {
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
  if (!n) return { r: 10, g: 19, b: 37 }
  return { r: r / n, g: g / n, b: b / n }
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function stamp(
  ctx: CanvasRenderingContext2D,
  src: HTMLCanvasElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  alpha: number,
  blur = 0,
  flipX = false,
) {
  if (dw < 1 || dh < 1 || alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = alpha
  if (blur) ctx.filter = `blur(${blur}px)`
  if (flipX) {
    ctx.translate(dx + dw, dy)
    ctx.scale(-1, 1)
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, dw, dh)
  } else {
    ctx.drawImage(src, sx, sy, sw, sh, dx, dy, dw, dh)
  }
  ctx.restore()
}

export function paintIntroSky(canvas: HTMLCanvasElement, gif: HTMLImageElement, loader: HTMLElement) {
  const nw = gif.naturalWidth
  const nh = gif.naturalHeight
  if (!nw || !nh) return

  const loaderRect = loader.getBoundingClientRect()
  const gifRect = gif.getBoundingClientRect()
  const vw = loaderRect.width
  const vh = loaderRect.height
  const gifX = gifRect.left - loaderRect.left
  const gifY = gifRect.top - loaderRect.top
  const gifW = gifRect.width
  const gifH = gifRect.height
  if (gifW < 8 || gifH < 8) return
  const zx = gifW / nw
  const zy = gifH / nh

  const dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = Math.max(1, Math.round(vw * dpr))
  canvas.height = Math.max(1, Math.round(vh * dpr))
  canvas.style.width = `${vw}px`
  canvas.style.height = `${vh}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const src = document.createElement('canvas')
  src.width = nw
  src.height = nh
  const sctx = src.getContext('2d', { willReadFrequently: true })
  if (!sctx) return
  sctx.drawImage(gif, 0, 0)
  const pixels = sctx.getImageData(0, 0, nw, nh).data

  const sky = sample(pixels, nw, nh, 0, 0, 150, 70, (r, g, b) => lum(r, g, b) < 90)
  const bottom = sample(pixels, nw, nh, 0, nh * 0.86, nw, nh)
  const moonLit = sample(pixels, nw, nh, nw * 0.2, nh * 0.12, nw * 0.34, nh * 0.32, (r, g, b) => lum(r, g, b) < 150)

  loader.style.background = css(sky)
  canvas.dataset.sky = 'v4'

  const wash = ctx.createLinearGradient(0, 0, 0, vh)
  wash.addColorStop(0, css(sky))
  wash.addColorStop(Math.max(0, Math.min(1, (gifY + gifH * 0.22) / vh)), css(mix(sky, moonLit, 0.5)))
  wash.addColorStop(Math.max(0, Math.min(1, (gifY + gifH * 0.7) / vh)), css(mix(sky, bottom, 0.55)))
  wash.addColorStop(Math.max(0, Math.min(1, (gifY + gifH) / vh)), css(bottom))
  wash.addColorStop(1, css(mix(bottom, { r: 14, g: 20, b: 30 }, 0.28)))
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, vw, vh)

  const moonX = gifX + gifW * 0.534
  const moonY = gifY + gifH * 0.42
  const glow = ctx.createRadialGradient(moonX, moonY, gifW * 0.18, moonX, moonY, gifW * 0.72)
  glow.addColorStop(0, 'rgba(198, 216, 232, 0.16)')
  glow.addColorStop(0.42, css(moonLit, 0.16))
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, vw, vh)

  const starLimit = gifY + gifH * 0.58
  for (let y = 6; y < Math.min(vh, starLimit); y += 15) {
    for (let x = 8; x < vw; x += 20) {
      const n = hash(x + 2.1, y + 4.4)
      if (n > 0.085) continue
      if (x > gifX + 4 && x < gifX + gifW - 4 && y > gifY + 4 && y < gifY + gifH - 4) continue
      ctx.fillStyle = `rgba(228, 236, 248, ${0.32 + n * 3.8})`
      ctx.beginPath()
      ctx.arc(x + n * 16, y + hash(y, x) * 12, n < 0.022 ? 1.3 : 0.75, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  stamp(ctx, src, 0, 66, 160, 92, gifX - 140 * zx, gifY + 54 * zy, 175 * zx, 102 * zy, 0.82, 1.8)
  stamp(ctx, src, 0, 138, 210, 94, gifX - 190 * zx, gifY + 128 * zy, 240 * zx, 108 * zy, 0.86, 2.2)
  stamp(ctx, src, 0, 196, 260, 88, gifX - 220 * zx, gifY + 184 * zy, 300 * zx, 112 * zy, 0.9, 2.6)
  stamp(ctx, src, 0, 66, 160, 92, gifX - 260 * zx, gifY + 70 * zy, 185 * zx, 104 * zy, 0.28, 4, true)

  stamp(ctx, src, 340, 60, 158, 104, gifX + gifW - 28 * zx, gifY + 52 * zy, 192 * zx, 116 * zy, 0.82, 1.8)
  stamp(ctx, src, 300, 136, 198, 96, gifX + gifW - 14 * zx, gifY + 126 * zy, 248 * zx, 112 * zy, 0.86, 2.2)
  stamp(ctx, src, 250, 196, 248, 88, gifX + gifW - 32 * zx, gifY + 184 * zy, 310 * zx, 114 * zy, 0.9, 2.6)
  stamp(ctx, src, 340, 60, 158, 104, gifX + gifW + 96 * zx, gifY + 74 * zy, 192 * zx, 112 * zy, 0.28, 4, true)

  stamp(ctx, src, 0, 204, nw * 0.45, 80, gifX - 80 * zx, gifY + gifH - 52 * zy, gifW * 0.52, 116 * zy, 0.88, 3.2)
  stamp(ctx, src, nw * 0.55, 204, nw * 0.45, 80, gifX + gifW * 0.48, gifY + gifH - 52 * zy, gifW * 0.6, 116 * zy, 0.88, 3.2)
  stamp(ctx, src, 8, 220, nw * 0.42, 64, gifX - 24 * zx, gifY + gifH + 18 * zy, gifW * 0.5, 90 * zy, 0.48, 4.2)
  stamp(ctx, src, nw * 0.52, 220, nw * 0.44, 64, gifX + gifW * 0.48, gifY + gifH + 18 * zy, gifW * 0.52, 90 * zy, 0.48, 4.2)
  stamp(ctx, src, 36, 230, nw * 0.38, 52, gifX + 16 * zx, gifY + gifH + 68 * zy, gifW * 0.44, 74 * zy, 0.26, 5.2)
  stamp(ctx, src, nw * 0.48, 230, nw * 0.4, 52, gifX + gifW * 0.44, gifY + gifH + 68 * zy, gifW * 0.52, 74 * zy, 0.26, 5.2)
}
