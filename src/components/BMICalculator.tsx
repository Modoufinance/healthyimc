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
        title: "Error",
        description: "Please enter valid values.",
        variant: "destructive",
      });
      return;
    }

    const bmi = Number((weightNum / (heightNum * heightNum)).toFixed(2));
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = t("categories").underweight;
      advice = t("advice").underweight;
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = t("categories").normal;
      advice = t("advice").normal;
    } else if (bmi >= 25 && bmi < 29.9) {
      category = t("categories").overweight;
      advice = t("advice").overweight;
    } else {
      category = t("categories").obese;
      advice = t("advice").obese;
    }

    setBmiData({ bmi, category, advice });
    toast({
      title: t("calculate"),
      description: "Success",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 px-4 py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="w-full max-w-md mx-auto p-4 md:p-6 space-y-6 backdrop-blur-sm bg-white/95 shadow-xl animate-fade-in">
          <div className="space-y-2 text-center">
            <div className="flex justify-center items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">{t("title")}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">{t("weight")}</Label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("weightPlaceholder")}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-10"
                  required
                />
                <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">{t("height")}</Label>
              <div className="relative">
                <Input
                  id="height"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("heightPlaceholder")}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="pl-10"
                  required
                />
                <Scale className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {t("calculate")}
            </Button>
          </form>

          {bmiData && (
            <div className="animate-slide-up">
              <BMIResult bmiData={bmiData} />
              <BMIScale bmi={bmiData.bmi} />
            </div>
          )}
        </Card>

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