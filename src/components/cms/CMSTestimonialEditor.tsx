
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Star } from "lucide-react";
import { CMSTestimonial } from "@/types/cms";

interface CMSTestimonialEditorProps {
  testimonial?: CMSTestimonial | null;
  onClose: () => void;
}

const CMSTestimonialEditor = ({ testimonial, onClose }: CMSTestimonialEditorProps) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    text: testimonial?.text || "",
    rating: testimonial?.rating || 5,
    before_weight: testimonial?.before_weight || "",
    after_weight: testimonial?.after_weight || "",
    duration: testimonial?.duration || "",
    published: testimonial?.published || false,
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving testimonial:", formData);
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {testimonial ? "Modifier le témoignage" : "Nouveau témoignage"}
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
          <Label htmlFor="name">Nom du client</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Ex: Marie L."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">Témoignage</Label>
          <Textarea
            id="text"
            value={formData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            placeholder="Le témoignage complet du client..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Note (étoiles)</Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleInputChange("rating", star)}
                className={`p-1 ${
                  star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating}/5 étoiles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="before_weight">Poids avant</Label>
            <Input
              id="before_weight"
              value={formData.before_weight}
              onChange={(e) => handleInputChange("before_weight", e.target.value)}
              placeholder="85kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="after_weight">Poids après</Label>
            <Input
              id="after_weight"
              value={formData.after_weight}
              onChange={(e) => handleInputChange("after_weight", e.target.value)}
              placeholder="68kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="6 mois"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Publier le témoignage</Label>
            <p className="text-sm text-gray-500">
              Le témoignage sera visible sur le site
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

export default CMSTestimonialEditor;
