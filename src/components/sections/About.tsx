import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilangmgm/' },
  { label: 'GitHub', href: 'https://github.com/gilangmgm98' },
  { label: 'Email', href: 'mailto:gilangmgm98@gmail.com' },
]

export default function About() {
  return (
    <section className="portfolio-section flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-16">
      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal className="flex justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-cosmos-border bg-cosmos-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:h-80 md:w-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/foto.png" alt="Muhammad Gilang Murdiyanto" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <SectionHeading label="02 / About" title="Who I Am" />
          <p className="leading-body text-cosmos-muted">
            Backend developer with <span className="font-semibold text-cosmos-text">4+ years</span> across IT
            support and software engineering, shipping production systems used by millions. Currently at CODE.ID
            owning the REST APIs powering <span className="font-semibold text-cosmos-text">MyTelkomsel</span> —
            one of Indonesia&apos;s largest telco super apps — with full responsibility over reliability, API
            contracts, and performance. Delivered the last{' '}
            <span className="font-semibold text-cosmos-text">2 sprints with zero backend defects</span>.
          </p>
          <p className="leading-body text-cosmos-muted">
            Previously cut data processing time by{' '}
            <span className="font-semibold text-cosmos-text">~20%</span> through ORM profiling and query
            optimization, and engineered a centralized platform integrating 4 communication channels including
            Asterisk PBX and WhatsApp Business API. Beyond application code, I run and maintain a self-hosted
            infrastructure stack — Proxmox virtualization, containerized services, zero-trust networking —
            because understanding what my code runs on makes me a better engineer, not just a better coder.
          </p>
          <div className="flex gap-5 pt-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-sm font-medium text-cosmos-muted transition-colors duration-150 hover:text-cosmos-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
