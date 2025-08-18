import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, HelpCircle, Brain, Heart, Users } from "lucide-react";

interface InternalLink {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  category: "calculateur" | "contenu" | "aide" | "santé";
}

interface InternalLinksProps {
  currentPage?: string;
  category?: "all" | "calculateur" | "contenu" | "aide" | "santé";
  maxLinks?: number;
  showCategory?: boolean;
}

const InternalLinks = ({ 
  currentPage, 
  category = "all", 
  maxLinks = 6,
  showCategory = true 
}: InternalLinksProps) => {
  
  const allLinks: InternalLink[] = [
    {
      title: "Calculateur IMC",
      description: "Calculez gratuitement votre Indice de Masse Corporelle en ligne",
      url: "/calculateur-imc",
      icon: Calculator,
      category: "calculateur"
    },
    {
      title: "FAQ - Questions sur l'IMC",
      description: "Réponses aux questions fréquentes sur le calcul et l'interprétation de l'IMC",
      url: "/faq",
      icon: HelpCircle,
      category: "aide"
    },
    {
      title: "Blog Santé",
      description: "Articles et conseils d'experts pour maintenir une bonne santé",
      url: "/blog-sante",
      icon: BookOpen,
      category: "contenu"
    },
    {
      title: "Assistant Santé IA",
      description: "Obtenez des conseils personnalisés grâce à notre intelligence artificielle",
      url: "/assistant-sante-ia",
      icon: Brain,
      category: "santé"
    },
    {
      title: "Guide Bien-être",
      description: "Votre compagnon pour un mode de vie sain et équilibré",
      url: "/bien-etre",
      icon: Heart,
      category: "santé"
    },
    {
      title: "Blog IA",
      description: "Découvrez les dernières innovations en santé digitale",
      url: "/blog-ia",
      icon: Brain,
      category: "contenu"
    },
    {
      title: "À propos",
      description: "Découvrez notre mission et notre équipe d'experts santé",
      url: "/a-propos",
      icon: Users,
      category: "aide"
    }
  ];

  // Filtrer les liens selon la catégorie et exclure la page courante
  let filteredLinks = allLinks.filter(link => {
    if (currentPage && link.url === currentPage) return false;
    if (category === "all") return true;
    return link.category === category;
  });

  // Limiter le nombre de liens
  filteredLinks = filteredLinks.slice(0, maxLinks);

  if (filteredLinks.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <ArrowRight className="h-5 w-5 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">
          {category === "calculateur" && "Outils de calcul"}
          {category === "contenu" && "Contenu recommandé"}
          {category === "aide" && "Aide et support"}
          {category === "santé" && "Conseils santé"}
          {category === "all" && "Découvrez aussi"}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <link.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {link.description}
                </p>
                {showCategory && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    {link.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Composant spécialisé pour les liens liés à l'IMC
export const IMCRelatedLinks = ({ currentPage }: { currentPage?: string }) => {
  const imcLinks = [
    {
      title: "IMC Femme",
      description: "Calculateur et interprétation spécifique aux femmes",
      url: "/imc-femme"
    },
    {
      title: "IMC Homme", 
      description: "Calculateur adapté à la physiologie masculine",
      url: "/imc-homme"
    },
    {
      title: "IMC Enfant",
      description: "Calcul d'IMC pédiatrique avec courbes de croissance",
      url: "/imc-enfant"
    },
    {
      title: "Tableau IMC",
      description: "Classification complète des catégories d'IMC",
      url: "/tableau-imc"
    },
    {
      title: "Interprétation IMC",
      description: "Guide détaillé pour comprendre vos résultats",
      url: "/interpretation-imc"
    },
    {
      title: "Poids Idéal",
      description: "Calculez votre poids de forme optimal",
      url: "/poids-ideal"
    }
  ];

  return (
    <div className="bg-blue-50 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calculator className="h-6 w-6 text-blue-500" />
        Outils IMC spécialisés
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imcLinks
          .filter(link => currentPage !== link.url)
          .map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="group bg-white rounded-lg p-4 hover:bg-blue-500 hover:text-white transition-all duration-300 border border-blue-100"
            >
              <h3 className="font-semibold mb-2 group-hover:text-white">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-blue-100">
                {link.description}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default InternalLinks;