import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Track Your Health Journey
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Calculate your BMI, track your progress, and get personalized health insights to help you achieve your wellness goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/calculator">
              Calculate BMI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;