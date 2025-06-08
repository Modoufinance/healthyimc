import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Wand2
} from "lucide-react";
import CMSArticleEditor from "@/components/cms/CMSArticleEditor";
import CMSFAQEditor from "@/components/cms/CMSFAQEditor";
import CMSTestimonialEditor from "@/components/cms/CMSTestimonialEditor";
import CMSContentEditor from "@/components/cms/CMSContentEditor";
import AIContentGenerator from "@/components/cms/AIContentGenerator";
import { CMSService } from "@/services/cmsService";
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent } from "@/types/cms";

const CMSAdmin = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Data states
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [faqs, setFAQs] = useState<CMSFAQ[]>([]);
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [content, setContent] = useState<CMSContent[]>([]);

  // Load data based on active tab
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case "articles":
          const articleData = await CMSService.getArticles();
          setArticles(articleData);
          break;
        case "faq":
          const faqData = await CMSService.getFAQs();
          setFAQs(faqData);
          break;
        case "testimonials":
          const testimonialData = await CMSService.getTestimonials();
          setTestimonials(testimonialData);
          break;
        case "content":
          const contentData = await CMSService.getContent();
          setContent(contentData);
          break;
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  const handleAIGenerate = () => {
    setShowAIGenerator(true);
    setShowEditor(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setShowAIGenerator(false);
    setEditingItem(null);
    loadData(); // Reload data after editing
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      return;
    }

    try {
      let success = false;
      switch (activeTab) {
        case "articles":
          success = await CMSService.deleteArticle(id);
          break;
        case "faq":
          success = await CMSService.deleteFAQ(id);
          break;
        case "testimonials":
          success = await CMSService.deleteTestimonial(id);
          break;
        case "content":
          success = await CMSService.deleteContent(id);
          break;
      }

      if (success) {
        toast({
          title: "Succès",
          description: "Élément supprimé avec succès",
        });
        loadData();
      } else {
        throw new Error("Échec de la suppression");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive",
      });
    }
  };

  const filterItems = (items: any[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration CMS - HealthyIMC
          </h1>
          <p className="text-gray-600">
            Gérez le contenu de votre site calculateur IMC avec l'IA
          </p>
        </div>

        {showEditor ? (
          <div className="mb-6">
            {activeTab === "articles" && (
              <CMSArticleEditor 
                article={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "faq" && (
              <CMSFAQEditor 
                faq={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "testimonials" && (
              <CMSTestimonialEditor 
                testimonial={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "content" && (
              <CMSContentEditor 
                content={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
          </div>
        ) : showAIGenerator ? (
          <div className="mb-6">
            <AIContentGenerator 
              onArticleGenerated={() => loadData()}
              onClose={handleCloseEditor}
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Témoignages
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Contenu
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 mb-4 flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex gap-2">
                {activeTab === "articles" && (
                  <Button onClick={handleAIGenerate} className="flex items-center gap-2" variant="secondary">
                    <Wand2 className="h-4 w-4" />
                    Générateur IA
                  </Button>
                )}
                <Button onClick={handleNewItem} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau
                </Button>
              </div>
            </div>

            <TabsContent value="articles">
              <Card>
                <CardHeader>
                  <CardTitle>Articles de Blog</CardTitle>
                  <CardDescription>
                    Gérez les articles de votre blog santé et IMC
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                  ) : (
                    <div className="space-y-4">
                      {filterItems(articles).map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{article.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {article.excerpt || "Pas d'extrait disponible"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{article.category}</Badge>
                              <Badge variant={article.published ? "default" : "outline"}>
                                {article.published ? "Publié" : "Brouillon"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {formatDate(article.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(article)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(article.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filterItems(articles).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Aucun article trouvé
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Questions Fréquentes</CardTitle>
                  <CardDescription>
                    Gérez les FAQ sur l'IMC et les calculateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                  ) : (
                    <div className="space-y-4">
                      {filterItems(faqs).map((faq) => (
                        <div key={faq.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{faq.question}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {faq.answer.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{faq.category}</Badge>
                              <Badge variant={faq.published ? "default" : "outline"}>
                                {faq.published ? "Publié" : "Brouillon"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Ordre: {faq.order}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(faq)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(faq.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filterItems(faqs).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Aucune FAQ trouvée
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <CardTitle>Témoignages</CardTitle>
                  <CardDescription>
                    Gérez les témoignages clients et success stories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                  ) : (
                    <div className="space-y-4">
                      {filterItems(testimonials).map((testimonial) => (
                        <div key={testimonial.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {testimonial.text.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{testimonial.rating} étoiles</Badge>
                              <Badge variant={testimonial.published ? "default" : "outline"}>
                                {testimonial.published ? "Publié" : "Brouillon"}
                              </Badge>
                              {testimonial.before_weight && testimonial.after_weight && (
                                <span className="text-xs text-gray-500">
                                  {testimonial.before_weight} → {testimonial.after_weight}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(testimonial)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(testimonial.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filterItems(testimonials).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Aucun témoignage trouvé
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu Statique</CardTitle>
                  <CardDescription>
                    Gérez les textes, descriptions et contenu statique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                  ) : (
                    <div className="space-y-4">
                      {filterItems(content).map((contentItem) => (
                        <div key={contentItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{contentItem.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Clé: {contentItem.key}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{contentItem.category}</Badge>
                              <Badge variant="outline">{contentItem.type}</Badge>
                              <Badge variant={contentItem.published ? "default" : "outline"}>
                                {contentItem.published ? "Actif" : "Inactif"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem(contentItem)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(contentItem.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filterItems(content).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Aucun contenu trouvé
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CMSAdmin;
