
import React from 'react';
import { Card } from "@/components/ui/card";
import { Info, BookOpen, HeartPulse, AlertCircle, Activity, Apple } from "lucide-react";

interface BMIEducationProps {
  category: string;
}

const BMIEducation = ({ category }: BMIEducationProps) => {
  // Informations générales sur l'IMC
  const generalSections = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" aria-hidden="true" />,
      title: "Comprendre l'IMC",
      description: "L'Indice de Masse Corporelle (IMC) est un indicateur qui permet d'estimer la corpulence d'une personne en fonction de sa taille et de son poids. Il aide à évaluer les risques potentiels liés au poids sur la santé."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-green-500" aria-hidden="true" />,
      title: "Santé et Bien-être",
      description: "Un IMC équilibré est généralement associé à un meilleur état de santé global, avec moins de risques de maladies cardiovasculaires, de diabète de type 2 et d'autres problèmes de santé liés au poids."
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-orange-500" aria-hidden="true" />,
      title: "Limites de l'IMC",
      description: "L'IMC ne tient pas compte de la répartition de la masse grasse et de la masse musculaire, ni des différences liées à l'âge, au sexe et à l'origine ethnique. Un avis médical reste indispensable pour une évaluation complète."
    }
  ];

  // Informations spécifiques basées sur la catégorie d'IMC
  const getCategorySpecificInfo = () => {
    switch(category) {
      case "Maigreur":
        return {
          icon: <Activity className="h-10 w-10 text-blue-600" />,
          title: "Insuffisance pondérale",
          description: "Un IMC inférieur à 18,5 peut indiquer une insuffisance pondérale. Cela peut être lié à divers facteurs comme une alimentation insuffisante, des troubles du comportement alimentaire, ou certaines conditions médicales.",
          recommendations: [
            "Consultez un professionnel de santé pour évaluer votre état nutritionnel",
            "Augmentez progressivement votre apport calorique avec des aliments nutritifs",
            "Intégrez des protéines de qualité à chaque repas",
            "Pratiquez des exercices de renforcement musculaire adaptés"
          ]
        };
      case "Poids normal":
        return {
          icon: <Apple className="h-10 w-10 text-green-600" />,
          title: "Poids santé",
          description: "Votre IMC se situe entre 18,5 et 24,9, ce qui est considéré comme une corpulence normale. Cela suggère un équilibre sain entre votre poids et votre taille.",
          recommendations: [
            "Maintenez une alimentation équilibrée et variée",
            "Pratiquez une activité physique régulière (au moins 150 minutes par semaine)",
            "Continuez les contrôles médicaux réguliers",
            "Gérez votre stress et assurez-vous de dormir suffisamment"
          ]
        };
      case "Surpoids":
        return {
          icon: <Activity className="h-10 w-10 text-yellow-600" />,
          title: "Surpoids",
          description: "Un IMC entre 25 et 29,9 indique un surpoids. Cela peut augmenter le risque de développer certaines maladies chroniques comme le diabète de type 2 ou l'hypertension artérielle.",
          recommendations: [
            "Adoptez une alimentation équilibrée en contrôlant les portions",
            "Augmentez votre activité physique quotidienne",
            "Fixez-vous des objectifs réalistes de perte de poids (0,5 à 1 kg par semaine)",
            "Consultez un professionnel de santé pour un suivi personnalisé"
          ]
        };
      default:
        return {
          icon: <HeartPulse className="h-10 w-10 text-red-600" />,
          title: "Obésité",
          description: "Un IMC de 30 ou plus indique une obésité. Cela augmente significativement le risque de nombreux problèmes de santé comme les maladies cardiovasculaires, le diabète et certains cancers.",
          recommendations: [
            "Consultez un médecin pour une évaluation complète de votre santé",
            "Envisagez un suivi avec un diététicien-nutritionniste",
            "Intégrez progressivement l'activité physique dans votre quotidien",
            "Recherchez du soutien (groupes d'entraide, suivi psychologique si nécessaire)"
          ]
        };
    }
  };

  const categoryInfo = getCategorySpecificInfo();

  return (
    <Card className="p-6 shadow-lg rounded-lg bg-white/10 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Comprendre votre IMC
      </h2>
      
      {/* Informations spécifiques à la catégorie */}
      <div className="mb-8 p-5 bg-white/30 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          {categoryInfo.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{categoryInfo.title}</h3>
        <p className="text-white/90 mb-4">{categoryInfo.description}</p>
        <div className="mt-4">
          <h4 className="font-medium text-white mb-2">Recommandations personnalisées:</h4>
          <ul className="text-white/90 space-y-2">
            {categoryInfo.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-block bg-white/20 rounded-full p-1 mr-2 mt-0.5">
                  <span className="block h-1.5 w-1.5 bg-white rounded-full"></span>
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Informations générales sur l'IMC */}
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Informations générales
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {generalSections.map((section, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4 p-4 bg-white/20 rounded-lg">
            {section.icon}
            <h3 className="text-xl font-semibold text-white">{section.title}</h3>
            <p className="text-white/80">{section.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-white/30 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Ressources complémentaires</h3>
        <p className="text-white/90">
          L'IMC est un outil de référence utilisé par l'Organisation Mondiale de la Santé pour évaluer les risques liés au poids. 
          Pour des informations complètes sur l'IMC et ses implications pour la santé, consultez les ressources officielles ou 
          discutez avec un professionnel de santé qualifié.
        </p>
        <p className="mt-4 text-white/90 text-sm">
          <strong>Important :</strong> Pour des conseils médicaux personnalisés, consultez toujours un professionnel de santé qualifié.
        </p>
      </div>
    </Card>
  );
};

export default BMIEducation;
