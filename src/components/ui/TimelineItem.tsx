import type { Experience } from '@/types'

interface TimelineItemProps {
  experience: Experience
  position: 'left' | 'right'
}

export default function TimelineItem({ experience, position }: TimelineItemProps) {
  const isRight = position === 'right'
  return (
    <div className={`relative flex ${isRight ? 'flex-row' : 'flex-row-reverse'} items-start gap-4 md:gap-8`}>
      <div className={`w-full md:w-5/12 ${isRight ? 'md:text-left' : 'md:text-right'}`}>
        <div className="glass rounded-3xl p-6 transition-colors duration-150 hover:border-cosmos-primary/40">
          <div className={`mb-2 flex items-start gap-2 ${isRight ? '' : 'flex-row-reverse'}`}>
            <div>
              {experience.companyUrl ? (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-cosmos-text transition-colors duration-150 hover:text-cosmos-primary">
                  {experience.company}
                </a>
              ) : (
                <span className="font-semibold text-cosmos-text">{experience.company}</span>
              )}
              {experience.current && (
                <span className="ml-2 rounded-full border border-cosmos-primary/30 bg-cosmos-primary/15 px-2 py-0.5 text-xs text-cosmos-primary">
                  Current
                </span>
              )}
            </div>
          </div>
          <p className="mb-1 text-sm font-semibold text-cosmos-primary">{experience.role}</p>
          <p className="mb-3 font-mono text-xs text-cosmos-muted">
            <span>{experience.period}</span>
            <span> · </span>
            <span>{experience.location}</span>
          </p>
          <ul className="space-y-1">
            {experience.highlights.map((h, i) => (
              <li key={i} className="text-xs leading-body text-cosmos-muted">· {h}</li>
            ))}
          </ul>
          <div className={`mt-3 flex flex-wrap gap-1 ${isRight ? '' : 'justify-end'}`}>
            {experience.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-cosmos-border bg-cosmos-bg px-2 py-0.5 font-mono text-xs text-cosmos-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden w-2/12 flex-col items-center md:flex">
        <div className="mt-6 h-3 w-3 rounded-full bg-cosmos-primary ring-4 ring-cosmos-bg" />
      </div>
      <div className="hidden w-5/12 md:block" />
    </div>
  )
}
