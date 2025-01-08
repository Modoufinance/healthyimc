import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generateBlogPost } from "@/services/blogService";
import { Input } from "@/components/ui/input";

interface BlogPost {
  title: string;
  content: string;
  date: string;
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Blog Santé & Bien-être
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <Input
                type="password"
                placeholder="Entrez votre clé API Perplexity"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
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

export default Blog;