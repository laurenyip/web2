import type { Metadata } from 'next'

import Rosie from '../../src/pages/portfolio/Rosie'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'React to This! Case Study | Lauren Yip',
  description:
    'Case study: React to This!, a research-focused web experience exploring emotional and behavioral dataset interactions.',
  path: '/rosie',
  image: '/images/projects/rosie/rosie_t.png',
})

export default function Page() {
  return <Rosie />
}
