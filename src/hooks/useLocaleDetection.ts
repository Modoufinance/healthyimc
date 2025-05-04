
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useLocaleDetection = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const detectLanguage = () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage) {
        setLanguage(savedLanguage as any);
        return;
      }

      const browserLang = navigator.language.split('-')[0];
      // Liste des langues supportées
      const supportedLangs = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
      
      // Utiliser la langue du navigateur si elle est supportée, sinon français par défaut
      const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'fr';
      setLanguage(detectedLang as any);
    };

    detectLanguage();
  }, [setLanguage]);
};
