import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'
import './Portfolio.css'

const CASE_STUDIES = [
  {
    to: '/starmap',
    title: 'starmap',
    meta: 'FOUNDER',
    blurb: 'A personal relationship management tool to map people, connections, and social context over time.',
    thumb: '/images/projects/starmap/starmap_t.png',
    alt: 'Starmap landing page',
    cardBg: '#000000',
    darkCard: true,
  },
  {
    to: '/spruce',
    meta: 'UXATHON 2026',
    title: 'spruce',
    
    blurb: 'Helping low-income families in Vancouver find free and low-cost third-space activities.',
    thumb: '/images/projects/spruce/spruce_t.png',
    alt: 'Spruce home screen',
    cardBg: '#3E5D39',
    darkCard: true,
  },
  {
    to: '/aurora',
    title: 'Aurora Pet Co.',
    meta: 'SIMPLE VENTURES · 2025',
    blurb: 'Vet-backed subscription pet pharmacy focused on chronic conditions and affordability across Canada.',
    thumb: '/images/projects/aurora/aurora_t.png',
    alt: 'Aurora Pet Co. home screen',
    cardBg: '#FCBAFF',
  },
  {
    to: '/rosie',
    title: 'React to This!',
    meta: 'ROSIE Lab · 2023–2024',
    blurb: 'Dataset and study of how people physically and emotionally react to virtual social agents.',
    thumb: '/images/projects/rosie/rosie_t.png',
    alt: 'React to This! project site',
    cardBg: '#61dafb',
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
            style={{ fontFamily: "'moto', sans-serif" }}
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
                to={project.to}
                className={`portfolio-card group ${project.darkCard ? 'portfolio-card--dark' : ''}`}
              >
                <div
                  className={`portfolio-card-media portfolio-card-media--${project.to.replace('/', '')}`}
                  style={{ backgroundColor: project.cardBg }}
                >
                  <img
                    src={project.thumb}
                    alt={project.alt}
                    className={`portfolio-card-image portfolio-card-image--${project.to.replace('/', '')}`}
                    loading="lazy"
                  />
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
