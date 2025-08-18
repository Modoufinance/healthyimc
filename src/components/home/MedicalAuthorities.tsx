
import { Award, Shield, BookOpen, Check } from "lucide-react";

const MedicalAuthorities = () => {
  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
        Approuvé par les autorités médicales
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
          <div className="flex flex-col items-center">
            <Shield className="h-12 w-12 text-white mb-4 hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-white mb-2">Organisation Mondiale de la Santé</h3>
            <p className="text-white/90">
              Notre calculateur d'IMC utilise la formule et les catégories officielles recommandées par l'OMS.
            </p>
            <ul className="mt-4 text-left text-white/90">
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Normes internationales</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Classification officielle des catégories d'IMC</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Suivi des recommandations sanitaires mondiales</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
          <div className="flex flex-col items-center">
            <BookOpen className="h-12 w-12 text-white mb-4 hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-white mb-2">Validé par des professionnels de santé</h3>
            <p className="text-white/90">
              Développé en collaboration avec des médecins et nutritionnistes pour assurer des résultats précis.
            </p>
            <ul className="mt-4 text-left text-white/90">
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Conseils adaptés selon le résultat IMC</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Méthologie de calcul validée</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Conforme aux publications médicales récentes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalAuthorities;
