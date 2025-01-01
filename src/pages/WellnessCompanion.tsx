import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const WellnessCompanion = () => {
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("");
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || !activity || !goals) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    let recommendation = "Basé sur vos informations :";

    if (activity === "low") {
      recommendation += " Engagez-vous dans des activités physiques légères comme la marche ou le yoga pour augmenter votre niveau d'énergie.";
    } else if (activity === "moderate") {
      recommendation += " Maintenez votre niveau d'activité actuel et envisagez d'ajouter de la musculation à votre routine.";
    } else {
      recommendation += " Excellent travail ! Maintenez vos niveaux d'activité élevés, mais assurez-vous d'avoir des périodes de récupération adéquates.";
    }

    recommendation += ` Pour atteindre votre objectif "${goals}", une alimentation équilibrée et une routine constante sont essentielles.`;

    setResult(recommendation);
    toast({
      title: "Analyse complétée",
      description: "Vos recommandations sont prêtes !",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Wellness Companion AI</h1>
        <p className="text-gray-300 mb-6">
          Découvrez une façon plus intelligente de gérer votre santé avec des outils et des analyses alimentés par l'IA.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="age" className="text-gray-200">Âge</Label>
            <Input
              id="age"
              type="number"
              placeholder="Entrez votre âge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="activity" className="text-gray-200">Niveau d'activité</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="moderate">Modéré</SelectItem>
                <SelectItem value="high">Élevé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="goals" className="text-gray-200">Objectifs de santé</Label>
            <Input
              id="goals"
              placeholder="ex: Perdre du poids, Gagner en muscle"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Analyser ma santé
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-800 text-teal-300">
            {result}
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
      </Card>
    </div>
  );
};

export default WellnessCompanion;