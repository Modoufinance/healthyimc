import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageSelector from "./LanguageSelector";
import PWAInstallPrompt from "./PWAInstallPrompt";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Shield className="h-6 w-6" />
              HealthyIMC
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <PWAInstallPrompt />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="sm:hidden">
                  <Button variant="ghost" size="icon">
                    {isOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-4">
                    <Link
                      to="/calculator"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Calculateur
                    </Link>
                    <Link
                      to="/ai-health"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Assistant IA
                    </Link>
                    <Link
                      to="/wellness"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Bien-être
                    </Link>
                    <Link
                      to="/about"
                      className="text-lg font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      À propos
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/calculator"
              className="text-sm font-medium hover:text-primary"
            >
              Calculateur
            </Link>
            <Link
              to="/ai-health"
              className="text-sm font-medium hover:text-primary"
            >
              Assistant IA
            </Link>
            <Link
              to="/wellness"
              className="text-sm font-medium hover:text-primary"
            >
              Bien-être
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              À propos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;