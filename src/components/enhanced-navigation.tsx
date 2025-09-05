
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Home, Scale, Bot, Info, Shield, Heart, Dumbbell, 
  BookOpen, Activity, ChevronDown, Menu, X, Percent, 
  Flame, Baby, Hospital, ShoppingBag, Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import PWAInstallButton from "./PWAInstallButton";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EnhancedNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { to: "/accueil", label: t.navigation.home, icon: <Home className="w-4 h-4" /> },
  ];
  
  const additionalMainLinks = [
    { to: "/boutique", label: "Boutique", icon: <ShoppingBag className="w-4 h-4" /> },
    { to: "/mes-achats", label: "Mes achats", icon: <Download className="w-4 h-4" /> },
    { to: "/bien-etre", label: t.navigation.wellness, icon: <Heart className="w-4 h-4" /> },
    { to: "/programme-fitness-ia", label: t.navigation.fitnessCoach, icon: <Dumbbell className="w-4 h-4" /> },
    { to: "/blog", label: t.navigation.blog, icon: <BookOpen className="w-4 h-4" /> },
    { to: "/a-propos", label: t.navigation.about, icon: <Info className="w-4 h-4" /> },
  ];

  const healthLinks = [
    { to: "/assistant-sante-ia", label: t.navigation.healthAssistant, icon: <Bot className="w-4 h-4" /> },
    { to: "/confidentialite", label: t.navigation.privacy, icon: <Shield className="w-4 h-4" /> },
  ];

  const calculatorLinks = [
    { to: "/calculateur-imc", label: t.navigation.bmiCalculator, icon: <Scale className="w-4 h-4" /> },
    { to: "/calculateur-imc-enfants", label: t.navigation.childrenBMI, icon: <Baby className="w-4 h-4" /> },
    { to: "/calculateur-graisse-corporelle", label: t.navigation.bodyFat, icon: <Percent className="w-4 h-4" /> },
    { to: "/calculateur-calories", label: t.navigation.calories, icon: <Flame className="w-4 h-4" /> },
    { to: "/analyseur-symptomes", label: t.navigation.symptomAnalyzer, icon: <Hospital className="w-4 h-4" /> },
  ];

  const isHealthActive = healthLinks.some(link => location.pathname === link.to);
  const isCalculatorActive = calculatorLinks.some(link => location.pathname === link.to);

  return (
    <nav className={cn(
      "bg-white shadow-md sticky top-0 z-50 transition-all duration-300",
      isScrolled && "shadow-lg bg-white/95 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-2 rounded-lg transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-blue-600 leading-none">{t.navigation.brandName.split(' ')[0]}</span>
              <span className="text-lg font-bold text-gray-700 leading-none">{t.navigation.brandName.split(' ')[1]}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  "hover:bg-gray-100 hover:scale-105",
                  location.pathname === link.to
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* Calculateurs dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "px-3 py-2 h-auto text-sm font-medium rounded-md transition-all duration-200",
                    "hover:bg-gray-100 hover:scale-105",
                    isCalculatorActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    {t.navigation.calculators}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white border shadow-lg">
                {calculatorLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        "flex items-center gap-2 w-full transition-colors hover:bg-blue-50",
                        location.pathname === link.to ? "text-blue-600" : "text-gray-600"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {additionalMainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  "hover:bg-gray-100 hover:scale-105",
                  location.pathname === link.to
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* Santé dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "px-3 py-2 h-auto text-sm font-medium rounded-md transition-all duration-200",
                    "hover:bg-gray-100 hover:scale-105",
                    isHealthActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    {t.navigation.health}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                {healthLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        "flex items-center gap-2 w-full transition-colors hover:bg-blue-50",
                        location.pathname === link.to ? "text-blue-600" : "text-gray-600"
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

          {/* Mobile menu button and utilities */}
          <div className="flex items-center gap-2">
            <PWAInstallButton />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white absolute left-0 right-0 shadow-lg animate-fade-in">
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {[...mainLinks, ...calculatorLinks, ...additionalMainLinks, ...healthLinks].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "hover:bg-gray-100",
                    location.pathname === link.to
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnhancedNavigation;
