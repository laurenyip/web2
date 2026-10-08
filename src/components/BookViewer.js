'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './BookViewer.css'

const MOBILE_QUERY = '(max-width: 720px)'
const FLIP_MS = 680
const MOBILE_MS = 280

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function maxLeafFor(count) {
  return Math.ceil((count - 1) / 2)
}

/** Spread index 0 is the closed cover (right-hand page). Later indexes are open spreads. */
export function spreadAt(leaf, count) {
  const current = clamp(leaf, 0, maxLeafFor(count))
  if (current === 0) {
    return { leaf: 0, left: null, right: 0, single: 'cover' }
  }
  const left = current * 2 - 1
  const rightIndex = left + 1
  const right = rightIndex < count ? rightIndex : null
  return {
    leaf: current,
    left,
    right,
    single: right == null ? 'back' : null,
  }
}

function pageAt(pages, index) {
  if (index == null || index < 0 || index >= pages.length) return null
  return pages[index]
}

function pagePositionLabel(page) {
  if (!page) return ''
  if (/^\d+$/.test(page.label)) return `${page.label} / 76`
  return page.label
}

function spreadPositionLabel(left, right) {
  if (!left && right?.label === 'Cover') return 'Cover'
  if (left?.label === 'Back cover' && !right) return 'Back cover'
  if (left && right && /^\d+$/.test(left.label) && /^\d+$/.test(right.label)) {
    return `${left.label}\u2013${right.label} / 76`
  }
  const parts = [left?.label, right?.label].filter(Boolean)
  return parts.join(' \u2013 ')
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

function PageImg({ page, priority = false }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={page.src}
      alt={page.alt}
      width={430}
      height={543}
      draggable={false}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
    />
  )
}

function Paper({ page, priority = false }) {
  return (
    <div className={`book-page${page ? '' : ' book-page--board'}`}>
      {page ? <PageImg page={page} priority={priority} /> : null}
    </div>
  )
}

