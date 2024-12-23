import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/calculator", label: "BMI Calculator", icon: <Calculator className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-primary font-bold text-xl">
              Health Tracker
            </Link>
          </div>
          <div className="flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "inline-flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  "hover:text-primary hover:bg-gray-50",
                  location.pathname === link.to
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500"
                )}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;