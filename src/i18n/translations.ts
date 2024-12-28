import { TranslationType } from "./types";

export const translations: Record<string, TranslationType> = {
  fr: {
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    bmiHistory: "Historique IMC",
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Poids normal",
      overweight: "Surpoids",
      obese: "Obésité"
    },
    units: {
      weight: {
        unit: "kg",
        factor: 1
      },
      height: {
        unit: "cm",
        factor: 1
      }
    },
    bmiPredictions: "Prédictions IMC",
    personalizedAdvice: "Conseils personnalisés",
    updateProfile: "Mettre à jour le profil"
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    bmiHistory: "BMI History",
    categories: {
      underweight: "Underweight",
      normal: "Normal weight",
      overweight: "Overweight",
      obese: "Obese"
    },
    units: {
      weight: {
        unit: "lb",
        factor: 2.20462
      },
      height: {
        unit: "in",
        factor: 0.393701
      }
    },
    bmiPredictions: "BMI Predictions",
    personalizedAdvice: "Personalized Advice",
    updateProfile: "Update Profile"
  }
};