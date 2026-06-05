'use client'

import React, { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import './App.css'
import './AlbumGallery.css'

const GROOVE_RATIOS = [0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82]

const PRIORITY_TOP = [
  'sour',
  'london-calling',
  'stop-making-sense',
  'graceland',
  'your-name',
]

/** Albums — edit tracks, thoughts, and links in this list */
const ALBUMS = [
  {
    id: '52nd-street',
    artist: 'Billy Joel',
    image: '/images/albums/52nd-street.jpg',
    link: 'https://open.spotify.com/album/1HmCO8VK98AU6EXPOjGYyI',
    tracks: ['My Life', 'Honesty', 'Big Shot'],
  },
  {
    id: 'pogues-peace-and-love',
    artist: 'The Pogues',
    image: '/images/albums/pogues-peace-and-love.jpg',
    link: 'https://open.spotify.com/album/3tXDO01loDIUNfOWqBK4XD',
    tracks: ['Misty Morning, Albert Bridge', 'Streets of Sorrow/Birmingham Six'],
  },
  {
    id: 'naked',
    artist: 'Talking Heads',
    image: '/images/albums/naked.jpg',
    link: 'https://open.spotify.com/album/45wuU0jx8Lh0x3Xy8qJ5KP',
    tracks: ['(Nothing But) Flowers', 'Blind', 'Wild Wild Life'],
  },
  {
    id: 'bts-hyyh-pt2',
    artist: 'BTS',
    image: '/images/albums/bts-hyyh-pt2.jpg',
    link: 'https://open.spotify.com/album/4XUjT19ECh20zKV0R0ZCT1',
    tracks: ['Run', 'Butterfly', 'Autumn Leaves'],
  },
  {
    id: 'london-calling',
    artist: 'The Clash',
    image: '/images/about/favorites/music/clash.jpg',
    link: 'https://en.wikipedia.org/wiki/London_Calling',
    tracks: ['London Calling', 'Train in Vain', 'Lost in the Supermarket'],
    thought: 'Punk with room to breathe — still sounds urgent.',
  },
  {
    id: 'stop-making-sense',
    artist: 'Talking Heads',
    image: '/images/about/favorites/music/sms.jpg',
    link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
    tracks: ['Heaven', 'This Must Be the Place', 'Genius of Love'],
    thought: 'please let me watch this in a theatre before i die',
  },
  {
    id: 'graceland',
    artist: 'Paul Simon',
    image: '/images/about/favorites/music/graceland.jpg',
    link: 'https://open.spotify.com/album/6WgGWYw6XXQyLTsWt7tXky',
    tracks: ['Diamonds on the Soles of Her Shoes'],
    thought: 'A PERFECT ALBUM',
  },
  {
    id: 'your-name',
    artist: 'RADWIMPS',
    image: '/images/about/favorites/music/yn.jpg',
    link: 'https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP',
    tracks: ['no skips'],
  },
  {
    id: 'the-bends',
    artist: 'Radiohead',
    image: '/images/albums/the-bends.jpg',
    link: 'https://open.spotify.com/album/641E4wTo4033NjhsWlgrAc',

  },
  {
    id: 'ok-computer',
    artist: 'Radiohead',
    image: '/images/albums/ok-computer.jpg',
    link: 'https://open.spotify.com/album/6dVIqQRBqpZIbA1s2Km3Rj',
  },
  {
    id: 'in-rainbows',
    artist: 'Radiohead',
    image: '/images/albums/in-rainbows.jpg',
    link: 'https://open.spotify.com/album/5vkqprenCBwEekWpPIdRYQ',

  },
  {
    id: 'first-band-on-moon',
    artist: 'The Cardigans',
    image: '/images/albums/first-band-on-moon.jpg',
    link: 'https://open.spotify.com/album/0YI7QPNUGq8NTB6Nd8nWfd',
    tracks: ['Lovefool', 'Your New Cuckoo'],
    
  },
  {
    id: 'sour',
    artist: 'Olivia Rodrigo',
    image: '/images/albums/sour.jpg',
    link: 'https://open.spotify.com/album/6s84UzGEzBDJ0uFddkl5M9',
    tracks: ['favorite crime', 'good 4 u'],
    thought: 'special',
  },
  {
    id: 'guts',
    artist: 'Olivia Rodrigo',
    image: '/images/albums/guts.jpg',
    link: 'https://open.spotify.com/album/4Z5fXuoMdB2cv30qJZI7m',
    tracks: ['love is embarrassing', 'vampire'],
    thought: 'i am the girl i\'ve always been',
  },
  {
    id: 'on-the-corner',
    artist: 'Miles Davis',
    image: '/images/albums/on-the-corner.jpg',
    link: 'https://open.spotify.com/album/4K7w2LiKZz0CyHXl6OtkOu',
 

  },
  {
    id: 'disintegration',
    artist: 'The Cure',
    image: '/images/albums/disintegration.jpg',
    link: 'https://open.spotify.com/album/0L5FVlA7lYy5Fc0RP18oMj',
    tracks: ['Untitled, Lullaby'],
  },
  {
    id: 'lets-dance',
    artist: 'David Bowie',
    image: '/images/albums/lets-dance.jpg',
    link: 'https://open.spotify.com/album/2yIwhWAH9M3r9ZQ0S7w0VI',
    tracks: [ 'China Girl'],
    
  },
  {
    id: 'pogues-grace',
    artist: 'The Pogues',
    image: '/images/albums/pogues-grace.jpg',
    link: 'https://open.spotify.com/album/4V92Puney9WxGPecKtLG4L',
    tracks: ['Fairytale of New York',  'The Broad Majestic Shannon'],
    thought: 'Irish folk-punk Christmas — accordion and chaos.',
  },
  {
    id: 'my-love-is-cool',
    artist: 'Wolf Alice',
    image: '/images/albums/my-love-is-cool.jpg',
    link: 'https://open.spotify.com/album/0k5PHXVakV1aq3UmacxELa',
    tracks: ['Bros', 'The Wonderwhy'],
    
  },
  {
    id: 'pang',
    artist: 'Caroline Polachek',
    image: '/images/albums/pang.jpg',
    link: 'https://open.spotify.com/album/4ClyeVlAKJJViIyfVW0yQD',
    tracks: [ "So Hot You're Hurting My Feelings", 'Pang'],
  
  },
  {
    id: 'desire',
    artist: 'Caroline Polachek',
    image: '/images/albums/desire.jpg',
    link: 'https://open.spotify.com/album/22PkV1Le9P3X4RY4xtmK0q',
    tracks: ['Desire, I want to turn into you', 'Sunset'],
    
  },
  {
    id: 'melodrama',
    artist: 'Lorde',
    image: '/images/albums/melodrama.jpg',
    link: 'https://open.spotify.com/album/1EWpZzB4gOjw0vqsxU8fgl',
    tracks: ['Green Light', 'The Louvre', 'Perfect Places']
    
  },
  {
    id: 'cranberries',
    artist: 'The Cranberries',
    image: '/images/albums/cranberries.jpg',
    link: 'https://open.spotify.com/album/0AP5O47kJWlaKVnnybKvQI',
    tracks: ['Linger', 'Dreams', 'Sunday'],
 
  },
  {
    id: 'tapestry',
    artist: 'Carole King',
    image: '/images/albums/tapestry.jpg',
    link: 'https://open.spotify.com/album/12n11cgnpjXKLeqrnIERoS',
    tracks: ["It's Too Late", "You've Got a Friend"],

  },
  {
    id: 'remain-in-light',
    artist: 'Talking Heads',
    image: '/images/albums/remain-in-light.jpg',
    link: 'https://open.spotify.com/album/1JvXxLsm0PxlGH4LXzqMGq',
    tracks: ['Once in a Lifetime', 'Crosseyed and Painless', 'The Great Curve'],
    
  },
  {
    id: 'speaking-in-tongues',
    artist: 'Talking Heads',
    image: '/images/albums/speaking-in-tongues.jpg',
    link: 'https://open.spotify.com/album/78MM8HrabEGPLVWaJkM2t1',
    tracks: ['Burning Down the House', 'This Must Be the Place', 'Swamp'],
    thought: 'bought the disc in Vienna'
  },
  {
    id: 'bol4-red-diary',
    artist: 'BOL4',
    image: '/images/albums/bol4-red-diary.jpg',
    link: 'https://open.spotify.com/album/0d3mf5fBaIBbozCgeEI9AE',
    tracks: ['Some'],

  },
  {
    id: 'bts-tear',
    artist: 'BTS',
    image: '/images/albums/bts-tear.jpg',
    link: 'https://open.spotify.com/album/4NIqCxqP9o8Tp6tGLBqd8O',
    tracks: ['Magic Shop', 'Love Maze', '134340'],
    
  },
  {
    id: 'name-of-love',
    artist: 'cinema staff',
    image: '/images/albums/name-of-love.jpg',
    link: 'https://open.spotify.com/album/1ISP5p4p9DKnw7LUIpoSjA',
    
  },
  {
    id: 'ningen-kaika',
    artist: 'RADWIMPS',
    image: '/images/albums/ningen-kaika.jpg',
    link: 'https://open.spotify.com/album/5TZ0bVy0tqIriXse4qk1HY',

    thought: 'underrated',
  },
]

function sortAlbumsByArtist(albums) {
  const top = PRIORITY_TOP.map((id) => albums.find((album) => album.id === id)).filter(Boolean)
  const rest = albums
    .filter((album) => !PRIORITY_TOP.includes(album.id))
    .sort((a, b) => a.artist.localeCompare(b.artist, undefined, { sensitivity: 'base' }))
  return [...top, ...rest]
}

function VinylAlbum({ album, isOpen, onToggle }) {
  const tracks = album.tracks ?? []
  const thought = album.thought ?? ''

  const handleClick = useCallback(() => {
    const touchPrimary =
      typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

    if (touchPrimary) {
      if (isOpen) {
        if (album.link) {
          window.open(album.link, '_blank', 'noopener,noreferrer')
        }
        onToggle(null)
        return
      }
      onToggle(album.id)
      return
    }

    if (album.link) {
      window.open(album.link, '_blank', 'noopener,noreferrer')
    }
  }, [album, isOpen, onToggle])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <li className="album-gallery-item">
      <button
        type="button"
        className={`album-gallery-vinyl${isOpen ? ' album-gallery-vinyl--open' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={
          tracks.length > 0
            ? thought
              ? `${tracks.join(', ')}. ${thought}`
              : tracks.join(', ')
            : thought || album.artist
        }
      >
        <div className="album-gallery-disc-wrap" aria-hidden="true">
          <div className="album-gallery-disc">
            {GROOVE_RATIOS.map((r) => (
              <span
                key={r}
                className="album-gallery-groove"
                style={{ width: `${r * 100}%`, height: `${r * 100}%` }}
              />
            ))}
            <span
              className="album-gallery-label-hole"
              style={{ width: '30%', height: '30%' }}
            />
          </div>
        </div>

        <div className="album-gallery-sleeve">
          <Image
            src={album.image}
            alt=""
            className="album-gallery-sleeve-img"
            width={400}
            height={400}
            sizes="(max-width: 539px) 45vw, (max-width: 899px) 30vw, 20vw"
            style={{
              objectPosition: album.coverPosition ?? 'center',
              transform: album.coverScale ? `scale(${album.coverScale})` : undefined,
            }}
          />
        </div>

        <div className="album-gallery-overlay">
          {tracks.length > 0 ? (
            <>
              <p className="album-gallery-tracks-label">top tracks</p>
              <ol className="album-gallery-tracks">
                {tracks.map((track) => (
                  <li key={track} className="album-gallery-track">
                    {track}
                  </li>
                ))}
              </ol>
            </>
          ) : null}
          {thought ? <p className="album-gallery-thought">{thought}</p> : null}
        </div>
      </button>
    </li>
  )
}

export default function AlbumGallery() {
  const [openId, setOpenId] = useState(null)

  const albums = useMemo(() => sortAlbumsByArtist(ALBUMS), [])

  const onToggle = useCallback((id) => {
    setOpenId(id)
  }, [])

  return (
    <div className="album-gallery-page min-h-screen">
      <Navbar />

      <main className="album-gallery-main">
        <header className="album-gallery-header">
          <h1 className="album-gallery-title">record shelf</h1>
          
        </header>

        <ul className="album-gallery-grid">
          {albums.map((album) => (
            <VinylAlbum
              key={album.id}
              album={album}
              isOpen={openId === album.id}
              onToggle={onToggle}
            />
          ))}
        </ul>

        <p className="album-gallery-footer">
          hover for tracks · tap twice on mobile to open Spotify
        </p>
      </main>
    </div>
  )
}
