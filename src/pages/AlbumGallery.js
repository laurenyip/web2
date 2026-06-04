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
    id: 'bts-hyyh-pt2',
    artist: 'BTS',
    image: '/images/albums/bts-hyyh-pt2.jpg',
    link: 'https://open.spotify.com/album/4XUjT19ECh20zKV0R0ZCT1',
    tracks: ['Run', 'Butterfly', 'Burning Up'],
    thought: 'Butterflies and 花樣年華 — when everything felt possible.',
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
    tracks: ['Fake Plastic Trees', 'High and Dry', 'Street Spirit'],
    thought: 'Britpop angst before OK Computer changed everything.',
  },
  {
    id: 'ok-computer',
    artist: 'Radiohead',
    image: '/images/albums/ok-computer.jpg',
    link: 'https://open.spotify.com/album/6dVIqQRBqpZIbA1s2Km3Rj',
    tracks: ['Paranoid Android', 'Karma Police', 'No Surprises'],
    thought: 'Technology and alienation — still eerily current.',
  },
  {
    id: 'in-rainbows',
    artist: 'Radiohead',
    image: '/images/albums/in-rainbows.jpg',
    link: 'https://open.spotify.com/album/5vkqprenCBwEekWpPIdRYQ',
    tracks: ['15 Step', 'Weird Fishes', 'All I Need'],
    thought: 'Rainy-window warmth. Pay-what-you-want changed the industry.',
  },
  {
    id: 'first-band-on-moon',
    artist: 'The Cardigans',
    image: '/images/albums/first-band-on-moon.jpg',
    link: 'https://open.spotify.com/album/0YI7QPNUGq8NTB6Nd8nWfd',
    tracks: ['Lovefool', 'Your New Cuckoo'],
    thought: '90s pop perfection — grainy cover, sparkly hooks.',
  },
  {
    id: 'sour',
    artist: 'Olivia Rodrigo',
    image: '/images/albums/sour.jpg',
    link: 'https://open.spotify.com/album/6s84UzGEzBDJ0uFddkl5M9',
    tracks: ['drivers license', 'deja vu', 'good 4 u'],
    thought: 'Sticker-covered heartbreak — loud and honest.',
  },
  {
    id: 'guts',
    artist: 'Olivia Rodrigo',
    image: '/images/albums/guts.jpg',
    link: 'https://open.spotify.com/album/4Z5fXuoMdB2cv30qJZI7m',
    tracks: ['vampire', 'bad idea right?', 'get him back!'],
    thought: 'Purple mood, sharper edges — the rings say it all.',
  },
  {
    id: 'on-the-corner',
    artist: 'Miles Davis',
    image: '/images/albums/on-the-corner.jpg',
    link: 'https://open.spotify.com/album/4K7w2LiKZz0CyHXl6OtkOu',
    tracks: ['On the Corner', 'New York Girl', 'Helen Butte'],
    thought: 'Funk collage on yellow — Miles at his most playful.',
  },
  {
    id: 'disintegration',
    artist: 'The Cure',
    image: '/images/albums/disintegration.jpg',
    link: 'https://open.spotify.com/album/0L5FVlA7lYy5Fc0RP18oMj',
    tracks: ['Pictures of You', 'Lovesong', 'Lullaby'],
    thought: 'Gothic bloom in the dark — flowers and reverb forever.',
  },
  {
    id: 'lets-dance',
    artist: 'David Bowie',
    image: '/images/albums/lets-dance.jpg',
    link: 'https://open.spotify.com/album/2yIwhWAH9M3r9ZQ0S7w0VI',
    tracks: ["Let's Dance", 'China Girl', 'Modern Love'],
    thought: 'Red circles and boxing gloves — Bowie goes dance-floor.',
  },
  {
    id: 'pogues-grace',
    artist: 'The Pogues',
    image: '/images/albums/pogues-grace.jpg',
    link: 'https://open.spotify.com/album/4V92Puney9WxGPecKtLG4L',
    tracks: ['Fairytale of New York', 'If I Should Fall from Grace with God', 'The Broad Majestic Shannon'],
    thought: 'Irish folk-punk Christmas — accordion and chaos.',
  },
  {
    id: 'my-love-is-cool',
    artist: 'Wolf Alice',
    image: '/images/albums/my-love-is-cool.jpg',
    link: 'https://open.spotify.com/album/0k5PHXVakV1aq3UmacxELa',
    tracks: ['Bros', 'Your Loves Whore', 'Silk'],
    thought: 'Golden sparks in the dark — ethereal and loud.',
  },
  {
    id: 'pang',
    artist: 'Caroline Polachek',
    image: '/images/albums/pang.jpg',
    link: 'https://open.spotify.com/album/4ClyeVlAKJJViIyfVW0yQD',
    tracks: ['Door', "So Hot You're Hurting My Feelings", 'Oceanbt'],
    thought: 'Climbing toward the break in the clouds.',
  },
  {
    id: 'desire',
    artist: 'Caroline Polachek',
    image: '/images/albums/desire.jpg',
    link: 'https://open.spotify.com/album/22PkV1Le9P3X4RY4xtmK0q',
    tracks: ['Bunny Is a Rider', 'Hit Me Where It Hurts', 'Caroline'],
    thought: 'Sand on the subway floor — surreal, kinetic, impossible to look away.',
  },
  {
    id: 'melodrama',
    artist: 'Lorde',
    image: '/images/albums/melodrama.jpg',
    link: 'https://open.spotify.com/album/1EWpZzB4gOjw0vqsxU8fgl',
    tracks: ['Green Light', 'Liability', 'Perfect Places'],
    thought: 'Painted bedroom blues — every party after the party.',
  },
  {
    id: 'cranberries',
    artist: 'The Cranberries',
    image: '/images/albums/cranberries.jpg',
    link: 'https://open.spotify.com/album/0AP5O47kJWlaKVnnybKvQI',
    tracks: ['Linger', 'Dreams', 'Sunday'],
    thought: 'Film-strip couch portrait — gentle and huge.',
  },
  {
    id: 'tapestry',
    artist: 'Carole King',
    image: '/images/albums/tapestry.jpg',
    link: 'https://open.spotify.com/album/12n11cgnpjXKLeqrnIERoS',
    tracks: ["(You Make Me Feel Like) A Natural Woman", "It's Too Late", "You've Got a Friend"],
    thought: 'Window light and a cat — singer-songwriter heaven.',
  },
  {
    id: 'remain-in-light',
    artist: 'Talking Heads',
    image: '/images/albums/remain-in-light.jpg',
    link: 'https://open.spotify.com/album/1JvXxLsm0PxlGH4LXzqMGq',
    tracks: ['Once in a Lifetime', 'Crosseyed and Painless', 'The Great Curve'],
    thought: 'Red-mask grid — post-punk that still feels futuristic.',
  },
  {
    id: 'speaking-in-tongues',
    artist: 'Talking Heads',
    image: '/images/albums/speaking-in-tongues.jpg',
    link: 'https://open.spotify.com/album/78MM8HrabEGPLVWaJkM2t1',
    tracks: ['Burning Down the House', 'This Must Be the Place', 'Swamp'],
    thought: 'Folk-art borders and a blue spiral — joy in geometry.',
  },
  {
    id: 'bol4-red-diary',
    artist: 'BOL4',
    image: '/images/albums/bol4-red-diary.jpg',
    link: 'https://open.spotify.com/album/0d3mf5fBaIBbozCgeEI9AE',
    tracks: ['Some', 'To My Youth', 'Blue'],
    thought: 'Twin dresses, red ribbon — K-indie diary page one.',
  },
  {
    id: 'bts-tear',
    artist: 'BTS',
    image: '/images/albums/bts-tear.jpg',
    link: 'https://open.spotify.com/album/4NIqCxqP9o8Tp6tGLBqd8O',
    tracks: ['Fake Love', 'The Truth Untold', '134340'],
    thought: 'Minimal 轉 on navy — elegant heartbreak.',
  },
  {
    id: 'name-of-love',
    artist: 'cinema staff',
    image: '/images/albums/name-of-love.jpg',
    link: 'https://open.spotify.com/album/1ISP5p4p9DKnw7LUIpoSjA',
    tracks: ['Name of Love', 'OCEAN', 'great escape'],
    thought: 'Monochrome portrait, bold type — the AOT ending that wrecked me.',
  },
  {
    id: 'ningen-kaika',
    artist: 'RADWIMPS',
    image: '/images/albums/ningen-kaika.jpg',
    link: 'https://open.spotify.com/album/5TZ0bVy0tqIriXse4qk1HY',
    tracks: ['光', '前前前世', 'スパークル'],
    thought: 'Tongue out, freckles, 人間開花 — playful and unfiltered.',
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
        aria-label={`${album.tracks.join(', ')}. ${album.thought}`}
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
          <p className="album-gallery-tracks-label">top tracks</p>
          <ol className="album-gallery-tracks">
            {album.tracks.map((track) => (
              <li key={track} className="album-gallery-track">
                {track}
              </li>
            ))}
          </ol>
          <p className="album-gallery-thought">{album.thought}</p>
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
          <p className="album-gallery-lede">
            Albums on rotation — hover for top tracks and a note on why they stay.
          </p>
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
