import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import Section from '@/components/ui/Section'

export default function Projects() {
  return (
    <Section id="projects" label="Projects">
      <div className="grid auto-rows-fr gap-6 xl:grid-cols-2">
        {projects.map((project) => (
          <div key={project.title} data-reveal className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  )
}
