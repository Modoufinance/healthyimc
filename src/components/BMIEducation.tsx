
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BMIEducation = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Avertissement médical */}
      <Alert className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <div className="flex items-start">
          <InfoIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-base font-medium text-amber-800">Avis important</h3>
            <div className="mt-2 text-sm text-amber-700">
              {t.disclaimer}
            </div>
          </div>
        </div>
      </Alert>

      {/* FAQ avec mots-clés SEO */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{t.faq.title}</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {t.faq.items.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Contenu éducatif enrichi en SEO */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" id="comprendre-imc">{t.education.title}</h2>
        <div className="space-y-6">
          {t.education.sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Échelle visuelle d'IMC avec termes SEO */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" id="echelle-imc">Échelle d'IMC - Indice de Masse Corporelle</h2>
        <div className="relative h-12 bg-gradient-to-r from-blue-300 via-green-300 via-yellow-300 to-red-300 rounded-lg">
          <div className="absolute -top-6 left-0 text-sm">16</div>
          <div className="absolute -top-6 left-1/4 text-sm">18.5</div>
          <div className="absolute -top-6 left-1/2 text-sm">25</div>
          <div className="absolute -top-6 left-3/4 text-sm">30</div>
          <div className="absolute -top-6 right-0 text-sm">40</div>
        </div>
        <div className="flex justify-between mt-6 text-sm font-medium">
          <span title="IMC inférieur à 18.5">Maigreur</span>
          <span title="IMC entre 18.5 et 24.9">Normal</span>
          <span title="IMC entre 25 et 29.9">Surpoids</span>
          <span title="IMC supérieur à 30">Obésité</span>
        </div>
        
        {/* Informations complémentaires pour le SEO */}
        <div className="mt-6 text-sm text-gray-600">
          <p>
            L'indice de masse corporelle (IMC) est un outil de calcul qui permet d'évaluer votre statut pondéral 
            et d'estimer les risques potentiels pour votre santé. Il s'agit d'un indicateur utilisé par les 
            professionnels de santé du monde entier.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BMIEducation;
