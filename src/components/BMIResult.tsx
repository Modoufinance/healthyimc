
import { BMIData } from "./BMICalculator";
import { Badge } from "@/components/ui/badge";

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
      <div 
        className="relative inline-flex justify-center items-center animate-fade-in"
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
            className="progress-ring-animate"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold text-white">{bmiData.bmi}</div>
        </div>
      </div>
      
      <Badge variant={getBadgeVariant()} className="text-sm font-medium px-3 py-1">
        {bmiData.category}
      </Badge>
      
      <p 
        className="text-sm text-white mt-2 animate-slide-up"
      >
        {bmiData.advice}
      </p>
    </div>
  );
};

export default BMIResult;
