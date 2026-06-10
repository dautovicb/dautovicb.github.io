const thumbnailModules = import.meta.glob<string>('../assets/thumbnails/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const thumbnails = Object.fromEntries(
  Object.entries(thumbnailModules).map(([path, url]) => [path.split('/').pop()!, url])
)

const interdimensionalModules = import.meta.glob<string>('../assets/media/interdimensional/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const guardianModules = import.meta.glob<string>('../assets/media/seatreasuredefense/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const aicarModules = import.meta.glob<string>('../assets/media/aicar/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const alphaModules = import.meta.glob<string>('../assets/media/projectalpha/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

function toMedia(path: string, url: string): ProjectMedia {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  return ['mp4', 'mov', 'webm'].includes(ext) ? { src: url, type: 'video' } : url
}

export type ProjectLink = {
  label: string
  href: string
}

export type ProjectMedia =
  | string
  | {
      src: string
      type?: 'image' | 'video'
      poster?: string
      label?: string
    }

export type Project = {
  slug: string
  title: string
  year: string
  category: string
  thumbnail: string
  summary: string
  description: string
  media: ProjectMedia[]
  stack: string[]
  links: ProjectLink[]
}

export const profile = {
  name: 'Beriz Dautović',
  role: 'AI/ML Engineer',
  shortBio:
    'Data Science and AI student with extensive software development experience, focused on applying AI to solve meaningful problems.',
  email: 'bdautovic2@etf.unsa.ba',
  github: 'https://github.com/dautovicb',
  linkedin: 'https://www.linkedin.com/in/beriz-dautović-60802a2a5',
}

export type Education = {
  degree: string
  institution: string
  year: string
  note?: string
}

export const education: Education[] = [
  {
    degree: 'Data Science and Artificial Intelligence',
    institution: 'Faculty of Electrical Engineering Sarajevo',
    year: '2025-2028',
  },
  {
    degree: 'Computer Science and Informatics',
    institution: 'High School of Electrical Engineering Sarajevo',
    year: '2021-2025',
  },
]

export const projects: Project[] = [
  {
    slug: 'dealsniper',
    title: 'Smartphone Deal Finder',
    year: '2026',
    category: 'Artificial Intelligence',
    thumbnail: thumbnails['workinprogress.jpg'],
    summary:
      'An intelligent tool that leverages Computer Vision and NLP to evaluate second-hand smartphone listings and find the best deals.',
    description:
      'Currently working on an open source module for analyzing images of a listed smartphone. The module uses a combination of RF-DETR for object detection and ConvNeXtV2 for detecting cracks.',
    media: [],
    stack: ['Python', 'PyTorch', 'RF-DETR', 'ConvNeXtV2', 'OpenCV'],
    links: [
      { label: 'Repository', href: 'https://github.com/dautovicb/phoneanalyze' },
    ],
  },
  {
    slug: 'mlagents',
    title: 'AI Learns to Drive a Manual Car',
    year: '2025',
    category: 'Reinforcement Learning',
    thumbnail: thumbnails['aicar.png'],
    summary:
      'Using reinforcement learning to train an AI agent to drive a manual car.',
    description:
      'I experimented with Unity ML-Agents to train an AI agent to drive a realistic manual car with gears, clutch and everything. The project was a fun exploration of reinforcement learning in a complex control environment, and I was able to achieve some promising results with the agent successfully learning to drive and shift gears.',
    media: Object.entries(aicarModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Reinforcement Learning', 'ML-Agents', 'Unity', 'C#'],
    links: [],
  },
  {
    slug: 'desqly',
    title: 'Desk Reservation Platform',
    year: '2025',
    category: 'Web Application',
    thumbnail: thumbnails['desqly.png'],
    summary:
      'Fullstack web application for managing desk reservations with interactive floor plans.',
    description:
      'Desqly is a fullstack reservation platform designed for hybrid offices that need a simple way to coordinate shared desks and team seating. The application combines role-based access, user management, an interactive floor plan experience, and real-time booking so teams can reserve spaces confidently without overlap. I built the end-to-end product from authentication and API design to UI.',
    media: [thumbnails['desqly.png']],
    stack: ['ReactJS', '.NET', 'PostgreSQL', 'Docker', 'Keycloak'],
    links: [
      { label: 'Website', href: 'https://desqly.app/' },
    ],
  },
  {
    slug: 'nebulora',
    title: 'Nebulora CRM',
    year: '2025',
    category: 'Web Application',
    thumbnail: thumbnails['nebulora.png'],
    summary:
      'Microfrontend-based CRM including user management, internal bloging, desk reservations and more.',
    description:
      'This project is modular CRM platform designed to break down monolithic complexities into scalable mini-apps by leveraging a Microfrontend architecture. The core of the platform is built using Angular Native and Module federation.',
    media: [thumbnails['nebulora.png']],
    stack: ['Angular', 'Native Federation', '.NET', 'EF Core', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'Website', href: 'https://desqly.app/' },
    ],
  },
  {
    slug: 'vaktija',
    title: 'Prayer Times Table (Vaktija)',
    year: '2025',
    category: 'Android tvOS',
    thumbnail: thumbnails['vaktija.png'],
    summary:
      'Offline prayer times table app for mosques built with React Native for Android TV.',
    description:
      'Built an offline prayer times table app for mosques using React Native, designed specifically for Android TV. The app features a clean and intuitive interface that displays accurate prayer times based on the mosque\'s location, along with customizable settings for notifications and display preferences.',
    media: [thumbnails['vaktija.png']],
    stack: ['React Native tvOS'],
    links: [],
  },
  {
    slug: 'interdimensional',
    title: 'Interdimensional - Dimension Shifting Game',
    year: '2022',
    category: 'Game Development',
    thumbnail: thumbnails['Interdimensional.png'],
    summary:
      'A puzzle game where you shift between 2D and 3D to reach the goal.',
    description:
      'Interdimensional is a minimalist puzzle game built around a single deceptively simple mechanic - shifting between 2D and 3D to reach the goal. What looks impossible in 3D might be trivially flat in 2D, and vice versa. Each level is a spatial riddle that challenges you to think beyond the dimension you\'re currently in. \n\nI developed the game using Unity, handling everything from core mechanics and level design to art and sound. The project was a personal passion project that allowed me to explore game development and creative problem-solving. \n\nIt reached more than 10,000 players on Play Store organically, without any marketing, and had amazing ratings and reviews. People praised the game for its unique concept, clever level design, and polished execution, which was especially rewarding as a solo developer.',
    media: Object.entries(interdimensionalModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Photoshop', 'Audacity'],
    links: [],
  },
  {
    slug: 'seatresure',
    title: 'Guardian of the Treasure',
    year: '2024',
    category: 'Game Development',
    thumbnail: thumbnails['guardian.png'],
    summary:
      'A Tower Defense game based on the Sea.',
    description:
      'I made this game for a client on Upwork in a few hours of work as a starting point for a bigger project. It\'s a simple tower defense game where you place different types of towers to defend a treasure from waves of enemies. \n\nThe project was a great opportunity to quickly prototype a game concept and demonstrate my ability to deliver a functional product under tight deadlines.',
    media: Object.entries(guardianModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Blender'],
    links: [],
  },
  {
    slug: 'projectalpha',
    title: 'Project Alpha',
    year: '2025',
    category: 'Game Development',
    thumbnail: thumbnails['fat.jpg'],
    summary:
      'Fat to fit game with realistic weight loss visuals.',
    description:
      'Project Alpha is a unique fitness companion app that lives in the corner of your desktop while you work. It features realistic body transformation through Blend Shapes, continuously visualizing weight loss progress in real time.\n\nThe most technically interesting part was the OS-level window engineering. Achieving a borderless, transparent, always-on-top window required dropping into native Windows APIs from within Unity, handling things most game developers never touch.',
    media: Object.entries(alphaModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Blender', 'Windows API'],
    links: [],
  },/*
  {
    slug: 'maze',
    title: 'Maze 3D',
    year: '2022',
    category: 'Game Development',
    thumbnail: thumbnails['Interdimensional.png'],
    summary:
      'A puzzle game where you shift between 2D and 3D to reach the goal.',
    description:
      'Interdimensional is a minimalist puzzle game built around a single deceptively simple mechanic - shifting between 2D and 3D to reach the goal. What looks impossible in 3D might be trivially flat in 2D, and vice versa. Each level is a spatial riddle that challenges you to think beyond the dimension you\'re currently in. \n\nI developed the game using Unity, handling everything from core mechanics and level design to art and sound. The project was a personal passion project that allowed me to explore game development and creative problem-solving. \n\nIt reached more than 10,000 players on Play Store organically, without any marketing, and had amazing ratings and reviews. People praised the game for its unique concept, clever level design, and polished execution, which was especially rewarding as a solo developer.',
    media: Object.entries(interdimensionalModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Photoshop', 'Audacity'],
    links: [],
  },
  {
    slug: 'endlessrunner',
    title: 'Endless Runner Games',
    year: '2023',
    category: 'Game Development',
    thumbnail: thumbnails['Interdimensional.png'],
    summary:
      'A puzzle game where you shift between 2D and 3D to reach the goal.',
    description:
      'Interdimensional is a minimalist puzzle game built around a single deceptively simple mechanic - shifting between 2D and 3D to reach the goal. What looks impossible in 3D might be trivially flat in 2D, and vice versa. Each level is a spatial riddle that challenges you to think beyond the dimension you\'re currently in. \n\nI developed the game using Unity, handling everything from core mechanics and level design to art and sound. The project was a personal passion project that allowed me to explore game development and creative problem-solving. \n\nIt reached more than 10,000 players on Play Store organically, without any marketing, and had amazing ratings and reviews. People praised the game for its unique concept, clever level design, and polished execution, which was especially rewarding as a solo developer.',
    media: Object.entries(interdimensionalModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Photoshop', 'Audacity'],
    links: [],
  },
  {
    slug: 'bakery',
    title: 'Bakery',
    year: '2022',
    category: 'Game Development',
    thumbnail: thumbnails['Interdimensional.png'],
    summary:
      'A puzzle game where you shift between 2D and 3D to reach the goal.',
    description:
      'Interdimensional is a minimalist puzzle game built around a single deceptively simple mechanic - shifting between 2D and 3D to reach the goal. What looks impossible in 3D might be trivially flat in 2D, and vice versa. Each level is a spatial riddle that challenges you to think beyond the dimension you\'re currently in. \n\nI developed the game using Unity, handling everything from core mechanics and level design to art and sound. The project was a personal passion project that allowed me to explore game development and creative problem-solving. \n\nIt reached more than 10,000 players on Play Store organically, without any marketing, and had amazing ratings and reviews. People praised the game for its unique concept, clever level design, and polished execution, which was especially rewarding as a solo developer.',
    media: Object.entries(interdimensionalModules).map(([path, url]) => toMedia(path, url)),
    stack: ['Unity', 'C#', 'Photoshop', 'Audacity'],
    links: [],
  },*/
]

export const projectCount = projects.length
