import type { Metadata } from 'next'

import Starmap from '../../src/pages/portfolio/Starmap'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Starmap Case Study | Lauren Yip',
  description:
    'Case study: Starmap, a relationship map tool for tracking people, context, and meaningful follow-through over time.',
  path: '/starmap',
  image: '/images/projects/starmap/starmap_t.png',
})

export default function Page() {
  return <Starmap />
}
