import { render, screen } from '@testing-library/react'
import Experience from '@/components/sections/Experience'

describe('Experience', () => {
  it('renders section label', () => {
    render(<Experience />)
    expect(screen.getByText(/04 \/ Experience/i)).toBeInTheDocument()
  })
  it('renders CODE.ID entry', () => {
    render(<Experience />)
    expect(screen.getByText('CODE.ID')).toBeInTheDocument()
  })
  it('renders eCentrix entries', () => {
    render(<Experience />)
    const entries = screen.getAllByText('eCentrix Solutions')
    expect(entries.length).toBeGreaterThanOrEqual(1)
  })
})
