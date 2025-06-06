
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent } from "@/types/cms";

// Simulation d'une base de données locale pour la démonstration
// En production, ces données viendraient de Supabase ou d'une autre base de données

const mockArticles: CMSArticle[] = [
  {
    id: "1",
    title: "Comment calculer son IMC efficacement",
    slug: "comment-calculer-imc-efficacement",
    content: "<p>L'IMC (Indice de Masse Corporelle) est un indicateur simple...</p>",
    excerpt: "Guide complet pour comprendre et calculer votre indice de masse corporelle avec précision.",
    author: "Dr. Martin",
    category: "Santé",
    tags: ["IMC", "santé", "calcul", "poids"],
    published: true,
    published_at: "2024-01-12T10:00:00Z",
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z",
    meta_title: "Comment Calculer son IMC - Guide Complet 2024",
    meta_description: "Découvrez comment calculer votre IMC facilement avec notre guide complet. Formule, interprétation et conseils personnalisés."
  }
];

const mockFAQs: CMSFAQ[] = [
  {
    id: "1",
    question: "Comment calculer son IMC ?",
    answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m).",
    category: "Calcul",
    order: 1,
    published: true,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  }
];

const mockTestimonials: CMSTestimonial[] = [
  {
    id: "1",
    name: "Marie L.",
    text: "Grâce à ce calculateur d'IMC, j'ai pu suivre mon indice de masse corporelle et atteindre mes objectifs de poids santé.",
    rating: 5,
    before_weight: "85kg",
    after_weight: "68kg",
    duration: "6 mois",
    published: true,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  }
];

const mockContent: CMSContent[] = [
  {
    id: "1",
    key: "homepage_title",
    title: "Titre page d'accueil",
    content: "Calculateur IMC Gratuit en Ligne",
    type: "text",
    category: "Homepage",
    published: true,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  }
];

export class CMSService {
  // Articles
  static async getArticles(): Promise<CMSArticle[]> {
    return mockArticles;
  }

  static async getArticle(id: string): Promise<CMSArticle | null> {
    return mockArticles.find(article => article.id === id) || null;
  }

  static async createArticle(article: Omit<CMSArticle, 'id' | 'created_at' | 'updated_at'>): Promise<CMSArticle> {
    const newArticle: CMSArticle = {
      ...article,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockArticles.push(newArticle);
    return newArticle;
  }

  static async updateArticle(id: string, updates: Partial<CMSArticle>): Promise<CMSArticle | null> {
    const index = mockArticles.findIndex(article => article.id === id);
    if (index === -1) return null;
    
    mockArticles[index] = {
      ...mockArticles[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    return mockArticles[index];
  }

  static async deleteArticle(id: string): Promise<boolean> {
    const index = mockArticles.findIndex(article => article.id === id);
    if (index === -1) return false;
    
    mockArticles.splice(index, 1);
    return true;
  }

  // FAQ
  static async getFAQs(): Promise<CMSFAQ[]> {
    return mockFAQs.sort((a, b) => a.order - b.order);
  }

  static async createFAQ(faq: Omit<CMSFAQ, 'id' | 'created_at' | 'updated_at'>): Promise<CMSFAQ> {
    const newFAQ: CMSFAQ = {
      ...faq,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockFAQs.push(newFAQ);
    return newFAQ;
  }

  // Testimonials
  static async getTestimonials(): Promise<CMSTestimonial[]> {
    return mockTestimonials;
  }

  static async createTestimonial(testimonial: Omit<CMSTestimonial, 'id' | 'created_at' | 'updated_at'>): Promise<CMSTestimonial> {
    const newTestimonial: CMSTestimonial = {
      ...testimonial,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTestimonials.push(newTestimonial);
    return newTestimonial;
  }

  // Content
  static async getContent(): Promise<CMSContent[]> {
    return mockContent;
  }

  static async getContentByKey(key: string): Promise<CMSContent | null> {
    return mockContent.find(content => content.key === key && content.published) || null;
  }

  static async createContent(content: Omit<CMSContent, 'id' | 'created_at' | 'updated_at'>): Promise<CMSContent> {
    const newContent: CMSContent = {
      ...content,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockContent.push(newContent);
    return newContent;
  }
}
