export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface HeroConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  subtitle: string;
  viewPortfolioText: string;
  contactMeText: string;
}

export interface ValueCard {
  id: string;
  iconName: "Clock" | "Eye" | "MessageSquare";
  text: string;
  badgeText: string;
}

export interface AboutConfig {
  title: string;
  description: string;
  portraitUrl: string;
  valueCards: ValueCard[];
}

export interface SkillItem {
  id: string;
  name: string;
  percent: number;
}

export interface SkillGroup {
  id: string;
  category: string; // e.g. "Front-End", "Back-End", "DevOps"
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "FRONT-END" | "FULL-STACK" | "MOBILE";
  imageUrl: string;
  tags: string[];
  description: string;
  demoUrl?: string; // Optional links
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string; // e.g. "2021 - Present"
  description: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  initials: string;
  role: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface PortfolioData {
  logoText: string;
  socials: SocialLinks;
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillGroup[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];
}
