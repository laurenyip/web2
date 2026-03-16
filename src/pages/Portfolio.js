import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'
import './Portfolio.css'


function Portfolio() {
  const [currentImage, setCurrentImage] = useState(null)
  const [currentDescription, setCurrentDescription] = useState('')
  const location = useLocation()

  useEffect(() => {
    // Add the navbar dark effect on scroll, matching the About page
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setCurrentImage(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const cardData = [
    {
      imgSrc: '/images/portfolio/ten.jpg',
      description: 'paintball & hay scene [2025-01]',
    },
    {
      imgSrc: '/images/portfolio/lily.png',
      description: 'dedicated to my friends [2021-08]',
      scale: 1.4,
    },
    {
      imgSrc: '/images/portfolio/dance.png',
      description: '[2021-01]',
      scale: 1.6,
    },
    {
      imgSrc: '/images/portfolio/ecola.png',
      description: 'ecola beach state park, oregon',
    },
    {
      imgSrc: '/images/portfolio/backy.png',
      description: 'my backyard [2023]',
      scale: 1.5,
    },
    {
      imgSrc: '/images/portfolio/tidepool.png',
      description: 'belcarra tidepool [2022-02]',
    },
    {
      imgSrc: '/images/portfolio/blue.png',
      description:
        'blue hydrangeas [2021-07]',
    },
  ]

  const handleImageClick = (imgSrc, description) => {
    setCurrentImage(imgSrc)
    setCurrentDescription(description)
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Main content with padding to account for fixed navbar */}
      <div className="pt-20 pb-12 px-8 max-w-xl mx-auto">
        <div className="prose text-gray-700 prose-sm prose-headings:font-normal prose-headings:text-xl mt-16 mb-8">
          <div>
            <div className="text-4xl text-gray-700" style={{ fontFamily: "'Melo', sans-serif" }} >Side B of what I like to work on</div>
            <p className="text-balance mt-2">
              Click on any image to view it in full screen
            </p>
          </div>
        </div>

        {/* File folder tabs */}
        <div className="folder-tabs">
          <Link
            to="/portfolio"
            className={`folder-tab ${location.pathname === '/portfolio' ? 'folder-tab-active' : ''}`}
            style={{ fontFamily: "'Moto', serif" }}
          >
            Painting
          </Link>
          <Link
            to="/writing"
            className={`folder-tab ${location.pathname === '/writing' ? 'folder-tab-active' : ''}`}
            style={{ fontFamily: "'Moto', serif" }}
          >
            Writing
          </Link>
        </div>

        <div className="folder-content">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(card.imgSrc, card.description)}
                className="cursor-pointer overflow-hidden aspect-[3/4]"
              >
                <img
                  src={card.imgSrc}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${card.scale || 1.3})` }}
                  loading="lazy"
                  width={300}
                  height={400}
                />
              </div>
            ))}
          </div>

          {/* Modal with large image display */}
          {currentImage && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 transition-opacity duration-300 z-50"
              onClick={() => setCurrentImage(null)}
            >
              <div
                className="max-w-[100%] max-h-[100%] overflow-auto py-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="prose text-gray-700 mx-auto prose-sm prose-headings:font-normal prose-headings:text-xl">
                  <div className="text-center max-w-sm mx-auto">
                    <h1>{currentDescription}</h1>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentImage(null)}
                  className="rounded-full bg-white border-2 border-slate-700 px-8 py-2 h-12 text-sm font-semibold flex items-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-700 justify-center mx-auto w-auto focus:ring-offset-2 mt-4"
                >
                  Close
                </button>
                <div className="flex justify-center mt-8">
                  <img
                    src={currentImage}
                    alt="Full Size"
                    className="max-w-[150vw] max-h-[120vh] object-contain"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Portfolio