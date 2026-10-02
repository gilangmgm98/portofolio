import { profile } from '@/data/profile'
import GradientText from '@/components/ui/GradientText'
import MaskTitle from '@/components/ui/MaskTitle'
import ScrollLink from '@/components/ui/ScrollLink'

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-between px-6 pb-10 pt-28 md:px-14"
    >
      <div
        data-reveal="fade"
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-hairline pb-4 text-sm"
      >
        <span className="font-semibold">{profile.name}</span>
        <span className="text-muted">
          {profile.role} · {profile.stack}
        </span>
      </div>

      <MaskTitle
        as="h1"
        trigger="load"
        className="my-10 text-balance font-display text-[clamp(3rem,9.2vw,8.25rem)] font-bold leading-display tracking-display text-ink"
      >
        I build backends <GradientText>millions of people</GradientText> rely on.
      </MaskTitle>

      <div className="flex items-end justify-between gap-8">
        <MaskTitle
          as="p"
          trigger="load"
          delay={0.5}
          stagger={0.06}
          className="max-w-md text-sm leading-body text-ink/75 md:text-base"
        >
          {profile.intro}
        </MaskTitle>
        <ScrollLink
          id="about"
          data-reveal="fade"
          aria-label="Scroll to About"
          className="relative hidden h-28 w-28 shrink-0 md:block"
        >
          <svg viewBox="0 0 120 120" className="hero-badge-spin h-full w-full" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text fontSize="10.5" fontWeight="700" fill="currentColor">
              <textPath href="#badge-circle" textLength="283">
                SCROLL TO EXPLORE · SCROLL TO EXPLORE ·{' '}
              </textPath>
            </text>
          </svg>
          <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-xl">
            ↓
          </span>
        </ScrollLink>
      </div>
    </section>
  )
}
