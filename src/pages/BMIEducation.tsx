
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Info, Calculator, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BMIEducation = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Indice de Masse Corporelle - Guide Complet IMC",
    "description": "Guide complet sur l'Indice de Masse Corporelle (IMC). Comprendre le calcul, l'interprétation et les limites de l'IMC pour votre santé.",
    "url": "https://healthyimc.com/indice-masse-corporelle",
    "datePublished": "2024-01-01",
    "author": {
      "@type": "Organization",
      "name": "HealthyIMC"
    }
  };

  const faqItems = [
    {
      question: "Qu'est-ce que l'Indice de Masse Corporelle ?",
      answer: "L'IMC est un indicateur qui permet d'évaluer la corpulence d'une personne en fonction de sa taille et de son poids. Il se calcule en divisant le poids (kg) par la taille au carré (m²)."
    },
    {
      question: "Comment interpréter son IMC ?",
      answer: "IMC < 18,5 = maigreur, 18,5-24,9 = poids normal, 25-29,9 = surpoids, ≥30 = obésité. Ces valeurs sont indicatives et doivent être interprétées par un professionnel de santé."
    },
    {
      question: "Quelles sont les limites de l'IMC ?",
      answer: "L'IMC ne distingue pas la masse musculaire de la masse graisseuse et ne tient pas compte de la répartition des graisses. Il doit être complété par d'autres indicateurs."
    }
  ];

  return (
    <>
      <SEO
        title="Indice de Masse Corporelle | Guide Complet IMC - Calcul et Interprétation"
        description="Découvrez tout sur l'Indice de Masse Corporelle (IMC). Guide complet : calcul, interprétation, limites et conseils pour comprendre votre IMC et agir pour votre santé."
        keywords="indice de masse corporelle, imc, calcul imc, interprétation imc, guide imc, comprendre imc, masse corporelle, poids santé"
        canonicalUrl="https://healthyimc.com/indice-masse-corporelle"
        structuredData={structuredData}
        hasFAQ={true}
        faqItems={faqItems}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Indice de Masse Corporelle
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Guide complet pour comprendre, calculer et interpréter votre IMC
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                <Link to="/calculateur-imc">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculer mon IMC
                </Link>
              </Button>
            </div>
          </div>

          {/* Définition IMC */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Info className="w-8 h-8 mr-3" />
              Qu'est-ce que l'IMC ?
            </h2>
            <div className="text-white/90 text-lg leading-relaxed space-y-4">
              <p>
                L'<strong>Indice de Masse Corporelle (IMC)</strong> est un outil de mesure standardisé qui permet d'évaluer la corpulence d'une personne adulte. 
                Développé par le statisticien belge Adolphe Quetelet au XIXe siècle, l'IMC est aujourd'hui utilisé mondialement par les professionnels de santé.
              </p>
              <p>
                Cet indicateur simple permet de déterminer si une personne présente un poids normal, un surpoids ou une obésité, 
                en établissant un rapport entre le poids et la taille.
              </p>
            </div>
          </div>

          {/* Formule de calcul */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Formule de Calcul</CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <div className="text-center py-6">
                  <div className="text-4xl font-bold mb-4 text-yellow-300">
                    IMC = Poids / Taille²
                  </div>
                  <div className="space-y-2">
                    <p>• Poids en kilogrammes (kg)</p>
                    <p>• Taille en mètres (m)</p>
                  </div>
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <p className="text-sm"><strong>Exemple :</strong></p>
                    <p className="text-sm">Personne de 70 kg pour 1,75 m</p>
                    <p className="text-sm">IMC = 70 / (1,75)² = 22,9</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Classification OMS</CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <div className="space-y-3">
                  <div className="flex justify-between p-2 bg-blue-500/20 rounded">
                    <span>Maigreur</span>
                    <span className="font-semibold">&lt; 18,5</span>
                  </div>
                  <div className="flex justify-between p-2 bg-green-500/20 rounded">
                    <span>Poids normal</span>
                    <span className="font-semibold">18,5 - 24,9</span>
                  </div>
                  <div className="flex justify-between p-2 bg-yellow-500/20 rounded">
                    <span>Surpoids</span>
                    <span className="font-semibold">25,0 - 29,9</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span>Obésité</span>
                    <span className="font-semibold">≥ 30,0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Utilité et limites */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-green-400" />
                  Utilité de l'IMC
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90 space-y-3">
                <p>• <strong>Simplicité :</strong> Calcul facile avec poids et taille</p>
                <p>• <strong>Standardisation :</strong> Référence mondiale</p>
                <p>• <strong>Dépistage :</strong> Identification des risques</p>
                <p>• <strong>Suivi :</strong> Évolution dans le temps</p>
                <p>• <strong>Prévention :</strong> Sensibilisation aux risques</p>
                <p>• <strong>Recherche :</strong> Études épidémiologiques</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Info className="w-6 h-6 mr-2 text-yellow-400" />
                  Limites de l'IMC
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90 space-y-3">
                <p>• <strong>Composition corporelle :</strong> Ne distingue pas muscle/graisse</p>
                <p>• <strong>Répartition :</strong> Ignore la localisation des graisses</p>
                <p>• <strong>Âge :</strong> Moins précis chez les seniors</p>
                <p>• <strong>Ethnicité :</strong> Variations selon les populations</p>
                <p>• <strong>Sportifs :</strong> Peut surestimer chez les athlètes</p>
                <p>• <strong>Enfants :</strong> Nécessite des courbes spécifiques</p>
              </CardContent>
            </Card>
          </div>

          {/* Alternatives à l'IMC */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Indicateurs Complémentaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Tour de Taille</h3>
                <p className="text-white/90 text-sm">
                  Mesure la graisse abdominale. Risque élevé : >102 cm (homme), >88 cm (femme).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Rapport Taille/Hanches</h3>
                <p className="text-white/90 text-sm">
                  Évalue la répartition des graisses. Risque élevé : >1,0 (homme), >0,85 (femme).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Composition Corporelle</h3>
                <p className="text-white/90 text-sm">
                  Analyse précise de la masse grasse, masse maigre et eau corporelle.
                </p>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Nos Recommandations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Pour une Interprétation Correcte</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Considérez l'IMC comme un indicateur, non un diagnostic</li>
                  <li>• Complétez avec d'autres mesures (tour de taille, etc.)</li>
                  <li>• Tenez compte de votre historique médical</li>
                  <li>• Consultez un professionnel de santé</li>
                  <li>• Suivez l'évolution dans le temps</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Actions Recommandées</h3>
                <ul className="text-white/90 space-y-2">
                  <li>• Maintenez un mode de vie actif</li>
                  <li>• Adoptez une alimentation équilibrée</li>
                  <li>• Surveillez votre poids régulièrement</li>
                  <li>• Gérez le stress et le sommeil</li>
                  <li>• Consultez en cas de préoccupations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIEducation;
