import type { Metadata } from 'next'

import Projects from '../../src/pages/Projects'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Projects | Lauren Yip',
  description:
    'Explore Lauren Yip\'s product, engineering, and community projects across AI, web, editorial, and research work.',
  path: '/projects',
  image: '/images/projects/lyre-poster-flux.png',
})

export default function Page() {
  return <Projects />
}
