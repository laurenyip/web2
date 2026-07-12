'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CaseStudyModal from '../components/CaseStudyModal'
import FramerCaseStudyModal from '../components/FramerCaseStudyModal'
import WorkProjectCard from '../components/WorkProjectCard'
import {
  CASE_STUDY_KEYS,
  WORK_PROJECTS,
  WORK_ROW1_FEATURED,
  WORK_ROW2,
  WORK_ROW3,
} from '../data/workProjects'
import './App.css'
import './Work.css'

const RESUME_PDF_HREF = '/Resume___Lauren_Yip.pdf'
const ROW3_TITLE_IDS = new Set(['the-lyre', 'byline'])

export default function Work() {
  const [openCaseStudy, setOpenCaseStudy] = useState(null)
  const [openFramer, setOpenFramer] = useState(null)
  const [activeProject, setActiveProject] = useState(null)

  const featured = WORK_PROJECTS[WORK_ROW1_FEATURED]
  const row2 = WORK_ROW2.map((id) => WORK_PROJECTS[id])
  const row3 = WORK_ROW3.map((id) => WORK_PROJECTS[id])

  const handleOpen = (project) => {
    if (project.framerPath) {
      setOpenFramer({ path: project.framerPath })
      return
    }
    if (!project.hasCaseStudy) return
    setActiveProject(project)
    setOpenCaseStudy(CASE_STUDY_KEYS[project.id])
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenFramer(null)
        setOpenCaseStudy(null)
      }
    }
    if (openCaseStudy || openFramer) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [openCaseStudy, openFramer])

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
          paddingBottom: '4rem',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: "'Melo', sans-serif",
              fontSize: 'clamp(2.25rem, 11vw, 96px)',
              fontWeight: 400,
              color: '#374151',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-1px',
            }}
          >
            Lauren Yip
          </h1>
          <p className="home-hero-subtitle text-center" style={{ marginTop: '0.75rem' }}>
            Product Designer · Computer Science @ SFU · Artist and Explorer
          </p>
        </header>

        <div className="home-page-rows work-page-rows" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="home-row1 work-row1">
            <div className="charm-swing" style={{ width: '100%', maxWidth: '456px', flexShrink: 0, alignSelf: 'flex-start' }}>
              <div className="containermain home-charm-box" style={{ padding: '5%', width: '100%', boxSizing: 'border-box' }}>
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
                  <br />
                  <br />
                  <br />
                  <p2 className="home-charm-meta">
                    &nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status
                    @ SFU
                  </p2>
                  <br />
                  <p3b>23A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YEAR4</p3b>
                  <br />
                  <p3>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={RESUME_PDF_HREF} target="_blank" rel="noopener noreferrer">
                      RESUME
                    </a>
                  </p3>
                  <br />
                  <p2 className="home-charm-contact">
                    <a href="mailto:laurenyip20@gmail.com" style={{ color: 'inherit' }}>
                      laurenyip20@gmail.com
                    </a>
                    {' --- '}
                    <a href="https://www.linkedin.com/in/lauren-yip" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
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
                showTitle={false}
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
                showTitle={false}
              />
            ))}
          </div>

          <div className="home-row3 work-row3">
            <div className="home-thank-you-card">
              <div className="home-f25-body">
                Thanks for visiting my website!{' '}
                <p>If anything on this website resonated, or you want to make something cool together,</p>{' '}
                please reach out!
              </div>
            </div>
            {row3.map((project) => (
              <WorkProjectCard
                key={project.id}
                project={project}
                className="work-row3-card"
                onOpen={handleOpen}
                showTitle={project.id === 'csa' || ROW3_TITLE_IDS.has(project.id)}
                overlayCaption={project.id !== 'csa'}
              />
            ))}
          </div>
        </div>
      </main>

      {openFramer && (
        <FramerCaseStudyModal framerPath={openFramer.path} onClose={() => setOpenFramer(null)} />
      )}

      {openCaseStudy && (
        <CaseStudyModal
          projectTitle={openCaseStudy}
          onClose={() => {
            setOpenCaseStudy(null)
            setActiveProject(null)
          }}
          project={activeProject}
        />
      )}
    </div>
  )
}
