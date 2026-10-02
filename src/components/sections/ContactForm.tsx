'use client'

import { useState } from 'react'
import Magnetic from '@/components/ui/Magnetic'

const FIELD =
  'w-full rounded-2xl border border-hairline bg-panel/70 px-4 py-3 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-violet focus-visible:ring-2 focus-visible:ring-violet/40'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <input
        type="text"
        placeholder="Your name"
        value={form.name}
        required
        className={FIELD}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Your email"
        value={form.email}
        required
        className={FIELD}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Your message"
        rows={4}
        value={form.message}
        required
        className={`${FIELD} resize-none`}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <Magnetic className="block">
        <button type="submit" disabled={status === 'loading'} className="btn-grad w-full disabled:opacity-50">
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </Magnetic>
      <div className="min-h-5 text-center text-sm" aria-live="polite">
        {status === 'success' && (
          <p className="status-in text-violet">Message sent! I&apos;ll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="status-in text-[#ff453a]">Something went wrong. Try emailing directly.</p>
        )}
      </div>
    </form>
  )
}
