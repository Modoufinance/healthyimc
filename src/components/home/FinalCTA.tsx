
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="text-center space-y-8 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Prêt à connaître votre indice de masse corporelle ?
        </h2>
        <p className="text-xl text-white mb-8">
          Calcul IMC gratuit et personnalisé en moins d'une minute
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Link to="/calculateur-imc">
            Obtenir mon calcul IMC gratuit maintenant
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
