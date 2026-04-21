import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'
import './Portfolio.css'

const CASE_STUDIES = [
  {
    to: '/starmap',
    title: 'Starmap',
    meta: 'Founder · Product design & engineering',
    blurb: 'A personal relationship management tool to map people, connections, and social context over time.',
    thumb: '/images/projects/starmap/starmap.lol.png',
    alt: 'Starmap landing page',
  },
  {
    to: '/spruce',
    title: 'Spruce',
    meta: 'Product design · UXathon 2026',
    blurb: 'Helping low-income families in Vancouver find free and low-cost third-space activities.',
    thumb: '/images/projects/spruce/spruce_home.png',
    alt: 'Spruce home screen',
  },
  {
    to: '/aurora',
    title: 'Simple Ventures — Aurora Pet Co.',
    meta: 'Product design & PM · 2025',
    blurb: 'Vet-backed subscription pet pharmacy focused on chronic conditions and affordability across Canada.',
    thumb: '/images/projects/aurora/aurora_home.png',
    alt: 'Aurora Pet Co. home screen',
  },
  {
    to: '/rosie',
    title: 'React to This!',
    meta: 'Research assistant · ROSIE Lab · 2023–2024',
    blurb: 'Dataset and study of how people physically and emotionally react to virtual social agents.',
    thumb: '/images/projects/rosie/rosielab.github.io.png',
    alt: 'React to This! project site',
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
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Case studies
          </h1>
          <p className="mt-3 text-gray-600 text-balance max-w-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
            Selected product and research work — open a project for the full write-up.
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 list-none m-0 p-0">
          {CASE_STUDIES.map((project) => (
            <li key={project.to}>
              <Link
                to={project.to}
                className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:border-gray-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={project.thumb}
                    alt={project.alt}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h2
                    className="text-lg md:text-2xl text-gray-800 font-medium m-0 leading-snug"
                    style={{ fontFamily: "'Moto', sans-serif" }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {project.meta}
                  </p>
                  <p className="text-sm text-gray-600 m-0 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {project.blurb}
                  </p>
                  <span className="inline-block mt-3 text-m text-[#374151] font-medium group-hover:underline">
                    View project →
                  </span>
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
