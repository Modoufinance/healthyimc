
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

  return (
    <div className="space-y-3 text-center p-4 bg-gray-50 rounded-lg">
      <div className="text-3xl font-bold text-primary">{bmiData.bmi}</div>
      <Badge variant={getBadgeVariant()} className="text-sm">
        {bmiData.category}
      </Badge>
      <p className="text-sm text-muted-foreground mt-2">{bmiData.advice}</p>
    </div>
  );
};

export default BMIResult;
