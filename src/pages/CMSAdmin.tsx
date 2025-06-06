
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search
} from "lucide-react";
import CMSArticleEditor from "@/components/cms/CMSArticleEditor";
import CMSFAQEditor from "@/components/cms/CMSFAQEditor";
import CMSTestimonialEditor from "@/components/cms/CMSTestimonialEditor";
import CMSContentEditor from "@/components/cms/CMSContentEditor";

const CMSAdmin = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleNewItem = () => {
    setEditingItem(null);
    setShowEditor(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration CMS - HealthyIMC
          </h1>
          <p className="text-gray-600">
            Gérez le contenu de votre site calculateur IMC
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
              <Button onClick={handleNewItem} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouveau
              </Button>
            </div>

            <TabsContent value="articles">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Articles de Blog</CardTitle>
                    <CardDescription>
                      Gérez les articles de votre blog santé et IMC
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Exemple d'articles */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">Comment calculer son IMC efficacement</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Guide complet pour comprendre et calculer votre indice de masse corporelle...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">Santé</Badge>
                            <Badge variant="outline">Publié</Badge>
                            <span className="text-xs text-gray-500">12 Jan 2024</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditItem({})}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">Comment calculer son IMC ?</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          L'IMC se calcule en divisant votre poids...
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">Calcul</Badge>
                          <Badge variant="outline">Publié</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem({})}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">Marie L.</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          "Grâce à ce calculateur d'IMC, j'ai pu suivre..."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">5 étoiles</Badge>
                          <Badge variant="outline">Publié</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem({})}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">Titre page d'accueil</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Calculateur IMC Gratuit en Ligne
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">Homepage</Badge>
                          <Badge variant="outline">Actif</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem({})}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
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
