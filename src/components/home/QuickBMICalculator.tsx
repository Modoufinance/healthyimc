
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import BMIResultDisplay from "@/components/BMIResultDisplay";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const QuickBMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentlyCalculated, setRecentlyCalculated] = useState(false);

  // Check if user has recently calculated to show different UI
  useEffect(() => {
    const hasCalculatedBefore = localStorage.getItem("lastBmiCalculation");
    if (hasCalculatedBefore) {
      setRecentlyCalculated(true);
    }
  }, []);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      try {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height) / 100; // Convert cm to meters
        
        if (weightNum > 0 && heightNum > 0) {
          const calculatedBMI = Number((weightNum / (heightNum * heightNum)).toFixed(1));
          setBmi(calculatedBMI);
          
          // Save calculation time to localStorage
          localStorage.setItem("lastBmiCalculation", new Date().toISOString());
          localStorage.setItem("quickBmiValues", JSON.stringify({ weight, height }));
          setRecentlyCalculated(true);
        } else {
          toast({
            title: "Erreur de calcul",
            description: "Veuillez entrer des valeurs valides pour le poids et la taille.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors du calcul de l'IMC.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 600); // Simulate loading for better UX
  };

  // Load previous values if they exist
  useEffect(() => {
    const savedValues = localStorage.getItem("quickBmiValues");
    if (savedValues && !weight && !height) {
      const { weight: w, height: h } = JSON.parse(savedValues);
      setWeight(w);
      setHeight(h);
    }
  }, [weight, height]);

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
              step="0.1"
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
              step="0.5"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white/90 text-primary hover:bg-white transition-colors duration-200"
        >
          {loading ? (
            <>
              <span className="animate-pulse">Calcul en cours...</span>
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculer mon IMC
            </>
          )}
        </Button>
      </form>

      {bmi && <BMIResultDisplay bmi={bmi} showFullAnalysisButton={true} />}
      
      {recentlyCalculated && !bmi && (
        <div className="mt-4 text-center">
          <p className="text-white mb-2">Vous avez récemment calculé votre IMC</p>
          <Button asChild variant="outline" className="bg-white/30 hover:bg-white/50 text-white">
            <Link to="/calculateur-imc" className="flex items-center">
              Accéder à votre analyse complète
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default QuickBMICalculator;
