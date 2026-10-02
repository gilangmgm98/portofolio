import type { Skill } from '@/types'

export const CATEGORY_ORDER: Skill['category'][] = ['language', 'framework', 'database', 'infra', 'integration', 'ai']

export const CATEGORY_LABELS: Record<Skill['category'], string> = {
  language: 'Languages',
  framework: 'Frameworks',
  database: 'Databases',
  infra: 'Infrastructure',
  integration: 'Integrations',
  ai: 'AI tooling',
}

export function groupSkills(skills: Skill[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    skills: skills.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0)
}

export function distributeRings(skills: Skill[], rings = 3): Skill[][] {
  const out: Skill[][] = Array.from({ length: rings }, () => [])
  skills.forEach((skill, i) => out[i % rings].push(skill))
  return out
}
