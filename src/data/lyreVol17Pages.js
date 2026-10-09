/**
 * The Lyre Vol. 17 page images, in reading order.
 * Source: "lyre 17.zip" — Cover, inside front cover, pages 1–76, inside back cover, back cover.
 */

const BASE = '/images/projects/lyre-vol17/issue'

function page(file, alt, label) {
  return { src: `${BASE}/${file}`, alt, label }
}

const interior = Array.from({ length: 76 }, (_, index) => {
  const number = index + 1
  const fileIndex = String(number + 1).padStart(2, '0')
  const pageNum = String(number).padStart(2, '0')
  return page(
    `${fileIndex}-page-${pageNum}.png`,
    `The Lyre Vol. 17, page ${number}`,
    String(number)
  )
})

export const LYRE_VOL17_PAGES = [
  page('00-cover.png', 'The Lyre Vol. 17 cover', 'Cover'),
  page('01-inside-front-cover.png', 'The Lyre Vol. 17, inside front cover', 'Inside front cover'),
  ...interior,
  page('78-inside-back-cover.png', 'The Lyre Vol. 17, inside back cover', 'Inside back cover'),
  page('79-back-cover.png', 'The Lyre Vol. 17 back cover', 'Back cover'),
]
