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

  it('keeps the position marker on one line even when the label wraps', () => {
    render(<ImpactCard stat={percent} index={1} total={5} />)
    expect(screen.getByText('02 / 05')).toHaveClass('whitespace-nowrap')
  })

  it('dims through an opaque scrim layer instead of lowering the card opacity (no see-through stacking)', () => {
    const { container } = render(<ImpactCard stat={plain} index={0} total={5} />)
    const card = container.firstChild as HTMLElement
    expect(card.querySelector('[data-impact-scrim]')).toHaveAttribute('aria-hidden', 'true')
    expect(card).toHaveClass('relative') // anchors the scrim below lg, where the card is not sticky
  })

  it('adds no trailing gap after the last card (the section padding already spaces what follows)', () => {
    const { container } = render(<ImpactCard stat={{ value: 1, suffix: '', label: 'x' }} index={0} total={1} />)
    expect(container.firstChild).toHaveClass('lg:last:mb-0')
  })
})
