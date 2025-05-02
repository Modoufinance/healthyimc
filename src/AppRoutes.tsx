
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import BMICalculator from "./components/BMICalculator";
import AIHealthAssistant from "./pages/AIHealthAssistant";
import WellnessCompanion from "./pages/WellnessCompanion";
import AIBlog from "./pages/AIBlog";
import BodyFatCalculator from "./components/BodyFatCalculator";
import CalorieCalculator from "./components/CalorieCalculator";
import ChildrenBMICalculator from "./components/ChildrenBMICalculator";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import AIFitnessProgram from "./pages/AIFitnessProgram";

const AppRoutes = () => {
  useLocaleDetection();

  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/calculateur-imc" element={<BMICalculator />} />
          <Route path="/calculateur-imc-enfants" element={<ChildrenBMICalculator />} />
          <Route path="/calculateur-graisse-corporelle" element={<BodyFatCalculator />} />
          <Route path="/calculateur-calories" element={<CalorieCalculator />} />
          <Route path="/analyseur-symptomes" element={<SymptomAnalyzer />} />
          <Route path="/assistant-sante-ia" element={<AIHealthAssistant />} />
          <Route path="/bien-etre" element={<WellnessCompanion />} />
          <Route path="/blog-ia" element={<AIBlog />} />
          <Route path="/programme-fitness-ia" element={<AIFitnessProgram />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
