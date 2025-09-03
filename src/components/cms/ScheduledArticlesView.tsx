import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Edit, Trash, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CMSArticle } from "@/types/cms";
import { CMSService } from "@/services/cmsService";

interface ScheduledArticlesViewProps {
  onEdit: (article: CMSArticle) => void;
}

const ScheduledArticlesView = ({ onEdit }: ScheduledArticlesViewProps) => {
  const [scheduledArticles, setScheduledArticles] = useState<CMSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchScheduledArticles = async () => {
    setLoading(true);
    try {
      const articles = await CMSService.getScheduledArticles();
      setScheduledArticles(articles);
    } catch (error) {
      console.error('Error fetching scheduled articles:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les articles programmés",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article programmé ?")) {
      return;
    }

    try {
      await CMSService.deleteArticle(id);
      toast({
        title: "Succès",
        description: "Article supprimé avec succès",
      });
      fetchScheduledArticles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    }
  };

  const handlePublishNow = async (article: CMSArticle) => {
    try {
      await CMSService.updateArticle(article.id, {
        published: true,
        published_at: new Date().toISOString(),
        scheduled_at: null
      });
      
      toast({
        title: "Succès",
        description: "Article publié immédiatement",
      });
      fetchScheduledArticles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de publier l'article",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (scheduledAt: string) => {
    return new Date(scheduledAt) < new Date();
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Articles programmés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  if (scheduledArticles.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Articles programmés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Aucun article programmé</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Articles programmés ({scheduledArticles.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledArticles.map((article) => (
            <div 
              key={article.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  {isOverdue(article.scheduled_at!) && (
                    <Badge variant="destructive" className="text-xs">
                      En retard
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(article.scheduled_at!)}
                    </span>
                  </div>
                  <Badge variant="secondary">{article.category}</Badge>
                  <span>Par {article.author}</span>
                </div>
                
                {article.excerpt && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePublishNow(article)}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Publier maintenant
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(article)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(article.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Publication automatique
              </h4>
              <p className="text-sm text-blue-700">
                Les articles programmés sont automatiquement publiés à la date et heure spécifiées. 
                Vous pouvez les publier manuellement avant cette date si nécessaire.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledArticlesView;