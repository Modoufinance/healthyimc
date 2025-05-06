
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/types';
import { useLocation } from 'react-router-dom';

export const useLocaleDetection = () => {
  const { setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const detectLanguage = () => {
      // 1. Vérifier si l'URL actuelle contient un code de langue
      const pathSegments = location.pathname.split('/');
      const potentialLangCode = pathSegments[1];
      const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
      
      if (potentialLangCode && supportedLangs.includes(potentialLangCode as Language)) {
        setLanguage(potentialLangCode as Language);
        localStorage.setItem('preferredLanguage', potentialLangCode);
        return;
      }
      
      // 2. Vérifier si une langue est déjà stockée dans le localStorage
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && supportedLangs.includes(savedLanguage as Language)) {
        setLanguage(savedLanguage as Language);
        return;
      }
      
      // 3. Vérifier si un paramètre de langue existe dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      
      if (langParam && supportedLangs.includes(langParam as Language)) {
        setLanguage(langParam as Language);
        localStorage.setItem('preferredLanguage', langParam);
        return;
      }

      // 4. Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      
      // 5. Utiliser la langue du navigateur si elle est supportée, sinon français par défaut
      const detectedLang = supportedLangs.includes(browserLang as Language) ? browserLang : 'fr';
      setLanguage(detectedLang as Language);
      localStorage.setItem('preferredLanguage', detectedLang);
    };

    detectLanguage();
  }, [setLanguage, location.pathname]);
};
