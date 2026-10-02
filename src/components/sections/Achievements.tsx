import { achievements } from '@/data/achievements'
import AchievementStat from '@/components/ui/AchievementStat'
import SectionHeading from '@/components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export default function Achievements() {
  return (
    <section className="portfolio-section flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-16">
      <div className="w-full max-w-5xl">
        <div className="mb-16">
          <SectionHeading label="06 / Achievements" title="By The Numbers" align="center" />
        </div>
        <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {achievements.map((a) => (
            <RevealItem key={a.label}>
              <AchievementStat {...a} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
