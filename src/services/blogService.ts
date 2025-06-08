
import { toast } from "@/hooks/use-toast";
import { AIContentService } from "./aiContentService";
import { CMSService } from "./cmsService";

interface BlogPost {
  title: string;
  content: string;
  date: string;
}

export const generateBlogPost = async (apiKey: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en santé qui écrit des articles de blog en français sur la santé, le bien-être et l\'IMC. Génère un article informatif et engageant.'
          },
          {
            role: 'user',
            content: 'Génère un article de blog sur la santé et le bien-être.'
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extraire le titre des premiers mots du contenu
    const title = content.split('.')[0];
    const articleContent = content.split('.').slice(1).join('.');

    return {
      title,
      content: articleContent,
      date: new Date().toLocaleDateString('fr-FR')
    };
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    toast({
      title: "Erreur",
      description: "Impossible de générer l'article pour le moment.",
      variant: "destructive",
    });
    return null;
  }
};

// Nouvelles fonctions pour l'intégration IA
export const generateArticleWithAI = async (topic: string, category: string) => {
  try {
    const articleData = await AIContentService.generateFullArticle(topic, category);
    const createdArticle = await CMSService.createArticle(articleData as any);
    
    if (createdArticle) {
      toast({
        title: "Article généré !",
        description: `L'article "${topic}" a été créé avec succès.`,
      });
      return createdArticle;
    }
    return null;
  } catch (error) {
    console.error('Erreur génération article IA:', error);
    toast({
      title: "Erreur",
      description: "Impossible de générer l'article avec l'IA.",
      variant: "destructive",
    });
    return null;
  }
};

export const optimizeArticleWithAI = async (articleId: string) => {
  try {
    const article = await CMSService.getArticle(articleId);
    if (!article) {
      throw new Error('Article non trouvé');
    }

    const optimizations = await AIContentService.optimizeExistingArticle(article);
    const updatedArticle = await CMSService.updateArticle(articleId, optimizations);
    
    if (updatedArticle) {
      toast({
        title: "Article optimisé !",
        description: "L'article a été optimisé pour le SEO avec succès.",
      });
      return updatedArticle;
    }
    return null;
  } catch (error) {
    console.error('Erreur optimisation article IA:', error);
    toast({
      title: "Erreur",
      description: "Impossible d'optimiser l'article avec l'IA.",
      variant: "destructive",
    });
    return null;
  }
};

// Génération automatique de contenu par lot
export const generateBatchArticles = async (topics: string[], category: string) => {
  const results = [];
  
  for (const topic of topics) {
    try {
      const article = await generateArticleWithAI(topic, category);
      if (article) {
        results.push(article);
      }
      
      // Délai pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Erreur pour le sujet ${topic}:`, error);
    }
  }
  
  toast({
    title: "Génération terminée",
    description: `${results.length} article(s) généré(s) sur ${topics.length} demandé(s).`,
  });
  
  return results;
};
