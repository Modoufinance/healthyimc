import { Link, useLocation } from "react-router-dom";
import { Home, Scale, Bot, Info, Shield, Heart, BookOpen, Star, Activity, ChevronDown, ChevronUp, Percent, Flame, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import PWAInstallButton from "./PWAInstallButton";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isHealthDropdownOpen, setIsHealthDropdownOpen] = useState(false);

  // Items that will display directly in the navigation
  const mainLinks = [
    { to: "/accueil", label: "Accueil", icon: <Home className="w-4 h-4" /> },
  ];
  
  // Additional main links (to be displayed after calculators)
  const additionalMainLinks = [
    { to: "/bien-etre", label: "Bien-être", icon: <Heart className="w-4 h-4" /> },
    { to: "/blog-ia", label: "Blog IA", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/a-propos", label: "À propos", icon: <Info className="w-4 h-4" /> },
  ];

  // Items that will be in the "Santé" dropdown
  const healthLinks = [
    { to: "/fitness-tracker", label: "Suivi Fitness", icon: <Activity className="w-4 h-4" /> },
    { to: "/blog-sante", label: "Blog Santé", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/assistant-sante-ia", label: "Assistant Santé", icon: <Bot className="w-4 h-4" /> },
  ];

  // Calculators dropdown items
  const calculatorLinks = [
    { to: "/calculateur-imc", label: "Calculatrice d'IMC", icon: <Scale className="w-4 h-4" /> },
    { to: "/calculateur-imc-enfants", label: "Calculatrice d'IMC Enfants", icon: <Baby className="w-4 h-4" /> },
    { to: "/calculateur-graisse-corporelle", label: "Calculatrice de Graisse Corporelle", icon: <Percent className="w-4 h-4" /> },
    { to: "/calculateur-calories", label: "Calculatrice de Calories", icon: <Flame className="w-4 h-4" /> },
  ];

  const isHealthActive = healthLinks.some(link => location.pathname === link.to);
  const isCalculatorActive = calculatorLinks.some(link => location.pathname === link.to);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:h-16">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            <Link to="/" className="flex items-center gap-1">
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-1.5 rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start ml-1">
                <span className="text-lg font-bold text-blue-600 leading-none">Healthy</span>
                <span className="text-lg font-bold text-gray-700 leading-none">IMC</span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <PWAInstallButton />
              <LanguageSelector />
            </div>
          </div>
          <div className="flex flex-row justify-center sm:justify-end pb-2 sm:pb-0 overflow-x-auto">
            {mainLinks.map((link) => (
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
            
            {/* Calculateurs dropdown - Now appears right after Accueil */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "px-3 py-2 h-auto text-sm font-medium rounded-md transition-colors",
                    "hover:bg-gray-100",
                    isCalculatorActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    <span className="hidden sm:inline">Calculatrices</span>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {calculatorLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        "flex items-center gap-2 w-full",
                        location.pathname === link.to
                          ? "text-blue-600"
                          : "text-gray-600"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Display additional main links after calculators */}
            {additionalMainLinks.map((link) => (
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
            
            {/* Santé dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "px-3 py-2 h-auto text-sm font-medium rounded-md transition-colors",
                    "hover:bg-gray-100",
                    isHealthActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span className="hidden sm:inline">Santé</span>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {healthLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        "flex items-center gap-2 w-full",
                        location.pathname === link.to
                          ? "text-blue-600"
                          : "text-gray-600"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
