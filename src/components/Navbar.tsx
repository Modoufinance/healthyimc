
import { Link, useLocation } from "react-router-dom";
import { Home, Scale, Bot, Heart, Dumbbell, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const mainItems = [
    { to: "/", icon: Home },
    { to: "/calculateur-imc", icon: Scale },
    { to: "/assistant-sante-ia", icon: Bot },
    { to: "/programme-fitness-ia", icon: Dumbbell },
    { to: "/bien-etre", icon: Heart },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <div className="flex gap-6">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                    "hover:scale-110 hover:shadow-lg",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-110" 
                      : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
