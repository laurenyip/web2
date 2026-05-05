import type { Metadata } from 'next'

import ReadingList from '../../src/pages/ReadingList'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Reading List | Lauren Yip',
  description:
    'Books and essays Lauren Yip recommends, spanning storytelling, philosophy, design, and culture.',
  path: '/reading-list',
  image: '/images/about/current/power-broker-cover.png',
})

export default function Page() {
  return <ReadingList />
}
