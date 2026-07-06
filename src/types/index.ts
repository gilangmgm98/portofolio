export interface Skill {
  name: string
  icon: string       // simple-icons slug or url
  category: 'language' | 'framework' | 'database' | 'infra' | 'integration' | 'ai'
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

export interface WorkProject {
  type: 'work'
  title: string
  description: string
  tags: string[]
}

export interface SideProject {
  type: 'side'
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  isCurrentSite?: boolean
}

export type Project = WorkProject | SideProject

export interface Achievement {
  value: number
  suffix: string        // e.g. '+', '%', ''
  label: string
  description?: string
}
