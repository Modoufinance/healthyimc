
export interface CMSArticle {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  author: string;
  category: string;
  tags: string[] | null;
  featured_image?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  published: boolean;
  published_at?: string | null;
  scheduled_at?: string | null;
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
  before_weight?: string | null;
  after_weight?: string | null;
  duration?: string | null;
  image?: string | null;
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
  description?: string | null;
  color?: string | null;
}
