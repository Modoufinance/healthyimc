
import * as React from "react";
import { translations } from "../i18n/translations";
import type { Language, TranslationType } from "../i18n/types";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("fr");

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
    
    // Mettre à jour l'URL si nécessaire
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
    
    // Si nous sommes sur la page d'accueil ou si le premier segment n'est pas une langue
    if (currentPath === '/' || (pathSegments[1] && !supportedLangs.includes(pathSegments[1] as Language))) {
      // Ne pas modifier l'URL pour le français (langue par défaut)
      if (language !== 'fr') {
        const newPath = `/${language}${currentPath === '/' ? '' : currentPath}`;
        window.history.replaceState(null, '', newPath);
      }
    } 
    // Si nous changeons de langue et sommes déjà sur une page avec préfixe de langue
    else if (supportedLangs.includes(pathSegments[1] as Language)) {
      const restOfPath = currentPath.substring(pathSegments[1].length + 1) || '';
      if (language === 'fr') {
        // Pour le français, retirer le préfixe de langue
        window.history.replaceState(null, '', `/${restOfPath}`);
      } else {
        // Pour les autres langues, mettre à jour le préfixe
        window.history.replaceState(null, '', `/${language}/${restOfPath}`);
      }
    }
  }, [language]);

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
