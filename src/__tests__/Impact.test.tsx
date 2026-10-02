import { render, screen } from '@testing-library/react'
import Impact from '@/components/sections/Impact'
import { achievements } from '@/data/achievements'
import gsapMock, { ScrollTrigger as ScrollTriggerMock, matchMediaCalls } from '../../__mocks__/gsap'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

describe('Impact', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
  })

  it('is the Impact region with one numbered card per achievement', () => {
    render(<Impact />)
    expect(screen.getByRole('region', { name: 'Impact' })).toHaveAttribute('id', 'impact')
    expect(screen.getAllByRole('article')).toHaveLength(achievements.length)
    expect(screen.getByText(`01 / 0${achievements.length}`)).toBeInTheDocument()
  })

  it('ships the final values in the markup', () => {
    const { container } = render(<Impact />)
    const values = Array.from(container.querySelectorAll('[data-count]')).map((n) => n.textContent)
    expect(values).toEqual(achievements.map((a) => String(a.value)))
  })

  it('counts up only when motion is allowed: resets to 0 and tweens once on enter', () => {
    const { container } = render(<Impact />)
    const entry = matchMediaCalls.find((c) => c.query === MOTION_OK)
    expect(entry).toBeDefined()
    entry!.fn()
    const spans = Array.from(container.querySelectorAll<HTMLElement>('[data-count]'))
    expect(spans.map((s) => s.textContent)).toEqual(spans.map(() => '0'))
    expect(ScrollTriggerMock.create).toHaveBeenCalledTimes(achievements.length)
    expect((ScrollTriggerMock.create as jest.Mock).mock.calls[0][0]).toMatchObject({ once: true, start: 'top 85%' })

    ;(ScrollTriggerMock.create as jest.Mock).mock.calls[0][0].onEnter()
    const [proxy, vars] = (gsapMock.to as jest.Mock).mock.calls[0]
    expect(vars).toMatchObject({ v: achievements[0].value, duration: 1.2, ease: 'power3.out' })
    proxy.v = 3.6
    vars.onUpdate()
    expect(spans[0].textContent).toBe('4')
  })

  it('pins and scrubs the deck only on desktop with motion allowed, shrinking the card and darkening it with its scrim', () => {
    const { container } = render(<Impact />)
    const entry = matchMediaCalls.find((c) => /no-preference/.test(c.query) && /min-width: 1024px/.test(c.query))
    expect(entry).toBeDefined()
    entry!.fn()
    const steps = achievements.length - 1
    expect(gsapMock.to).toHaveBeenCalledTimes(steps * 2)
    const cards = Array.from(container.querySelectorAll('[data-impact-card]'))
    const [cardTarget, cardVars] = (gsapMock.to as jest.Mock).mock.calls[0]
    expect(cardTarget).toBe(cards[0])
    expect(cardVars).toMatchObject({ scale: 0.94 })
    expect(cardVars).not.toHaveProperty('opacity') // lowering the card's own opacity made stacked cards see-through
    const [scrimTarget, scrimVars] = (gsapMock.to as jest.Mock).mock.calls[1]
    expect(scrimTarget).toBe(cards[0].querySelector('[data-impact-scrim]'))
    expect(scrimVars).toMatchObject({ opacity: 0.55 })
    for (const vars of [cardVars, scrimVars]) {
      expect(vars.scrollTrigger).toMatchObject({ scrub: true, start: 'top 75%', end: 'top 25%' })
    }
  })

  it('keeps no extra bottom padding under the deck', () => {
    const { container } = render(<Impact />)
    expect(container.querySelector('[data-impact-card]')!.parentElement!.className).not.toMatch(/pb-/)
  })
})
