import { TextEncoder } from 'util'
import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import Page from '@/app/page'
import { mockMatchMedia } from '@/test-utils/matchMedia'

// react-dom/server's browser build needs TextEncoder, which jsdom does not provide.
Object.assign(globalThis, { TextEncoder })
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { renderToString } = require('react-dom/server') as typeof import('react-dom/server')

// The v0.2.0 bug class: server HTML and the first client render must match exactly. This renders the
// page on the "server", then hydrates it, and fails on ANY mismatch warning or recoverable error.
describe('hydration', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    mockMatchMedia([])
    document.body.innerHTML = ''
  })

  it.each([
    ['no preference', []],
    ['Reduce Motion', ['prefers-reduced-motion']],
  ])('hydrates the server HTML without any mismatch (%s)', async (_label, queries) => {
    mockMatchMedia(queries as string[])
    const html = renderToString(<Page />)
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)

    const problems: unknown[] = []
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      problems.push(args)
    })
    await act(async () => {
      hydrateRoot(container, <Page />, { onRecoverableError: (e) => problems.push(e) })
    })
    expect(problems).toEqual([])
  })
})
