
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, Tag, Clock } from "lucide-react";
import { CMSService } from "@/services/cmsService";
import { CMSArticle } from "@/types/cms";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BlogContent = () => {
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const publishedArticles = await CMSService.getPublishedArticles();
        setArticles(publishedArticles);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = ["all", ...Array.from(new Set(articles.map(article => article.category)))];
  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
    } catch {
      return "Date non disponible";
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Blog Santé & Bien-être
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Découvrez nos articles et conseils d'experts sur la santé, l'IMC, la nutrition et le bien-être
          </p>
        </div>

        {/* Filtres par catégorie */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-white text-[#4facfe]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {category === "all" ? "Tous les articles" : category}
              </Button>
            ))}
          </div>
        )}

        {/* Articles */}
        {filteredArticles.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <p className="text-gray-600">
                {articles.length === 0 
                  ? "Aucun article publié pour le moment." 
                  : "Aucun article dans cette catégorie."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden bg-white/95 backdrop-blur hover:shadow-lg transition-all duration-300 hover:scale-105">
                {article.featured_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(article.published_at || article.created_at)}
                    </span>
                    <User className="w-4 h-4 ml-2" />
                    <span>{article.author}</span>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                    {article.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {article.tags.slice(0, 2).join(", ")}
                          {article.tags.length > 2 && "..."}
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.excerpt 
                      ? truncateText(article.excerpt, 120)
                      : article.content 
                        ? truncateText(article.content.replace(/<[^>]*>/g, ""), 120)
                        : "Aucun extrait disponible"}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>5 min de lecture</span>
                    </div>
                    
                    <Button 
                      asChild
                      size="sm" 
                      className="bg-[#4facfe] hover:bg-[#00f2fe] transition-colors"
                    >
                      <Link to={`/blog/${article.slug}`}>
                        Lire l'article
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContent;
