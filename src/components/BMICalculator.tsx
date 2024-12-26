import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Scale, Activity, Heart, Brain, Apple } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BMIScale from "./BMIScale";
import BMIResult from "./BMIResult";
import BMIChart from "./BMIChart";

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
  const { t } = useLanguage();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Erreur",
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
      advice = "Vous êtes en dessous du poids recommandé. Pensez à consulter un professionnel de santé pour des conseils alimentaires.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Poids normal";
      advice = "Votre poids est dans la plage normale. Continuez à maintenir un mode de vie sain !";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Surpoids";
      advice = "Vous êtes en surpoids. Un professionnel de santé peut vous aider à établir un programme adapté.";
    } else {
      category = "Obésité";
      advice = "Vous êtes en obésité. Il est important de consulter un professionnel de santé pour des conseils personnalisés.";
    }

    setBmiData({ bmi, category, advice });
    toast({
      title: "Calcul effectué",
      description: "Votre IMC a été calculé avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] px-4 py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="w-full max-w-md mx-auto p-4 md:p-6 space-y-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="space-y-2 text-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#4facfe]">
              Calculatrice IMC
            </h1>
            <p className="text-sm text-muted-foreground">
              Calculez votre Indice de Masse Corporelle
            </p>
          </div>

          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Poids (en kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Taille (en cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Ex: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#4facfe] hover:bg-[#00f2fe]">
              Calculer l'IMC
            </Button>
          </form>
        </Card>

        {bmiData && (
          <div className="animate-slide-up">
            <BMIResult bmiData={bmiData} />
            <BMIScale bmi={bmiData.bmi} />
            <BMIChart bmi={bmiData.bmi} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4 animate-slide-up">
          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t("healthAdvice")}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {t("healthAdvice")}
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t("activityTracking")}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {t("activityTracking")}
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Apple className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t("nutrition")}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {t("nutrition")}
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t("mentalWellness")}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {t("mentalWellness")}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
