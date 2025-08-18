
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Target, TrendingDown } from "lucide-react";

const BMIOverweight = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "IMC Surpoids - Guide pour Retrouver un Poids Santé",
    "description": "Conseils pratiques pour perdre du poids et retrouver un IMC normal. Approche progressive et durable.",
    "url": "https://healthyimc.com/imc-surpoids"
  };

  const faqItems = [
    {
      question: "Qu'est-ce que le surpoids selon l'IMC ?",
      answer: "Le surpoids correspond à un IMC entre 25 et 29,9 kg/m². C'est une situation intermédiaire qui augmente les risques de santé mais reste réversible avec des changements de mode de vie."
    },
    {
      question: "Comment perdre du poids sainement ?",
      answer: "Une perte de poids saine vise 0,5 à 1 kg par semaine grâce à une alimentation équilibrée et une activité physique régulière. Évitez les régimes drastiques."
    },
    {
      question: "Quels sont les risques du surpoids ?",
      answer: "Le surpoids augmente les risques de diabète type 2, maladies cardiovasculaires, apnée du sommeil et certains cancers. Une perte de 5-10% du poids peut réduire significativement ces risques."
    }
  ];

  return (
    <>
      <SEO
        title="IMC Surpoids | Guide pour Retrouver un Poids Santé"
        description="Vous êtes en surpoids (IMC 25-29,9) ? Découvrez nos conseils pratiques pour perdre du poids sainement et retrouver un IMC normal de façon durable."
        keywords="imc surpoids, perdre du poids, surpoids solutions, retrouver poids normal, maigrir sainement"
        canonicalUrl="https://healthyimc.com/imc-surpoids"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                IMC Surpoids
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Retrouvez un poids santé avec nos conseils personnalisés
            </p>
          </div>

          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Annonce AdSense après le calculateur */}
          <div className="mb-16 flex justify-center">
            <AdSense 
              adSlot="4444444444"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-yellow-300" />
                  Surpoids : IMC 25-29,9
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Le surpoids indique un excès de poids modéré. C'est le moment idéal pour agir et prévenir l'obésité avec des changements de mode de vie.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-6 h-6 mr-2 text-green-300" />
                  Objectif Réaliste
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Visez une perte de <strong>5-10% de votre poids</strong> initial. Cette perte modérée améliore déjà significativement votre santé.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingDown className="w-6 h-6 mr-2 text-blue-300" />
                  Perte Progressive
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Une perte de <strong>0,5 à 1 kg par semaine</strong> est idéale. Cette approche progressive garantit des résultats durables.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Plan d'Action Personnalisé</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Alimentation</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Réduire les portions de 20-25%</li>
                  <li>• Privilégier les aliments peu transformés</li>
                  <li>• Augmenter les fibres (légumes, fruits)</li>
                  <li>• Limiter les sucres et graisses saturées</li>
                  <li>• Boire avant chaque repas</li>
                  <li>• Manger lentement et consciemment</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Activité Physique</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Commencer par 30 min de marche/jour</li>
                  <li>• Ajouter 2 séances de renforcement/semaine</li>
                  <li>• Préférer les escaliers à l'ascenseur</li>
                  <li>• Trouver une activité plaisante</li>
                  <li>• Augmenter progressivement l'intensité</li>
                  <li>• Viser 250-300 min d'activité/semaine</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Éviter les Pièges</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Régimes Drastiques</h3>
                <p className="text-white/90 text-sm">
                  Évitez les régimes très restrictifs qui sont difficiles à tenir et favorisent l'effet yo-yo.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Objectifs Irréalistes</h3>
                <p className="text-white/90 text-sm">
                  Ne visez pas une perte de poids trop rapide. La patience est clé pour un succès durable.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tout ou Rien</h3>
                <p className="text-white/90 text-sm">
                  Acceptez les écarts occasionnels. L'important est la constance sur le long terme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIOverweight;
