import { profile, socialLinks } from '@/data/profile'
import Section from '@/components/ui/Section'

const aboutLinks = socialLinks.filter((l) => l.label !== 'Instagram')
const termClass = 'text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted'

export default function About() {
  return (
    <Section id="about" label="About">
      <div className="grid gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        <div
          data-reveal
          className="h-56 w-56 overflow-hidden rounded-card border border-hairline bg-panel"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/foto.png" alt="Muhammad Gilang Murdiyanto" className="h-full w-full object-cover" />
        </div>
        <div data-reveal className="space-y-5 text-[15px] leading-body text-ink/75 md:text-base">
          <p>
            Backend developer with <span className="font-semibold text-ink">4+ years</span> across IT
            support and software engineering, shipping production systems used by millions. Currently at CODE.ID
            owning the REST APIs powering <span className="font-semibold text-ink">MyTelkomsel</span> —
            one of Indonesia&apos;s largest telco super apps — with full responsibility over reliability, API
            contracts, and performance. Delivered the last{' '}
            <span className="font-semibold text-ink">2 sprints with zero backend defects</span>.
          </p>
          <p>
            Previously cut data processing time by{' '}
            <span className="font-semibold text-ink">~20%</span> through ORM profiling and query
            optimization, and engineered a centralized platform integrating 4 communication channels including
            Asterisk PBX and WhatsApp Business API. Beyond application code, I run and maintain a self-hosted
            infrastructure stack — Proxmox virtualization, containerized services, zero-trust networking —
            because understanding what my code runs on makes me a better engineer, not just a better coder.
          </p>
        </div>
      </div>

      <dl data-reveal className="mt-14 grid gap-8 border-t border-hairline pt-8 text-sm sm:grid-cols-3">
        <div>
          <dt className={termClass}>Location</dt>
          <dd className="mt-3 text-ink/75">
            {profile.city}, {profile.country}
          </dd>
        </div>
        <div>
          <dt className={termClass}>Contact</dt>
          <dd className="mt-3 space-y-2 text-ink/75">
            <a
              href={`mailto:${profile.email}`}
              data-cursor
              className="block transition-colors duration-150 hover:text-ink"
            >
              {profile.email}
            </a>
            <span className="flex gap-4">
              {aboutLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  data-cursor
                  className="transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </span>
          </dd>
        </div>
        <div>
          <dt className={termClass}>Currently</dt>
          <dd className="mt-3 text-ink/75">Back End Developer at CODE.ID</dd>
        </div>
      </dl>
    </Section>
  )
}
