import { render, screen } from '@testing-library/react'
import ImpactCard from '@/components/sections/ImpactCard'

const percent = {
  value: 20,
  suffix: '%',
  label: 'Performance Improvement',
  description: 'Via ORM profiling and query optimization',
}
const plain = { value: 2, suffix: '', label: 'Companies', description: 'Delivering scalable backend products' }

describe('ImpactCard', () => {
  it('renders label, final value, suffix, description and the position marker', () => {
    render(<ImpactCard stat={percent} index={1} total={5} />)
    expect(screen.getByText('Performance Improvement')).toBeInTheDocument()
    expect(screen.getByText('20')).toHaveAttribute('data-count', '20')
    expect(screen.getByText('%')).toBeInTheDocument()
    expect(screen.getByText('Via ORM profiling and query optimization')).toBeInTheDocument()
    expect(screen.getByText('02 / 05')).toBeInTheDocument()
  })

  it('draws the progress bar only for percentage stats, as wide as the value', () => {
    const { container, rerender } = render(<ImpactCard stat={percent} index={0} total={5} />)
    expect((container.querySelector('[data-impact-bar]') as HTMLElement).style.width).toBe('20%')
    rerender(<ImpactCard stat={plain} index={0} total={5} />)
    expect(container.querySelector('[data-impact-bar]')).toBeNull()
  })

  it('stacks by sticky offset per index (from lg up)', () => {
    const { container } = render(<ImpactCard stat={plain} index={2} total={5} />)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveAttribute('data-impact-card')
    expect(card.tagName).toBe('ARTICLE')
    // jsdom re-serialises calc() terms (order may differ), so check both terms instead of the exact string
    expect(card.style.top).toContain('5rem')
    expect(card.style.top).toContain('32px')
    expect(card).toHaveClass('lg:sticky')
  })
})
