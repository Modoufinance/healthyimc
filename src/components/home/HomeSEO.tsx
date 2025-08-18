
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
    "name": "Calculateur IMC en Ligne Gratuit - Indice de Masse Corporelle",
    "description": "Calculez votre IMC (Indice de Masse Corporelle) en ligne gratuitement. Outil précis pour hommes, femmes et enfants avec interprétation personnalisée et conseils santé. Calculateur IMC simple et gratuit.",
    "url": "https://healthyimc.com",
    "keywords": [
      "calculateur imc",
      "indice de masse corporelle",
      "calculateur imc femme",
      "calculateur imc homme",
      "calcul imc",
      "tableau imc",
      "imc calcul",
      "calcul poids idéal",
      "indice graisse corporelle",
      "imc adulte",
      "imc formule",
      "calculateur imc par âge",
      "imc femme",
      "imc homme",
      "imc norme",
      "test imc",
      "calculateur imc",
      "tableau indice masse corporelle",
      "calculer imc formule",
      "calculateur poids idéal"
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
      description="Calculez votre IMC en ligne gratuitement. Outil précis pour le calcul de l'Indice de Masse Corporelle. Idéal pour hommes, femmes et enfants avec suivi personnalisé, interprétation IMC et conseils santé. Calcul IMC gratuit pour surpoids, obésité et plages de poids normal."
      keywords="calculateur imc, indice de masse corporelle, calculateur imc femmes, calculateur imc hommes, calcul imc, tableau imc, imc calcul, calcul poids idéal, surpoids, obésité, imc formule, imc en ligne, outil calculateur, poids santé, imc gratuit, calcul imc, calcul masse corporelle, imc normal, imc surpoids, comment calculer imc, calculateur imc simple"
      canonicalUrl="https://healthyimc.com"
      structuredData={structuredData}
      hasFAQ={true}
      faqItems={faqItems}
    />
  );
};

export default HomeSEO;
