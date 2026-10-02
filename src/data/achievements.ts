import type { Achievement } from '@/types'

export const achievements: Achievement[] = [
  {
    value: 20,
    suffix: '%',
    label: 'Performance Improvement',
    description: 'Faster data processing via ORM profiling and query optimization',
  },
  {
    value: 2,
    suffix: '',
    label: 'Zero-Defect Sprints',
    description: 'Consecutive sprints delivered with 0 backend defects',
  },
  {
    value: 1,
    suffix: '',
    label: 'Critical Domain Owned',
    description: 'Transaction & Payment (TRPY) APIs behind MyTelkomsel',
  },
  {
    value: 4,
    suffix: '',
    label: 'Channels, One Platform',
    description: 'Asterisk PBX, WhatsApp Business API and more, unified into a single platform',
  },
  {
    value: 4,
    suffix: '+',
    label: 'Years of Experience',
    description: 'From IT support to backend engineering on a telco super app',
  },
]
