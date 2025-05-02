
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="text-center space-y-8 py-12">
      <div className="max-w-2xl mx-auto space-y-6 bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-xl">
        <div className="inline-flex items-center bg-[#F97316]/20 text-[#F97316] px-4 py-2 rounded-full mb-4">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-semibold">Seulement 30 secondes</span>
        </div>
        
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Prêt à connaître votre indice de masse corporelle ?
        </h2>
        
        <p className="text-xl text-white mb-8">
          Calcul IMC gratuit et personnalisé en moins d'une minute
        </p>
        
        <Button
          asChild
          size="lg"
          className="bg-[#F97316] text-white hover:bg-[#F97316]/90 w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Link to="/calculateur-imc">
            Obtenir mon calcul IMC gratuit maintenant
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
        
        <p className="text-sm text-white/80 mt-4">
          Rejoignez les 50 000+ personnes qui ont déjà calculé leur IMC
        </p>
      </div>
      
      {/* Nouveau bloc CTA pour le programme fitness */}
      <div className="max-w-2xl mx-auto space-y-6 bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-white/10">
        <div className="inline-flex items-center bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-4">
          <Dumbbell className="w-5 h-5 mr-2" />
          <span className="font-semibold">Nouveau Programme</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
          Transformez votre silhouette avec notre coach IA
        </h2>
        
        <p className="text-xl text-white mb-8">
          Programme d'entraînement personnalisé basé sur votre IMC et vos objectifs
        </p>
        
        <Button
          asChild
          size="lg"
          className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto py-6 px-10 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Link to="/programme-fitness-ia">
            Découvrir le programme fitness IA
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
        
        <p className="text-sm text-white/80 mt-4">
          Abonnement annuel disponible à partir de 99,99€
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
