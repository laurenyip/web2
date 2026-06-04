import type { Metadata } from 'next'

import AlbumGallery from '../../src/pages/AlbumGallery'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'A vinyl-style gallery of albums Lauren Yip loves — hover for top tracks and notes on each record.',
  path: '/albums',
  image: '/images/albums/in-rainbows.jpg',
})

export default function Page() {
  return <AlbumGallery />
}
