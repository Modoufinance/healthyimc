
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import HeroSection from "@/components/home/HeroSection";
import TrustIndicators from "@/components/home/TrustIndicators";
import TrustBadges from "@/components/home/TrustBadges";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import HomeSEO from "@/components/home/HomeSEO";
import BeforeAfterHighlights from "@/components/home/BeforeAfterHighlights";
import HomeFAQ from "@/components/home/HomeFAQ";
import MedicalAuthorities from "@/components/home/MedicalAuthorities";
import UserProfiles from "@/components/home/UserProfiles";
import ComparaisonTable from "@/components/home/ComparaisonTable";
import VideoExplication from "@/components/home/VideoExplication";
import StickyHeader from "@/components/StickyHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

const Home = () => {
  // FAQ items for structured data
  const faqItems = [
    {
      question: "Comment calculer son IMC?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m)."
    },
    {
      question: "Quel est l'IMC idéal?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal. En dessous de 18,5 indique une insuffisance pondérale, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité."
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, l'âge, le sexe ou la répartition des graisses. Il doit être interprété par un professionnel de santé."
    },
    {
      question: "À quelle fréquence dois-je calculer mon IMC?",
      answer: "Pour un suivi régulier de votre santé, il est recommandé de calculer votre IMC tous les 3 à 6 mois."
    },
    {
      question: "Comment interpréter correctement mon résultat d'IMC?",
      answer: "L'interprétation de l'IMC doit prendre en compte votre profil personnel (âge, sexe, niveau d'activité physique)."
    },
    {
      question: "Existe-t-il des calculateurs d'IMC adaptés aux enfants?",
      answer: "Oui, l'IMC des enfants et adolescents est évalué différemment en utilisant des courbes de croissance spécifiques à l'âge et au sexe."
    }
  ];

  // Scroll to content function
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HomeSEO faqItems={faqItems} />
      <StickyHeader />
      
      {/* Hero section with improved design */}
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/fa3d23e1-be06-4b8f-812a-691e5c14a6ee.png')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          {/* Fil d'Ariane */}
          <Breadcrumb className="text-white/90 mb-8">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-white transition-colors">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
                Découvrez votre <span className="text-yellow-300">indice de masse corporelle</span> en moins d'une minute
              </h1>
              
              <p className="text-xl text-white/90 max-w-xl">
                Notre calculateur d'IMC vous permet d'obtenir une analyse personnalisée de votre poids et de votre santé en quelques clics.
                Recommandé par des professionnels de la santé.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                  <Link to="/calculateur-imc">
                    Calculer mon IMC gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" onClick={scrollToContent} className="text-white border-white hover:bg-white hover:text-blue-500">
                  En savoir plus
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/80">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-300" />
                  <span>100% Gratuit</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-300" />
                  <span>Résultats instantanés</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-1 text-green-300" />
                  <span>Approuvé par des médecins</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src="/lovable-uploads/dba49e63-b060-48ba-af66-496f4579fc82.png" 
                  alt="Calcul IMC" 
                  className="w-full h-auto rounded-xl mb-6"
                />
                <div className="text-center text-white">
                  <p className="font-bold text-xl mb-2">Plus de 50 000 utilisateurs</p>
                  <p className="text-white/80">font confiance à notre calculateur pour suivre leur santé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] text-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      
      <main id="content-section" className="bg-white">
        <div className="container mx-auto px-4 py-16 space-y-24">
          <TrustIndicators />
          <BeforeAfterHighlights />
          <UserProfiles />
          <VideoExplication />
          <MedicalAuthorities />
          <ComparaisonTable />
          <Testimonials />
          <HomeFAQ />
          <TrustBadges />
          <FinalCTA />
        </div>
      </main>
    </>
  );
};

export default Home;
