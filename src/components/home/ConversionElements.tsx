
import { Scale, Baby, Calculator, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const ConversionElements = () => {
  return (
    <section className="text-white py-6 sm:py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {/* Calculatrice IMC */}
        <Link to="/calculateur-imc" className="block group touch-manipulation">
          <div className="bg-white/15 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-[0.98] hover:shadow-xl border border-white/20">
            <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Scale className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Calculatrice IMC</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Calculez votre indice de masse corporelle et obtenez une analyse détaillée
            </p>
          </div>
        </Link>
        
        {/* IMC Enfants */}
        <Link to="/imc-enfants" className="block group touch-manipulation">
          <div className="bg-white/15 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-[0.98] hover:shadow-xl border border-white/20">
            <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Baby className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">IMC Enfants</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Calculez l'IMC de votre enfant avec interprétation adaptée à son âge
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ConversionElements;
