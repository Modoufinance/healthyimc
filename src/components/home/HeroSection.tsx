
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionElements from "./ConversionElements";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="text-center space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in py-4 sm:py-6 md:py-8 px-4">
      <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mr-2 sm:mr-3" />
          <div className="flex flex-col items-start">
            <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-primary leading-none">Healthy</span>
            <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-700 leading-none">IMC</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-2xl px-2">
        Calculateur IMC Gratuit en Ligne
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg font-medium px-4">
        Calculez votre Indice de Masse Corporelle en quelques secondes
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-2 sm:pt-4 w-full px-4">
        <Button
          asChild
          variant="premium"
          size="lg"
          className="w-full sm:w-auto py-4 sm:py-6 md:py-8 px-8 sm:px-10 md:px-14 text-base sm:text-lg md:text-xl shadow-2xl touch-manipulation"
        >
          <Link to="/calculateur-imc">
            {t.hero.ctaButton}
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </Link>
        </Button>
        <div className="glassmorphism-card px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto">
          <div className="flex items-center justify-center">
            <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2 sm:mr-3 shrink-0" />
            <p className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
              {t.hero.resultTime}
            </p>
          </div>
        </div>
      </div>
      
      {/* Nouveau bouton pour le programme fitness */}
      <div className="pt-2 sm:pt-4 md:pt-6 px-4">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="bg-white/15 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white hover:text-primary text-sm sm:text-base md:text-lg w-full sm:w-auto py-4 sm:py-5 md:py-7 px-6 sm:px-8 md:px-10 font-semibold shadow-lg touch-manipulation"
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
