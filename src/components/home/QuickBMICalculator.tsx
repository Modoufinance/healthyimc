
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import BMIResultDisplay from "@/components/BMIResultDisplay";

const QuickBMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters
    
    if (weightNum > 0 && heightNum > 0) {
      const calculatedBMI = Number((weightNum / (heightNum * heightNum)).toFixed(1));
      setBmi(calculatedBMI);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/20 backdrop-blur-lg p-6 rounded-xl">
      <form onSubmit={calculateBMI} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-white">
              Poids (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Ex: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-white/50 placeholder:text-gray-500"
              required
              min="30"
              max="300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-white">
              Taille (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-white/50 placeholder:text-gray-500"
              required
              min="100"
              max="250"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-white/90 text-primary hover:bg-white">
          <Calculator className="mr-2 h-4 w-4" />
          Calculer mon IMC
        </Button>
      </form>

      {bmi && <BMIResultDisplay bmi={bmi} showFullAnalysisButton={true} />}
    </Card>
  );
};

export default QuickBMICalculator;
