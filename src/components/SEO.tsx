
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  language?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: string;
  hasFAQ?: boolean;
  faqItems?: {question: string, answer: string}[];
}

const SEO = ({
  title,
  description,
  keywords = "",
  canonicalUrl = "https://santeimc.fr",
  ogImage = "/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png",
  structuredData,
  language = "fr",
  author = "HealthyIMC",
  publishedTime,
  modifiedTime,
  type = "website",
  hasFAQ = false,
  faqItems = [],
}: SEOProps) => {
  const fullTitle = `${title} | SantéIMC`;

  // Création de données structurées FAQ si nécessaire
  let faqStructuredData = null;
  if (hasFAQ && faqItems.length > 0) {
    faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }

  // Création de données structurées par défaut pour les pages IMC si aucune n'est fournie
  const defaultStructuredData = !structuredData && type === "website" ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur IMC en ligne - SantéIMC",
    "applicationCategory": "HealthApplication",
    "description": "Calculez gratuitement votre IMC (Indice de Masse Corporelle). Outil adapté pour hommes, femmes et enfants.",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  } : null;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={`${language}_${language.toUpperCase()}`} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Balises additionnelles pour le SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* FAQ Structured Data if provided */}
      {faqStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      )}
      
      {/* Default Structured Data if nothing provided */}
      {defaultStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(defaultStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
