
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import BMICalculator from "./components/BMICalculator";
import AIHealthAssistant from "./pages/AIHealthAssistant";
import WellnessCompanion from "./pages/WellnessCompanion";
import BodyFatCalculator from "./components/BodyFatCalculator";
import CalorieCalculator from "./components/CalorieCalculator";
import ChildrenBMICalculator from "./components/ChildrenBMICalculator";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import AIFitnessProgram from "./pages/AIFitnessProgram";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import ModernCMSAdmin from "./pages/ModernCMSAdmin";
import AdminLogin from "./pages/AdminLogin";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import BMIWomen from "./pages/BMIWomen";
import BMIMen from "./pages/BMIMen";
import IdealWeight from "./pages/IdealWeight";
import BMIEducation from "./pages/BMIEducation";
import BMINormal from "./pages/BMINormal";
import BMIOverweight from "./pages/BMIOverweight";
import BMIObesity from "./pages/BMIObesity";
import Sitemap from "./pages/Sitemap";
import Shop from "./pages/Shop";
import MyPurchases from "./pages/MyPurchases";
import { useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Language } from "./i18n/types";

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
        <Route path={`${prefix}/`} element={<Index />} />
        <Route path={`${prefix}/accueil`} element={<Home />} />
        
        {/* Routes calculateurs optimisées */}
        <Route path={`${prefix}/calculateur-imc`} element={<BMICalculator />} />
        <Route path={`${prefix}/calculateur-imc-enfants`} element={<ChildrenBMICalculator />} />
        <Route path={`${prefix}/calculateur-graisse-corporelle`} element={<BodyFatCalculator />} />
        <Route path={`${prefix}/calculateur-calories`} element={<CalorieCalculator />} />
        
        {/* Routes spécifiques pour le SEO */}
        <Route path={`${prefix}/calcul-imc-femme`} element={<BMIWomen />} />
        <Route path={`${prefix}/calcul-imc-homme`} element={<BMIMen />} />
        <Route path={`${prefix}/poids-ideal-calcul`} element={<IdealWeight />} />
        <Route path={`${prefix}/indice-masse-corporelle`} element={<BMIEducation />} />
        <Route path={`${prefix}/imc-normal`} element={<BMINormal />} />
        <Route path={`${prefix}/imc-surpoids`} element={<BMIOverweight />} />
        <Route path={`${prefix}/imc-obesite`} element={<BMIObesity />} />
        
        {/* Routes assistants et outils */}
        <Route path={`${prefix}/analyseur-symptomes`} element={<SymptomAnalyzer />} />
        <Route path={`${prefix}/assistant-sante-ia`} element={<AIHealthAssistant />} />
        <Route path={`${prefix}/bien-etre`} element={<WellnessCompanion />} />
        <Route path={`${prefix}/programme-fitness-ia`} element={<AIFitnessProgram />} />
        
        {/* Routes blog */}
        <Route path={`${prefix}/blog`} element={<Blog />} />
        <Route path={`${prefix}/blog/:slug`} element={<BlogArticle />} />
        
        {/* Routes e-commerce */}
        <Route path={`${prefix}/boutique`} element={<Shop />} />
        <Route path={`${prefix}/mes-achats`} element={<MyPurchases />} />
        
        {/* Pages légales et informatives */}
        <Route path={`${prefix}/a-propos`} element={<About />} />
        <Route path={`${prefix}/confidentialite`} element={<Privacy />} />
        <Route path={`${prefix}/plan-du-site`} element={<Sitemap />} />
      </>
    );
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <AdminAuthProvider>
        <Routes>
        {/* Routes d'administration */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/cms" element={<ModernCMSAdmin />} />
        
        {/* Routes e-commerce sans préfixe */}
        <Route path="/boutique" element={<Shop />} />
        <Route path="/mes-achats" element={<MyPurchases />} />
        
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
