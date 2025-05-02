
import { Card } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BMIStatisticsProps {
  bmi: number;
  userData: {
    age: number | null;
    gender: string;
    activityLevel: string;
    targetBMI?: number | null;
  };
}

const BMIStatistics = ({ bmi, userData }: BMIStatisticsProps) => {
  // Calculate percentile based on population data (mock data for visualization)
  const calculatePercentile = () => {
    // This is a simplistic calculation for illustration purposes
    // In a real app, this would use actual statistical data
    const normalRange = { min: 18.5, max: 24.9 };
    const range = normalRange.max - normalRange.min;
    
    if (bmi < normalRange.min) {
      // Below normal range
      return Math.round(Math.max(0, (bmi / normalRange.min) * 100 * 0.9));
    } else if (bmi > normalRange.max) {
      // Above normal range
      const overMax = bmi - normalRange.max;
      const percentAbove = Math.min(100, 90 + (overMax / 10) * 10);
      return Math.round(percentAbove);
    } else {
      // Within normal range
      const positionInRange = (bmi - normalRange.min) / range;
      return Math.round(50 + (positionInRange - 0.5) * 80); // Center around 50%
    }
  };

  const percentile = calculatePercentile();
  
  // Calculate health risk based on BMI
  const calculateHealthRisk = () => {
    if (bmi < 18.5) return { risk: "Faible à modéré", color: "#3B82F6" };
    if (bmi < 25) return { risk: "Faible", color: "#10B981" };
    if (bmi < 30) return { risk: "Modéré", color: "#F59E0B" };
    if (bmi < 35) return { risk: "Élevé", color: "#EF4444" };
    return { risk: "Très élevé", color: "#7F1D1D" };
  };

  const healthRisk = calculateHealthRisk();

  // Calculate metabolic rate based on age, gender and BMI (simplified formula)
  const calculateMetabolicRate = () => {
    if (!userData.age || !userData.gender) return null;
    
    const baseRate = userData.gender === "male" ? 88.362 : 447.593;
    const weightFactor = userData.gender === "male" ? 13.397 : 9.247;
    const heightFactor = userData.gender === "male" ? 4.799 : 3.098;
    const ageFactor = userData.gender === "male" ? 5.677 : 4.33;
    
    // Estimate height and weight based on BMI (very rough estimation)
    const assumedHeight = 170; // cm
    const assumedWeight = bmi * (assumedHeight/100) * (assumedHeight/100);
    
    const bmr = baseRate + (weightFactor * assumedWeight) + (heightFactor * assumedHeight) - (ageFactor * userData.age);
    
    // Adjust for activity level
    const activityMultipliers = {
      "sedentary": 1.2,
      "light": 1.375,
      "moderate": 1.55,
      "active": 1.725,
      "very-active": 1.9
    };
    
    const activityFactor = activityMultipliers[userData.activityLevel as keyof typeof activityMultipliers] || 1.2;
    
    return Math.round(bmr * activityFactor);
  };
  
  const metabolicRate = calculateMetabolicRate();
  
  // Calculate body fat percentage (estimate based on BMI, age, gender)
  const calculateBodyFatEstimate = () => {
    if (!userData.age || !userData.gender) return null;
    
    // Using the Deurenberg equation
    const ageOffset = userData.age * 0.1;
    const genderOffset = userData.gender === "female" ? 0 : 1;
    
    const bodyFat = (1.2 * bmi) + (0.23 * userData.age) - (10.8 * genderOffset) - 5.4;
    return Math.min(Math.max(bodyFat, 2), 50).toFixed(1);
  };
  
  const bodyFat = calculateBodyFatEstimate();

  return (
    <Card className="p-4 shadow-lg rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
      <h3 className="text-lg font-semibold mb-4 text-white">Statistiques détaillées</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32">
            <CircularProgressbar
              value={percentile}
              text={`${percentile}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'round',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(76, 201, 240, ${percentile/100})`,
                textColor: '#ffffff',
                trailColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
          <p className="mt-2 text-sm text-white text-center">Percentile par rapport à la population</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-white/90">Risque pour la santé</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-white">{healthRisk.risk}</span>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${percentile}%`, 
                    backgroundColor: healthRisk.color 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {metabolicRate && (
            <div>
              <h4 className="text-sm font-medium text-white/90">Métabolisme de base estimé</h4>
              <p className="text-sm text-white">{metabolicRate} calories/jour</p>
            </div>
          )}
          
          {bodyFat && (
            <div>
              <h4 className="text-sm font-medium text-white/90">Pourcentage de graisse corporelle estimé</h4>
              <p className="text-sm text-white">{bodyFat}%</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-white/20 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Conseils personnalisés</h4>
        <p className="text-xs text-white/90">
          {bmi < 18.5 && "Augmentez votre apport calorique avec des aliments nutritifs. Concentrez-vous sur les protéines de qualité et les graisses saines."}
          {bmi >= 18.5 && bmi < 25 && "Maintenez vos habitudes alimentaires équilibrées et votre niveau d'activité physique actuel."}
          {bmi >= 25 && bmi < 30 && "Réduisez modérément votre apport calorique et augmentez votre activité physique. Visez une perte de poids progressive."}
          {bmi >= 30 && "Consultez un professionnel de santé pour un programme de perte de poids personnalisé. Augmentez progressivement votre activité physique."}
        </p>
      </div>
    </Card>
  );
};

export default BMIStatistics;
