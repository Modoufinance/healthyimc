
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/types';

export const useLocaleDetection = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const detectLanguage = () => {
      // 1. Vérifier si une langue est déjà stockée dans le localStorage
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage) {
        setLanguage(savedLanguage as Language);
        return;
      }
      
      // 2. Vérifier si un paramètre de langue existe dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
      
      if (langParam && supportedLangs.includes(langParam as Language)) {
        setLanguage(langParam as Language);
        localStorage.setItem('preferredLanguage', langParam);
        return;
      }

      // 3. Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      
      // 4. Utiliser la langue du navigateur si elle est supportée, sinon français par défaut
      const detectedLang = supportedLangs.includes(browserLang as Language) ? browserLang : 'fr';
      setLanguage(detectedLang as Language);
      localStorage.setItem('preferredLanguage', detectedLang);
    };

    detectLanguage();

    // Ajouter un écouteur d'événement pour les changements d'URL
    const handleRouteChange = () => {
      const pathSegments = window.location.pathname.split('/');
      const potentialLangCode = pathSegments[1];
      const supportedLangs: Language[] = ['fr', 'en', 'zh', 'es', 'ar', 'hi', 'pt', 'bn', 'ru', 'ja'];
      
      if (potentialLangCode && supportedLangs.includes(potentialLangCode as Language)) {
        setLanguage(potentialLangCode as Language);
        localStorage.setItem('preferredLanguage', potentialLangCode);
      }
    };

    // Exécuter au chargement initial pour vérifier la langue dans l'URL
    handleRouteChange();

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [setLanguage]);
};
