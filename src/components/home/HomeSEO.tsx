
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
    "name": "Calculateur IMC en ligne gratuit - SantéIMC",
    "description": "Calculez gratuitement votre IMC (Indice de Masse Corporelle). Outil adapté pour hommes, femmes et enfants. Obtenez des recommandations personnalisées pour votre santé.",
    "url": "https://santeimc.fr",
    "keywords": "imc, calcul imc, imc femme, imc homme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne, poids idéal",
  };

  return (
    <SEO
      title="Calculateur IMC en ligne gratuit | Calcul IMC pour Adultes et Enfants"
      description="Calculez gratuitement votre IMC en ligne. Outil précis et fiable pour calculer l'Indice de Masse Corporelle (IMC). Adapté pour hommes, femmes et enfants avec suivi personnalisé et conseils santé."
      keywords="imc, calcul imc, imc femme, imc homme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne, poids idéal, calcul poids santé, calculatrice imc, imc normal, imc surpoids, imc obésité"
      canonicalUrl="https://santeimc.fr"
      structuredData={structuredData}
      hasFAQ={true}
      faqItems={faqItems}
    />
  );
};

export default HomeSEO;
