import type { Metadata } from 'next'

import Playground from '../../src/pages/Playground'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description: 'Experiments and side projects by Lauren Yip.',
  path: '/playground',
})

export default function Page() {
  return <Playground />
}
