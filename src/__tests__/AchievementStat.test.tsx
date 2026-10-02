import { render, screen } from '@testing-library/react'
import AchievementStat from '@/components/ui/AchievementStat'

describe('AchievementStat', () => {
  it('renders label', () => {
    render(<AchievementStat value={3} suffix="+" label="Years of Experience" />)
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })
  it('renders suffix', () => {
    render(<AchievementStat value={3} suffix="+" label="Years of Experience" />)
    expect(screen.getByText('+')).toBeInTheDocument()
  })
  it('exposes the final value to assistive tech from the start', () => {
    render(<AchievementStat value={20} suffix="%" label="Performance Improvement" />)
    expect(screen.getByLabelText('20%')).toBeInTheDocument()
  })
})
