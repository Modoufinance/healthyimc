
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BMIScale from "./BMIScale";

interface BMIResultDisplayProps {
  bmi: number;
  category?: string;
  showFullAnalysisButton?: boolean;
}

const BMIResultDisplay = ({ bmi, category, showFullAnalysisButton = true }: BMIResultDisplayProps) => {
  const getBadgeVariant = () => {
    if (bmi < 18.5) return "secondary";
    if (bmi >= 18.5 && bmi < 24.9) return "default";
    if (bmi >= 25 && bmi < 29.9) return "secondary";
    return "destructive";
  };

  return (
    <div className="mt-4 text-center animate-fade-in">
      <p className="text-white font-bold text-2xl">Votre IMC: {bmi}</p>
      
      {category && (
        <Badge variant={getBadgeVariant()} className="text-sm my-2">
          {category}
        </Badge>
      )}
      
      {/* Intégration de l'échelle IMC visuelle */}
      <BMIScale bmi={bmi} />
      
      {showFullAnalysisButton && (
        <>
          <p className="text-white mt-4">Pour une analyse détaillée et des conseils personnalisés:</p>
          <Button 
            asChild
            className="mt-2 bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 transition-transform"
          >
            <Link to="/calculateur-imc">
              Analyse IMC complète
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default BMIResultDisplay;
