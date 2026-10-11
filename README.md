# laurenyip.com

Next.js 14 portfolio (static export). Routes live in `app/`; the page UI lives in `src/`.

```
app/                      routes (page.tsx / layout.tsx), metadata, globals.css
src/
  pages/                  page-level screens used by the routes (Work, About, Playground, ...)
  components/
    case-studies/         one file per case study, plus the modals that open them
      shared/             primitives and styles shared by all case studies
    thumbnails/           the animated project-card thumbnails
    layout/               navbar, footer, webring, scroll helpers, intro loader
    ui/                   reusable pieces (book viewer, image modal, tags, project card, ...)
    effects/              site cursor and fortune cookie
  data/                   project list, case-study copy, creative content
  assets/                 fonts and images imported from CSS
  hooks/  lib/            small helpers
public/                   served as-is: images/, fonts/, thumbnails/, redirects
scripts/
  build/                  post-build steps (redirects, output sync)
  images/                 asset generators and exporters
notes/                    working notes (audit, perf)
exports/                  Framer component exports
```
