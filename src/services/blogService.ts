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
            content: "Tu es un expert en santé qui écrit des articles de blog en français sur la santé, le bien-être et l'IMC. Génère un article informatif et engageant avec un titre clair et un contenu structuré."
          },
          {
            role: 'user',
            content: "Génère un article de blog sur la santé et le bien-être, en mettant l'accent sur l'IMC et la santé globale."
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la génération de l'article");
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Format de réponse invalide");
    }

    const content = data.choices[0].message.content;
    const lines = content.split('\n');
    const title = lines[0].replace(/^#\s*/, ''); // Enlève le # si présent
    const articleContent = lines.slice(1).join('\n').trim();

    return {
      title,
      content: articleContent,
      date: new Date().toLocaleDateString('fr-FR')
    };
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    toast({
      title: "Erreur",
      description: error instanceof Error ? error.message : "Impossible de générer l'article pour le moment.",
      variant: "destructive",
    });
    return null;
  }
};