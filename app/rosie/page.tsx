import type { Metadata } from 'next'

import Rosie from '../../src/pages/portfolio/Rosie'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description: 'React to This! case study — in progress.',
  path: '/rosie',
  image: '/images/projects/rosie/rosie_t.png',
})

export default function Page() {
  return <Rosie />
}
