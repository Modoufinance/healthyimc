import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, Info, Shield, History, Bookmark, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/calculator", label: t.title, icon: <Calculator className="w-4 h-4" /> },
    { to: "/chat-history", label: "Historique", icon: <History className="w-4 h-4" /> },
    { to: "/saved-chats", label: "Sauvegardés", icon: <Bookmark className="w-4 h-4" /> },
    { to: "/help", label: "Aide", icon: <HelpCircle className="w-4 h-4" /> },
    { to: "/about", label: "À propos", icon: <Info className="w-4 h-4" /> },
    { to: "/privacy", label: "Confidentialité", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:h-16">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Shield className="h-6 w-6" />
              Health Tracker
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>
          <div className="flex flex-row justify-center sm:justify-end pb-2 sm:pb-0 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium transition-colors",
                  "hover:text-primary hover:bg-gray-50",
                  location.pathname === link.to
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500"
                )}
              >
                {link.icon}
                <span className="ml-2 hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;