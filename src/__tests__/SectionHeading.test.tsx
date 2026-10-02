import { render, screen } from '@testing-library/react'
import SectionHeading from '@/components/ui/SectionHeading'

describe('SectionHeading', () => {
  it('renders label and an h2 title', () => {
    render(<SectionHeading label="05 / Projects" title="Selected Work" />)
    expect(screen.getByText('05 / Projects')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeInTheDocument()
  })
})