export default function BookViewer({ pages, name = 'Magazine' }) {
  const count = pages.length
  const maxLeaf = maxLeafFor(count)
  const rootRef = useRef(null)
  const bookRef = useRef(null)
  const leafRef = useRef(0)
  const mobileIndexRef = useRef(0)
  const motionRef = useRef(null)
  const pendingRef = useRef(null)
  const busyRef = useRef(false)
  const dragCleanupRef = useRef(null)
  const reducedRef = useRef(false)
  const isMobileRef = useRef(false)
  const mobileUnderRef = useRef(null)

  const isMobile = useMediaQuery(MOBILE_QUERY)
  const reduced = usePrefersReducedMotion()
  reducedRef.current = reduced
  isMobileRef.current = isMobile
  const [leaf, setLeaf] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [motion, setMotion] = useState(null)
  const [mobileOffset, setMobileOffset] = useState(0)
  const [mobileAnimating, setMobileAnimating] = useState(false)

  useEffect(() => {
    reducedRef.current = reduced
  }, [reduced])

  useEffect(() => {
    isMobileRef.current = isMobile
  }, [isMobile])

  useEffect(() => {
    leafRef.current = leaf
  }, [leaf])

  useEffect(() => {
    mobileIndexRef.current = mobileIndex
  }, [mobileIndex])

  const setLeafBoth = useCallback((next) => {
    leafRef.current = next
    setLeaf(next)
  }, [])

  const setMobileBoth = useCallback((next) => {
    mobileIndexRef.current = next
    setMobileIndex(next)
  }, [])

  const modeRef = useRef(isMobile)
  useEffect(() => {
    if (modeRef.current === isMobile) return
    modeRef.current = isMobile
    pendingRef.current = null
    busyRef.current = false
    motionRef.current = null
    setMotion(null)
    setMobileOffset(0)
    setMobileAnimating(false)
    mobileUnderRef.current = null
    if (isMobile) {
      const view = spreadAt(leafRef.current, count)
      const nextIndex = view.left == null ? 0 : view.left
      setMobileBoth(nextIndex)
      return
    }
    const page = mobileIndexRef.current
    setLeafBoth(page <= 0 ? 0 : Math.ceil(page / 2))
  }, [count, isMobile, setLeafBoth, setMobileBoth])

  useEffect(() => () => dragCleanupRef.current?.(), [])

  const clearMotion = useCallback(() => {
    pendingRef.current = null
    busyRef.current = false
    motionRef.current = null
    setMotion(null)
  }, [])

  const resolveMotion = useCallback(() => {
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    busyRef.current = false
    if (pending === 'next' || pending === 'prev') {
      const next = clamp(leafRef.current + (pending === 'next' ? 1 : -1), 0, maxLeaf)
      setLeafBoth(next)
    }
    motionRef.current = null
    setMotion(null)
  }, [maxLeaf, setLeafBoth])

  useEffect(() => {
    if (!motion?.animate || !pendingRef.current) return undefined
    const ms = (reducedRef.current ? 40 : FLIP_MS) + 90
    const id = window.setTimeout(resolveMotion, ms)
    return () => window.clearTimeout(id)
  }, [motion, resolveMotion])

  const finishMobile = useCallback(
    (direction) => {
      const current = mobileIndexRef.current
      const next = clamp(current + direction, 0, count - 1)
      if (next === current) {
        setMobileAnimating(true)
        setMobileOffset(0)
        window.setTimeout(() => setMobileAnimating(false), reducedRef.current ? 0 : MOBILE_MS)
        return
      }
      if (reducedRef.current) {
        setMobileBoth(next)
        setMobileOffset(0)
        setMobileAnimating(false)
        mobileUnderRef.current = null
        busyRef.current = false
        return
      }
      const width = bookRef.current?.getBoundingClientRect().width || 320
      mobileUnderRef.current = next
      busyRef.current = true
      setMobileAnimating(true)
      setMobileOffset(direction > 0 ? -width : width)
      window.setTimeout(() => {
        if (mobileUnderRef.current !== next) return
        mobileUnderRef.current = null
        busyRef.current = false
        setMobileBoth(next)
        setMobileAnimating(false)
        setMobileOffset(0)
      }, MOBILE_MS + 70)
    },
    [count, setMobileBoth]
  )

  const turnMobile = useCallback(
    (direction) => {
      if (busyRef.current) return
      finishMobile(direction)
    },
    [finishMobile]
  )

  const turn = useCallback(
    (direction) => {
      if (busyRef.current || motionRef.current) return
      rootRef.current?.focus({ preventScroll: true })
      if (isMobileRef.current) {
        turnMobile(direction === 'next' ? 1 : -1)
        return
      }
      const current = leafRef.current
      if (direction === 'next' && current >= maxLeaf) return
      if (direction === 'prev' && current <= 0) return
      if (reducedRef.current) {
        setLeafBoth(clamp(current + (direction === 'next' ? 1 : -1), 0, maxLeaf))
        return
      }
      busyRef.current = true
      pendingRef.current = direction
      const start = { dir: direction, progress: 0, animate: false }
      motionRef.current = start
      setMotion(start)
      window.requestAnimationFrame(() => {
        if (pendingRef.current !== direction) return
        const armed = { dir: direction, progress: 0, animate: true }
        motionRef.current = armed
        setMotion(armed)
        window.requestAnimationFrame(() => {
          if (pendingRef.current !== direction) return
          const running = { dir: direction, progress: 1, animate: true }
          motionRef.current = running
          setMotion(running)
        })
      })
    },
    [maxLeaf, setLeafBoth, turnMobile]
  )

  const onKeyDown = useCallback(
    (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      event.stopPropagation()
      turn(event.key === 'ArrowRight' ? 'next' : 'prev')
    },
    [turn]
  )

  const onHotspotDown = (direction) => (event) => {
    if (event.button != null && event.button !== 0) return
    if (busyRef.current || isMobileRef.current) return
    const current = leafRef.current
    if (direction === 'next' && current >= maxLeaf) return
    if (direction === 'prev' && current <= 0) return
    event.preventDefault()
    rootRef.current?.focus({ preventScroll: true })

    if (reducedRef.current) {
      const startX = event.clientX
      const width = (bookRef.current?.getBoundingClientRect().width || 400) / 2
      let moved = false
      const move = (moveEvent) => {
        if (Math.abs(moveEvent.clientX - startX) > 8) moved = true
      }
      const up = (upEvent) => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
        dragCleanupRef.current = null
        const dx = upEvent.clientX - startX
        const raw = direction === 'next' ? -dx / width : dx / width
        const complete = !moved || raw > 0.22
        if (complete) {
          setLeafBoth(clamp(current + (direction === 'next' ? 1 : -1), 0, maxLeaf))
        }
      }
      dragCleanupRef.current = () => up({ clientX: startX })
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
      return
    }

    const width = (bookRef.current?.getBoundingClientRect().width || 400) / 2
    const startX = event.clientX
    let moved = false
    const start = { dir: direction, progress: 0, animate: false }
    motionRef.current = start
    setMotion(start)

    const move = (moveEvent) => {
      const dx = moveEvent.clientX - startX
      if (Math.abs(dx) > 8) moved = true
      const raw = direction === 'next' ? -dx / width : dx / width
      const progress = clamp(raw, 0, 1)
      const next = { dir: direction, progress, animate: false }
      motionRef.current = next
      setMotion(next)
    }

    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      dragCleanupRef.current = null
      const progress = motionRef.current?.progress ?? 0
      const complete = !moved || progress > 0.22
      if (reducedRef.current) {
        clearMotion()
        if (complete) {
          setLeafBoth(clamp(current + (direction === 'next' ? 1 : -1), 0, maxLeaf))
        }
        return
      }
      if (!complete && progress < 0.01) {
        clearMotion()
        return
      }
      busyRef.current = true
      pendingRef.current = complete ? direction : 'cancel'
      const held = { dir: direction, progress, animate: true }
      motionRef.current = held
      setMotion(held)
      window.requestAnimationFrame(() => {
        if (pendingRef.current !== direction && pendingRef.current !== 'cancel') return
        const target = { dir: direction, progress: complete ? 1 : 0, animate: true }
        motionRef.current = target
        setMotion(target)
      })
    }

    dragCleanupRef.current = up
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const onMobilePointerDown = (event) => {
    if (event.button != null && event.button !== 0) return
    if (busyRef.current) return
    const startX = event.clientX
    const startY = event.clientY
    let dx = 0
    let active = false
    rootRef.current?.focus({ preventScroll: true })

    const move = (moveEvent) => {
      const nextDx = moveEvent.clientX - startX
      const nextDy = moveEvent.clientY - startY
      if (!active) {
        if (Math.abs(nextDx) < 8 && Math.abs(nextDy) < 8) return
        if (Math.abs(nextDy) > Math.abs(nextDx)) {
          up(false)
          return
        }
        active = true
      }
      const current = mobileIndexRef.current
      const atStart = current <= 0 && nextDx > 0
      const atEnd = current >= count - 1 && nextDx < 0
      dx = atStart || atEnd ? nextDx * 0.28 : nextDx
      setMobileAnimating(false)
      setMobileOffset(dx)
    }

    const up = (shouldTurn = true) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      dragCleanupRef.current = null
      if (!shouldTurn) {
        setMobileOffset(0)
        return
      }
      const width = bookRef.current?.getBoundingClientRect().width || 320
      if (!active) {
        const rect = bookRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = event.clientX - rect.left
        if (x > rect.width * 0.72) finishMobile(1)
        else if (x < rect.width * 0.28) finishMobile(-1)
        return
      }
      if (dx < -Math.max(48, width * 0.18)) finishMobile(1)
      else if (dx > Math.max(48, width * 0.18)) finishMobile(-1)
      else {
        setMobileAnimating(true)
        setMobileOffset(0)
        window.setTimeout(() => setMobileAnimating(false), reduced ? 0 : MOBILE_MS)
      }
    }

    dragCleanupRef.current = () => up(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const onMobileTransitionEnd = (event) => {
    if (event.propertyName !== 'transform') return
    if (!mobileAnimating || mobileUnderRef.current == null) {
      setMobileAnimating(false)
      return
    }
    const next = mobileUnderRef.current
    mobileUnderRef.current = null
    busyRef.current = false
    setMobileBoth(next)
    setMobileAnimating(false)
    setMobileOffset(0)
  }

  const onLeafTransitionEnd = (event) => {
    if (event.propertyName !== 'transform') return
    if (event.target !== event.currentTarget) return
    resolveMotion()
  }

  const view = spreadAt(leaf, count)
  const indicator = isMobile
    ? pagePositionLabel(pages[mobileIndex])
    : spreadPositionLabel(pageAt(pages, view.left), pageAt(pages, view.right))

  const canPrev = isMobile ? mobileIndex > 0 : leaf > 0
  const canNext = isMobile ? mobileIndex < count - 1 : leaf < maxLeaf

  const preloadIndexes = useMemo(() => {
    const indexes = []
    const add = (index) => {
      if (index == null || index < 0 || index >= count || indexes.includes(index)) return
      indexes.push(index)
    }
    if (isMobile) {
      ;[mobileIndex - 1, mobileIndex, mobileIndex + 1, mobileIndex + 2].forEach(add)
      return indexes
    }
    for (let spread = leaf - 1; spread <= leaf + 1; spread += 1) {
      if (spread < 0 || spread > maxLeaf) continue
      const spreadView = spreadAt(spread, count)
      add(spreadView.left)
      add(spreadView.right)
    }
    add(spreadAt(Math.min(maxLeaf, leaf + 2), count).left)
    return indexes
  }, [count, isMobile, leaf, maxLeaf, mobileIndex])

  let staticLeft = pageAt(pages, view.left)
  let staticRight = pageAt(pages, view.right)
  let front = null
  let back = null
  let angle = 0
  let shade = 0

  if (!isMobile && motion) {
    const current = spreadAt(leaf, count)
    if (motion.dir === 'next') {
      const next = spreadAt(leaf + 1, count)
      staticLeft = pageAt(pages, current.left)
      staticRight = pageAt(pages, next.right)
      front = pageAt(pages, current.right)
      back = pageAt(pages, next.left)
      angle = -180 * motion.progress
    } else {
      const prev = spreadAt(leaf - 1, count)
      staticLeft = pageAt(pages, prev.left)
      staticRight = pageAt(pages, current.right)
      front = pageAt(pages, prev.right)
      back = pageAt(pages, current.left)
      angle = -180 * (1 - motion.progress)
    }
    shade = Math.sin(clamp(motion.progress, 0, 1) * Math.PI) * 0.9
  }

  const mobileUnder =
    mobileAnimating && mobileUnderRef.current != null
      ? mobileUnderRef.current
      : mobileOffset < -1
        ? mobileIndex + 1
        : mobileOffset > 1
          ? mobileIndex - 1
          : null

  return (
    <div
      ref={rootRef}
      className={`book-viewer${isMobile ? ' book-viewer--mobile' : ''}`}
      role="region"
      tabIndex={0}
      aria-label={`${name} magazine`}
      onKeyDown={onKeyDown}
    >
      <p className="book-viewer-sr">
        Click or drag a corner to turn the page. Left and right arrow keys turn pages while this viewer is focused.
      </p>
      <div className="book-stage">
        {isMobile ? (
          <div
            ref={bookRef}
            className="book book--single"
            onPointerDown={onMobilePointerDown}
          >
            <div className="book-page book-page--under">
              {mobileUnder != null && pageAt(pages, mobileUnder) ? (
                <PageImg page={pages[mobileUnder]} priority />
              ) : null}
            </div>
            <div
              className={`book-page book-page--top${mobileAnimating ? ' book-page--animate' : ''}`}
              style={{ transform: `translateX(${mobileOffset}px)` }}
              onTransitionEnd={onMobileTransitionEnd}
            >
              <PageImg page={pages[mobileIndex]} priority />
            </div>
          </div>
        ) : (
          <div ref={bookRef} className="book book--spread" data-leaf={leaf}>
            <Paper page={staticLeft} priority={!motion} />
            <Paper page={staticRight} priority={!motion} />
            {motion && (front || back) ? (
              <div
                className={`book-leaf${motion.animate ? ' book-leaf--animate' : ''}`}
                style={{ transform: `rotateY(${angle}deg)` }}
                onTransitionEnd={onLeafTransitionEnd}
              >
                <div className="book-leaf-face book-leaf-face--front">
                  {front ? <PageImg page={front} priority /> : null}
                  <span className="book-leaf-shade" style={{ opacity: shade }} />
                </div>
                <div className="book-leaf-face book-leaf-face--back">
                  {back ? <PageImg page={back} priority /> : null}
                  <span className="book-leaf-shade" style={{ opacity: shade }} />
                </div>
              </div>
            ) : null}
            <div className="book-spine" aria-hidden="true" />
            {canPrev ? (
              <div
                className="book-hotspot book-hotspot--prev"
                aria-hidden="true"
                onPointerDown={onHotspotDown('prev')}
              />
            ) : null}
            {canNext ? (
              <div
                className="book-hotspot book-hotspot--next"
                aria-hidden="true"
                onPointerDown={onHotspotDown('next')}
              />
            ) : null}
          </div>
        )}
      </div>
      <div className="book-toolbar">
        <button type="button" onClick={() => turn('prev')} disabled={!canPrev}>
          Previous
        </button>
        <p className="book-indicator cs-body" aria-live="polite" aria-atomic="true">
          {indicator}
        </p>
        <button type="button" onClick={() => turn('next')} disabled={!canNext}>
          Next
        </button>
      </div>
      <div className="book-preload" aria-hidden="true">
        {preloadIndexes.map((index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={pages[index].src} src={pages[index].src} alt="" width={430} height={543} />
        ))}
      </div>
    </div>
  )
}
