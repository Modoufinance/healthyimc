import { supabase } from "@/integrations/supabase/client";
import { Product, Order, OrderWithItems, OrderItem } from "@/types/ecommerce";

export const ecommerceService = {
  // Products
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Orders
  async getUserOrders(userEmail?: string): Promise<OrderWithItems[]> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('status', 'paid')
      .order('created_at', { ascending: false });

    if (userEmail) {
      query = query.eq('customer_email', userEmail);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as OrderWithItems[];
  },

  async getOrder(id: string): Promise<OrderWithItems | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data as OrderWithItems | null;
  },

  // Admin functions
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async adminCreateProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_session_token') : null;
    if (!token) throw new Error('Non autorisé');

    const { data, error } = await supabase.functions.invoke('admin-products', {
      body: { action: 'create', product },
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (error || !data?.success) throw new Error(data?.error || error?.message || 'Erreur');
    return data.product as Product;
  },

  async adminUpdateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_session_token') : null;
    if (!token) throw new Error('Non autorisé');

    const { data, error } = await supabase.functions.invoke('admin-products', {
      body: { action: 'update', id, updates },
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (error || !data?.success) throw new Error(data?.error || error?.message || 'Erreur');
    return data.product as Product;
  },

  async adminDeleteProduct(id: string): Promise<void> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_session_token') : null;
    if (!token) throw new Error('Non autorisé');

    const { data, error } = await supabase.functions.invoke('admin-products', {
      body: { action: 'delete', id },
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (error || !data?.success) throw new Error(data?.error || error?.message || 'Erreur');
  },

  async getAllOrders(): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as OrderWithItems[];
  },

  // File access
  async getSignedUrl(filePath: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('digital-products')
      .createSignedUrl(filePath, 3600); // 1 hour expiry
    
    if (error) throw error;
    return data.signedUrl;
  },

  // File upload
  async uploadFile(file: File, fileName: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('digital-products')
      .upload(fileName, file);
    
    if (error) throw error;
    return data.path;
  },
};