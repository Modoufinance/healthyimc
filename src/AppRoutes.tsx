
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
import CMSAdmin from "./pages/CMSAdmin";
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
        <Route path={`${prefix}/calcul-imc-femme`} element={<BMICalculator />} />
        <Route path={`${prefix}/calcul-imc-homme`} element={<BMICalculator />} />
        <Route path={`${prefix}/poids-ideal-calcul`} element={<BMICalculator />} />
        <Route path={`${prefix}/indice-masse-corporelle`} element={<BMICalculator />} />
        <Route path={`${prefix}/imc-normal`} element={<BMICalculator />} />
        <Route path={`${prefix}/imc-surpoids`} element={<BMICalculator />} />
        <Route path={`${prefix}/imc-obesite`} element={<BMICalculator />} />
        
        {/* Routes assistants et outils */}
        <Route path={`${prefix}/analyseur-symptomes`} element={<SymptomAnalyzer />} />
        <Route path={`${prefix}/assistant-sante-ia`} element={<AIHealthAssistant />} />
        <Route path={`${prefix}/bien-etre`} element={<WellnessCompanion />} />
        <Route path={`${prefix}/programme-fitness-ia`} element={<AIFitnessProgram />} />
        
        {/* Nouvelle route pour le blog */}
        <Route path={`${prefix}/blog`} element={<Blog />} />
        
        {/* Pages légales et informatives */}
        <Route path={`${prefix}/a-propos`} element={<About />} />
        <Route path={`${prefix}/confidentialite`} element={<Privacy />} />
      </>
    );
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Routes>
        {/* Route d'administration CMS */}
        <Route path="/admin/cms" element={<CMSAdmin />} />
        
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
    </div>
  );
};

export default AppRoutes;
