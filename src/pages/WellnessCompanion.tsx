
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge, Heart, Dumbbell, Leaf } from "lucide-react";
import SEO from "@/components/SEO";
import WellnessFeatures from "@/components/WellnessFeatures";
import AdSense from "@/components/AdSense";

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
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
        {/* AdSense en haut */}
        <div className="mb-8 flex justify-center">
          <AdSense 
            adSlot="1111111111"
            adFormat="horizontal"
            className="max-w-4xl"
            style={{ minHeight: '100px' }}
          />
        </div>
        
        <Card className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">Wellness Companion AI</h1>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-sm">
              <Badge className="w-4 h-4" />
              <span>Beta</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
              <Heart className="w-8 h-8 mb-2 text-pink-200" />
              <h3 className="font-semibold mb-1">Suivi Santé</h3>
              <p className="text-sm opacity-80">Suivez votre progression et recevez des conseils personnalisés</p>
            </Card>
            <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
              <Dumbbell className="w-8 h-8 mb-2 text-blue-200" />
              <h3 className="font-semibold mb-1">Activité Physique</h3>
              <p className="text-sm opacity-80">Programmes d'exercices adaptés à votre niveau</p>
            </Card>
            <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
              <Leaf className="w-8 h-8 mb-2 text-green-200" />
              <h3 className="font-semibold mb-1">Bien-être Mental</h3>
              <p className="text-sm opacity-80">Méditation et exercices de respiration guidés</p>
            </Card>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 backdrop-blur-lg bg-white/10 p-6 rounded-lg">
            <div>
              <Label htmlFor="age" className="text-white">Âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="Entrez votre âge"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="activity" className="text-white">Niveau d'activité</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="bg-white/20 border-white/20 text-white">
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
              <Label htmlFor="goals" className="text-white">Objectifs de santé</Label>
              <Input
                id="goals"
                placeholder="ex: Perdre du poids, Gagner en muscle"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <Button 
              type="submit" 
              variant="secondary" 
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Analyser ma santé
            </Button>
          </form>

          {result && (
            <div className="mt-6 p-4 rounded-lg bg-white/10 backdrop-blur-lg text-white animate-fade-in">
              {result}
            </div>
          )}

          <WellnessFeatures />
        </Card>
        
        {/* AdSense en bas */}
        <div className="mt-8 flex justify-center">
          <AdSense 
            adSlot="1212121212"
            adFormat="auto"
            className="max-w-2xl"
            style={{ minHeight: '200px' }}
          />
        </div>
      </div>
    </>
  );
};

export default WellnessCompanion;
