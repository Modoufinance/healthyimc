import { Language, TranslationType } from "./types";

export const translations: Record<Language, TranslationType> = {
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    mainMenu: "Main Menu",
    aiAssistant: "AI Health Assistant",
    healthTips: "Health Tips",
    bmiHistory: "BMI History",
    categories: {
      underweight: "Underweight",
      normal: "Normal Weight",
      overweight: "Overweight",
      obese: "Obese"
    },
    healthAdvice: "Health Advice",
    weightLabel: "Weight (kg)",
    heightLabel: "Height (cm)",
    calculateButton: "Calculate BMI",
    invalidInputs: "Please enter valid values",
    yourBmiIs: "Your BMI is",
    category: "Category",
    advice: "Advice"
  },
  fr: {
    title: "Calculateur IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    mainMenu: "Menu Principal",
    aiAssistant: "Assistant IA Santé",
    healthTips: "Conseils Santé",
    bmiHistory: "Historique IMC",
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Poids normal",
      overweight: "Surpoids",
      obese: "Obésité"
    },
    healthAdvice: "Conseils de santé",
    weightLabel: "Poids (kg)",
    heightLabel: "Taille (cm)",
    calculateButton: "Calculer l'IMC",
    invalidInputs: "Veuillez entrer des valeurs valides",
    yourBmiIs: "Votre IMC est de",
    category: "Catégorie",
    advice: "Conseil"
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "احسب مؤشر كتلة جسمك",
    mainMenu: "القائمة الرئيسية",
    aiAssistant: "مساعد الذكاء الاصطناعي الصحي",
    healthTips: "نصائح صحية",
    bmiHistory: "تاريخ مؤشر كتلة الجسم",
    categories: {
      underweight: "نقص الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة الوزن",
      obese: "سمنة"
    },
    healthAdvice: "نصائح صحية",
    weightLabel: "الوزن (كجم)",
    heightLabel: "الطول (سم)",
    calculateButton: "احسب مؤشر كتلة الجسم",
    invalidInputs: "يرجى إدخال قيم صحيحة",
    yourBmiIs: "مؤشر كتلة جسمك هو",
    category: "الفئة",
    advice: "نصيحة"
  },
  hi: {
    title: "बीएमआई कैलकुलेटर",
    subtitle: "अपने शरीर के मास इंडेक्स की गणना करें",
    mainMenu: "मुख्य मेनू",
    aiAssistant: "एआई स्वास्थ्य सहायक",
    healthTips: "स्वास्थ्य टिप्स",
    bmiHistory: "बीएमआई इतिहास",
    categories: {
      underweight: "कम वजन",
      normal: "सामान्य वजन",
      overweight: "अधिक वजन",
      obese: "मोटापा"
    },
    healthAdvice: "स्वास्थ्य सलाह",
    weightLabel: "वजन (किलोग्राम)",
    heightLabel: "ऊंचाई (सेमी)",
    calculateButton: "बीएमआई की गणना करें",
    invalidInputs: "कृपया मान्य मान दर्ज करें",
    yourBmiIs: "आपका बीएमआई है",
    category: "श्रेणी",
    advice: "सलाह"
  }
};
