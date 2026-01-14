import React, { useEffect, useMemo, useState } from 'react'
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
      type: 'book',
      text: 'Crooked Kingdom',
      image: '/images/about/current/crookedkingdom.jpg',
      author: 'Leigh Bardugo',
      date: '2025-01-20',
    },
    {
      type: 'book',
      text: 'Middlemarch',
      image: '/images/about/current/middlemarch.jpg',
      author: 'George Eliot',
      date: '2024-12-10',
    },
    {
      type: 'music',
      text: 'Clash',
      date: '2025-12-28',
      image: '/images/about/current/clash.jpg',
      songs: [],
    },
    {
      type: 'music',
      text: 'Stop Making Sense',
      link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
      date: '2025-08-04',
      image: '/images/about/current/sms.jpg',
      songs: [
        'Psycho Killer - Talking Heads',
        'Heaven - Talking Heads',
        'Once in a Lifetime - Talking Heads',
        'Burning Down the House - Talking Heads',
        'Life During Wartime - Talking Heads',
      ],
    },
    {
      type: 'music',
      text: 'Graceland',
      link: 'https://open.spotify.com/album/6WgGWYw6XXQyLTsWt7tXky',
      date: '2025-12-26',
      image: '/images/about/current/graceland.jpg',
      songs: [],
    },
    {
      type: 'music',
      text: 'YN',
      date: '2025-12-27',
      image: '/images/about/current/yn.jpg',
      songs: [],
    },
    {
      type: 'image',
      text: 'recent life archive',
      link: 'https://open.spotify.com/playlist/17R042dZUt10LOSqVG8rUm?si=78b5299694014d05',
      date: '2025-11-22',
      image: '/images/about/current/atel.jpg',
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
  const [openedVinyl, setOpenedVinyl] = useState(null)
  const [openedBook, setOpenedBook] = useState(null)

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

  // Separate music items, books, and other items
  const musicItems = useMemo(() => sortedArchiveItems.filter(item => item.type === 'music'), [sortedArchiveItems])
  const bookItems = useMemo(() => sortedArchiveItems.filter(item => item.type === 'book'), [sortedArchiveItems])
  const otherItems = useMemo(() => sortedArchiveItems.filter(item => item.type !== 'music' && item.type !== 'book'), [sortedArchiveItems])

  // Get positions for music items on shelf (like vinyl records)
  const getMusicShelfPositions = (musicItems, isMobile) => {
    const positions = []
    const vinylSize = isMobile ? 98 : 119 // 70% of original (140->98, 170->119)
    const containerWidth = isMobile ? 400 : 950
    const padding = isMobile ? 20 : 30
    const shelfSpacing = isMobile ? 14 : 18 // 70% of original spacing
    const shelfHeight = 175 // 70% of original 250
    const shelfThickness = 12 // Keep same for visibility
    
    // Calculate shelf width needed
    const shelfWidth = Math.min(
      musicItems.length * vinylSize + (musicItems.length - 1) * shelfSpacing + padding * 2,
      containerWidth * 0.7 // Max 70% of container width
    )
    
    // Music items are placed horizontally on the shelf, right-aligned
    // Calculate left position from right edge
    let currentLeft = containerWidth - padding - vinylSize
    
    // Build positions from right to left, then reverse to maintain item order
    for (let i = musicItems.length - 1; i >= 0; i--) {
      positions.push({
        top: `${shelfHeight - vinylSize }px`, // Position above shelf
        left: `${currentLeft}px`, // Position from left (calculated from right edge)
        rotation: 0,
        height: vinylSize,
        isMusic: true,
      })
      
      currentLeft -= (vinylSize + shelfSpacing)
    }
    
    // Reverse positions array to maintain original item order
    positions.reverse()
    
    return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth }
  }

  // Get positions for books stacked flat (spines showing)
  const getBookShelfPositions = (bookItems, isMobile, startTop) => {
    const positions = []
    const spineWidth = isMobile ? 12 : 15 // Width of spine (thickness of book when flat)
    const bookHeight = isMobile ? 140 : 180 // Height of spine (width of book when flat) - increased to fit full titles
    const padding = isMobile ? 20 : 30
    const shelfHeight = startTop // Top of the shelf board
    const shelfThickness = 12
    
    // Limit to 4 books
    const displayBooks = bookItems.slice(0, 4)
    const shelfWidth = bookHeight + padding * 2
    
    // Books are stacked on the shelf with no overlap
    // After 90deg rotation, spineWidth becomes visual height, bookHeight becomes visual width
    // With transformOrigin: 'bottom center', the bottom center stays fixed during rotation
    // Position books so they sit on the shelf - the visual bottom edge should align with shelfHeight
    // After rotation, books extend down by spineWidth (the visual height)
    // Position books higher so their visual bottom edge aligns with shelf top
    let currentTop = shelfHeight - bookHeight - spineWidth // Position books on shelf
    let currentLeft = padding
    
    // Build positions from bottom to top (last book on top)
    // Each book is offset by its full visual height (spineWidth) to prevent overlap
    displayBooks.forEach((item, index) => {
      positions.push({
        top: `${currentTop - (index * spineWidth)}px`, // Stack upward, no overlap
        left: `${currentLeft}px`, // All books aligned vertically
        rotation: 0,
        spineWidth: spineWidth,
        bookHeight: bookHeight,
        isBook: true,
        index: index, // Store index for z-index ordering
      })
    })
    
    // shelfBottom accounts for shelf thickness
    // Books sit on the shelf, so shelfBottom is just shelfHeight + shelfThickness
    return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth, displayBooks }
  }

  // Natural gallery/mosaic positions for non-music archive items
  // Uses collision detection to ensure no overlaps with varied heights
  const getGalleryPositions = (items, isMobile, startTop) => {
    const positions = []
    const cardWidth = isMobile ? 150 : 180
    const baseCardHeight = isMobile ? 200 : 240
    const containerWidth = isMobile ? 400 : 950
    const padding = isMobile ? 20 : 30
    const spacing = isMobile ? 80 : 90 // Increased spacing for better separation
    const postItWidth = isMobile ? 160 : 200
    const postItHeight = isMobile ? 120 : 150
    const totalItems = items.length
    
    // Use a seed for consistent randomness per item
    const getRandom = (seed) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    // Generate varied heights for each item (80% to 120% of base height)
    const getCardHeight = (index) => {
      const variation = getRandom(index * 11) * 0.4 + 0.8 // 0.8 to 1.2
      return Math.round(baseCardHeight * variation)
    }
    
    // Track all placed rectangles with padding for collision detection
    const placedRects = []
    
    // Reserve space for post-it note at top left (with padding)
    placedRects.push({
      top: 0,
      left: 0,
      right: postItWidth + spacing,
      bottom: postItHeight + spacing,
    })
    
    // Helper function to check if a rectangle overlaps with any placed rectangle
    const checkCollision = (rect) => {
      return placedRects.some(placed => {
        return !(rect.right <= placed.left || 
                rect.left >= placed.right ||
                rect.bottom <= placed.top ||
                rect.top >= placed.bottom)
      })
    }
    
    for (let i = 0; i < totalItems; i++) {
      const cardHeight = getCardHeight(i) // Get varied height for this item
      let placed = false
      let attempts = 0
      const maxAttempts = 300
      
      // Calculate available width (full container minus padding and post-it)
      const availableWidth = containerWidth - (padding * 2)
      const startOffset = isMobile ? padding : padding // Start from left edge, not after post-it
      
      // Try different positions until we find one that doesn't overlap
      while (!placed && attempts < maxAttempts) {
        // Distribute items across the full width, not just right side
        const itemsPerRow = isMobile ? 2 : 4
        
        // Calculate row and column
        const row = Math.floor(i / itemsPerRow)
        const colInRow = i % itemsPerRow
        
        // Spread items evenly across available width
        const itemsInPreviousRows = row * itemsPerRow
        const remainingItems = totalItems - itemsInPreviousRows
        const itemsInThisRow = Math.min(itemsPerRow, remainingItems)
        const rowWidth = availableWidth - (spacing * (itemsInThisRow - 1))
        const itemSpacing = rowWidth / itemsInThisRow
        const baseLeft = startOffset + colInRow * (itemSpacing + spacing)
        
        // Position rows with good vertical spacing - use average height for row spacing
        // Start from the provided startTop (below shelf)
        const avgHeight = baseCardHeight
        const baseTop = startTop + row * (avgHeight + spacing)
        
        // Small random variation for natural look (much smaller)
        const variationX = (getRandom(i * 3 + attempts) - 0.5) * (spacing * 0.3)
        const variationY = (getRandom(i * 5 + attempts) - 0.5) * (spacing * 0.3)
        
        const left = Math.max(padding, Math.min(baseLeft + variationX, containerWidth - cardWidth - padding))
        const top = Math.max(startTop, baseTop + variationY)
        
        // Bounding box with spacing padding using the actual varied card height
        const rect = {
          top: top - spacing / 2,
          left: left - spacing / 2,
          right: left + cardWidth + spacing / 2,
          bottom: top + cardHeight + spacing / 2,
        }
        
        // Check if this position would overlap and is within bounds
        if (!checkCollision(rect) && rect.right <= containerWidth - padding && rect.left >= padding) {
          // Place the item with NO rotation (straight/aligned)
      positions.push({
            top: `${top}px`,
            left: `${left}px`,
            rotation: 0,
            height: cardHeight, // Store the height for rendering
          })
          
          // Record this rectangle as occupied
          placedRects.push(rect)
          placed = true
        }
        
        attempts++
      }
      
      // Fallback: place in a simple grid if all attempts fail
      if (!placed) {
        const itemsPerRow = isMobile ? 2 : 4
        const row = Math.floor(i / itemsPerRow)
        const col = i % itemsPerRow
        
        const itemsInRow = Math.min(itemsPerRow, items.length - row * itemsPerRow)
        const rowWidth = availableWidth - (spacing * (itemsInRow - 1))
        const itemSpacing = rowWidth / itemsInRow
        const fallbackLeft = startOffset + col * (itemSpacing + spacing)
        const fallbackTop = startTop + row * (baseCardHeight + spacing)
      
      positions.push({
          top: `${fallbackTop}px`,
          left: `${fallbackLeft}px`,
          rotation: 0,
          height: cardHeight, // Store the height for rendering
        })
        
        // Record fallback position using actual card height
        placedRects.push({
          top: fallbackTop - spacing / 2,
          left: fallbackLeft - spacing / 2,
          right: fallbackLeft + cardWidth + spacing / 2,
          bottom: fallbackTop + cardHeight + spacing / 2,
        })
      }
    }
    
    return positions
  }

  // Calculate positions for music items on shelf
  const mobileMusicPositions = useMemo(() => getMusicShelfPositions(musicItems, true), [musicItems])
  const desktopMusicPositions = useMemo(() => getMusicShelfPositions(musicItems, false), [musicItems])
  
  // Calculate positions for books on bookshelf (below music shelf)
  const mobileBookPositions = useMemo(() => {
    const musicShelfBottom = mobileMusicPositions.shelfBottom || 187
    return getBookShelfPositions(bookItems, true, musicShelfBottom + 170) // Moved down 100px
  }, [bookItems, mobileMusicPositions])
  
  const desktopBookPositions = useMemo(() => {
    const musicShelfBottom = desktopMusicPositions.shelfBottom || 187
    return getBookShelfPositions(bookItems, false, musicShelfBottom + 170) // Moved down 100px
  }, [bookItems, desktopMusicPositions])
  
  // Calculate positions for other items below shelves
  const mobileOtherPositions = useMemo(() => {
    const bottomShelf = bookItems.length > 0 
      ? (mobileBookPositions.shelfBottom || 300)
      : (mobileMusicPositions.shelfBottom || 187)
    return getGalleryPositions(otherItems, true, bottomShelf + 70)
  }, [otherItems, mobileMusicPositions, mobileBookPositions, bookItems])
  
  const desktopOtherPositions = useMemo(() => {
    const bottomShelf = bookItems.length > 0 
      ? (desktopBookPositions.shelfBottom || 300)
      : (desktopMusicPositions.shelfBottom || 187)
    return getGalleryPositions(otherItems, false, bottomShelf + 70)
  }, [otherItems, desktopMusicPositions, desktopBookPositions, bookItems])

  // Render different card templates based on content type
  const renderArchiveCard = (item, isMobile) => {
    const cardClasses = "bg-white rounded-[5px] overflow-hidden border border-gray-300"
    const textSize = isMobile ? 'text-xs' : 'text-sm'
    const dateSize = isMobile ? 'text-xs' : 'text-xs'
    const captionSize = isMobile ? 'text-[10px]' : 'text-xs'
    const padding = isMobile ? 'p-2' : 'p-3'

    // Image card (default)
    if (item.type === 'image' || !item.type) {
      const isHightide = item.text && item.text.toLowerCase().includes('hightide')
      return (
        <div className={cardClasses}>
          {item.image && (
            <div className={isHightide ? "p-4 bg-amber-50" : ""}>
              <div 
                className={isHightide ? "border-4 shadow-lg" : ""}
                style={isHightide ? {
                  borderColor: '#D4AF37',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(212, 175, 55, 0.3)'
                } : {}}
              >
            <img
              src={item.image}
              alt={item.text}
              className="w-full object-contain"
              style={{ maxHeight: 'none' }}
            />
              </div>
            </div>
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

    // Music/Playlist card - Vinyl Record Design
    if (item.type === 'music') {
      const isOpened = openedVinyl === item.text
      const vinylSize = isMobile ? 98 : 119 // 70% of original size
      const centerHole = vinylSize * 0.15
      
      return (
        <div className="relative" style={{ width: isOpened ? `${vinylSize}px` : `${vinylSize}px`, minHeight: isOpened ? 'auto' : `${vinylSize}px` }}>
          {/* Album Sleeve (Cover) */}
          <div 
            className={`bg-white transition-all duration-700 ease-in-out cursor-pointer ${
              isOpened ? 'opacity-0 scale-0 rotate-180 absolute inset-0' : 'opacity-100 scale-100 rotate-0'
            }`}
            style={{
              transformOrigin: 'center center',
              zIndex: isOpened ? 1 : 2,
              width: `${vinylSize}px`,
              height: `${vinylSize}px`,
              boxShadow: !isOpened ? '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {item.image ? (
            <img
              src={item.image}
              alt={item.text}
                className="w-full h-full"
                style={{ 
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center w-full h-full">
                <div className="text-white text-center px-2 py-4">
                  <p className={`${textSize} font-medium mb-1`}>{item.text}</p>
                  <p className={`${dateSize} opacity-80`}>{item.date}</p>
                </div>
              </div>
            )}
            {/* Sleeve edge shadow */}
            {!isOpened && (
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-black opacity-10"></div>
            )}
          </div>

          {/* Vinyl Record (revealed when opened) */}
          <div 
            className={`transition-all duration-700 ease-in-out ${
              isOpened ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180 absolute inset-0'
            }`}
            style={{
              transformOrigin: 'center center',
              zIndex: isOpened ? 2 : 1,
            }}
          >
            {/* Close button */}
            {isOpened && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenedVinyl(null)
                }}
                className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors font-bold shadow-lg"
                style={{ fontSize: '16px', lineHeight: '1' }}
              >
                ×
              </button>
            )}
            
            {/* Vinyl Record Circle */}
            <div 
              className="relative rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 cursor-pointer hover:scale-105 transition-transform mx-auto"
              style={{ 
                width: `${vinylSize}px`, 
                height: `${vinylSize}px`,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (item.link) {
                  window.open(item.link, '_blank')
                }
              }}
            >
              {/* Vinyl Grooves (concentric circles) */}
              {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((radius, idx) => (
                <div
                  key={idx}
                  className="absolute rounded-full border border-gray-700 opacity-30"
                  style={{
                    width: `${vinylSize * radius}px`,
                    height: `${vinylSize * radius}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Center Label Area */}
              <div 
                className="absolute rounded-full bg-white shadow-inner"
                style={{
                  width: `${centerHole * 2}px`,
                  height: `${centerHole * 2}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                }}
              >
                {/* Center Hole */}
                <div 
                  className="absolute rounded-full bg-black"
                  style={{
                    width: `${centerHole * 0.4}px`,
                    height: `${centerHole * 0.4}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
            </div>

            {/* Album Title - below the vinyl */}
            {isOpened && (
              <div className="mt-3 text-center">
                <p className={`${textSize} text-gray-700 font-medium`}>{item.text}</p>
                {item.date && (
                  <p className={`${dateSize} text-gray-500 mt-1`}>{item.date}</p>
                )}
              </div>
            )}
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
          className="aboutImage absolute top-[25%] left-1/2 -translate-x-1/2 w-[80%] max-w-[360px] md:bottom-[15%] md:right-[20%] md:left-auto md:translate-x-0 md:w-[30%] md:max-w-[320px] z-10 rounded-md"
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
          
          {/* Pinned Post-it Note */}
          <div className="absolute top-0 left-4 md:left-8 z-10" style={{ transform: 'rotate(-2deg)' }}>
            {/* Thumbtack */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <div className="w-3 h-3 bg-gray-400 rounded-full shadow-md"></div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            {/* Post-it Note */}
            <div 
              className="bg-yellow-200 shadow-lg p-3 rounded-sm"
              style={{
                width: '140px',
                minHeight: '100px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              <p className="text-xs text-gray-800 leading-tight font-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
                recent → not recent<br/>
                collection of books, essays, quotes, music, food, and pictures i like
              </p>
            </div>
          </div>

          <div className="relative w-full" style={{ minHeight: `${(bookItems.length > 0 ? mobileBookPositions.shelfBottom : mobileMusicPositions.shelfBottom) + Math.ceil(otherItems.length / 2) * 250}px` }}>
            {/* Wooden Shelf for Music Items - Right Aligned */}
            {musicItems.length > 0 && (
              <div 
                className="absolute z-15"
                style={{
                  top: `${mobileMusicPositions.shelfBottom - 12}px`,
                  right: '0',
                  width: `${mobileMusicPositions.shelfWidth || 300}px`,
                  height: '12px',
                }}
              >
                {/* Wooden shelf with wood grain effect */}
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                    borderTop: '1px solid rgba(139, 105, 20, 0.5)',
                    borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
                  }}
                >
                  {/* Wood grain lines */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full opacity-20"
                      style={{
                        height: '1px',
                        top: `${i * 2.4}px`,
                        background: i % 2 === 0 
                          ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                          : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Music Items on Shelf */}
            {musicItems.map((item, index) => {
              const pos = mobileMusicPositions.positions[index]
              if (!pos) return null
              return (
                <div
                  key={`music-${index}`}
                  className="absolute cursor-pointer transition-transform hover:scale-105 z-20"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotation}deg)`,
                    width: `${pos.height}px`,
                    height: `${pos.height}px`,
                  }}
                  onClick={() => {
                    setOpenedVinyl(openedVinyl === item.text ? null : item.text)
                  }}
                >
                  {renderArchiveCard(item, true)}
                </div>
              )
            })}

            {/* Wooden Shelf for Books - Left Aligned */}
            {bookItems.length > 0 && (
              <div 
                className="absolute z-15"
                style={{
                  top: `${mobileBookPositions.shelfBottom - 12}px`,
                  left: '0',
                  width: `${mobileBookPositions.shelfWidth || 200}px`,
                  height: '12px',
                }}
              >
                {/* Wooden shelf with wood grain effect */}
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                    borderTop: '1px solid rgba(139, 105, 20, 0.5)',
                    borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
                  }}
                >
                  {/* Wood grain lines */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full opacity-20"
                      style={{
                        height: '1px',
                        top: `${i * 2.4}px`,
                        background: i % 2 === 0 
                          ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                          : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Books Stacked Flat with Spines */}
            {mobileBookPositions.displayBooks && mobileBookPositions.displayBooks.map((item, index) => {
              const pos = mobileBookPositions.positions[index]
              if (!pos) return null
              const isOpened = openedBook === item.text
              
              return (
                <div
                  key={`book-${index}`}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: `${pos.spineWidth}px`,
                    height: `${pos.bookHeight}px`,
                    zIndex: isOpened ? 50 : (20 + index),
                    transform: 'rotate(90deg)',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Book Cover (shown when clicked - enlarged) */}
                  {isOpened && (
                    <div
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        top: 0,
                        left: 0,
                        width: '200px',
                        height: '280px',
                        transform: 'translateX(-40px) translateY(-100px) rotate(-90deg)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                        zIndex: 60,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenedBook(null)
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.text}
                          className="w-full h-full object-contain rounded-sm bg-white"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center rounded-sm">
                          <div className="text-white text-center px-2">
                            <p className="text-sm font-medium mb-1">{item.text}</p>
                            {item.author && (
                              <p className="text-xs opacity-80">{item.author}</p>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Close indicator */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-700 font-bold text-sm shadow-lg">
                        ×
                      </div>
                    </div>
                  )}
                  
                  {/* Book Spine (always visible) */}
                  <div
                    className={`cursor-pointer transition-all duration-300 ${
                      isOpened ? 'opacity-50' : 'hover:scale-105'
                    }`}
                    style={{
                      width: `${pos.spineWidth}px`,
                      height: `${pos.bookHeight}px`,
                      background: item.image 
                        ? `linear-gradient(to right, #4B5563 0%, #6B7280 50%, #4B5563 100%)`
                        : `linear-gradient(to right, #9CA3AF 0%, #D1D5DB 30%, #E5E7EB 50%, #D1D5DB 70%, #9CA3AF 100%)`,
                      boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.2), 1px 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)',
                      borderLeft: '1px solid rgba(0,0,0,0.15)',
                      borderRight: '1px solid rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: isOpened ? 40 : (20 + index),
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenedBook(openedBook === item.text ? null : item.text)
                    }}
                  >
                    {/* Title on spine (vertical text) */}
                    <div
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        color: item.image ? '#FFFFFF' : '#374151',
                        fontSize: '10px',
                        fontWeight: '500',
                        textAlign: 'center',
                        padding: '8px 2px',
                        letterSpacing: '0.5px',
                        textShadow: item.image ? '0 1px 2px rgba(0,0,0,0.4)' : '0 1px 1px rgba(255,255,255,0.8)',
                        fontFamily: "'Moto', serif",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Other Items Below Shelf */}
            {otherItems.map((item, index) => {
              const pos = mobileOtherPositions[index]
              if (!pos) return null
              return (
                <div
                  key={`other-${index}`}
                  className="absolute cursor-pointer transition-transform hover:scale-105 z-20"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotation}deg)`,
                    width: '150px',
                    maxWidth: '45%',
                    height: pos.height ? `${pos.height}px` : 'auto',
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
            className="aboutImage absolute rounded-md z-10"
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
            className="relative z-[2] left-1/2 -translate-x-1/2"
            style={{
              marginTop: '750px',
              width: '950px',
              paddingBottom: '100px'
            }}
          >
            <h3
              className="text-center mb-12 text-3xl text-gray-700"
              style={{ fontFamily: "'Melo', sans-serif" }}
            >
              archive
            </h3>

            {/* Pinned Post-it Note */}
            <div className="absolute top-0 left-8 z-10" style={{ transform: 'rotate(-2deg)' }}>
              {/* Thumbtack */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <div className="w-4 h-4 bg-gray-400 rounded-full shadow-lg"></div>
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              {/* Post-it Note */}
              <div 
                className="bg-yellow-200 shadow-xl p-4 rounded-sm"
                style={{
                  width: '180px',
                  minHeight: '120px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                <p className="text-sm text-gray-800 leading-tight font-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
                  recent → not recent<br/>
                  collection of books, essays, music, quotes, food, and pictures i like
                </p>
              </div>
            </div>

            <div className="relative w-full" style={{ minHeight: `${(bookItems.length > 0 ? desktopBookPositions.shelfBottom : desktopMusicPositions.shelfBottom) + Math.ceil(otherItems.length / 3) * 280}px` }}>
              {/* Wooden Shelf for Music Items - Right Aligned */}
              {musicItems.length > 0 && (
                <div 
                  className="absolute z-15"
                  style={{
                    top: `${desktopMusicPositions.shelfBottom - 12}px`,
                    right: '0',
                    width: `${desktopMusicPositions.shelfWidth || 400}px`,
                    height: '12px',
                  }}
                >
                  {/* Wooden shelf with wood grain effect */}
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                      borderTop: '1px solid rgba(139, 105, 20, 0.5)',
                      borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
                    }}
                  >
                    {/* Wood grain lines */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full opacity-20"
                        style={{
                          height: '1px',
                          top: `${i * 2.4}px`,
                          background: i % 2 === 0 
                            ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                            : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Music Items on Shelf */}
              {musicItems.map((item, index) => {
                const pos = desktopMusicPositions.positions[index]
                if (!pos) return null
                return (
                  <div
                    key={`music-${index}`}
                    className="absolute cursor-pointer transition-transform hover:scale-105 z-20"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: `rotate(${pos.rotation}deg)`,
                      width: `${pos.height}px`,
                      height: `${pos.height}px`,
                    }}
                    onClick={() => {
                      setOpenedVinyl(openedVinyl === item.text ? null : item.text)
                    }}
                  >
                    {renderArchiveCard(item, false)}
                  </div>
                )
              })}

              {/* Wooden Shelf for Books - Left Aligned */}
              {bookItems.length > 0 && (
                <div 
                  className="absolute z-15"
                  style={{
                    top: `${desktopBookPositions.shelfBottom - 12}px`,
                    left: '0',
                    width: `${desktopBookPositions.shelfWidth || 250}px`,
                    height: '12px',
                  }}
                >
                  {/* Wooden shelf with wood grain effect */}
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                      borderTop: '1px solid rgba(139, 105, 20, 0.5)',
                      borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
                    }}
                  >
                    {/* Wood grain lines */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full opacity-20"
                        style={{
                          height: '1px',
                          top: `${i * 2.4}px`,
                          background: i % 2 === 0 
                            ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                            : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Books Stacked Flat with Spines */}
              {desktopBookPositions.displayBooks && desktopBookPositions.displayBooks.map((item, index) => {
                const pos = desktopBookPositions.positions[index]
                if (!pos) return null
                const isOpened = openedBook === item.text
                
                return (
                  <div
                    key={`book-${index}`}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: `${pos.spineWidth}px`,
                      height: `${pos.bookHeight}px`,
                      zIndex: isOpened ? 50 : (20 + index),
                      transform: 'rotate(90deg)',
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Book Cover (shown when clicked - enlarged) */}
                    {isOpened && (
                      <div
                        className="absolute cursor-pointer transition-all duration-300"
                        style={{
                          top: 0,
                          left: 0,
                          width: '250px',
                          height: '350px',
                          transform: 'translateX(-65px) translateY(-130px) rotate(-90deg)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                          zIndex: 60,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenedBook(null)
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.text}
                            className="w-full h-full object-contain rounded-sm bg-white"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center rounded-sm">
                            <div className="text-white text-center px-2">
                              <p className="text-base font-medium mb-1">{item.text}</p>
                              {item.author && (
                                <p className="text-sm opacity-80">{item.author}</p>
                              )}
                            </div>
                          </div>
                        )}
                        {/* Close indicator */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-700 font-bold text-base shadow-lg">
                          ×
                        </div>
                      </div>
                    )}
                    
                    {/* Book Spine (always visible) */}
                    <div
                      className={`cursor-pointer transition-all duration-300 ${
                        isOpened ? 'opacity-50' : 'hover:scale-105'
                      }`}
                      style={{
                        width: `${pos.spineWidth}px`,
                        height: `${pos.bookHeight}px`,
                        background: item.image 
                          ? `linear-gradient(to right, #4B5563 0%, #6B7280 50%, #4B5563 100%)`
                          : `linear-gradient(to right, #9CA3AF 0%, #D1D5DB 30%, #E5E7EB 50%, #D1D5DB 70%, #9CA3AF 100%)`,
                        boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.2), 1px 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)',
                        borderLeft: '1px solid rgba(0,0,0,0.15)',
                        borderRight: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: isOpened ? 40 : (20 + index),
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenedBook(openedBook === item.text ? null : item.text)
                      }}
                    >
                      {/* Title on spine (vertical text) */}
                      <div
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          color: item.image ? '#FFFFFF' : '#374151',
                          fontSize: '11px',
                          fontWeight: '500',
                          textAlign: 'center',
                          padding: '10px 3px',
                          letterSpacing: '0.5px',
                          textShadow: item.image ? '0 1px 2px rgba(0,0,0,0.4)' : '0 1px 1px rgba(255,255,255,0.8)',
                          fontFamily: "'Moto', serif",
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Other Items Below Shelf */}
              {otherItems.map((item, index) => {
                const pos = desktopOtherPositions[index]
                if (!pos) return null
                return (
                  <div
                    key={`other-${index}`}
                    className="absolute cursor-pointer transition-transform hover:scale-105 z-20"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: `rotate(${pos.rotation}deg)`,
                      width: '180px',
                      height: pos.height ? `${pos.height}px` : 'auto',
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