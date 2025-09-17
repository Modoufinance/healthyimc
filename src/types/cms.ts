
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

export interface CMSProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string | null;
  sku: string;
  price: number;
  sale_price?: number | null;
  category: string;
  subcategory?: string | null;
  brand?: string | null;
  tags: string[] | null;
  images: string[] | null;
  featured_image?: string | null;
  stock_quantity?: number | null;
  stock_status: 'in_stock' | 'out_of_stock' | 'on_backorder';
  weight?: number | null;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  } | null;
  attributes?: {
    [key: string]: string | number | boolean;
  } | null;
  meta_title?: string | null;
  meta_description?: string | null;
  featured: boolean;
  published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  image?: string | null;
  order?: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string | null;
  order?: number;
  is_featured: boolean;
  created_at: string;
}
