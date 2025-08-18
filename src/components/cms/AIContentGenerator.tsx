
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, Sparkles, Target, Zap } from "lucide-react";
import { AIContentService } from "@/services/aiContentService";
import { CMSService } from "@/services/cmsService";
import { CMSArticle } from "@/types/cms";

interface AIContentGeneratorProps {
  onArticleGenerated?: (article: CMSArticle) => void;
  onClose?: () => void;
}

const AIContentGenerator = ({ onArticleGenerated, onClose }: AIContentGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'single' | 'multiple' | 'optimize'>('single');
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState('');
  const [category, setCategory] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<CMSArticle | null>(null);
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const { toast } = useToast();

  const categories = [
    'IMC et Poids',
    'Nutrition',
    'Exercice et Fitness',
    'Santé Générale',
    'Bien-être Mental',
    'Régimes et Perte de Poids'
  ];

  const handleGenerateSingle = async () => {
    if (!topic || !category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const articleData = await AIContentService.generateFullArticle(topic, category);
      const createdArticle = await CMSService.createArticle(articleData as Omit<CMSArticle, 'id' | 'created_at' | 'updated_at'>);
      
      if (createdArticle) {
        toast({
          title: "Article généré !",
          description: `L'article "${topic}" a été créé avec succès.`,
        });
        onArticleGenerated?.(createdArticle);
        setTopic('');
      }
    } catch (error) {
      console.error('Erreur génération:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer l'article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMultiple = async () => {
    if (!topics || !category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const topicList = topics.split('\n').filter(t => t.trim().length > 0);
      const articlesData = await AIContentService.generateMultipleArticles(topicList, category);
      
      let successCount = 0;
      for (const articleData of articlesData) {
        try {
          const createdArticle = await CMSService.createArticle(articleData as Omit<CMSArticle, 'id' | 'created_at' | 'updated_at'>);
          if (createdArticle) successCount++;
        } catch (error) {
          console.error('Erreur création article:', error);
        }
      }

      toast({
        title: "Articles générés !",
        description: `${successCount} article(s) créé(s) avec succès sur ${topicList.length} demandé(s).`,
      });
      
      setTopics('');
    } catch (error) {
      console.error('Erreur génération multiple:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer les articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeArticle = async () => {
    if (!selectedArticle) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un article à optimiser",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const optimizations = await AIContentService.optimizeExistingArticle(selectedArticle);
      const updatedArticle = await CMSService.updateArticle(selectedArticle.id, optimizations);
      
      if (updatedArticle) {
        toast({
          title: "Article optimisé !",
          description: "L'article a été optimisé pour le SEO avec succès.",
        });
        onArticleGenerated?.(updatedArticle);
      }
    } catch (error) {
      console.error('Erreur optimisation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'optimiser l'article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    try {
      const articlesData = await CMSService.getArticles();
      setArticles(articlesData);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-600" />
          Générateur de Contenu IA
        </CardTitle>
        <CardDescription>
          Utilisez l'intelligence artificielle pour créer et optimiser automatiquement vos articles
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="flex gap-4">
          <Button
            variant={mode === 'single' ? 'default' : 'outline'}
            onClick={() => setMode('single')}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Article unique
          </Button>
          <Button
            variant={mode === 'multiple' ? 'default' : 'outline'}
            onClick={() => setMode('multiple')}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Articles multiples
          </Button>
          <Button
            variant={mode === 'optimize' ? 'default' : 'outline'}
            onClick={() => {
              setMode('optimize');
              loadArticles();
            }}
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            Optimiser existant
          </Button>
        </div>

        {/* Single Article Mode */}
        {mode === 'single' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Sujet de l'article</Label>
                <Input
                  id="topic"
                  placeholder="Ex: Comment calculer son IMC correctement"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateSingle} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer l'article
                </>
              )}
            </Button>
          </div>
        )}

        {/* Multiple Articles Mode */}
        {mode === 'multiple' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-multiple">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topics">Sujets des articles (un par ligne)</Label>
              <Textarea
                id="topics"
                placeholder={`Ex:\nLes dangers d'un IMC trop bas\nComment maintenir un poids santé\nL'importance de l'exercice pour l'IMC`}
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                rows={6}
              />
            </div>
            
            <Button 
              onClick={handleGenerateMultiple} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Générer tous les articles
                </>
              )}
            </Button>
          </div>
        )}

        {/* Optimize Mode */}
        {mode === 'optimize' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Article à optimiser</Label>
              <Select onValueChange={(value) => {
                const article = articles.find(a => a.id === value);
                setSelectedArticle(article || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un article" />
                </SelectTrigger>
                <SelectContent>
                  {articles.map((article) => (
                    <SelectItem key={article.id} value={article.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{article.title}</span>
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Publié" : "Brouillon"}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedArticle && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedArticle.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedArticle.excerpt || "Pas d'extrait disponible"}
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{selectedArticle.category}</Badge>
                  {selectedArticle.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleOptimizeArticle} 
              disabled={loading || !selectedArticle}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimisation en cours...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Optimiser pour le SEO
                </>
              )}
            </Button>
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Fonctionnalités IA</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Article unique :</strong> Génère un article complet optimisé SEO</li>
            <li>• <strong>Articles multiples :</strong> Crée plusieurs articles en batch</li>
            <li>• <strong>Optimisation :</strong> Améliore le SEO des articles existants</li>
            <li>• <strong>Auto-génération :</strong> Titre, contenu, meta-données et tags</li>
          </ul>
        </div>

        {onClose && (
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
