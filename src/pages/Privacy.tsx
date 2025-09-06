
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";

const Privacy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Politique de Confidentialité - SantéIMC",
    "description": "Politique de confidentialité et protection des données personnelles de SantéIMC",
    "url": "https://santeimc.fr/privacy"
  };

  return (
    <>
      <SEO
        title="Politique de Confidentialité"
        description="Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée sur SantéIMC."
        keywords="confidentialité, protection données, rgpd, cookies, politique confidentialité"
        canonicalUrl="https://santeimc.fr/privacy"
        structuredData={structuredData}
      />
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* AdSense en haut */}
          <div className="mb-8 flex justify-center">
            <AdSense 
              adSlot="7777777777"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Politique de Confidentialité</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Collecte des Informations</h2>
              <p className="text-gray-600">
                Nous collectons uniquement les informations nécessaires au calcul de votre IMC (poids et taille). 
                Ces données ne sont pas stockées sur nos serveurs et sont uniquement utilisées pour le calcul instantané.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-6">2. Utilisation des Cookies</h2>
              <p className="text-gray-600">
                Notre site utilise des cookies essentiels pour assurer son bon fonctionnement. 
                Nous utilisons également Google Analytics pour comprendre comment notre site est utilisé.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-6">3. Protection des Données</h2>
              <p className="text-gray-600">
                Nous prenons la protection de vos données très au sérieux. Aucune information personnelle 
                n'est partagée avec des tiers sans votre consentement explicite.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-6">4. Vos Droits</h2>
              <p className="text-gray-600">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression 
                de vos données. Pour exercer ces droits, contactez-nous via notre page de contact.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-6">5. Publicité</h2>
              <p className="text-gray-600">
                Nous utilisons Google AdSense pour afficher des publicités. Ces annonces peuvent utiliser 
                des cookies pour personnaliser le contenu en fonction de vos centres d'intérêt.
              </p>
            </div>
          </div>
          
          {/* AdSense en bas */}
          <div className="mt-8 flex justify-center">
            <AdSense 
              adSlot="8888888888"
              adFormat="auto"
              className="max-w-2xl"
              style={{ minHeight: '200px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
