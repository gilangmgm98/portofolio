import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export default function Projects() {
  return (
    <section className="portfolio-section flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-16">
      <div className="w-full max-w-5xl">
        <div className="mb-12">
          <SectionHeading label="05 / Projects" title="Selected Work" />
        </div>
        <RevealGroup className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <RevealItem key={project.title} className="h-full">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
