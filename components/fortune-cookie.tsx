'use client'

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from 'react'
import './fortune-cookie.css'

const COOKIE_SRC = '/images/fortune-cookie.png'
const BROKEN_SRC = '/images/fortune-cookie-broken.png'
const COOKIE_W = 108
const COOKIE_H = 86

const FORTUNES = [
  'An old acquaintance will re-enter your life',
  "Whether you think you can or whether you think you can't, you are right.",
  'Your heart will skip a beat.',
  'swim faster',
  "I'm not gonna teach your boyfriend how to dance with you",
  'Greetings and salutations',
  "You're lime green jello and you can't even admit it",
  'Did you have a brain tumor for breakfast?',
  "It's not enough to take the one you love for granted",
  'Walk 10 kilometres today.',
  "Once you've met someone, you never really forget them.",
  'Even miracles take a little time.',
  'You have survived every hard day so far. This one is no different.',
  'Dreaming is believing',
  'The flower that blooms in adversity is the most rare and beautiful of all',
  'You got a face with a view.',
  'REMOVE THE WATER FROM THE BOTTOM OF THE OCEAN.',
  'MY GOD, WHAT HAVE I DONE',
  'Make all the changes you see necessary.',
  'In two days, tomorrow will be yesterday.',
  "Drink a pint of Guinness if you're feeling sick.",
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
      style={{ width: COOKIE_W, height: COOKIE_H }}
      onAnimationEnd={cracking ? onCrackEnd : undefined}
    >
      <div className="fortune-cookie-half fortune-cookie-half--left" aria-hidden="true">
        <img src={COOKIE_SRC} alt="" draggable={false} width={COOKIE_W} height={COOKIE_H} />
      </div>
      <div className="fortune-cookie-half fortune-cookie-half--right" aria-hidden="true">
        <img src={COOKIE_SRC} alt="" draggable={false} width={COOKIE_W} height={COOKIE_H} />
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

      text.style.fontSize = '9px'

      let size = 9
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

  const handleCookieClick = useCallback(() => {
    if (phase !== 'idle') return
    setShowHint(false)
    setFortune(pickFortune())
    setPhase('breaking')
  }, [phase])

  const handleCrackEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== 'fortune-cookie-crack') return
    setPhase('open')
  }, [])

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
