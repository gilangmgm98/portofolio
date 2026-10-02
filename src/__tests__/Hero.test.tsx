import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'
import { profile } from '@/data/profile'

describe('Hero', () => {
  it('is the top-of-page region', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: 'Introduction' })).toHaveAttribute('id', 'top')
  })

  it('renders the approved headline with the accent words in gradient', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('I build backends millions of people rely on.')
    expect(screen.getByText('millions of people')).toHaveClass('text-grad', 'italic')
    // balanced lines: no orphaned last word ("on.") when the accent words are set larger
    expect(h1).toHaveClass('text-balance')
  })

  it('renders the name row, role and intro', () => {
    render(<Hero />)
    expect(screen.getByText('Muhammad Gilang Murdiyanto')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer · TypeScript · NestJS · Node.js')).toBeInTheDocument()
    expect(screen.getByText(profile.intro)).toBeInTheDocument()
  })

  it('has a scroll badge that jumps to About', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Scroll to About' })).toHaveAttribute('href', '#about')
  })

  it('uses only CSS-gated reveal attributes and no inline styles', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('[style]')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('data-reveal', 'mask')
    expect(container.querySelectorAll('[data-reveal="fade"]').length).toBeGreaterThanOrEqual(3)
  })
})
