
import { supabase } from "@/integrations/supabase/client";
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent, CMSCategory, CMSProduct, ProductCategory, ProductImage } from "@/types/cms";

export class CMSService {
  // Articles
  static async getArticles(): Promise<CMSArticle[]> {
    const { data, error } = await supabase
      .from('cms_articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
    
    return data || [];
  }

  static async getPublishedArticles(): Promise<CMSArticle[]> {
    const { data, error } = await supabase
      .from('cms_articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching published articles:', error);
      return [];
    }
    
    return data || [];
  }

  static async getArticle(id: string): Promise<CMSArticle | null> {
    const { data, error } = await supabase
      .from('cms_articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }
    
    return data;
  }

  static async getArticleBySlug(slug: string): Promise<CMSArticle | null> {
    const { data, error } = await supabase
      .from('cms_articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
    
    return data;
  }

  static async createArticle(article: Omit<CMSArticle, 'id' | 'created_at' | 'updated_at'>): Promise<CMSArticle | null> {
    const { data, error } = await supabase
      .from('cms_articles')
      .insert({
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt,
        author: article.author,
        category: article.category,
        tags: article.tags,
        featured_image: article.featured_image,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        published: article.published,
        published_at: article.published ? new Date().toISOString() : null
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating article:', error);
      return null;
    }
    
    return data;
  }

  static async updateArticle(id: string, updates: Partial<CMSArticle>): Promise<CMSArticle | null> {
    const updateData: any = { ...updates };
    
    // If publishing for the first time, set published_at
    if (updates.published && !updates.published_at) {
      updateData.published_at = new Date().toISOString();
    }
    
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('cms_articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating article:', error);
      return null;
    }
    
    return data;
  }

  static async deleteArticle(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting article:', error);
      return false;
    }
    
    return true;
  }

  // FAQ
  static async getFAQs(): Promise<CMSFAQ[]> {
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('*')
      .order('order_number', { ascending: true });
    
    if (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
    
    return data.map(faq => ({
      ...faq,
      order: faq.order_number
    })) || [];
  }

  static async getPublishedFAQs(): Promise<CMSFAQ[]> {
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('*')
      .eq('published', true)
      .order('order_number', { ascending: true });
    
    if (error) {
      console.error('Error fetching published FAQs:', error);
      return [];
    }
    
    return data.map(faq => ({
      ...faq,
      order: faq.order_number
    })) || [];
  }

  static async createFAQ(faq: Omit<CMSFAQ, 'id' | 'created_at' | 'updated_at'>): Promise<CMSFAQ | null> {
    const { data, error } = await supabase
      .from('cms_faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order_number: faq.order,
        published: faq.published
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating FAQ:', error);
      return null;
    }
    
    return {
      ...data,
      order: data.order_number
    };
  }

  static async updateFAQ(id: string, updates: Partial<CMSFAQ>): Promise<CMSFAQ | null> {
    const updateData: any = { ...updates };
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();
    
    if (updateData.order !== undefined) {
      updateData.order_number = updateData.order;
      delete updateData.order;
    }
    
    const { data, error } = await supabase
      .from('cms_faqs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating FAQ:', error);
      return null;
    }
    
    return {
      ...data,
      order: data.order_number
    };
  }

  static async deleteFAQ(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_faqs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }
    
    return true;
  }

  // Testimonials
  static async getTestimonials(): Promise<CMSTestimonial[]> {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    
    return data || [];
  }

  static async getPublishedTestimonials(): Promise<CMSTestimonial[]> {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching published testimonials:', error);
      return [];
    }
    
