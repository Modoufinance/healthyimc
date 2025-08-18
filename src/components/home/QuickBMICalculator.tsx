
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
    <Card className="w-full max-w-lg mx-auto bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30">
      <form onSubmit={calculateBMI} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-white font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12"/><path d="M18.75 14L18 22H6l-.75-8H18.75Z"/><path d="M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><rect width="18" height="3" x="3" y="5" rx="1"/></svg>
              Poids (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Ex: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-white/50 placeholder:text-gray-500 border-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/30"
              required
              min="30"
              max="300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-white font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M18 20V9"/><path d="M6 20V9"/><path d="M18 9a6 6 0 0 0-6-6 6 6 0 0 0-6 6"/></svg>
              Taille (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-white/50 placeholder:text-gray-500 border-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/30"
              required
              min="100"
              max="250"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-white/90 text-primary hover:bg-white hover:scale-[1.02] transition-all duration-200 font-semibold py-6 text-lg shadow-lg hover:shadow-xl"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculer mon IMC
        </Button>
      </form>

      {bmi && <BMIResultDisplay bmi={bmi} showFullAnalysisButton={true} />}
    </Card>
  );
};

export default QuickBMICalculator;
