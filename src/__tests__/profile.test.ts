import { profile, sections, menuLinks, socialLinks } from '@/data/profile'

describe('profile', () => {
  it('uses the approved status, city and time zone', () => {
    expect(profile.status).toBe('Available for work')
    expect(profile.city).toBe('Jakarta')
    expect(profile.timeZone).toBe('Asia/Jakarta')
  })
  it('keeps the section order from the spec, with unique ids', () => {
    expect(sections.map((s) => s.id)).toEqual(['about', 'impact', 'experience', 'projects', 'stack'])
    expect(new Set(menuLinks.map((s) => s.id)).size).toBe(menuLinks.length)
  })
  it('adds Contact to the menu only', () => {
    expect(menuLinks.map((s) => s.id)).toEqual([...sections.map((s) => s.id), 'contact'])
  })
  it('exposes LinkedIn, GitHub and Instagram links', () => {
    expect(socialLinks.map((l) => l.label)).toEqual(['LinkedIn', 'GitHub', 'Instagram'])
    for (const l of socialLinks) expect(l.href).toMatch(/^https:\/\//)
  })
})
