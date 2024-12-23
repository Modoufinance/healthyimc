import { cn } from "@/lib/utils";

interface BMIScaleProps {
  bmi: number;
}

const BMIScale = ({ bmi }: BMIScaleProps) => {
  const getIndicatorPosition = () => {
    const position = ((bmi - 15) / (35 - 15)) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  return (
    <div className="mt-6 space-y-2">
      <div className="h-2 bg-gray-200 rounded-full relative">
        <div
          className="absolute w-3 h-3 bg-primary rounded-full -top-0.5 transition-all duration-500"
          style={{ left: `${getIndicatorPosition()}%` }}
        />
        <div className="absolute h-full w-1/4 bg-blue-300 rounded-l-full" />
        <div className="absolute h-full w-1/4 bg-green-300 left-1/4" />
        <div className="absolute h-full w-1/4 bg-yellow-300 left-2/4" />
        <div className="absolute h-full w-1/4 bg-red-300 right-0 rounded-r-full" />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
};

export default BMIScale;