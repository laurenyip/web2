import type { Metadata } from 'next'

import Art from '../../src/pages/Art'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description: 'Original paintings and artwork by Lauren Yip.',
  path: '/art',
  image: '/images/about/art/january.jpg',
})

export default function Page() {
  return <Art />
}
