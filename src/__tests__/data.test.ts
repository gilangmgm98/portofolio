import { skills } from '@/data/skills'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { achievements } from '@/data/achievements'
import type { Skill, Experience, Project, Achievement } from '@/types'

describe('skills data', () => {
  it('has at least 10 skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(10)
  })
  it('each skill has name and icon', () => {
    skills.forEach((s: Skill) => {
      expect(s.name).toBeTruthy()
      expect(s.icon).toBeTruthy()
    })
  })
})

describe('experiences data', () => {
  it('has at least 3 experiences', () => {
    expect(experiences.length).toBeGreaterThanOrEqual(3)
  })
  it('each experience has required fields', () => {
    experiences.forEach((e: Experience) => {
      expect(e.company).toBeTruthy()
      expect(e.role).toBeTruthy()
      expect(e.period).toBeTruthy()
      expect(Array.isArray(e.highlights)).toBe(true)
    })
  })
})

describe('projects data', () => {
  it('has work and side projects', () => {
    const work = projects.filter((p: Project) => p.type === 'work')
    const side = projects.filter((p: Project) => p.type === 'side')
    expect(work.length).toBeGreaterThan(0)
    expect(side.length).toBeGreaterThan(0)
  })
  it('work projects have no links', () => {
    projects
      .filter((p: Project) => p.type === 'work')
      .forEach((p: Project) => {
        expect(p.githubUrl).toBeUndefined()
        expect(p.liveUrl).toBeUndefined()
      })
  })
  it('side projects may have github and live urls', () => {
    const side = projects.filter((p: Project) => p.type === 'side')
    side.forEach((p: Project) => {
      if (p.githubUrl) expect(p.githubUrl).toMatch(/^https?:\/\//)
      if (p.liveUrl) expect(p.liveUrl).toMatch(/^https?:\/\//)
    })
  })
})

describe('achievements data', () => {
  it('has at least 4 achievements', () => {
    expect(achievements.length).toBeGreaterThanOrEqual(4)
  })
  it('each achievement has value, label, and suffix', () => {
    achievements.forEach((a: Achievement) => {
      expect(typeof a.value).toBe('number')
      expect(a.label).toBeTruthy()
      expect(a.suffix).toBeDefined()
    })
  })
})
