import React, { useState, useEffect, useRef, useCallback } from 'react'

const InfiniteCarousel = ({ items }) => {
  const [position, setPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef(null)
  const [flippedCards, setFlippedCards] = useState(
    new Array(items.length).fill(false)
  )
  

  // Carousel parameters
  const cardWidth = 160
  const cardGap = 50
  const itemWidth = cardWidth + cardGap

  // Create triple-sized array for looping
  const extendedItems = [...items, ...items, ...items]

  // Center on middle set of cards
  useEffect(() => {
    setPosition(-items.length * itemWidth)
  }, [items.length, itemWidth])

  // Wrapped navigateCarousel in useCallback
  const navigateCarousel = useCallback(
    (direction) => {
      if (isAnimating) return
      setIsAnimating(true)

      const moveAmount = direction === 'next' ? -itemWidth : itemWidth
      setPosition((prev) => prev + moveAmount)

      setFlippedCards(new Array(items.length).fill(false))

      setTimeout(() => {
        const threshold = -items.length * itemWidth
        const newPosition = position + moveAmount

        if (
          newPosition <= threshold - items.length * itemWidth + itemWidth
        ) {
          setPosition(threshold)
        } else if (
          newPosition >= threshold + items.length * itemWidth - itemWidth
        ) {
          setPosition(threshold)
        }

        setIsAnimating(false)
      }, 500)
    },
    [isAnimating, itemWidth, items.length, position]
  )

  // Auto-scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        navigateCarousel('next')
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAnimating, navigateCarousel])

  const toggleFlip = (index) => {
    const originalIndex = index % items.length
    setFlippedCards((prev) => {
      const newFlipped = [...prev]
      newFlipped[originalIndex] = !newFlipped[originalIndex]
      return newFlipped
    })
  }

  const handleLinkClick = (e, link) => {
    e.stopPropagation()
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
          color: '#092c79',
          fontSize: '24px',
        }}
      >
        current
      </h3>

      {/* Desktop-only arrows */}
      <>
        <button
          onClick={() => navigateCarousel('prev')}
          className="hidden md:flex absolute left-5 top-[40%] -translate-y-1/2 z-50 bg-[#001c80] bg-opacity-70 text-white w-12 h-12 text-2xl rounded-full items-center justify-center transition-all duration-300 shadow-lg"
        >
          ❮
        </button>

        <button
          onClick={() => navigateCarousel('next')}
          className="hidden md:flex absolute right-5 top-[40%] -translate-y-1/2 z-50 bg-[#001c80] bg-opacity-70 text-white w-12 h-12 text-2xl rounded-full items-center justify-center transition-all duration-300 shadow-lg"
        >
          ❯
        </button>
      </>

      {/* Carousel Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          maxWidth: `${4 * itemWidth + cardWidth}px`,
          margin: '0 auto',
          height: `${cardWidth}px`,
        }}
      >
        <div
          ref={carouselRef}
          style={{
            display: 'flex',
            transform: `translateX(${position}px)`,
            transition: isAnimating ? 'transform 0.5s ease' : 'none',
            marginLeft: `${cardWidth / 2}px`,
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
                {/* Front */}
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

                {/* Back */}
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
