import {
  Brain,
  Code2,
  GitBranch,
  Cloud,
  Zap,
  Database,
  Github,
  Linkedin,
  Twitter,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact';

export const profile = {
  name: 'ANIRUDDHA RAI',
  role: 'Software Developer',
  initials: 'AR',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  status: 'Available',
  location: 'India',
  bio: 'I build clean, fast, and reliable web applications. I enjoy turning ideas into real products with modern tools and a focus on great user experience.',
  roles: [
    'Software Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'UI Engineer',
  ],
};

export const stats = [
  { label: 'Years Coding', value: '04', suffix: '+' },
  { label: 'Projects Built', value: '20', suffix: '+' },
  { label: 'Cups of Coffee', value: '999', suffix: '+' },
  { label: 'Happy Clients', value: '15', suffix: '+' },
];

export interface TimelineEntry {
  type: 'work' | 'edu';
  title: string;
  org: string;
  period: string;
  desc: string;
}

export const timeline: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Software Developer',
    org: 'Freelance',
    period: '2023 — Now',
    desc: 'Building web applications and sites for clients using React, TypeScript, and modern tools.',
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    org: 'Startup Internship',
    period: '2022 — 2023',
    desc: 'Developed user interfaces and improved performance for client web apps.',
  },
  {
    type: 'edu',
    title: 'B.Tech in Computer Science',
    org: 'University',
    period: '2020 — 2024',
    desc: 'Studied computer science with a focus on web development and software engineering.',
  },
];

export interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
  color: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', level: 90, icon: Code2, color: '#22d3ee' },
      { name: 'TypeScript', level: 85, icon: GitBranch, color: '#3b82f6' },
      { name: 'Python', level: 75, icon: Zap, color: '#a855f7' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 92, icon: Code2, color: '#d946ef' },
      { name: 'Tailwind CSS', level: 88, icon: GitBranch, color: '#22d3ee' },
      { name: 'HTML / CSS', level: 90, icon: Code2, color: '#3b82f6' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80, icon: GitBranch, color: '#22d3ee' },
      { name: 'Express', level: 75, icon: Code2, color: '#a855f7' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 88, icon: GitBranch, color: '#3b82f6' },
      { name: 'Database', level: 78, icon: Database, color: '#d946ef' },
    ],
  },
];

export interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  gradient: string;
  accent: string;
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    category: 'Web',
    desc: 'A personal portfolio site with a modern, responsive design.',
    tags: ['React', 'Tailwind'],
    icon: Code2,
    gradient: 'from-cyan-500/30 to-blue-600/20',
    accent: '#22d3ee',
  },
  {
    title: 'Task Manager App',
    category: 'Web App',
    desc: 'A simple task manager to create, edit, and track daily tasks.',
    tags: ['React', 'TypeScript'],
    icon: GitBranch,
    gradient: 'from-purple-500/30 to-fuchsia-600/20',
    accent: '#a855f7',
  },
  {
    title: 'Weather Dashboard',
    category: 'Web App',
    desc: 'A weather app showing current conditions and forecasts by city.',
    tags: ['JavaScript', 'API'],
    icon: Cloud,
    gradient: 'from-blue-500/30 to-indigo-600/20',
    accent: '#3b82f6',
  },
  {
    title: 'Blog Platform',
    category: 'Web',
    desc: 'A minimal blogging platform with posts, tags, and search.',
    tags: ['React', 'Node'],
    icon: Brain,
    gradient: 'from-fuchsia-500/30 to-pink-600/20',
    accent: '#d946ef',
  },
  {
    title: 'E-commerce Store',
    category: 'Web App',
    desc: 'An online store with product listings and a simple cart.',
    tags: ['React', 'Stripe'],
    icon: Cloud,
    gradient: 'from-cyan-500/30 to-teal-600/20',
    accent: '#22d3ee',
  },
  {
    title: 'Chat App',
    category: 'Web App',
    desc: 'A real-time chat application with rooms and direct messages.',
    tags: ['WebSocket', 'React'],
    icon: Zap,
    gradient: 'from-indigo-500/30 to-blue-600/20',
    accent: '#3b82f6',
  },
];

export interface Social {
  label: string;
  handle: string;
  url: string;
  icon: LucideIcon;
  color: string;
}

export const socials: Social[] = [
  { label: 'GitHub', handle: '@ariavoss', url: 'https://github.com', icon: Github, color: '#22d3ee' },
  { label: 'LinkedIn', handle: 'in/ariavoss', url: 'https://linkedin.com', icon: Linkedin, color: '#3b82f6' },
  { label: 'X / Twitter', handle: '@aria_v', url: 'https://x.com', icon: Twitter, color: '#a855f7' },
  { label: 'Email', handle: 'aria@voss.io', url: 'mailto:aria@voss.io', icon: Mail, color: '#d946ef' },
];

export const systemMetrics = [
  { label: 'CPU', value: 42, unit: '%', color: '#22d3ee' },
  { label: 'Memory', value: 68, unit: '%', color: '#3b82f6' },
  { label: 'Network', value: 24, unit: 'ms', color: '#d946ef' },
];

export const notifications = [
  { title: 'New message', body: 'You have a new connection request.', time: '2m', tone: 'info' as const },
];
