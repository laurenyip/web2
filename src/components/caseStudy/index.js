/**
 * Shared Aurora-aligned case study primitives.
 * Only three text styles: header, blue subheader, Arial body.
 */

export function CaseStudy({ children, className = '' }) {
  return <article className={`cs ${className}`.trim()}>{children}</article>
}

export function CaseStudyHero({ title, support, children }) {
  return (
    <header className="cs-hero">
      <h1 className="cs-header">{title}</h1>
      {support ? <p className="cs-body">{support}</p> : null}
      {children}
    </header>
  )
}

export function ProjectMeta({ items }) {
  return (
    <dl className="cs-meta">
      {items.map((item) => (
        <div key={item.label} className="cs-meta-item">
          <dt className="cs-subheader">{String(item.label).toUpperCase()}</dt>
          <dd className="cs-body">
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function CaseStudySection({ children, className = '', id }) {
  return (
    <section id={id} className={`cs-section ${className}`.trim()}>
      {children}
    </section>
  )
}

export function SectionLabel({ children }) {
  return (
    <p className="cs-subheader">
      {typeof children === 'string' ? children.toUpperCase() : children}
    </p>
  )
}

export function SectionHeading({ children, as: Tag = 'h2' }) {
  return <Tag className="cs-header">{children}</Tag>
}

export function BodyText({ children, className = '' }) {
  return <p className={`cs-body ${className}`.trim()}>{children}</p>
}

export function ImageBlock({ src, alt, caption, wide = false, priority = false }) {
  return (
    <figure className={`cs-image-block${wide ? ' cs-image-block--wide' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} />
      {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
    </figure>
  )
}

export function ImageGrid({ images }) {
  return (
    <div className={`cs-image-grid cs-image-grid--${Math.min(images.length, 3)}`}>
      {images.map((image) => (
        <figure key={image.src} className="cs-image-grid-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt || ''} loading="lazy" />
          {image.caption ? <figcaption className="cs-body">{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}

export function ImageText({ src, alt, caption, children, reverse = false }) {
  return (
    <div className={`cs-image-text${reverse ? ' cs-image-text--reverse' : ''}`}>
      <figure className="cs-image-text-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
        {caption ? <figcaption className="cs-body">{caption}</figcaption> : null}
      </figure>
      <div className="cs-image-text-copy">{children}</div>
    </div>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="cs-list cs-body">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.label}>
          {typeof item === 'string' ? (
            item
          ) : (
            <>
              <strong>{item.label}</strong>
              {item.text ? ` — ${item.text}` : null}
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Reflection({ children }) {
  return <div className="cs-reflection">{children}</div>
}

export function NextCaseStudy({ label = 'See next case study →', onClick, href }) {
  if (href) {
    return (
      <p className="cs-next">
        <a href={href}>{label}</a>
      </p>
    )
  }

  return (
    <p className="cs-next">
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </p>
  )
}

export { default as CoverHoverDemo } from './CoverHoverDemo'
