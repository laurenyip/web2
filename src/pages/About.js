import React, { useEffect } from 'react'
import InfiniteCarousel from './InfiniteCarousel'
import Navbar from '../components/Navbar'
import '../components/Navbar.css'
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
    <div className="About">
     
          <Navbar />
       
      
      {/* Name in top right */}
      <div
        className="ml-[65%] absolute top-[15%] text-8xl text-gray-700"
        style={{ fontFamily: "'Melo', sans-serif" }}
      >
        Lauren Yip
      </div>

      {/* Love image in top left */}
      <img
        src="/images/about/main/love.jpg"
        className="aboutImage"
        alt="love"
        style={{
          position: 'absolute',
          top: '18%',
          left: '22%',
          width: '40%',
          maxWidth: '220px',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        }}
      />

      {/* Sitting image in bottom right */}
      <img
        src="/images/about/main/sitting.jpg"
        className="aboutImage"
        alt="sit"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '30%',
          maxWidth: '320px',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        }}
      />

      {/* Text in bottom left, between images */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '22%',
          maxWidth: '350px',
          zIndex: '2',
        }}
      >
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '20px',
            fontSize: '18px',
            lineHeight: '1.8',
          }}
        >
          <li>4th year Computer Science @ SFU</li>
          <li>Aspiring Product Manager</li>
          <li>Artist and Explorer</li>
        </ul>
      </div>

      {/* Infinite Looping Carousel - kept exactly as is */}
      <div
        style={{
          position: 'absolute',
          bottom: '-35%',
          left: '20%',
          maxWidth: '65%',
          zIndex: '2',

          overflow: 'hidden',
        }}
      >
        <InfiniteCarousel items={carouselItems} />
      </div>
    </div>
  )
}

export default About
