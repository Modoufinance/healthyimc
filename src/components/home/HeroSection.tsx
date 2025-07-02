
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionElements from "./ConversionElements";
import AdBanner from "@/components/ads/AdBanner";

const HeroSection = () => {
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
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-lg">
        Calculez votre IMC gratuitement en moins d'une minute
      </h1>
      
      <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow">
        Rejoignez plus de 50 000 personnes qui ont déjà calculé leur indice de masse corporelle
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          asChild
          size="lg"
          className="bg-[#F97316] text-white hover:bg-[#F97316]/90 text-lg w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Link to="/calculateur-imc">
            Calculer mon IMC maintenant
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
          <Timer className="h-5 w-5 text-white mr-2" />
          <p className="text-white text-lg font-medium">
            Résultat en 30 secondes
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
            Nouveau ! Découvrez notre programme fitness basé sur l'IA
          </Link>
        </Button>
      </div>
      
      {/* Publicité banner en bas du hero */}
      <div className="mt-8">
        <AdBanner 
          adSlot="5566778899" 
          adFormat="horizontal"
          className="opacity-90"
          style={{ minHeight: '90px' }}
        />
      </div>
      
      <ConversionElements />
    </section>
  );
};

export default HeroSection;
