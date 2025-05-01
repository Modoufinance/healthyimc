
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Timer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionElements from "./ConversionElements";

const HeroSection = () => {
  return (
    <section className="text-center space-y-8 animate-fade-in relative">
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
      
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm flex items-center">
          <Check className="h-4 w-4 mr-1 text-green-400" />
          Gratuit
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm flex items-center">
          <Check className="h-4 w-4 mr-1 text-green-400" />
          Certifié OMS
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm flex items-center">
          <Check className="h-4 w-4 mr-1 text-green-400" />
          Sans inscription
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm flex items-center">
          <Check className="h-4 w-4 mr-1 text-green-400" />
          Résultat instantané
        </div>
      </div>
      
      <ConversionElements />
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
