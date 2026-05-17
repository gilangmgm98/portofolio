const gsap = {
  registerPlugin: jest.fn(),
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
  })),
  matchMedia: jest.fn(() => ({ add: jest.fn(), revert: jest.fn() })),
  context: jest.fn(() => ({ revert: jest.fn() })),
  set: jest.fn(),
}

export default gsap
export const ScrollTrigger = { create: jest.fn(), refresh: jest.fn() }
export const SplitText = jest.fn().mockImplementation(() => ({
  chars: [], words: [], lines: [],
}))
