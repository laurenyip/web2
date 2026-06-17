'use client'

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from 'react'
import './fortune-cookie.css'

const COOKIE_SRC = '/images/fortune-cookie.png'
const BROKEN_SRC = '/images/fortune-cookie-broken.png'

const FORTUNES = [
  "The unexamined life is not worth living.",
  'Time is an illusion, and so is death.',
  'Love is brightest in the dark.',
  "I'm not gonna teach your boyfriend how to dance with you",
  "Once you've met someone, you never really forget them.",
  "It's not enough to take the one you love for granted",
  "You're lime green jello and you can't even admit it",
  "Drink a pint of Guinness if you're feeling sick.",
  'REMOVE THE WATER FROM THE BOTTOM OF THE OCEAN.',
  'An old acquaintance will re-enter your life',
  'Did you have a brain tumor for breakfast?',
  'Harsh words can\'t solve problems; action will.',
  'Make all the changes you see necessary.',
  'Even miracles take a little time.',
  'Your heart will skip a beat.',
  'You got a face with a view.',
  'Greetings and salutations',
  'Walk 10 kilometres today.',
  'MY GOD, WHAT HAVE I DONE',
  'Dreaming is believing',
  'swim faster',
  'Life happens wherever you are, whether you make it or not.',
]

type Phase = 'idle' | 'breaking' | 'open' | 'dismissing' | 'done'

function pickFortune() {
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
}

function WholeCookie({
  cracking = false,
  onCrackEnd,
}: {
  cracking?: boolean
  onCrackEnd?: (event: AnimationEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      className={['fortune-cookie-whole', cracking ? 'fortune-cookie-whole--cracking' : ''].filter(Boolean).join(' ')}
      onAnimationEnd={cracking ? onCrackEnd : undefined}
    >
      <div className="fortune-cookie-half fortune-cookie-half--left" aria-hidden="true">
        <img src={COOKIE_SRC} alt="" draggable={false} />
      </div>
      <div className="fortune-cookie-half fortune-cookie-half--right" aria-hidden="true">
        <img src={COOKIE_SRC} alt="" draggable={false} />
      </div>
    </div>
  )
}

function FortuneSlipText({ fortune, visible }: { fortune: string; visible: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text || !fortune) return

    const fitText = () => {
      if (box.clientWidth === 0 || box.clientHeight === 0) return

      text.style.fontSize = '8px'

      let size = 8
      while (size > 4.5 && (text.scrollHeight > box.clientHeight || text.scrollWidth > box.clientWidth)) {
        size -= 0.25
        text.style.fontSize = `${size}px`
      }
    }

    fitText()

    const retry = () => requestAnimationFrame(fitText)
    retry()

    const img = box.closest('.fortune-cookie-reveal')?.querySelector('img')
    img?.addEventListener('load', fitText)
    if (img?.complete) fitText()

    const observer = new ResizeObserver(fitText)
    observer.observe(box)

    return () => {
      img?.removeEventListener('load', fitText)
      observer.disconnect()
    }
  }, [fortune, visible])

  return (
    <div ref={boxRef} className={['fortune-slip-overlay', visible ? 'fortune-slip-overlay--visible' : ''].filter(Boolean).join(' ')}>
      <p ref={textRef} className="fortune-slip-text">
        {fortune}
      </p>
    </div>
  )
}

function BrokenCookieReveal({ fortune, visible }: { fortune: string; visible: boolean }) {
  return (
    <div className={['fortune-cookie-reveal', visible ? 'fortune-cookie-reveal--in' : ''].filter(Boolean).join(' ')}>
      <div className="fortune-cookie-reveal-inner">
        <img src={BROKEN_SRC} alt="" className="fortune-cookie-broken-img" draggable={false} />
        <FortuneSlipText fortune={fortune} visible={visible} />
      </div>
    </div>
  )
}

export default function FortuneCookie() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [fortune, setFortune] = useState('')
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    ;[COOKIE_SRC, BROKEN_SRC].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const handleCookieClick = useCallback(() => {
    if (phase !== 'idle') return
    setShowHint(false)
    setFortune(pickFortune())
    setPhase('breaking')
  }, [phase])

  const handleCrackEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (!event.animationName.includes('fortune-cookie-crack')) return
    setPhase('open')
  }, [])

  useEffect(() => {
    if (phase !== 'breaking') return

    const fallback = window.setTimeout(() => {
      setPhase((current) => (current === 'breaking' ? 'open' : current))
    }, 300)

    return () => window.clearTimeout(fallback)
  }, [phase])

  const handleClose = useCallback(() => {
    setPhase('dismissing')
  }, [])

  const handleDismissEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== 'fortune-wrap-out') return
    setPhase('done')
  }, [])

  if (phase === 'done') {
    return null
  }

  const isOpen = phase === 'open' || phase === 'dismissing'

  return (
    <div
      className={[
        'fortune-cookie-wrap',
        isOpen ? 'fortune-cookie-wrap--open' : '',
        phase === 'dismissing' ? 'fortune-cookie-wrap--out' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onAnimationEnd={phase === 'dismissing' ? handleDismissEnd : undefined}
    >
      {showHint && phase === 'idle' ? (
        <p className="fortune-cookie-hint">click the cookie</p>
      ) : null}

      {phase === 'idle' ? (
        <button type="button" className="fortune-cookie-btn" onClick={handleCookieClick} aria-label="Open fortune cookie">
          <WholeCookie />
        </button>
      ) : null}

      {phase === 'breaking' ? (
        <div className="fortune-cookie-btn fortune-cookie-btn--disabled" aria-hidden="true">
          <WholeCookie cracking onCrackEnd={handleCrackEnd} />
        </div>
      ) : null}

      {isOpen ? (
        <>
          <BrokenCookieReveal fortune={fortune} visible={phase === 'open' || phase === 'dismissing'} />
          <button type="button" className="fortune-slip-close" onClick={handleClose} aria-label="Close fortune">
            close ×
          </button>
        </>
      ) : null}
    </div>
  )
}
