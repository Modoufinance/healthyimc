-- Create products table for digital products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents
  currency TEXT NOT NULL DEFAULT 'eur',
  image_url TEXT,
  file_url TEXT, -- Path to the digital file in storage
  category TEXT DEFAULT 'digital',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
  customer_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table for purchased products
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  price INTEGER NOT NULL, -- Price at time of purchase
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read for active products)
CREATE POLICY "Anyone can view active products" ON public.products
FOR SELECT USING (active = true);

CREATE POLICY "Authenticated users can manage products" ON public.products
FOR ALL USING (auth.role() = 'authenticated');

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT USING (user_id = auth.uid() OR customer_email = auth.email());

CREATE POLICY "Service role can manage orders" ON public.orders
FOR ALL USING (true);

-- Order items policies
CREATE POLICY "Users can view their order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.customer_email = auth.email())
  )
);

CREATE POLICY "Service role can manage order items" ON public.order_items
FOR ALL USING (true);

-- Create storage bucket for digital products
INSERT INTO storage.buckets (id, name, public) 
VALUES ('digital-products', 'digital-products', false);

-- Storage policies for digital products
CREATE POLICY "Authenticated users can upload products" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'digital-products' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Only file owners can access products" ON storage.objects
FOR SELECT USING (
  bucket_id = 'digital-products' AND
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.orders o ON oi.order_id = o.id
    JOIN public.products p ON oi.product_id = p.id
    WHERE p.file_url = name 
    AND o.status = 'paid'
    AND (o.user_id = auth.uid() OR o.customer_email = auth.email())
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();