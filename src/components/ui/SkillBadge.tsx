'use client'

import type { Skill } from '@/types'

const SIMPLE_ICONS_BASE = 'https://cdn.simpleicons.org'

export default function SkillBadge({ name, icon }: Skill) {
  return (
    <div className="group flex cursor-default flex-col items-center gap-2 rounded-2xl border border-cosmos-border bg-cosmos-surface/60 p-4 transition-[transform,border-color,background-color] duration-150 ease-out hover:scale-[1.04] hover:border-cosmos-primary/40 hover:bg-cosmos-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${SIMPLE_ICONS_BASE}/${icon}`}
        alt={name}
        width={32}
        height={32}
        className="opacity-70 transition-opacity duration-150 group-hover:opacity-100"
        style={{ filter: 'brightness(0) invert(1)' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <span className="text-center font-mono text-xs text-cosmos-muted transition-colors duration-150 group-hover:text-cosmos-text">
        {name}
      </span>
    </div>
  )
}
