
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
  
  const getBMICategory = () => {
    if (bmi < 18.5) return "Maigreur";
    if (bmi >= 18.5 && bmi < 24.9) return "Poids normal";
    if (bmi >= 25 && bmi < 29.9) return "Surpoids";
    if (bmi >= 30 && bmi < 34.9) return "Obésité modérée";
    if (bmi >= 35 && bmi < 39.9) return "Obésité sévère";
    return "Obésité morbide";
  };

  const displayCategory = category || getBMICategory();

  return (
    <div className="mt-4 text-center animate-fade-in" role="region" aria-label="Résultat de calcul IMC">
      <h3 className="text-white font-bold text-2xl">Votre IMC: {bmi}</h3>
      
      <Badge variant={getBadgeVariant()} className="text-sm my-2">
        {displayCategory}
      </Badge>
      
      {/* Intégration de l'échelle IMC visuelle */}
      <BMIScale bmi={bmi} />
      
      <div className="mt-3">
        <p className="text-white text-sm">
          {bmi < 18.5 && "Un IMC inférieur à 18,5 indique une insuffisance pondérale. Consultez un professionnel de santé."}
          {bmi >= 18.5 && bmi < 24.9 && "Votre IMC indique un poids santé. Félicitations, continuez à maintenir de bonnes habitudes."}
          {bmi >= 25 && bmi < 29.9 && "Un IMC entre 25 et 29,9 indique un surpoids. Envisagez d'adopter une alimentation plus équilibrée et de pratiquer une activité physique régulière."}
          {bmi >= 30 && "Un IMC supérieur à 30 indique une obésité. Nous vous recommandons de consulter un professionnel de santé pour des conseils personnalisés."}
        </p>
      </div>
      
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
