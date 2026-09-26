import type { Metadata } from 'next'

import ContentSystems from '../../src/pages/portfolio/ContentSystems'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    description: 'Content systems case studies — information architecture, editorial models, and content design.',
    path: '/content-systems',
  }),
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function Page() {
  return <ContentSystems />
}
