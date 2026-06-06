'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import ImageModal from '../components/ImageModal'
import { getProtectedImageProps } from '../../lib/getProtectedImageProps'
import '../pages/App.css'
import '../pages/About.css'

const ART_CAROUSEL = [
  { src: '/images/about/art/january.jpg', caption: 'january [2025-01]' },
  { src: '/images/about/art/lily.png', caption: 'dedicated to my friends [2021-08]' },
  { src: '/images/about/art/ecola.png', caption: 'ecola beach [2025-04]' },
  { src: '/images/about/art/dance.png', caption: 'high school dance [2021-01]' },
  { src: '/images/about/art/blue.png', caption: 'blue hydrangeas [2021-07]' },
  { src: '/images/about/art/pool.png', caption: 'belcarra tidepools [2022-02]' },
  { src: '/images/about/art/bridge.png', caption: 'the bridge [2023-09]' },
]

export default function Art() {
  const [artSlide, setArtSlide] = useState(0)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const header = document.querySelector('.navbar')
    if (!header) return undefined

    const handleScroll = () => {
      if (window.scrollY >= 0) {
        header.classList.add('navbarDark')
      } else {
        header.classList.remove('navbarDark')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const open = (src, caption) => setModal({ src, caption })
  const close = () => setModal(null)
  const protectedImage = getProtectedImageProps()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-16 pt-[100px] md:px-10">
        <header className="mb-8 md:mb-10">
          <h1
            className="text-3xl text-gray-800 tracking-tight md:text-4xl"
            style={{ fontFamily: "'boring_reg', sans-serif" }}
          >
            Art
          </h1>
          <p className="about-body-text mt-3 max-w-xl text-gray-600">
            Painting to capture the big chapters of my life. Use the arrows to browse, or click the image to view full
            screen.
          </p>
        </header>

        <div className="about-art-carousel flex flex-col gap-3">
          <div className="about-art-carousel-frame relative flex min-h-[200px] items-center justify-center sm:min-h-[280px]">
            <button
              type="button"
              className="flex w-full cursor-zoom-in items-center justify-start border-0 bg-transparent px-0 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 sm:py-3"
              onClick={() => {
                const slide = ART_CAROUSEL[artSlide]
                if (slide) open(slide.src, slide.caption)
              }}
              aria-label={`Open painting: ${ART_CAROUSEL[artSlide]?.caption || ''}`}
            >
              <Image
                src={ART_CAROUSEL[artSlide]?.src}
                alt={ART_CAROUSEL[artSlide]?.caption || ''}
                className="about-art-painting-img max-h-[min(70vh,620px)] w-full max-w-full object-contain"
                width={1200}
                height={900}
                priority={false}
                {...protectedImage}
              />
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              className="about-art-carousel-nav"
              aria-label="Previous painting"
              onClick={() => setArtSlide((i) => (i - 1 + ART_CAROUSEL.length) % ART_CAROUSEL.length)}
            >
              ‹
            </button>
            <p className="about-body-text m-0 min-w-0 flex-1 text-center text-sm sm:text-base">
              {ART_CAROUSEL[artSlide]?.caption}
            </p>
            <button
              type="button"
              className="about-art-carousel-nav"
              aria-label="Next painting"
              onClick={() => setArtSlide((i) => (i + 1) % ART_CAROUSEL.length)}
            >
              ›
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ART_CAROUSEL.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`about-art-carousel-dot ${i === artSlide ? 'about-art-carousel-dot--active' : ''}`}
                aria-label={`Show painting ${i + 1}`}
                aria-current={i === artSlide ? 'true' : undefined}
                onClick={() => setArtSlide(i)}
              />
            ))}
          </div>
        </div>
      </main>

      <ImageModal open={!!modal} src={modal?.src} caption={modal?.caption} onClose={close} useProtectedImage />
    </div>
  )
}
