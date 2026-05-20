import type { Metadata } from 'next'

import Aurora from '../../src/pages/portfolio/Aurora'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Aurora Case Study | Lauren Yip',
  description: 'Aurora Pet Co. case study — in progress.',
  path: '/aurora',
  image: '/images/projects/aurora/aurora_t.png',
})

export default function Page() {
  return <Aurora />
}
