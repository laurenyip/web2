import type { Metadata } from 'next'

const SITE_URL = 'https://laurenyip.com'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  image?: string
}

export function buildPageMetadata({ title, description, path, image = '/images/home/portrait.png' }: PageMetadataInput): Metadata {
  const absoluteUrl = `${SITE_URL}${path}`
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
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
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
  }
}
