
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Timer, Scale } from "lucide-react";
import BMIResultDisplay from "@/components/BMIResultDisplay";

const QuickBMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [quickBMI, setQuickBMI] = useState<number | null>(null);
  const { toast } = useToast();

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des valeurs valides.",
        variant: "destructive",
      });
      return;
    }
    
    const heightInMeters = heightNum / 100;
    const bmi = Number((weightNum / (heightInMeters * heightInMeters)).toFixed(1));
    setQuickBMI(bmi);
    
    toast({
      title: "Calcul rapide effectué",
      description: "Pour une analyse complète, utilisez notre calculateur détaillé.",
    });
  };

  return (
    <div className="mt-10 bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl" aria-labelledby="bmi-calculator-heading">
      <div className="flex items-center mb-4 gap-2">
        <Scale className="text-white h-6 w-6 animate-pulse" aria-hidden="true" />
        <h2 id="bmi-calculator-heading" className="text-xl font-bold text-white">Découvrez votre IMC en 30 secondes</h2>
      </div>
      
      <form onSubmit={handleQuickCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quick-weight" className="text-white">Poids (kg)</Label>
          <Input 
            id="quick-weight" 
            name="weight"
            type="number" 
            placeholder="Ex: 70" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-white/30 text-white placeholder:text-white/70 border-white/30 hover:scale-[1.02] transition-transform"
            required
            aria-required="true"
            min="30"
            max="300"
          />
        </div>
        <div>
          <Label htmlFor="quick-height" className="text-white">Taille (cm)</Label>
          <Input 
            id="quick-height" 
            name="height"
            type="number" 
            placeholder="Ex: 175" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-white/30 text-white placeholder:text-white/70 border-white/30 hover:scale-[1.02] transition-transform"
            required
            aria-required="true"
            min="100"
            max="250"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-bold py-2 shadow-lg sm:col-span-2 hover:scale-[1.02] transition-transform"
        >
          <span className="sr-only">Calculer votre indice de masse corporelle</span>
          Calcul IMC Express
        </Button>
      </form>
      
      {quickBMI && <BMIResultDisplay bmi={quickBMI} />}
    </div>
  );
};

export default QuickBMICalculator;
