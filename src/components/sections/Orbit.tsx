import type { CSSProperties } from 'react'
import type { Skill } from '@/types'
import { distributeRings } from '@/lib/stack'

const RINGS = [
  { inset: '0%', dur: 70, forward: true },
  { inset: '17%', dur: 52, forward: false },
  { inset: '34%', dur: 36, forward: true },
]

// Decorative only (aria-hidden): the same skills are listed accessibly in the grouped lists.
export default function Orbit({ skills }: { skills: Skill[] }) {
  const rings = distributeRings(skills, RINGS.length)
  return (
    <div data-reveal aria-hidden="true" className="orbit relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="orbit-core" />
      {rings.map((ring, r) => (
        <div
          key={RINGS[r].inset}
          className="orbit-ring"
          style={
            {
              inset: RINGS[r].inset,
              '--dur': `${RINGS[r].dur}s`,
              '--dir': RINGS[r].forward ? 'normal' : 'reverse',
              '--dir-inv': RINGS[r].forward ? 'reverse' : 'normal',
            } as CSSProperties
          }
        >
          {ring.map((skill, i) => (
            <span key={skill.name} className="orbit-pill" style={{ '--a': `${(360 / ring.length) * i}deg` } as CSSProperties}>
              <span>{skill.name}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
