import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = ""
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // Vérifier si AdSense est disponible avant de l'initialiser
      if (typeof window !== 'undefined' && 
          window.adsbygoogle && 
          Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      // Erreur silencieuse pour éviter les logs d'erreur inutiles
      if (process.env.NODE_ENV === 'development') {
        console.debug('AdSense non disponible en développement:', error?.message || 'Erreur inconnue');
      }
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-8390804678758044"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;