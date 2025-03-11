
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Timer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="mt-10 bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl">
      <div className="flex items-center mb-4 gap-2">
        <Timer className="text-white h-5 w-5" />
        <h3 className="text-xl font-bold text-white">Découvrez votre IMC en 30 secondes</h3>
      </div>
      
      <form onSubmit={handleQuickCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quick-weight" className="text-white">Poids (kg)</Label>
          <Input 
            id="quick-weight" 
            type="number" 
            placeholder="Ex: 70" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-white/30 text-white placeholder:text-white/70 border-white/30"
            required
          />
        </div>
        <div>
          <Label htmlFor="quick-height" className="text-white">Taille (cm)</Label>
          <Input 
            id="quick-height" 
            type="number" 
            placeholder="Ex: 175" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-white/30 text-white placeholder:text-white/70 border-white/30"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-bold py-2 shadow-lg sm:col-span-2"
        >
          Calcul IMC Express
        </Button>
      </form>
      
      {quickBMI && (
        <div className="mt-4 text-center bg-white/30 p-4 rounded-lg">
          <p className="text-white font-bold text-2xl">Votre IMC rapide: {quickBMI}</p>
          <p className="text-white mt-2">Pour une analyse détaillée et des conseils personnalisés:</p>
          <Button 
            asChild
            className="mt-2 bg-white text-primary hover:bg-white/90 font-semibold"
          >
            <Link to="/calculateur-imc">
              Analyse IMC complète
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickBMICalculator;
