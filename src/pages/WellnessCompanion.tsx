import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "lucide-react";
import SEO from "@/components/SEO";
import WellnessFeatures from "@/components/WellnessFeatures";

const WellnessCompanion = () => {
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("");
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Wellness Companion AI - SantéIMC",
    "applicationCategory": "HealthApplication",
    "description": "Assistant personnel pour votre bien-être utilisant l'intelligence artificielle",
    "url": "https://santeimc.fr/wellness",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  useEffect(() => {
    // Structured data for Google Rich Results
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);

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
    <>
      <SEO
        title="Wellness Companion AI"
        description="Votre compagnon bien-être personnel alimenté par l'IA. Obtenez des recommandations personnalisées pour améliorer votre santé."
        keywords="wellness companion, bien-être ia, santé personnalisée, assistant bien-être, coaching santé"
        canonicalUrl="https://santeimc.fr/wellness"
        structuredData={structuredData}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="bg-primary text-primary-foreground p-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">Wellness Companion AI</h1>
            <div className="flex items-center gap-1 bg-background/20 px-2 py-1 rounded-full text-sm">
              <Badge className="w-4 h-4" />
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

          <WellnessFeatures />
        </Card>
      </div>
    </>
  );
};

export default WellnessCompanion;
