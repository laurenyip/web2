import type { Metadata } from 'next'

const SITE_URL = 'https://laurenyip.com'

export const SITE_TITLE = "lauren yip's website"

type PageMetadataInput = {
  description: string
  path: string
  image?: string
}

export function buildPageMetadata({ description, path, image = '/images/home/portrait.png' }: PageMetadataInput): Metadata {
  const absoluteUrl = `${SITE_URL}${path}`
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title: SITE_TITLE,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title: SITE_TITLE,
      description,
      url: absoluteUrl,
      siteName: 'Lauren Yip',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: SITE_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description,
      images: [absoluteImage],
    },
  }
}
