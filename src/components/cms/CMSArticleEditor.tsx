
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Save, Eye, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CMSArticle } from "@/types/cms";
import { CMSService } from "@/services/cmsService";

interface CMSArticleEditorProps {
  article?: CMSArticle | null;
  onClose: () => void;
}

const CMSArticleEditor = ({ article, onClose }: CMSArticleEditorProps) => {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    author: article?.author || "",
    category: article?.category || "",
    tags: article?.tags?.join(", ") || "",
    meta_title: article?.meta_title || "",
    meta_description: article?.meta_description || "",
    published: article?.published || false,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.author.trim() || !formData.category.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const articleData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [],
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        published: formData.published,
      };

      let result;
      if (article) {
        result = await CMSService.updateArticle(article.id, articleData);
      } else {
        result = await CMSService.createArticle(articleData);
      }

      if (result) {
        toast({
          title: "Succès",
          description: article ? "Article mis à jour avec succès" : "Article créé avec succès",
        });
        onClose();
      } else {
        throw new Error("Échec de la sauvegarde");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
    
    handleInputChange("slug", slug);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {article ? "Modifier l'article" : "Nouvel article"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Prévisualiser
          </Button>
          <Button onClick={handleSave} size="sm" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'article *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Entrez le titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL (slug) *</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="url-de-larticle"
                />
                <Button variant="outline" onClick={generateSlug}>
                  Générer
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="Résumé de l'article (affiché dans les aperçus)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenu</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Écrivez le contenu de votre article ici..."
                rows={15}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                Vous pouvez utiliser du HTML pour la mise en forme
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Auteur *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Nom de l'auteur"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="Santé, IMC, Nutrition..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                placeholder="imc, santé, poids, séparés par des virgules"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.split(",").filter(tag => tag.trim()).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Image mise en avant</Label>
                  <p className="text-sm text-gray-500">
                    Image principale de l'article
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Publier l'article</Label>
                <p className="text-sm text-gray-500">
                  L'article sera visible sur le site
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => handleInputChange("published", checked)}
              />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Titre SEO</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => handleInputChange("meta_title", e.target.value)}
                placeholder="Titre optimisé pour les moteurs de recherche"
              />
              <p className="text-xs text-gray-500">
                Recommandé: 50-60 caractères ({formData.meta_title.length}/60)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Description SEO</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => handleInputChange("meta_description", e.target.value)}
                placeholder="Description pour les moteurs de recherche"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                Recommandé: 150-160 caractères ({formData.meta_description.length}/160)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Aperçu dans les résultats de recherche</h4>
              <div className="space-y-1">
                <div className="text-blue-600 text-lg">
                  {formData.meta_title || formData.title || "Titre de l'article"}
                </div>
                <div className="text-green-600 text-sm">
                  healthyimc.com/blog/{formData.slug || "url-article"}
                </div>
                <div className="text-gray-600 text-sm">
                  {formData.meta_description || formData.excerpt || "Description de l'article..."}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CMSArticleEditor;
