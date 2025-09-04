
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import AppRoutes from "./AppRoutes";
import EnhancedNavigation from "./components/enhanced-navigation";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <CartProvider>
          <Toaster />
          <Sonner />
          <EnhancedNavigation />
          <main className="flex-1">
            <AppRoutes />
          </main>
        </CartProvider>
      </div>
            </TooltipProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
