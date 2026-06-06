import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import ImageProtection from '../src/components/ImageProtection'
import SiteFooter from '../src/components/SiteFooter'
import './globals.css'

export const metadata: Metadata = {
  title: "lauren yip's website",
  description: "Lauren Yip's personal website",
  metadataBase: new URL('https://laurenyip.com'),
  icons: {
    icon: '/images/favicon/favicon.ico',
    apple: '/images/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ImageProtection />
        {children}
        <SiteFooter />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "1c506b985d154649921fb0fb18d0cc34"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
