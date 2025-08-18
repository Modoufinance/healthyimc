
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

export interface BMICalculatorTranslations {
  title: string;
  subtitle: string;
  voiceSearchPlaceholder: string;
  exportPDF: string;
  sendEmail: string;
  saveResult: string;
  calculationSuccess: string;
  calculationDescription: string;
  profileUpdated: string;
  profileDescription: string;
  exportSuccess: string;
  exportDescription: string;
  emailPrepared: string;
  emailDescription: string;
  resultSaved: string;
  saveDescription: string;
  history: string;
  searchPerformed: string;
  searchDescription: string;
  error: string;
  invalidValues: string;
}

export interface EnhancedFAQTranslations {
  title: string;
  searchPlaceholder: string;
  noResults: string;
  noResultsDescription: string;
  resultsFound: string;
  resultsFoundDescription: string;
  tryOtherTerms: string;
}

export interface BMIFormTranslations {
  error: string;
  invalidValues: string;
}

export interface BMIEducationTranslations {
  title: string;
  subtitle: string;
  calculateMyBMI: string;
  whatIsIMC: string;
  definition: string;
  calculationFormula: string;
  omsClassification: string;
  underweight: string;
  normalWeight: string;
  overweight: string;
  obesity: string;
  imcUtility: string;
  imcLimitations: string;
  complementaryIndicators: string;
  waistCircumference: string;
  waistHipRatio: string;
  bodyComposition: string;
  recommendations: string;
  correctInterpretation: string;
  recommendedActions: string;
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
  bmiCalculator: BMICalculatorTranslations;
  enhancedFAQ: EnhancedFAQTranslations;
  bmiForm: BMIFormTranslations;
  bmiEducation: BMIEducationTranslations;
}
