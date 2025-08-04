
export type Language = 'fr' | 'en' | 'zh' | 'es' | 'ar' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja';

export interface Categories {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
}

export interface UnitTranslations {
  weight: {
    unit: string; // Changed from 'kg' | 'lb' to allow any string
    factor: number;
  };
  height: {
    unit: string; // Changed from 'cm' | 'in' to allow any string
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EducationSection {
  title: string;
  content: string;
}

export interface FAQ {
  title: string;
  items: FAQItem[];
}

export interface Education {
  title: string;
  sections: EducationSection[];
}

// Navigation et interface commune
export interface NavigationTranslations {
  home: string;
  calculators: string;
  bmiCalculator: string;
  childrenBMI: string;
  bodyFat: string;
  calories: string;
  symptomAnalyzer: string;
  wellness: string;
  fitnessCoach: string;
  blog: string;
  about: string;
  health: string;
  healthAssistant: string;
  privacy: string;
  brandName: string;
  result: string;
  calculate: string;
  quickResult: string;
  newProgram: string;
  discoverFitness: string;
}

export interface TranslationType {
  title: string;
  subtitle: string;
  bmiHistory: string;
  bmiPredictions: string;
  disclaimer: string;
  categories: Categories;
  units: UnitTranslations;
  labels: Labels;
  placeholders: Placeholders;
  activities: Activities;
  buttons: Buttons;
  advice: Advice;
  faq: FAQ;
  education: Education;
  language: string;
  navigation: NavigationTranslations;
  hero: {
    title: string;
    subtitle: string;
    ctaButton: string;
    resultTime: string;
    newFitnessProgram: string;
  };
  breadcrumbs: {
    home: string;
  };
}
