
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import WellnessCompanion from '@/pages/WellnessCompanion';
import AIHealthAssistant from '@/pages/AIHealthAssistant';
import AIFitnessProgram from '@/pages/AIFitnessProgram';
import AIBlog from '@/pages/AIBlog';
import Home from '@/pages/Home';
import SymptomAnalyzer from '@/pages/SymptomAnalyzer';
import CalculatriceIMC from '@/pages/CalculatriceIMC';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fr" element={<Index />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/confidentialite" element={<Privacy />} />
      <Route path="/bien-etre" element={<WellnessCompanion />} />
      <Route path="/assistant-sante-ia" element={<AIHealthAssistant />} />
      <Route path="/analyseur-symptomes" element={<SymptomAnalyzer />} />
      <Route path="/programme-fitness-ia" element={<AIFitnessProgram />} />
      <Route path="/blog-ia" element={<AIBlog />} />
      <Route path="/calculatrice-imc" element={<CalculatriceIMC />} />
    </Routes>
  );
};

export default AppRoutes;
