'use client'

import React, { useState } from 'react'
import posthog from 'posthog-js'
import Image from 'next/image'
import StarmapThumb from '../components/StarmapThumb'
import AmazonGiftThumb from '../components/AmazonGiftThumb'
import SpruceThumb from '../components/SpruceThumb'
import AuroraThumb from '../components/AuroraThumb'
import CsaThumb from '../components/CsaThumb'
import { getProtectedImageProps } from '../../lib/getProtectedImageProps'
import '../pages/Portfolio.css'

const THUMB_BY_ID = {
  starmap: StarmapThumb,
  spruce: SpruceThumb,
  aurora: AuroraThumb,
  'amazon-giftwrapping': AmazonGiftThumb,
  csa: CsaThumb,
}

function WorkProjectCardMedia({ project, csaRevealed, portfolio }) {
  const Thumb = project.portfolioThumb ? THUMB_BY_ID[project.id] : null

  if (Thumb) {
    if (project.nda) return <Thumb revealed={csaRevealed} />
    return <Thumb />
  }

  return (
    <Image
      src={project.image}
      alt={project.title}
      className={portfolio ? 'portfolio-card-image' : 'work-card-img work-card-img--static'}
      width={1200}
      height={900}
      priority={false}
      style={{ objectPosition: project.imagePosition || 'center' }}
      {...getProtectedImageProps()}
    />
  )
}

function PortfolioStyleCard({ project, className, onOpen, showTitle = true, overlayCaption = false }) {
  const [csaRevealed, setCsaRevealed] = useState(false)

  const handleClick = () => {
    if (project.nda && !csaRevealed) {
      posthog.capture('nda_project_revealed', { project_id: project.id, project_title: project.title })
      setCsaRevealed(true)
      return
    }
    onOpen(project)
  }

  const media = (
    <div
      className={`portfolio-card-media portfolio-card-media--${project.id}`}
      style={{ backgroundColor: project.cardBg }}
    >
      <WorkProjectCardMedia project={project} csaRevealed={csaRevealed} portfolio />
      {overlayCaption ? <div className="work-card-static-dim" aria-hidden="true" /> : null}
      {overlayCaption ? (
        <div className="work-card-static-hover">
          {showTitle ? (
            <p className="work-card-static-hover-title about-body-text about-body-text--on-dark m-0 mb-2">
              {project.title}
            </p>
          ) : null}
          <p className="about-body-text about-body-text--on-dark m-0">{project.description}</p>
        </div>
      ) : null}
    </div>
  )

  return (
    <button
      type="button"
      className={`portfolio-card work-portfolio-card ${className}${overlayCaption ? ' work-portfolio-card--overlay' : ''}${project.nda && !csaRevealed ? ' portfolio-card--nda' : ''}${csaRevealed ? ' portfolio-card--nda-open' : ''}`}
      onClick={handleClick}
      aria-label={`Open ${project.title}`}
    >
      {media}
      {!overlayCaption ? (
        <div className="portfolio-card-body">
          {project.meta ? <p className="portfolio-card-meta about-body-text m-0">{project.meta}</p> : null}
          {showTitle ? <h2 className="portfolio-card-title">{project.title}</h2> : null}
          <p className="portfolio-card-blurb about-body-text m-0">{project.description}</p>
        </div>
      ) : null}
    </button>
  )
}

function StaticProjectCard({ project, className, onOpen, showTitle = false }) {
  return (
    <button
      type="button"
      className={`work-card work-card--static group ${className}`}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title}`}
    >
      <div className="work-card-media work-card-media--static">
        <WorkProjectCardMedia project={project} portfolio={false} />
        <div className="work-card-static-dim" aria-hidden="true" />
      </div>
      <div className="work-card-static-hover">
        {showTitle ? (
          <p className="work-card-static-hover-title about-body-text about-body-text--on-dark m-0 mb-2">
            {project.title}
          </p>
        ) : null}
        <p className="about-body-text about-body-text--on-dark m-0">{project.description}</p>
      </div>
    </button>
  )
}

export default function WorkProjectCard({
  project,
  className = '',
  onOpen,
  showTitle = true,
  overlayCaption = false,
}) {
  if (project.portfolioThumb) {
    return (
      <PortfolioStyleCard
        project={project}
        className={className}
        onOpen={onOpen}
        showTitle={showTitle}
        overlayCaption={overlayCaption}
      />
    )
  }

  return <StaticProjectCard project={project} className={className} onOpen={onOpen} showTitle={showTitle} />
}
