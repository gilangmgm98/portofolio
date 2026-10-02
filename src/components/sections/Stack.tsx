import { skills } from '@/data/skills'
import { groupSkills } from '@/lib/stack'
import Section from '@/components/ui/Section'
import Orbit from './Orbit'

export default function Stack() {
  return (
    <Section id="stack" label="Stack">
      <Orbit skills={skills} />
      <div className="mt-16 divide-y divide-hairline border-y border-hairline">
        {groupSkills(skills).map((group) => (
          <div key={group.category} data-reveal className="grid gap-4 py-6 md:grid-cols-[10rem_minmax(0,1fr)]">
            <h3 className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name} className="rounded-full border border-hairline px-4 py-1.5 text-sm text-ink/90">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
