import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import ImageProtection from '../src/components/ImageProtection'
import IntroLoader from '../src/components/IntroLoader'
import SiteFooter from '../src/components/SiteFooter'
import SiteCursor from '../components/site-cursor'
import { PostHogProvider } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: "lauren yip's website",
  description: "Lauren Yip's personal website",
  metadataBase: new URL('https://laurenyip.com'),
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
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
    <html lang="en" className="intro-lock">
      <body>
        <div id="intro-loader" className="intro-loader" aria-hidden="true">
          <canvas className="intro-loader__sky" aria-hidden="true" />
          <div className="intro-loader__scene">
            <img
              className="intro-loader__gif"
              src="/images/intro-appa.gif"
              alt=""
              width={498}
              height={284}
            />
            <div className="intro-loader__moon-orbit">
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path
                    id="intro-orbit-path"
                    d="M 100,100 m 0,-102 a 102,102 0 1,1 0,204 a 102,102 0 1,1 0,-204"
                  />
                </defs>
                <text className="intro-loader__orbit-text">
                  <textPath href="#intro-orbit-path">loading...</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
        <noscript>
          <style>{`#intro-loader{display:none!important}html.intro-lock,html.intro-lock body{overflow:auto!important}`}</style>
        </noscript>
        <PostHogProvider>
          <IntroLoader />
          <ImageProtection />
          <SiteCursor />
          {children}
          <SiteFooter />
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "1c506b985d154649921fb0fb18d0cc34"}'
            strategy="afterInteractive"
          />
        </PostHogProvider>
      </body>
    </html>
  )
}
