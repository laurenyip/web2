'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import ImageModal from '../components/ImageModal'
import VinylMusicShelf from '../components/VinylMusicShelf'
import './App.css'
import './About.css'

const FAVORITES_POSTERS = [
  {
    src: '/images/about/favorites/movies/whisper-of-the-heart.png',
    caption: 'Whisper of the Heart — Studio Ghibli',
  },
  {
    src: '/images/about/favorites/movies/before-sunrise.png',
    caption: 'Before Sunrise',
  },
  {
    src: '/images/about/favorites/movies/marty-supreme.png',
    caption: 'Marty Supreme',
  },
  {
    src: '/images/about/favorites/movies/enchanted.png',
    caption: 'Enchanted',
  },
]

const FAVORITES_LINKS = [
  {
    label: 'Essays about frames, fashion, movies, and making stuff',
    href: '/reading-list',
  },
  {
    label: "Books that let me experience a world I wouldn't have otherwise known",
    href: '/reading-list',
  },
  {
    label: 'Love songs with some angst and yearning (also Irish music)',
    href:
      'https://open.spotify.com/playlist/7nTtTPZW33up9yRhi7DTd9?si=dcf3c7640d934d7c&pt=4a9277e20074441d8ccca963598ca157',
  },
  { label: 'Movies that I rate 5 stars', href: 'https://letterboxd.com/laurenyip/' },
]

const imgTile =
  'block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-gray-200/80 bg-white p-0 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'

