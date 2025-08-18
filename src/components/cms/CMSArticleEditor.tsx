import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Save, Eye, Upload, Code, Monitor, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CMSArticle } from "@/types/cms";
import { CMSService } from "@/services/cmsService";
import HTMLImporter from "./HTMLImporter";
import ImageUploader from "./ImageUploader";

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
    featured_image: article?.featured_image || "",
    published: article?.published || false,
  });
  const [htmlContent, setHtmlContent] = useState(article?.content || "");
  const [previewMode, setPreviewMode] = useState<"code" | "preview">("code");
  const [showHTMLImporter, setShowHTMLImporter] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    handleInputChange("featured_image", imageUrl || "");
  };

  const handleHtmlChange = (value: string) => {
    setHtmlContent(value);
    handleInputChange("content", value);
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
        content: htmlContent,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [],
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        featured_image: formData.featured_image,
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
      .replace(/^-+|-+$/g, '');
    
    handleInputChange("slug", slug);
  };

  const insertHtmlTemplate = (template: string) => {
    const templates = {
      table: `
<div class="overflow-x-auto my-6">
  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-2 text-left">En-tête 1</th>
        <th class="border border-gray-300 px-4 py-2 text-left">En-tête 2</th>
        <th class="border border-gray-300 px-4 py-2 text-left">En-tête 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-2">Cellule 1</td>
        <td class="border border-gray-300 px-4 py-2">Cellule 2</td>
        <td class="border border-gray-300 px-4 py-2">Cellule 3</td>
      </tr>
    </tbody>
  </table>
</div>`,
      callout: `
<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-blue-800">Information importante</h3>
      <div class="mt-2 text-sm text-blue-700">
        <p>Votre contenu d'information ici...</p>
      </div>
    </div>
  </div>
</div>`,
      iframe: `
<div class="my-6">
  <iframe 
    src="https://example.com" 
    width="100%" 
    height="400" 
    frameborder="0" 
    class="rounded-lg shadow-lg">
  </iframe>
</div>`,
      grid: `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-2">Titre 1</h3>
    <p class="text-gray-600">Votre contenu ici...</p>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-2">Titre 2</h3>
    <p class="text-gray-600">Votre contenu ici...</p>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-2">Titre 3</h3>
    <p class="text-gray-600">Votre contenu ici...</p>
  </div>
</div>`
    };
    
    const templateContent = templates[template as keyof typeof templates];
    if (templateContent) {
      setHtmlContent(prev => prev + templateContent);
      handleInputChange("content", htmlContent + templateContent);
    }
  };

  const handleHTMLImport = (importedData: {
    title: string;
    content: string;
    excerpt?: string;
  }) => {
    // Remplir automatiquement les champs avec les données importées
    setFormData(prev => ({
      ...prev,
      title: importedData.title || prev.title,
      excerpt: importedData.excerpt || prev.excerpt,
      content: importedData.content,
    }));
    
    setHtmlContent(importedData.content);
    
    // Générer automatiquement le slug si un titre a été importé
    if (importedData.title && !formData.slug) {
      const slug = importedData.title
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
        .replace(/^-+|-+$/g, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
    
    setShowHTMLImporter(false);
    
    toast({
      title: "Import réussi",
      description: "L'article HTML a été importé. Vérifiez les informations avant de sauvegarder.",
    });
  };

  if (showHTMLImporter) {
    return (
      <HTMLImporter
        onImport={handleHTMLImport}
        onClose={() => setShowHTMLImporter(false)}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {article ? "Modifier l'article" : "Nouvel article"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowHTMLImporter(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Importer HTML
          </Button>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="html">HTML Personnalisé</TabsTrigger>
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
                Vous pouvez utiliser du HTML pour la mise en forme. Pour plus d'options, utilisez l'onglet "HTML Personnalisé".
              </p>
            </div>
          </TabsContent>

          <TabsContent value="html" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg font-semibold">Éditeur HTML Avancé</Label>
                  <p className="text-sm text-gray-500">
                    Ajoutez ici votre contenu HTML personnalisé. Ce champ permet de rédiger ou coller directement du code HTML pour un contrôle total sur la mise en forme de vos articles.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={previewMode === "code" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("code")}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    variant={previewMode === "preview" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("preview")}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Aperçu
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Modèles HTML prêts à utiliser</Label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => insertHtmlTemplate("table")}
                  >
                    Tableau
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => insertHtmlTemplate("callout")}
                  >
                    Encadré Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => insertHtmlTemplate("iframe")}
                  >
                    iFrame
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => insertHtmlTemplate("grid")}
                  >
                    Grille 3 colonnes
                  </Button>
                </div>
              </div>

              {previewMode === "code" ? (
                <div className="space-y-2">
                  <Label htmlFor="htmlContent">Code HTML</Label>
                  <Textarea
                    id="htmlContent"
                    value={htmlContent}
                    onChange={(e) => handleHtmlChange(e.target.value)}
                    placeholder="<div class='my-custom-content'>
  <h2>Mon titre personnalisé</h2>
  <p>Mon contenu avec <strong>mise en forme</strong> avancée.</p>
  <div class='bg-blue-100 p-4 rounded'>
    Bloc stylisé personnalisé
  </div>
</div>"
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    Idéal pour intégrer des éléments avancés comme des tableaux, iframes, ou blocs stylisés. Utilisez les classes Tailwind CSS pour le style.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Aperçu du rendu HTML</Label>
                  <div 
                    className="border rounded-lg p-4 bg-white min-h-[400px] prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                  <p className="text-xs text-gray-500">
                    Ceci est un aperçu de votre contenu HTML. Basculez vers "Code" pour modifier.
                  </p>
                </div>
              )}
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

            <ImageUploader
              currentImage={formData.featured_image}
              onImageChange={handleImageChange}
            />

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
