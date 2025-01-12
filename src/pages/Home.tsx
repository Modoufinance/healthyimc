import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Brain, Calculator } from "lucide-react";
import SEO from "@/components/SEO";
import WellnessFeatures from "@/components/WellnessFeatures";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Accueil"
        description="Calculez et suivez votre IMC avec notre application intelligente. Obtenez des conseils personnalisés pour votre santé."
        keywords="IMC, calculateur IMC, santé, bien-être, suivi santé"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe]">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 sm:py-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Votre Compagnon Santé Intelligent
            </h1>
            <p className="text-xl text-white/90">
              Suivez votre IMC et recevez des conseils personnalisés pour atteindre vos objectifs de santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                onClick={() => navigate("/calculator")}
                className="bg-white text-[#4facfe] hover:bg-white/90"
              >
                Calculer mon IMC
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/wellness")}
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Découvrir nos fonctionnalités
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white/10 backdrop-blur-lg py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Nos Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
                <Calculator className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calculateur IMC</h3>
                <p>Calculez votre IMC et obtenez une analyse détaillée de votre situation</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
                <Brain className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">IA Santé</h3>
                <p>Recevez des conseils personnalisés basés sur l'intelligence artificielle</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
                <Activity className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Suivi Progression</h3>
                <p>Suivez votre progression et visualisez vos résultats dans le temps</p>
              </div>
            </div>
          </div>
        </div>

        <WellnessFeatures />
      </div>
    </>
  );
};

export default Home;