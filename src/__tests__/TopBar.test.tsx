import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopBar from '@/components/layout/TopBar'

describe('TopBar', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-10-02T03:23:00Z')) // 10:23 in Jakarta (UTC+7)
  })
  afterEach(() => jest.useRealTimers())

  it('shows the logo, the availability status and the Jakarta clock', () => {
    render(<TopBar />)
    expect(screen.getByRole('link', { name: 'Back to top' })).toBeInTheDocument()
    expect(screen.getByText('Available for work')).toBeInTheDocument()
    expect(screen.getByText('Jakarta')).toBeInTheDocument()
    expect(screen.getByText('10:23')).toBeInTheDocument()
  })

  it('opens and closes the menu overlay', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    document.body.insertAdjacentHTML('afterbegin', '<div id="site-content"></div>')
    render(<TopBar />)
    const button = screen.getByRole('button', { name: /^menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('menu-overlay')).toHaveAttribute('data-open', 'true')
    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('menu-overlay')).toHaveAttribute('data-open', 'false')
    document.getElementById('site-content')?.remove()
  })
})
