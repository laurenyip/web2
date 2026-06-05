'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import StarmapThumb from '../components/StarmapThumb'
import AmazonGiftThumb from '../components/AmazonGiftThumb'
import SpruceThumb from '../components/SpruceThumb'
import AuroraThumb from '../components/AuroraThumb'
import CsaThumb from '../components/CsaThumb'
import './App.css'
import './Portfolio.css'

const THUMB_BY_ROUTE = {
  '/starmap': StarmapThumb,
  '/amazon-giftwrapping': AmazonGiftThumb,
  '/spruce': SpruceThumb,
  '/aurora': AuroraThumb,
  '/csa': CsaThumb,
}

const CASE_STUDIES = [
  {
    to: '/starmap',
  
    blurb: 'A personal relationship management tool to map people, connections, and social context over time.',
    thumb: '/images/projects/starmap/starmap_t.png',
    alt: 'Starmap landing page',
    cardBg: '#000000',
    darkCard: true,
    animatedThumb: true,
  },
  {
    to: '/spruce',
    blurb: 'Helping low-income families in Vancouver find free and low-cost third-space activities.',
    thumb: '/images/projects/spruce/spruce_hero.gif',
    alt: 'Spruce home screen',
    cardBg: '#3E5D39',
    darkCard: true,
    animatedThumb: true,
  },
  {
    to: '/amazon-giftwrapping',
    blurb: 'An improved gift wrapping and card customization experience for Amazon shoppers.',
    thumb: '/images/projects/amazon-giftwrapping/amazon_hero.gif',
    alt: 'Amazon cart with gift wrapping option',
    cardBg: '#90BCFF',
    animatedThumb: true,
  },
  {
    to: '/aurora',
    
    blurb: 'Vet-backed subscription pet pharmacy focused on chronic conditions and affordability across Canada.',
    thumb: '/images/projects/aurora/aurora_hero.gif',
    alt: 'Aurora Pet Co. home screen',
    cardBg: '#FCBAFF',
    animatedThumb: true,
  },
  {
    to: '/csa',
    title: 'Canadian Space Agency',
    blurb: 'Mapped satellite images across Canada for the Terrestrial Snow Mass Mission (TSMM)',
    thumb: '/images/projects/csa.png',
    alt: 'Canadian Space Agency',
    cardBg: '#0a0a12',
    darkCard: true,
    animatedThumb: true,
    nda: true,
  },
]

function PortfolioCardMedia({ project, ndaRevealed }) {
  const Thumb = project.animatedThumb ? THUMB_BY_ROUTE[project.to] : null
  if (Thumb) {
    if (project.nda) return <Thumb revealed={ndaRevealed} />
    return <Thumb />
  }
  return (
    <Image
      src={project.thumb}
      alt={project.alt}
      className={`portfolio-card-image portfolio-card-image--${project.to.replace('/', '')}`}
      width={1000}
      height={700}
      priority={false}
    />
  )
}

function Portfolio() {
  useEffect(() => {
    const header = document.querySelector('.navbar')
    if (header) {
      const handleScroll = () => {
        const top = window.scrollY
        if (top >= 0) {
          header.classList.add('navbarDark')
        } else {
          header.classList.remove('navbarDark')
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="portfolio-case-studies pt-[100px] pb-16 px-6 md:px-10 max-w-5xl mx-auto">
        <header className="mb-10 md:mb-12">
          <h1
            className="text-3xl md:text-5xl text-gray-800 tracking-tight"
            style={{ fontFamily: "'boring_reg', sans-serif" }}
          >
            Case studies
          </h1>
          <p className="mt-3 text-gray-600 text-balance max-w-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
            Selected product and research work — open a project for the full write-up.
          </p>
        </header>

        <ul className="portfolio-grid list-none m-0 p-0">
          {CASE_STUDIES.map((project) => (
            <PortfolioCardItem key={project.to} project={project} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function PortfolioCardItem({ project }) {
  const [ndaRevealed, setNdaRevealed] = useState(false)
  const routeSlug = project.to.replace('/', '')
  const media = (
    <div
      className={`portfolio-card-media portfolio-card-media--${routeSlug}`}
      style={{ backgroundColor: project.cardBg }}
    >
      <PortfolioCardMedia project={project} ndaRevealed={ndaRevealed} />
    </div>
  )

  if (project.nda) {
    return (
      <li className="portfolio-card-item">
        <div
          role="button"
          tabIndex={0}
          className={`portfolio-card portfolio-card--nda group${project.darkCard ? ' portfolio-card--dark' : ''}${ndaRevealed ? ' portfolio-card--nda-open' : ''}`}
          onClick={() => setNdaRevealed((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setNdaRevealed((open) => !open)
            }
          }}
        >
          {media}
          <div className="portfolio-card-body">
            <p className="portfolio-card-meta">{project.meta}</p>
            <h2 className="portfolio-card-title">{project.title}</h2>
            <p className="portfolio-card-blurb">{project.blurb}</p>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className="portfolio-card-item">
      <Link
        href={project.to}
        className={`portfolio-card group ${project.darkCard ? 'portfolio-card--dark' : ''}`}
      >
        {media}
        <div className="portfolio-card-body">
          <p className="portfolio-card-meta">{project.meta}</p>
          <h2 className="portfolio-card-title">{project.title}</h2>
          <p className="portfolio-card-blurb">{project.blurb}</p>
        </div>
      </Link>
    </li>
  )
}

export default Portfolio
