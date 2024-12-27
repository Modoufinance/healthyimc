import { BMIData } from "@/components/BMICalculator";

interface UserData {
  age?: number;
  gender?: string;
  weight: number;
  height: number;
  activityLevel?: string;
  medicalHistory?: string[];
}

interface BMIPrediction {
  predictedBMI: number;
  timeframe: string;
  confidence: number;
}

export const getPersonalizedAdvice = (bmiData: BMIData, userData: UserData): string => {
  const { bmi } = bmiData;
  const { age, gender, activityLevel } = userData;

  let advice = bmiData.advice;

  if (age && gender && activityLevel) {
    if (age > 65) {
      advice += " Pour les personnes de plus de 65 ans, il est recommandé de maintenir un IMC légèrement plus élevé.";
    }
    
    if (activityLevel === "sedentary") {
      advice += " Commencez par une activité physique légère comme la marche quotidienne.";
    } else if (activityLevel === "active") {
      advice += " Continuez votre routine d'exercice régulière tout en surveillant votre alimentation.";
    }
  }

  return advice;
};

export const predictBMITrend = (
  currentBMI: number,
  targetBMI: number,
  timeframeWeeks: number
): BMIPrediction[] => {
  const predictions: BMIPrediction[] = [];
  const weeklyChange = (targetBMI - currentBMI) / timeframeWeeks;
  
  for (let week = 1; week <= timeframeWeeks; week++) {
    predictions.push({
      predictedBMI: Number((currentBMI + weeklyChange * week).toFixed(2)),
      timeframe: `Semaine ${week}`,
      confidence: Math.max(0.95 - week * 0.05, 0.6) // La confiance diminue avec le temps
    });
  }

  return predictions;
};