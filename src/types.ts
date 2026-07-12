export type ThemeId = 'crimson' | 'obsidian' | 'sunset' | 'amethyst';

export interface Theme {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardBgClass: string;
  textAccentClass: string;
  borderAccentClass: string;
  glowClass: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'systems' | 'minecraft' | 'databases';
  level: number; // 0-100
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  status: 'Active' | 'Development' | 'Completed' | 'Maintenance';
  description: string;
  tech: string[];
  features: string[];
}

export interface GuestbookComment {
  id: string;
  username: string;
  role: 'Developer' | 'Staff' | 'Friend' | 'Sponsor' | 'Visitor';
  badgeColor: string;
  message: string;
  timestamp: string;
  avatarSeed: string;
}
