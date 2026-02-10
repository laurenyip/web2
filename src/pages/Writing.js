import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'

function Writing() {
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

  const writingData = [
    {
      title: 'The Best Air Mattress in the World',
      url: 'https://laurenyip.substack.com/p/the-best-air-mattress-in-the-world',
      slug: 'the-best-air-mattress-in-the-world',
      imgSrc: '/images/portfolio/writing/air.jpg'
    },
    {
      title: 'Synchronicity',
      url: 'https://laurenyip.substack.com/',
      slug: 'synchronicity',
      imgSrc: '/images/portfolio/writing/profile.jpg'
    },
    {
      title: 'Temporary Mirrors',
      url: 'https://laurenyip.substack.com/p/temporary-mirrors',
      slug: 'temporary-mirrors',
      imgSrc: '/images/portfolio/writing/temp.jpg'
    },
    {
      title: 'Aftersun (2025)',
      url: 'https://laurenyip.substack.com/p/aftersun-2025',
      slug: 'aftersun-2025',
      imgSrc: '/images/portfolio/writing/aftersun.jpg'
    },
    {
      title: 'Mercurial World',
      url: 'https://laurenyip.substack.com/p/mercurial-world',
      slug: 'mercurial-world',
      imgSrc: '/images/portfolio/writing/mercurial.jpg'
    },
    {
      title: '6a8',
      url: 'https://laurenyip.substack.com/p/6a8',
      slug: '6a8',
      imgSrc: '/images/portfolio/writing/mood.jpg'
    },
  ]

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
            <div className="text-4xl text-gray-700" style={{ fontFamily: "'Melo', sans-serif" }}>Writing</div>
          </div>
        </div>

        <div className="mt-6 border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {writingData.map((piece, index) => (
              <a
                key={index}
                href={piece.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer group"
              >
                <div className="border border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors bg-white">
                  <img
                    src={piece.imgSrc}
                    alt={piece.title}
                    className="w-full md:h-48 object-contain md:object-cover"
                    loading="lazy"
                    width={300}
                    height={200}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Writing
