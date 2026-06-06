import type { Metadata } from 'next'

import Rights from '../../src/pages/Rights'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  description:
    'Licensing and usage guidelines for artwork and photography on Lauren Yip’s personal website.',
  path: '/rights',
})

export default function Page() {
  return <Rights />
}
