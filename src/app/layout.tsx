import type { Metadata } from 'next'
import { Syne, Manrope, Instrument_Serif } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import MotionProvider from '@/components/motion/MotionProvider'
import Backdrop from '@/components/layout/Backdrop'

const syne = Syne({ variable: '--font-syne', subsets: ['latin'], display: 'swap' })
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], display: 'swap' })
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gilang Murdiyanto — Backend Developer',
  description: 'Backend developer with 3+ years of experience building scalable REST APIs and high-performance backend systems.',
  icons: {
    icon: '/GM-monogram.webp',
    apple: '/GM-monogram.webp',
  },
  openGraph: {
    title: 'Gilang Murdiyanto — Backend Developer',
    description: 'TypeScript · NestJS · Node.js',
    siteName: 'Gilang Murdiyanto Portfolio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${manrope.variable} ${instrument.variable}`}
    >
      <head>
        {/* Enables the CSS reveal gating; if JS never runs, content stays visible (see globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="text-ink antialiased">
        <MotionProvider>
          <Backdrop />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
