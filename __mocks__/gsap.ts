import { useEffect } from 'react'

// Handlers registered through gsap.matchMedia().add(query, fn) — tests invoke them by hand.
export const matchMediaCalls: Array<{ query: string; fn: () => unknown }> = []

const timeline = () => {
  const tl: Record<string, unknown> = {}
  for (const key of ['to', 'from', 'fromTo', 'set', 'add', 'call']) tl[key] = jest.fn(() => tl)
  return tl
}

const gsap = {
  registerPlugin: jest.fn(),
  set: jest.fn(),
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  quickTo: jest.fn(() => jest.fn()),
  timeline: jest.fn(() => timeline()),
  ticker: { add: jest.fn(), remove: jest.fn(), lagSmoothing: jest.fn() },
  matchMedia: jest.fn(() => ({
    add: jest.fn((query: string, fn: () => unknown) => {
      matchMediaCalls.push({ query, fn })
    }),
    revert: jest.fn(),
  })),
  context: jest.fn(() => ({ revert: jest.fn(), add: jest.fn() })),
  utils: {
    toArray: jest.fn((target: unknown) =>
      typeof target === 'string'
        ? Array.from(document.querySelectorAll(target))
        : Array.from(target as ArrayLike<unknown>)
    ),
  },
}

export default gsap

export const ScrollTrigger = {
  create: jest.fn(),
  batch: jest.fn(),
  update: jest.fn(),
  refresh: jest.fn(),
  getAll: jest.fn(() => []),
  kill: jest.fn(),
}

export const SplitText = {
  create: jest.fn(() => ({ lines: [] as Element[], words: [] as Element[], revert: jest.fn() })),
}

// Runs the callback after mount like the real hook (refs are set); GSAP work itself is mocked.
export function useGSAP(callback?: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { callback?.() }, [])
}
