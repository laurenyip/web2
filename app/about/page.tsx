import type { Metadata } from 'next'

import About from '../../src/pages/About'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'Learn more about Lauren Yip: design background, art, writing, favorite work, and side quests beyond product design.',
  path: '/about',
  image: '/images/about/whoami/optimist.png',
})

export default function Page() {
  return <About />
}
