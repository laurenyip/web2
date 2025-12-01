import React, { useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'

import './App.css'

// Archive gallery data with different content types
// Types: 'image', 'essay', 'book', 'movie', 'food', 'quote', 'music', 'place'
const ARCHIVE_ITEMS = [
    {
      type: 'image',
      image: '/images/about/current/romeo.jpg',
      text: 'My first Broadway performance: Romeo & Juliet',
      link: 'https://www.youtube.com/watch?v=5FsKvp5mME0&list=TLPQMzAwMzIwMjWHzTbqBTJFCA&index=2&pp=gAQBiAQB8AUB',
      date: '2024-10-15',
    },
    {
      type: 'image',
      image: '/images/about/current/insect.jpg',
      text: 'Insectarium, Montreal',
      date: '2024-06-22',
    },
    {
      type: 'book',
      text: 'Letters to Milena',
      image: '/images/about/current/milena.jpg',
      author: 'Franz Kafka',
      date: '2025-02-02',
      // Optional: link to review or purchase
      // link: 'https://example.com',
    },
    {
      type: 'book',
      text: "Anne's House of Dreams",
      image: '/images/about/current/anne.png',
      author: 'Lucy Maud Montgomery',
      date: '2025-11-28',
      // Optional: link to review or purchase
      // link: 'https://example.com',
    },
    {
      type: 'music',
      text: 'recent life archive',
      link: 'https://open.spotify.com/playlist/17R042dZUt10LOSqVG8rUm?si=78b5299694014d05',
      date: '2025-11-22',
      // Optional: image for album art
      // image: '/images/about/current/atel.jpg',
    },
    {
      type: 'music',
      text: 'Stop Making Sense',
      link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
      date: '2025-08-04',
      // Optional: image for poster
      image: '/images/about/current/sms.png',
    },
    { 
      type: 'image',
      image: '/images/about/current/babel.jpg', 
      text: 'the best hike ever?',
      date: '2025-07-18',
    },
    {
      type: 'image',
      image: '/images/about/current/hightide.png',
      text: 'Hightide by Jan Toorop',
      caption: 'instant favourite painting',
      date: '2025-09-05',
    },
    {
      type: 'essay',
      text: 'Dostoevsky as Lover',
      author: 'Henrik Karlsson',
      link: 'https://www.henrikkarlsson.xyz/p/doestoevsky-as-lover',
      date: '2024-01-25',
    },
    {
      type: 'essay',
      text: "AGI isn't for happy people",
      author: 'Stefan Kelly',
      link: 'https://alreadyhappened.xyz/p/agi-isnt-for-happy-people',
      date: '2025-01-22',
    },
    {
      type: 'quote',
      text: "Watch out, you might get what you're after",
      author: 'Talking Heads',
      date: '2024-03-28',
    },
    {
      type: 'quote',
      text: "Is this enough?",
     
    },
  /*
  {
    type: 'place',
    text: 'Montreal Botanical Garden',
    location: 'Montreal, QC',
    date: '2024-04-20',
    // Optional: image or link
    // image: '/images/about/places/botanical.jpg',
  },
  */
]

function About() {

  // Sort archive items by date (most recent first)
  const sortedArchiveItems = useMemo(() => {
    return [...ARCHIVE_ITEMS].sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      // Sort in descending order (most recent first)
      return dateB - dateA
    })
  }, [])

  // Scattered positions for gallery items (different for mobile and desktop)
  // Uses pixel-based positioning to prevent overlaps and allow scrolling
  const getScatteredPositions = (count, isMobile) => {
    const positions = []
    // Increased spacing to account for natural image sizes and prevent overlap
    const horizontalSpacing = isMobile ? 200 : 280 // Increased horizontal spacing
    const verticalSpacing = isMobile ? 300 : 350 // Increased vertical spacing for natural image heights
    const colsPerRow = isMobile ? 2 : 3
    
    // Starting position in pixels from top
    const startTop = isMobile ? 0 : 0
    const startLeft = isMobile ? 20 : 30
    
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / colsPerRow)
      const col = i % colsPerRow
      
      // Base position with grid layout - no random offsets to prevent overlap
      const baseTop = startTop + row * verticalSpacing
      const baseLeft = startLeft + col * horizontalSpacing
      
      // Very small rotation for visual interest (reduced to prevent overlap from rotation)
      const rotation = (Math.random() - 0.5) * 4 // Reduced rotation between -2 and 2 degrees
      
      positions.push({
        top: `${baseTop}px`,
        left: `${baseLeft}px`,
        rotation: rotation,
      })
    }
    return positions
  }

  // Calculate positions once for mobile and desktop
  const mobilePositions = useMemo(() => getScatteredPositions(sortedArchiveItems.length, true), [sortedArchiveItems.length])
  const desktopPositions = useMemo(() => getScatteredPositions(sortedArchiveItems.length, false), [sortedArchiveItems.length])

  // Render different card templates based on content type
  const renderArchiveCard = (item, isMobile) => {
    const cardClasses = "bg-white rounded-lg shadow-lg overflow-hidden"
    const textSize = isMobile ? 'text-xs' : 'text-sm'
    const dateSize = isMobile ? 'text-xs' : 'text-xs'
    const captionSize = isMobile ? 'text-[10px]' : 'text-xs'
    const padding = isMobile ? 'p-2' : 'p-3'

    // Image card (default)
    if (item.type === 'image' || !item.type) {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={`${padding} bg-white`}>
            <p className={`${textSize} text-gray-700 mb-1`}>{item.text}</p>
            {item.caption && (
              <p className={`${captionSize} text-gray-700`}>{item.caption}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Essay card
    if (item.type === 'essay') {
      return (
        <div className={cardClasses}>
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            {item.author && (
              <p className={`${dateSize} text-gray-700 mb-2`}>by {item.author}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Book card
    if (item.type === 'book') {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            {item.author && (
              <p className={`${dateSize} text-gray-700 mb-2`}>by {item.author}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Movie card
    if (item.type === 'movie') {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Music/Playlist card
    if (item.type === 'music') {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Food card
    if (item.type === 'food') {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            {item.location && (
              <p className={`${dateSize} text-gray-700 mb-1`}>{item.location}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Quote card
    if (item.type === 'quote') {
      return (
        <div className={cardClasses}>
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-2 italic leading-relaxed`}>"{item.text}"</p>
            {item.author && (
              <p className={`${dateSize} text-gray-700 mb-2 text-right`}>— {item.author}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Place card
    if (item.type === 'place') {
      return (
        <div className={cardClasses}>
          {item.image && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
          )}
          <div className={padding}>
            <p className={`${textSize} text-gray-700 mb-1 font-medium`}>{item.text}</p>
            {item.location && (
              <p className={`${dateSize} text-gray-700 mb-2`}>{item.location}</p>
            )}
            <p className={`${dateSize} text-gray-700`}>{item.date}</p>
          </div>
        </div>
      )
    }

    // Default fallback
    return (
      <div className={cardClasses}>
        <div className={`${padding} bg-white`}>
          <p className={`${textSize} text-gray-700 mb-1`}>{item.text}</p>
          <p className={`${dateSize} text-gray-700`}>{item.date}</p>
        </div>
      </div>
    )
  }

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
        <div className="absolute top-[18%] md:top-[80%] md:left-[37%] left-1/2 -translate-x-1/2 text-left w-[90%] max-w-md z-[10] text-gray-700">
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>4th year Computer Science @ SFU</li>
            <li>Aspiring Product Manager</li>
            <li>Artist and Explorer</li>
          
          </ul>
        </div>

        {/* Archive Gallery - Scattered cards */}
        <div className="relative w-full mt-[200%] md:top-[30%] md:mt-[100%] pb-20">
          <h3
            className="text-center mb-12 text-2xl md:text-3xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            archive
          </h3>
          <div className="relative w-full" style={{ minHeight: `${Math.ceil(sortedArchiveItems.length / 2) * 220}px` }}>
            {sortedArchiveItems.map((item, index) => {
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
                  {renderArchiveCard(item, true)}
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
            className="absolute text-left z-[10]  text-gray-700"
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
              marginTop: '750px',
              left: '10px',
              width: '930px',
              paddingBottom: '100px'
            }}
          >
            <h3
              className="text-center mb-12 text-3xl text-gray-700"
              style={{ fontFamily: "'Melo', sans-serif" }}
            >
              archive
            </h3>
            <div className="relative w-full" style={{ minHeight: `${Math.ceil(sortedArchiveItems.length / 3) * 260}px` }}>
              {sortedArchiveItems.map((item, index) => {
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
                    {renderArchiveCard(item, false)}
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