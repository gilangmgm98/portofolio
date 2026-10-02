import { groupSkills, distributeRings, CATEGORY_ORDER } from '@/lib/stack'
import { skills } from '@/data/skills'
import type { Skill } from '@/types'

const make = (name: string, category: Skill['category']): Skill => ({ name, icon: name.toLowerCase(), category })

describe('groupSkills', () => {
  it('orders groups by the fixed category order and labels them', () => {
    const groups = groupSkills([make('Redis', 'database'), make('TypeScript', 'language'), make('Docker', 'infra')])
    expect(groups.map((g) => g.category)).toEqual(['language', 'database', 'infra'])
    expect(groups.map((g) => g.label)).toEqual(['Languages', 'Databases', 'Infrastructure'])
  })

  it('drops empty groups and keeps every skill exactly once (real data)', () => {
    const groups = groupSkills(skills)
    expect(groups.every((g) => g.skills.length > 0)).toBe(true)
    expect(groups.flatMap((g) => g.skills.map((s) => s.name)).sort()).toEqual(skills.map((s) => s.name).sort())
    expect(groups.map((g) => g.category)).toEqual(CATEGORY_ORDER.filter((c) => skills.some((s) => s.category === c)))
  })
})

describe('distributeRings', () => {
  it('spreads skills round-robin over the rings without losing any', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((n) => make(n, 'language'))
    const rings = distributeRings(list, 3)
    expect(rings.map((r) => r.length)).toEqual([3, 2, 2])
    expect(rings.flat().map((s) => s.name).sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  })

  it('returns empty rings for no skills', () => {
    expect(distributeRings([], 3)).toEqual([[], [], []])
  })
})
