'use client'

import { useEffect, useState } from 'react'

/**
 * Dev-only stress data (see WorstCaseToggle). Add ?data=worst, ?data=empty or ?data=one to /, /albums or /reading-list.
 * Keep this after fixes: it's the regression test for the next layout change.
 */
export function useDataset(sets) {
  const [name, setName] = useState('demo')
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    setName(new URLSearchParams(window.location.search).get('data') || 'demo')
  }, [])
  return sets[name] ?? sets.demo
}

export const WORST_BOOKS = [
  {
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde and Other Tales of Terror: Annotated Edition with Notes, Commentary, and a Complete Chronology',
    author: 'Aleksandra Wiśniewska-Kowalczyk and Bartholomew Fitzgerald (translators)',
  },
  { title: 'S.', author: 'Jo' },
  { title: 'Donaudampfschifffahrtsgesellschaftskapitänsmütze', author: '' },
  { title: '台灣漫遊錄', author: '楊双子' },
  { title: 'Truyện Kiều', author: 'Nguyễn Du' },
]

export const WORST_ESSAYS = [
  {
    text: 'What the Long Arc of Institutional Trust Tells Us About Why Nobody Answers Their Phone Anymore, and What Happens Next for the Rest of Us',
    author: 'Aleksandra Wiśniewska-Kowalczyk',
    link: 'https://example.com/a',
    date: '2026-04-20',
  },
  {
    text: 'https://open.substack.com/pub/robertwoo/p/whats-the-winning-strategy-in-chinas-low-trust-society-and-why',
    author: 'Jo',
    link: 'https://example.com/b',
    date: '2025-08-25',
  },
  { text: 'No date on this one', author: '', link: 'https://example.com/c', date: '' },
]

export const WORST_ALBUMS = [
  {
    id: 'worst-long',
    artist: 'Godspeed You! Black Emperor and the Thee Silver Mt. Zion Memorial Orchestra',
    image: '/images/albums/52nd-street.jpg',
    link: 'https://example.com',
    tracks: [
      'Lift Your Skinny Fists Like Antennas to Heaven (Remastered 2021 Extended Version)',
      'Sleep (Including Monheim, Broken Windows, Locks and Hinges)',
      'She Dreamt She Was a Bulldozer, She Dreamt She Was Alone in an Empty Field',
      "Static (Including Chart #3, Dress Rehearsal, Rockets Fall on Rocket Falls)",
      'Like Antennas to Heaven',
      'Moya',
    ],
    thought: 'bought on a rainy weekend in Vienna from a shop that only opened on Thursdays, then lost the sleeve on the way home and kept the disc in a sock for two years',
  },
  { id: 'worst-no-tracks', artist: 'A', image: '/images/albums/naked.jpg', link: 'https://example.com', tracks: [] },
  { id: 'worst-no-link', artist: '소녀시대', image: '/images/albums/sour.jpg', tracks: ['다시 만난 세계'] },
  { id: 'worst-missing-art', artist: 'Sigur Rós', image: '/images/albums/does-not-exist.jpg', link: 'https://example.com', tracks: ['Hoppípolla'] },
]

const LONG_DESCRIPTION =
  'A cross-platform accessibility toolkit helping community organisations across British Columbia translate their services into plain language, Cantonese, Punjabi, Tagalog and American Sign Language, co-designed over eighteen months with volunteers.'

/** Every other card gets the long copy and five tags; the rest lose their description and tags. */
export function worstProject(project) {
  if (project.id.length % 2 === 0) {
    return {
      ...project,
      title: `${project.title}: A Community-Led Accessibility Initiative`,
      description: LONG_DESCRIPTION,
      tags: ['Interaction Design', 'Information Architecture', 'Accessibility Research', 'Service Design', 'Data Viz'],
    }
  }
  return { ...project, description: '', tags: [] }
}
