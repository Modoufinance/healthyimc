import { Language, TranslationType } from './types';

export type { Language, TranslationType };

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
  ar: {
    bmiHistory: "سجل مؤشر كتلة الجسم",
    categories: {
      underweight: "نقص الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة الوزن",
      obese: "السمنة",
    },
    healthAdvice: "نصائح صحية",
    activityTracking: "تتبع النشاط",
    nutrition: "التغذية",
    mentalWellness: "الصحة النفسية",
    bmiPredictions: "توقعات مؤشر كتلة الجسم",
    personalizedAdvice: "نصائح شخصية",
    updateProfile: "تحديث الملف الشخصي",
  },
  hi: {
    bmiHistory: "बीएमआई इतिहास",
    categories: {
      underweight: "कम वजन",
      normal: "सामान्य वजन",
      overweight: "अधिक वजन",
      obese: "मोटापा",
    },
    healthAdvice: "स्वास्थ्य सलाह",
    activityTracking: "गतिविधि ट्रैकिंग",
    nutrition: "पोषण",
    mentalWellness: "मानसिक स्वास्थ्य",
    bmiPredictions: "बीएमआई भविष्यवाणी",
    personalizedAdvice: "व्यक्तिगत सलाह",
    updateProfile: "प्रोफ़ाइल अपडेट करें",
  },
};