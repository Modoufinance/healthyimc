import { Link } from "react-router-dom";
import { ArrowRight, Activity, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HealthyIMC - Calculatrice IMC en ligne",
    "description": "Calculez gratuitement votre IMC et obtenez des recommandations personnalisées pour votre santé. Suivi de poids, conseils nutritionnels et programme d'activité physique adaptés.",
    "url": "https://santeimc.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://santeimc.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Calculatrice IMC en ligne gratuite | Calcul Indice de Masse Corporelle"
        description="Calculez gratuitement votre IMC et obtenez des recommandations personnalisées. Outil validé par des professionnels de santé pour le calcul de l'indice de masse corporelle avec suivi personnalisé."
        keywords="calculatrice imc, calcul imc, indice masse corporelle, poids idéal, imc normal, imc surpoids, imc obésité, imc homme, imc femme, poids santé"
        canonicalUrl="https://santeimc.fr"
        structuredData={structuredData}
      />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#4facfe] to-[#00f2fe] flex flex-col items-center justify-center p-4 md:p-8">
        <article className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <header className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Calculatrice IMC en ligne gratuite
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Calculez votre Indice de Masse Corporelle et obtenez des recommandations personnalisées pour votre santé
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Activity className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Calcul IMC précis</h3>
              <p>Obtenez votre IMC personnalisé selon votre âge, sexe et morphologie</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Suivi santé</h3>
              <p>Suivez votre progression et recevez des conseils adaptés à votre profil</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Conseils experts</h3>
              <p>Recommandations validées par des professionnels de santé</p>
            </div>
          </div>
          
          <div className="prose prose-lg text-white/90 max-w-3xl mx-auto space-y-6 px-4 mt-12">
            <section>
              <h2 className="text-2xl md:text-3xl text-white font-semibold">
                Qu'est-ce que l'IMC et pourquoi est-il important ?
              </h2>
              <p className="text-lg">
                L'Indice de Masse Corporelle (IMC) est un indicateur de santé reconnu mondialement qui permet d'évaluer 
                votre rapport poids/taille. Utilisé par les professionnels de santé, il aide à déterminer si votre poids 
                est dans une fourchette saine et à prévenir les risques liés au surpoids ou à l'insuffisance pondérale.
              </p>
            </section>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mt-8">
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
        </article>
      </div>
    </>
  );
};

export default Home;