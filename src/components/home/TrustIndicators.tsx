
import { Users, Calculator, Award } from "lucide-react";

const TrustIndicators = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
        <Users className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-2">50 000+</h3>
        <p className="text-lg">Utilisateurs du calculateur IMC</p>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
        <Calculator className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-2">100 000+</h3>
        <p className="text-lg">Calculs d'IMC effectués</p>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
        <Award className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-2">96%</h3>
        <p className="text-lg">Taux de satisfaction IMC</p>
      </div>
    </section>
  );
};

export default TrustIndicators;
