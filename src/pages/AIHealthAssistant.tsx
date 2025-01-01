import { useState, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  age: string;
  activity: string;
  goals: string;
}

const AIHealthAssistant = () => {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    activity: "",
    goals: "",
  });
  const [recommendation, setRecommendation] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.age || !formData.activity || !formData.goals) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    let result = "Basé sur vos informations :";

    if (formData.activity === "low") {
      result += " Engagez-vous dans des activités physiques légères comme la marche ou le yoga pour augmenter votre niveau d'énergie.";
    } else if (formData.activity === "moderate") {
      result += " Maintenez votre niveau d'activité actuel et envisagez d'ajouter de la musculation à votre routine.";
    } else {
      result += " Excellent travail ! Maintenez vos niveaux d'activité élevés, mais assurez-vous d'avoir des périodes de récupération adéquates.";
    }

    result += ` Pour atteindre votre objectif "${formData.goals}", une alimentation équilibrée et une routine constante sont essentielles.`;

    setRecommendation(result);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-400">Assistant Bien-être IA</CardTitle>
          <CardDescription className="text-gray-300">
            Découvrez une façon plus intelligente de gérer votre santé avec des outils et des analyses alimentés par l'IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-200">Âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="Entrez votre âge"
                className="bg-gray-900 border-gray-700 text-white"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity" className="text-gray-200">Niveau d'activité</Label>
              <Select
                value={formData.activity}
                onValueChange={(value) => setFormData({ ...formData, activity: value })}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="moderate">Modéré</SelectItem>
                  <SelectItem value="high">Élevé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals" className="text-gray-200">Objectifs de santé</Label>
              <Input
                id="goals"
                placeholder="ex: Perdre du poids, Gagner en muscle"
                className="bg-gray-900 border-gray-700 text-white"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Analyser ma santé
            </Button>
          </form>

          {recommendation && (
            <div className="mt-6 p-4 rounded-lg bg-gray-800 text-teal-300">
              {recommendation}
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Fonctionnalités avancées</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• Analyse de santé et recommandations basées sur l'IA</li>
              <li>• Suivi du bien-être en temps réel avec suggestions adaptatives</li>
              <li>• Plans nutritionnels personnalisés selon vos besoins</li>
              <li>• Intégration avec les appareils connectés</li>
              <li>• Exercices de gestion du stress et séances de pleine conscience</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthAssistant;