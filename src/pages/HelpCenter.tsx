import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const HelpCenter = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: "Comment est calculé l'IMC ?",
      answer: "L'IMC (Indice de Masse Corporelle) est calculé en divisant votre poids en kilogrammes par le carré de votre taille en mètres. La formule est : IMC = poids (kg) / (taille (m))²"
    },
    {
      question: "Que signifient les différentes catégories d'IMC ?",
      answer: "Les catégories d'IMC sont : Insuffisance pondérale (<18.5), Poids normal (18.5-24.9), Surpoids (25-29.9), et Obésité (>30). Ces catégories aident à évaluer les risques pour la santé."
    },
    {
      question: "Comment utiliser le chatbot ?",
      answer: "Notre chatbot est conçu pour répondre à vos questions sur la santé et l'IMC. Tapez simplement votre question dans la zone de texte et appuyez sur Envoyer. Le chatbot vous fournira des informations pertinentes et des conseils personnalisés."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Centre d'aide</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default HelpCenter;