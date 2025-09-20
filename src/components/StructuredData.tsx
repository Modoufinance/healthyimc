import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "WebApplication" | "WebSite" | "Article" | "BlogPosting" | "FAQPage" | "HowTo" | "Organization";
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  // Données communes pour l'application
  const commonWebAppData = {
    name: "HealthyIMC - Calculateur IMC",
    description: "Calculateur d'IMC en ligne gratuit avec suivi personnalisé et conseils santé adaptés",
    url: "https://healthyimc.com",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    inLanguage: ["fr-FR", "en-US", "ar", "hi"],
    author: {
      "@type": "Organization",
      name: "HealthyIMC",
      url: "https://healthyimc.com",
      logo: "https://healthyimc.com/lovable-uploads/dba49e63-b060-48ba-af66-496f4579fc82.png"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1"
    }
  };

  // Fusionner les données selon le type
  let structuredData = baseData;

  if (type === "WebApplication") {
    structuredData = {
      ...commonWebAppData,
      ...baseData,
      featureList: [
        "Calcul IMC précis selon l'âge et le sexe",
        "Suivi personnalisé du poids",
        "Conseils santé adaptés",
        "Graphique d'évolution IMC",
        "Recommandations nutritionnelles",
        "Programme d'activité physique",
        "Interface multilingue",
        "Calculs adaptés aux enfants"
      ],
      screenshot: "https://healthyimc.com/lovable-uploads/fa3d23e1-be06-4b8f-812a-691e5c14a6ee.png"
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Fonctions utilitaires pour créer des données structurées spécifiques

export const createFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const createHowToStructuredData = (title: string, steps: Array<{ name: string; text: string; image?: string }>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: title,
  description: `Guide étape par étape pour ${title.toLowerCase()}`,
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image && { image: step.image })
  }))
});

export const createArticleStructuredData = (title: string, description: string, author: string, publishDate: string, modifyDate?: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description: description,
  author: {
    "@type": "Person",
    name: author
  },
  publisher: {
    "@type": "Organization",
    name: "HealthyIMC",
    logo: {
      "@type": "ImageObject",
      url: "https://healthyimc.com/lovable-uploads/dba49e63-b060-48ba-af66-496f4579fc82.png"
    }
  },
  datePublished: publishDate,
  ...(modifyDate && { dateModified: modifyDate }),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://healthyimc.com"
  }
});

export const createBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export default StructuredData;