import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  content: string;
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comprendre l'IMC et son importance",
    description: "Guide complet sur l'Indice de Masse Corporelle",
    date: "15 Mars 2024",
    content: "L'Indice de Masse Corporelle (IMC) est un outil essentiel pour évaluer votre santé. Découvrez comment il est calculé et ce qu'il signifie pour votre bien-être."
  },
  {
    id: 2,
    title: "Les mythes sur la perte de poids",
    description: "Démêler le vrai du faux",
    date: "14 Mars 2024",
    content: "De nombreux mythes persistent autour de la perte de poids. Nous explorons les faits scientifiques derrière ces croyances populaires."
  },
  {
    id: 3,
    title: "Alimentation équilibrée et IMC",
    description: "Comment maintenir un poids santé",
    date: "13 Mars 2024",
    content: "Une alimentation équilibrée est la clé pour maintenir un IMC sain. Voici les principes fondamentaux à suivre."
  }
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const { toast } = useToast();

  const handleLoadMore = () => {
    toast({
      title: "Chargement des articles",
      description: "De nouveaux articles seront bientôt disponibles.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO 
        title="Blog Santé et IMC"
        description="Découvrez nos articles sur la santé, le bien-être et l'IMC. Des conseils d'experts pour vous aider à maintenir un mode de vie sain."
        keywords="imc, santé, bien-être, perte de poids, nutrition"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Blog Santé</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <p className="text-sm text-gray-600">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleLoadMore}
            className="bg-primary hover:bg-primary/90"
          >
            Charger plus d'articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;