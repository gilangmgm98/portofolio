import { render, screen } from '@testing-library/react'
import Achievements from '@/components/sections/Achievements'

describe('Achievements', () => {
  it('renders section label', () => {
    render(<Achievements />)
    expect(screen.getByText(/06 \/ Achievements/i)).toBeInTheDocument()
  })
  it('renders Years of Experience label', () => {
    render(<Achievements />)
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })
})
