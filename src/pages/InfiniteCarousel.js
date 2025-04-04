import React, { useState, useEffect, useRef } from 'react'

const InfiniteCarousel = ({ items }) => {
  const [position, setPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef(null)
  const [flippedCards, setFlippedCards] = useState(
    new Array(items.length).fill(false),
  )
  const autoScrollTimerRef = useRef(null)

  // Carousel parameters
  const cardWidth = 160 // Width of each card
  const cardGap = 50 // Gap between cards
  const itemWidth = cardWidth + cardGap // Total width including gap

  // Create a triple-sized array for smooth infinite scrolling
  const extendedItems = [...items, ...items, ...items]

  // Initialize position to show the middle set of items
  useEffect(() => {
    setPosition(-items.length * itemWidth)
  }, [items.length, itemWidth])

  // Set up auto rotation
  useEffect(() => {
    startAutoRotation()

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [position, isAnimating])

  const startAutoRotation = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current)
    }

    autoScrollTimerRef.current = setInterval(() => {
      if (!isAnimating) {
        navigateCarousel('next')
      }
    }, 5000)
  }

  // Handle carousel navigation
  const navigateCarousel = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)

    const moveAmount = direction === 'next' ? -itemWidth : itemWidth
    setPosition((prev) => prev + moveAmount)

    // Reset flipped cards
    setFlippedCards(new Array(items.length).fill(false))

    // Handle infinite scrolling logic after animation completes
    setTimeout(() => {
      // If we've scrolled too far in either direction, jump to the equivalent position
      // in the middle set without animation
      const threshold = -items.length * itemWidth

      if (
        position + moveAmount <=
        threshold - items.length * itemWidth + itemWidth
      ) {
        // If we've gone too far forward, jump back
        setPosition(threshold)
      } else if (
        position + moveAmount >=
        threshold + items.length * itemWidth - itemWidth
      ) {
        // If we've gone too far backward, jump forward
        setPosition(threshold)
      }

      setIsAnimating(false)
    }, 500)
  }

  // Toggle card flip
  const toggleFlip = (index) => {
    // Find the equivalent index in the original items array
    const originalIndex = index % items.length

    setFlippedCards((prev) => {
      const newFlipped = [...prev]
      newFlipped[originalIndex] = !newFlipped[originalIndex]
      return newFlipped
    })
  }

  // Handle link click without toggling the card
  const handleLinkClick = (e, link) => {
    e.stopPropagation() // Prevent card flip when clicking the button
    window.open(link, '_blank')
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0',
      }}
    >
      <h3
        className="melo-font"
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '24px',
        }}
      >
        current
      </h3>

      {/* Navigation Arrows */}
      <button
        onClick={() => navigateCarousel('prev')}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
      >
        &#10094;
      </button>

      <button
        onClick={() => navigateCarousel('next')}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
      >
        &#10095;
      </button>

      {/* Carousel Viewport - shows 4 full cards + 2 half cards */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          maxWidth: `${4 * itemWidth + cardWidth}px`, // Width for 4 full cards + 2 half cards
          margin: '0 auto',
          height: `${cardWidth}px`,
        }}
      >
        {/* Carousel Track */}
        <div
          ref={carouselRef}
          style={{
            display: 'flex',
            transform: `translateX(${position}px)`,
            transition: isAnimating ? 'transform 0.5s ease' : 'none',
            marginLeft: `${cardWidth / 2}px`, // Start with half card visible
          }}
        >
          {extendedItems.map((item, index) => {
            const originalIndex = index % items.length
            const isFlipped = flippedCards[originalIndex]

            return (
              <div
                key={`card-${index}`}
                onClick={() => toggleFlip(index)}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardWidth}px`,
                  position: 'relative',
                  flexShrink: 0,
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease',
                  cursor: 'pointer',
                  marginRight: `${cardGap}px`,
                }}
              >
                {/* Front - Image */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Back - Text and Link Button */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#eeeeee',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: item.link ? 'space-between' : 'center',
                    borderRadius: '8px',
                    transform: 'rotateY(180deg)',
                    padding: '15px',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      margin: item.link ? '0 0 10px 0' : 0,
                      fontWeight: '500',
                      lineHeight: '1.4',
                    }}
                  >
                    {item.text}
                  </p>

                  {item.link && (
                    <button
                      onClick={(e) => handleLinkClick(e, item.link)}
                      style={{
                        backgroundColor: '#eeeeee',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        marginTop: 'auto',
                        ':hover': {
                          backgroundColor: '#3a7bc8',
                        },
                      }}
                    >
                      {item.buttonText || 'View Link'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InfiniteCarousel
