'use client'

import { profile } from '@/data/profile'
import { useJakartaTime } from '@/lib/useJakartaTime'

interface StatusClockProps {
  className?: string
  /** forwarded so the top bar can fade it in with the other reveals */
  'data-reveal'?: string
}

// "● Available for work   Jakarta 13:52" — shared by the top bar and the menu overlay header.
// The clock is null on the server and during hydration, so the markup always matches.
export default function StatusClock({ className, ...rest }: StatusClockProps) {
  const time = useJakartaTime()
  return (
    <p className={className} {...rest}>
      <span className="flex items-center gap-2">
        <span aria-hidden="true" className="status-dot" />
        {profile.status}
      </span>
      <span>
        {profile.city} <time className="inline-block min-w-[3.2ch] tabular-nums">{time}</time>
      </span>
    </p>
  )
}