    return data || [];
  }

  static async createTestimonial(testimonial: Omit<CMSTestimonial, 'id' | 'created_at' | 'updated_at'>): Promise<CMSTestimonial | null> {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .insert({
        name: testimonial.name,
        text: testimonial.text,
        rating: testimonial.rating,
        before_weight: testimonial.before_weight,
        after_weight: testimonial.after_weight,
        duration: testimonial.duration,
        image: testimonial.image,
        published: testimonial.published
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating testimonial:', error);
      return null;
    }
    
    return data;
  }

  static async updateTestimonial(id: string, updates: Partial<CMSTestimonial>): Promise<CMSTestimonial | null> {
    const updateData: any = { ...updates };
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('cms_testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating testimonial:', error);
      return null;
    }
    
    return data;
  }

  static async deleteTestimonial(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting testimonial:', error);
      return false;
    }
    
    return true;
  }

  // Content
  static async getContent(): Promise<CMSContent[]> {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) {
      console.error('Error fetching content:', error);
      return [];
    }
    
    return data.map(item => ({
      ...item,
      type: item.type as 'text' | 'html' | 'json'
    })) || [];
  }

  static async getContentByKey(key: string): Promise<CMSContent | null> {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('key', key)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching content by key:', error);
      return null;
    }
    
    return {
      ...data,
      type: data.type as 'text' | 'html' | 'json'
    };
  }

  static async createContent(content: Omit<CMSContent, 'id' | 'created_at' | 'updated_at'>): Promise<CMSContent | null> {
    const { data, error } = await supabase
      .from('cms_content')
      .insert({
        key: content.key,
        title: content.title,
        content: content.content,
        type: content.type,
        category: content.category,
        published: content.published
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating content:', error);
      return null;
    }
    
    return {
      ...data,
      type: data.type as 'text' | 'html' | 'json'
    };
  }

  static async updateContent(id: string, updates: Partial<CMSContent>): Promise<CMSContent | null> {
    const updateData: any = { ...updates };
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('cms_content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating content:', error);
      return null;
    }
    
    return {
      ...data,
      type: data.type as 'text' | 'html' | 'json'
    };
  }

  static async deleteContent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_content')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting content:', error);
      return false;
    }
    
    return true;
  }

  // Categories
  static async getCategories(): Promise<CMSCategory[]> {
    const { data, error } = await supabase
      .from('cms_categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  }

  // Products
  static async getProducts(): Promise<CMSProduct[]> {
    const { data, error } = await supabase
      .from('cms_products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data || [];
  }

  static async getPublishedProducts(): Promise<CMSProduct[]> {
    const { data, error } = await supabase
      .from('cms_products')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching published products:', error);
      return [];
    }
    
    return data || [];
  }

  static async getProduct(id: string): Promise<CMSProduct | null> {
    const { data, error } = await supabase
      .from('cms_products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }
    
    return data;
  }

  static async getProductBySlug(slug: string): Promise<CMSProduct | null> {
    const { data, error } = await supabase
      .from('cms_products')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
    
    return data;
  }

  static async createProduct(product: Omit<CMSProduct, 'id' | 'created_at' | 'updated_at'>): Promise<CMSProduct | null> {
    const { data, error } = await supabase
      .from('cms_products')
      .insert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        short_description: product.short_description,
        sku: product.sku,
        price: product.price,
        sale_price: product.sale_price,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        tags: product.tags,
        images: product.images,
        featured_image: product.featured_image,
        stock_quantity: product.stock_quantity,
        stock_status: product.stock_status,
        weight: product.weight,
        dimensions: product.dimensions,
        attributes: product.attributes,
        meta_title: product.meta_title,
        meta_description: product.meta_description,
        featured: product.featured,
        published: product.published,
        published_at: product.published ? new Date().toISOString() : null
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    
    return data;
  }

  static async updateProduct(id: string, updates: Partial<CMSProduct>): Promise<CMSProduct | null> {
    const updateData: any = { ...updates };
    
    // If publishing for the first time, set published_at
    if (updates.published && !updates.published_at) {
      updateData.published_at = new Date().toISOString();
    }
    
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('cms_products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      return null;
    }
    
    return data;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    
    return true;
  }

  // Product Categories
  static async getProductCategories(): Promise<ProductCategory[]> {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error fetching product categories:', error);
      return [];
    }
    
    return data || [];
  }

  static async createProductCategory(category: Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ProductCategory | null> {
    const { data, error } = await supabase
      .from('product_categories')
      .insert({
        name: category.name,
        slug: category.slug,
        description: category.description,
        parent_id: category.parent_id,
        image: category.image,
        order: category.order,
        published: category.published
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product category:', error);
      return null;
    }
    
    return data;
  }

  // File Upload
  static async uploadFile(file: File, folder: string = 'products'): Promise<string | null> {
    try {
      const fileName = `${folder}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('cms-uploads')
        .upload(fileName, file);
      
      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }
      
      const { data: publicUrl } = supabase.storage
        .from('cms-uploads')
        .getPublicUrl(data.path);
      
      return publicUrl.publicUrl;
    } catch (error) {
      console.error('Error in uploadFile:', error);
      return null;
    }
  }

  static async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract path from URL
      const urlParts = url.split('/');
      const path = urlParts.slice(-2).join('/'); // Get last two parts (folder/filename)
      
      const { error } = await supabase.storage
        .from('cms-uploads')
        .remove([path]);
      
      if (error) {
        console.error('Error deleting file:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in deleteFile:', error);
      return false;
    }
  }
}
