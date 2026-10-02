import LenisProvider from '@/components/layout/LenisProvider'
import Aurora from '@/components/layout/Aurora'
import TopBar from '@/components/layout/TopBar'
import SplitLayout from '@/components/layout/SplitLayout'
import Footer from '@/components/layout/Footer'
import Reveals from '@/components/layout/Reveals'
import Cursor from '@/components/layout/Cursor'
import PointerEffects from '@/components/layout/PointerEffects'
import ScrollMotion from '@/components/layout/ScrollMotion'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Impact from '@/components/sections/Impact'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Stack from '@/components/sections/Stack'
import Contact from '@/components/sections/Contact'

export default function Page() {
  return (
    <LenisProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-night"
      >
        Skip to content
      </a>
      <Aurora />
      <TopBar />
      <div id="site-content">
        <main id="main">
          <Hero />
          <SplitLayout>
            <About />
            <Impact />
            <Experience />
            <Projects />
            <Stack />
          </SplitLayout>
          <Contact />
        </main>
        <Footer />
      </div>
      <Reveals />
      <ScrollMotion />
      <PointerEffects />
      <Cursor />
    </LenisProvider>
  )
}
