
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Scale, TrendingUp } from "lucide-react";

const IdealWeight = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur Poids Idéal - Déterminez votre Poids de Forme",
    "description": "Calculez votre poids idéal selon différentes formules reconnues. Outil gratuit pour déterminer votre poids de forme optimal.",
    "url": "https://healthyimc.com/poids-ideal-calcul",
    "applicationCategory": "HealthApplication"
  };

  const faqItems = [
    {
      question: "Comment calculer son poids idéal ?",
      answer: "Le poids idéal se calcule selon plusieurs formules : Lorentz, Devine, Robinson. Chaque formule prend en compte la taille, le sexe et parfois l'âge pour déterminer un poids optimal."
    },
    {
      question: "Quelle est la différence entre IMC et poids idéal ?",
      answer: "L'IMC est un rapport taille/poids qui indique si vous êtes dans une fourchette normale. Le poids idéal est un poids précis calculé selon votre profil pour une santé optimale."
    },
    {
      question: "Le poids idéal est-il le même pour tous ?",
      answer: "Non, le poids idéal varie selon la taille, le sexe, l'âge, la corpulence et l'activité physique. Il s'agit d'une estimation à adapter selon votre situation personnelle."
    }
  ];

  return (
    <>
      <SEO
        title="Calculateur Poids Idéal | Déterminez votre Poids de Forme Optimal"
        description="Calculez votre poids idéal gratuitement selon différentes formules reconnues. Découvrez votre poids de forme optimal adapté à votre profil avec nos conseils personnalisés."
        keywords="poids idéal, calculateur poids idéal, poids de forme, poids optimal, calcul poids idéal, poids santé, formule poids idéal"
        canonicalUrl="https://healthyimc.com/poids-ideal-calcul"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Calculateur Poids Idéal
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Déterminez votre poids de forme optimal avec nos formules scientifiques
            </p>
          </div>

          {/* Calculateur */}
          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Annonce AdSense après le calculateur */}
          <div className="mb-16 flex justify-center">
            <AdSense 
              adSlot="6666666666"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          {/* Formules de calcul */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-green-300" />
                  Formule de Lorentz
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p><strong>Hommes :</strong> (Taille - 100) - (Taille - 150)/4</p>
                <p><strong>Femmes :</strong> (Taille - 100) - (Taille - 150)/2.5</p>
                <p className="mt-2 text-sm">Formule classique prenant en compte le sexe</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-300" />
                  Formule de Devine
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p><strong>Hommes :</strong> 50 + 2.3 × (Taille en pouces - 60)</p>
                <p><strong>Femmes :</strong> 45.5 + 2.3 × (Taille en pouces - 60)</p>
                <p className="mt-2 text-sm">Utilisée en pharmacologie médicale</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-300" />
                  Formule de Robinson
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p><strong>Hommes :</strong> 52 + 1.9 × (Taille en pouces - 60)</p>
                <p><strong>Femmes :</strong> 49 + 1.7 × (Taille en pouces - 60)</p>
                <p className="mt-2 text-sm">Adaptation moderne de la formule de Devine</p>
              </CardContent>
            </Card>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Comprendre le Poids Idéal</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Facteurs Influençant le Poids Idéal</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• <strong>Taille :</strong> Base de tous les calculs</li>
                  <li>• <strong>Sexe :</strong> Différences de composition corporelle</li>
                  <li>• <strong>Âge :</strong> Évolution du métabolisme</li>
                  <li>• <strong>Corpulence :</strong> Ossature fine, moyenne ou forte</li>
                  <li>• <strong>Activité physique :</strong> Masse musculaire</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Limites du Concept</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Ne considère pas la composition corporelle</li>
                  <li>• Valeurs indicatives, non absolues</li>
                  <li>• Variation selon les morphologies</li>
                  <li>• À adapter selon l'état de santé</li>
                  <li>• Consultation médicale recommandée</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conseils pour atteindre son poids idéal */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Comment Atteindre son Poids Idéal</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Alimentation</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Équilibre nutritionnel</li>
                  <li>• Portions adaptées</li>
                  <li>• Hydratation suffisante</li>
                  <li>• Éviter les excès</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Activité Physique</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• 150 min/semaine minimum</li>
                  <li>• Cardio + renforcement</li>
                  <li>• Régularité importante</li>
                  <li>• Progressive adaptation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Suivi</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Pesée régulière</li>
                  <li>• Évolution graduelle</li>
                  <li>• Patience et persévérance</li>
                  <li>• Accompagnement médical</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdealWeight;
