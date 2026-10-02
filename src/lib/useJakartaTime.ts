import { useSyncExternalStore } from 'react'
import { profile } from '@/data/profile'

let formatter: Intl.DateTimeFormat | null = null

function now() {
  formatter ??= new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return formatter.format(new Date())
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

// null on the server and during hydration (identical markup), "HH:MM" afterwards.
export function useJakartaTime(): string | null {
  return useSyncExternalStore(subscribe, now, () => null)
}
