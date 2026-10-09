'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'
import LocalCaseStudyModal from '../../components/LocalCaseStudyModal'
import CsaThumb from '../../components/CsaThumb'
import CaseStudyTags from '../../components/CaseStudyTags'
import { CONTENT_STUDY_TAGS, WORK_PROJECTS } from '../../data/workProjects'
import { BodyText, CaseStudy, CaseStudyHero, ProjectMeta, SectionLabel } from '../../components/caseStudy'
import '../../components/caseStudy/CaseStudy.css'
import '../App.css'
import './ContentSystems.css'

const STUDIES = [
  {
    id: 'cradle',
    title: 'Cradle',
    blurb: 'Information architecture for clinical workflows — grouped by urgency.',
    tags: CONTENT_STUDY_TAGS.cradle,
    image: '/images/projects/cradle-referrals.png',
    alt: 'Cradle referrals board',
  },
  {
    id: 'csa-content',
    title: 'Canadian Space Agency',
    blurb: 'A content system for a fragmented research network.',
    tags: CONTENT_STUDY_TAGS['csa-content'],
    Thumb: CsaThumb,
  },
  {
    id: 'lyre',
    title: 'The Lyre',
    blurb: 'Editorial voice and visual language for an issue about Flux.',
    tags: WORK_PROJECTS['the-lyre'].tags,
    image: '/images/projects/lyre-poster-flux.png',
    alt: 'The Lyre Vol. 17 Flux poster',
  },
]

export default function ContentSystems() {
  const [openStudy, setOpenStudy] = useState(null)

  useEffect(() => {
    if (openStudy) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [openStudy])

  return (
    <div className="cs-systems-page">
      <Navbar />
      <CaseStudy>
        <CaseStudyHero title="Content systems portfolio">
          <ProjectMeta
            items={[
              { label: 'Type', value: 'Case study collection' },
              { label: 'Focus', value: 'IA, editorial systems, content design' },
              {
                label: 'Access',
                value: (
                  <>
                    Unlisted —{' '}
                    <a href="/">checkout the rest of my site while you&apos;re here?</a>
                  </>
                ),
              },
            ]}
          />
        </CaseStudyHero>

        <div className="cs-work-prompt">
          <SectionLabel>The studies</SectionLabel>
          <BodyText>Click a thumbnail to open the full case study.</BodyText>
        </div>

        <div className="cs-work-grid" role="navigation" aria-label="Studies in this collection">
          {STUDIES.map((study) => (
            <button
              key={study.id}
              type="button"
              className={`cs-work-card cs-work-card--${study.id}`}
              onClick={() => setOpenStudy(study.id)}
              aria-label={`Open ${study.title} case study${
                study.tags?.length ? `. ${study.tags.join(', ')}` : ''
              }`}
            >
              <div
                className={`cs-work-card-media${study.Thumb ? ' cs-work-card-media--csa' : ''}`}
              >
                {study.Thumb ? (
                  <study.Thumb />
                ) : (
                  <img src={study.image} alt="" draggable={false} />
                )}
                <CaseStudyTags tags={study.tags} />
              </div>
              <div className="cs-work-card-body">
                <p className="cs-work-card-title">{study.title}</p>
                <p className="cs-work-card-blurb">{study.blurb}</p>
                <p className="cs-work-card-cta">Open case study →</p>
              </div>
            </button>
          ))}
        </div>
      </CaseStudy>
      <ScrollToTop color="#166d75" />
      {openStudy ? (
        <LocalCaseStudyModal
          studyId={openStudy}
          onClose={() => setOpenStudy(null)}
          onChangeStudy={setOpenStudy}
        />
      ) : null}
    </div>
  )
}
