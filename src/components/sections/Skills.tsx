import { skills } from '@/data/skills'
import SkillBadge from '@/components/ui/SkillBadge'
import SectionHeading from '@/components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export default function Skills() {
  return (
    <section className="portfolio-section flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-16">
      <div className="w-full max-w-5xl">
        <div className="mb-12">
          <SectionHeading label="03 / Skills" title="Tech Stack" />
        </div>
        <RevealGroup className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {skills.map((skill) => (
            <RevealItem key={skill.name}>
              <SkillBadge {...skill} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
