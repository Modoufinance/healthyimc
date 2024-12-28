export type Language = "en" | "fr" | "ar" | "hi";

export interface CategoryTranslations {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface UnitTranslations {
  weight: {
    unit: string;
    factor: number;
  };
  height: {
    unit: string;
    factor: number;
  };
}

export interface TranslationType {
  title: string;
  subtitle: string;
  mainMenu: string;
  aiAssistant: string;
  healthTips: string;
  bmiHistory: string;
  categories: CategoryTranslations;
  healthAdvice: string;
  weightLabel: string;
  heightLabel: string;
  calculateButton: string;
  invalidInputs: string;
  yourBmiIs: string;
  category: string;
  advice: string;
  units: UnitTranslations;
  bmiPredictions: string;
}