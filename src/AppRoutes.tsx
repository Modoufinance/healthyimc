
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { useLanguage } from "./contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Language } from "./i18n/types";

// Composant de loading
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

// Lazy loading des composants pour améliorer les performances
const Home = lazy(() => import("./pages/Home"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const BMICalculator = lazy(() => import("./components/BMICalculator"));
const AIHealthAssistant = lazy(() => import("./pages/AIHealthAssistant"));
const WellnessCompanion = lazy(() => import("./pages/WellnessCompanion"));
const BodyFatCalculator = lazy(() => import("./components/BodyFatCalculator"));
const CalorieCalculator = lazy(() => import("./components/CalorieCalculator"));
const ChildrenBMICalculator = lazy(() => import("./components/ChildrenBMICalculator"));
const SymptomAnalyzer = lazy(() => import("./pages/SymptomAnalyzer"));
const AIFitnessProgram = lazy(() => import("./pages/AIFitnessProgram"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const ModernCMSAdmin = lazy(() => import("./pages/ModernCMSAdmin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const BMIWomen = lazy(() => import("./pages/BMIWomen"));
const BMIMen = lazy(() => import("./pages/BMIMen"));
const IdealWeight = lazy(() => import("./pages/IdealWeight"));
const BMIEducation = lazy(() => import("./pages/BMIEducation"));
const BMINormal = lazy(() => import("./pages/BMINormal"));
const BMIOverweight = lazy(() => import("./pages/BMIOverweight"));
const BMIObesity = lazy(() => import("./pages/BMIObesity"));

const AppRoutes = () => {
  useLocaleDetection();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Détecter si l'URL contient un code de langue
    const pathSegments = location.pathname.split('/');
    const potentialLangCode = pathSegments[1];
    const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
    
    // Si nous sommes sur la page racine, pas besoin de vérifier
    if (location.pathname === '/') return;
    
    // Si l'URL contient un code de langue valide
    if (supportedLangs.includes(potentialLangCode as Language)) {
      if (potentialLangCode !== language) {
        // Mettre à jour la langue dans le contexte
        setLanguage(potentialLangCode as Language);
      }
    } 
    // Si nous sommes sur une page de contenu sans préfixe de langue et que la langue n'est pas française
    else if (language !== 'fr') {
      // Rediriger vers la même page mais avec le préfixe de langue
      navigate(`/${language}${location.pathname}`, { replace: true });
    }
  }, [location.pathname, language, navigate, setLanguage]);

  // Routes optimisées pour le SEO
  const getOptimizedRoutes = (langPrefix = '') => {
    const prefix = langPrefix ? `/${langPrefix}` : '';
    
    return (
      <>
        <Route path={`${prefix}/`} element={<Suspense fallback={<PageLoader />}><Index /></Suspense>} />
        <Route path={`${prefix}/accueil`} element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        
        {/* Routes calculateurs optimisées */}
        <Route path={`${prefix}/calculateur-imc`} element={<Suspense fallback={<PageLoader />}><BMICalculator /></Suspense>} />
        <Route path={`${prefix}/calculateur-imc-enfants`} element={<Suspense fallback={<PageLoader />}><ChildrenBMICalculator /></Suspense>} />
        <Route path={`${prefix}/calculateur-graisse-corporelle`} element={<Suspense fallback={<PageLoader />}><BodyFatCalculator /></Suspense>} />
        <Route path={`${prefix}/calculateur-calories`} element={<Suspense fallback={<PageLoader />}><CalorieCalculator /></Suspense>} />
        
        {/* Routes spécifiques pour le SEO */}
        <Route path={`${prefix}/calcul-imc-femme`} element={<Suspense fallback={<PageLoader />}><BMIWomen /></Suspense>} />
        <Route path={`${prefix}/calcul-imc-homme`} element={<Suspense fallback={<PageLoader />}><BMIMen /></Suspense>} />
        <Route path={`${prefix}/poids-ideal-calcul`} element={<Suspense fallback={<PageLoader />}><IdealWeight /></Suspense>} />
        <Route path={`${prefix}/indice-masse-corporelle`} element={<Suspense fallback={<PageLoader />}><BMIEducation /></Suspense>} />
        <Route path={`${prefix}/imc-normal`} element={<Suspense fallback={<PageLoader />}><BMINormal /></Suspense>} />
        <Route path={`${prefix}/imc-surpoids`} element={<Suspense fallback={<PageLoader />}><BMIOverweight /></Suspense>} />
        <Route path={`${prefix}/imc-obesite`} element={<Suspense fallback={<PageLoader />}><BMIObesity /></Suspense>} />
        
        {/* Routes assistants et outils */}
        <Route path={`${prefix}/analyseur-symptomes`} element={<Suspense fallback={<PageLoader />}><SymptomAnalyzer /></Suspense>} />
        <Route path={`${prefix}/assistant-sante-ia`} element={<Suspense fallback={<PageLoader />}><AIHealthAssistant /></Suspense>} />
        <Route path={`${prefix}/bien-etre`} element={<Suspense fallback={<PageLoader />}><WellnessCompanion /></Suspense>} />
        <Route path={`${prefix}/programme-fitness-ia`} element={<Suspense fallback={<PageLoader />}><AIFitnessProgram /></Suspense>} />
        
        {/* Routes blog */}
        <Route path={`${prefix}/blog`} element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
        <Route path={`${prefix}/blog/:slug`} element={<Suspense fallback={<PageLoader />}><BlogArticle /></Suspense>} />
        
        {/* Pages légales et informatives */}
        <Route path={`${prefix}/a-propos`} element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path={`${prefix}/confidentialite`} element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
      </>
    );
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <AdminAuthProvider>
        <Routes>
        {/* Routes d'administration */}
        <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
        <Route path="/admin/cms" element={<Suspense fallback={<PageLoader />}><ModernCMSAdmin /></Suspense>} />
        
        {/* Routes en français (par défaut) */}
        {getOptimizedRoutes()}
        
        {/* Routes pour chaque langue supportée */}
        {getOptimizedRoutes('en')}
        {getOptimizedRoutes('zh')}
        {getOptimizedRoutes('es')}
        {getOptimizedRoutes('ar')}
        {getOptimizedRoutes('hi')}
        {getOptimizedRoutes('pt')}
        {getOptimizedRoutes('bn')}
        {getOptimizedRoutes('ru')}
        {getOptimizedRoutes('ja')}
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AdminAuthProvider>
    </div>
  );
};

export default AppRoutes;
