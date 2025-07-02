import { useEffect } from 'react';

interface AdSidebarProps {
  adSlot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSidebar = ({ adSlot, className = "" }: AdSidebarProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Erreur AdSense:', err);
    }
  }, []);

  return (
    <div className={`ad-sidebar-container ${className}`}>
      <div className="sticky top-4">
        <p className="text-xs text-gray-500 mb-2 text-center">Publicité</p>
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '160px',
            height: '600px'
          }}
          data-ad-client="ca-pub-8390804678758044"
          data-ad-slot={adSlot}
          data-ad-format="vertical"
        />
      </div>
    </div>
  );
};

export default AdSidebar;