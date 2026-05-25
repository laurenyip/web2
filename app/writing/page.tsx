import type { Metadata } from 'next'

import Writing from '../../src/pages/Writing'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'A collection of essays, notes, and reflections by Lauren Yip on design, life, and building with intention.',
  path: '/writing',
  image: '/images/home/paris_wip.png',
})

export default function Page() {
  return <Writing />
}
