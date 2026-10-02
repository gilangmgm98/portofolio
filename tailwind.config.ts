import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        cosmos: {
          bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
          primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
          text: 'rgb(var(--text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
          border: 'var(--border)', // fixed alpha: do not use /opacity modifiers on this token
        },
      },
      fontFamily: {
        sans: ['var(--font-display)'],
        mono: ['var(--font-geist-mono)'],
      },
      letterSpacing: { display: '-0.03em', heading: '-0.02em' },
      lineHeight: { display: '1.05', heading: '1.1', body: '1.5' },
    },
  },
  plugins: [],
}

export default config
