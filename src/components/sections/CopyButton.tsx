'use client'

import { useEffect, useRef, useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      // throws if the Clipboard API is missing (insecure context) or the permission is denied
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // stay silent: the mailto link next to this button is always available
    }
  }

  return (
    <button type="button" onClick={copy} data-cursor className="btn-ghost">
      {copied ? 'Copied' : 'Copy Email'}
    </button>
  )
}
