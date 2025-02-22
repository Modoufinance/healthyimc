
import { Routes, Route } from "react-router-dom";
import { useLocaleDetection } from "./hooks/useLocaleDetection";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BMICalculator from "./components/BMICalculator";
import AIHealthAssistant from "./pages/AIHealthAssistant";
import WellnessCompanion from "./pages/WellnessCompanion";
import AIBlog from "./pages/AIBlog";

const AppRoutes = () => {
  useLocaleDetection();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<BMICalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/ai-health" element={<AIHealthAssistant />} />
          <Route path="/wellness" element={<WellnessCompanion />} />
          <Route path="/ai-blog" element={<AIBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
