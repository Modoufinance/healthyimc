interface UserHealthData {
  age: number;
  gender?: string;
  weight: number;
  height: number;
  activityLevel?: string;
  medicalHistory?: string[];
  targetBMI?: number;
}

export const getPersonalizedAdvice = (bmiData: { bmi: number; category: string }, userData: UserHealthData): string => {
  let advice = "";

  // Base advice based on BMI category
  if (bmiData.bmi < 18.5) {
    advice = "Vous êtes en dessous du poids recommandé. ";
  } else if (bmiData.bmi >= 18.5 && bmiData.bmi < 24.9) {
    advice = "Votre poids est dans la plage normale. ";
  } else if (bmiData.bmi >= 25 && bmiData.bmi < 29.9) {
    advice = "Vous êtes légèrement au-dessus du poids recommandé. ";
  } else {
    advice = "Votre IMC indique un surpoids significatif. ";
  }

  // Personalized recommendations based on user data
  if (userData.age > 65) {
    advice += "À votre âge, il est important de maintenir un poids stable et de rester actif. ";
  }

  if (userData.activityLevel === "sedentary") {
    advice += "Essayez de commencer par 15 minutes de marche quotidienne. ";
  } else if (userData.activityLevel === "moderate") {
    advice += "Continuez vos activités actuelles et pensez à diversifier vos exercices. ";
  } else if (userData.activityLevel === "active") {
    advice += "Votre niveau d'activité est excellent, assurez-vous de bien récupérer. ";
  }

  return advice;
};

export const predictBMITrend = (currentBMI: number, targetBMI: number, weeks: number) => {
  const predictions = [];
  const weeklyChange = (targetBMI - currentBMI) / weeks;
  const maxWeeklyChange = 0.5; // Maximum healthy BMI change per week

  // Adjust prediction based on realistic weight loss/gain rates
  const adjustedWeeklyChange = Math.min(Math.abs(weeklyChange), maxWeeklyChange) * Math.sign(weeklyChange);

  for (let week = 1; week <= weeks; week++) {
    const predictedBMI = Number((currentBMI + adjustedWeeklyChange * week).toFixed(2));
    predictions.push({
      predictedBMI,
      timeframe: `Semaine ${week}`,
      confidence: Math.max(0.95 - week * 0.05, 0.6) // Confidence decreases over time
    });
  }

  return predictions;
};