/** Work page grid — order is left-to-right, top-to-bottom. */
export const WORK_ROW1_FEATURED = 'starmap'

export const WORK_ROW2 = ['spruce', 'aurora', 'amazon-giftwrapping']

export const WORK_ROW3 = ['csa', 'the-lyre', 'byline']

export const WORK_PROJECTS = {
  starmap: {
    id: 'starmap',
    title: 'Starmap',
    description: 'A personal relationship management tool to map people, connections, and social context over time.',
    image: '/images/projects/starmap/starmap_t.png',
    hasCaseStudy: true,
    link: 'https://starmap.lol',
    portfolioThumb: true,
    cardBg: '#000000',
    framerPath: '/starmap',
  },
  spruce: {
    id: 'spruce',
    title: 'Spruce',
    description: 'Helping low-income families in Vancouver find free and low-cost third-space activities.',
    image: '/images/projects/spruce/spruce_hero.gif',
    hasCaseStudy: true,
    portfolioThumb: true,
    cardBg: '#3E5D39',
    framerPath: '/spruce',
  },
  aurora: {
    id: 'aurora',
    title: 'Aurora Pet Co.',
    description: 'Vet-backed subscription pet pharmacy focused on chronic conditions and affordability across Canada.',
    image: '/images/projects/aurora/aurora_hero.gif',
    hasCaseStudy: true,
    portfolioThumb: true,
    cardBg: '#FCBAFF',
    framerPath: '/aurora',
  },
  'amazon-giftwrapping': {
    id: 'amazon-giftwrapping',
    title: 'Amazon Gift Wrapping',
    description: 'An improved gift wrapping and card customization experience for Amazon shoppers.',
    image: '/images/projects/amazon-giftwrapping/amazon_hero.gif',
    hasCaseStudy: true,
    portfolioThumb: true,
    cardBg: '#90BCFF',
    framerPath: '/amazon-giftwrapping',
  },
  csa: {
    id: 'csa',
    title: 'Canadian Space Agency',
    description: 'Mapped satellite images across Canada for the Terrestrial Snow Mass Mission (TSMM).',
    image: '/images/projects/csa.png',
    hasCaseStudy: true,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7348846522555342848/',
    portfolioThumb: true,
    cardBg: '#0a0a12',
    nda: true,
  },
  'jellyfish-umbrella': {
    id: 'jellyfish-umbrella',
    title: 'jellyfish umbrella',
    description: 'zine',
    image: '/images/projects/jellyfish-umbrella.png',
    hasCaseStudy: true,
    link: '/rolypolyzine.pdf',
  },
  'react-to-this': {
    id: 'react-to-this',
    title: 'ROSIE Lab',
    description: 'Research assistantship with ROSIE Lab',
    image: '/images/Rosie/elan.png',
    hasCaseStudy: true,
    link: 'https://rosielab.github.io/react-to-this/',
  },
  'the-lyre': {
    id: 'the-lyre',
    title: 'The Lyre',
    description: 'SFU literary magazine — editorial design, Vol. 16 & 17',
    image: '/images/projects/lyre-poster-flux.png',
    hasCaseStudy: true,
    link: 'https://www.sfu.ca/world-languages.html',
  },
  byline: {
    id: 'byline',
    title: 'byline',
    description: 'Spring + Summer 2026',
    image: '/images/projects/byline.png',
    imagePosition: 'top center',
    hasCaseStudy: true,
  },
}

/** Maps work card id → case study object key in caseStudies.js */
export const CASE_STUDY_KEYS = {
  starmap: 'Starmap',
  spruce: 'Spruce',
  aurora: 'Simple Ventures',
  'amazon-giftwrapping': 'Amazon Gift Wrapping',
  csa: 'Canadian Space Agency',
  'jellyfish-umbrella': 'jellyfish umbrella',
  'react-to-this': 'React to This!',
  'the-lyre': 'The Lyre',
  byline: 'byline',
}
