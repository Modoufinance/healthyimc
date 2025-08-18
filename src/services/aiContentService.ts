
import { supabase } from "@/integrations/supabase/client";
import { CMSArticle } from "@/types/cms";

export interface ContentGenerationRequest {
  topic: string;
  type: 'article' | 'seo_optimization' | 'excerpt';
  category: string;
  existingContent?: string;
  language?: string;
}

export interface SEOOptimization {
  meta_title: string;
  meta_description: string;
  excerpt: string;
  tags: string[];
}

export class AIContentService {
  static async generateContent(request: ContentGenerationRequest): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: request
      });

      if (error) {
        throw new Error(`Erreur lors de la génération: ${error.message}`);
      }

      return data.content;
    } catch (error) {
      console.error('Erreur génération de contenu:', error);
      throw error;
    }
  }

  static async generateFullArticle(topic: string, category: string): Promise<Partial<CMSArticle>> {
    try {
      // Génération du contenu principal
      const content = await this.generateContent({
        topic,
        type: 'article',
        category
      });

      // Génération de l'optimisation SEO
      const seoData = await this.generateContent({
        topic,
        type: 'seo_optimization',
        category,
        existingContent: content
      });

      let seoOptimization: SEOOptimization;
      try {
        seoOptimization = JSON.parse(seoData);
      } catch {
        // Fallback si le parsing JSON échoue
        seoOptimization = {
          meta_title: `${topic} | HealthyIMC`,
          meta_description: `Découvrez tout sur ${topic}. Conseils et informations par nos experts santé.`,
          excerpt: `Article complet sur ${topic}.`,
          tags: [category.toLowerCase(), 'santé', 'bien-être']
        };
      }

      // Génération du slug
      const slug = topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      return {
        title: topic,
        slug,
        content,
        excerpt: seoOptimization.excerpt,
        meta_title: seoOptimization.meta_title,
        meta_description: seoOptimization.meta_description,
        tags: seoOptimization.tags,
        category,
        author: 'IA - HealthyIMC',
        published: false // Laisser en brouillon par défaut
      };
    } catch (error) {
      console.error('Erreur génération article complet:', error);
      throw error;
    }
  }

  static async optimizeExistingArticle(article: CMSArticle): Promise<Partial<CMSArticle>> {
    try {
      const seoData = await this.generateContent({
        topic: article.title,
        type: 'seo_optimization',
        category: article.category,
        existingContent: article.content || ''
      });

      let seoOptimization: SEOOptimization;
      try {
        seoOptimization = JSON.parse(seoData);
      } catch {
        throw new Error('Erreur lors du parsing des optimisations SEO');
      }

      return {
        meta_title: seoOptimization.meta_title,
        meta_description: seoOptimization.meta_description,
        excerpt: seoOptimization.excerpt,
        tags: [...(article.tags || []), ...seoOptimization.tags].filter((tag, index, arr) => 
          arr.indexOf(tag) === index
        ) // Supprimer les doublons
      };
    } catch (error) {
      console.error('Erreur optimisation article:', error);
      throw error;
    }
  }

  static async generateMultipleArticles(topics: string[], category: string): Promise<Partial<CMSArticle>[]> {
    const results = [];
    
    for (const topic of topics) {
      try {
        const article = await this.generateFullArticle(topic, category);
        results.push(article);
        
        // Délai pour éviter de surcharger l'API
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Erreur pour le sujet ${topic}:`, error);
        results.push({
          title: topic,
          content: `Erreur lors de la génération: ${error.message}`,
          category,
          author: 'IA - HealthyIMC',
          published: false
        });
      }
    }
    
    return results;
  }
}
