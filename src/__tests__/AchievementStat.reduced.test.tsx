import { render, screen } from '@testing-library/react'
import AchievementStat from '@/components/ui/AchievementStat'
import { mockMatchMedia } from '@/test-utils/matchMedia'

describe('AchievementStat with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('shows the final value immediately, without counting up', () => {
    render(<AchievementStat value={20} suffix="%" label="Performance Improvement" />)
    expect(screen.getByText('20')).toBeInTheDocument()
  })
})
