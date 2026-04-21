import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import ImageModal from '../components/ImageModal'
import './App.css'

/** §01 Art — carousel slides (`public/images/about/art/`) */
const ART_CAROUSEL = [
  { src: '/images/about/art/january.jpg', caption: 'january [2025-01]' },
  { src: '/images/about/art/lily.png', caption: 'dedicated to my friends [2021-08]' },
  { src: '/images/about/art/ecola.png', caption: 'ecola beach [2025-04]' },
  { src: '/images/about/art/dance.png', caption: 'high school dance [2021-01]' },
  { src: '/images/about/art/blue.png', caption: 'blue hydrangeas [2021-07]' },
  { src: '/images/about/art/pool.png', caption: 'belcarra tidepools [2022-02]' },
  { src: '/images/about/art/bridge.png', caption: 'the bridge [2023-09]' },
 
]

const WRITING_LINKS = [
  { label: 'aftersun (2025)', href: 'https://laurenyip.substack.com/p/aftersun-2025' },
  { label: '花樣年華', href: 'https://substack.com/home/post/p-181468973' },
  { label: 'mercurial world', href: 'https://laurenyip.substack.com/p/mercurial-world' },
  {
    label: 'the best air mattress in the world',
    href: 'https://laurenyip.substack.com/p/the-best-air-mattress-in-the-world',
  },
  { label: 'drafts', href: null },
]

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
    href: 'https://laurenyip.com/reading-list',
  },
  {
    label: "Books that let me experience a world I wouldn't have otherwise known",
    href: 'https://laurenyip.com/reading-list',
  },
  {
    label: 'Love songs with some angst and yearning (also Irish music)',
    href:
      'https://open.spotify.com/playlist/7nTtTPZW33up9yRhi7DTd9?si=dcf3c7640d934d7c&pt=4a9277e20074441d8ccca963598ca157',
  },
  { label: 'Movies that I rate 5 stars', href: 'https://letterboxd.com/laurenyip/' },
]

/** §04 Sidequests — grid (`public/images/about/sidequests/`) */
const SIDEQUEST_GRID_ITEMS = [
  { src: '/images/about/sidequests/cz.jpg', caption: 'Market brass & trinkets' },
  { src: '/images/about/sidequests/datong.jpg', caption: 'Datong · stone portal' },
  { src: '/images/about/sidequests/gzapt.jpg', caption: 'Guangzhou · apartment block at night' },
  { src: '/images/about/sidequests/gzbike.jpg', caption: 'Guangzhou · e-bike & wires' },
  { src: '/images/about/sidequests/gzcat.jpg', caption: 'Guangzhou · Bliss Space neon' },
  { src: '/images/about/sidequests/gzfish.jpg', caption: 'Guangzhou · koi in the window' },
  { src: '/images/about/sidequests/gztree.jpg', caption: 'Guangzhou · banyan over Haizhu Bei Lu' },
  {
    src: '/images/about/sidequests/hike.jpg',
    caption: 'Rocky summit · golden hour over the sound',
  },
  {
    src: '/images/about/sidequests/ipoh.jpg',
    caption: 'Ipoh · night break outside the shop',
    /** Landscape photo — bias crop toward the lit shop & figures in the square thumb */
    objectPosition: 'center 42%',
  },
  {
    src: '/images/about/sidequests/kaya.jpg',
    caption: 'Ipoh · Kaya Puff shophouse',
  },
]

/** Vinyl shelf — sleeve art (paths under `public/`); links match prior About. */
const MUSIC_ITEMS = [
  {
    type: 'music',
    text: 'Clash',
    date: '2025-12-28',
    image: '/images/about/favorites/music/clash.jpg',
    link: 'https://en.wikipedia.org/wiki/London_Calling',
    songs: [],
  },
  {
    type: 'music',
    text: 'Stop Making Sense',
    date: '2025-08-04',
    image: '/images/about/favorites/music/sms.jpg',
    link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
    songs: [],
  },
  {
    type: 'music',
    text: 'Graceland',
    date: '2025-12-26',
    image: '/images/about/favorites/music/graceland.jpg',
    link: 'https://open.spotify.com/album/6WgGWYw6XXQyLTsWt7tXky',
    songs: [],
  },
  {
    type: 'music',
    text: 'YN',
    date: '2025-12-27',
    image: '/images/about/favorites/music/yn.jpg',
    link: 'https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP',
    songs: [],
  },
]

