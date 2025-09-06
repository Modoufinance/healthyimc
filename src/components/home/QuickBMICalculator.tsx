
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
    <Card className="w-full max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      <form onSubmit={calculateBMI} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="weight" className="text-white font-medium flex items-center gap-3 text-lg">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M13 9h5v5"/><path d="M13 15h5v-5"/><path d="M6 9v6"/><path d="M9 6h6"/><path d="M9 18h6"/></svg>
              </div>
              Poids (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Ex: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-white/70 placeholder:text-gray-600 border-0 focus:ring-2 focus:ring-white/50 text-gray-800 font-medium py-4 text-lg rounded-xl"
              required
              min="30"
              max="300"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="height" className="text-white font-medium flex items-center gap-3 text-lg">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20v-16"/><path d="M17 20V8"/><path d="M7 8l10 0"/><path d="M7 16l10 0"/></svg>
              </div>
              Taille (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-white/70 placeholder:text-gray-600 border-0 focus:ring-2 focus:ring-white/50 text-gray-800 font-medium py-4 text-lg rounded-xl"
              required
              min="100"
              max="250"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-white text-blue-600 hover:bg-white/90 hover:scale-[1.02] transition-all duration-200 font-semibold py-4 text-lg shadow-lg hover:shadow-xl rounded-xl"
        >
          <Calculator className="mr-3 h-6 w-6" />
          Calculer mon IMC
        </Button>
      </form>

      {bmi && <BMIResultDisplay bmi={bmi} showFullAnalysisButton={true} />}
    </Card>
  );
};

export default QuickBMICalculator;
