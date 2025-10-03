
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search, Send, ArrowRight, Home, Heart, User as UserIcon } from "lucide-react";
import { CMSService } from "@/services/cmsService";
import { CMSArticle } from "@/types/cms";

const BlogContent = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

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

  const categories = ["Tous", ...Array.from(new Set(articles.map(article => article.category)))];
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCommentSubmit = (articleId: string) => {
    if (commentInputs[articleId]?.trim()) {
      console.log("Commentaire envoyé:", commentInputs[articleId]);
      setCommentInputs({ ...commentInputs, [articleId]: "" });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-24" />
          <div className="w-10" />
        </header>
        <main className="p-4">
          <Skeleton className="h-12 w-full rounded-full mb-4" />
          <div className="flex gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-card">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b p-4 pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="flex-1 text-center text-lg font-bold">Blog</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher des articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full border-input bg-muted/50 focus-visible:ring-primary"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center shadow-sm">
            <p className="text-muted-foreground">
              {articles.length === 0 
                ? "Aucun article publié pour le moment." 
                : searchQuery 
                ? "Aucun article trouvé pour cette recherche."
                : "Aucun article dans cette catégorie."}
            </p>
          </div>
        ) : (
          <div className="space-y-6 pb-20">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border"
              >
                {/* Article Image */}
                {article.featured_image && (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="flex flex-col gap-2 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {article.category}
                  </p>
                  <h2 className="text-lg font-bold leading-tight">{article.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt 
                      ? truncateText(article.excerpt, 120)
                      : article.content 
                        ? truncateText(article.content.replace(/<[^>]*>/g, ""), 120)
                        : "Découvrez cet article sur la santé et le bien-être."}
                  </p>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  >
                    Lire la suite
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Comments Section */}
                <div className="border-t border-border p-4">
                  <h3 className="mb-4 text-base font-bold">Commentaires (0)</h3>
                  
                  {/* Comment Input */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Laissez un commentaire..."
                      value={commentInputs[article.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [article.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCommentSubmit(article.id);
                      }}
                      className="flex-1 rounded-full border-input bg-muted/50 text-sm focus-visible:ring-primary"
                    />
                    <Button
                      size="icon"
                      onClick={() => handleCommentSubmit(article.id)}
                      className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 z-10 border-t border-border bg-background/80 backdrop-blur-sm">
        <nav className="flex h-16 items-center justify-around px-2">
          <Link
            to="/"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-5 w-5" />
            <p className="text-xs font-medium">Accueil</p>
          </Link>
          <Link
            to="/blog"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-primary"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xs font-medium">Blog</p>
          </Link>
          <Link
            to="/shop"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="h-5 w-5" />
            <p className="text-xs font-medium">Services</p>
          </Link>
          <Link
            to="/about"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <UserIcon className="h-5 w-5" />
            <p className="text-xs font-medium">Profil</p>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default BlogContent;
