
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import EnhancedFAQ from "../EnhancedFAQ";

const HomeFAQ = () => {
  const faqItems = [
    {
      question: "Comment calculer son IMC?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m). Notre calculateur fait ce calcul automatiquement pour vous en quelques secondes.",
      keywords: ["calcul", "formule", "imc", "poids", "taille", "mesure"]
    },
    {
      question: "Quel est l'IMC idéal?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal. En dessous de 18,5 indique une insuffisance pondérale, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité. Cependant, l'IMC idéal peut varier selon l'âge, le sexe et la masse musculaire.",
      keywords: ["idéal", "normal", "poids santé", "fourchette", "valeur"]
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, l'âge, le sexe ou la répartition des graisses. Par exemple, les sportifs peuvent avoir un IMC élevé en raison de leur masse musculaire. Il doit être interprété par un professionnel de santé.",
      keywords: ["fiabilité", "limites", "précision", "sportif", "inconvénients"]
    },
    {
      question: "À quelle fréquence dois-je calculer mon IMC?",
      answer: "Pour un suivi régulier de votre santé, il est recommandé de calculer votre IMC tous les 3 à 6 mois. En cas de programme de perte ou de prise de poids, un calcul mensuel peut être utile pour suivre vos progrès.",
      keywords: ["fréquence", "suivi", "régularité", "mesure", "progression"]
    },
    {
      question: "Comment interpréter correctement mon résultat d'IMC?",
      answer: "L'interprétation de l'IMC doit prendre en compte votre profil personnel (âge, sexe, niveau d'activité physique). Notre calculateur fournit une première analyse, mais consultez un professionnel de santé pour une interprétation personnalisée complète.",
      keywords: ["interprétation", "analyse", "résultat", "comprendre", "signification"]
    },
    {
      question: "Existe-t-il des calculateurs d'IMC adaptés aux enfants?",
      answer: "Oui, l'IMC des enfants et adolescents est évalué différemment en utilisant des courbes de croissance spécifiques à l'âge et au sexe. Notre calculateur propose une section dédiée aux enfants qui utilise ces courbes spécifiques.",
      keywords: ["enfant", "adolescent", "pédiatrique", "croissance", "jeune"]
    },
    {
      question: "Comment l'IMC peut-il aider à prévenir les problèmes de santé?",
      answer: "L'IMC est un outil de dépistage qui permet d'identifier les risques potentiels liés au poids. Maintenir un IMC dans la fourchette normale aide à réduire les risques de problèmes de santé comme les maladies cardiovasculaires, le diabète de type 2, l'hypertension artérielle et certains types de cancers. Un suivi régulier permet d'agir précocement en cas d'évolution défavorable.",
      keywords: ["prévention", "risques", "santé", "maladies", "dépistage"]
    },
    {
      question: "Quelles sont les alternatives ou compléments à l'IMC?",
      answer: "Pour une évaluation plus complète de la composition corporelle, d'autres mesures peuvent compléter l'IMC: le tour de taille (qui évalue la graisse abdominale), le rapport taille/hanches, l'impédancemétrie (qui mesure la masse grasse et la masse maigre), le pli cutané ou encore la densitométrie. Ces mesures permettent d'affiner l'analyse au-delà des simples rapport poids/taille de l'IMC.",
      keywords: ["alternatives", "complément", "graisse", "tour de taille", "composition corporelle"]
    }
  ];

  return (
    <section className="py-10">
      <EnhancedFAQ 
        title="Questions fréquentes sur l'IMC"
        description="Trouvez des réponses aux questions les plus courantes sur l'indice de masse corporelle"
        faqItems={faqItems}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl"
      />
    </section>
  );
};

export default HomeFAQ;
