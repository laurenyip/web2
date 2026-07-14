'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import ImageModal from '../components/ImageModal'
import CaseStudyModal from '../components/CaseStudyModal'
import WorkProjectCard from '../components/WorkProjectCard'
import { CASE_STUDY_KEYS, WORK_PROJECTS } from '../data/workProjects'
import {
  ART_CAROUSEL,
  GUITAR_IMAGE,
  GUITAR_PLAYLIST_HREF,
  IMG_TILE_CLASS,
  SIDEQUEST_GRID_ITEMS,
  WRITING_LINKS,
} from '../data/creativeContent'
import './App.css'
import './About.css'
import './Work.css'

export default function Playground() {
  const [modal, setModal] = useState(null)
  const [artSlide, setArtSlide] = useState(0)
  const [openCaseStudy, setOpenCaseStudy] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const open = (src, caption) => setModal({ src, caption })
  const close = () => setModal(null)

  const jellyfishProject = WORK_PROJECTS['jellyfish-umbrella']

  const handleOpenProject = (project) => {
    if (!project?.hasCaseStudy) return
    setActiveProject(project)
    setOpenCaseStudy(CASE_STUDY_KEYS[project.id])
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpenCaseStudy(null)
    }
    if (openCaseStudy) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [openCaseStudy])

  return (
    <div className="about-page playground-page min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <main className="about-main-inner mx-auto w-full px-4 pb-24 pt-[calc(var(--site-nav-block-height,5.85rem)+50px)] md:px-6 lg:px-8">
        <section className="about-figma-section about-section--00">
          <div className="about-layout-rail-left max-w-2xl">
            <div className="about-section-num">00</div>
            <p className="about-body-text mt-1 m-0">Reasons to play</p>
            <p className="about-body-text mt-6 m-0 text-gray-500">don't be boring</p>
          </div>
        </section>

        <section id="art" className="about-figma-section about-section--01">
          <div className="about-layout-12">
            <div className="about-layout-media w-full min-w-0">
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
                    ←
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
                    →
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
            <div className="about-layout-rail flex flex-col items-start text-left">
              <div className="about-section-num">01</div>
              <p className="about-body-text mt-1 m-0">Art</p>
              <div className="about-body-text mt-3 max-w-md text-left">
                <p className="m-0">
                  Painting to capture the big chapters of my life.
                  <br />
                  Use the arrows to browse, or click the image to view full screen.
                </p>
                <p className="mt-4 mb-0">
                  <br />
                  I&apos;m posting 100 times in 100 days. Follow along on my X or Instagram, linked in the footer!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="writing" className="about-figma-section about-section--02">
          <div className="about-layout-12">
            <div className="about-layout-rail-left">
              <div className="about-section-num">02</div>
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
            <div className="about-layout-aside grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3">
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

        <section className="about-figma-section about-section--03">
          <div className="about-layout-12">
            <div className="about-layout-rail-left">
              <div className="about-section-num">03</div>
              <p className="about-body-text mt-1 m-0">Languages</p>
              <div className="about-body-text mt-6 max-w-md space-y-4">
                <p className="m-0">
                  Trying to learn Mandarin + read Chinese. Sometimes learning French & Spanish but now mostly just watching movies with French subtitles.
                Playing piano and guitar is in my top 3 procrastination activities.
                </p>
               
              </div>
            </div>
            <div className="about-layout-media playground-languages-media">
              <a
                href={GUITAR_PLAYLIST_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="playground-guitar-link"
                aria-label="Open guitar + piano practice playlist on Spotify"
              >
                <Image
                  src={GUITAR_IMAGE}
                  alt="Electric guitar"
                  className="playground-guitar-img"
                  width={900}
                  height={500}
                  priority={false}
                />
              </a>
            </div>
          </div>
        </section>

        <section id="sidequests" className="about-figma-section about-section--04">
          <div className="about-layout-12">
            <div className="about-layout-rail-left">
              <div className="about-section-num">04</div>
              <p className="about-body-text mt-1 m-0">Sidequests</p>
              <div className="about-body-text mt-6 max-w-md space-y-4">
                <p className="m-0">
                  Travelling, sunrise and sunset chasing, hiking, swimming, volleyball & dragonboat.
                </p>
                <p className="m-0">
                  Currently posting 100 times in 100 days because it is probably the best option for my future. + building some cool stuff (like my jellyfish umbrella!)
                </p>
                <p>Trying to do all the things I say I'll do but never do, like tennis, dancing, and Chinese.</p>
              </div>
            </div>
            <div className="about-layout-media w-full min-w-0">
              <div className="about-sidequest-grid about-sidequest-grid--4x4 grid w-full min-w-0 gap-2">
                {jellyfishProject ? (
                  <div className="about-sidequest-jellyfish-cell">
                    <WorkProjectCard
                      project={jellyfishProject}
                      className="work-row3-card playground-jellyfish-card h-full w-full"
                      onOpen={handleOpenProject}
                      showTitle
                      overlayCaption
                    />
                  </div>
                ) : null}
                {SIDEQUEST_GRID_ITEMS.map(({ src, caption, objectPosition }) => (
                  <button
                    key={src}
                    type="button"
                    className={`${IMG_TILE_CLASS} about-sidequest-tile`}
                    onClick={() => open(src, caption)}
                    aria-label="Open photo"
                  >
                    <Image
                      src={src}
                      alt={caption}
                      className="about-sidequest-img aspect-square h-full w-full object-cover"
                      style={objectPosition ? { objectPosition } : undefined}
                      width={600}
                      height={600}
                      priority={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="about-figma-footer" role="presentation" />
      </main>

      <ImageModal open={!!modal} src={modal?.src} caption={modal?.caption} onClose={close} />

      {openCaseStudy ? (
        <CaseStudyModal
          projectTitle={openCaseStudy}
          onClose={() => {
            setOpenCaseStudy(null)
            setActiveProject(null)
          }}
          project={activeProject}
        />
      ) : null}
    </div>
  )
}
