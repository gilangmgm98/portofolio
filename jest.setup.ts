import '@testing-library/jest-dom'
import { mockMatchMedia } from '@/test-utils/matchMedia'

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Some suites (e.g. contact-api.test.ts) run in the `node` environment where there is no window.
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, configurable: true, value: IntersectionObserverStub })
  Object.defineProperty(window, 'ResizeObserver', { writable: true, configurable: true, value: ResizeObserverStub })
  Element.prototype.scrollIntoView = jest.fn()
  mockMatchMedia()
}
