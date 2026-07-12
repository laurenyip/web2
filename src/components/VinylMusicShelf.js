'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import AboutAlbumsCharm from './AboutAlbumsCharm'
import { MUSIC_ITEMS } from '../data/creativeContent'

const VINYL_SLEEVE_PX = 100

function getMusicShelfPositions(items, mobile, viewportW) {
  const positions = []
  const padding = mobile ? 8 : 16
  const shelfSpacing = mobile ? 6 : 10

  let vinylSize = VINYL_SLEEVE_PX
  let shelfWidth = items.length * vinylSize + (items.length - 1) * shelfSpacing + padding * 2

  if (mobile && items.length > 0) {
    const gap = 6
    const count = items.length
    const containerWidth = Math.max(280, (viewportW || 360) - 32)
    vinylSize = Math.floor((containerWidth - gap * (count - 1)) / count)
    shelfWidth = containerWidth
  }

  const shelfHeight = vinylSize + 28
  const shelfThickness = 12
  const shelfLeft = 0

  for (let i = 0; i < items.length; i++) {
    const leftPosition = shelfLeft + padding + i * (vinylSize + shelfSpacing)
    positions.push({
      top: `${shelfHeight - vinylSize}px`,
      left: `${leftPosition}px`,
      rotation: 0,
      height: vinylSize,
    })
  }

  return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth, shelfHeight, shelfLeft }
}

export default function VinylMusicShelf({ onImageOpen }) {
  const [viewportW, setViewportW] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1200)
  )

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isMobile = viewportW < 1024
  const musicShelf = useMemo(
    () => getMusicShelfPositions(MUSIC_ITEMS, isMobile, viewportW),
    [isMobile, viewportW]
  )

  if (MUSIC_ITEMS.length === 0) return null

  return (
    <div className="about-vinyl-shelf flex w-full min-w-0 max-w-full justify-start">
      <div
        className="about-vinyl-shelf-inner relative w-full min-w-0 max-w-full"
        style={{
          width: isMobile ? '100%' : `${Math.max(musicShelf.shelfWidth || 0, 1)}px`,
          maxWidth: '100%',
          height: isMobile ? 'auto' : `${(musicShelf.shelfBottom || 352) + 106}px`,
        }}
      >
        <div className="about-vinyl-shelf-records">
          {MUSIC_ITEMS.map((item, index) => {
            const pos = musicShelf.positions[index]
            if (!pos) return null
            const vinylSize = pos.height
            const centerHole = vinylSize * 0.15

            const colors = [
              { from: '#1a1a1a', via: '#0d0d0d', to: '#000000' },
              { from: '#2b2b2b', via: '#101010', to: '#000000' },
              { from: '#1f1f1f', via: '#0d0d0d', to: '#000000' },
              { from: '#222222', via: '#0f0f0f', to: '#000000' },
            ][index % 4]

            const textSize = isMobile ? 'text-[10px]' : 'text-xs'
            const dateSize = isMobile ? 'text-[9px]' : 'text-[10px]'

            return (
              <div
                key={`music-${index}`}
                className={`about-vinyl-record group z-20 cursor-pointer transition-transform ${isMobile ? 'relative' : 'absolute hover:scale-105'}`}
                style={
                  isMobile
                    ? undefined
                    : {
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotation}deg)`,
                        width: `${vinylSize}px`,
                        height: `${vinylSize}px`,
                      }
                }
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, '_blank', 'noopener,noreferrer')
                    return
                  }
                  if (item.image && onImageOpen) onImageOpen(item.image, item.text)
                }}
              >
                <div
                  className="absolute inset-0 bg-white transition-all duration-500 ease-out group-hover:-translate-x-[12%]"
                  style={{
                    transformOrigin: 'center center',
                    zIndex: 2,
                    boxShadow: isMobile
                      ? '0 1px 3px rgba(0,0,0,0.2)'
                      : '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.text}
                      className="h-full w-full"
                      width={400}
                      height={400}
                      priority={false}
                      style={{ objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600">
                      <div className="px-2 py-4 text-center text-white">
                        <p className={`${textSize} mb-1 font-medium`}>{item.text}</p>
                        <p className={`${dateSize} opacity-80`}>{item.date}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bottom-0 w-1 bg-black opacity-10" />
                </div>

                <div className="absolute inset-0 z-[1] origin-center opacity-0 transition-all duration-500 ease-out group-hover:translate-x-[18%] group-hover:opacity-100">
                  <div
                    className="about-vinyl-disc relative mx-auto h-full w-full rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
                      boxShadow:
                        'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
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
          })}
        </div>

        <div
          className={`about-vinyl-shelf-board z-[15]${isMobile ? '' : ' absolute'}`}
          style={{
            top: isMobile ? undefined : `${(musicShelf.shelfBottom || 352) - 12}px`,
            left: isMobile ? undefined : `${musicShelf.shelfLeft || 0}px`,
            width: isMobile ? '100%' : `${musicShelf.shelfWidth || 400}px`,
            height: '12px',
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              background:
                'linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
              borderTop: '1px solid rgba(139, 105, 20, 0.5)',
              borderBottom: '1px solid rgba(107, 78, 15, 0.8)',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full opacity-20"
                style={{
                  height: '1px',
                  top: `${i * 2.4}px`,
                  background:
                    i % 2 === 0
                      ? 'linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)'
                      : 'linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="about-albums-charm-slot">
          <AboutAlbumsCharm />
        </div>
      </div>
    </div>
  )
}
