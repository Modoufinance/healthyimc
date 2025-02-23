
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calculateur IMC en ligne - SantéIMC",
    "description": "Calculez gratuitement votre IMC (Indice de Masse Corporelle). Outil adapté pour hommes, femmes et enfants. Obtenez des recommandations personnalisées pour votre santé.",
    "url": "https://santeimc.fr",
    "keywords": "imc, calcul imc, imc femme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://santeimc.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Calculateur IMC en ligne gratuit | Calcul IMC pour Adultes et Enfants"
        description="Calculez gratuitement votre IMC en ligne. Outil précis et fiable pour calculer l'Indice de Masse Corporelle (IMC). Adapté pour hommes, femmes et enfants avec suivi personnalisé et conseils santé."
        keywords="imc, calcul imc, imc femme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne, poids idéal, calcul poids santé"
        canonicalUrl="https://santeimc.fr"
        structuredData={structuredData}
      />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#4facfe] to-[#00f2fe] flex flex-col items-center justify-center p-4 md:p-8">
        <main className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <header className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              Calculateur IMC en Ligne Gratuit
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Calculez votre Indice de Masse Corporelle (IMC) et obtenez des recommandations personnalisées pour votre santé
            </p>
          </header>

          <section aria-labelledby="features-heading" className="mt-16">
            <h2 id="features-heading" className="text-3xl font-bold text-white mb-8">
              Fonctionnalités principales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Activity className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calcul IMC Précis</h3>
                <p>Obtenez votre IMC personnalisé selon votre âge, sexe et morphologie</p>
              </article>
              
              <article className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Suivi Santé Complet</h3>
                <p>Suivez votre progression et recevez des conseils adaptés à votre profil</p>
              </article>
              
              <article className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conseils Experts</h3>
                <p>Recommandations validées par des professionnels de santé</p>
              </article>
            </div>
          </section>
          
          <section aria-labelledby="about-imc" className="prose prose-lg text-white/90 max-w-3xl mx-auto space-y-6 px-4 mt-16">
            <h2 id="about-imc" className="text-3xl font-bold text-white">
              Qu'est-ce que l'IMC et pourquoi est-il important ?
            </h2>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Un indicateur de santé fiable</h3>
              <p className="text-lg">
                L'Indice de Masse Corporelle (IMC) est un indicateur de santé reconnu mondialement qui permet d'évaluer 
                votre rapport poids/taille. Utilisé par les professionnels de santé, il aide à déterminer si votre poids 
                est dans une fourchette saine.
              </p>
              
              <h3 className="text-2xl font-semibold text-white">Adapté à tous les profils</h3>
              <p className="text-lg">
                Notre calculateur IMC est spécialement conçu pour les hommes, les femmes et les enfants. Il prend en compte 
                vos caractéristiques individuelles pour fournir des résultats précis et personnalisés.
              </p>
            </div>
          </section>
          
          <section aria-labelledby="cta-section" className="mt-12">
            <h2 id="cta-section" className="sr-only">Commencer le calcul IMC</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
              >
                <Link to="/calculator">
                  Calculer mon IMC maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Link to="/about">En savoir plus sur l'IMC</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
