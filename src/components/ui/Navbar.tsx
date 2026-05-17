'use client'

interface NavbarProps {
  activeSection: number
}

const NAV_LINKS = [
  { label: 'About', index: 1 },
  { label: 'Skills', index: 2 },
  { label: 'Experience', index: 3 },
  { label: 'Projects', index: 4 },
  { label: 'Achievements', index: 5 },
  { label: 'Contact', index: 6 },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.portfolio-section')
    sections[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ${
        activeSection === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-cosmos-border/30">
        <button
          onClick={() => scrollToSection(0)}
          className="text-cosmos-primary font-black text-xl tracking-wider"
        >
          GM
        </button>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.index)}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                activeSection === link.index
                  ? 'text-cosmos-primary'
                  : 'text-cosmos-muted hover:text-cosmos-text'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
