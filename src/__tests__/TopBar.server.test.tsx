/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server'
import TopBar from '@/components/layout/TopBar'

describe('TopBar server render', () => {
  it('renders the city but no clock value (the time only appears after hydration)', () => {
    const html = renderToString(<TopBar />)
    expect(html).toContain('Jakarta')
    expect(html).toContain('Available for work')
    expect(html).not.toMatch(/\b\d{2}:\d{2}\b/)
  })
})
