import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    company: 'CODE.ID',
    companyUrl: 'https://code.id',
    role: 'Back End Developer',
    period: 'Oct 2025 – Present',
    location: 'Jakarta · Hybrid',
    current: true,
    highlights: [
      'Own backend services and REST APIs for MyTelkomsel',
      'Scope, design, implement, and provide production support',
      'Strengthen reliability through robust validation and error handling',
      'Enforce consistent coding standards across the team',
    ],
    tags: ['TypeScript', 'Node.js', 'NestJS', 'MySQL', 'REST APIs', 'Git'],
  },
  {
    company: 'eCentrix Solutions',
    companyUrl: 'https://ecentrix.co.id',
    role: 'Back End Developer',
    period: 'Jan – Oct 2025',
    location: 'Jakarta · On-site',
    current: false,
    highlights: [
      'Delivered TypeScript/NestJS backends for AI & data products',
      'Improved processing time by ~20% via profiling and Sequelize ORM optimization',
      'Engineered a centralized channel-integration platform aggregating 4 sources',
      'Integrated Asterisk 16 PBX and Meta WhatsApp Business API',
    ],
    tags: ['TypeScript', 'NestJS', 'Node.js', 'Sequelize', 'MySQL', 'Asterisk PBX', 'WhatsApp API'],
  },
  {
    company: 'eCentrix Solutions',
    companyUrl: 'https://ecentrix.co.id',
    role: 'Web Developer',
    period: 'Jun 2023 – Jan 2025',
    location: 'Jakarta · On-site',
    current: false,
    highlights: [
      'Built full-stack web apps with PHP/CodeIgniter 3',
      'Optimized MySQL performance through indexes and query tuning',
      'Delivered features end-to-end and maintained service quality on Apache/Nginx',
    ],
    tags: ['PHP', 'CodeIgniter 3', 'MySQL', 'RESTful APIs', 'JavaScript', 'jQuery'],
  },
  {
    company: 'Interskala Mandiri Indonesia',
    role: 'IT Support Specialist',
    period: 'Jan 2022 – Mar 2023',
    location: 'On-site',
    current: false,
    highlights: [
      'Network maintenance and troubleshooting',
      'MikroTik configuration',
      'Hardware and software support',
    ],
    tags: ['Networking', 'MikroTik', 'IT Support'],
  },
]
