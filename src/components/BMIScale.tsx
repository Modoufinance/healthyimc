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
      <div className="h-3 bg-gray-100 rounded-full relative">
        <div
          className="absolute w-4 h-4 bg-primary rounded-full -top-0.5 transition-all duration-500 shadow-lg"
          style={{ left: `${getIndicatorPosition()}%` }}
        />
        <div className="absolute h-full w-1/4 bg-blue-300 rounded-l-full opacity-80" />
        <div className="absolute h-full w-1/4 bg-green-300 left-1/4 opacity-80" />
        <div className="absolute h-full w-1/4 bg-yellow-300 left-2/4 opacity-80" />
        <div className="absolute h-full w-1/4 bg-red-300 right-0 rounded-r-full opacity-80" />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Insuffisant</span>
        <span>Normal</span>
        <span>Surpoids</span>
        <span>Obésité</span>
      </div>
    </div>
  );
};

export default BMIScale;