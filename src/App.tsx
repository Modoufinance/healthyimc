
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppRoutes from "./AppRoutes";
import StickyHeader from "./components/StickyHeader";
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <StickyHeader />
              <Toaster />
              <Sonner />
              <AppRoutes />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
