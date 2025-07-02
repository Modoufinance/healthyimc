import { useEffect } from 'react';

interface AdRectangleProps {
  adSlot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdRectangle = ({ adSlot, className = "" }: AdRectangleProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Erreur AdSense:', err);
    }
  }, []);

  return (
    <div className={`ad-rectangle-container my-6 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'inline-block',
          width: '300px',
          height: '250px'
        }}
        data-ad-client="ca-pub-8390804678758044"
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default AdRectangle;