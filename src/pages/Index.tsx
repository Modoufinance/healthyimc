
import QuickBMICalculator from "@/components/home/QuickBMICalculator";
import HomeSEO from "@/components/home/HomeSEO";
import { Link } from "react-router-dom";
import { Scale, Percent, Flame, Baby, Users, Star, Award, ArrowRight, Info, Heart } from "lucide-react";

const Index = () => {
  // FAQ items for structured data
  const faqItems = [
    {
      question: "Comment calculer son IMC?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m)."
    },
    {
      question: "Qu'est-ce qu'un IMC normal?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal selon l'Organisation Mondiale de la Santé."
    },
    {
      question: "Comment interpréter mon IMC?",
      answer: "Un IMC inférieur à 18,5 indique une insuffisance pondérale, entre 18,5 et 24,9 un poids normal, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité."
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, la répartition des graisses ou des différences morphologiques individuelles."
    },
    {
      question: "À quelle fréquence calculer son IMC?",
      answer: "Pour un suivi régulier, il est recommandé de calculer son IMC tous les 3 à 6 mois, ou après tout changement significatif de mode de vie."
    },
    {
      question: "L'IMC est-il adapté aux enfants?",
      answer: "Pour les enfants et adolescents, des courbes de croissance spécifiques sont utilisées car leur IMC varie naturellement avec l'âge et le sexe."
    }
  ];

  return (
    <>
      <HomeSEO faqItems={faqItems} />
      <div className="min-h-screen bg-gradient-to-b from-[#1a79e5] to-[#63b3ed] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Calculateur IMC Gratuit en Ligne
          </h1>
          <h2 className="text-xl md:text-2xl text-white text-center mb-10 font-medium">
            Calculez votre Indice de Masse Corporelle en quelques secondes
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <Users className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <p className="text-white text-sm font-medium">+50 000 utilisateurs</p>
              </div>
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <Star className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <p className="text-white text-sm font-medium">Évaluation 4.8/5</p>
              </div>
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <Award className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <p className="text-white text-sm font-medium">Médecins approuvés</p>
              </div>
            </div>
          </div>
          
          <QuickBMICalculator />
          
          {/* Calculatrices disponibles */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/calculateur-imc" 
              className="bg-white/20 backdrop-blur-lg p-6 rounded-xl hover:bg-white/30 transition-colors group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-blue-500/20 p-4 rounded-full group-hover:bg-blue-500/30 transition-colors">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice IMC</h3>
                <p className="text-white/80">Calculez votre indice de masse corporelle et obtenez une analyse détaillée</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-imc-enfants" 
              className="bg-white/20 backdrop-blur-lg p-6 rounded-xl hover:bg-white/30 transition-colors group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-green-500/20 p-4 rounded-full group-hover:bg-green-500/30 transition-colors">
                  <Baby className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">IMC Enfants</h3>
                <p className="text-white/80">Calculez l'IMC de votre enfant avec interprétation adaptée à son âge</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-graisse-corporelle" 
              className="bg-white/20 backdrop-blur-lg p-6 rounded-xl hover:bg-white/30 transition-colors group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-purple-500/20 p-4 rounded-full group-hover:bg-purple-500/30 transition-colors">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice Graisse Corporelle</h3>
                <p className="text-white/80">Estimez votre pourcentage de graisse corporelle en fonction de vos mesures</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-calories" 
              className="bg-white/20 backdrop-blur-lg p-6 rounded-xl hover:bg-white/30 transition-colors group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-orange-500/20 p-4 rounded-full group-hover:bg-orange-500/30 transition-colors">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice Calories</h3>
                <p className="text-white/80">Déterminez vos besoins caloriques quotidiens selon votre profil et vos objectifs</p>
              </div>
            </Link>
          </div>

          <div className="mt-12 bg-white/20 backdrop-blur-lg p-6 rounded-xl">
            <h2 className="flex items-center justify-center text-2xl font-bold text-white mb-4">
              <Info className="h-6 w-6 mr-2" />
              Qu'est-ce que l'IMC?
            </h2>
            <p className="text-white">
              L'Indice de Masse Corporelle (IMC) est un indicateur qui permet d'évaluer rapidement votre corpulence 
              en fonction de votre taille et de votre poids. C'est un outil largement utilisé par les professionnels 
              de santé pour dépister les risques liés au poids.
            </p>
            
            <h3 className="flex items-center text-xl font-bold text-white mt-6 mb-2">
              <Heart className="h-5 w-5 mr-2 text-white" />
              Comment se calcule l'IMC?
            </h3>
            <p className="text-white">
              La formule de calcul de l'IMC est simple: IMC = Poids (kg) / Taille² (m). Par exemple, une personne 
              de 70 kg mesurant 1,75 m aura un IMC de 70 / (1,75 × 1,75) = 22,9.
            </p>
            
            <h3 className="flex items-center text-xl font-bold text-white mt-6 mb-2">
              <Scale className="h-5 w-5 mr-2 text-white" />
              Interprétation des résultats
            </h3>
            <ul className="text-white list-disc pl-5 space-y-2">
              <li>Moins de 18,5 : Insuffisance pondérale (maigreur)</li>
              <li>Entre 18,5 et 24,9 : Corpulence normale</li>
              <li>Entre 25 et 29,9 : Surpoids</li>
              <li>Entre 30 et 34,9 : Obésité modérée</li>
              <li>Entre 35 et 39,9 : Obésité sévère</li>
              <li>Plus de 40 : Obésité morbide</li>
            </ul>
            
            <div className="mt-6 flex justify-center">
              <Link 
                to="/calculateur-imc"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Calculer mon IMC maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <footer className="w-full mt-16 text-center text-white/80 text-sm">
          <p>© {new Date().getFullYear()} HealthyIMC - Tous droits réservés</p>
          <p className="mt-1">Ce calculateur d'IMC ne remplace pas l'avis médical professionnel.</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
