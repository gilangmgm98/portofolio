import { render, screen } from '@testing-library/react'
import Skills from '@/components/sections/Skills'

describe('Skills', () => {
  it('renders section label', () => {
    render(<Skills />)
    expect(screen.getByText(/03 \/ Skills/i)).toBeInTheDocument()
  })
  it('renders TypeScript skill', () => {
    render(<Skills />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
  it('renders NestJS skill', () => {
    render(<Skills />)
    expect(screen.getByText('NestJS')).toBeInTheDocument()
  })
  it('never uses a fixed screen height (tall content must not clip)', () => {
    const { container } = render(<Skills />)
    const section = container.querySelector('section')!
    expect(section).toHaveClass('portfolio-section', 'min-h-screen')
    expect(section.className).not.toMatch(/(^|\s)(md:)?h-screen/)
  })
})
