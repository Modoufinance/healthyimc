
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CMSContent } from "@/types/cms";
import { CMSService } from "@/services/cmsService";

interface CMSContentEditorProps {
  content?: CMSContent | null;
  onClose: () => void;
}

const CMSContentEditor = ({ content, onClose }: CMSContentEditorProps) => {
  const [formData, setFormData] = useState({
    key: content?.key || "",
    title: content?.title || "",
    content: content?.content || "",
    type: content?.type || "text" as 'text' | 'html' | 'json',
    category: content?.category || "",
    published: content?.published || false,
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
    if (!formData.key.trim() || !formData.title.trim() || !formData.content.trim() || !formData.category.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      let result;
      if (content) {
        result = await CMSService.updateContent(content.id, formData);
      } else {
        result = await CMSService.createContent(formData);
      }

      if (result) {
        toast({
          title: "Succès",
          description: content ? "Contenu mis à jour avec succès" : "Contenu créé avec succès",
        });
        onClose();
      } else {
        throw new Error("Échec de la sauvegarde");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le contenu",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {content ? "Modifier le contenu" : "Nouveau contenu"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} size="sm" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="key">Clé unique *</Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => handleInputChange("key", e.target.value)}
              placeholder="homepage_title, about_description..."
              disabled={!!content} // Can't change key when editing
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="Homepage, About, Footer..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Titre descriptif du contenu"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de contenu</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Texte simple</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Contenu *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder={
              formData.type === "json" 
                ? '{"key": "value", "items": [...]}' 
                : formData.type === "html"
                ? "<p>Contenu HTML...</p>"
                : "Contenu texte..."
            }
            rows={8}
            className={formData.type !== "text" ? "font-mono" : ""}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Publier le contenu</Label>
            <p className="text-sm text-gray-500">
              Le contenu sera utilisé sur le site
            </p>
          </div>
          <Switch
            checked={formData.published}
            onCheckedChange={(checked) => handleInputChange("published", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CMSContentEditor;