const VINYL_SLEEVE_PX = 100

function getMusicShelfPositions(items, mobile) {
  const positions = []
  const padding = mobile ? 10 : 16
  const shelfSpacing = mobile ? 6 : 10

  let vinylSize = VINYL_SLEEVE_PX
  if (mobile && items.length > 0) {
    const containerWidth = 360
    const inner = containerWidth - padding * 2 - (items.length - 1) * shelfSpacing
    vinylSize = Math.max(56, Math.floor(inner / items.length))
  }

  const shelfHeight = vinylSize + 28
  const shelfThickness = 12

  const shelfWidth = items.length * vinylSize + (items.length - 1) * shelfSpacing + padding * 2
  const shelfLeft = 0

  for (let i = 0; i < items.length; i++) {
    const leftPosition = shelfLeft + padding + i * (vinylSize + shelfSpacing)
    positions.push({
      top: `${shelfHeight - vinylSize}px`,
      left: `${leftPosition}px`,
      rotation: 0,
      height: vinylSize,
      isMusic: true,
    })
  }

  return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth, shelfHeight, shelfLeft }
}

const imgTile =
  'block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-gray-200/80 bg-white p-0 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'

export default function About() {
  const [modal, setModal] = useState(null)
  const [artSlide, setArtSlide] = useState(0)
  const [viewportW, setViewportW] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1200)
  )
  const open = (src, caption) => setModal({ src, caption })
  const close = () => setModal(null)

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isMobile = viewportW < 1024

  const musicShelf = useMemo(() => getMusicShelfPositions(MUSIC_ITEMS, isMobile), [isMobile])

  return (
    <div className="about-page min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-24 pt-[calc(7rem+50px)] md:px-6 lg:px-8">
        {/* —— SECTION 00 — Who Am I (Figma 156-545, 159-546, 159-547) —— */}
        <section className="about-figma-section relative">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
            <div className="order-2 flex flex-col lg:order-1 lg:col-span-2">
              <div
                className="text-[clamp(4rem,14vw,7.5rem)] leading-none text-gray-800"
                style={{ fontFamily: "'Melo', sans-serif" }}
              >
                00
              </div>
              <p className="about-body-text mt-2 m-0">Who Am I</p>
            </div>

            <div className="order-3 lg:order-2 lg:col-span-5">
              <h2
                className="font-normal italic leading-none tracking-tight text-gray-800"
                style={{
                  fontFamily: "'Melo', sans-serif",
                  fontSize: 'clamp(2.25rem, 11vw, 96px)',
                }}
              >
                I&apos;m Lauren!
              </h2>
              <div className="about-body-text mt-6 max-w-xl">
                <p>
                  I&apos;m optimizing for curiosity and happiness through sidequests and meaningful work. I want to know
                  more about everything. I believe that with intention, knowledge and understanding compound and lead to
                  fulfillment and fun.
                </p>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-3 lg:col-span-5 lg:justify-end lg:pt-2">
              <div className="about-hero-collage w-full max-w-[min(100%,360px)] pl-2 lg:max-w-[340px] lg:pl-0">
                <button
                  type="button"
                  className="about-hero-optimist-btn"
                  onClick={() => open('/images/about/whoami/optimist.png', 'OPTIMIST mural · Vancouver')}
                  aria-label="Open OPTIMIST mural"
                >
                  <img
                    src="/images/about/whoami/optimist.png"
                    alt="OPTIMIST mural"
                    className="about-hero-optimist-img"
                    loading="lazy"
                  />
                </button>
                <button
                  type="button"
                  className="about-hero-charm-btn"
                  onClick={() => open('/images/about/whoami/charm.png', 'Charm study')}
                  aria-label="Open charm sketch"
                >
                  <span className="charm-swing block w-full">
                    <img
                      src="/images/about/whoami/charm.png"
                      alt="Charm sketch"
                      className="about-hero-charm-img rounded-[10px]"
                      loading="lazy"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* —— SECTION 01 — Art (Figma 151-414, 153-541) —— */}
        <section className="about-figma-section">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="w-full max-w-3xl lg:max-w-[58%]">
              <div className="about-art-carousel flex flex-col gap-3">
                <div className="about-art-carousel-frame relative flex min-h-[200px] items-center justify-center overflow-hidden sm:min-h-[280px]">
                  <button
                    type="button"
                    className="flex w-full cursor-zoom-in items-center justify-center border-0 bg-transparent p-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 sm:p-3"
                    onClick={() => {
                      const slide = ART_CAROUSEL[artSlide]
                      if (slide) open(slide.src, slide.caption)
                    }}
                    aria-label={`Open painting: ${ART_CAROUSEL[artSlide]?.caption || ''}`}
                  >
                    <img
                      src={ART_CAROUSEL[artSlide]?.src}
                      alt={ART_CAROUSEL[artSlide]?.caption || ''}
                    className="max-h-[min(70vh,620px)] w-full max-w-full rounded-none lg:rounded-[5px] object-contain"
                      loading="lazy"
                    />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    className="about-art-carousel-nav"
                    aria-label="Previous painting"
                    onClick={() =>
                      setArtSlide((i) => (i - 1 + ART_CAROUSEL.length) % ART_CAROUSEL.length)
                    }
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
            </div>
            <div className="flex flex-1 flex-col items-start text-left lg:max-w-sm">
              <div
                className="text-[clamp(3rem,10vw,5rem)] leading-none text-gray-800"
                style={{ fontFamily: "'Melo', sans-serif" }}
              >
                01
              </div>
              <p className="about-body-text mt-1 m-0">Art</p>
              <p className="about-body-text mt-3 max-w-md text-left">
                Painting to capture the big chapters of my life. Use the arrows to browse, or click the image to view
                full screen.
              </p>
            </div>
          </div>
        </section>

        {/* —— SECTION 02 — Writing (Figma 151-415, 154-543) —— */}
        <section className="about-figma-section">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div
                className="text-[clamp(3rem,10vw,5rem)] leading-none text-gray-800"
                style={{ fontFamily: "'Melo', sans-serif" }}
              >
                02
              </div>
              <p className="about-body-text mt-1 m-0">Writing</p>
              <div className="about-body-text mt-8 space-y-4">
                <p>
                  I want to write a book (or many) someday, but for now I write my life into personal essays that help
                  me understand my experience of the world!
                </p>
                <p>
                  My current journal has this message on the front cover: &quot;The book is an extension of memory and
                  imagination&quot;
                </p>
                <p>I also want to write a fashion blog (please collab with me).</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3">
              {WRITING_LINKS.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-writing-link transition sm:inline-block"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span key={item.label} className="about-body-text sm:inline-block">
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/*
          SECTION 03 — Favorites (Figma dev nodes — layout reference):
          162-708, 171-769, 167-736, 167-745, 167-739, 171-771, 167-742, 151-446, 152-530,
          167-733, 152-534, 151-421, 152-525, 151-420
          Left: koi, poster grid, favorite painting + copy. Right: 03 + subtitle (paired),
          links, vinyl shelf aligned under that header group.
        */}
        <section className="about-figma-section">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <button
                type="button"
                className="mb-4 block max-h-[228px] w-auto cursor-zoom-in rounded-[10px] border-0 bg-transparent p-0"
                onClick={() => open('/images/about/favorites/fish.gif', 'Koi · ink sketch')}
                aria-label="Open koi sketch"
              >
                <img
                  src="/images/about/favorites/fish.gif"
                  alt="Koi fish ink sketch"
                  className="max-h-[208px] w-auto rounded-[10px] object-contain shadow-sm"
                  loading="lazy"
                />
              </button>
              <div className="mx-auto grid w-full max-w-[220px] grid-cols-2 gap-3 sm:max-w-[240px] lg:mx-0 lg:max-w-[170px] lg:ml-[320px]">
                {FAVORITES_POSTERS.map(({ src, caption }) => (
                  <button
                    key={src}
                    type="button"
                    className={imgTile}
                    onClick={() => open(src, caption)}
                    aria-label={caption}
                  >
                    <img
                      src={src}
                      alt={caption}
                      className="aspect-[2/3] w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
              <div className="mt-[calc(2.5rem+50px)] flex max-w-xl flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
                <button
                  type="button"
                  className="shrink-0 cursor-zoom-in overflow-hidden rounded-[10px] border border-gray-200/80 bg-white p-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                  onClick={() =>
                    open('/images/about/favorites/hightide.png', 'High Tide by Jan Toorop — My favorite painting!')
                  }
                  aria-label="favorite painting"
                >
                  <img
                    src="/images/about/favorites/hightide.png"
                    alt="High Tide by Jan Toorop"
                    className="block h-auto w-[80vw] max-w-[220px] sm:w-[min(220px,100%)] sm:max-w-[220px] rounded-none lg:rounded-[5px] object-cover"
                    loading="lazy"
                  />
                </button>
                <div className="about-body-text min-w-0 space-y-1 text-left">
                  <p className="m-0 text-gray-800">High Tide by Jan Toorop</p>
                  <p className="m-0 italic text-gray-600">My favorite painting!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-8 text-left lg:col-span-5">
              <div className="flex w-full flex-col items-start">
                <div
                  className="text-[clamp(3rem,10vw,5rem)] leading-none text-gray-800"
                  style={{ fontFamily: "'Melo', sans-serif" }}
                >
                  03
                </div>
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

          {MUSIC_ITEMS.length > 0 && (
            <div className="about-vinyl-shelf flex w-full justify-start">
              <div
                className="relative"
                style={{
                  width: `${Math.max(musicShelf.shelfWidth || 0, 1)}px`,
                  maxWidth: '100%',
                  height: `${(musicShelf.shelfBottom || 352) + 40}px`,
                }}
              >
                <div
                  className="absolute z-[15]"
                  style={{
                    top: `${(musicShelf.shelfBottom || 352) - 12}px`,
                    left: `${musicShelf.shelfLeft || 0}px`,
                    width: `${musicShelf.shelfWidth || (isMobile ? 400 : 400)}px`,
                    height: '12px',
                  }}
                >
                  <div
                    className="relative h-full w-full"
                    style={{
                      background:
                        'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                      borderTop: '1px solid rgba(139, 105, 20, 0.5)',
                      borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full opacity-20"
                        style={{
                          height: '1px',
                          top: `${i * 2.4}px`,
                          background:
                            i % 2 === 0
                              ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                              : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {MUSIC_ITEMS.map((item, index) => {
                  const pos = musicShelf.positions[index]
                  if (!pos) return null
                  const vinylSize = pos.height
                  const centerHole = vinylSize * 0.15

                  const colors = [
                    { from: '#1a1a1a', via: '#0d0d0d', to: '#000000' },
                    { from: '#2b2b2b', via: '#101010', to: '#000000' },
                    { from: '#1f1f1f', via: '#0d0d0d', to: '#000000' },
                    { from: '#222222', via: '#0f0f0f', to: '#000000' },
                  ][index % 4]

                  const textSize = isMobile ? 'text-[10px]' : 'text-xs'
                  const dateSize = isMobile ? 'text-[9px]' : 'text-[10px]'

                  return (
                    <div
                      key={`music-${index}`}
                      className="group absolute z-20 cursor-pointer transition-transform hover:scale-105"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotation}deg)`,
                        width: `${vinylSize}px`,
                        height: `${vinylSize}px`,
                      }}
                      onClick={() => {
                        if (item.link) {
                          window.open(item.link, '_blank', 'noopener,noreferrer')
                          return
                        }
                        if (item.image) open(item.image, item.text)
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-white transition-all duration-500 ease-out group-hover:-translate-x-[12%]"
                        style={{
                          transformOrigin: 'center center',
                          zIndex: 2,
                          width: `${vinylSize}px`,
                          height: `${vinylSize}px`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.text}
                            className="h-full w-full"
                            style={{
                              objectFit: 'cover',
                              display: 'block',
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600">
                            <div className="px-2 py-4 text-center text-white">
                              <p className={`${textSize} mb-1 font-medium`}>{item.text}</p>
                              <p className={`${dateSize} opacity-80`}>{item.date}</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-black opacity-10" />
                      </div>

                      <div className="absolute inset-0 z-[1] origin-center opacity-0 transition-all duration-500 ease-out group-hover:translate-x-[18%] group-hover:opacity-100">
                        <div
                          className="about-vinyl-disc relative mx-auto rounded-full"
                          style={{
                            width: `${vinylSize}px`,
                            height: `${vinylSize}px`,
                            background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
                            boxShadow:
                              'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((radius, idx) => (
                            <div
                              key={idx}
                              className="absolute rounded-full border opacity-20"
                              style={{
                                width: `${vinylSize * radius}px`,
                                height: `${vinylSize * radius}px`,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderColor: 'rgba(0,0,0,0.3)',
                              }}
                            />
                          ))}

                          <div
                            className="absolute rounded-full bg-white shadow-inner"
                            style={{
                              width: `${centerHole * 2}px`,
                              height: `${centerHole * 2}px`,
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                            }}
                          >
                            <div
                              className="absolute rounded-full bg-black"
                              style={{
                                width: `${centerHole * 0.4}px`,
                                height: `${centerHole * 0.4}px`,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
            </div>
          </div>
        </section>

        {/* —— SECTION 04 — Sidequests (Figma 167-717) —— */}
        <section className="about-figma-section">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div
                className="text-[clamp(3rem,10vw,5rem)] leading-none text-gray-800"
                style={{ fontFamily: "'Melo', sans-serif" }}
              >
                04
              </div>
              <p className="about-body-text mt-1 m-0">Sidequests</p>
              <div className="about-body-text mt-8 space-y-4">
                <p>
                  I&apos;m also hosting treehouse.place, playing volleyball, snowboarding, dragonboating, swimming, hiking,
                  baking, and learning new songs on the guitar and piano.
                </p>
                <p>
                  Some of my favourite places I&apos;ve been to are: NYC, Hong Kong, Dublin, Dresden, Vienna, Fes,
                  Montpellier, Thor&apos;s Well, Mabul Island, Ipoh, Datong, and the top of Mt Brunswick.
                </p>
                <p>
                  I&apos;ve travelled a lot recently, so I know where the best vintage, bookstores, and chocolate shops in
                  Europe are. Most recently I visited Toronto for the Socratica Symposium but let&apos;s be real,
                  that&apos;s the main quest.
                </p>
                <p>
                  I&apos;m always sunrise and sunset chasing, and I think that sunlight and shadows on stuff makes the
                  best photos.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SIDEQUEST_GRID_ITEMS.map(({ src, caption, objectPosition }) => (
                <button
                  key={src}
                  type="button"
                  className={imgTile}
                  onClick={() => open(src, caption)}
                  aria-label="Open photo"
                >
                  <img
                    src={src}
                    alt={caption}
                    className="aspect-square w-full object-cover"
                    style={objectPosition ? { objectPosition } : undefined}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* —— FOOTER — section end (painting lives in §03 Favorites; Figma 160-548) —— */}
        <div className="about-figma-footer border-t border-gray-200" role="presentation" />
      </main>

      <ImageModal open={!!modal} src={modal?.src} caption={modal?.caption} onClose={close} />
    </div>
  )
}
