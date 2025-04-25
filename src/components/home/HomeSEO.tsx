
import SEO from "@/components/SEO";

interface HomeSEOProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}

const HomeSEO = ({ faqItems }: HomeSEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calculateur IMC en ligne gratuit - Indice de Masse Corporelle",
    "description": "Calculez gratuitement votre IMC (Indice de Masse Corporelle). Adapté pour hommes, femmes et enfants avec interprétation personnalisée et conseils santé. Calcul IMC en ligne simple et gratuit.",
    "url": "https://healthyimc.com",
    "keywords": [
      "calcul imc",
      "indice de masse corporelle",
      "calculatrice imc",
      "imc en ligne",
      "imc gratuit",
      "imc femme",
      "imc homme",
      "imc enfant",
      "calculateur imc",
      "poids idéal",
      "surpoids",
      "obésité",
      "calcul bmi",
      "poids santé",
      "imc calcul"
    ].join(", "),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://healthyimc.com/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <SEO
      title="Calculateur IMC en Ligne Gratuit | Calcul Indice de Masse Corporelle"
      description="Calculez gratuitement votre IMC en ligne. Outil précis pour le calcul de l'Indice de Masse Corporelle (IMC). Adapté pour hommes, femmes et enfants avec suivi personnalisé, interprétation IMC et conseils santé. Calcul IMC gratuit pour surpoids, obésité et poids normal."
      keywords="calcul imc, indice masse corporelle, imc femme, imc homme, imc enfant, calculateur imc, poids idéal, surpoids, obésité, calcul bmi, imc en ligne, calculatrice imc, poids santé, imc gratuit, imc calcul, calcul masse corporelle, imc normal, imc surpoids, comment calculer son imc, calcul imc en ligne simple"
      canonicalUrl="https://healthyimc.com"
      structuredData={structuredData}
      hasFAQ={true}
      faqItems={faqItems}
    />
  );
};

export default HomeSEO;
