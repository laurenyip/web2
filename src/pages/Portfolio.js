'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import StarmapThumb from '../components/StarmapThumb'
import AmazonGiftThumb from '../components/AmazonGiftThumb'
import './App.css'
import './Portfolio.css'

const THUMB_BY_ROUTE = {
  '/starmap': StarmapThumb,
  '/amazon-giftwrapping': AmazonGiftThumb,
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
  },
]

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
            <li key={project.to} className="portfolio-card-item">
              <Link
                href={project.to}
                className={`portfolio-card group ${project.darkCard ? 'portfolio-card--dark' : ''}`}
              >
                <div
                  className={`portfolio-card-media portfolio-card-media--${project.to.replace('/', '')}`}
                  style={{ backgroundColor: project.cardBg }}
                >
                  {(() => {
                    const Thumb = project.animatedThumb ? THUMB_BY_ROUTE[project.to] : null
                    if (Thumb) return <Thumb />
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
                  })()}
                </div>
                <div className="portfolio-card-body">
                  <p className="portfolio-card-meta">
                    {project.meta}
                  </p>
                  <h2 className="portfolio-card-title">{project.title}</h2>
                  <p className="portfolio-card-blurb">
                    {project.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Portfolio
