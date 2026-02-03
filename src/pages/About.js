import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'

import './App.css'

  // Archive gallery data with different content types
  // Types: 'image', 'essay', 'book', 'movie', 'food', 'quote', 'music', 'place'
const ARCHIVE_ITEMS = [
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
      image: '/images/about/current/hightide.png',
      text: 'Hightide by Jan Toorop',
      caption: 'instant favourite painting',
      date: '2025-09-05',
    },
    {
      type: 'gallery',
      text: 'Broadway',
      date: '2024-10-15',
      photos: [
        '/images/about/current/romeo.jpg',
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
      ],
    },
    {
      type: 'gallery',
      text: 'Hike',
      date: '2025-07-18',
      photos: [
        '/images/about/current/babel.jpg',
      ],
      style: 'secret', // Secret album with mystical border
    },
    {
      type: 'gallery',
      text: 'Gallery 3',
      date: '2025-01-01',
      photos: [
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
      ],
      style: 'photobooth', // Photobooth style
    },
    {
      type: 'gallery',
      text: 'Gallery 4',
      date: '2025-01-01',
      photos: [
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
        null, // Empty slot - can be edited later
      ],
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
  const [scrollY, setScrollY] = useState(0)
  const [albumColors, setAlbumColors] = useState({})
  const [openGallery, setOpenGallery] = useState(null)

  // Get color based on scroll position
  const essayColor = useMemo(() => {
    const colorIndex = Math.floor(scrollY / 150) % portfolioColors.length
    return portfolioColors[colorIndex]
  }, [scrollY])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    // Set initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      const vinylSize = isMobile ? 98 : 119
      const centerHole = vinylSize * 0.15
      
      // Get colors from album cover or use defaults
      const defaultColors = { from: '#1a1a1a', via: '#0d0d0d', to: '#000000' }
      const colors = albumColors[item.text] || defaultColors
      
      return (
        <div 
          className="relative group cursor-pointer"
          style={{ width: `${vinylSize}px`, height: `${vinylSize}px` }}
          onMouseEnter={(e) => {
            // Extract colors from album cover image
            if (item.image && !albumColors[item.text]) {
              const img = new Image()
              img.crossOrigin = 'anonymous'
              img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                
                // Sample pixels from center area of image
                const sampleSize = Math.min(50, Math.floor(img.width / 4))
                const startX = Math.floor((img.width - sampleSize) / 2)
                const startY = Math.floor((img.height - sampleSize) / 2)
                
                const imageData = ctx.getImageData(startX, startY, sampleSize, sampleSize)
                const pixels = imageData.data
                
                // Calculate average RGB values
                let r = 0, g = 0, b = 0, count = 0
                for (let i = 0; i < pixels.length; i += 4) {
                  r += pixels[i]
                  g += pixels[i + 1]
                  b += pixels[i + 2]
                  count++
                }
                
                r = Math.floor(r / count)
                g = Math.floor(g / count)
                b = Math.floor(b / count)
                
                // Create gradient colors (darker variants)
                const from = `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`
                const via = `rgb(${r}, ${g}, ${b})`
                const to = `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`
                
                setAlbumColors(prev => ({
                  ...prev,
                  [item.text]: { from, via, to }
                }))
              }
              img.src = item.image
            }
          }}
          onClick={() => {
            if (item.link) {
              window.open(item.link, '_blank')
            }
          }}
        >
          {/* Album Sleeve (Cover) */}
          <div 
            className="absolute inset-0 bg-white transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-90 group-hover:rotate-180"
            style={{
              transformOrigin: 'center center',
              zIndex: 2,
              width: `${vinylSize}px`,
              height: `${vinylSize}px`,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
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
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-black opacity-10"></div>
          </div>

          {/* Vinyl Record (revealed on hover) */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
            style={{
              transformOrigin: 'center center',
              zIndex: 1,
            }}
          >
            {/* Vinyl Record Circle with slow rotation */}
            <div 
              className="relative rounded-full mx-auto group-hover:animate-spin-slow"
              style={{ 
                width: `${vinylSize}px`, 
                height: `${vinylSize}px`,
                background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* Vinyl Grooves (concentric circles) */}
              {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((radius, idx) => (
                <div
                  key={idx}
                  className="absolute rounded-full border opacity-20"
                  style={{
                    width: `${vinylSize * radius}px`,
                    height: `${vinylSize * radius}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: 'rgba(0,0,0,0.3)',
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
          </div>
        </div>
      )
    }

    // Gallery card - Editorial style
    if (item.type === 'gallery') {
      // Secret album style - single cover with mystical border
      if (item.style === 'secret') {
        return (
          <div 
            className="cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden bg-white"
            onClick={() => setOpenGallery(item.text)}
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div className="relative p-4">
              {item.photos[0] ? (
                <div className="relative group">
                  <img
                    src={item.photos[0]}
                    alt={item.text}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'grayscale(20%) contrast(1.05)' }}
                  />
                  {/* Mystical moving border */}
                  <div className="absolute inset-0 border-2 border-transparent mystical-border"></div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 text-2xl">+</span>
                </div>
              )}
            </div>
            <div className="px-4 pb-4 pt-2">
              <p className={`${textSize} text-gray-900 mb-1 font-light tracking-wide uppercase`} style={{ 
                fontFamily: "'Georgia', serif",
                letterSpacing: '0.1em',
                fontSize: isMobile ? '11px' : '12px'
              }}>
                {item.text}
              </p>
              <p className={`${dateSize} text-gray-500`} style={{ 
                fontFamily: "'Arial', sans-serif",
                fontSize: isMobile ? '9px' : '10px',
                letterSpacing: '0.05em'
              }}>
                {item.date}
              </p>
            </div>
          </div>
        )
      }
      
      // Photobooth style - Editorial vintage look
      if (item.style === 'photobooth') {
        return (
          <div 
            className="cursor-pointer transition-all duration-300 hover:shadow-xl relative bg-white"
            onClick={() => setOpenGallery(item.text)}
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
              border: '1px solid rgba(212, 165, 116, 0.3)',
            }}
          >
            <div className="grid grid-cols-2 gap-3 p-4" style={{ background: '#fafafa' }}>
              {item.photos.map((photo, idx) => (
                <div 
                  key={idx}
                  className="aspect-square bg-white flex items-center justify-center overflow-hidden group relative"
                  style={{
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  {photo ? (
                    <>
                      <img
                        src={photo}
                        alt={`${item.text} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ filter: 'sepia(10%) contrast(1.1)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <span className="text-gray-300 text-lg">📷</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 pt-3" style={{ background: '#fff', borderTop: '1px solid rgba(212, 165, 116, 0.1)' }}>
              <p className={`${textSize} text-gray-900 mb-1 font-light tracking-wide`} style={{ 
                fontFamily: "'Georgia', serif",
                fontSize: isMobile ? '13px' : '14px',
                letterSpacing: '0.05em'
              }}>
                {item.text}
              </p>
              <p className={`${dateSize} text-gray-500`} style={{ 
                fontFamily: "'Arial', sans-serif",
                fontSize: isMobile ? '9px' : '10px',
                letterSpacing: '0.05em'
              }}>
                {item.date}
              </p>
            </div>
          </div>
        )
      }
      
      // Default gallery style - Editorial 4 photo grid
      return (
        <div 
          className="cursor-pointer transition-all duration-300 hover:shadow-xl relative bg-white overflow-hidden"
          onClick={() => setOpenGallery(item.text)}
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 p-3">
            {item.photos.map((photo, idx) => (
              <div 
                key={idx}
                className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden group relative"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                {photo ? (
                  <>
                    <img
                      src={photo}
                      alt={`${item.text} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: 'grayscale(15%) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-sm font-light">+</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 pt-3 border-t border-gray-100">
            <p className={`${textSize} text-gray-900 mb-1 font-light tracking-wide uppercase`} style={{ 
              fontFamily: "'Georgia', serif",
              letterSpacing: '0.1em',
              fontSize: isMobile ? '11px' : '12px'
            }}>
              {item.text}
            </p>
            <p className={`${dateSize} text-gray-500`} style={{ 
              fontFamily: "'Arial', sans-serif",
              fontSize: isMobile ? '9px' : '10px',
              letterSpacing: '0.05em'
            }}>
              {item.date}
            </p>
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

  // Find the open gallery item
  const openGalleryItem = useMemo(() => {
    if (!openGallery) return null
    return sortedArchiveItems.find(item => item.type === 'gallery' && item.text === openGallery)
  }, [openGallery, sortedArchiveItems])

  return (
    <div className="About relative" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
      
      <Navbar />
      
      {/* Gallery Modal */}
      {openGalleryItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenGallery(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h3 className="text-2xl font-light text-gray-900 tracking-wide uppercase" style={{ 
                  fontFamily: "'Georgia', serif",
                  letterSpacing: '0.1em'
                }}>
                  {openGalleryItem.text}
                </h3>
                <p className="text-xs text-gray-500 mt-1" style={{ 
                  fontFamily: "'Arial', sans-serif",
                  letterSpacing: '0.05em'
                }}>
                  {openGalleryItem.date}
                </p>
              </div>
              <button
                onClick={() => setOpenGallery(null)}
                className="text-gray-400 hover:text-gray-700 text-3xl font-light transition-colors duration-200"
                style={{ lineHeight: '1' }}
              >
                ×
              </button>
            </div>
            <div className={`grid gap-4 p-8 ${openGalleryItem.style === 'secret' ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-2'}`}>
              {openGalleryItem.photos.map((photo, idx) => (
                <div 
                  key={idx}
                  className="aspect-square bg-gray-50 overflow-hidden relative group"
                  style={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {photo ? (
                    <>
                      <img
                        src={photo}
                        alt={`${openGalleryItem.text} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: 'grayscale(10%) contrast(1.05)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-sm font-light">Empty</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Layout - Editorial style */}
      <div className="lg:hidden" style={{ marginTop: '15vh' }}>
        {/* Static header section - always at top above archive */}
        <div className="relative w-full" style={{ minHeight: '400px', paddingTop: '80px' }}>
          {/* Centered main title */}
          <div className="relative text-center z-30" style={{ width: '100%' }}>
            <h1 className="text-5xl md:text-8xl text-gray-700 mb-4" style={{ 
              fontFamily: "'Melo', sans-serif"
            }}>
              Lauren Yip
            </h1>
            {/* Subtitle in one line */}
            <p className="text-gray-600 font-light text-center" style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: '0.02em',
              fontSize: '14px',
              transform: 'none'
            }}>
              4th year Computer Science @ SFU · Aspiring Product Manager · Artist and Explorer
            </p>
          </div>

          {/* Scattered images around the title */}
          {/* Love image - top left */}
          <img
            src="/images/about/main/love.jpg"
            className="aboutImage absolute z-20"
            style={{
              top: '60px',
              left: '10%',
              width: '15%',
              maxWidth: '108px',
              borderRadius: '5px',
            }}
            alt="love"
          />

          {/* Sitting image - positioned above archive */}
          <img
            src="/images/about/main/sitting.jpg"
            className="aboutImage absolute z-10"
            style={{
              top: '250px',
              right: '8%',
              width: '18%',
              maxWidth: '144px',
              borderRadius: '5px',
            }}
            alt="sit"
          />

          {/* Fish gif - top right */}
          <img
            src="/images/about/main/fish.gif"
            className="aboutImage absolute z-0"
            style={{
              top: '30px',
              right: '12%',
              width: '22%',
              maxWidth: '160px',
              transform: 'rotate(-1deg)',
            }}
            alt="fish"
          />
        </div>

        {/* Archive Gallery - Scattered cards */}
        {/* Archive section positioned below static header */}
        <div className="relative w-full pb-20">
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
                        if (item.link) {
                          window.open(item.link, '_blank')
                        }
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

      {/* Desktop Layout - Editorial style */}
      <div className="hidden lg:block" style={{ marginTop: '15vh' }}>
        {/* Static header section - always at top above archive */}
        <div className="relative w-full" style={{ minHeight: '500px', paddingTop: '100px' }}>
          {/* Centered main title */}
          <div className="relative text-center z-30 left-1/2 -translate-x-1/2" style={{ width: '100%' }}>
            <h1 className="text-[120px] text-gray-700 mb-6" style={{ 
              fontFamily: "'Melo', sans-serif"
            }}>
              Lauren Yip
            </h1>
            {/* Subtitle in one line */}
            <p className="text-gray-600 font-light text-center" style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: '0.02em',
              fontSize: '14px',
              transform: 'none'
            }}>
              4th year Computer Science @ SFU · Aspiring Product Manager · Artist and Explorer
            </p>
          </div>

          {/* Scattered images around the title */}
          {/* Love image - top left */}
          <img
            src="/images/about/main/love.jpg"
            className="aboutImage absolute z-20"
            style={{
              top: '80px',
              left: '8%',
              width: '132px',
              borderRadius: '5px',
            }}
            alt="love"
          />

          {/* Sitting image - positioned above archive */}
          <img
            src="/images/about/main/sitting.jpg"
            className="aboutImage absolute z-10"
            style={{
              top: '300px',
              right: '10%',
              width: '192px',
              borderRadius: '5px',
            }}
            alt="sit"
          />

          {/* Fish gif - top right */}
          <img
            src="/images/about/main/fish.gif"
            className="aboutImage absolute z-0"
            style={{
              top: '50px',
              right: '15%',
              width: '200px',
              transform: 'rotate(-1deg)',
            }}
            alt="fish"
          />
        </div>

        {/* Archive Gallery - Scattered cards */}
        <div 
          className="relative z-[2] left-1/2 -translate-x-1/2"
          style={{
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
                      if (item.link) {
                        window.open(item.link, '_blank')
                      }
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
                    className="h-full overflow-y-auto px-6 py-4 essay-scrollbar"
                    style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: `${essayColor} transparent`,
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
  )
}

export default About