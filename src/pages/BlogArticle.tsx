
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, Tag, Clock, ArrowLeft, Share2 } from "lucide-react";
import { CMSService } from "@/services/cmsService";
import { CMSArticle } from "@/types/cms";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<CMSArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const articles = await CMSService.getPublishedArticles();
        const foundArticle = articles.find(a => a.slug === slug);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
    } catch {
      return "Date non disponible";
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.title,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Lien copié !",
        description: "Le lien de l'article a été copié dans le presse-papier.",
      });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full mb-6" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <>
        <SEO
          title="Article non trouvé | Blog HealthyIMC"
          description="L'article que vous recherchez n'existe pas ou n'est plus disponible."
          canonicalUrl={`https://healthyimc.com/blog/${slug}`}
        />
        <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
            
            <Card className="bg-white/95 backdrop-blur text-center py-12">
              <CardContent>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Article non trouvé
                </h1>
                <p className="text-gray-600 mb-6">
                  L'article que vous recherchez n'existe pas ou n'est plus disponible.
                </p>
                <Button asChild>
                  <Link to="/blog">
                    Voir tous les articles
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt || article.meta_description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.updated_at,
    "publisher": {
      "@type": "Organization",
      "name": "HealthyIMC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://healthyimc.com/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://healthyimc.com/blog/${article.slug}`
    },
    "image": article.featured_image,
    "articleSection": article.category,
    "keywords": article.tags?.join(", ")
  };

  return (
    <>
      <SEO
        title={article.meta_title || `${article.title} | Blog HealthyIMC`}
        description={article.meta_description || article.excerpt || `Découvrez notre article sur ${article.title}. Conseils santé et bien-être par nos experts.`}
        keywords={article.tags?.join(", ") || `${article.category}, santé, bien-être, imc`}
        canonicalUrl={`https://healthyimc.com/blog/${article.slug}`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Article */}
          <Card className="bg-white/95 backdrop-blur overflow-hidden">
            {/* Featured Image */}
            {article.featured_image && (
              <div className="h-64 md:h-80 overflow-hidden">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardHeader className="pb-4">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>5 min de lecture</span>
                </div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4">
                {article.title}
              </CardTitle>

              {/* Tags and Category */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="default" className="bg-[#4facfe] text-white">
                  {article.category}
                </Badge>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg max-w-none">
              {/* Excerpt */}
              {article.excerpt && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-[#4facfe]">
                  <p className="text-gray-700 font-medium italic text-lg leading-relaxed m-0">
                    {article.excerpt}
                  </p>
                </div>
              )}

              {/* Content */}
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />
            </CardContent>
          </Card>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-[#4facfe] hover:bg-[#00f2fe]">
              <Link to="/blog">
                Découvrir plus d'articles
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
