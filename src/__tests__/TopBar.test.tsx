import { fireEvent, render, screen, within } from '@testing-library/react'
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
    const bar = within(screen.getByRole('banner'))
    expect(bar.getByText('Available for work')).toBeInTheDocument()
    expect(bar.getByText('Jakarta')).toBeInTheDocument()
    expect(bar.getByText('10:23')).toBeInTheDocument()
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

  it('lets the Menu button be pulled toward the cursor (magnetic wrapper)', () => {
    render(<TopBar />)
    expect(screen.getByRole('button', { name: /^menu/i }).closest('[data-magnetic]')).not.toBeNull()
  })

  it('is transparent over the hero and becomes solid once the page is scrolled', () => {
    render(<TopBar />)
    const bar = screen.getByRole('banner')
    expect(bar).toHaveClass('topbar')
    expect(bar).not.toHaveAttribute('data-scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 })
    fireEvent.scroll(window)
    expect(bar).toHaveAttribute('data-scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    fireEvent.scroll(window)
    expect(bar).not.toHaveAttribute('data-scrolled')
  })

  it('shows the availability dot as a decorative glowing "live" indicator', () => {
    render(<TopBar />)
    const dot = within(screen.getByRole('banner')).getByText('Available for work').querySelector('.status-dot')
    expect(dot).not.toBeNull()
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })
})
