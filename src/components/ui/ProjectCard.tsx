import type { Project } from '@/types'
import Magnetic from '@/components/ui/Magnetic'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-glow className="glow-card flex h-full flex-col gap-4 rounded-card border border-hairline bg-panel/60 p-7 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-violet/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold leading-heading tracking-heading">{project.title}</h3>
        {project.type === 'work' && (
          <span className="shrink-0 rounded-full border border-hairline px-2.5 py-0.5 text-xs text-muted">Work</span>
        )}
      </div>
      <p className="flex-1 text-sm leading-body text-ink/75">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-hairline px-3 py-1 text-xs text-ink/75">
            {tag}
          </li>
        ))}
      </ul>
      {project.type === 'side' && (project.githubUrl || project.liveUrl || project.isCurrentSite) && (
        <div className="mt-auto flex flex-wrap gap-3 border-t border-hairline pt-4">
          {project.githubUrl && (
            <Magnetic>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                data-cursor
                className="btn-ghost !px-4 !py-2 !text-xs"
              >
                ↗ Repo
              </a>
            </Magnetic>
          )}
          {project.isCurrentSite ? (
            <span className="flex items-center gap-2 rounded-full border border-violet/40 px-4 py-2 text-xs font-semibold text-violet">
              ● You&apos;re here
            </span>
          ) : (
            project.liveUrl && (
              <Magnetic>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live"
                  data-cursor
                  className="btn-grad !px-4 !py-2 !text-xs"
                >
                  ↗ Visit
                </a>
              </Magnetic>
            )
          )}
        </div>
      )}
    </article>
  )
}
