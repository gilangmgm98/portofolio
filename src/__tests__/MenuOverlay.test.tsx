import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type Lenis from 'lenis'
import MenuOverlay from '@/components/layout/MenuOverlay'
import { setLenis } from '@/lib/scroll'

function setup(open = true) {
  document.body.innerHTML = '<div id="site-content"></div><section id="projects"></section>'
  const onClose = jest.fn()
  const utils = render(<MenuOverlay open={open} onClose={onClose} />)
  return { onClose, ...utils }
}

describe('MenuOverlay', () => {
  afterEach(() => {
    setLenis(null)
    document.body.innerHTML = ''
    document.documentElement.removeAttribute('data-menu-open')
  })

  it('lists every menu link in order, numbered', () => {
    setup()
    const links = screen.getAllByRole('link')
    expect(links.map((l) => l.textContent)).toEqual(['01About', '02Impact', '03Experience', '04Projects', '05Stack', '06Contact'])
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
  })

  it('is hidden from assistive tech and inert while closed', () => {
    setup(false)
    const dialog = document.getElementById('menu-overlay') as HTMLElement
    expect(dialog).toHaveAttribute('aria-hidden', 'true')
    expect(dialog).toHaveAttribute('inert')
    expect(dialog).toHaveAttribute('data-open', 'false')
    expect(document.documentElement).not.toHaveAttribute('data-menu-open')
  })

  it('moves focus in, makes the page inert, locks scrolling and stops Lenis while open', () => {
    const lenis = { stop: jest.fn(), start: jest.fn() }
    setLenis(lenis as unknown as Lenis)
    setup()
    const dialog = screen.getByRole('dialog', { name: 'Site menu' })
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
    expect(document.getElementById('site-content')).toHaveAttribute('inert')
    expect(document.documentElement).toHaveAttribute('data-menu-open')
    expect(lenis.stop).toHaveBeenCalled()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const { onClose } = setup()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('traps Tab and Shift+Tab inside the dialog', async () => {
    const user = userEvent.setup()
    setup()
    const focusables = [screen.getByRole('button', { name: 'Close' }), ...screen.getAllByRole('link')]
    focusables[focusables.length - 1].focus()
    await user.tab()
    expect(document.activeElement).toBe(focusables[0])
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(focusables[focusables.length - 1])
  })

  it('restores focus, the page and Lenis when it closes', () => {
    const lenis = { stop: jest.fn(), start: jest.fn() }
    setLenis(lenis as unknown as Lenis)
    document.body.innerHTML = '<div id="site-content"></div>'
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
    const onClose = jest.fn()
    const { rerender } = render(<MenuOverlay open={false} onClose={onClose} />)
    rerender(<MenuOverlay open onClose={onClose} />)
    expect(document.documentElement).toHaveAttribute('data-menu-open')
    rerender(<MenuOverlay open={false} onClose={onClose} />)
    expect(document.documentElement).not.toHaveAttribute('data-menu-open')
    expect(document.getElementById('site-content')).not.toHaveAttribute('inert')
    expect(lenis.start).toHaveBeenCalled()
    expect(document.activeElement).toBe(trigger)
  })

  it('closes and scrolls to the chosen section', async () => {
    const user = userEvent.setup()
    const { onClose } = setup()
    await user.click(screen.getByRole('link', { name: 'Projects' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled())
  })
})
