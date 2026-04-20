import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ImageModal from '../components/ImageModal'
import './App.css'
import resumePdf from './Resume___Lauren_Yip.pdf'

/** Images live under `public/images/home/` */
const FIGMA_HOME = {
  portrait: '/images/home/portrait.png',
  row2: [
    { src: '/images/home/love-you.png', caption: 'Love you' },
    { src: '/images/home/lion.png', caption: 'Lion dance' },
    { src: '/images/home/chacha.png', caption: 'Cha cha' },
  ],
  row3: [
    { src: '/images/home/paris_wip.png', caption: 'in progress' },
    { src: '/images/home/chilies.png', caption: 'Drying chilies' },
    { src: '/images/home/beads.png', caption: 'Beads' },
  ],
}

function Home() {
  const [modal, setModal] = useState(null)
  const openModal = (src, caption) => setModal({ src, caption })
  const closeModal = () => setModal(null)

  return (
    <div className="home-page min-h-screen bg-white">
      <Navbar />

      {/*
        OUTER: 1280px centered column, 40px gutters on each side.
        This is the only centering div — nothing inside re-centers.
      */}
      <main style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box',
        paddingTop: 'calc(7rem + 50px)',
        paddingBottom: '4rem',
        paddingLeft: '40px',
        paddingRight: '40px',
      }}>

        {/* Hero title */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: "'Melo', sans-serif",
              fontSize: 'clamp(2.25rem, 11vw, 96px)',
              fontWeight: 400,
              color: '#374151',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-1px',
            }}
          >
            Lauren Yip
          </h1>
          <p  className="home-hero-subtitle text-center" style={{ marginTop: '0.75rem' }}>
            Product Designer · Computer Science @ SFU · Artist and Explorer
          </p>
        </header>

        {/*
          ROWS WRAPPER
          On desktop (≥1024px): padding-left: 50px
          → 40px (main gutter) + 50px = 90px from the 1280px left edge.
          No mx-auto, no justify-center anywhere inside.
        */}
        <div className="home-page-rows" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* ── Row 1: charm card (left) + portrait (right) ── */}
          <div className="home-row1">

            {/* Charm: align-self start so it doesn't stretch to portrait height */}
            <div className="charm-swing" style={{ width: '100%', maxWidth: '456px', flexShrink: 0, alignSelf: 'flex-start' }}>
              <div className="containermain home-charm-box" style={{ padding: '5%', width: '100%', boxSizing: 'border-box' }}>
                <p3>YIP/LAUREN宝怡</p3>
                <br /><br />
                <p3>the website &nbsp; 09FEB 2003</p3>
                <br />
                <p2>FM</p2><p3>&nbsp;&nbsp;VANCOUVER/YVR</p3>
                <br /><p2>TO</p2><p3>&nbsp;&nbsp;THEWORLD/!!!</p3>
                <br /><br /><br />
                <p2>
                  &nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status @ SFU
                </p2>
                <br /><p3b>23A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YEAR4</p3b>
                <br />
                <p3>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href={resumePdf} target="_blank" rel="noopener noreferrer">RESUME</a>
                </p3>
                <br />
                <p2>
                  <a href="mailto:laurenyip20@gmail.com" style={{ color: 'inherit' }}>laurenyip20@gmail.com</a>
                  {' --- '}
                  <a href="https://www.linkedin.com/in/lauren-yip" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                    linkedin.com/in/lauren-yip
                  </a>
                </p2>
              </div>
            </div>

            {/* Portrait — fills remaining width */}
            <button
              type="button"
              onClick={() => openModal(FIGMA_HOME.portrait, 'Lauren Yip')}
              aria-label="Open portrait fullscreen"
              style={{
                display: 'block', flex: 1, minWidth: 0, cursor: 'zoom-in',
                overflow: 'hidden', borderRadius: '10px',
                border: '1px solid rgba(209,213,219,0.8)',
                background: '#f9fafb', padding: 0, textAlign: 'left',
              }}
            >
              <img
                src={FIGMA_HOME.portrait}
                alt="Portrait"
                style={{
                  width: '100%',
                  height: 420,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
                loading="eager"
              />
            </button>
          </div>

          {/* ── Row 2: three photos — sides fill row height; middle fills column width ── */}
          <div className="home-row2">
            {FIGMA_HOME.row2.map(({ src, caption }, index) => {
              const isMiddle = index === 1
              return (
                <button
                  key={src}
                  type="button"
                  className={isMiddle ? 'home-row2-btn home-row2-middle' : 'home-row2-btn home-row2-side'}
                  onClick={() => openModal(src, caption)}
                  aria-label={`Open image: ${caption}`}
                >
                  <img src={src} alt={caption} loading="lazy" />
                </button>
              )
            })}
          </div>

          {/* ── Row 3: text card + three photos ── */}
          <div className="home-row3">
            <div style={{
              display: 'flex', alignItems: 'center',
              borderRadius: '10px', border: '1px solid #001c80',
              background: '#fff', padding: '12px',
            }}>
              <div className="home-f25-body">
                Thanks for visiting my website! <p>If anything on this website resonated, or you want to make something cool together,</p> please reach out!
              </div>
            </div>
            {FIGMA_HOME.row3.map(({ src, caption }) => (
              <button
                key={src}
                type="button"
                onClick={() => openModal(src, caption)}
                aria-label={`Open image: ${caption}`}
                style={{
                  display: 'block', width: '100%', cursor: 'zoom-in',
                  overflow: 'hidden', borderRadius: '10px',
                  border: '1px solid rgba(209,213,219,0.8)',
                  background: '#fff', padding: 0,
                }}
              >
                <img src={src} alt={caption} style={{ aspectRatio: '1/1', width: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </button>
            ))}
          </div>

        </div>
      </main>

      <ImageModal open={!!modal} src={modal?.src} caption={modal?.caption} onClose={closeModal} />

      <style>{`
        /* Row 1: stacked on mobile, side-by-side on desktop */
        .home-row1 {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 1024px) {
          .home-row1 { flex-direction: row; align-items: flex-start; }
        }

        /* Row 2: stacked mobile; sm+ middle column wider, sides = full row height, middle = full cell width */
        .home-row2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .home-row2-btn {
          display: block;
          margin: 0;
          padding: 0;
          cursor: zoom-in;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(209, 213, 219, 0.8);
          background: #fff;
          width: 100%;
          height: 357px;
        }
        .home-row2-btn img {
          display: block;
        }
        .home-row2-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .home-row2-middle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        @media (min-width: 640px) {
          .home-row2 {
            grid-template-columns: 1fr 2fr 1fr;
            align-items: stretch;
            height: 357px;
          }
          .home-row2-btn {
            height: 100%;
            min-height: 0;
          }
        }

        /* Row 3: 1 col → text + 3 photos */
        .home-row3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 1024px) {
          .home-row3 { grid-template-columns: 1fr 1fr 1fr 1fr; }
        }

        /*
          KEY FIX:
          Desktop ≥1024px: rows offset 50px inward.
          main already has 40px paddingLeft, so total = 90px from 1280px left edge.
          No Tailwind mx-auto or justify-center inside — left-alignment is the default.
        */
        @media (min-width: 1024px) {
          .home-page-rows { padding-left: 50px; }
        }

        /* Mobile: collapse extra offset and tighten gutters */
        @media (max-width: 640px) {
          .home-page-rows { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}

export default Home