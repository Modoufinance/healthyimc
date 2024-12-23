import { BMIData } from "./BMICalculator";

interface BMIResultProps {
  bmiData: BMIData;
}

const BMIResult = ({ bmiData }: BMIResultProps) => {
  return (
    <div className="space-y-2 text-center">
      <div className="text-3xl font-bold text-primary">{bmiData.bmi}</div>
      <div className="font-medium">{bmiData.category}</div>
      <p className="text-sm text-muted-foreground">{bmiData.advice}</p>
    </div>
  );
};

export default BMIResult;