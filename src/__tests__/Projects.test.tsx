import { render, screen } from '@testing-library/react'
import Projects from '@/components/sections/Projects'

describe('Projects', () => {
  it('renders section label', () => {
    render(<Projects />)
    expect(screen.getByText(/05 \/ Projects/i)).toBeInTheDocument()
  })
  it('renders MyTelkomsel Backend Services', () => {
    render(<Projects />)
    expect(screen.getByText('MyTelkomsel Backend Services')).toBeInTheDocument()
  })
})
