export type Language = 'en' | 'fr' | 'ar' | 'hi';

export interface Categories {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface UnitTranslations {
  weight: {
    unit: 'kg' | 'lb';
    factor: number;
  };
  height: {
    unit: 'cm' | 'in';
    factor: number;
  };
}

export interface Labels {
  age: string;
  weight: string;
  height: string;
  activity: string;
  goals: string;
}

export interface Placeholders {
  age: string;
  weight: string;
  height: string;
  goals: string;
}

export interface Activities {
  low: string;
  moderate: string;
  high: string;
}

export interface Buttons {
  calculate: string;
  analyze: string;
}

export interface Advice {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface TranslationType {
  title: string;
  subtitle: string;
  bmiHistory: string;
  bmiPredictions: string;  // Added this line
  categories: Categories;
  units: UnitTranslations;
  labels: Labels;
  placeholders: Placeholders;
  activities: Activities;
  buttons: Buttons;
  advice: Advice;
}
