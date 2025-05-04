
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
    
    // Enregistrer la préférence de langue
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Récupérer la préférence de langue au chargement
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

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
