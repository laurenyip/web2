import type { Metadata } from 'next'

import Aurora from '../../src/pages/portfolio/Aurora'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Aurora Case Study | Lauren Yip',
  description:
    'Case study: Aurora Pet Co., an ecommerce and product experience designed for pet health and nutrition workflows.',
  path: '/aurora',
  image: '/images/projects/aurora/aurora_t.png',
})

export default function Page() {
  return <Aurora />
}
