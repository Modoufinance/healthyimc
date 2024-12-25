export type Categories = {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
};

export type Advice = {
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
};

export type TranslationType = {
  title: string;
  subtitle: string;
  weight: string;
  height: string;
  calculate: string;
  weightPlaceholder: string;
  heightPlaceholder: string;
  healthAdvice: string;
  activityTracking: string;
  nutrition: string;
  mentalWellness: string;
  bmiHistory: string;
  categories: Categories;
  advice: Advice;
};

export const translations: Record<Language, TranslationType> = {
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    weight: "Weight (kg)",
    height: "Height (cm)",
    calculate: "Calculate BMI",
    weightPlaceholder: "ex: 70",
    heightPlaceholder: "ex: 175",
    healthAdvice: "Health Advice",
    activityTracking: "Activity Tracking",
    nutrition: "Nutrition",
    mentalWellness: "Mental Wellness",
    bmiHistory: "BMI History",
    categories: {
      underweight: "Underweight",
      normal: "Normal weight",
      overweight: "Overweight",
      obese: "Obese"
    },
    advice: {
      underweight: "Consider consulting a healthcare professional for dietary advice.",
      normal: "Keep maintaining a healthy lifestyle!",
      overweight: "A healthcare professional can help you establish a suitable program.",
      obese: "It's important to consult a healthcare professional for personalized advice."
    }
  },
  fr: {
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    weight: "Poids (kg)",
    height: "Taille (cm)",
    calculate: "Calculer l'IMC",
    weightPlaceholder: "ex: 70",
    heightPlaceholder: "ex: 175",
    healthAdvice: "Conseils Santé",
    activityTracking: "Suivi d'Activité",
    nutrition: "Nutrition",
    mentalWellness: "Bien-être Mental",
    bmiHistory: "Historique IMC",
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Poids normal",
      overweight: "Surpoids",
      obese: "Obésité"
    },
    advice: {
      underweight: "Pensez à consulter un professionnel de santé pour des conseils alimentaires.",
      normal: "Continuez à maintenir un mode de vie sain !",
      overweight: "Un professionnel de santé peut vous aider à établir un programme adapté.",
      obese: "Il est important de consulter un professionnel de santé pour des conseils personnalisés."
    }
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "احسب مؤشر كتلة جسمك",
    weight: "الوزن (كجم)",
    height: "الطول (سم)",
    calculate: "احسب مؤشر كتلة الجسم",
    weightPlaceholder: "مثال: 70",
    heightPlaceholder: "مثال: 175",
    healthAdvice: "نصائح صحية",
    activityTracking: "تتبع النشاط",
    nutrition: "التغذية",
    mentalWellness: "الصحة النفسية",
    bmiHistory: "سجل مؤشر كتلة الجسم",
    categories: {
      underweight: "نقص الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة الوزن",
      obese: "السمنة"
    },
    advice: {
      underweight: "يُنصح باستشارة أخصائي صحي للحصول على نصائح غذائية.",
      normal: "حافظ على نمط حياتك الصحي!",
      overweight: "يمكن لأخصائي صحي مساعدتك في وضع برنامج مناسب.",
      obese: "من المهم استشارة أخصائي صحي للحصول على نصائح شخصية."
    }
  },
  hi: {
    title: "बीएमआई कैलकुलेटर",
    subtitle: "अपना बॉडी मास इंडेक्स की गणना करें",
    weight: "वजन (किग्रा)",
    height: "ऊंचाई (सेमी)",
    calculate: "बीएमआई की गणना करें",
    weightPlaceholder: "उदा: 70",
    heightPlaceholder: "उदा: 175",
    healthAdvice: "स्वास्थ्य सलाह",
    activityTracking: "गतिविधि ट्रैकिंग",
    nutrition: "पोषण",
    mentalWellness: "मानसिक स्वास्थ्य",
    bmiHistory: "बीएमआई इतिहास",
    categories: {
      underweight: "कम वजन",
      normal: "सामान्य वजन",
      overweight: "अधिक वजन",
      obese: "मोटापा"
    },
    advice: {
      underweight: "आहार संबंधी सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करें।",
      normal: "स्वस्थ जीवनशैली बनाए रखें!",
      overweight: "एक स्वास्थ्य पेशेवर आपको उपयुक्त कार्यक्रम बनाने में मदद कर सकता है।",
      obese: "व्यक्तिगत सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करना महत्वपूर्ण है।"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof TranslationType;