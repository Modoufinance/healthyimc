
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionElements from "./ConversionElements";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="text-center space-y-8 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center bg-white p-3 rounded-xl shadow-xl">
          <Heart className="w-10 h-10 text-blue-600 mr-2" />
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-blue-600 leading-none">Healthy</span>
            <span className="text-2xl font-bold text-gray-700 leading-none">IMC</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-lg">
        Calculateur IMC Gratuit en Ligne
      </h1>
      
      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
        Calculez votre Indice de Masse Corporelle en quelques secondes
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          asChild
          size="lg"
          className="bg-[#F97316] text-white hover:bg-[#F97316]/90 text-lg w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Link to="/calculateur-imc">
            {t.hero.ctaButton}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
          <Timer className="h-5 w-5 text-white mr-2" />
          <p className="text-white text-lg font-medium">
            {t.hero.resultTime}
          </p>
        </div>
      </div>
      
      {/* Nouveau bouton pour le programme fitness */}
      <div className="pt-4">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 text-lg w-full sm:w-auto py-6 px-8 font-semibold"
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
