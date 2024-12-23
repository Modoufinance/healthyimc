import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) return;

    const bmi = Number((weightNum / (heightNum * heightNum)).toFixed(2));
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight";
      advice = "Consider consulting a healthcare provider for dietary advice.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
      advice = "Maintain your healthy lifestyle!";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      advice = "Consider consulting a healthcare provider for personalized advice.";
    } else {
      category = "Obese";
      advice = "It's important to consult a healthcare provider for personalized guidance.";
    }

    setBmiData({ bmi, category, advice });
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">BMI Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Calculate your Body Mass Index
          </p>
        </div>

        <form onSubmit={calculateBMI} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Calculate BMI
          </Button>
        </form>

        {bmiData && (
          <div className="animate-slide-up">
            <BMIResult bmiData={bmiData} />
            <BMIScale bmi={bmiData.bmi} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default BMICalculator;