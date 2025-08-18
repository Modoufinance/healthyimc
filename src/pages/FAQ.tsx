import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SEO from "@/components/SEO";
import StructuredData, { createFAQStructuredData } from "@/components/StructuredData";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment calculer son IMC ?",
      answer: "L'IMC se calcule en divisant le poids en kilogrammes par la taille en mètres au carré. La formule est : IMC = poids (kg) / taille (m)². Par exemple, pour une personne de 70 kg mesurant 1,75 m : IMC = 70 / (1,75)² = 22,9."
    },
    {
      question: "Quel est l'IMC normal pour un adulte ?",
      answer: "Selon l'OMS, un IMC normal pour un adulte se situe entre 18,5 et 24,9. Un IMC inférieur à 18,5 indique une insuffisance pondérale, entre 25 et 29,9 un surpoids, et 30 ou plus une obésité."
    },
    {
      question: "L'IMC est-il différent pour les hommes et les femmes ?",
      answer: "La formule de calcul de l'IMC est identique pour les hommes et les femmes. Cependant, les femmes ont naturellement plus de masse grasse que les hommes, ce qui peut influencer l'interprétation des résultats."
    },
    {
      question: "Comment calculer l'IMC d'un enfant ?",
      answer: "Pour les enfants et adolescents, l'IMC se calcule de la même façon, mais l'interprétation utilise des courbes de croissance spécifiques à l'âge et au sexe. Les percentiles remplacent les catégories adultes."
    },
    {
      question: "Quelle est la limite de l'IMC ?",
      answer: "L'IMC ne distingue pas la masse musculaire de la masse grasse. Les sportifs très musclés peuvent avoir un IMC élevé sans être en surpoids. Il ne tient compte ni de la répartition des graisses ni de la morphologie."
    },
    {
      question: "À quelle fréquence calculer son IMC ?",
      answer: "Il est recommandé de calculer son IMC une fois par mois maximum. Les variations de poids quotidiennes sont normales et peuvent créer de l'anxiété si l'IMC est calculé trop souvent."
    },
    {
      question: "Quel poids idéal selon l'IMC ?",
      answer: "Le poids idéal correspond à un IMC entre 20 et 22 pour la plupart des adultes. Pour le calculer : multipliez votre taille en mètres au carré par votre IMC cible. Exemple : pour 1,70 m et IMC 21 → poids idéal = 1,70² × 21 = 60,8 kg."
    },
    {
      question: "L'IMC change-t-il avec l'âge ?",
      answer: "Les valeurs de référence de l'IMC peuvent légèrement augmenter avec l'âge. Après 65 ans, un IMC entre 23 et 28 peut être considéré comme optimal pour maintenir une bonne santé et réserves nutritionnelles."
    },
    {
      question: "IMC et grossesse : que savoir ?",
      answer: "Pendant la grossesse, l'IMC de départ influence les recommandations de prise de poids. Un IMC normal avant grossesse permet une prise de poids de 11-16 kg. Consultez toujours votre médecin pour un suivi personnalisé."
    },
    {
      question: "Comment améliorer son IMC ?",
      answer: "Pour optimiser son IMC : adoptez une alimentation équilibrée, pratiquez une activité physique régulière (150 min/semaine recommandées), hydratez-vous suffisamment, et dormez 7-9h par nuit. Consultez un professionnel de santé pour un programme personnalisé."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqStructuredData = createFAQStructuredData(faqs);

  return (
    <>
      <SEO
        title="FAQ - Questions fréquentes sur l'IMC et le calcul du poids idéal"
        description="Trouvez toutes les réponses à vos questions sur l'IMC : comment le calculer, les valeurs normales, les différences homme/femme, l'IMC des enfants et plus encore."
        keywords="faq imc, questions imc, calcul imc, imc normal, imc enfant, poids idéal, interprétation imc"
        canonicalUrl="https://healthyimc.com/faq"
      />
      <StructuredData type="FAQPage" data={faqStructuredData} />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Questions Fréquentes sur l'IMC
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tout ce que vous devez savoir sur l'Indice de Masse Corporelle, 
              son calcul et son interprétation pour optimiser votre santé.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h2>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à calculer votre IMC ?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Utilisez notre calculateur gratuit pour connaître votre IMC en quelques secondes
              </p>
              <a
                href="/calculateur-imc"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Calculer mon IMC maintenant
              </a>
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="mt-16 max-w-4xl mx-auto prose prose-lg">
            <h2>Comprendre l'IMC : Un guide complet</h2>
            <p>
              L'Indice de Masse Corporelle (IMC) est un outil médical reconnu mondialement 
              pour évaluer la corpulence d'une personne. Développé par Adolphe Quetelet au 
              19ème siècle, cet indicateur reste aujourd'hui une référence pour les 
              professionnels de santé.
            </p>
            
            <h3>Pourquoi l'IMC est-il important ?</h3>
            <p>
              L'IMC permet d'identifier rapidement les risques liés au poids sur la santé. 
              Un IMC trop faible ou trop élevé peut être associé à diverses complications 
              médicales : diabète, maladies cardiovasculaires, troubles nutritionnels, etc.
            </p>

            <h3>Les limites de l'IMC à connaître</h3>
            <p>
              Bien qu'utile, l'IMC présente certaines limites. Il ne distingue pas la masse 
              musculaire de la masse grasse, ne tient pas compte de la répartition des graisses 
              corporelles, et peut être moins précis pour certaines populations (personnes âgées, 
              sportifs de haut niveau, etc.).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;