export default function About() {
  const [modal, setModal] = useState(null)
  const open = (src, caption) => setModal({ src, caption })
  const close = () => setModal(null)

  return (
    <div className="about-page min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <main className="about-main-inner mx-auto w-full px-4 pb-24 pt-[calc(var(--site-nav-block-height,5.85rem)+50px)] md:px-6 lg:px-8">
        <section className="about-figma-section relative about-section--00">
          <div className="about-grid-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
            <div className="order-1 flex w-full justify-center lg:col-span-6 lg:justify-start lg:pt-2">
              <button
                type="button"
                className="about-hero-portrait-btn"
                onClick={() => open('/images/home/portrait.png', 'LY')}
                aria-label="Open portrait"
              >
                <Image
                  src="/images/home/portrait.png"
                  alt="Lauren Yip"
                  className="about-hero-portrait-img"
                  width={1200}
                  height={900}
                  priority={false}
                />
              </button>
            </div>

            <div className="order-2 flex flex-col lg:col-span-6">
              <div className="about-whoami-intro">
                <div className="about-whoami-rail">
                  <div className="about-section-num">00</div>
                  <p className="about-body-text about-whoami-label mt-2 m-0">Who Am I</p>
                </div>
                <h2
                  className="about-whoami-title m-0 font-normal italic leading-none tracking-tight text-gray-800"
                  style={{
                    fontFamily: "'Melo', sans-serif",
                    fontSize: 'clamp(2.25rem, 11vw, 96px)',
                  }}
                >
                  I&apos;m Lauren!
                </h2>
                <div className="about-whoami-body about-body-text max-w-xl">
                  <p>
                    <a
                      href="https://open.spotify.com/track/3qlnSUQ6AroH5DazK38ch4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-inline-link"
                    >
                      In my life
                    </a>
                    , I most value curiosity and happiness.
                  </p>
                  <p>
                    Curiosity: I&apos;m fulfilling through the pursuit of new knowledge and experiences. [see{' '}
                    <Link href="/reading-list" className="about-inline-link">
                      reading list
                    </Link>{' '}
                    and{' '}
                    <Link href="/playground#sidequests" className="about-inline-link">
                      sidequests
                    </Link>
                    ]
                  </p>

                  <p>
                    Happiness: Through meaningful work and the love of everything! [see{' '}
                    <Link href="/playground#art" className="about-inline-link">
                      art
                    </Link>{' '}
                    and{' '}
                    <Link href="/playground#writing" className="about-inline-link">
                      writing
                    </Link>
                    ]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-figma-section about-section--01">
          <div className="about-layout-12">
            <div className="about-layout-rail-left max-w-xl">
              <div className="about-section-num">01</div>
              <p className="about-body-text mt-1 m-0">Objectives</p>

              <p>(of my website)</p>
              <p>1. to get me a job. (or money, in general)</p>
              <p>2. to hold all my art and writing</p>
              <p>3. to connect with new people and make some cool friends</p>
              <p>4. to delight and surprise</p>
            </div>
            <div className="about-layout-media about-objectives-media flex w-full justify-center lg:justify-end lg:pt-2">
              <div className="about-hero-collage about-objectives-collage w-full max-w-[min(100%,360px)] pl-2 lg:max-w-[340px] lg:pl-0">
                <button
                  type="button"
                  className="about-hero-optimist-btn"
                  onClick={() => open('/images/about/whoami/optimist.png', 'SF chinatown')}
                  aria-label="Open OPTIMIST mural"
                >
                  <Image
                    src="/images/about/whoami/optimist.png"
                    alt="OPTIMIST mural"
                    className="about-hero-optimist-img"
                    width={800}
                    height={1100}
                    priority={false}
                  />
                </button>
                <div className="about-hero-charm-btn charm-swing" aria-hidden="true">
                  <Image
                    src="/images/about/whoami/charm.png"
                    alt=""
                    className="about-hero-charm-img rounded-[10px]"
                    width={900}
                    height={1200}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-figma-section about-section--02">
          <div className="about-layout-12">
            <div className="about-layout-media w-full min-w-0">
              <button
                type="button"
                className="mb-4 block max-h-[228px] w-auto cursor-zoom-in rounded-[10px] border-0 bg-transparent p-0"
                onClick={() => open('/images/about/favorites/fish.gif', 'Koi · ink sketch')}
                aria-label="Open koi sketch"
              >
                <Image
                  src="/images/about/favorites/fish.gif"
                  alt="Koi fish ink sketch"
                  className="max-h-[208px] w-auto rounded-[10px] object-contain shadow-sm"
                  width={900}
                  height={500}
                  priority={false}
                />
              </button>
              <div className="about-favorites-posters-offset grid w-full grid-cols-2 gap-3 lg:max-w-[170px]">
                {FAVORITES_POSTERS.map(({ src, caption }) => (
                  <button
                    key={src}
                    type="button"
                    className={imgTile}
                    onClick={() => open(src, caption)}
                    aria-label={caption}
                  >
                    <Image
                      src={src}
                      alt={caption}
                      className="aspect-[2/3] w-full object-cover"
                      width={400}
                      height={600}
                      priority={false}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="about-layout-rail flex w-full min-w-0 flex-col items-start gap-8 text-left">
              <div className="flex w-full flex-col items-start">
                <div className="about-section-num">02</div>
                <p className="about-body-text mt-1 m-0">Favorites</p>
              </div>

              <ul className="m-0 list-none space-y-3 p-0">
                {FAVORITES_LINKS.map((item) => (
                  <li key={item.href + item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-writing-link transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <VinylMusicShelf onImageOpen={open} />
            </div>
          </div>
        </section>

        <section className="about-figma-section about-section--03">
          <div className="about-layout-12">
            <div className="about-layout-rail-left max-w-xl">
              <div className="about-section-num">03</div>
              <p className="about-body-text mt-1 m-0">Wishes</p>
              <p>1. for all my family and friends to be happy and healthy.</p>
              <p>2. to have a bright future.</p>
              <p>3. to find true love</p>
            </div>

            <div className="about-layout-media w-full min-w-0">
              <div className="flex max-w-xl flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
                <button
                  type="button"
                  className="about-hightide-btn shrink-0 cursor-zoom-in overflow-hidden rounded-[10px] border border-gray-200/80 bg-white p-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                  onClick={() =>
                    open('/images/about/favorites/hightide.png', 'High Tide by Jan Toorop — My favorite painting!')
                  }
                  aria-label="favorite painting"
                >
                  <Image
                    src="/images/about/favorites/hightide.png"
                    alt="High Tide by Jan Toorop"
                    className="about-hightide-img block h-auto w-[80vw] max-w-[220px] sm:w-[min(220px,100%)] sm:max-w-[220px] rounded-none lg:rounded-[5px] object-cover"
                    width={440}
                    height={560}
                    priority={false}
                  />
                </button>
                <div className="about-body-text min-w-0 space-y-1 text-left">
                  <p className="m-0 text-gray-800">High Tide by Jan Toorop</p>
                  <p className="m-0 italic text-gray-600">My favorite painting!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="about-figma-footer" role="presentation" />
      </main>

      <ImageModal open={!!modal} src={modal?.src} caption={modal?.caption} onClose={close} />
    </div>
  )
}
