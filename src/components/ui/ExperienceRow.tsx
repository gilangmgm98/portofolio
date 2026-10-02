import type { Experience } from '@/types'

export default function ExperienceRow({ experience }: { experience: Experience }) {
  return (
    <article
      data-reveal
      className="grid gap-4 border-t border-hairline py-8 transition-colors duration-200 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
    >
      <div className="text-sm text-muted">
        <p>{experience.period}</p>
        <p>{experience.location}</p>
      </div>
      <div>
        <h3 className="flex flex-wrap items-center gap-3 font-display text-2xl font-bold leading-heading tracking-heading">
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="transition-colors duration-150 hover:text-violet"
            >
              {experience.company}
            </a>
          ) : (
            <span>{experience.company}</span>
          )}
          {experience.current && (
            <span className="rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal text-violet">
              Current
            </span>
          )}
        </h3>
        <p className="mt-1 text-sm font-semibold text-violet">{experience.role}</p>
        <ul className="mt-4 space-y-1.5 text-sm leading-body text-ink/75">
          {experience.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-muted" />
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-hairline px-3 py-1 text-xs text-ink/75">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
