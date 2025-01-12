import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/7f5c4590-2ec0-484b-a72c-432c59a614bd.png"
                alt="HealthyIMC Logo"
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">HealthyIMC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              {t.nav?.home}
            </Link>
            <Link to="/calculator" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              {t.nav?.calculator}
            </Link>
            <Link to="/wellness" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Wellness AI
            </Link>
            <Link to="/ai-health" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Assistant IA
            </Link>
            <Link to="/ai-blog" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Blog IA
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              {t.nav?.blog}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              {t.nav?.about}
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav?.home}
            </Link>
            <Link
              to="/calculator"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav?.calculator}
            </Link>
            <Link
              to="/wellness"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Wellness AI
            </Link>
            <Link
              to="/ai-health"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Assistant IA
            </Link>
            <Link
              to="/ai-blog"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog IA
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav?.blog}
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav?.about}
            </Link>
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;