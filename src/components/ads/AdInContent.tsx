import { useEffect } from 'react';

interface AdInContentProps {
  adSlot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdInContent = ({ adSlot, className = "" }: AdInContentProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Erreur AdSense:', err);
    }
  }, []);

  return (
    <div className={`ad-in-content my-8 ${className}`}>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-xs text-gray-500 mb-3 text-center">Publicité</p>
        <div className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ 
              display: 'block',
              width: '100%',
              maxWidth: '728px',
              height: '90px'
            }}
            data-ad-client="ca-pub-8390804678758044"
            data-ad-slot={adSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};

export default AdInContent;