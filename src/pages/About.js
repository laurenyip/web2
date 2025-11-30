import React, { useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'

import './App.css'

function About() {
  // Archive gallery data - 8 items with dates
  const archiveItems = [
    {
      image: '/images/about/current/romeo.jpg',
      text: 'Romeo & Juliet performance',
      link: 'https://www.youtube.com/watch?v=5FsKvp5mME0&list=TLPQMzAwMzIwMjWHzTbqBTJFCA&index=2&pp=gAQBiAQB8AUB',
      date: '2024-03-15',
    },
    {
      image: '/images/about/current/insect.jpg',
      text: 'Insectarium, Montreal',
      date: '2024-02-20',
    },
    {
      image: '/images/about/current/milena.jpg',
      text: 'Letters to Milena by Franz Kafka',
      date: '2024-01-10',
    },
    {
      image: '/images/about/current/atel.jpg',
      text: 'recent life archive',
      link: 'https://open.spotify.com/playlist/3JFfkbhtFpoG9Iz4mE3SKh?si=8268c2e702464af6',
      date: '2024-04-05',
    },
    {
      image: '/images/about/current/white.jpg',
      text: 'serendipity',
      link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
      date: '2024-03-28',
    },
    { 
      image: '/images/about/current/babel.jpg', 
      text: 'hiking in the mountains',
      date: '2024-02-14',
    },
    {
      image: '/images/about/current/under.jpg',
      text: 'working on my open water diving certification',
      date: '2024-05-01',
    },
    {
      image: '/images/about/current/hen.jpg',
      text: 'My favourite essay',
      link: 'https://www.henrikkarlsson.xyz/p/doestoevsky-as-lover',
      date: '2024-01-25',
    },
  ]

  // Scattered positions for gallery items (different for mobile and desktop)
  // Uses pixel-based positioning to prevent overlaps and allow scrolling
  const getScatteredPositions = (count, isMobile) => {
    const positions = []
    const cardWidth = isMobile ? 150 : 180
    const cardHeight = isMobile ? 180 : 220 // Approximate card height with image and text
    const horizontalSpacing = isMobile ? 180 : 250 // Minimum horizontal spacing
    const verticalSpacing = isMobile ? 220 : 260 // Minimum vertical spacing to prevent overlap
    const colsPerRow = isMobile ? 2 : 3
    
    // Starting position in pixels from top
    const startTop = isMobile ? 0 : 0
    const startLeft = isMobile ? 20 : 30
    
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / colsPerRow)
      const col = i % colsPerRow
      
      // Base position with grid layout
      const baseTop = startTop + row * verticalSpacing
      const baseLeft = startLeft + col * horizontalSpacing
      
      // Small random offsets for scattered effect (but not enough to cause overlap)
      const randomOffsetX = (Math.random() - 0.5) * (isMobile ? 30 : 40)
      const randomOffsetY = (Math.random() - 0.5) * (isMobile ? 20 : 30)
      
      positions.push({
        top: `${baseTop + randomOffsetY}px`,
        left: `${baseLeft + randomOffsetX}px`,
        rotation: (Math.random() - 0.5) * 8, // Random rotation between -4 and 4 degrees
      })
    }
    return positions
  }

  // Calculate positions once for mobile and desktop
  const mobilePositions = useMemo(() => getScatteredPositions(archiveItems.length, true), [archiveItems.length])
  const desktopPositions = useMemo(() => getScatteredPositions(archiveItems.length, false), [archiveItems.length])

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
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="About relative min-h-screen overflow-x-hidden">
      
      <Navbar />
      
      {/* Mobile Layout - original setup */}
      <div className="lg:hidden">
        <div className="absolute top-[6%] left-1/2  text-5xl md:text-8xl text-center z-20 text-gray-700" style={{ fontFamily: "'Melo', sans-serif" }}>
          Lauren Yip
        </div>

        {/* Love image in top left */}
        <img
          src="/images/about/main/love.jpg"
          className="aboutImage absolute top-[6%] left-[25%] rounded-md -translate-x-1/2 md:top-[18%] md:left-[22%] md:translate-x-0 w-[40%] max-w-[220px] z-20"
          alt="love"
        />

        <img
          src="/images/about/main/sitting.jpg"
          className="aboutImage absolute top-[25%] left-1/2 -translate-x-1/2 w-[80%] max-w-[360px] md:bottom-[15%] md:right-[20%] md:left-auto md:translate-x-0 md:w-[30%] md:max-w-[320px] z-10 rounded-md shadow-md"
          alt="sit"
        />

        <img
          src="/images/about/main/fish.gif"
          className="aboutImage absolute top-[9%] left-[70%] -translate-x-1/2 w-[40%] max-w-[360px] md:bottom-[6%] md:right-[40%] md:left-auto md:translate-x-0 md:w-[20%] md:max-w-[320px] z-0"
          alt="fish"
        />

        {/* Text block - responsive vertical position */}
        <div className="absolute top-[18%] md:top-[80%] md:left-[37%] left-1/2 -translate-x-1/2 text-left w-[90%] max-w-md z-[10] text-[#001c80]">
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>4th year Computer Science @ SFU</li>
            <li>Aspiring Product Manager</li>
            <li>Artist and Explorer</li>
          
          </ul>
        </div>

        {/* Archive Gallery - Scattered cards */}
        <div className="relative w-full mt-[200%] md:mt-[100%] pb-20">
          <h3
            className="text-center mb-12 text-2xl md:text-3xl text-[#092c79]"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            archive
          </h3>
          <div className="relative w-full" style={{ minHeight: `${Math.ceil(archiveItems.length / 2) * 220}px` }}>
            {archiveItems.map((item, index) => {
              const pos = mobilePositions[index]
              return (
                <div
                  key={index}
                  className="absolute cursor-pointer transition-transform hover:scale-105"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotation}deg)`,
                    width: '150px',
                    maxWidth: '45%',
                  }}
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, '_blank')
                    }
                  }}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2 bg-white">
                      <p className="text-xs text-gray-700 mb-1">{item.text}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Fixed container with static positioning */}
      <div className="hidden lg:block">
        {/* Fixed container - 1200px wide, centered */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[950px] min-h-screen">
          
          {/* Title - Static position within container */}
          <div 
            className="absolute text-[120px] text-center z-20 text-gray-700"
            style={{ 
              fontFamily: "'Melo', sans-serif",
              top: '120px',
              left: '450px',
              width: '400px'
            }}
          >
            Lauren Yip
          </div>

          {/* Love image - Static position */}
          <img
            src="/images/about/main/love.jpg"
            className="aboutImage absolute rounded-md z-20"
            style={{
              top: '120px',
              left: '20px',
              width: '250px'
            }}
            alt="love"
          />

          {/* Sitting image - Static position */}
          <img
            src="/images/about/main/sitting.jpg"
            className="aboutImage absolute rounded-md shadow-md z-10"
            style={{
              top: '380px',
              right: '10px',
              width: '360px'
            }}
            alt="sit"
          />

          {/* Fish gif - Static position */}
          <img
            src="/images/about/main/fish.gif"
            className="aboutImage absolute z-0"
            style={{
              top: '300px',
              right: '400px',
              width: '250px'
            }}
            alt="fish"
          />

          {/* Text block - Static position */}
          <div 
            className="absolute text-left z-[10]  text-[#001c80]"
            style={{
              top: '550px',
              left: '25px',
              width: '400px'
            }}
          >
            <ul className="list-disc list-inside text-[16px] text-base leading-relaxed">
              <li>4th year Computer Science @ SFU</li>
              <li>Aspiring Product Manager</li>
              <li>Artist and Explorer</li>
            </ul>
          </div>

          {/* Archive Gallery - Scattered cards */}
          <div 
            className="relative z-[2]"
            style={{
              marginTop: '900px',
              left: '10px',
              width: '930px',
              paddingBottom: '100px'
            }}
          >
            <h3
              className="text-center mb-12 text-3xl text-[#092c79]"
              style={{ fontFamily: "'Melo', sans-serif" }}
            >
              archive
            </h3>
            <div className="relative w-full" style={{ minHeight: `${Math.ceil(archiveItems.length / 3) * 260}px` }}>
              {archiveItems.map((item, index) => {
                const pos = desktopPositions[index]
                return (
                  <div
                    key={index}
                    className="absolute cursor-pointer transition-transform hover:scale-105"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: `rotate(${pos.rotation}deg)`,
                      width: '180px',
                    }}
                    onClick={() => {
                      if (item.link) {
                        window.open(item.link, '_blank')
                      }
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3 bg-white">
                        <p className="text-sm text-gray-700 mb-1">{item.text}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About