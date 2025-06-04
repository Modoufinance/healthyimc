
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
  );
};

export const LoadingCard = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse", className)}>
    <div className="bg-gray-200 rounded-lg h-32 w-full mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
    </div>
  </div>
);

export const LoadingButton = ({ children, isLoading, ...props }: any) => (
  <button disabled={isLoading} {...props}>
    {isLoading ? <LoadingSpinner size="sm" /> : children}
  </button>
);
