
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Share2, ExternalLink } from "lucide-react";
import { generateBlogPost } from "@/services/blogService";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

interface BlogPost {
  title: string;
  content: string;
  date: string;
  author?: string;
  sourceUrl?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      title: "Comprendre l'IMC",
      content: "L'Indice de Masse Corporelle est un indicateur simple pour évaluer si votre poids est adapté à votre taille. Il est largement utilisé par les professionnels de santé.",
      date: new Date().toLocaleDateString('fr-FR')
    },
    {
      title: "Pourquoi maintenir un IMC sain ?",
      content: "Un IMC équilibré réduit les risques de maladies chroniques comme le diabète, l'hypertension et les maladies cardiaques.",
      date: new Date().toLocaleDateString('fr-FR')
    },
    {
      title: "Les bienfaits d'une alimentation équilibrée sur l'IMC",
      content: "Article invité par Dr. Sophie Martin, nutritionniste. Une alimentation équilibrée est essentielle pour maintenir un IMC sain...",
      date: new Date().toLocaleDateString('fr-FR'),
      author: "Dr. Sophie Martin",
      sourceUrl: "https://nutrition-sante.fr/imc-alimentation"
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!apiKey) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre clé API Perplexity",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const newPost = await generateBlogPost(apiKey);
      if (newPost) {
        setPosts(prevPosts => [newPost, ...prevPosts]);
        toast({
          title: "Succès",
          description: "Un nouvel article a été généré avec succès.",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + "...",
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Partagé avec succès",
          description: "L'article a été partagé avec succès.",
        });
      }).catch(() => {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du partage.",
          variant: "destructive",
        });
      });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Santé et IMC",
    "description": "Articles sur la santé, le bien-être et l'IMC. Contributions d'experts et professionnels de santé.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
      <SEO
        title="Blog Santé et IMC | Articles d'experts et conseils santé"
        description="Découvrez nos articles sur la santé, l'IMC et le bien-être. Contributions d'experts et conseils de professionnels de santé."
        keywords="blog santé, imc, articles santé, experts santé, bien-être, nutrition"
        structuredData={structuredData}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Blog Santé & Bien-être
            </CardTitle>
          </CardHeader>
          <CardContent>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">Articles invités d'experts</h2>
              <p className="text-gray-600 mb-4">
                Vous êtes un professionnel de santé et souhaitez contribuer ? Contactez-nous pour partager votre expertise.
              </p>
            </section>

            <div className="flex flex-col gap-4 mb-6">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Clé API Perplexity pour la génération d'articles"
                className="max-w-md mx-auto"
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="max-w-md mx-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  "Générer un nouvel article"
                )}
              </Button>
            </div>

            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">
                        {post.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    {post.author && (
                      <p className="text-sm text-primary">Par {post.author}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                    {post.sourceUrl && (
                      <a
                        href={post.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:underline"
                      >
                        Article original
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
