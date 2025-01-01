import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* À Propos Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">À Propos de Nous</h1>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600">
                Health Tracker est une plateforme dédiée à la santé et au bien-être, 
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
                <span className="text-gray-600">contact@healthtracker.com</span>
              </div>

              <form className="space-y-4 mt-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
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
  );
};

export default About;