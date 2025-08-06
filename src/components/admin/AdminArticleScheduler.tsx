import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon,
  Clock,
  Edit,
  Trash2,
  Eye,
  Plus,
  Send,
  Timer,
  CheckCircle,
  AlertCircle,
  Wand2
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ScheduledArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledDate: Date;
  author: string;
  tags: string[];
}

const AdminArticleScheduler = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<ScheduledArticle[]>([]);
  const [showNewArticle, setShowNewArticle] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    category: '',
    scheduledDate: new Date(),
    tags: [] as string[]
  });

  useEffect(() => {
    // Simuler des articles programmés
    setArticles([
      {
        id: '1',
        title: 'Les bienfaits de l\'exercice physique sur l\'IMC',
        excerpt: 'Découvrez comment l\'activité physique influence votre indice de masse corporelle...',
        category: 'Fitness',
        status: 'scheduled',
        scheduledDate: new Date(Date.now() + 86400000), // Demain
        author: 'Dr. Martin',
        tags: ['IMC', 'Exercice', 'Santé']
      },
      {
        id: '2',
        title: 'Nutrition et perte de poids : Guide complet',
        excerpt: 'Un guide détaillé sur l\'alimentation équilibrée pour atteindre un IMC optimal...',
        category: 'Nutrition',
        status: 'draft',
        scheduledDate: new Date(Date.now() + 172800000), // Après-demain
        author: 'Nutritionniste Sophie',
        tags: ['Nutrition', 'Perte de poids', 'IMC']
      },
      {
        id: '3',
        title: 'IMC et métabolisme : Ce qu\'il faut savoir',
        excerpt: 'Comprendre la relation entre votre métabolisme et votre indice de masse corporelle...',
        category: 'Médical',
        status: 'published',
        scheduledDate: new Date(Date.now() - 86400000), // Hier
        author: 'Dr. Claire',
        tags: ['Métabolisme', 'IMC', 'Santé']
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'scheduled': return <Timer className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleScheduleArticle = () => {
    const article: ScheduledArticle = {
      id: Date.now().toString(),
      ...newArticle,
      status: 'scheduled',
      author: 'Admin'
    };

    setArticles(prev => [...prev, article]);
    setNewArticle({
      title: '',
      excerpt: '',
      category: '',
      scheduledDate: new Date(),
      tags: []
    });
    setShowNewArticle(false);

    toast({
      title: "Article programmé",
      description: `L'article sera publié le ${format(article.scheduledDate, 'dd MMMM yyyy à HH:mm', { locale: fr })}`,
    });
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré de la programmation",
    });
  };

  const handlePublishNow = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, status: 'published', scheduledDate: new Date() }
        : article
    ));
    toast({
      title: "Article publié",
      description: "L'article a été publié immédiatement",
    });
  };

  const generateWithAI = async () => {
    toast({
      title: "Génération IA",
      description: "Génération d'un article avec l'IA...",
    });
    
    // Simuler la génération d'article avec IA
    setTimeout(() => {
      setNewArticle({
        title: 'Comment calculer son IMC idéal selon son âge',
        excerpt: 'Un guide personnalisé pour déterminer votre IMC optimal en fonction de votre profil unique...',
        category: 'Guide',
        scheduledDate: new Date(Date.now() + 86400000),
        tags: ['IMC', 'Calcul', 'Personnalisé']
      });
      toast({
        title: "Article généré",
        description: "L'IA a créé un brouillon d'article",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec boutons d'action */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Articles Programmés</h3>
          <p className="text-sm text-muted-foreground">
            Gérez la publication automatique de vos articles
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateWithAI}>
            <Wand2 className="h-4 w-4 mr-2" />
            Générer avec IA
          </Button>
          <Button onClick={() => setShowNewArticle(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Programmer Article
          </Button>
        </div>
      </div>

      {/* Formulaire de nouvel article */}
      {showNewArticle && (
        <Card>
          <CardHeader>
            <CardTitle>Programmer un Nouvel Article</CardTitle>
            <CardDescription>
              Créez et programmez la publication de votre article
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre</label>
                <Input
                  placeholder="Titre de l'article"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Catégorie</label>
                <Select 
                  value={newArticle.category} 
                  onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="medical">Médical</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Extrait</label>
              <Textarea
                placeholder="Résumé de l'article"
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date de publication</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleScheduleArticle} disabled={!newArticle.title || !newArticle.category}>
                <Timer className="h-4 w-4 mr-2" />
                Programmer
              </Button>
              <Button variant="outline" onClick={() => setShowNewArticle(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des articles programmés */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{article.title}</h4>
                    <Badge className={getStatusColor(article.status)}>
                      {getStatusIcon(article.status)}
                      {article.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Par {article.author}</span>
                    <span>Catégorie: {article.category}</span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {format(article.scheduledDate, 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mt-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {article.status === 'scheduled' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePublishNow(article.id)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun article programmé</h3>
            <p className="text-muted-foreground">
              Commencez par programmer votre premier article
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminArticleScheduler;