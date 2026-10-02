import { profile } from '@/data/profile'
import ScrollLink from '@/components/ui/ScrollLink'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline px-6 py-6 text-sm text-muted md:px-14">
      <span>© 2026 {profile.name}</span>
      <span>
        {profile.role} · {profile.city}
      </span>
      <ScrollLink id="top" className="transition-colors duration-150 hover:text-ink">
        Back to top ↑
      </ScrollLink>
    </footer>
  )
}
