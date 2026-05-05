import type { Metadata } from 'next'

import Home from '../src/pages/Home'
import { buildPageMetadata } from './metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Lauren Yip | Product Designer and Builder',
  description:
    'Lauren Yip is a product designer and computer science student sharing projects, portfolio case studies, writing, and creative work.',
  path: '/',
  image: '/images/home/portrait.png',
})

export default function Page() {
  return <Home />
}
