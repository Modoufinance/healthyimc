export type Language = 'fr' | 'en' | 'zh' | 'es' | 'ar' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja';

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
  language: string; // Ajout du nom de la langue dans la langue native
}
