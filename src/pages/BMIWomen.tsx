
import SEO from "@/components/SEO";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TrendingUp, Baby } from "lucide-react";

const BMIWomen = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur IMC Femme - Indice de Masse Corporelle Féminin",
    "description": "Calculateur IMC spécialement adapté pour les femmes. Prenez en compte les spécificités féminines pour un calcul précis.",
    "url": "https://healthyimc.com/calcul-imc-femme",
    "applicationCategory": "HealthApplication"
  };

  const faqItems = [
    {
      question: "Quel est l'IMC normal pour une femme ?",
      answer: "L'IMC normal pour une femme se situe entre 18,5 et 24,9 kg/m². Cependant, d'autres facteurs comme l'âge, la composition corporelle et l'historique médical doivent être pris en compte."
    },
    {
      question: "Comment l'IMC varie-t-il selon l'âge chez la femme ?",
      answer: "Avec l'âge, l'IMC peut légèrement augmenter. Après la ménopause, les changements hormonaux peuvent affecter la répartition des graisses et influencer l'IMC idéal."
    },
    {
      question: "L'IMC est-il fiable pendant la grossesse ?",
      answer: "L'IMC classique n'est pas adapté pendant la grossesse. Il faut utiliser des courbes spécifiques et consulter un professionnel de santé pour le suivi du poids pendant la grossesse."
    }
  ];

  return (
    <>
      <SEO
        title="Calculateur IMC Femme | Calcul Indice de Masse Corporelle Féminin"
        description="Calculez votre IMC en tant que femme avec notre outil spécialisé. Prenez en compte les spécificités féminines pour un calcul d'IMC précis et des conseils adaptés."
        keywords="calculateur imc femme, imc féminin, indice masse corporelle femme, calcul imc femmes, poids idéal femme, imc normal femme"
        canonicalUrl="https://healthyimc.com/calcul-imc-femme"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Calculateur IMC Femme
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Calculez votre indice de masse corporelle avec un outil adapté aux spécificités féminines
            </p>
          </div>

          {/* Calculateur */}
          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Spécificités féminines */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-pink-300" />
                  Cycle Menstruel
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Le poids peut varier de 1-2 kg durant le cycle menstruel. Pesez-vous de préférence après les règles pour plus de précision.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-300" />
                  Ménopause
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>Après la ménopause, la répartition des graisses change. Un léger surpoids peut être protecteur pour la santé osseuse.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Baby className="w-6 h-6 mr-2 text-blue-300" />
                  Grossesse & Allaitement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p>L'IMC classique n'est pas adapté pendant la grossesse et l'allaitement. Consultez votre médecin pour un suivi adapté.</p>
              </CardContent>
            </Card>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">IMC et Santé Féminine</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Facteurs à Considérer</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Composition corporelle (muscle vs graisse)</li>
                  <li>• Répartition des graisses</li>
                  <li>• Historique de grossesses</li>
                  <li>• Statut hormonal</li>
                  <li>• Activité physique</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Recommandations</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Pesée régulière à heure fixe</li>
                  <li>• Mesure du tour de taille</li>
                  <li>• Suivi de la masse musculaire</li>
                  <li>• Consultation médicale régulière</li>
                  <li>• Activité physique adaptée</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIWomen;
