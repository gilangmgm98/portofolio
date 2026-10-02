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
  it('is the same for every user so server HTML and hydrated markup always match', () => {
    const { hidden, shown } = revealStates()
    expect(hidden).toEqual({ opacity: 0, transform: 'translateY(24px)' })
    expect(shown).toEqual({ opacity: 1, transform: 'translateY(0px)' })
  })
})

describe('transitionFor', () => {
  it('is 600ms ease-out normally', () => {
    expect(transitionFor(false)).toEqual({ duration: 0.6, ease: EASE_OUT })
  })
  it('under reduced motion fades over 200ms and snaps every other property instantly', () => {
    expect(transitionFor(true)).toEqual({
      default: { duration: 0 },
      opacity: { duration: 0.2, ease: EASE_OUT },
    })
  })
})
