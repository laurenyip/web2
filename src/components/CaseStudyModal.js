'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudyModal({ projectTitle, onClose, project }) {
  const [expandedShowcaseImage, setExpandedShowcaseImage] = useState(null)
  const [expandedShowcaseGallery, setExpandedShowcaseGallery] = useState(null)

  const openExpandedImage = (img, gallery) => {
    setExpandedShowcaseImage(img)
    setExpandedShowcaseGallery(gallery?.length ? gallery : [img])
  }

  const closeExpandedImage = () => {
    setExpandedShowcaseImage(null)
    setExpandedShowcaseGallery(null)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!expandedShowcaseImage || !expandedShowcaseGallery?.length) return
      if (event.key === 'Escape') {
        closeExpandedImage()
        return
      }
      const idx = expandedShowcaseGallery.indexOf(expandedShowcaseImage)
      if (event.key === 'ArrowRight' && idx < expandedShowcaseGallery.length - 1) {
        setExpandedShowcaseImage(expandedShowcaseGallery[idx + 1])
      } else if (event.key === 'ArrowLeft' && idx > 0) {
        setExpandedShowcaseImage(expandedShowcaseGallery[idx - 1])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expandedShowcaseImage, expandedShowcaseGallery])

  const caseStudy = caseStudies[projectTitle]

  if (!caseStudy) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center gap-4 z-10 shrink-0">
          <h2 className="m-0 min-w-0 truncate text-2xl font-semibold text-gray-800">
            {project?.title || projectTitle}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-700 hover:text-gray-900 text-2xl font-light leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0">
        <div className="px-8 py-8 space-y-8">
          <p className="about-body-text m-0 text-gray-600">
            {caseStudy.role} • {caseStudy.timeline}
          </p>
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Overview</h3>
            <p className="about-body-text m-0">{caseStudy.overview}</p>
          </section>

          {caseStudy.challenge && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">The Challenge</h3>
              <p className="about-body-text m-0 whitespace-pre-line">{caseStudy.challenge}</p>
            </section>
          )}

          {caseStudy.showcaseImages?.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Design Showcase</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudy.showcaseImages.map((img) => (
                  <div
                    key={img}
                    className="w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                    onClick={() => openExpandedImage(img, caseStudy.showcaseImages)}
                  >
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${img})` }} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {caseStudy.solution && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">The Solution</h3>
              <p className="about-body-text m-0 whitespace-pre-line">{caseStudy.solution}</p>
            </section>
          )}

          {caseStudy.projectVideo || caseStudy.projectProgress?.length > 0 ? (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {caseStudy.projectProgress?.length ? 'Project Progress' : 'Media'}
              </h3>
              {caseStudy.projectVideo ? (
                <div className={caseStudy.projectProgress?.length ? 'mb-6' : ''}>
                  <video controls className="w-full rounded-md shadow-sm" style={{ maxHeight: '500px' }}>
                    <source src={caseStudy.projectVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : null}
              {caseStudy.projectProgress?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseStudy.projectProgress.map((img) => (
                    <div
                      key={img}
                      className="w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => openExpandedImage(img, caseStudy.projectProgress)}
                    >
                      <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${img})` }} />
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {caseStudy.myContribution && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">My Contribution</h3>
              <p className="about-body-text m-0">{caseStudy.myContribution}</p>
            </section>
          )}

          {caseStudy.keyFeatures?.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Key Features</h3>
              <ul className="space-y-2 list-none m-0 p-0">
                {caseStudy.keyFeatures.map((feature) => (
                  <li key={feature} className="about-body-text flex items-start m-0">
                    <span className="mr-2 shrink-0">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {caseStudy.impact?.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Impact</h3>
              <ul className="space-y-2 list-none m-0 p-0">
                {caseStudy.impact.map((item) => (
                  <li key={item} className="about-body-text flex items-start m-0">
                    <span className="mr-2 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(project?.link || caseStudy.designLink) && (
            <section className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {project?.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    View Project →
                  </a>
                )}
                {caseStudy.designLink && (
                  <a
                    href={caseStudy.designLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white border-2 border-gray-700 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Design →
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
        </div>
      </div>

      {expandedShowcaseImage && (
        <div
          className="fixed inset-0 z-[1010] flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <button
              onClick={closeExpandedImage}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light leading-none z-10"
              aria-label="Close"
            >
              ×
            </button>
            {(() => {
              const gallery = expandedShowcaseGallery || [expandedShowcaseImage]
              const idx = gallery.indexOf(expandedShowcaseImage)
              return (
                <>
                  {idx > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedShowcaseImage(gallery[idx - 1])
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-light w-10 h-10 flex items-center justify-center z-10"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                  )}
                  {idx >= 0 && idx < gallery.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedShowcaseImage(gallery[idx + 1])
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-light w-10 h-10 flex items-center justify-center z-10"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  )}
                </>
              )
            })()}
            <Image
              src={expandedShowcaseImage}
              alt="Expanded showcase"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              width={1600}
              height={1200}
              priority={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
