import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useLocaleDetection = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      const supportedLangs = ['en', 'fr', 'ar', 'hi'];
      const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
      setLanguage(detectedLang as 'en' | 'fr' | 'ar' | 'hi');
    };

    detectLanguage();
  }, [setLanguage]);
};