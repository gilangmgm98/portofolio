import { render, screen } from '@testing-library/react'
import Stack from '@/components/sections/Stack'
import Orbit from '@/components/sections/Orbit'
import { skills } from '@/data/skills'
import { groupSkills } from '@/lib/stack'

describe('Stack', () => {
  it('is the Stack region', () => {
    render(<Stack />)
    expect(screen.getByRole('region', { name: 'Stack' })).toHaveAttribute('id', 'stack')
  })

  it('lists every skill once, grouped by category, for assistive tech', () => {
    render(<Stack />)
    const groups = groupSkills(skills)
    for (const group of groups) {
      expect(screen.getByRole('heading', { level: 3, name: group.label })).toBeInTheDocument()
    }
    // the orbit is decorative (aria-hidden), so only the grouped lists are exposed
    expect(screen.getAllByRole('listitem')).toHaveLength(skills.length)
    expect(screen.getByText('TypeScript', { selector: 'li' })).toBeInTheDocument()
  })
})

describe('Orbit', () => {
  it('is decorative, has three rings and shows every skill as a pill', () => {
    const { container } = render(<Orbit skills={skills} />)
    const orbit = container.firstChild as HTMLElement
    expect(orbit).toHaveAttribute('aria-hidden', 'true')
    const rings = orbit.querySelectorAll('.orbit-ring')
    expect(rings).toHaveLength(3)
    expect(orbit.querySelectorAll('.orbit-pill')).toHaveLength(skills.length)
    for (const ring of Array.from(rings)) expect((ring as HTMLElement).style.getPropertyValue('--dur')).toMatch(/s$/)
  })

  it('places pills evenly around each ring via an angle variable', () => {
    const { container } = render(<Orbit skills={skills.slice(0, 4)} />)
    const first = container.querySelector('.orbit-ring') as HTMLElement
    const pills = Array.from(first.querySelectorAll<HTMLElement>('.orbit-pill'))
    const angles = pills.map((p) => parseFloat(p.style.getPropertyValue('--a')))
    expect(angles[0]).toBe(0)
    if (angles.length > 1) expect(angles[1]).toBeCloseTo(360 / angles.length)
  })
})
