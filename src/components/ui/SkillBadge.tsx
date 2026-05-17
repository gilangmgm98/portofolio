import type { Skill } from '@/types'

const SIMPLE_ICONS_BASE = 'https://cdn.simpleicons.org'

export default function SkillBadge({ name, icon }: Skill) {
  return (
    <div className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-cosmos-border hover:border-cosmos-primary/50 hover:bg-cosmos-surface transition-all duration-300 cursor-default">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${SIMPLE_ICONS_BASE}/${icon}`}
        alt={name}
        width={32}
        height={32}
        className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ filter: 'brightness(0) invert(1)' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <span className="text-cosmos-muted group-hover:text-cosmos-text text-xs text-center font-mono transition-colors duration-300">
        {name}
      </span>
    </div>
  )
}
