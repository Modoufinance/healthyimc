import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-bg flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Calculatrice IMC en ligne gratuite
        </h1>
        <div className="prose prose-lg text-white/90 max-w-2xl mx-auto space-y-6 px-4">
          <h2 className="text-xl md:text-2xl text-white font-semibold">
            Qu'est-ce que l'IMC et pourquoi est-il important ?
          </h2>
          <p className="text-base md:text-lg">
            L'Indice de Masse Corporelle (IMC) est un outil simple pour évaluer votre rapport poids/taille. 
            Il vous aide à déterminer si votre poids est dans une fourchette saine.
          </p>
          
          <h2 className="text-xl md:text-2xl text-white font-semibold">
            Comment utiliser cet outil ?
          </h2>
          <p className="text-base md:text-lg">
            Entrez simplement votre poids en kilogrammes et votre taille en centimètres pour obtenir 
            instantanément votre IMC et des recommandations personnalisées.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
          >
            <Link to="/calculator">
              Calculer mon IMC
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto"
          >
            <Link to="/about">En savoir plus</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;