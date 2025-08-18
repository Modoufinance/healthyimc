
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Activity } from "lucide-react";

const BMINormal = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "IMC Normal - Maintenir un Poids Santé Optimal",
    "description": "Découvrez ce qu'est un IMC normal, comment le maintenir et les conseils pour préserver votre poids santé.",
    "url": "https://healthyimc.com/imc-normal"
  };

  const faqItems = [
    {
      question: "Qu'est-ce qu'un IMC normal ?",
      answer: "Un IMC normal se situe entre 18,5 et 24,9 kg/m². Cette fourchette indique un poids santé optimal associé aux risques les plus faibles pour la santé."
    },
    {
      question: "Comment maintenir un IMC normal ?",
      answer: "Maintenez une alimentation équilibrée, pratiquez une activité physique régulière, dormez suffisamment et gérez votre stress pour conserver un IMC dans la norme."
    },
    {
      question: "Un IMC normal garantit-il une bonne santé ?",
      answer: "Un IMC normal est un bon indicateur, mais la santé dépend aussi de la composition corporelle, du mode de vie et d'autres facteurs individuels."
    }
  ];

  return (
    <>
      <SEO
        title="IMC Normal | Comment Maintenir un Poids Santé Optimal"
        description="Découvrez tout sur l'IMC normal (18,5-24,9). Conseils pour maintenir un poids santé optimal, alimentation équilibrée et mode de vie sain."
        keywords="imc normal, poids normal, poids santé, maintenir imc normal, poids idéal, santé optimale"
        canonicalUrl="https://healthyimc.com/imc-normal"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                IMC Normal
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Félicitations ! Découvrez comment maintenir votre poids santé optimal
            </p>
          </div>

          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Annonce AdSense après le calculateur */}
          <div className="mb-16 flex justify-center">
            <AdSense 
              adSlot="3333333333"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-300" />
                  Qu'est-ce qu'un IMC Normal ?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Un IMC entre <strong>18,5 et 24,9</strong> indique un poids santé optimal. Cette fourchette est associée aux risques de santé les plus faibles et à une espérance de vie optimale.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-300" />
                  Avantages Santé
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <ul className="space-y-1 text-sm">
                  <li>• Risque cardiovasculaire réduit</li>
                  <li>• Meilleure régulation glycémique</li>
                  <li>• Moins de stress articulaire</li>
                  <li>• Meilleure qualité de sommeil</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-blue-300" />
                  Maintenir son IMC
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <ul className="space-y-1 text-sm">
                  <li>• Alimentation équilibrée</li>
                  <li>• Activité physique régulière</li>
                  <li>• Sommeil de qualité</li>
                  <li>• Gestion du stress</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Conseils pour Maintenir votre IMC Normal</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Alimentation</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Portions équilibrées à chaque repas</li>
                  <li>• 5 fruits et légumes par jour</li>
                  <li>• Protéines de qualité</li>
                  <li>• Hydratation suffisante (1,5-2L/jour)</li>
                  <li>• Limiter les aliments transformés</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Mode de Vie</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• 150 minutes d'activité modérée/semaine</li>
                  <li>• 7-9 heures de sommeil/nuit</li>
                  <li>• Techniques de relaxation</li>
                  <li>• Suivi régulier du poids</li>
                  <li>• Bilans de santé préventifs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMINormal;
