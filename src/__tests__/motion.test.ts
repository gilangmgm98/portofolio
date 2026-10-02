import { EASE_OUT, EASE_IN_OUT, SPRING, revealStates, transitionFor } from '@/lib/motion'

describe('motion tokens', () => {
  it('uses the strong curves from the spec', () => {
    expect(EASE_OUT).toEqual([0.23, 1, 0.32, 1])
    expect(EASE_IN_OUT).toEqual([0.77, 0, 0.175, 1])
  })
  it('default spring has no bounce', () => {
    expect(SPRING).toEqual({ type: 'spring', bounce: 0, duration: 0.4 })
  })
})

describe('revealStates', () => {
  it('translates 24px up using a full transform string when motion is allowed', () => {
    const { hidden, shown } = revealStates(false)
    expect(hidden).toEqual({ opacity: 0, transform: 'translateY(24px)' })
    expect(shown).toEqual({ opacity: 1, transform: 'translateY(0px)' })
  })
  it('only fades when reduced motion is requested', () => {
    const { hidden, shown } = revealStates(true)
    expect(hidden).toEqual({ opacity: 0 })
    expect(shown).toEqual({ opacity: 1 })
  })
})

describe('transitionFor', () => {
  it('is 600ms ease-out normally and 200ms when reduced', () => {
    expect(transitionFor(false)).toEqual({ duration: 0.6, ease: EASE_OUT })
    expect(transitionFor(true)).toEqual({ duration: 0.2, ease: EASE_OUT })
  })
})
