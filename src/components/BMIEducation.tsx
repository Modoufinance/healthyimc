
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
      <Alert className="bg-yellow-50 border-yellow-200">
        <InfoIcon className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          {t.disclaimer}
        </AlertDescription>
      </Alert>

      {/* FAQ */}
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

      {/* Contenu éducatif */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{t.education.title}</h2>
        <div className="space-y-6">
          {t.education.sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Échelle visuelle d'IMC */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Échelle d'IMC</h2>
        <div className="relative h-12 bg-gradient-to-r from-blue-300 via-green-300 via-yellow-300 to-red-300 rounded-lg">
          <div className="absolute -top-6 left-0 text-sm">16</div>
          <div className="absolute -top-6 left-1/4 text-sm">18.5</div>
          <div className="absolute -top-6 left-1/2 text-sm">25</div>
          <div className="absolute -top-6 left-3/4 text-sm">30</div>
          <div className="absolute -top-6 right-0 text-sm">40</div>
        </div>
        <div className="flex justify-between mt-6 text-sm">
          <span>Maigreur</span>
          <span>Normal</span>
          <span>Surpoids</span>
          <span>Obésité</span>
        </div>
      </Card>
    </div>
  );
};

export default BMIEducation;
