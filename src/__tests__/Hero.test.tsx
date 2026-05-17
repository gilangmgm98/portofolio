import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

describe('Hero', () => {
  it('renders GILANG', () => {
    render(<Hero />)
    expect(screen.getByText('GILANG')).toBeInTheDocument()
  })
  it('renders MURDIYANTO', () => {
    render(<Hero />)
    expect(screen.getByText('MURDIYANTO')).toBeInTheDocument()
  })
  it('renders BACKEND DEVELOPER label', () => {
    render(<Hero />)
    expect(screen.getByText('BACKEND DEVELOPER')).toBeInTheDocument()
  })
  it('renders View Work CTA', () => {
    render(<Hero />)
    expect(screen.getByText('View Work')).toBeInTheDocument()
  })
  it('renders Contact CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
