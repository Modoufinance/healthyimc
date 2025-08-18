
import { Check, X } from "lucide-react";

const ComparaisonTable = () => {
  const features = [
    {
      feature: "Calcul IMC selon normes OMS",
      ours: true,
      others: true
    },
    {
      feature: "Interprétation personnalisée des résultats",
      ours: true,
      others: false
    },
    {
      feature: "Conseils adaptés à votre profil",
      ours: true,
      others: false
    },
    {
      feature: "Suivi de progression IMC",
      ours: true, 
      others: false
    },
    {
      feature: "Adaptations pour sportifs et enfants",
      ours: true,
      others: false
    },
    {
      feature: "Protection des données de santé",
      ours: true,
      others: false
    },
    {
      feature: "Sans publicité",
      ours: true,
      others: false
    }
  ];

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
        Pourquoi choisir notre calculateur IMC?
      </h2>
      
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-xl overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-4 text-left">Fonctionnalités</th>
              <th className="p-4 text-center">Notre Calculateur</th>
              <th className="p-4 text-center">Autres Calculateurs</th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 transition-colors`}
              >
                <td className="p-4">{item.feature}</td>
                <td className="p-4 text-center">
                  {item.ours ? 
                    <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-400 mx-auto" />}
                </td>
                <td className="p-4 text-center">
                  {item.others ? 
                    <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-400 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparaisonTable;
