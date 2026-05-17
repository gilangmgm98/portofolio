import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cosmos: {
          bg: '#0a0a0f',
          surface: '#111118',
          primary: '#7c3aed',
          accent: '#06b6d4',
          text: '#f8fafc',
          muted: '#6b7280',
          border: '#1f2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'gradient-cosmos': 'linear-gradient(135deg, #7c3aed, #06b6d4)',
      },
    },
  },
  plugins: [],
}

export default config
