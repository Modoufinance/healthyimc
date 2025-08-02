
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Heart, Users } from "lucide-react";

const BMIObesity = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "IMC Obésité - Prise en Charge et Solutions",
    "description": "Guide complet sur l'obésité : causes, risques et solutions. Accompagnement médical et changements de mode de vie.",
    "url": "https://healthyimc.com/imc-obesite"
  };

  const faqItems = [
    {
      question: "Qu'est-ce que l'obésité selon l'IMC ?",
      answer: "L'obésité correspond à un IMC supérieur ou égal à 30 kg/m². Elle se divise en 3 classes : classe I (30-34,9), classe II (35-39,9) et classe III (≥40)."
    },
    {
      question: "Quels sont les risques de l'obésité ?",
      answer: "L'obésité augmente significativement les risques de diabète, maladies cardiovasculaires, apnée du sommeil, certains cancers et problèmes articulaires."
    },
    {
      question: "Comment traiter l'obésité ?",
      answer: "Le traitement de l'obésité nécessite un accompagnement médical pluridisciplinaire : nutritionniste, médecin, psychologue, et parfois chirurgie bariatrique."
    }
  ];

  return (
    <>
      <SEO
        title="IMC Obésité | Prise en Charge et Solutions Médicales"
        description="Obésité (IMC ≥30) : comprendre les causes, risques et solutions. Guide complet avec accompagnement médical et conseils pour retrouver la santé."
        keywords="imc obésité, obésité traitement, perte de poids obésité, accompagnement médical obésité, chirurgie bariatrique"
        canonicalUrl="https://healthyimc.com/imc-obesite"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-pink-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                IMC Obésité
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Accompagnement médical et solutions pour retrouver la santé
            </p>
          </div>

          <div className="mb-16">
            <BMICalculator />
          </div>

          {/* Annonce AdSense après le calculateur */}
          <div className="mb-16 flex justify-center">
            <AdSense 
              adSlot="5555555555"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-red-300" />
                  Classes d'Obésité
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <div className="space-y-2 text-sm">
                  <p><strong>Classe I :</strong> IMC 30-34,9</p>
                  <p><strong>Classe II :</strong> IMC 35-39,9</p>
                  <p><strong>Classe III :</strong> IMC ≥ 40 (obésité morbide)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-pink-300" />
                  Risques Santé
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <ul className="space-y-1 text-sm">
                  <li>• Diabète type 2</li>
                  <li>• Maladies cardiovasculaires</li>
                  <li>• Apnée du sommeil</li>
                  <li>• Certains cancers</li>
                  <li>• Problèmes articulaires</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-300" />
                  Équipe Médicale
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <ul className="space-y-1 text-sm">
                  <li>• Médecin généraliste</li>
                  <li>• Nutritionniste/Diététicien</li>
                  <li>• Psychologue</li>
                  <li>• Coach sportif adapté</li>
                  <li>• Chirurgien (si besoin)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Approche Thérapeutique</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Prise en Charge Médicale</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Bilan médical complet</li>
                  <li>• Évaluation des comorbidités</li>
                  <li>• Suivi régulier par une équipe</li>
                  <li>• Traitement médicamenteux si nécessaire</li>
                  <li>• Évaluation chirurgicale si IMC ≥ 40</li>
                  <li>• Soutien psychologique</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Changements Mode de Vie</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Rééquilibrage alimentaire progressif</li>
                  <li>• Activité physique adaptée</li>
                  <li>• Gestion du stress et émotions</li>
                  <li>• Amélioration du sommeil</li>
                  <li>• Modification des habitudes</li>
                  <li>• Soutien familial et social</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Options de Traitement</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Conservateur</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Modification du mode de vie</li>
                  <li>• Suivi nutritionnel</li>
                  <li>• Activité physique adaptée</li>
                  <li>• Soutien psychologique</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Médicamenteux</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Sur prescription médicale</li>
                  <li>• En complément du mode de vie</li>
                  <li>• Suivi médical rapproché</li>
                  <li>• Évaluation bénéfice/risque</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Chirurgical</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• IMC ≥ 40 ou ≥ 35 + comorbidités</li>
                  <li>• Après échec du traitement médical</li>
                  <li>• Évaluation pluridisciplinaire</li>
                  <li>• Suivi à vie nécessaire</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-8 border border-red-400/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              Message Important
            </h2>
            <p className="text-white/90 text-lg">
              L'obésité est une maladie chronique qui nécessite un <strong>accompagnement médical professionnel</strong>. 
              Ne tentez pas de traitement en solo. Consultez votre médecin pour établir un plan de soins adapté à votre situation.
            </p>
            <p className="text-white/90 mt-4">
              <strong>Vous n'êtes pas seul(e)</strong> : de nombreuses solutions existent et des professionnels sont là pour vous accompagner vers un meilleur état de santé.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIObesity;
