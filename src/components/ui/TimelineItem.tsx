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
        <div className="bg-cosmos-surface border border-cosmos-border rounded-lg p-5 hover:border-cosmos-primary/40 transition-colors duration-300">
          <div className={`flex items-start gap-2 mb-2 ${isRight ? '' : 'flex-row-reverse'}`}>
            <div>
              {experience.companyUrl ? (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer"
                  className="text-cosmos-text font-bold hover:text-cosmos-primary transition-colors">
                  {experience.company}
                </a>
              ) : (
                <span className="text-cosmos-text font-bold">{experience.company}</span>
              )}
              {experience.current && (
                <span className="ml-2 text-xs bg-cosmos-primary/20 text-cosmos-primary border border-cosmos-primary/30 px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
          </div>
          <p className="text-cosmos-primary text-sm font-semibold mb-1">{experience.role}</p>
          <p className="text-cosmos-muted text-xs font-mono mb-3">
            <span>{experience.period}</span>
            <span> · </span>
            <span>{experience.location}</span>
          </p>
          <ul className="space-y-1">
            {experience.highlights.map((h, i) => (
              <li key={i} className="text-cosmos-muted text-xs leading-relaxed">· {h}</li>
            ))}
          </ul>
          <div className={`flex flex-wrap gap-1 mt-3 ${isRight ? '' : 'justify-end'}`}>
            {experience.tags.map((tag) => (
              <span key={tag} className="text-xs bg-cosmos-bg border border-cosmos-border text-cosmos-muted px-2 py-0.5 rounded font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-2/12 flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-cosmos-primary glow-primary mt-5" />
      </div>
      <div className="hidden md:block w-5/12" />
    </div>
  )
}
