import type { Metadata } from 'next'

import Portfolio from '../../src/pages/Portfolio'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'Read portfolio case studies by Lauren Yip, including product design process, user research, and interface decisions.',
  path: '/portfolio',
  image: '/images/projects/starmap/starmap_t.png',
})

export default function Page() {
  return <Portfolio />
}
