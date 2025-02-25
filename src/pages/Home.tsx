
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Heart, Brain, Award, Users, Calculator, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SEO from "@/components/SEO";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calculateur IMC en ligne - SantéIMC",
    "description": "Calculez gratuitement votre IMC (Indice de Masse Corporelle). Outil adapté pour hommes, femmes et enfants. Obtenez des recommandations personnalisées pour votre santé.",
    "url": "https://santeimc.fr",
    "keywords": "imc, calcul imc, imc femme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne",
  };

  const testimonials = [
    {
      name: "Marie L.",
      text: "Grâce à ce calculateur, j'ai pu suivre mon IMC et atteindre mes objectifs de santé.",
      rating: 5
    },
    {
      name: "Pierre D.",
      text: "Simple et précis. Les conseils personnalisés sont vraiment utiles !",
      rating: 5
    },
    {
      name: "Sophie M.",
      text: "Un outil indispensable pour suivre ma forme. Recommandé par mon médecin.",
      rating: 5
    }
  ];

  return (
    <>
      <SEO
        title="Calculateur IMC en ligne gratuit | Calcul IMC pour Adultes et Enfants"
        description="Calculez gratuitement votre IMC en ligne. Outil précis et fiable pour calculer l'Indice de Masse Corporelle (IMC). Adapté pour hommes, femmes et enfants avec suivi personnalisé et conseils santé."
        keywords="imc, calcul imc, imc femme, imc enfant, calculateur imc, indice masse corporelle, imc calcul, imc gratuit, imc en ligne, poids idéal, calcul poids santé"
        canonicalUrl="https://santeimc.fr"
        structuredData={structuredData}
      />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#4facfe] to-[#00f2fe]">
        <main className="container mx-auto px-4 py-12 space-y-16">
          {/* Hero Section avec Call-to-Action */}
          <section className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Calculez votre IMC gratuitement en moins d'une minute
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Rejoignez plus de 50 000 personnes qui ont déjà calculé leur IMC
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg w-full sm:w-auto animate-pulse"
              >
                <Link to="/calculateur-imc">
                  Calculer mon IMC maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-white/80 text-sm">Calcul gratuit • Résultat immédiat</p>
            </div>
          </section>

          {/* Indicateurs de confiance */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">50 000+</h3>
              <p>Utilisateurs satisfaits</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white">
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">100 000+</h3>
              <p>Calculs effectués</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">96%</h3>
              <p>Taux de satisfaction</p>
            </div>
          </section>

          {/* Badges de confiance */}
          <section className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">Approuvé par les professionnels de santé</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white rounded-full px-6 py-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Certifié OMS</span>
              </div>
              <div className="bg-white rounded-full px-6 py-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Validé par des médecins</span>
              </div>
              <div className="bg-white rounded-full px-6 py-2 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Précision garantie</span>
              </div>
            </div>
          </section>

          {/* Aperçu du processus */}
          <section className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Comment ça marche ?</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-white mb-2">
                  <span>Étape 1: Saisie des données</span>
                  <span>Étape 4: Résultats</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Calcul instantané</h3>
                    <p className="text-sm text-white/80">Résultat immédiat et personnalisé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Conseils experts</h3>
                    <p className="text-sm text-white/80">Recommandations adaptées à votre profil</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Témoignages */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Ce qu'en pensent nos utilisateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4">"{testimonial.text}"</p>
                  <p className="font-medium">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="text-center space-y-6">
            <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Prêt à connaître votre IMC ?
              </h2>
              <p className="text-white/90">
                Calcul gratuit et personnalisé en moins d'une minute
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto animate-pulse"
              >
                <Link to="/calculateur-imc">
                  Obtenir mon calcul gratuit maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
