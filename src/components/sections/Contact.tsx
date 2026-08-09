'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children
      if (children) {
        gsap.from(children, {
          opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

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
    <section ref={sectionRef} className="portfolio-section w-full min-h-screen md:h-screen flex items-center justify-center bg-cosmos-bg px-6 md:px-16 py-20 md:py-0">
      <div ref={contentRef} className="max-w-2xl w-full text-center space-y-8">
        <div>
          <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">07 / Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">
            Let&apos;s Build Something Together
          </h2>
        </div>
        <a href="mailto:gilangmgm98@gmail.com"
          className="inline-block text-cosmos-muted hover:text-cosmos-primary transition-colors duration-200 text-sm tracking-widest">
          gilangmgm98@gmail.com
        </a>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input type="text" placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required
            className="w-full bg-cosmos-surface border border-cosmos-border rounded px-4 py-3 text-cosmos-text placeholder-cosmos-muted text-sm focus:outline-none focus:border-cosmos-primary transition-colors duration-200" />
          <input type="email" placeholder="Your email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required
            className="w-full bg-cosmos-surface border border-cosmos-border rounded px-4 py-3 text-cosmos-text placeholder-cosmos-muted text-sm focus:outline-none focus:border-cosmos-primary transition-colors duration-200" />
          <textarea placeholder="Your message" rows={4} value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })} required
            className="w-full bg-cosmos-surface border border-cosmos-border rounded px-4 py-3 text-cosmos-text placeholder-cosmos-muted text-sm focus:outline-none focus:border-cosmos-primary transition-colors duration-200 resize-none" />
          <button type="submit" disabled={status === 'loading'}
            className="w-full py-3 bg-cosmos-primary text-white text-sm tracking-widest uppercase font-semibold rounded hover:bg-cosmos-primary/80 transition-colors duration-200 disabled:opacity-50">
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="text-cosmos-accent text-sm text-center">Message sent! I&apos;ll get back to you soon.</p>}
          {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing directly.</p>}
        </form>
        <div className="flex justify-center gap-6 pt-4">
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilangmgm/' },
            { label: 'GitHub', href: 'https://github.com/gilangmgm98' },
            { label: 'Instagram', href: 'https://www.instagram.com/gilangmgm' },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="text-cosmos-muted hover:text-cosmos-primary text-xs tracking-widest uppercase transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
