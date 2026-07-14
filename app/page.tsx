import type { Metadata } from 'next'

import Work from '../src/pages/Work'
import { buildPageMetadata } from './metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'how did you get here? let me show you my website!',
  path: '/',
  image: '/images/home/og-preview.png',
})

export default function Page() {
  return <Work />
}
