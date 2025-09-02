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
    const timer = setTimeout(() => {
      try {
        // Vérifier que l'élément existe et a une largeur
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          const adElements = document.querySelectorAll('.adsbygoogle');
          adElements.forEach(element => {
            const width = element.getBoundingClientRect().width;
            if (width > 0 && !element.getAttribute('data-adsbygoogle-status')) {
              window.adsbygoogle.push({});
            }
          });
        }
      } catch (error) {
        console.warn('AdSense initialization error:', error);
      }
    }, 100); // Petit délai pour s'assurer que l'élément est rendu

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`adsense-container w-full ${className}`} 
      style={{ minWidth: '320px', ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          width: '100%',
          minHeight: '250px',
          ...style 
        }}
        data-ad-client="ca-pub-8390804678758044"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;