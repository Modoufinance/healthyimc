
import { Award, Clock, Check, Users, Calculator } from "lucide-react";

const ConversionElements = () => {
  return (
    <section className="text-white py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center flex flex-col items-center">
          <Users className="h-6 w-6 mb-2" />
          <div className="text-lg font-bold">50 000+</div>
          <div className="text-xs">Utilisateurs satisfaits</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center flex flex-col items-center">
          <Calculator className="h-6 w-6 mb-2" />
          <div className="text-lg font-bold">100 000+</div>
          <div className="text-xs">Calculs d'IMC</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center flex flex-col items-center">
          <Award className="h-6 w-6 mb-2" />
          <div className="text-lg font-bold">96%</div>
          <div className="text-xs">Taux de satisfaction</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center flex flex-col items-center">
          <Clock className="h-6 w-6 mb-2" />
          <div className="text-lg font-bold">30 sec</div>
          <div className="text-xs">Calcul rapide</div>
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
    </section>
  );
};

export default ConversionElements;
