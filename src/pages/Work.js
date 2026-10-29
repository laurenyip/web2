'use client'

import React, { useEffect, useRef, useState } from 'react'
import posthog from 'posthog-js'
import Navbar from '../components/layout/Navbar'
import CaseStudyModal from '../components/case-studies/CaseStudyModal'
import FramerCaseStudyModal, {
  FRAMER_ORIGIN,
  prefetchFramerPath,
} from '../components/case-studies/FramerCaseStudyModal'
import LocalCaseStudyModal from '../components/case-studies/LocalCaseStudyModal'
import WorkProjectCard from '../components/ui/WorkProjectCard'
import {
  CASE_STUDY_KEYS,
  WORK_PROJECTS,
  WORK_ROW1_FEATURED,
  WORK_ROW2,
  WORK_ROW3,
  WORK_ROW4,
  WORK_ROW5,
} from '../data/workProjects'
import './App.css'
import './Work.css'

const RESUME_PDF_HREF = '/Resume___Lauren_Yip.pdf'
const ROW3_TITLE_IDS = new Set(['the-lyre', 'byline'])
const EMAIL = 'laurenyip20@gmail.com'

/** "Next case study" follows the grid: left to right, then the next row, wrapping back to the first. NDA cards are skipped. */
const GRID_ORDER = [WORK_ROW1_FEATURED, ...WORK_ROW2, ...WORK_ROW3, ...WORK_ROW4, ...WORK_ROW5].filter(
  (id) => WORK_PROJECTS[id]?.hasCaseStudy && !WORK_PROJECTS[id].nda
)

function projectAfter(id) {
  const index = GRID_ORDER.indexOf(id)
  return WORK_PROJECTS[GRID_ORDER[(index + 1) % GRID_ORDER.length]]
}

