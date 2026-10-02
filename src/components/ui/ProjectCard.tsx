import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 hover:border-cosmos-primary/40">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold leading-heading tracking-heading text-cosmos-text">{project.title}</h3>
        {project.type === 'work' && (
          <span className="ml-2 shrink-0 rounded-full border border-cosmos-border bg-cosmos-bg px-2 py-0.5 font-mono text-xs text-cosmos-muted">
            Work
          </span>
        )}
      </div>
      <p className="flex-1 text-sm leading-body text-cosmos-muted">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-cosmos-border bg-cosmos-bg px-2 py-0.5 font-mono text-xs text-cosmos-muted">
            {tag}
          </span>
        ))}
      </div>
      {project.type === 'side' && (project.githubUrl || project.liveUrl || project.isCurrentSite) && (
        <div className="mt-auto flex gap-3 border-t border-cosmos-border pt-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="btn-secondary !px-3 !py-1.5 !text-xs font-mono">
              ↗ Repo
            </a>
          )}
          {project.isCurrentSite ? (
            <span className="flex items-center gap-1.5 rounded-full border border-cosmos-primary/40 px-3 py-1.5 font-mono text-xs text-cosmos-primary/80">
              ● You&apos;re here
            </span>
          ) : (
            project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live"
                className="btn-primary !px-3 !py-1.5 !text-xs font-mono">
                ↗ Visit
              </a>
            )
          )}
        </div>
      )}
    </div>
  )
}
