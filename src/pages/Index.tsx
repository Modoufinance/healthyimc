import QuickBMICalculator from "@/components/home/QuickBMICalculator";
import HomeSEO from "@/components/home/HomeSEO";
import AdSense from "@/components/AdSense";
import { Link } from "react-router-dom";
import { Scale, Percent, Flame, Baby, Dumbbell, ChevronDown, TrendingUp, Users, Clock, Award, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { PageTransition, StaggeredContainer } from "@/components/ui/page-transition";
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo";
import EnhancedSEO from "@/components/enhanced-seo";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // FAQ items pour données structurées enrichies
  const faqItems = [
    {
      question: "Comment calculer son IMC rapidement et gratuitement?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). Notre calculateur fait cette opération automatiquement en quelques secondes. La formule exacte est: IMC = Poids(kg) / Taille²(m). Par exemple, une personne de 70 kg mesurant 1,75 m aura un IMC de 22,9."
    },
    {
      question: "Qu'est-ce qu'un IMC normal et comment l'interpréter?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal selon l'OMS. Moins de 18,5 indique une insuffisance pondérale, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité. Ces valeurs sont des références générales qui peuvent varier selon l'âge, le sexe et la composition corporelle."
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un excellent indicateur de santé pour la population générale, mais il a des limites. Il ne distingue pas la masse musculaire de la masse graisseuse. Les sportifs, personnes âgées, femmes enceintes et enfants nécessitent une interprétation adaptée. Notre calculateur propose des analyses personnalisées selon votre profil."
    },
    {
      question: "À quelle fréquence calculer son IMC pour un suivi optimal?",
      answer: "Pour un suivi santé régulier, calculez votre IMC tous les 3 à 6 mois. Si vous suivez un programme de perte ou prise de poids, un calcul mensuel est recommandé. Nos outils permettent de suivre votre évolution dans le temps avec des graphiques personnalisés."
    },
    {
      question: "Comment interpréter correctement mon résultat d'IMC?",
      answer: "L'interprétation doit considérer votre âge, sexe, niveau d'activité physique et antécédents médicaux. Notre calculateur fournit une analyse détaillée avec des recommandations personnalisées. Pour une évaluation complète, consultez un professionnel de santé qui pourra interpréter vos résultats dans votre contexte médical."
    },
    {
      question: "Existe-t-il des calculateurs d'IMC spécialisés pour enfants?",
      answer: "Oui, l'IMC des enfants et adolescents nécessite des courbes de croissance spécifiques selon l'âge et le sexe. Notre calculateur enfants utilise les références de l'OMS et propose une interprétation adaptée au développement pédiatrique avec des conseils nutritionnels appropriés."
    },
    {
      question: "Quels sont les avantages d'utiliser un calculateur IMC en ligne?",
      answer: "Notre calculateur offre un calcul instantané, gratuit et précis 24h/24. Vous bénéficiez d'analyses détaillées, de conseils personnalisés, de graphiques d'évolution et de recommandations adaptées à votre profil. Plus de 50 000 utilisateurs nous font confiance pour leur suivi santé."
    },
    {
      question: "Comment améliorer son IMC de manière saine et durable?",
      answer: "Un IMC optimal s'obtient par une approche équilibrée combinant nutrition adaptée et activité physique régulière. Notre plateforme propose des calculateurs de calories, des programmes fitness personnalisés par IA et des conseils nutritionnels. L'accompagnement professionnel reste recommandé pour des objectifs spécifiques."
    }
  ];

  // Données structurées enrichies pour la page d'accueil
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HealthyIMC - Calculateur IMC Gratuit en Ligne",
    "description": "Calculez votre IMC gratuitement avec le calculateur le plus précis du web. Analyse détaillée, conseils personnalisés et suivi de votre évolution. Plus de 50 000 utilisateurs satisfaits.",
    "url": "https://healthyimc.com",
    "inLanguage": "fr-FR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://healthyimc.com/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HealthyIMC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://healthyimc.com/lovable-uploads/adeae93a-fc4a-48fc-9f9e-24e8017f5df7.png"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847"
    }
  };

  // Breadcrumb items for BreadcrumbsSEO component
  const breadcrumbItems = [
    { label: "Accueil", href: "/", current: true }
  ];

  // Breadcrumb items for EnhancedSEO component (different structure)
  const seoOreadcrumbItems = [
    { name: "Accueil", url: "https://healthyimc.com/" }
  ];

  const scrollToCalculator = () => {
    const calculator = document.querySelector('.quick-calculator');
    calculator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <EnhancedSEO
        title="Calculateur IMC Gratuit en Ligne | Calcul Indice de Masse Corporelle Précis"
        description="Calculez votre IMC gratuitement en 30 secondes. Outil précis et certifié OMS pour hommes, femmes et enfants. Analyse personnalisée, conseils santé et suivi de votre évolution. Plus de 50 000 utilisateurs satisfaits."
        keywords="calculateur imc gratuit, indice masse corporelle, calcul imc en ligne, imc femme, imc homme, calculateur imc enfant, poids idéal, surpoids, obésité, santé, nutrition, outil imc précis, calcul poids santé"
        canonicalUrl="https://healthyimc.com"
        structuredData={homeStructuredData}
        hasFAQ={true}
        faqItems={faqItems}
        breadcrumbItems={seoOreadcrumbItems}
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Éléments d'arrière-plan animés améliorés */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animation-delay-1000"></div>
          <div className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl animation-delay-2000"></div>
          <div className="floating-element absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-2xl animation-delay-500"></div>
        </div>

        <div className="w-full max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <PageTransition className="mb-6">
            <BreadcrumbsSEO 
              items={breadcrumbItems} 
              className="text-white/90 hover:text-white"
            />
          </PageTransition>

          {/* Hero Section amélioré */}
          <StaggeredContainer>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 drop-shadow-lg leading-tight">
                Calculateur IMC Gratuit
                <span className="block text-2xl md:text-4xl lg:text-5xl mt-2 text-white/90">
                  Résultat en 30 secondes
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-white/90 text-center mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
                Calculez votre Indice de Masse Corporelle avec l'outil le plus précis du web. 
                Analyse personnalisée et conseils santé inclus.
              </h2>
            </div>

            {/* Badges de confiance */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>50 000+ utilisateurs</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-green-300" />
                <span>Certifié OMS</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-300" />
                <span>Gratuit à vie</span>
              </div>
            </div>
          </StaggeredContainer>
          
          {/* Calculateur principal */}
          <PageTransition delay={300}>
            <div className="quick-calculator mb-8">
              <QuickBMICalculator />
            </div>
          </PageTransition>

          {/* Annonce AdSense après le calculateur */}
          <PageTransition delay={350}>
            <div className="mb-8 flex justify-center">
              <AdSense 
                adSlot="1234567890"
                adFormat="auto"
                className="max-w-2xl"
                style={{ minHeight: '200px' }}
              />
            </div>
          </PageTransition>

          {/* Indicateur de défilement amélioré */}
          <PageTransition delay={400}>
            <div className="flex flex-col items-center mt-8 space-y-2">
              <button 
                onClick={scrollToCalculator}
                className="text-white/80 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10 group"
                aria-label="Découvrir nos outils"
              >
                <ChevronDown className="h-8 w-8 animate-bounce group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-white/60 text-sm">Découvrez nos outils</span>
            </div>
          </PageTransition>
          
          {/* Grid des calculatrices avec animations améliorées */}
          <PageTransition delay={500}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Link 
                to="/calculateur-imc" 
                className="glassmorphism-card group hover-lift transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="icon-container bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                    <Scale className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Calculatrice IMC</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Calcul précis avec analyse détaillée et recommandations personnalisées</p>
                </div>
              </Link>
              
              <Link 
                to="/calculateur-imc-enfants" 
                className="glassmorphism-card group hover-lift transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="icon-container bg-green-500/20 group-hover:bg-green-500/30 transition-all duration-300">
                    <Baby className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">IMC Enfants</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Calculateur spécialisé avec courbes de croissance OMS</p>
                </div>
              </Link>
              
              <Link 
                to="/calculateur-graisse-corporelle" 
                className="glassmorphism-card group hover-lift transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="icon-container bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-300">
                    <Percent className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Graisse Corporelle</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Estimez précisément votre composition corporelle</p>
                </div>
              </Link>
              
              <Link 
                to="/calculateur-calories" 
                className="glassmorphism-card group hover-lift transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="icon-container bg-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-300">
                    <Flame className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Calories</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Calculez vos besoins caloriques selon vos objectifs</p>
                </div>
              </Link>

              <Link 
                to="/programme-fitness-ia" 
                className="glassmorphism-card group hover-lift border border-blue-400/30 relative overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                    IA
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="icon-container bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                    <Dumbbell className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Coach Fitness IA</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Programme d'entraînement personnalisé par intelligence artificielle</p>
                </div>
              </Link>
            </div>
          </PageTransition>

          {/* Section d'information enrichie */}
          <PageTransition delay={600}>
            <div className="mt-12 glassmorphism-card">
              <h2 className="text-2xl font-bold text-white mb-6">Pourquoi choisir notre calculateur IMC?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">✨ Précision maximale</h3>
                  <p className="text-white/90 leading-relaxed">
                    Notre calculateur utilise la formule officielle de l'OMS avec des algorithmes optimisés pour 
                    une précision maximale. Résultats instantanés et fiables utilisés par plus de 50 000 personnes.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">🔬 Analyse personnalisée</h3>
                  <p className="text-white/90 leading-relaxed">
                    Recevez une interprétation détaillée adaptée à votre profil (âge, sexe, activité physique) 
                    avec des recommandations personnalisées pour atteindre vos objectifs santé.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-4">📊 Comprendre votre IMC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                    <span className="text-white">Moins de 18,5 : Insuffisance pondérale</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    <span className="text-white">18,5 - 24,9 : Poids normal (idéal)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <span className="text-white">25 - 29,9 : Surpoids</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                    <span className="text-white">30 - 34,9 : Obésité modérée</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                    <span className="text-white">35 - 39,9 : Obésité sévère</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-red-600"></div>
                    <span className="text-white">Plus de 40 : Obésité morbide</span>
                  </div>
                </div>
              </div>
            </div>
          </PageTransition>

          {/* Annonce AdSense avant la FAQ */}
          <PageTransition delay={650}>
            <div className="mt-8 flex justify-center">
              <AdSense 
                adSlot="9876543210"
                adFormat="horizontal"
                className="max-w-4xl"
                style={{ minHeight: '100px' }}
              />
            </div>
          </PageTransition>

          {/* FAQ Section enrichie */}
          <PageTransition delay={700}>
            <div className="mt-12 glassmorphism-card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>❓</span>
                Questions fréquentes sur l'IMC
              </h2>
              <div className="space-y-4">
                {faqItems.slice(0, 4).map((faq, index) => (
                  <details key={index} className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/15 transition-colors">
                    <summary className="text-white font-medium text-lg">{faq.question}</summary>
                    <p className="text-white/90 mt-3 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/calculateur-imc" 
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5" />
                  Voir toutes les FAQ et calculer mon IMC
                </Link>
              </div>
            </div>
          </PageTransition>
        </div>
        
        {/* Footer amélioré */}
        <PageTransition delay={800}>
          <footer className="w-full mt-16 text-center text-white/80 text-sm space-y-2">
            <div className="flex justify-center items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>50 000+ utilisateurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>4.8/5 étoiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-green-300" />
                <span>Certifié OMS</span>
              </div>
            </div>
            <p>© {new Date().getFullYear()} HealthyIMC - Tous droits réservés | Calculateur IMC gratuit et précis</p>
            <p className="text-white/60">
              Ce calculateur d'IMC ne remplace pas l'avis médical professionnel. 
              Consultez un professionnel de santé pour une évaluation personnalisée.
            </p>
          </footer>
        </PageTransition>
      </div>
    </>
  );
};

export default Index;