export default function Work() {
  const [openCaseStudy, setOpenCaseStudy] = useState(null)
  const [openFramer, setOpenFramer] = useState(null)
  const [openLocalStudy, setOpenLocalStudy] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [continuedOpen, setContinuedOpen] = useState(false)

  const featured = WORK_PROJECTS[WORK_ROW1_FEATURED]
  const row2 = WORK_ROW2.map((id) => WORK_PROJECTS[id])
  const row3 = WORK_ROW3.map((id) => WORK_PROJECTS[id])
  const row4 = WORK_ROW4.map((id) => WORK_PROJECTS[id]).filter(Boolean)
  const row5 = WORK_ROW5.map((id) => WORK_PROJECTS[id]).filter(Boolean)
  const framerPathsKey = [featured, ...row2, ...row3, ...row4, ...row5]
    .filter((project) => project?.framerPath)
    .map((project) => project.framerPath)
    .join('|')

  const setUrlHash = (id) => {
    if (typeof window === 'undefined') return
    const next = id ? `#${id}` : ''
    if (window.location.hash === next) return
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${next}`)
  }

  // The card that opened the first case study, so focus can return to it however many "next"s later.
  const openerRef = useRef(null)

  const closeAll = () => {
    setOpenFramer(null)
    setOpenLocalStudy(null)
    setOpenCaseStudy(null)
    setActiveProject(null)
    setCurrentProjectId(null)
    setUrlHash('')
    const opener = openerRef.current
    openerRef.current = null
    if (opener && document.contains(opener)) window.requestAnimationFrame(() => opener.focus({ preventScroll: true }))
  }

  const handleOpen = (project) => {
    if (!currentProjectId && document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      openerRef.current = document.activeElement
    }
    // Opening (or moving to) a study replaces whichever study is showing, whatever kind of modal it uses.
    setOpenFramer(null)
    setOpenLocalStudy(null)
    setOpenCaseStudy(null)
    setActiveProject(null)
    setCurrentProjectId(project.id)
    // a link or "next" that lands on a "work continued" study opens that section too
    if (WORK_ROW5.includes(project.id)) setContinuedOpen(true)
    setUrlHash(project.id)
    posthog.capture('project_opened', {
      project_id: project.id,
      project_title: project.title,
      modal_type: project.framerPath
        ? 'framer'
        : project.localCaseStudy
          ? 'local_case_study'
          : 'case_study',
    })
    if (project.framerPath) {
      setOpenFramer({ path: project.framerPath })
      return
    }
    if (project.localCaseStudy) {
      setOpenLocalStudy(project.localCaseStudy)
      return
    }
    if (!project.hasCaseStudy) return
    setActiveProject(project)
    setOpenCaseStudy(CASE_STUDY_KEYS[project.id])
  }

  const openNext = () => {
    const next = currentProjectId ? projectAfter(currentProjectId) : null
    if (next) handleOpen(next)
    else closeAll()
  }

  const handleOpenRef = useRef(handleOpen)
  handleOpenRef.current = handleOpen
  const closeAllRef = useRef(closeAll)
  closeAllRef.current = closeAll

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
      const project = id ? WORK_PROJECTS[id] : null
      if (!project?.hasCaseStudy || project.nda) {
        if (!id) closeAllRef.current()
        return
      }
      handleOpenRef.current(project)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  useEffect(() => {
    const framerPaths = framerPathsKey ? framerPathsKey.split('|') : []
    if (!framerPaths.length) return undefined
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = FRAMER_ORIGIN
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)

    const dnsPrefetch = document.createElement('link')
    dnsPrefetch.rel = 'dns-prefetch'
    dnsPrefetch.href = FRAMER_ORIGIN
    document.head.appendChild(dnsPrefetch)

    const warm = () => {
      framerPaths.forEach((path) => prefetchFramerPath(path))
    }
    const idleId =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(warm, { timeout: 2500 })
        : window.setTimeout(warm, 900)

    return () => {
      preconnect.remove()
      dnsPrefetch.remove()
      if (typeof window.cancelIdleCallback === 'function' && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
    }
  }, [framerPathsKey])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeAll()
    }
    if (openCaseStudy || openFramer || openLocalStudy) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [openCaseStudy, openFramer, openLocalStudy])

  return (
    <div className="home-page work-page min-h-screen bg-white">
      <Navbar />

      <main
        className="home-main work-main"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          boxSizing: 'border-box',
          paddingTop: 'calc(var(--site-nav-block-height, 5.85rem) + 50px)',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <header className="work-hero">
          <h1 className="work-hero-name">Lauren Yip</h1>
          <p className="home-hero-subtitle work-hero-subtitle">
            Design Engineer · Computer Science @ SFU · Artist and Explorer
          </p>
        </header>

        <div className="home-page-rows work-page-rows" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="home-row1 work-row1">
            <div style={{ width: '100%', maxWidth: '456px', flexShrink: 0, alignSelf: 'flex-start' }}>
              <div className="containermain home-charm-box">
                <div className="home-charm-content">
                  <p3>YIP/LAUREN宝怡</p3>
                  <br />
                  <br />
                  <p3>the website &nbsp; 09FEB 2003</p3>
                  <br />
                  <p2>FM</p2>
                  <p3>&nbsp;&nbsp;VANCOUVER/YVR</p3>
                  <br />
                  <p2>TO</p2>
                  <p3>&nbsp;&nbsp;THEWORLD/!!!</p3>
                  {/* age and status in two passport-style columns, each label over its value */}
                  <div className="home-charm-stats">
                    <div className="home-charm-stat">
                      <p2 className="home-charm-meta">Age</p2>
                      <p3b>23A</p3b>
                    </div>
                    <div className="home-charm-stat">
                      <p2 className="home-charm-meta">Status @ SFU</p2>
                      <p3b>YEAR4</p3b>
                      <a
                        className="home-charm-resume"
                        href={RESUME_PDF_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => posthog.capture('resume_clicked')}
                      >
                        RESUME
                      </a>
                    </div>
                  </div>
                  <p2 className="home-charm-contact">
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    {' --- '}
                    <a href="https://www.linkedin.com/in/lauren-yip" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/lauren-yip
                    </a>
                  </p2>
                </div>
              </div>
            </div>

            {featured && (
              <WorkProjectCard
                project={featured}
                className="work-portfolio-card--featured"
                onOpen={handleOpen}
                onPrefetch={() => prefetchFramerPath(featured.framerPath)}
                showTitle={false}
                overlayCaption
              />
            )}
          </div>

          <div className="home-row2 work-row2">
            {row2.map((project, index) => (
              <WorkProjectCard
                key={project.id}
                project={project}
                className={index === 1 ? 'home-row2-middle work-row2-middle' : 'home-row2-side work-row2-side'}
                onOpen={handleOpen}
                onPrefetch={
                  project.framerPath ? () => prefetchFramerPath(project.framerPath) : undefined
                }
                showTitle={false}
                overlayCaption
              />
            ))}
          </div>

          <div className="home-row3 work-row3">
            <div className="home-thank-you-card">
              <div className="home-f25-body">
                Thanks for visiting my website!{' '}
                <p>If anything on this website resonated, or you want to make something cool together,</p>{' '}
                please reach out!
                <a className="home-thank-you-email" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
            </div>
            {row3.map((project) => (
              <WorkProjectCard
                key={project.id}
                project={project}
                className="work-row3-card"
                onOpen={handleOpen}
                showTitle={project.id === 'csa' || ROW3_TITLE_IDS.has(project.id)}
                overlayCaption
              />
            ))}
          </div>

          <div className="home-row3 work-row3 work-row4">
            {row4.map((project) => (
              <WorkProjectCard
                key={project.id}
                project={project}
                className="work-row3-card work-row4-card"
                onOpen={handleOpen}
                showTitle={false}
                overlayCaption
              />
            ))}
          </div>

          {/* "work continued →" opens the last row (ROSIE) underneath */}
          <section className="work-continued">
            <button
              type="button"
              className="work-continued-label"
              onClick={() => setContinuedOpen((open) => !open)}
              aria-expanded={continuedOpen}
              aria-controls="work-continued-row"
            >
              work continued <span aria-hidden="true">{continuedOpen ? '↑' : '→'}</span>
            </button>
            {continuedOpen ? (
              <div id="work-continued-row" className="home-row3 work-row3 work-row4 work-continued-row">
                {row5.map((project) => (
                  <WorkProjectCard
                    key={project.id}
                    project={project}
                    className="work-row3-card work-row4-card"
                    onOpen={handleOpen}
                    showTitle={false}
                    overlayCaption
                  />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </main>

      {openFramer && (
        <FramerCaseStudyModal framerPath={openFramer.path} onClose={closeAll} />
      )}

      {openLocalStudy && (
        <LocalCaseStudyModal
          studyId={openLocalStudy}
          title={WORK_PROJECTS[currentProjectId]?.title}
          onClose={closeAll}
          onNext={openNext}
          nextLabel="See next case study →"
          restoreFocus={false}
        />
      )}

      {openCaseStudy && (
        <CaseStudyModal
          projectTitle={openCaseStudy}
          onClose={closeAll}
          project={activeProject}
          onNext={openNext}
        />
      )}
    </div>
  )
}
