
import React from 'react';
import { Card } from "@/components/ui/card";
import { Info, BookOpen, HeartPulse } from "lucide-react";

interface BMIEducationProps {
  category: string;
}

const BMIEducation = ({ category }: BMIEducationProps) => {
  const educationSections = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" aria-hidden="true" />,
      title: "Comprendre l'IMC",
      description: "L'Indice de Masse Corporelle (IMC) est un indicateur simple qui permet d'estimer la corpulence d'une personne en fonction de sa taille et de son poids. Il aide à évaluer les risques potentiels liés au poids sur la santé."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-green-500" aria-hidden="true" />,
      title: "Santé et Bien-être",
      description: "Un IMC équilibré est généralement associé à un meilleur état de santé global, avec moins de risques de maladies cardiovasculaires, de diabète de type 2 et d'autres problèmes de santé liés au poids."
    },
    {
      icon: <Info className="h-6 w-6 text-orange-500" aria-hidden="true" />,
      title: "Limites de l'IMC",
      description: "L'IMC ne tient pas compte de la répartition de la masse grasse et de la masse musculaire, ni des différences liées à l'âge, au sexe et à l'origine ethnique. Un avis médical reste indispensable pour une évaluation complète."
    }
  ];

  // Use category to potentially provide different education based on BMI category
  console.log(`Providing education for BMI category: ${category}`);

  return (
    <Card className="p-6 shadow-lg rounded-lg bg-white/10 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Éducation sur l'IMC
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationSections.map((section, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4 p-4 bg-white/20 rounded-lg">
            {section.icon}
            <h3 className="text-xl font-semibold text-white">{section.title}</h3>
            <p className="text-white/80">{section.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white/30 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Ressources pédagogiques</h3>
        <p className="text-white/90">
          L'IMC est un outil de référence utilisé par l'Organisation Mondiale de la Santé pour évaluer les risques liés au poids. 
          Pour des informations complètes sur l'IMC et ses implications pour la santé, consultez les ressources officielles ou 
          discutez avec un professionnel de santé qualifié.
        </p>
        <p className="mt-4 text-white/90 text-sm">
          Pour des informations médicales précises, consultez toujours un professionnel de santé qualifié.
        </p>
      </div>
    </Card>
  );
};

export default BMIEducation;
