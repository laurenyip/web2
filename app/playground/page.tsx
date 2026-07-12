import type { Metadata } from 'next'

import Playground from '../../src/pages/Playground'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description: 'Art, writing, photos, and sidequests — Lauren Yip’s playground.',
  path: '/playground',
})

export default function Page() {
  return <Playground />
}
