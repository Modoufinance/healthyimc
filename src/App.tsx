import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BMICalculator from './components/BMICalculator';
import About from './pages/About';
import BMIGuide from './pages/BMIGuide';
import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<BMICalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<BMIGuide />} />
      </Routes>
    </div>
  );
};

export default App;
