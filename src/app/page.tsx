import PageShell from '@/components/layout/PageShell'
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
    <PageShell sectionCount={SECTION_COUNT}>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </PageShell>
  )
}
