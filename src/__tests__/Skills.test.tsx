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
})
