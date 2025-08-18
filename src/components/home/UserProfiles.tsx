
import { User, Heart, Baby, Dumbbell, Clock } from "lucide-react";

const UserProfiles = () => {
  const profiles = [
    {
      icon: <User className="h-10 w-10 text-primary" />,
      title: "Adultes",
      description: "IMC standard adapté à tous les adultes avec interprétation selon l'âge et le sexe.",
      example: "Ex: Marie, 35 ans, a utilisé notre calculateur pour suivre sa santé globale."
    },
    {
      icon: <Baby className="h-10 w-10 text-primary" />,
      title: "Enfants et adolescents",
      description: "Calcul spécifique utilisant des courbes de croissance adaptées par âge et sexe.",
      example: "Ex: Les parents de Thomas, 8 ans, suivent sa croissance avec notre outil pédiatrique."
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-primary" />,
      title: "Sportifs",
      description: "Interprétation ajustée pour tenir compte de la masse musculaire plus importante.",
      example: "Ex: Nicolas, coureur amateur, a une analyse IMC prenant en compte sa composition corporelle."
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Seniors",
      description: "Calcul adapté aux personnes âgées avec recommandations spécifiques.",
      example: "Ex: Jeanne, 72 ans, utilise notre calculateur recommandé par son médecin."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Suivi de progression",
      description: "Parfait pour ceux qui suivent un programme de perte ou de prise de poids.",
      example: "Ex: Pierre a perdu 12kg en 6 mois et a suivi son évolution IMC chaque semaine."
    }
  ];

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
        Adapté à tous les profils
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-4">
              {profile.icon}
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-3">{profile.title}</h3>
            <p className="text-white/90 mb-4 text-center">{profile.description}</p>
            <p className="text-sm text-white/80 bg-white/10 p-3 rounded-lg italic">{profile.example}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfiles;
