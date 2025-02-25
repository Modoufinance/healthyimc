import { Link, useLocation } from "react-router-dom";
import { Home, Scale, Bot, Info, Shield, Heart, BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import PWAInstallButton from "./PWAInstallButton";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: "Accueil", icon: <Home className="w-4 h-4" /> },
    { to: "/calculateur-imc", label: "Calculatrice IMC", icon: <Scale className="w-4 h-4" /> },
    { to: "/blog-sante", label: "Blog Santé", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/assistant-sante-ia", label: "Assistant Santé", icon: <Bot className="w-4 h-4" /> },
    { to: "/bien-etre", label: "Bien-être", icon: <Heart className="w-4 h-4" /> },
    { to: "/blog-ia", label: "Blog IA", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/a-propos", label: "À propos", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:h-16">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">Healthy</span>
              <span className="text-2xl font-bold text-gray-700">IMC</span>
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
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-gray-100",
                  location.pathname === link.to
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  <span className="hidden sm:inline">{link.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
