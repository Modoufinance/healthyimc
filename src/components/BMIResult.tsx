
import { BMIData } from "./BMICalculator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface BMIResultProps {
  bmiData: BMIData;
}

const BMIResult = ({ bmiData }: BMIResultProps) => {
  const getBadgeVariant = () => {
    if (bmiData.bmi < 18.5) return "secondary";
    if (bmiData.bmi >= 18.5 && bmiData.bmi < 24.9) return "default";
    if (bmiData.bmi >= 25 && bmiData.bmi < 29.9) return "secondary";
    return "destructive";
  };

  const getBmiColor = () => {
    if (bmiData.bmi < 18.5) return "#93C5FD"; // blue
    if (bmiData.bmi >= 18.5 && bmiData.bmi < 24.9) return "#86EFAC"; // green
    if (bmiData.bmi >= 25 && bmiData.bmi < 29.9) return "#FCD34D"; // yellow
    return "#FCA5A5"; // red
  };

  return (
    <div className="space-y-3 text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative inline-flex justify-center items-center"
      >
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="8" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke={getBmiColor()}
            strokeWidth="8" 
            strokeDasharray={`${Math.min(bmiData.bmi * 9, 283)} 283`}
            strokeDashoffset="0" 
            strokeLinecap="round" 
            transform="rotate(-90, 50, 50)" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold text-white">{bmiData.bmi}</div>
        </div>
      </motion.div>
      
      <Badge variant={getBadgeVariant()} className="text-sm font-medium px-3 py-1">
        {bmiData.category}
      </Badge>
      
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-white mt-2"
      >
        {bmiData.advice}
      </motion.p>
    </div>
  );
};

export default BMIResult;
