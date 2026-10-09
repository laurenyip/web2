/**
 * Building blocks for the case studies rebuilt from Framer (Spruce, Aurora, Amazon Gift Wrapping).
 * Each page is a single column; every block sets its own space above it, measured from the original.
 */
import './FramerStudy.css'

// Space above a block: [desktop, phone] in px. `phoneMin` keeps a text block at its 390px height on wider phones,
// as the original's fixed-height text boxes do.
export const gap = (desktop, phone = desktop, phoneMin) => ({
  '--gap': `${desktop}px`,
  '--gap-sm': `${phone}px`,
  ...(phoneMin ? { '--min-sm': `${phoneMin}px` } : {}),
})

export function Label({ children, space }) {
  return (
    <p className="fs-label" style={space}>
      {children}
    </p>
  )
}

export function Heading({ children, space, as: Tag = 'h2' }) {
  return (
    <Tag className="fs-heading" style={space}>
      {children}
    </Tag>
  )
}

export function Body({ children, space, className = '' }) {
  return (
    <p className={`fs-body ${className}`.trim()} style={space}>
      {children}
    </p>
  )
}

export function Img({ src, alt = '', className = '', space, eager = false }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`fs-img ${className}`.trim()}
      style={space}
      loading={eager ? 'eager' : 'lazy'}
    />
  )
}

/** Timeline / role / recognition row. `phoneValue` swaps a value below the desktop breakpoint. */
export function Meta({ items, space }) {
  return (
    <dl className="fs-meta" style={space}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="fs-label">{item.label}</dt>
          <dd className="fs-body">
            {item.phoneValue ? (
              <>
                <span className="fs-desktop-only">{item.value}</span>
                <span className="fs-phone-only">{item.phoneValue}</span>
              </>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function NextLink({ onNext, space, className = '' }) {
  return (
    <p className={`fs-next ${className}`.trim()} style={space}>
      <button type="button" onClick={onNext}>
        See next case study →
      </button>
    </p>
  )
}
