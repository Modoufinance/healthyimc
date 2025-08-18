
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Activity, Target } from "lucide-react";

const BMIMen = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur IMC Homme - Indice de Masse Corporelle Masculin",
    "description": "Calculateur IMC spécialement adapté pour les hommes. Prenez en compte les spécificités masculines pour un calcul précis.",
    "url": "https://healthyimc.com/calcul-imc-homme",
    "applicationCategory": "HealthApplication"
  };

  const faqItems = [
    {
      question: "Quel est l'IMC normal pour un homme ?",
      answer: "L'IMC normal pour un homme se situe entre 18,5 et 24,9 kg/m². Les hommes ayant plus de masse musculaire peuvent avoir un IMC plus élevé sans être en surpoids."
    },
    {
      question: "Comment la masse musculaire affecte-t-elle l'IMC chez l'homme ?",
      answer: "Les muscles pesant plus que la graisse, les hommes sportifs peuvent avoir un IMC élevé tout en ayant un taux de graisse corporelle normal. Il faut compléter par d'autres mesures."
    },
    {
      question: "L'IMC varie-t-il avec l'âge chez les hommes ?",
      answer: "Oui, le métabolisme ralentit avec l'âge et la masse musculaire tend à diminuer après 30 ans. L'IMC peut légèrement augmenter naturellement."
    }
  ];

  return (
    <>
      <SEO
        title="Calculateur IMC Homme | Calcul Indice de Masse Corporelle Masculin"
        description="Calculez votre IMC en tant qu'homme avec notre outil spécialisé. Prenez en compte les spécificités masculines pour un calcul d'IMC précis et des conseils adaptés."
        keywords="calculateur imc homme, imc masculin, indice masse corporelle homme, calcul imc hommes, poids idéal homme, imc normal homme"
        canonicalUrl="https://healthyimc.com/calcul-imc-homme"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Calculateur IMC Homme
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Calculez votre indice de masse corporelle avec un outil adapté aux spécificités masculines
            </p>
          </div>

          {/* Calculateur */}
          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Annonce AdSense après le calculateur */}
          <div className="mb-16 flex justify-center">
            <AdSense 
              adSlot="1111111111"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          {/* Spécificités masculines */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Dumbbell className="w-6 h-6 mr-2 text-blue-300" />
                  Masse Musculaire
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Les hommes ont naturellement plus de masse musculaire. Un IMC élevé peut être normal si vous êtes sportif ou musclé.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-green-300" />
                  Métabolisme
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Le métabolisme masculin est généralement plus élevé, permettant de brûler plus de calories au repos.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-6 h-6 mr-2 text-red-300" />
                  Graisse Abdominale
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Les hommes stockent plus facilement la graisse au niveau abdominal. Surveillez votre tour de taille en plus de l'IMC.</p>
              </CardContent>
            </Card>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">IMC et Santé Masculine</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Points d'Attention</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Masse musculaire importante</li>
                  <li>• Stockage graisse abdominale</li>
                  <li>• Risques cardiovasculaires</li>
                  <li>• Perte musculaire avec l'âge</li>
                  <li>• Influence du stress</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Conseils Spécifiques</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Mesurer le tour de taille</li>
                  <li>• Maintenir la masse musculaire</li>
                  <li>• Activité physique régulière</li>
                  <li>• Surveillance tension artérielle</li>
                  <li>• Alimentation équilibrée</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIMen;
