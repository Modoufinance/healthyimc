import { Link, useLocation } from "react-router-dom";
import { Home, Scale, Bot, Info, Shield, Heart, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import PWAInstallButton from "./PWAInstallButton";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: "Accueil", icon: <Home className="w-4 h-4" /> },
    { to: "/calculator", label: "Calculatrice IMC", icon: <Scale className="w-4 h-4" /> },
    { to: "/blog", label: "Blog Santé", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/ai-health", label: "Assistant Santé", icon: <Bot className="w-4 h-4" /> },
    { to: "/wellness", label: "Bien-être", icon: <Heart className="w-4 h-4" /> },
    { to: "/about", label: "À propos", icon: <Info className="w-4 h-4" /> },
    { to: "/privacy", label: "Confidentialité", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-modern sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:h-16">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            <Link to="/" className="flex items-center gap-2 animate-slide-in">
              <img 
                src="/lovable-uploads/fa3d23e1-be06-4b8f-812a-691e5c14a6ee.png" 
                alt="HealthyIMC Logo" 
                className="h-12 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-2">
              <PWAInstallButton />
              <LanguageSelector />
            </div>
          </div>
          <div className="flex flex-row justify-center sm:justify-end pb-2 sm:pb-0 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "nav-link inline-flex items-center gap-2 whitespace-nowrap",
                  location.pathname === link.to && "active"
                )}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;