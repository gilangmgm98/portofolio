export default class Lenis {
  static instances: Lenis[] = []
  options: unknown
  raf = jest.fn()
  on = jest.fn(() => jest.fn())
  destroy = jest.fn()
  scrollTo = jest.fn()
  stop = jest.fn()
  start = jest.fn()

  constructor(options?: unknown) {
    this.options = options
    Lenis.instances.push(this)
  }
}
