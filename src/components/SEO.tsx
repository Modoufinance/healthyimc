
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
  canonicalUrl = "https://healthyimc.com",
  ogImage = "/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png",
  structuredData,
  language = "fr",
  author = "HealthyIMC - Votre partenaire santé",
  publishedTime,
  modifiedTime,
  type = "website",
  hasFAQ = false,
  faqItems = [],
}: SEOProps) => {
  const fullTitle = `${title} | HealthyIMC`;

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
    "name": "Calculateur IMC en ligne - HealthyIMC",
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
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="theme-color" content="#4facfe" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="HealthyIMC" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate language versions */}
      {alternateUrls && alternateUrls.map((alt, index) => (
        <link key={index} rel="alternate" hreflang={alt.hreflang} href={alt.href} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://healthyimc.com${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={language === "fr" ? "fr_FR" : "en_US"} />
      <meta property="og:site_name" content="HealthyIMC" />
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
