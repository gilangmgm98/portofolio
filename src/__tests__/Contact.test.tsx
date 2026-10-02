import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '@/components/sections/Contact'

describe('Contact', () => {
  it('is the contact region with the giant heading', () => {
    render(<Contact />)
    expect(screen.getByRole('region', { name: 'Contact' })).toHaveAttribute('id', 'contact')
    expect(screen.getByRole('heading', { level: 2, name: "Let's talk" })).toBeInTheDocument()
  })

  it('reveals the intro paragraphs line by line', () => {
    render(<Contact />)
    expect(screen.getByText('Have a backend project or role in mind?')).toHaveAttribute('data-reveal', 'mask')
    expect(screen.getByText(/Open to backend roles/)).toHaveAttribute('data-reveal', 'mask')
  })

  it('renders the email link and the Copy button', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'gilangmgm98@gmail.com' })).toHaveAttribute('href', 'mailto:gilangmgm98@gmail.com')
    expect(screen.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument()
  })

  it('renders the social links', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/gilangmgm/')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/gilangmgm98')
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/gilangmgm')
  })

  it('renders the contact form fields and send button', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })
})

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/your name/i), 'Ada')
  await user.type(screen.getByPlaceholderText(/your email/i), 'ada@example.com')
  await user.type(screen.getByPlaceholderText(/your message/i), 'Hello there')
  await user.click(screen.getByRole('button', { name: /send message/i }))
}

describe('Contact submit flow', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('announces status changes politely to assistive tech', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument()
  })

  it('shows one status message at a time and allows resubmitting after an error', async () => {
    const user = userEvent.setup()
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true })
    global.fetch = fetchMock as unknown as typeof fetch
    render(<Contact />)

    await fillAndSubmit(user)
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /send message/i }))
    })
    expect(await screen.findByText(/message sent/i)).toBeInTheDocument()
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('disables the button while sending', async () => {
    const user = userEvent.setup()
    let resolve!: (v: { ok: boolean }) => void
    global.fetch = jest.fn(() => new Promise((r) => { resolve = r })) as unknown as typeof fetch
    render(<Contact />)
    await fillAndSubmit(user)
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    await act(async () => {
      resolve({ ok: true })
    })
  })
})
