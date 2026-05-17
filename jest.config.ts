import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^three$': '<rootDir>/__mocks__/three.ts',
    '^gsap$': '<rootDir>/__mocks__/gsap.ts',
    '^gsap/ScrollTrigger$': '<rootDir>/__mocks__/gsap.ts',
    '^gsap/SplitText$': '<rootDir>/__mocks__/gsap.ts',
  },
}

export default createJestConfig(config)
