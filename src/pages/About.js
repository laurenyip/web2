import React, { useEffect } from 'react'
import InfiniteCarousel from '../components/InfiniteCarousel'
import Navbar from '../components/Navbar'

import './App.css'

function About() {
  // Carousel data - 8 items
  const carouselItems = [
    {
      image: '/images/about/current/romeo.jpg',
      text: 'Romeo & Juliet performance',
      link: 'https://www.youtube.com/watch?v=5FsKvp5mME0&list=TLPQMzAwMzIwMjWHzTbqBTJFCA&index=2&pp=gAQBiAQB8AUB',
      buttonText: 'favourite play',
    },
    {
      image: '/images/about/current/insect.jpg',
      text: 'Insectarium, Montreal',
    },
    {
      image: '/images/about/current/milena.jpg',
      text: 'Letters to Milena by Franz Kafka',
    },
    {
      image: '/images/about/current/atel.jpg',
      text: 'recent life archive',
      link: 'https://open.spotify.com/playlist/33M9IYi906TrPaxU9dMrL3?si=aa3a043f764b4d56',
      buttonText: 'Listen here',
    },
    {
      image: '/images/about/current/white.jpg',
      text: 'White Nights by Fyodor Doestoevsky - obsessed',
    },
    { image: '/images/about/current/babel.jpg', text: 'Babel by R. F. Kuang' },
    {
      image: '/images/about/current/under.jpg',
      text: 'working on my open water diving certification',
    },
    {
      image: '/images/about/current/hen.jpg',
      text: 'My favourite essay',
      link: 'https://www.henrikkarlsson.xyz/p/doestoevsky-as-lover',
      buttonText: 'Read here',
    },
  ]

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
        <div className="absolute top-[18%] left-1/2  text-5xl md:text-8xl text-center z-20 text-gray-700" style={{ fontFamily: "'Melo', sans-serif" }}>
          Lauren Yip
        </div>

        {/* Love image in top left */}
        <img
          src="/images/about/main/love.jpg"
          className="aboutImage absolute top-[18%] left-[25%] rounded-md -translate-x-1/2 md:top-[18%] md:left-[22%] md:translate-x-0 w-[40%] max-w-[220px] z-20"
          alt="love"
        />

        <img
          src="/images/about/main/sitting.jpg"
          className="aboutImage absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] max-w-[360px] md:bottom-[15%] md:right-[20%] md:left-auto md:translate-x-0 md:w-[30%] md:max-w-[320px] z-10 rounded-md shadow-md"
          alt="sit"
        />

        <img
          src="/images/about/main/fish.gif"
          className="aboutImage absolute top-[25%] left-[70%] -translate-x-1/2 w-[40%] max-w-[360px] md:bottom-[6%] md:right-[40%] md:left-auto md:translate-x-0 md:w-[20%] md:max-w-[320px] z-0"
          alt="fish"
        />

        {/* Text block - responsive vertical position */}
        <div className="absolute top-[50%] md:top-[80%] md:left-[37%] left-1/2 -translate-x-1/2 text-left w-[90%] max-w-md z-[10] text-[#001c80]">
          <ul className="list-disc list-inside text-base leading-relaxed">
            <li>4th year Computer Science @ SFU</li>
            <li>Aspiring Product Manager</li>
            <li>Artist and Explorer</li>
          </ul>
        </div>

        {/* Infinite Looping Carousel - kept exactly as is */}
        <div
          style={{
            position: 'absolute',
            bottom: '-45%',
            left: '20%',
            maxWidth: '65%',
            zIndex: '2',
            overflow: 'hidden',
            paddingBottom: '70px'
          }}
        >
          <InfiniteCarousel items={carouselItems} />
        </div>
      </div>

      {/* Desktop Layout - Fixed container with static positioning */}
      <div className="hidden lg:block">
        {/* Fixed container - 1200px wide, centered */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[1100px] h-screen">
          
          {/* Title - Static position within container */}
          <div 
            className="absolute text-[120px] text-center z-20 text-gray-700"
            style={{ 
              fontFamily: "'Melo', sans-serif",
              top: '120px',
              left: '500px',
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
              bottom: '200px',
              right: '00px',
              width: '360px'
            }}
            alt="sit"
          />

          {/* Fish gif - Static position */}
          <img
            src="/images/about/main/fish.gif"
            className="aboutImage absolute z-0"
            style={{
              bottom: '360px',
              right: '460px',
              width: '250px'
            }}
            alt="fish"
          />

          {/* Text block - Static position */}
          <div 
            className="absolute text-left z-[10]  text-[#001c80]"
            style={{
              top: '530px',
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

          {/* Carousel - Static position, matches container width */}
          <div 
            className="absolute z-[2] overflow-hidden"
            style={{
              bottom: '-45%',
              left: '0',
              width: '1100px',
              paddingBottom: '70px'
            }}
          >
            <InfiniteCarousel items={carouselItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About