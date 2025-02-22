
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";

const BMIGuide = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guide complet du calcul de l'IMC (Indice de Masse Corporelle)",
    "description": "Tout savoir sur le calcul de l'IMC, son interprétation et ses limites. Guide complet pour comprendre votre indice de masse corporelle.",
    "keywords": "IMC, calcul IMC, indice masse corporelle, poids idéal, IMC normal, IMC surpoids, IMC obésité",
    "datePublished": "2024-03-14",
    "author": {
      "@type": "Organization",
      "name": "HealthyIMC"
    }
  };

  return (
    <>
      <SEO
        title="Guide complet du calcul de l'IMC | Calculateur d'Indice de Masse Corporelle"
        description="Guide détaillé sur le calcul de l'IMC, son interprétation selon l'OMS, ses avantages et limites. Découvrez comment calculer et interpréter votre indice de masse corporelle."
        keywords="calculateur imc, indice masse corporelle, calcul imc, poids idéal, imc normal, imc surpoids, imc obésité"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Guide Complet du Calcul de l'IMC</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Qu'est-ce que l'IMC ?</h2>
              <p className="text-gray-700 mb-4">
                L'Indice de Masse Corporelle (IMC) est un outil standardisé permettant d'évaluer la corpulence d'une personne. 
                Il est calculé en divisant le poids (en kilogrammes) par le carré de la taille (en mètres).
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Formule de l'IMC :</h3>
                <p className="text-center font-mono">IMC = Poids (kg) / (Taille (m))²</p>
              </div>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Interprétation des Résultats</h2>
              <div className="grid gap-4">
                {[
                  { range: "Inférieur à 16", desc: "Anorexie ou dénutrition", color: "bg-red-100" },
                  { range: "16,5 - 18,5", desc: "Maigreur", color: "bg-orange-100" },
                  { range: "18,5 - 25", desc: "Corpulence normale", color: "bg-green-100" },
                  { range: "25 - 30", desc: "Surpoids", color: "bg-yellow-100" },
                  { range: "30 - 35", desc: "Obésité modérée (Classe 1)", color: "bg-orange-100" },
                  { range: "35 - 40", desc: "Obésité élevée (Classe 2)", color: "bg-red-100" },
                  { range: "Supérieur à 40", desc: "Obésité morbide ou massive", color: "bg-red-200" }
                ].map((item, index) => (
                  <div key={index} className={`${item.color} p-3 rounded-lg`}>
                    <span className="font-semibold">{item.range} : </span>
                    {item.desc}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Avantages de l'IMC</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilité et rapidité de calcul</li>
                <li>Indicateur reconnu internationalement</li>
                <li>Outil de dépistage efficace pour la surveillance du poids</li>
                <li>Référence utilisée par l'Organisation Mondiale de la Santé (OMS)</li>
              </ul>
            </section>

            <Separator className="my-6" />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limites de l'IMC</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ne prend pas en compte la composition corporelle (muscles, graisse)</li>
                  <li>Ne considère pas la répartition de la masse grasse</li>
                  <li>Ne tient pas compte de facteurs importants comme :</li>
                  <ul className="list-circle pl-8 space-y-1">
                    <li>L'âge</li>
                    <li>Le sexe</li>
                    <li>L'origine ethnique</li>
                    <li>La morphologie</li>
                  </ul>
                </ul>
              </div>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Utilisation Recommandée</h2>
              <p className="text-gray-700 mb-4">
                L'IMC doit être utilisé comme un outil de dépistage initial. Pour une évaluation complète 
                de votre santé, il est recommandé de consulter un professionnel de santé qui prendra en 
                compte d'autres facteurs tels que :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Votre historique de poids</li>
                <li>Votre mode de vie</li>
                <li>Vos antécédents médicaux</li>
                <li>Votre composition corporelle</li>
              </ul>
            </section>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BMIGuide;
