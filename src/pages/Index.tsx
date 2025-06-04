
import QuickBMICalculator from "@/components/home/QuickBMICalculator";
import HomeSEO from "@/components/home/HomeSEO";
import { Link } from "react-router-dom";
import { Scale, Percent, Flame, Baby, Dumbbell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const scrollToCalculator = () => {
    const calculator = document.querySelector('.quick-calculator');
    calculator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HomeSEO faqItems={faqItems} />
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animation-delay-1000"></div>
          <div className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl animation-delay-2000"></div>
        </div>

        <div className="w-full max-w-4xl mx-auto relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg animate-fade-in">
              Calculateur IMC Gratuit en Ligne
            </h1>
            <h2 className="text-xl md:text-2xl text-white text-center mb-10 font-medium animate-fade-in animation-delay-500">
              Calculez votre Indice de Masse Corporelle en quelques secondes
            </h2>
          </div>
          
          <div className={`quick-calculator transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <QuickBMICalculator />
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-8 animate-bounce">
            <button 
              onClick={scrollToCalculator}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Faire défiler vers le calculateur"
            >
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
          
          {/* Calculatrices disponibles */}
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link 
              to="/calculateur-imc" 
              className="glassmorphism-card group hover-lift"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="icon-container bg-blue-500/20 group-hover:bg-blue-500/30">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice IMC</h3>
                <p className="text-white/80 leading-relaxed">Calculez votre indice de masse corporelle et obtenez une analyse détaillée</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-imc-enfants" 
              className="glassmorphism-card group hover-lift"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="icon-container bg-green-500/20 group-hover:bg-green-500/30">
                  <Baby className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">IMC Enfants</h3>
                <p className="text-white/80 leading-relaxed">Calculez l'IMC de votre enfant avec interprétation adaptée à son âge</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-graisse-corporelle" 
              className="glassmorphism-card group hover-lift"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="icon-container bg-purple-500/20 group-hover:bg-purple-500/30">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice Graisse Corporelle</h3>
                <p className="text-white/80 leading-relaxed">Estimez votre pourcentage de graisse corporelle en fonction de vos mesures</p>
              </div>
            </Link>
            
            <Link 
              to="/calculateur-calories" 
              className="glassmorphism-card group hover-lift"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="icon-container bg-orange-500/20 group-hover:bg-orange-500/30">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculatrice Calories</h3>
                <p className="text-white/80 leading-relaxed">Déterminez vos besoins caloriques quotidiens selon votre profil et vos objectifs</p>
              </div>
            </Link>

            <Link 
              to="/programme-fitness-ia" 
              className="glassmorphism-card group hover-lift border border-blue-400/30 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                  NOUVEAU
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="icon-container bg-blue-500/20 group-hover:bg-blue-500/30">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Programme Fitness IA</h3>
                <p className="text-white/80 leading-relaxed">Découvrez notre nouveau programme d'entraînement personnalisé par IA</p>
              </div>
            </Link>
          </div>

          <div className={`mt-12 glassmorphism-card transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-4">Qu'est-ce que l'IMC?</h2>
            <p className="text-white leading-relaxed mb-6">
              L'Indice de Masse Corporelle (IMC) est un indicateur qui permet d'évaluer rapidement votre corpulence 
              en fonction de votre taille et de votre poids. C'est un outil largement utilisé par les professionnels 
              de santé pour dépister les risques liés au poids.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-3">Comment se calcule l'IMC?</h3>
            <p className="text-white leading-relaxed mb-6">
              La formule de calcul de l'IMC est simple: IMC = Poids (kg) / Taille² (m). Par exemple, une personne 
              de 70 kg mesurant 1,75 m aura un IMC de 70 / (1,75 × 1,75) = 22,9.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-3">Interprétation des résultats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                  <span className="text-white">Moins de 18,5 : Insuffisance pondérale</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <span className="text-white">18,5 - 24,9 : Corpulence normale</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span className="text-white">25 - 29,9 : Surpoids</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                  <span className="text-white">30 - 34,9 : Obésité modérée</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span className="text-white">35 - 39,9 : Obésité sévère</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <span className="text-white">Plus de 40 : Obésité morbide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className={`w-full mt-16 text-center text-white/80 text-sm transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p>© {new Date().getFullYear()} HealthyIMC - Tous droits réservés</p>
          <p className="mt-1">Ce calculateur d'IMC ne remplace pas l'avis médical professionnel.</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
