
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const HomeFAQ = () => {
  const faqItems = [
    {
      question: "Comment calculer son IMC?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m). Notre calculateur fait ce calcul automatiquement pour vous en quelques secondes."
    },
    {
      question: "Quel est l'IMC idéal?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal. En dessous de 18,5 indique une insuffisance pondérale, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité. Cependant, l'IMC idéal peut varier selon l'âge, le sexe et la masse musculaire."
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, l'âge, le sexe ou la répartition des graisses. Par exemple, les sportifs peuvent avoir un IMC élevé en raison de leur masse musculaire. Il doit être interprété par un professionnel de santé."
    },
    {
      question: "À quelle fréquence dois-je calculer mon IMC?",
      answer: "Pour un suivi régulier de votre santé, il est recommandé de calculer votre IMC tous les 3 à 6 mois. En cas de programme de perte ou de prise de poids, un calcul mensuel peut être utile pour suivre vos progrès."
    },
    {
      question: "Comment interpréter correctement mon résultat d'IMC?",
      answer: "L'interprétation de l'IMC doit prendre en compte votre profil personnel (âge, sexe, niveau d'activité physique). Notre calculateur fournit une première analyse, mais consultez un professionnel de santé pour une interprétation personnalisée complète."
    },
    {
      question: "Existe-t-il des calculateurs d'IMC adaptés aux enfants?",
      answer: "Oui, l'IMC des enfants et adolescents est évalué différemment en utilisant des courbes de croissance spécifiques à l'âge et au sexe. Notre calculateur propose une section dédiée aux enfants qui utilise ces courbes spécifiques."
    }
  ];

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-8 w-8 text-white" />
          <h2 className="text-3xl font-bold text-white">Questions fréquentes sur l'IMC</h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white/10 rounded-lg overflow-hidden border-0"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium text-white hover:text-white/90 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-white/90">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HomeFAQ;
