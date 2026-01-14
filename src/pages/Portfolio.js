import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'


function Portfolio() {
  const [currentImage, setCurrentImage] = useState(null)
  const [currentDescription, setCurrentDescription] = useState('')

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
        // Remove this line below since handleEscape is not defined in this scope
        // window.removeEventListener('keydown', handleEscape)
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
      imgSrc: '/images/portfolio/lily.png',
      description: 'dedicated to my friends [2021-08]',
    },
    {
      imgSrc: '/images/portfolio/dance.png',
      description: '2021-01]',
    },
    {
      imgSrc: '/images/portfolio/backy.png',
      description: 'my backyard [2023]',
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
    {
      imgSrc: '/images/portfolio/ten.jpg',
      description: 'movie [2025-01] I submitted to Lyre Magazine and it got published as the cover :) + I will be joining the next issue as lead designer',
    },
  ]

  const handleImageClick = (imgSrc, description) => {
    setCurrentImage(imgSrc)
    setCurrentDescription(description)
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Links column positioned at 30% from left */}
      <div className="absolute flex flex-col gap-4 justify-center" style={{ 
        left: '22%', 
        top: '50%',
        transform: 'translateX(-100%) translateY(-50%)',
        padding: '2px',
        background: 'linear-gradient(135deg, rgba(237, 190, 228, 0.3) 0%, rgba(161, 168, 190, 0.3) 25%, rgba(243, 208, 195, 0.3) 50%, rgba(234, 120, 91, 0.3) 75%, rgba(95, 84, 32, 0.3) 100%)',
        borderRadius: '5px'
      }}>
        <div className="bg-white rounded-[3px] px-4 py-6 flex flex-col gap-4">
          <Link
            to="/portfolio"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            style={{ fontFamily: "'Moto', serif" }}
          >
            Painting
          </Link>
          <Link
            to="/writing"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            style={{ fontFamily: "'Moto', serif" }}
          >
            Writing
          </Link>
        </div>
      </div>

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

        <div className="mt-6 border-t pt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(card.imgSrc, card.description)}
                className="cursor-pointer"
              >
                <img
                  src={card.imgSrc}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-auto aspect-[3/4] object-cover"
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
                  className="rounded-full bg-[#ffc2c2] px-8 py-2 h-12 text-sm font-semibold flex items-center text-gray-700 hover:bg-[#ffb2b2] focus:outline-none focus:ring-2 focus:ring-[#ffc2c2] justify-center mx-auto w-auto focus:ring-offset-2 mt-4"
                >
                  Close
                </button>
                <div className="flex justify-center mt-8">
                  <img
                    src={currentImage}
                    alt="Full Size"
                    className="max-w-[150vw] max-h-[120vh] object-contain"
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