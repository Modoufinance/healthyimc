
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Navigation from "./components/Navigation";
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
import { useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";

const AppRoutes = () => {
  useLocaleDetection();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Gérer le changement de langue dans l'URL
  useEffect(() => {
    // Détecter si l'URL contient un code de langue
    const pathSegments = location.pathname.split('/');
    const potentialLangCode = pathSegments[1];
    const supportedLangs = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
    
    if (supportedLangs.includes(potentialLangCode) && potentialLangCode !== language) {
      // Si l'URL contient un code de langue différent de la langue actuelle
      setLanguage(potentialLangCode as any);
    } else if (pathSegments[1] && !supportedLangs.includes(pathSegments[1]) && language !== 'fr') {
      // Si nous sommes sur une page de contenu mais avec une langue autre que le français,
      // ajoutons le préfixe de langue à l'URL
      navigate(`/${language}${location.pathname}`, { replace: true });
    }
  }, [location.pathname, language, setLanguage, navigate]);

  // Fonction pour générer des routes pour chaque langue
  const generateLanguageRoutes = (langCode: string) => {
    const prefix = langCode === 'fr' ? '' : `/${langCode}`;
    
    return (
      <>
        <Route path={`${prefix}/`} element={<Index />} />
        <Route path={`${prefix}/accueil`} element={<Home />} />
        <Route path={`${prefix}/calculateur-imc`} element={<BMICalculator />} />
        <Route path={`${prefix}/calculateur-imc-enfants`} element={<ChildrenBMICalculator />} />
        <Route path={`${prefix}/calculateur-graisse-corporelle`} element={<BodyFatCalculator />} />
        <Route path={`${prefix}/calculateur-calories`} element={<CalorieCalculator />} />
        <Route path={`${prefix}/analyseur-symptomes`} element={<SymptomAnalyzer />} />
        <Route path={`${prefix}/assistant-sante-ia`} element={<AIHealthAssistant />} />
        <Route path={`${prefix}/bien-etre`} element={<WellnessCompanion />} />
        <Route path={`${prefix}/programme-fitness-ia`} element={<AIFitnessProgram />} />
        <Route path={`${prefix}/a-propos`} element={<About />} />
        <Route path={`${prefix}/confidentialite`} element={<Privacy />} />
      </>
    );
  };

  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Routes>
          {/* Routes en français (par défaut) */}
          {generateLanguageRoutes('fr')}
          
          {/* Routes pour chaque langue */}
          {generateLanguageRoutes('en')}
          {generateLanguageRoutes('zh')}
          {generateLanguageRoutes('es')}
          {generateLanguageRoutes('ar')}
          {generateLanguageRoutes('hi')}
          {generateLanguageRoutes('pt')}
          {generateLanguageRoutes('bn')}
          {generateLanguageRoutes('ru')}
          {generateLanguageRoutes('ja')}
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
