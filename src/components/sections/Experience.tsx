import { experiences } from '@/data/experience'
import ExperienceRow from '@/components/ui/ExperienceRow'
import Section from '@/components/ui/Section'

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
      <div className="border-b border-hairline">
        {experiences.map((exp) => (
          <ExperienceRow key={`${exp.company}-${exp.period}`} experience={exp} />
        ))}
      </div>
    </Section>
  )
}
