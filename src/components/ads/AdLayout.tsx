import { ReactNode } from 'react';
import AdSidebar from './AdSidebar';

interface AdLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebarAdSlot?: string;
}

const AdLayout = ({ children, showSidebar = true, sidebarAdSlot = "1111222233" }: AdLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      {/* Contenu principal */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
      
      {/* Sidebar avec publicités */}
      {showSidebar && (
        <div className="hidden lg:block w-64 flex-shrink-0">
          <AdSidebar adSlot={sidebarAdSlot} />
        </div>
      )}
    </div>
  );
};

export default AdLayout;