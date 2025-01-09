import { Target, Heart, Users } from "lucide-react";

const MissionSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Notre Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Objectif</h3>
            <p className="text-gray-600">
              Rendre les outils de suivi de santé accessibles à tous, avec des calculateurs précis et faciles à utiliser.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Engagement</h3>
            <p className="text-gray-600">
              Fournir des informations fiables et validées par des professionnels de santé pour votre bien-être.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Communauté</h3>
            <p className="text-gray-600">
              Créer une communauté engagée autour de la santé et du bien-être, partageant conseils et expériences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;