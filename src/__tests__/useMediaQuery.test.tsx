import { renderHook } from '@testing-library/react'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { mockMatchMedia } from '@/test-utils/matchMedia'

describe('useMediaQuery', () => {
  it('returns false when the query does not match', () => {
    mockMatchMedia([])
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })
  it('returns true when it matches', () => {
    mockMatchMedia(['min-width: 768px'])
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })
})
