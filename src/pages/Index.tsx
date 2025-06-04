
import QuickBMICalculator from "@/components/home/QuickBMICalculator";
import HomeSEO from "@/components/home/HomeSEO";
import { Link } from "react-router-dom";
import { Scale, Percent, Flame, Baby, Dumbbell, ArrowRight, CheckCircle, Star, Users } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-[#4facfe] via-[#3b9cfd] to-[#00f2fe] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10">
          {/* Hero Section with improved animations */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/30">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white font-medium">⭐ Plus de 50 000 utilisateurs satisfaits</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 drop-shadow-2xl leading-tight">
              Calculateur IMC
              <span className="block text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Gratuit & Instantané
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 text-center mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Découvrez votre indice de masse corporelle en 30 secondes avec notre calculateur certifié OMS
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-white text-sm font-medium">100% Gratuit</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-white text-sm font-medium">Certifié OMS</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-white text-sm font-medium">Résultat instantané</span>
              </div>
            </div>
          </div>

          <QuickBMICalculator />
          
          {/* Enhanced calculators grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link 
              to="/calculateur-imc" 
              className="group bg-white/15 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/25 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Scale className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Calculatrice IMC</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Calculez votre indice de masse corporelle et obtenez une analyse détaillée</p>
                </div>
                <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              to="/calculateur-imc-enfants" 
              className="group bg-white/15 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/25 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Baby className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">IMC Enfants</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Calculez l'IMC de votre enfant avec interprétation adaptée à son âge</p>
                </div>
                <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              to="/calculateur-graisse-corporelle" 
              className="group bg-white/15 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/25 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Percent className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Graisse Corporelle</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Estimez votre pourcentage de graisse corporelle en fonction de vos mesures</p>
                </div>
                <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              to="/calculateur-calories" 
              className="group bg-white/15 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/25 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Flame className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Calculatrice Calories</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Déterminez vos besoins caloriques quotidiens selon votre profil</p>
                </div>
                <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>

            <Link 
              to="/programme-fitness-ia" 
              className="group bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-8 rounded-2xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-blue-400/40 relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-3 py-1 rounded-full font-bold animate-pulse">NOUVEAU</span>
              </div>
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Dumbbell className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Programme Fitness IA</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Programme d'entraînement personnalisé par intelligence artificielle</p>
                </div>
                <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          </div>

          {/* Enhanced information section */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
                Qu'est-ce que l'IMC?
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                L'Indice de Masse Corporelle (IMC) est un indicateur qui permet d'évaluer rapidement votre corpulence 
                en fonction de votre taille et de votre poids. C'est un outil largement utilisé par les professionnels 
                de santé pour dépister les risques liés au poids.
              </p>
              
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Formule de calcul
                </h3>
                <div className="bg-black/20 p-4 rounded-lg">
                  <code className="text-yellow-300 text-lg font-mono">IMC = Poids (kg) / Taille² (m)</code>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  Exemple: 70 kg ÷ (1,75 × 1,75) = 22,9
                </p>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
                Interprétation des résultats
              </h3>
              <div className="space-y-4">
                {[
                  { range: "< 18,5", label: "Insuffisance pondérale", color: "bg-blue-400" },
                  { range: "18,5 - 24,9", label: "Corpulence normale", color: "bg-green-400" },
                  { range: "25 - 29,9", label: "Surpoids", color: "bg-yellow-400" },
                  { range: "30 - 34,9", label: "Obésité modérée", color: "bg-orange-400" },
                  { range: "35 - 39,9", label: "Obésité sévère", color: "bg-red-400" },
                  { range: "> 40", label: "Obésité morbide", color: "bg-red-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/10 rounded-lg border border-white/10">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-white font-semibold w-20">{item.range}</span>
                    <span className="text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, number: "50 000+", label: "Utilisateurs" },
              { icon: Scale, number: "100 000+", label: "Calculs IMC" },
              { icon: Star, number: "96%", label: "Satisfaction" },
              { icon: CheckCircle, number: "30 sec", label: "Calcul rapide" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-lg p-6 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <footer className="w-full mt-20 text-center text-white/70 text-sm relative z-10">
          <p>© {new Date().getFullYear()} HealthyIMC - Tous droits réservés</p>
          <p className="mt-1">Ce calculateur d'IMC ne remplace pas l'avis médical professionnel.</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
