import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        // editorial tokens
        night: 'rgb(var(--bg-rgb) / <alpha-value>)', // not `base`: it would collide with the `text-base` font-size utility
        ink: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        violet: 'rgb(var(--primary-rgb) / <alpha-value>)',
        coral: 'rgb(var(--coral-rgb) / <alpha-value>)',
        panel: 'rgb(var(--surface-rgb) / <alpha-value>)',
        hairline: 'var(--hairline)', // fixed alpha: no /opacity modifiers
        // legacy aliases — removed in Task 14
        cosmos: {
          bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
          primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
          text: 'rgb(var(--text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
          border: 'var(--border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: { display: '-0.05em', heading: '-0.03em' },
      lineHeight: { display: '0.94', heading: '1.05', body: '1.65' },
      borderRadius: { card: 'var(--radius-card)' },
    },
  },
  plugins: [],
}

export default config
