
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save } from "lucide-react";
import { CMSFAQ } from "@/types/cms";

interface CMSFAQEditorProps {
  faq?: CMSFAQ | null;
  onClose: () => void;
}

const CMSFAQEditor = ({ faq, onClose }: CMSFAQEditorProps) => {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "",
    order: faq?.order || 0,
    published: faq?.published || false,
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving FAQ:", formData);
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {faq ? "Modifier la FAQ" : "Nouvelle FAQ"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={formData.question}
            onChange={(e) => handleInputChange("question", e.target.value)}
            placeholder="Entrez la question fréquente"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Réponse</Label>
          <Textarea
            id="answer"
            value={formData.answer}
            onChange={(e) => handleInputChange("answer", e.target.value)}
            placeholder="Réponse détaillée à la question"
            rows={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="Calcul, Santé, Général..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Ordre d'affichage</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 0)}
              placeholder="1, 2, 3..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Publier la FAQ</Label>
            <p className="text-sm text-gray-500">
              La question sera visible sur le site
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

export default CMSFAQEditor;
