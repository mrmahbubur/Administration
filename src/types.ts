export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Business Hub' | 'Money-Making' | 'Student Earning' | 'Tech & Tricks' | 'Future Tech';
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
  };
  content: string;
  tags: string[];
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
  status: 'In Development' | 'Beta Preview' | 'Live Foundation';
  statusColor: 'amber' | 'emerald' | 'blue' | 'indigo';
  keyFeatures: string[];
  externalUrl?: string;
  ctaText: string;
  isWaitlist?: boolean;
}

export interface CommentItem {
  id: string;
  articleId: string;
  authorUid: string;
  authorName: string;
  text: string;
  createdAt: number;
}

export type ReviewServiceCategory =
  | 'Remote IT Support'
  | 'Virtual Assistance & Admin'
  | 'Professional CV Design'
  | 'Blogspot & WordPress Management'
  | 'Student Earning Guidance'
  | 'General Consultation';

export interface ReviewItem {
  id: string;
  authorUid: string;
  authorName: string;
  roleOrCompany: string;
  serviceUsed: ReviewServiceCategory;
  rating: number;
  title: string;
  comment: string;
  createdAt: number;
  updatedAt: number;
}

export interface InquiryItem {
  id: string;
  senderUid: string;
  senderName: string;
  senderEmail: string;
  serviceCategory: string;
  urgency: string;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  createdAt: number;
}
