
import SEO from "@/components/SEO";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import ContactForm from "@/components/about/ContactForm";

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HealthyIMC",
    "description": "Plateforme dédiée à la santé et au bien-être, créée par des professionnels de santé",
    "url": "https://healthyimc.com/about"
  };

  return (
    <>
      <SEO
        title="À Propos de HealthyIMC"
        description="Découvrez HealthyIMC, votre plateforme de santé et bien-être. Une équipe de professionnels dédiée à votre santé."
        keywords="santé, bien-être, imc, professionnels santé, nutritionnistes"
        canonicalUrl="https://healthyimc.com/about"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        <AboutHero />
        
        <MissionSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
