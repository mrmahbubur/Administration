export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Business Hub' | 'Money-Making' | 'Student Earning' | 'Tech & Tricks' | 'Future Tech';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage?: string;
  tags: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  pricingHint: string;
  badge?: string;
  whatsappPreset: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'In Development' | 'Live Foundation' | 'Beta Preview' | 'Upcoming';
  statusColor: string;
  keyFeatures: string[];
  externalUrl?: string;
  ctaText?: string;
  isWaitlist?: boolean;
}

export interface CommentItem {
  id: string;
  articleId: string;
  name: string;
  text: string;
  createdAt: string;
}
