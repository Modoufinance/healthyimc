
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Heart, Brain, Award, Users, Calculator, Shield, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
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
      rating: 5,
      beforeWeight: "85kg",
      afterWeight: "68kg",
      duration: "6 mois"
    },
    {
      name: "Pierre D.",
      text: "Simple et précis. Les conseils personnalisés sont vraiment utiles !",
      rating: 5,
      beforeWeight: "92kg",
      afterWeight: "78kg",
      duration: "4 mois"
    },
    {
      name: "Sophie M.",
      text: "Un outil indispensable pour suivre ma forme. Recommandé par mon médecin.",
      rating: 5,
      beforeWeight: "77kg",
      afterWeight: "65kg",
      duration: "5 mois"
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
        <main className="container mx-auto px-4 py-6 space-y-12">
          {/* Fil d'Ariane */}
          <Breadcrumb className="text-white/90">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-white transition-colors">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Hero Section avec Call-to-Action */}
          <section className="text-center space-y-8 animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Atteignez vos objectifs de santé avec notre calculateur d'IMC intelligent
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Un suivi personnalisé, des conseils d'experts et des prédictions basées sur l'IA pour transformer votre parcours santé
              </p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <span className="text-white font-semibold">✓ Calcul précis et instantané</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <span className="text-white font-semibold">✓ Recommandations personnalisées</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <span className="text-white font-semibold">✓ Suivi de progression</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/calculateur-imc">
                  Calculer mon IMC gratuitement
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <p className="text-white text-lg font-medium bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                +50 000 utilisateurs satisfaits
              </p>
            </div>
          </section>

          {/* Indicateurs de confiance */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">50 000+</h3>
              <p className="text-lg">Utilisateurs satisfaits</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">100 000+</h3>
              <p className="text-lg">Calculs effectués</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">96%</h3>
              <p className="text-lg">Taux de satisfaction</p>
            </div>
          </section>

          {/* Badges de confiance */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
              La référence pour le suivi de votre santé
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-base font-semibold">Certifié OMS</span>
              </div>
              <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-base font-semibold">Validé par des médecins</span>
              </div>
              <div className="bg-white rounded-full px-8 py-3 flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-base font-semibold">Précision garantie</span>
              </div>
            </div>
          </section>

          {/* Histoires de réussite */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-white mb-12 text-center drop-shadow-lg">
              Ils ont atteint leurs objectifs avec nous
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-lg">"{testimonial.text}"</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                      <span>Avant</span>
                      <span className="font-bold text-xl">{testimonial.beforeWeight}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                      <span>Après</span>
                      <span className="font-bold text-xl">{testimonial.afterWeight}</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Durée : {testimonial.duration}
                    </p>
                  </div>
                  <p className="font-semibold mt-4">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="text-center space-y-8 py-12">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Commencez votre parcours santé aujourd'hui
              </h2>
              <p className="text-xl text-white mb-8">
                Rejoignez plus de 50 000 personnes qui ont déjà transformé leur vie avec notre calculateur
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto py-8 px-12 text-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/calculateur-imc">
                  Calculer mon IMC gratuitement
                  <ArrowRight className="ml-2 h-6 w-6" />
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
