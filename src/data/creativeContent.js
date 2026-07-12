/** Shared creative content for Playground (and formerly About). */

export const ART_CAROUSEL = [
  { src: '/images/about/art/january.png', caption: 'january [2025-01]' },
  { src: '/images/about/art/lily.png', caption: 'dedicated to my friends [2021-08]' },
  { src: '/images/about/art/ecola.png', caption: 'ecola beach [2025-04]' },
  { src: '/images/about/art/dance.png', caption: 'high school dance [2021-01]' },
  { src: '/images/about/art/blue.png', caption: 'blue hydrangeas [2021-07]' },
  { src: '/images/about/art/pool.png', caption: 'belcarra tidepools [2022-02]' },
  { src: '/images/about/art/bridge.png', caption: 'the bridge [2023-09]' },
  { src: '/images/about/art/paris-aux.png', caption: 'aux artistes, paris' },
]

export const WRITING_LINKS = [
  { label: 'aftersun (2025)', href: 'https://laurenyip.substack.com/p/aftersun-2025' },
  { label: '花樣年華', href: 'https://substack.com/home/post/p-181468973' },
  { label: 'mercurial world', href: 'https://laurenyip.substack.com/p/mercurial-world' },
  {
    label: 'the best air mattress in the world',
    href: 'https://laurenyip.substack.com/p/the-best-air-mattress-in-the-world',
  },
  { label: 'drafts', href: null },
]

export const DIARY_FRAMES = {
  closed: '/images/playground/diary/diary1.png',
  open: '/images/playground/diary/diary2.png',
  closing: '/images/playground/diary/diary3.png',
  sealed: '/images/playground/diary/diary4.png',
}

/** Text shown on the open diary page — edit in creativeContent.js */
export const DIARY_PAGE_TEXT = 'Coming soon.'

export const GUITAR_PLAYLIST_HREF =
  'https://open.spotify.com/playlist/0WIqD4cIXnOUK2rdUYfYF6?si=595b4b0082264bb7'

export const GUITAR_IMAGE = '/images/playground/guitar.png'

export const MUSIC_ITEMS = [
  {
    type: 'music',
    text: 'you seem pretty sad for a girl so in love',
    date: '2026-06-12',
    image: '/images/about/favorites/music/olivia-yspasfgial.jpg',
    link: 'https://open.spotify.com/album/18qJgKH8dyYe2RRp6TbnNY',
    songs: [],
  },
  {
    type: 'music',
    text: 'Stop Making Sense',
    date: '2025-08-04',
    image: '/images/about/favorites/music/sms.jpg',
    link: 'https://letterboxd.com/laurenyip/film/stop-making-sense/',
    songs: [],
  },
  {
    type: 'music',
    text: 'Graceland',
    date: '2025-12-26',
    image: '/images/about/favorites/music/graceland.jpg',
    link: 'https://open.spotify.com/album/6WgGWYw6XXQyLTsWt7tXky',
    songs: [],
  },
  {
    type: 'music',
    text: '君の名は',
    date: '2025-12-27',
    image: '/images/about/favorites/music/yn.jpg',
    link: 'https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP',
    songs: [],
  },
]

export const SIDEQUEST_GRID_ITEMS = [
  { src: '/images/about/sidequests/cz.jpg', caption: '潮州 stone portal' },
  { src: '/images/about/sidequests/datong.jpg', caption: '大同 after rain' },
  { src: '/images/about/sidequests/gzapt.jpg', caption: '廣州' },
  { src: '/images/about/sidequests/gzbike.jpg', caption: '廣州' },
  { src: '/images/about/sidequests/gzcat.jpg', caption: '廣州' },
  { src: '/images/about/sidequests/gzfish.jpg', caption: '锦鲤' },
  { src: '/images/about/sidequests/gztree.png', caption: '廣州' },
  { src: '/images/about/sidequests/hike.jpg', caption: 'best hike ever' },
  { src: '/images/about/sidequests/ipoh.jpg', caption: '怡保', objectPosition: 'center 42%' },
  { src: '/images/about/sidequests/kaya.jpg', caption: 'kaya puff shophouse' },
  { src: '/images/home/love-you.png', caption: 'Love you' },
  { src: '/images/home/lion.png', caption: 'Lion dance' },
]

export const IMG_TILE_CLASS =
  'block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-gray-200/80 bg-white p-0 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
