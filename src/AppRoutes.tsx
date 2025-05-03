
import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import WellnessCompanion from "@/pages/WellnessCompanion";
import AIBlog from "@/pages/AIBlog";
import AIFitnessProgram from "@/pages/AIFitnessProgram";
import AIHealthAssistant from "@/pages/AIHealthAssistant";
import SymptomAnalyzer from "@/pages/SymptomAnalyzer";
import IMCCalculator from "@/pages/IMCCalculator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/wellness" element={<WellnessCompanion />} />
      <Route path="/ai-blog" element={<AIBlog />} />
      <Route path="/ai-fitness" element={<AIFitnessProgram />} />
      <Route path="/ai-health" element={<AIHealthAssistant />} />
      <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
      <Route path="/imc-calculator" element={<IMCCalculator />} />
    </Routes>
  );
};

export default AppRoutes;
