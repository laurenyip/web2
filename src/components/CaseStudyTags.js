import './CaseStudyTags.css'

export default function CaseStudyTags({ tags, className = '' }) {
  if (!tags?.length) return null

  return (
    <ul className={`case-study-tags ${className}`.trim()}>
      {tags.map((tag) => (
        <li key={tag} className="case-study-tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}
