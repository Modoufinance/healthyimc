import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import BMICalculator from "./components/BMICalculator";
import AIHealthAssistant from "./pages/AIHealthAssistant";

const queryClient = new QueryClient();

const AppContent = () => {
  useLocaleDetection();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<BMICalculator />} />
          <Route path="/ai-health" element={<AIHealthAssistant />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;