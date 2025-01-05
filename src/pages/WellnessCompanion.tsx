import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Globe, Shield, Database, Beta } from "lucide-react";

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
      <Card className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold">Wellness Companion AI</h1>
          <div className="flex items-center gap-1 bg-background/20 px-2 py-1 rounded-full text-sm">
            <Beta className="w-4 h-4" />
            <span>Beta</span>
          </div>
        </div>
        
        <p className="mb-6">
          Découvrez une façon plus intelligente de gérer votre santé avec des outils et des analyses alimentés par l'IA.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="age" className="text-primary-foreground">Âge</Label>
            <Input
              id="age"
              type="number"
              placeholder="Entrez votre âge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>

          <div>
            <Label htmlFor="activity" className="text-primary-foreground">Niveau d'activité</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger className="bg-background/10 border-primary-foreground/20 text-primary-foreground">
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
            <Label htmlFor="goals" className="text-primary-foreground">Objectifs de santé</Label>
            <Input
              id="goals"
              placeholder="ex: Perdre du poids, Gagner en muscle"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>

          <Button type="submit" variant="secondary" className="w-full">
            Analyser ma santé
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-background/10 text-primary-foreground">
            {result}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Fonctionnalités avancées</h2>
          <ul className="space-y-2">
            <li>• Analyse de santé et recommandations basées sur l'IA</li>
            <li>• Suivi du bien-être en temps réel avec suggestions adaptatives</li>
            <li>• Plans nutritionnels personnalisés selon vos besoins</li>
            <li>• Intégration avec les appareils connectés</li>
            <li>• Exercices de gestion du stress et séances de pleine conscience</li>
          </ul>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <h2 className="text-xl font-bold mb-6">Disponible sur toutes les plateformes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background/10 p-4">
              <div className="flex items-start space-x-4">
                <Smartphone className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold mb-2">Applications Mobiles</h3>
                  <p className="text-sm">
                    Interface optimisée pour iOS et Android avec synchronisation en temps réel et fonctionnalités tactiles avancées.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-background/10 p-4">
              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold mb-2">Application Web</h3>
                  <p className="text-sm">
                    Accessible depuis n'importe quel navigateur avec une expérience utilisateur fluide et responsive.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-6">Sécurité et Confidentialité Web 3.0</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-background/10 p-4">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Protection des Données</h3>
                    <p className="text-sm">
                      Vos données de santé sont cryptées et sécurisées grâce à la technologie blockchain.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-background/10 p-4">
                <div className="flex items-start space-x-4">
                  <Database className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Stockage Décentralisé</h3>
                    <p className="text-sm">
                      Infrastructure Web 3.0 pour un contrôle total sur vos données personnelles.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WellnessCompanion;