import SnapContainer from '@/components/ui/SnapContainer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'

const SECTION_COUNT = 7

export default function Page() {
  return (
    <SnapContainer sectionCount={SECTION_COUNT}>
      <div className="md:snap-start"><Hero /></div>
      <div className="md:snap-start"><About /></div>
      <div className="md:snap-start"><Skills /></div>
      <div className="md:snap-start"><Experience /></div>
      <div className="md:snap-start"><Projects /></div>
      <div className="md:snap-start"><Achievements /></div>
      <div className="md:snap-start"><Contact /></div>
    </SnapContainer>
  )
}
