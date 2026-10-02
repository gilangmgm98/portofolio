import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyButton from '@/components/sections/CopyButton'

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value })
}

describe('CopyButton', () => {
  afterEach(() => {
    jest.useRealTimers()
    setClipboard(undefined)
  })

  it('copies the text, confirms with "Copied" and reverts after two seconds', async () => {
    jest.useFakeTimers()
    const writeText = jest.fn().mockResolvedValue(undefined)
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    setClipboard({ writeText }) // after setup(): user-event installs its own clipboard stub
    render(<CopyButton text="me@example.com" />)
    await user.click(screen.getByRole('button', { name: 'Copy Email' }))
    expect(writeText).toHaveBeenCalledWith('me@example.com')
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument()
  })

  it('never claims success when the clipboard rejects', async () => {
    const user = userEvent.setup()
    setClipboard({ writeText: jest.fn().mockRejectedValue(new Error('denied')) })
    render(<CopyButton text="me@example.com" />)
    await user.click(screen.getByRole('button', { name: 'Copy Email' }))
    expect(screen.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copied' })).not.toBeInTheDocument()
  })

  it('does not throw when the Clipboard API is unavailable (insecure context)', async () => {
    const user = userEvent.setup()
    setClipboard(undefined)
    render(<CopyButton text="me@example.com" />)
    await user.click(screen.getByRole('button', { name: 'Copy Email' }))
    expect(screen.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument()
  })
})
