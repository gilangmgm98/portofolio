export interface Skill {
  name: string
  icon: string       // simple-icons slug or url
  category: 'language' | 'framework' | 'database' | 'infra' | 'integration'
}

export interface Experience {
  company: string
  companyUrl?: string
  role: string
  period: string
  location: string
  current: boolean
  highlights: string[]
  tags: string[]
}

export type ProjectType = 'work' | 'side'

export interface Project {
  type: ProjectType
  title: string
  description: string
  tags: string[]
  githubUrl?: string    // only for side projects
  liveUrl?: string      // only for side projects
}

export interface Achievement {
  value: number
  suffix: string        // e.g. '+', '%', ''
  label: string
  description?: string
}
