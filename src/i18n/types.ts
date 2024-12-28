export type Language = 'en' | 'fr';

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

export interface TranslationType {
  title: string;
  subtitle: string;
  bmiHistory: string;
  categories: Categories;
  units: UnitTranslations;
  bmiPredictions: string;
  personalizedAdvice: string;
  updateProfile: string;
}