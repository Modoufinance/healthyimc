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
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "احسب مؤشر كتلة جسمك",
    bmiHistory: "سجل مؤشر كتلة الجسم",
    categories: {
      underweight: "نقص الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة الوزن",
      obese: "السمنة"
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
    bmiPredictions: "توقعات مؤشر كتلة الجسم",
    personalizedAdvice: "نصائح شخصية",
    updateProfile: "تحديث الملف الشخصي"
  },
  hi: {
    title: "बीएमआई कैलकुलेटर",
    subtitle: "अपना बॉडी मास इंडेक्स की गणना करें",
    bmiHistory: "बीएमआई इतिहास",
    categories: {
      underweight: "कम वजन",
      normal: "सामान्य वजन",
      overweight: "अधिक वजन",
      obese: "मोटापा"
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
    bmiPredictions: "बीएमआई पूर्वानुमान",
    personalizedAdvice: "व्यक्तिगत सलाह",
    updateProfile: "प्रोफ़ाइल अपडेट करें"
  }
};