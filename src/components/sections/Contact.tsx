import { profile, socialLinks } from '@/data/profile'
import MaskTitle from '@/components/ui/MaskTitle'
import Magnetic from '@/components/ui/Magnetic'
import CopyButton from './CopyButton'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-28 text-center md:px-14"
    >
      <MaskTitle as="p" className="text-base text-ink/75 md:text-lg">
        Have a backend project or role in mind?
      </MaskTitle>
      <MaskTitle
        as="h2"
        skew
        className="my-8 font-display text-[clamp(3rem,12.5vw,12rem)] font-extrabold leading-[0.9] tracking-display text-ink"
      >
        Let&apos;s talk
      </MaskTitle>
      <MaskTitle as="p" delay={0.2} stagger={0.06} className="max-w-xl text-sm leading-body text-ink/75 md:text-base">
        Open to backend roles and interesting projects. Email me or send a message below.
      </MaskTitle>
      <div data-reveal="fade" className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            data-cursor
            className="grad-border inline-flex items-center rounded-full px-7 py-4 text-base font-bold text-ink md:text-lg"
          >
            {profile.email}
          </a>
        </Magnetic>
        <Magnetic>
          <CopyButton text={profile.email} />
        </Magnetic>
      </div>
      <div data-reveal="fade" className="mt-14 w-full max-w-xl">
        <ContactForm />
      </div>
      <ul data-reveal="fade" className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="transition-colors duration-150 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
