import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Scale, Activity, Heart, Brain, Apple } from "lucide-react";
import BMIScale from "./BMIScale";
import BMIResult from "./BMIResult";

export interface BMIData {
  bmi: number;
  category: string;
  advice: string;
}

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const { toast } = useToast();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez entrer des valeurs valides.",
        variant: "destructive",
      });
      return;
    }

    const bmi = Number((weightNum / (heightNum * heightNum)).toFixed(2));
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Insuffisance pondérale";
      advice = "Pensez à consulter un professionnel de santé pour des conseils alimentaires.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Poids normal";
      advice = "Continuez à maintenir un mode de vie sain !";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Surpoids";
      advice = "Un professionnel de santé peut vous aider à établir un programme adapté.";
    } else {
      category = "Obésité";
      advice = "Il est important de consulter un professionnel de santé pour des conseils personnalisés.";
    }

    setBmiData({ bmi, category, advice });
    toast({
      title: "Calcul effectué",
      description: "Votre IMC a été calculé avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-start p-4 gap-6">
      <Card className="w-full max-w-md p-6 space-y-6 backdrop-blur-sm bg-white/95 shadow-xl animate-fade-in">
        <div className="space-y-2 text-center">
          <div className="flex justify-center items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Calculateur d'IMC</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Calculez votre Indice de Masse Corporelle
          </p>
        </div>

        <form onSubmit={calculateBMI} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Poids (kg)</Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                placeholder="ex: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="pl-10"
                required
              />
              <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Taille (cm)</Label>
            <div className="relative">
              <Input
                id="height"
                type="number"
                placeholder="ex: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="pl-10"
                required
              />
              <Scale className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Calculer l'IMC
          </Button>
        </form>

        {bmiData && (
          <div className="animate-slide-up">
            <BMIResult bmiData={bmiData} />
            <BMIScale bmi={bmiData.bmi} />
          </div>
        )}
      </Card>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Conseils Santé</h3>
            <p className="text-sm text-center text-muted-foreground">
              Découvrez des conseils personnalisés pour votre bien-être
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Suivi d'Activité</h3>
            <p className="text-sm text-center text-muted-foreground">
              Suivez vos progrès et votre activité physique
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Apple className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Nutrition</h3>
            <p className="text-sm text-center text-muted-foreground">
              Plans alimentaires et conseils nutritionnels
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Bien-être Mental</h3>
            <p className="text-sm text-center text-muted-foreground">
              Ressources pour votre santé mentale
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;