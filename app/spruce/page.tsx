import type { Metadata } from 'next'

import Spruce from '../../src/pages/portfolio/Spruce'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Spruce Case Study | Lauren Yip',
  description:
    'Case study: Spruce, a platform that helps families discover low-cost offline activities with less friction.',
  path: '/spruce',
  image: '/images/projects/spruce/spruce_t.png',
})

export default function Page() {
  return <Spruce />
}
