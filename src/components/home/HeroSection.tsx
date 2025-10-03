
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionElements from "./ConversionElements";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="text-center space-y-10 animate-fade-in py-8">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
          <Heart className="w-12 h-12 text-primary mr-3" />
          <div className="flex flex-col items-start">
            <span className="text-3xl font-bold text-primary leading-none">Healthy</span>
            <span className="text-3xl font-bold text-gray-700 leading-none">IMC</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-2xl">
        Calculateur IMC Gratuit en Ligne
      </h1>
      
      <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg font-medium">
        Calculez votre Indice de Masse Corporelle en quelques secondes
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
        <Button
          asChild
          variant="premium"
          size="lg"
          className="w-full sm:w-auto py-8 px-14 text-xl shadow-2xl"
        >
          <Link to="/calculateur-imc">
            {t.hero.ctaButton}
            <ArrowRight className="ml-3 h-7 w-7" />
          </Link>
        </Button>
        <div className="glassmorphism-card px-8 py-4 rounded-full">
          <div className="flex items-center">
            <Timer className="h-6 w-6 text-white mr-3" />
            <p className="text-white text-lg font-semibold">
              {t.hero.resultTime}
            </p>
          </div>
        </div>
      </div>
      
      {/* Nouveau bouton pour le programme fitness */}
      <div className="pt-6">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="bg-white/15 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white hover:text-primary text-lg w-full sm:w-auto py-7 px-10 font-semibold shadow-lg"
        >
          <Link to="/programme-fitness-ia">
            {t.hero.newFitnessProgram}
          </Link>
        </Button>
      </div>
      
      <ConversionElements />
    </section>
  );
};

export default HeroSection;
