import type { Achievement } from '@/types'

interface ImpactCardProps {
  stat: Achievement
  index: number
  total: number
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function ImpactCard({ stat, index, total }: ImpactCardProps) {
  return (
    <article
      data-impact-card
      data-tone={index % 3}
      style={{ top: `calc(5rem + ${index * 16}px)` }}
      className="impact-card mb-6 rounded-card border border-hairline p-8 md:p-10 lg:sticky lg:mb-[10vh]"
    >
      <div className="flex items-center justify-between text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">
        <span>{stat.label}</span>
        <span className="whitespace-nowrap">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>
      <p className="mt-8 font-display text-[clamp(3.5rem,8vw,7rem)] font-extrabold leading-none tracking-display">
        <span data-count={stat.value} className="tabular-nums">
          {stat.value}
        </span>
        <span className="text-grad">{stat.suffix}</span>
      </p>
      {stat.description && <p className="mt-5 max-w-sm text-sm leading-body text-ink/75">{stat.description}</p>}
      {stat.suffix === '%' && (
        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-hairline">
          <div
            data-impact-bar
            className="h-full rounded-full"
            style={{ width: `${stat.value}%`, background: 'var(--grad)' }}
          />
        </div>
      )}
    </article>
  )
}
