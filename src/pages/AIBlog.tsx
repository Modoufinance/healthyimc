import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface BlogPost {
  title: string;
  content: string;
  date: string;
}

const AIBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      title: "Comprendre l'IMC",
      content: "L'Indice de Masse Corporelle est un indicateur simple pour évaluer si votre poids est adapté à votre taille. Il est largement utilisé par les professionnels de santé.",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Pourquoi maintenir un IMC sain ?",
      content: "Un IMC équilibré réduit les risques de maladies chroniques comme le diabète, l'hypertension et les maladies cardiaques.",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Conseils pour améliorer votre IMC",
      content: "Adoptez une alimentation équilibrée, pratiquez une activité physique régulière et consultez un professionnel de santé pour des conseils personnalisés.",
      date: new Date().toLocaleDateString()
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewPost = async () => {
    setIsGenerating(true);
    try {
      // Simulation de génération de contenu (à remplacer par l'appel API réel)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPost = {
        title: "Nouveautés en matière de santé",
        content: "De nouvelles recherches montrent l'importance d'une approche holistique de la santé, combinant activité physique, alimentation équilibrée et bien-être mental.",
        date: new Date().toLocaleDateString()
      };
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      toast({
        title: "Nouvel article généré",
        description: "Un nouvel article a été ajouté au blog avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer un nouvel article pour le moment.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#4facfe]">
              Blog Santé & Bien-être
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Button
                onClick={generateNewPost}
                disabled={isGenerating}
                className="bg-[#4facfe] hover:bg-[#00f2fe] transition-colors"
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
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIBlog;