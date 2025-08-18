
import { Shield, CheckCircle, Activity } from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="text-center space-y-8">
      <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
        Méthode de calcul IMC approuvée par les professionnels de santé
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-base font-semibold">Formule IMC certifiée OMS</span>
        </div>
        <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
          <CheckCircle className="h-6 w-6 text-primary" />
          <span className="text-base font-semibold">Calcul IMC validé par des médecins</span>
        </div>
        <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-base font-semibold">Précision IMC garantie</span>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
