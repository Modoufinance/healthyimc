
import React from 'react';
import { Card } from "@/components/ui/card";
import { Info, BookOpen, HeartPulse } from "lucide-react";

const BMIEducation = () => {
  const educationSections = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Comprendre l'IMC",
      description: "L'Indice de Masse Corporelle (IMC) est un indicateur simple qui permet d'estimer la corpulence d'une personne."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-green-500" />,
      title: "Santé et Bien-être",
      description: "Un IMC équilibré est un bon indicateur de santé général, mais il ne remplace pas un avis médical professionnel."
    },
    {
      icon: <Info className="h-6 w-6 text-orange-500" />,
      title: "Limites de l'IMC",
      description: "L'IMC ne tient pas compte de la masse musculaire, de l'âge, du sexe et de la répartition de la graisse corporelle."
    }
  ];

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
    </Card>
  );
};

export default BMIEducation;
