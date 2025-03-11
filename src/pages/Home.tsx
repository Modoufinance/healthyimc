
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import HeroSection from "@/components/home/HeroSection";
import TrustIndicators from "@/components/home/TrustIndicators";
import TrustBadges from "@/components/home/TrustBadges";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import HomeSEO from "@/components/home/HomeSEO";
import BeforeAfterHighlights from "@/components/home/BeforeAfterHighlights";

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
    }
  ];

  return (
    <>
      <HomeSEO faqItems={faqItems} />
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

          <HeroSection />
          <TrustIndicators />
          <TrustBadges />
          <BeforeAfterHighlights />
          <Testimonials />
          <FinalCTA />
        </main>
      </div>
    </>
  );
};

export default Home;
