'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import SectionHeading from '@/components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

const FIELD =
  'w-full rounded-2xl border border-cosmos-border bg-cosmos-surface/80 px-4 py-3 text-sm text-cosmos-text placeholder-cosmos-muted outline-none transition-colors duration-150 focus:border-cosmos-primary focus-visible:ring-2 focus-visible:ring-cosmos-primary/40'

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilangmgm/' },
  { label: 'GitHub', href: 'https://github.com/gilangmgm98' },
  { label: 'Instagram', href: 'https://www.instagram.com/gilangmgm' },
]

export default function Contact() {
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
    <section className="portfolio-section flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-16">
      <RevealGroup className="w-full max-w-2xl space-y-8 text-center">
        <RevealItem>
          <SectionHeading label="07 / Contact" title="Let's Build Something Together" align="center" />
        </RevealItem>
        <RevealItem>
          <a
            href="mailto:gilangmgm98@gmail.com"
            className="inline-block text-sm text-cosmos-muted transition-colors duration-150 hover:text-cosmos-primary"
          >
            gilangmgm98@gmail.com
          </a>
        </RevealItem>
        <RevealItem>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input type="text" placeholder="Your name" value={form.name} required className={FIELD}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Your email" value={form.email} required className={FIELD}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea placeholder="Your message" rows={4} value={form.message} required className={`${FIELD} resize-none`}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            <div className="min-h-5 text-center text-sm" aria-live="polite">
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <m.p key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }} className="text-cosmos-primary">
                    Message sent! I&apos;ll get back to you soon.
                  </m.p>
                )}
                {status === 'error' && (
                  <m.p key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }} className="text-[#ff453a]">
                    Something went wrong. Try emailing directly.
                  </m.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </RevealItem>
        <RevealItem className="flex justify-center gap-6 pt-4">
          {SOCIAL.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium text-cosmos-muted transition-colors duration-150 hover:text-cosmos-primary">
              {link.label}
            </a>
          ))}
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
