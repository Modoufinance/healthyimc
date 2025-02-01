import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BMICalculator from "./components/BMICalculator";
import AIHealthAssistant from "./pages/AIHealthAssistant";
import WellnessCompanion from "./pages/WellnessCompanion";
import AIBlog from "./pages/AIBlog";
import NotFound from "./components/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

const AppContent = () => {
  useLocaleDetection();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<BMICalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/ai-health" element={<AIHealthAssistant />} />
          <Route path="/wellness" element={<WellnessCompanion />} />
          <Route path="/ai-blog" element={<AIBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
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