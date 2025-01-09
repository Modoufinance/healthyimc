import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useLocaleDetection = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      // Priorise le français, sinon utilise la langue du navigateur si supportée
      if (browserLang === 'fr') {
        setLanguage('fr');
      } else {
        const supportedLangs = ['en', 'fr', 'ar', 'hi'];
        const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'fr';
        setLanguage(detectedLang as 'en' | 'fr' | 'ar' | 'hi');
      }
    };

    detectLanguage();
  }, [setLanguage]);
};