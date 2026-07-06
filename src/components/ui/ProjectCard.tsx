'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8
    gsap.to(card, { rotateX, rotateY, duration: 0.3, ease: 'power2.out', transformPerspective: 800 })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full bg-cosmos-surface border border-cosmos-border rounded-lg p-6 flex flex-col gap-4 hover:border-cosmos-primary/40 transition-colors duration-300 will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-cosmos-text font-bold text-lg leading-tight">{project.title}</h3>
        {project.type === 'work' && (
          <span className="text-xs bg-cosmos-bg border border-cosmos-border text-cosmos-muted px-2 py-0.5 rounded-full font-mono shrink-0 ml-2">
            Work
          </span>
        )}
      </div>
      <p className="text-cosmos-muted text-sm leading-relaxed flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs bg-cosmos-bg border border-cosmos-border text-cosmos-muted px-2 py-0.5 rounded font-mono">
            {tag}
          </span>
        ))}
      </div>
      {project.type === 'side' && (project.githubUrl || project.liveUrl || project.isCurrentSite) && (
        <div className="flex gap-3 pt-3 border-t border-cosmos-border mt-auto">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cosmos-primary/70 text-cosmos-primary text-xs font-mono tracking-wider hover:bg-cosmos-primary hover:text-white transition-all duration-200">
              ↗ Repo
            </a>
          )}
          {project.isCurrentSite ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cosmos-accent/40 text-cosmos-accent/80 text-xs font-mono tracking-wider">
              ● You&apos;re here
            </span>
          ) : (
            project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cosmos-accent text-cosmos-accent text-xs font-mono tracking-wider hover:bg-cosmos-accent hover:text-cosmos-bg transition-all duration-200">
                ↗ Visit
              </a>
            )
          )}
        </div>
      )}
    </div>
  )
}
