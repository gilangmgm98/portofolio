import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import AchievementStat from '@/components/ui/AchievementStat'

function Wrapper() {
  const ref = useRef<HTMLElement>(null)
  return (
    <section ref={ref}>
      <AchievementStat value={3} suffix="+" label="Years of Experience" triggerRef={ref} />
    </section>
  )
}

describe('AchievementStat', () => {
  it('renders label', () => {
    render(<Wrapper />)
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })
  it('renders suffix', () => {
    render(<Wrapper />)
    expect(screen.getByText('+')).toBeInTheDocument()
  })
})
