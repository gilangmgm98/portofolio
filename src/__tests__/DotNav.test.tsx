import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DotNav from '@/components/ui/DotNav'

describe('DotNav', () => {
  it('renders 7 dots', () => {
    const onNavigate = jest.fn()
    const { container } = render(<DotNav total={7} active={0} onNavigate={onNavigate} />)
    const dots = container.querySelectorAll('button')
    expect(dots).toHaveLength(7)
  })

  it('calls onNavigate with index when dot is clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = jest.fn()
    const { container } = render(<DotNav total={7} active={0} onNavigate={onNavigate} />)
    const dots = container.querySelectorAll('button')
    await user.click(dots[3])
    expect(onNavigate).toHaveBeenCalledWith(3)
  })

  it('active dot has bg-cosmos-primary class', () => {
    const { container } = render(<DotNav total={7} active={2} onNavigate={jest.fn()} />)
    const dots = container.querySelectorAll('button')
    expect(dots[2]).toHaveClass('bg-cosmos-primary')
    expect(dots[0]).not.toHaveClass('bg-cosmos-primary')
  })
})
