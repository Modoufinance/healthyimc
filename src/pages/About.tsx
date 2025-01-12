import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="À propos"
        description="Découvrez notre mission et notre engagement pour votre santé. HealthyIMC vous accompagne dans votre parcours bien-être."
        keywords="à propos, santé, bien-être, IMC, mission"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Mission Section */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <h1 className="text-3xl font-bold mb-6 text-[#4facfe]">Notre Mission</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Chez HealthyIMC, notre mission est de vous accompagner dans votre parcours vers une meilleure santé. 
                Nous croyons que chaque personne mérite d'avoir accès à des outils simples et efficaces pour suivre 
                et améliorer sa santé.
              </p>
            </Card>

            {/* Values Section */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-[#4facfe]">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-700">
                    Nous utilisons les dernières technologies pour vous offrir une expérience optimale.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibilité</h3>
                  <p className="text-gray-700">
                    Nos outils sont conçus pour être simples et accessibles à tous.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Confidentialité</h3>
                  <p className="text-gray-700">
                    Vos données sont protégées et sécurisées selon les plus hauts standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
                  <p className="text-gray-700">
                    Une équipe dévouée pour vous aider à atteindre vos objectifs.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-[#4facfe]">Contactez-nous</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#4facfe]" />
                  <span>contact@healthyimc.fr</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#4facfe]" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#4facfe]" />
                  <span>Paris, France</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;