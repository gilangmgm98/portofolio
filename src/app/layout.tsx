import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const GeistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const GeistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-cosmos-bg text-cosmos-text antialiased">
        {children}
      </body>
    </html>
  )
}
