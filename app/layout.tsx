import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import ImageProtection from '../src/components/ImageProtection'
import SiteFooter from '../src/components/SiteFooter'
import SiteCursor from '../components/site-cursor'
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
    <html lang="en">
      <body>
        <ImageProtection />
        <SiteCursor />
        {children}
        <SiteFooter />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "1c506b985d154649921fb0fb18d0cc34"}'
          strategy="afterInteractive"
        />
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            !(function (t, e) {
              var o, n, p, r;
              e.__SV ||
                ((window.posthog = e),
                (e._i = []),
                (e.init = function (i, s, a) {
                  function g(t, e) {
                    var o = e.split(".");
                    2 == o.length && ((t = t[o[0]]), (e = o[1])),
                      (t[e] = function () {
                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                      });
                  }
                  ((p = t.createElement("script")).type = "text/javascript"),
                    (p.crossOrigin = "anonymous"),
                    (p.async = !0),
                    (p.src =
                      s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
                      "/static/array.js"),
                    (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
                  var u = e;
                  for (
                    void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
                      u.people = u.people || [],
                      u.toString = function (t) {
                        var e = "posthog";
                        return (
                          "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e
                        );
                      },
                      u.people.toString = function () {
                        return u.toString(1) + ".people (stub)";
                      },
                      o =
                        "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
                          " "
                        ),
                      n = 0;
                    n < o.length;
                    n++
                  )
                    g(u, o[n]);
                  e._i.push([i, s, a]);
                }),
                (e.__SV = 1));
            })(document, window.posthog || []);
            posthog.init("phc_pY6v6bkxGNBQPQzsRu2skKrdbDNgt7hEcUuCEDmiRXQF", {
              api_host: "https://us.i.posthog.com",
              defaults: "2026-05-30",
            });
          `}
        </Script>
      </body>
    </html>
  )
}
