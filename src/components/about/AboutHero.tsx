import { Building } from "lucide-react";

const AboutHero = () => {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Building className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          À Propos de SantéIMC
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
          Votre partenaire de confiance pour le suivi de votre santé et de votre bien-être
        </p>
      </div>
    </div>
  );
};

export default AboutHero;