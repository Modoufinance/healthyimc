
import { Link, useLocation } from "react-router-dom";
import { Home, Scale, Bot, Info, Shield, Heart, Dumbbell, Activity, Percent, Flame, Baby, Hospital, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationHeader = () => {
  const location = useLocation();

  const navigationItems = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/calculateur-imc", icon: Scale, label: "IMC" },
    { to: "/calculateur-imc-enfants", icon: Baby, label: "IMC Enfants" },
    { to: "/calculateur-graisse-corporelle", icon: Percent, label: "Graisse" },
    { to: "/calculateur-calories", icon: Flame, label: "Calories" },
    { to: "/analyseur-symptomes", icon: Hospital, label: "Symptômes" },
    { to: "/assistant-sante-ia", icon: Bot, label: "Assistant IA" },
    { to: "/programme-fitness-ia", icon: Dumbbell, label: "Fitness IA" },
    { to: "/bien-etre", icon: Heart, label: "Bien-être" },
    { to: "/blog", icon: BookOpen, label: "Blog" },
    { to: "/a-propos", icon: Info, label: "À propos" },
    { to: "/confidentialite", icon: Shield, label: "Confidentialité" },
  ];

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <nav className="container mx-auto px-4">
        <div className="flex justify-center md:justify-start items-center py-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 md:gap-2 min-w-max">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 min-w-[60px] md:min-w-[70px] rounded-xl transition-all duration-300",
                    "hover:bg-blue-50 hover:scale-105",
                    isActive 
                      ? "bg-blue-100 text-blue-600 shadow-lg" 
                      : "text-gray-600 hover:text-blue-600"
                  )}
                  title={item.label}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-blue-500 text-white shadow-lg scale-110" 
                      : "bg-gray-100 group-hover:bg-blue-100"
                  )}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <span className="text-xs mt-1 font-medium hidden md:block truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationHeader;
