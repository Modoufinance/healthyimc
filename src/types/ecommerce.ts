export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number; // Price in cents
  currency: string;
  image_url: string | null;
  file_url: string | null;
  category: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  stripe_session_id: string | null;
  stripe_customer_id: string | null;
  total_amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  customer_email: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}