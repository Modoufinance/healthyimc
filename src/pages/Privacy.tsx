import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Politique de confidentialité"
        description="Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée."
        keywords="confidentialité, RGPD, données personnelles, protection des données"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-8 text-[#4facfe]">Politique de Confidentialité</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Collecte des Données</h2>
                <p className="leading-relaxed">
                  Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services,
                  notamment votre poids, taille et âge pour le calcul de l'IMC. Ces informations sont
                  stockées de manière sécurisée et ne sont jamais partagées avec des tiers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Utilisation des Données</h2>
                <p className="leading-relaxed">
                  Vos données sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Calculer votre IMC et suivre votre progression</li>
                  <li>Vous fournir des recommandations personnalisées</li>
                  <li>Améliorer nos services et votre expérience utilisateur</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Protection des Données</h2>
                <p className="leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
                  pour protéger vos données personnelles contre tout accès non autorisé,
                  modification, divulgation ou destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Vos Droits</h2>
                <p className="leading-relaxed">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement de vos données</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                <p className="leading-relaxed">
                  Notre site utilise des cookies essentiels pour assurer son bon fonctionnement.
                  Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="leading-relaxed">
                  Pour toute question concernant notre politique de confidentialité ou pour exercer
                  vos droits, vous pouvez nous contacter à : privacy@healthyimc.fr
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Privacy;