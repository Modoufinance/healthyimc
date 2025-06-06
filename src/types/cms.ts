
export interface CMSArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CMSFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSTestimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  before_weight?: string;
  after_weight?: string;
  duration?: string;
  image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSContent {
  id: string;
  key: string;
  title: string;
  content: string;
  type: 'text' | 'html' | 'json';
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}
