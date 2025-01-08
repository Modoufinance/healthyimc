import { toast } from "@/hooks/use-toast";

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