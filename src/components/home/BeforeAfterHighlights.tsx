
import { Star, TrendingUp } from "lucide-react";

const BeforeAfterHighlights = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Transformations réelles avec notre calculateur IMC
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">Julien, 34 ans</h3>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              -12kg
            </div>
          </div>
          
          <div className="mb-6 text-sm">
            "Grâce au calcul de mon IMC et aux conseils personnalisés, j'ai pu perdre 12kg en 6 mois. J'ai maintenant un IMC normal et je me sens beaucoup mieux au quotidien!"
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-white/70">IMC Avant</div>
              <div className="text-2xl font-bold">29.4</div>
              <div className="text-xs mt-1 text-orange-300">Surpoids</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-white/70">IMC Après</div>
              <div className="text-2xl font-bold">24.1</div>
              <div className="text-xs mt-1 text-green-300">Normal</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">Sophie, 28 ans</h3>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8kg
            </div>
          </div>
          
          <div className="mb-6 text-sm">
            "Mon IMC était trop bas et j'avais besoin de prendre du poids sainement. Le calculateur m'a aidée à suivre ma progression et à atteindre un poids santé en 4 mois!"
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-white/70">IMC Avant</div>
              <div className="text-2xl font-bold">17.2</div>
              <div className="text-xs mt-1 text-blue-300">Insuffisance</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm text-white/70">IMC Après</div>
              <div className="text-2xl font-bold">20.8</div>
              <div className="text-xs mt-1 text-green-300">Normal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterHighlights;
