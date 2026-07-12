import type { Metadata } from 'next'

import Work from '../src/pages/Work'
import { buildPageMetadata } from './metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'Selected product design work by Lauren Yip — case studies, experiments, and creative projects.',
  path: '/',
  image: '/images/home/og-preview.png',
})

export default function Page() {
  return <Work />
}
