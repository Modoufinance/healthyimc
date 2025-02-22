
import { Card } from "@/components/ui/card";
import { Smartphone, Globe, Shield, Database } from "lucide-react";

const WellnessFeatures = () => {
  return (
    <div className="mt-12 border-t border-white/20 pt-8">
      <h2 className="text-xl font-bold mb-6">Disponible sur toutes les plateformes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
          <div className="flex items-start space-x-4">
            <Smartphone className="w-6 h-6" />
            <div>
              <h3 className="font-semibold mb-2">Applications Mobiles</h3>
              <p className="text-sm opacity-80">
                Interface optimisée pour iOS et Android avec synchronisation en temps réel et fonctionnalités tactiles avancées.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
          <div className="flex items-start space-x-4">
            <Globe className="w-6 h-6" />
            <div>
              <h3 className="font-semibold mb-2">Application Web</h3>
              <p className="text-sm opacity-80">
                Accessible depuis n'importe quel navigateur avec une expérience utilisateur fluide et responsive.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Sécurité et Confidentialité Web 3.0</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6" />
              <div>
                <h3 className="font-semibold mb-2">Protection des Données</h3>
                <p className="text-sm opacity-80">
                  Vos données de santé sont cryptées et sécurisées grâce à la technologie blockchain.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/10 p-4 backdrop-blur-lg border-white/20">
            <div className="flex items-start space-x-4">
              <Database className="w-6 h-6" />
              <div>
                <h3 className="font-semibold mb-2">Stockage Décentralisé</h3>
                <p className="text-sm opacity-80">
                  Infrastructure Web 3.0 pour un contrôle total sur vos données personnelles.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WellnessFeatures;
