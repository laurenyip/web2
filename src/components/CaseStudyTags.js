import './CaseStudyTags.css'

export default function CaseStudyTags({ tags }) {
  if (!tags?.length) return null

  return (
    <ul className="case-study-tags">
      {tags.map((tag) => (
        <li key={tag} className="case-study-tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}
