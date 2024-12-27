export type Language = 'en' | 'fr' | 'ar' | 'hi';

export interface CategoryTranslations {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface LocaleUnits {
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
  bmiHistory: string;
  categories: CategoryTranslations;
  healthAdvice: string;
  activityTracking: string;
  nutrition: string;
  mentalWellness: string;
  bmiPredictions: string;
  personalizedAdvice: string;
  updateProfile: string;
  units: LocaleUnits;
}