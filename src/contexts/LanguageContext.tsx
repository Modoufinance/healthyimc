
import * as React from "react";
import { translations } from "../i18n/translations";
import type { Language, TranslationType } from "../i18n/types";
import { useNavigate, useLocation } from "react-router-dom";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("fr");
  const navigate = useNavigate();
  const location = useLocation();

  // Gérer le changement de langue et mettre à jour la direction du texte pour l'arabe
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Adapter l'interface selon la direction du texte
    if (language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    // Enregistrer la préférence de langue
    localStorage.setItem('preferredLanguage', language);
    
    // Optimisation des URLs: mise à jour de l'URL selon la langue sélectionnée
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
    
    // Si premier segment est une langue
    if (pathSegments[1] && supportedLangs.includes(pathSegments[1] as Language)) {
      if (language === 'fr') {
        // Pour le français (langue par défaut), on retire le préfixe
        const newPath = '/' + pathSegments.slice(2).join('/');
        navigate(newPath || '/', { replace: true });
      } else if (pathSegments[1] !== language) {
        // Si on change de langue mais qu'on a déjà un préfixe, on le remplace
        const newPath = `/${language}/` + pathSegments.slice(2).join('/');
        navigate(newPath, { replace: true });
      }
    } 
    // Si on n'a pas de préfixe de langue dans l'URL
    else if (language !== 'fr') {
      // On ajoute le préfixe pour toutes les langues sauf le français
      navigate(`/${language}${currentPath === '/' ? '' : currentPath}`, { replace: true });
    }
  }, [language, navigate, location.pathname]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language] || translations.fr
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
