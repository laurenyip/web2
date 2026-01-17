import React, { useEffect, useMemo, useRef, useState } from 'react'
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
      date: '2025-01-25',
    },
    {
      type: 'essay',
      text: "AGI isn't for happy people",
      author: 'Stefan Kelly',
      link: 'https://alreadyhappened.xyz/p/agi-isnt-for-happy-people',
      date: '2025-03-22',
    },
    {
      type: 'essay',
      text: 'How Hayao Miyazaki Builds a Story',
      author: 'Wren Petkov',
      link: 'https://storyfieldnotes.substack.com/p/how-hayao-miyazaki-builds-a-story',
      date: '2025-05-15',
    },
    {
      type: 'essay',
      text: 'Honesty in Relationships',
      author: 'Ava Huang',
      link: 'https://www.avabear.xyz/p/honesty-in-relationships?lli=1&utm_source=%2Finbox&utm_medium=reader2',
      date: '2025-10-23',
    },
    {
      type: 'essay',
      text: 'How to Dress a Monster, His Creator, and the Woman Who Loves Him',
      author: 'Tara Gonzalez',
      link: 'https://open.substack.com/pub/taramariagonzalez/p/how-to-dress-a-monster-his-creator?utm_campaign=post-expanded-share&utm_medium=web',
      date: '2025-11-30',
    },
    {
      type: 'essay',
      text: 'Are You Serious?',
      author: 'Visakan Veerasamy',
      link: 'https://visakanv.substack.com/p/are-you-serious',
      date: '2025-09-18',
    },
    {
      type: 'essay',
      text: "What's the Winning Strategy in China's 'low-trust' society?",
      author: 'Robert Wu',
      link: 'https://open.substack.com/pub/robertwoo/p/whats-the-winning-strategy-in-chinas?utm_campaign=post-expanded-share&utm_medium=web',
      date: '2025-08-25',
    },
    {
      type: 'essay',
      text: 'The Rare People Who Are Solid',
      author: 'Sasha Chapin',
      link: 'https://open.substack.com/pub/sashachapin/p/the-rare-people-who-are-solid?utm_campaign=post&utm_medium=email',
      date: '2026-01-14',
    },
    {
      type: 'essay',
      text: "Quick Take: How the French Invented Love",
      author: 'David Roman',
      link: 'https://open.substack.com/pub/mankind/p/quick-take-how-the-french-invented?utm_campaign=post&utm_medium=email',
      date: '2025-06-08',
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

// Colors from Portfolio.js gradient (full opacity) - outside component to avoid dependency issues
const portfolioColors = [
  'rgba(237, 190, 228, 1)', // pink
  'rgba(161, 168, 190, 1)', // blue-gray
  'rgba(243, 208, 195, 1)', // peach
  'rgba(234, 120, 91, 1)',  // coral
  'rgba(95, 84, 32, 1)',    // brown
]

function About() {
  const [openedVinyl, setOpenedVinyl] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const mobileEssayScrollRef = useRef(null)
  const desktopEssayScrollRef = useRef(null)

  // Get color based on scroll position
  const essayColor = useMemo(() => {
    const colorIndex = Math.floor(scrollY / 150) % portfolioColors.length
    return portfolioColors[colorIndex]
  }, [scrollY])

  useEffect(() => {
    // Update scroll position based on window and essay window scrolls
    const updateScrollY = () => {
      const windowScroll = window.scrollY
      const mobileEssayScroll = mobileEssayScrollRef.current?.scrollTop || 0
      const desktopEssayScroll = desktopEssayScrollRef.current?.scrollTop || 0
      // Use whichever essay scroll is active (they're mutually exclusive based on screen size)
      const essayScroll = mobileEssayScroll || desktopEssayScroll
      setScrollY(windowScroll + essayScroll)
    }

    // Track window scroll
    const handleWindowScroll = () => {
      updateScrollY()
    }

    // Track essay window scroll (mobile)
    const handleMobileEssayScroll = () => {
      updateScrollY()
    }

    // Track essay window scroll (desktop)
    const handleDesktopEssayScroll = () => {
      updateScrollY()
    }

    // Set initial scroll position
    updateScrollY()

    // Add listeners
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    
    // Set up essay scroll listeners (check refs periodically or use MutationObserver)
    const setupEssayListeners = () => {
      const mobileEssayEl = mobileEssayScrollRef.current
      const desktopEssayEl = desktopEssayScrollRef.current

      if (mobileEssayEl) {
        mobileEssayEl.addEventListener('scroll', handleMobileEssayScroll, { passive: true })
      }
      if (desktopEssayEl) {
        desktopEssayEl.addEventListener('scroll', handleDesktopEssayScroll, { passive: true })
      }

      return { mobileEssayEl, desktopEssayEl }
    }

    // Initial setup
    let { mobileEssayEl, desktopEssayEl } = setupEssayListeners()

    // Retry setup if refs aren't ready (for when component first mounts)
    const retryTimeout = setTimeout(() => {
      const retry = setupEssayListeners()
      mobileEssayEl = retry.mobileEssayEl
      desktopEssayEl = retry.desktopEssayEl
    }, 100)

    return () => {
      clearTimeout(retryTimeout)
      window.removeEventListener('scroll', handleWindowScroll)
      if (mobileEssayEl) {
        mobileEssayEl.removeEventListener('scroll', handleMobileEssayScroll)
      }
      if (desktopEssayEl) {
        desktopEssayEl.removeEventListener('scroll', handleDesktopEssayScroll)
      }
    }
  }, [])

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

  // Separate music items, essays, and other items (books are now included in otherItems)
  const musicItems = useMemo(() => sortedArchiveItems.filter(item => item.type === 'music'), [sortedArchiveItems])
  const essayItems = useMemo(() => sortedArchiveItems.filter(item => item.type === 'essay'), [sortedArchiveItems])
  const otherItems = useMemo(() => sortedArchiveItems.filter(item => item.type !== 'music' && item.type !== 'essay'), [sortedArchiveItems])

  // Get positions for music items on shelf (like vinyl records)
  const getMusicShelfPositions = (musicItems, isMobile) => {
    const positions = []
    const containerWidth = isMobile ? 400 : 950
    const padding = isMobile ? 20 : 30
    
    // Calculate vinyl size to fit all items across in mobile
    let vinylSize, shelfSpacing
    if (isMobile && musicItems.length > 0) {
      // Calculate size to fit all vinyls across the full container width with exactly 5px spacing
      // No left padding - leftmost vinyl at edge of screen
      // Formula: containerWidth = numVinyls * vinylSize + (numVinyls - 1) * 5px
      const availableWidth = containerWidth // Full width, no padding
      const numVinyls = musicItems.length
      const spacingBetweenVinyls = 3 // Fixed 5px spacing
      // vinylSize * numVinyls + (numVinyls - 1) * 5 = containerWidth
      // vinylSize * numVinyls = containerWidth - (numVinyls - 1) * 5
      // vinylSize = (containerWidth - (numVinyls - 1) * 5) / numVinyls
      vinylSize = Math.floor((availableWidth  - (numVinyls - 1) * spacingBetweenVinyls)  / numVinyls)
      shelfSpacing = spacingBetweenVinyls // Exactly 5px
    } else {
      vinylSize = 119
      shelfSpacing = 18
    }
    
    const shelfHeight = isMobile ? 340 : 175 // Position shelf below post-it note (moved down 100px more)
    const shelfThickness = 12 // Keep same for visibility
    
    // Calculate shelf width needed - full width for mobile
    const shelfWidth = isMobile ? containerWidth : Math.min(
      musicItems.length * vinylSize + (musicItems.length - 1) * shelfSpacing + padding * 2,
      containerWidth * 0.9
    )
    
    // Music items are placed horizontally on the shelf
    if (isMobile) {
      // For mobile: space evenly across full width
      for (let i = 0; i < musicItems.length; i++) {
        const leftPosition = i * (vinylSize + shelfSpacing)
        positions.push({
          top: `${shelfHeight - vinylSize}px`, // Position above shelf so bottom aligns with shelf top
          left: `${leftPosition}px`, // Evenly spaced across full width
          rotation: 0,
          height: vinylSize,
          isMusic: true,
        })
      }
    } else {
      // For desktop: right-aligned as before
      let currentLeft = containerWidth - padding - vinylSize
      for (let i = musicItems.length - 1; i >= 0; i--) {
        positions.push({
          top: `${shelfHeight - vinylSize}px`,
          left: `${currentLeft}px`,
          rotation: 0,
          height: vinylSize,
          isMusic: true,
        })
        currentLeft -= (vinylSize + shelfSpacing)
      }
      positions.reverse()
    }
    
    return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth }
  }

  // Natural gallery/mosaic positions for non-music archive items
  // Uses collision detection to ensure no overlaps with varied heights
  const getGalleryPositions = (items, isMobile, startTop, essayWindowTop = null, essayWindowHeight = 0) => {
    const positions = []
    const cardWidth = isMobile ? 150 : 180
    const baseCardHeight = isMobile ? 200 : 240
    const containerWidth = isMobile ? 400 : 950
    const padding = isMobile ? 20 : 30
    const spacing = isMobile ? 80 : 90 // Increased spacing for better separation
    const postItWidth = isMobile ? 160 : 200
    const postItHeight = isMobile ? 120 : 150
    const totalItems = items.length
    
    // Calculate essay window bounds (60% width on the right)
    const essayWindowRight = containerWidth - padding
    const essayWindowLeft = essayWindowRight - (containerWidth * 0.6)
    const essayWindowBottom = essayWindowTop !== null ? essayWindowTop + essayWindowHeight : -1
    
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
    
    // Always reserve space for essay window on the right if it exists
    if (essayWindowTop !== null) {
      placedRects.push({
        top: Math.max(0, essayWindowTop - spacing / 2),
        left: essayWindowLeft - spacing / 2,
        right: essayWindowRight + spacing / 2,
        bottom: essayWindowBottom + spacing / 2,
      })
    }
    
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
  
  // Calculate essay scrolling window position (below music shelf and post-it)
  const essayWindowHeight = 394 // Height of the essay scrolling window (315px + 25% = 394px)
  const mobileEssayWindowTop = useMemo(() => {
    const musicShelfBottom = mobileMusicPositions.shelfBottom || 252
    const postItBottom = 220 // Post-it note height + spacing (moved down 100px)
    return Math.max(musicShelfBottom, postItBottom) + 40 // Below music shelf and post-it with spacing
  }, [mobileMusicPositions])
  
  const desktopEssayWindowTop = useMemo(() => {
    const musicShelfBottom = desktopMusicPositions.shelfBottom || 187
    return musicShelfBottom + 170 // Below music shelf
  }, [desktopMusicPositions])
  
  // Calculate positions for other items (below essay window)
  const mobileOtherPositions = useMemo(() => {
    const musicShelfBottom = mobileMusicPositions.shelfBottom || 352
    // Position items starting below essay window
    const startPosition = essayItems.length > 0 
      ? mobileEssayWindowTop + essayWindowHeight + 40 
      : Math.max(musicShelfBottom, 220) + 40 // Below shelf or post-it, whichever is lower
    return getGalleryPositions(otherItems, true, startPosition, 
      essayItems.length > 0 ? mobileEssayWindowTop : null, 
      essayItems.length > 0 ? essayWindowHeight : 0)
  }, [otherItems, mobileMusicPositions, mobileEssayWindowTop, essayItems, essayWindowHeight])
  
  const desktopOtherPositions = useMemo(() => {
    const musicShelfBottom = desktopMusicPositions.shelfBottom || 187
    // Position items starting below essay window
    const startPosition = essayItems.length > 0 
      ? desktopEssayWindowTop + essayWindowHeight + 70 
      : musicShelfBottom + 70
    return getGalleryPositions(otherItems, false, startPosition,
      essayItems.length > 0 ? desktopEssayWindowTop : null,
      essayItems.length > 0 ? essayWindowHeight : 0)
  }, [otherItems, desktopMusicPositions, desktopEssayWindowTop, essayItems, essayWindowHeight])

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
          className="aboutImage absolute left-1/2 -translate-x-1/2 w-[80%] max-w-[360px] md:bottom-[15%] md:right-[20%] md:left-auto md:translate-x-0 md:w-[30%] md:max-w-[320px] z-10 rounded-md"
          style={{ top: 'calc(25% - 250px)' }}
          alt="sit"
        />

        <img
          src="/images/about/main/fish.gif"
          className="aboutImage absolute top-[9%] left-[70%] -translate-x-1/2 w-[40%] max-w-[360px] md:bottom-[6%] md:right-[40%] md:left-auto md:translate-x-0 md:w-[20%] md:max-w-[320px] z-0"
          alt="fish"
        />

        {/* Text block - responsive vertical position */}
        <div className="absolute md:top-[80%] md:left-[37%] left-1/2 -translate-x-1/2 text-left w-[90%] max-w-md z-[10] text-gray-700" style={{ top: 'calc(18% - 150px)' }}>
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>4th year Computer Science @ SFU</li>
            <li>Aspiring Product Manager</li>
            <li>Artist and Explorer</li>
          
          </ul>
        </div>

        {/* Archive Gallery - Scattered cards */}
        {/* Archive section positioned below text and sit image */}
        <div className="relative w-full pb-20" style={{ marginTop: 'calc(max(18vh + 120px, 25vh + min(80vw, 360px)) + 550px)' }}>
          {/* Archive title */}
          <h3
            className="text-center mb-12 text-2xl md:text-3xl text-gray-700"
            style={{ 
              fontFamily: "'Melo', sans-serif",
              zIndex: 15
            }}
          >
            archive
          </h3>
          
          {/* Archive content container */}
          <div className="relative w-full">
          
          <div className="relative w-full" style={{ minHeight: `${((mobileMusicPositions.shelfBottom || 352) + (essayItems.length > 0 ? essayWindowHeight + 30 : 0)) + Math.ceil(otherItems.length / 2) * 280}px` }}>
            {/* Pinned Post-it Note - FIRST (Below sit image) */}
            <div className="absolute left-4 z-10" style={{ top: '50px', transform: 'rotate(-2deg)' }}>
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

            {/* Music Items Section - SECOND (Vinyls on Shelf, below post-it) */}
            {musicItems.length > 0 && (
              <>
                {/* Wooden Shelf for Music Items - Full Width in Mobile */}
                <div 
                  className="absolute z-15"
                  style={{
                    top: `${mobileMusicPositions.shelfBottom - 12}px`,
                    left: '0',
                    right: '0',
                    width: `${mobileMusicPositions.shelfWidth || 400}px`,
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

                {/* Music Items on Shelf - Pinned */}
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
              </>
            )}

            {/* Essay Scrolling Window - THIRD (Below vinyls and post-it) */}
            {essayItems.length > 0 && (
              <div
                className="absolute rounded-[5px] bg-white overflow-hidden"
                style={{
                  top: `${mobileEssayWindowTop}px`,
                  left: '20px',
                  width: '60%',
                  height: '375px',
                  zIndex: 10,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: `2px solid ${essayColor}`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                <div 
                  ref={mobileEssayScrollRef}
                  className="h-full overflow-y-auto px-4 py-3 essay-scrollbar"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${essayColor} transparent`,
                    '--scrollbar-color': essayColor,
                  }}
                >
                  <div className="flex flex-col gap-3">
                    {essayItems.map((item, index) => (
                      <div
                        key={`essay-${index}`}
                        className="cursor-pointer transition-all border-b pb-2 last:border-b-0 relative overflow-hidden"
                        style={{
                          borderColor: index < essayItems.length - 1 ? essayColor : 'transparent',
                          transition: 'border-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          // Add hover color effect
                          const hoverOverlay = document.createElement('div')
                          hoverOverlay.className = 'essay-hover-overlay'
                          hoverOverlay.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: ${essayColor}30;
                            pointer-events: none;
                            z-index: 1;
                            opacity: 0;
                            transition: opacity 0.3s ease;
                          `
                          e.currentTarget.appendChild(hoverOverlay)
                          e.currentTarget.style.position = 'relative'
                          // Trigger fade in
                          setTimeout(() => {
                            hoverOverlay.style.opacity = '1'
                          }, 10)
                        }}
                        onMouseLeave={(e) => {
                          const hoverOverlay = e.currentTarget.querySelector('.essay-hover-overlay')
                          if (hoverOverlay) {
                            hoverOverlay.style.opacity = '0'
                            setTimeout(() => {
                              if (hoverOverlay && hoverOverlay.parentNode) {
                                hoverOverlay.remove()
                              }
                            }, 300)
                          }
                        }}
                        onClick={() => {
                          if (item.link) {
                            window.open(item.link, '_blank')
                          }
                        }}
                      >
                        <p className="text-xs text-gray-700 font-medium mb-1 relative z-10">{item.text}</p>
                        {item.author && (
                          <p className="text-[10px] text-gray-600 mb-1 font-normal relative z-10">{item.author}</p>
                        )}
                        <p className="text-[10px] text-gray-400 relative z-10">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Items (including books) - FOURTH (Below essays) */}
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

            <div className="relative w-full" style={{ minHeight: `${((desktopMusicPositions.shelfBottom || 187) + (essayItems.length > 0 ? 200 : 0)) + Math.ceil(otherItems.length / 3) * 280}px` }}>
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

              {/* Essay Scrolling Window */}
              {essayItems.length > 0 && (
                <div
                  className="absolute rounded-[5px] bg-white overflow-hidden"
                  style={{
                    top: `${desktopEssayWindowTop}px`,
                    left: '30px',
                    width: '60%',
                    height: '394px',
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: essayColor,
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <div 
                    ref={desktopEssayScrollRef}
                    className="h-full overflow-y-auto px-6 py-4 essay-scrollbar"
                    style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: `${essayColor} transparent`,
                      '--scrollbar-color': essayColor,
                    }}
                  >
                    <div className="flex flex-col gap-3">
                      {essayItems.map((item, index) => (
                        <div
                          key={`essay-${index}`}
                          className="cursor-pointer transition-all border-b pb-2 last:border-b-0 relative overflow-hidden"
                          style={{
                            borderColor: index < essayItems.length - 1 ? essayColor : 'transparent',
                            transition: 'border-color 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            // Add hover color effect with dynamic color updates
                            const hoverOverlay = document.createElement('div')
                            hoverOverlay.className = 'essay-hover-overlay'
                            
                            const updateHoverColor = () => {
                              const currentColor = essayColor // Get current color dynamically
                              hoverOverlay.style.cssText = `
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: ${currentColor}30;
                                pointer-events: none;
                                z-index: 1;
                                opacity: 0;
                                transition: opacity 0.3s ease;
                              `
                            }
                            
                            updateHoverColor()
                            e.currentTarget.appendChild(hoverOverlay)
                            e.currentTarget.style.position = 'relative'
                            
                            // Trigger fade in
                            setTimeout(() => {
                              hoverOverlay.style.opacity = '1'
                            }, 10)
                            
                            // Update color periodically while hovering to match scroll
                            const colorUpdateInterval = setInterval(() => {
                              if (hoverOverlay.parentNode) {
                                updateHoverColor()
                                // Update opacity to maintain visibility
                                if (hoverOverlay.style.opacity !== '0') {
                                  hoverOverlay.style.opacity = '1'
                                }
                              } else {
                                clearInterval(colorUpdateInterval)
                              }
                            }, 100)
                            
                            hoverOverlay.dataset.intervalId = colorUpdateInterval.toString()
                          }}
                          onMouseLeave={(e) => {
                            const hoverOverlay = e.currentTarget.querySelector('.essay-hover-overlay')
                            if (hoverOverlay) {
                              // Clear interval if it exists
                              if (hoverOverlay.dataset.intervalId) {
                                clearInterval(parseInt(hoverOverlay.dataset.intervalId))
                              }
                              hoverOverlay.style.opacity = '0'
                              setTimeout(() => {
                                if (hoverOverlay && hoverOverlay.parentNode) {
                                  hoverOverlay.remove()
                                }
                              }, 300)
                            }
                          }}
                          onClick={() => {
                            if (item.link) {
                              window.open(item.link, '_blank')
                            }
                          }}
                        >
                          <p className="text-sm text-gray-700 font-medium mb-1 relative z-10">{item.text}</p>
                          {item.author && (
                            <p className="text-xs text-gray-600 mb-1 font-normal relative z-10">{item.author}</p>
                          )}
                          <p className="text-xs text-gray-400 relative z-10">{item.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other Items (including books) */}
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