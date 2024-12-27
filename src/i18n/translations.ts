import { Language } from "./types";

export type TranslationType = {
  [key: string]: string;
};

export const translations: Record<Language, TranslationType> = {
  en: {
    bmiHistory: "BMI History",
    categories: {
      underweight: "Underweight",
      normal: "Normal weight",
      overweight: "Overweight",
      obese: "Obese",
    },
    healthAdvice: "Health Advice",
    activityTracking: "Activity Tracking",
    nutrition: "Nutrition",
    mentalWellness: "Mental Wellness",
    bmiPredictions: "BMI Predictions",
    personalizedAdvice: "Personalized Advice",
    updateProfile: "Update Profile",
  },
  fr: {
    bmiHistory: "Historique IMC",
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Poids normal",
      overweight: "Surpoids",
      obese: "Obésité",
    },
    healthAdvice: "Conseils de santé",
    activityTracking: "Suivi d'activité",
    nutrition: "Nutrition",
    mentalWellness: "Bien-être mental",
    bmiPredictions: "Prédictions IMC",
    personalizedAdvice: "Conseils Personnalisés",
    updateProfile: "Mettre à jour le profil",
  },
};
