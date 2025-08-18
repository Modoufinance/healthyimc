
import { Helmet } from "react-helmet";

interface EnhancedSEOProps {
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
  breadcrumbItems?: {name: string, url: string}[];
  articleStructuredData?: object;
}

const EnhancedSEO = ({
  title,
  description,
  keywords = "",
  canonicalUrl = "https://healthyimc.com",
  ogImage = "/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png",
  structuredData,
  language = "fr",
  author = "HealthyIMC",
  publishedTime,
  modifiedTime,
  type = "website",
  hasFAQ = false,
  faqItems = [],
  breadcrumbItems = [],
  articleStructuredData,
}: EnhancedSEOProps) => {
  const fullTitle = `${title} | HealthyIMC`;
  const fullDescription = description.length > 160 ? 
    `${description.substring(0, 157)}...` : description;

  // Données structurées FAQ enrichies
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
          "text": item.answer,
          "author": {
            "@type": "Organization",
            "name": "HealthyIMC"
          }
        }
      }))
    };
  }

  // Données structurées pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HealthyIMC",
    "url": "https://healthyimc.com",
    "logo": "https://healthyimc.com/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png",
    "description": "Calculateurs IMC gratuits et outils de santé en ligne",
    "foundingDate": "2024",
    "sameAs": [
      "https://www.facebook.com/healthyimc",
      "https://twitter.com/healthyimc"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["French", "English", "Spanish"]
    }
  };

  // Données structurées par défaut pour les calculateurs
  const defaultCalculatorSchema = !structuredData && type === "website" ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur IMC en ligne - HealthyIMC",
    "applicationCategory": "HealthApplication",
    "description": fullDescription,
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847"
    },
    "provider": {
      "@type": "Organization",
      "name": "HealthyIMC"
    }
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Open Graph enrichi */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="HealthyIMC" />
      <meta property="og:locale" content={`${language}_${language.toUpperCase()}`} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Cards enrichi */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@healthyimc" />
      <meta name="twitter:creator" content="@healthyimc" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO metas */}
      <meta name="theme-color" content="#4facfe" />
      <meta name="msapplication-TileColor" content="#4facfe" />
      <meta name="application-name" content="HealthyIMC" />
      <meta name="apple-mobile-web-app-title" content="HealthyIMC" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Performance hints */}
      <link rel="dns-prefetch" href="//healthyimc.com" />
      <link rel="preload" href="/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png" as="image" />

      {/* Structured Data - Organisation */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - Page spécifique */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* FAQ Structured Data */}
      {faqStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Article Structured Data */}
      {articleStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      )}
      
      {/* Default Calculator Schema */}
      {defaultCalculatorSchema && (
        <script type="application/ld+json">
          {JSON.stringify(defaultCalculatorSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default EnhancedSEO;
