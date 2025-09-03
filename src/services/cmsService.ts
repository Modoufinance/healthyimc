
import { supabase } from "@/integrations/supabase/client";
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent, CMSCategory } from "@/types/cms";

export class CMSService {
  static async getScheduledArticles(): Promise<CMSArticle[]> {
    const { data, error } = await supabase
      .from('cms_articles')
      .select('*')
      .eq('published', false)
      .not('scheduled_at', 'is', null)
      .order('scheduled_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching scheduled articles:', error);
      return [];
    }
    
    return data || [];
  }

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
        scheduled_at: article.scheduled_at,
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
}
