import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import { useState } from "react";

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SantéIMC",
    "description": "Plateforme dédiée à la santé et au bien-être, créée par des professionnels de santé",
    "url": "https://santeimc.fr/about",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+221 78 448 82 59",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "TOUBA",
      "addressCountry": "SENEGAL"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification basique des champs
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs du formulaire."
      });
      return;
    }

    // Simulation d'envoi réussi
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais."
    });

    // Réinitialisation du formulaire
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <SEO
        title="À Propos de SantéIMC"
        description="Découvrez SantéIMC, votre plateforme de santé et bien-être. Une équipe de professionnels dédiée à votre santé."
        keywords="santé, bien-être, imc, professionnels santé, nutritionnistes"
        canonicalUrl="https://santeimc.fr/about"
        structuredData={structuredData}
      />
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* À Propos Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">À Propos de Nous</h1>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600">
                  SantéIMC est une plateforme dédiée à la santé et au bien-être, 
                  créée par une équipe de professionnels de santé et d'experts en technologie.
                </p>
                
                <h2 className="text-xl font-semibold text-gray-900 mt-6">Notre Mission</h2>
                <p className="text-gray-600">
                  Notre objectif est de rendre les outils de suivi de santé accessibles à tous, 
                  en commençant par notre calculateur d'IMC précis et facile à utiliser.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Notre Équipe</h2>
                <p className="text-gray-600">
                  Notre équipe est composée de nutritionnistes, développeurs et designers 
                  passionnés par la santé numérique et l'expérience utilisateur.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">+221 78 448 82 59</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">TOUBA, SENEGAL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">contact@santeimc.fr</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Envoyer
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;