import { TranslationType } from "./types";

export const translations: Record<string, TranslationType> = {
  fr: {
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    bmiHistory: "Historique IMC",
    bmiPredictions: "Prédictions IMC",
    nav: {
      home: "Accueil",
      calculator: "Calculateur",
      blog: "Blog",
      about: "À propos"
    },
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
    labels: {
      age: "Âge",
      weight: "Poids",
      height: "Taille",
      activity: "Niveau d'activité",
      goals: "Objectifs de santé"
    },
    placeholders: {
      age: "Entrez votre âge",
      weight: "Ex: 70",
      height: "Ex: 175",
      goals: "Ex: Perdre du poids, Gagner en muscle"
    },
    activities: {
      low: "Faible",
      moderate: "Modéré",
      high: "Élevé"
    },
    buttons: {
      calculate: "Calculer l'IMC",
      analyze: "Analyser ma santé"
    },
    advice: {
      underweight: "Vous êtes en dessous du poids recommandé. Pensez à consulter un professionnel de santé pour des conseils alimentaires.",
      normal: "Votre poids est dans la plage normale. Continuez à maintenir un mode de vie sain !",
      overweight: "Vous êtes en surpoids. Un professionnel de santé peut vous aider à établir un programme adapté.",
      obese: "Vous êtes en obésité. Il est important de consulter un professionnel de santé pour des conseils personnalisés."
    }
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    bmiHistory: "BMI History",
    bmiPredictions: "BMI Predictions",
    nav: {
      home: "Home",
      calculator: "Calculator",
      blog: "Blog",
      about: "About"
    },
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
    labels: {
      age: "Age",
      weight: "Weight",
      height: "Height",
      activity: "Activity Level",
      goals: "Health Goals"
    },
    placeholders: {
      age: "Enter your age",
      weight: "Ex: 154",
      height: "Ex: 69",
      goals: "Ex: Lose weight, Gain muscle"
    },
    activities: {
      low: "Low",
      moderate: "Moderate",
      high: "High"
    },
    buttons: {
      calculate: "Calculate BMI",
      analyze: "Analyze my health"
    },
    advice: {
      underweight: "You are under the recommended weight. Consider consulting a healthcare professional for dietary advice.",
      normal: "Your weight is within the normal range. Keep up a healthy lifestyle!",
      overweight: "You are overweight. A healthcare professional can help you create a suitable program.",
      obese: "You are in the obesity range. It is important to consult a healthcare professional for personalized advice."
    }
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "احسب مؤشر كتلة جسمك",
    bmiHistory: "سجل مؤشر كتلة الجسم",
    bmiPredictions: "توقعات مؤشر كتلة الجسم",
    nav: {
      home: "الرئيسية",
      calculator: "الحاسبة",
      blog: "المدونة",
      about: "حول"
    },
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
    labels: {
      age: "العمر",
      weight: "الوزن",
      height: "الطول",
      activity: "مستوى النشاط",
      goals: "الأهداف الصحية"
    },
    placeholders: {
      age: "أدخل عمرك",
      weight: "مثال: 70",
      height: "مثال: 175",
      goals: "مثال: خسارة الوزن، اكتساب العضلات"
    },
    activities: {
      low: "منخفض",
      moderate: "متوسط",
      high: "مرتفع"
    },
    buttons: {
      calculate: "احسب مؤشر كتلة الجسم",
      analyze: "تحليل صحتي"
    },
    advice: {
      underweight: "وزنك أقل من الموصى به. فكر في استشارة أخصائي صحي للحصول على نصائح غذائية.",
      normal: "وزنك ضمن النطاق الطبيعي. حافظ على نمط حياة صحي!",
      overweight: "لديك زيادة في الوزن. يمكن لأخصائي صحي مساعدتك في وضع برنامج مناسب.",
      obese: "أنت في نطاق السمنة. من المهم استشارة أخصائي صحي للحصول على نصائح شخصية."
    }
  },
  hi: {
    title: "बीएमआई कैलकुलेटर",
    subtitle: "अपना बॉडी मास इंडेक्स कैलकुलेट करें",
    bmiHistory: "बीएमआई इतिहास",
    bmiPredictions: "बीएमआई पूर्वानुमान",
    nav: {
      home: "होम",
      calculator: "कैलकुलेटर",
      blog: "ब्लॉग",
      about: "हमारे बारे में"
    },
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
    labels: {
      age: "उम्र",
      weight: "वजन",
      height: "ऊंचाई",
      activity: "गतिविधि स्तर",
      goals: "स्वास्थ्य लक्ष्य"
    },
    placeholders: {
      age: "अपनी उम्र दर्ज करें",
      weight: "उदा: 70",
      height: "उदा: 175",
      goals: "उदा: वजन कम करना, मांसपेशियां बढ़ाना"
    },
    activities: {
      low: "कम",
      moderate: "मध्यम",
      high: "उच्च"
    },
    buttons: {
      calculate: "बीएमआई की गणना करें",
      analyze: "मेरे स्वास्थ्य का विश्लेषण करें"
    },
    advice: {
      underweight: "आपका वजन अनुशंसित वजन से कम है। आहार संबंधी सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करें।",
      normal: "आपका वजन सामान्य सीमा में है। स्वस्थ जीवनशैली बनाए रखें!",
      overweight: "आपका वजन अधिक है। एक स्वास्थ्य पेशेवर आपको उपयुक्त कार्यक्रम बनाने में मदद कर सकता है।",
      obese: "आप मोटापे की श्रेणी में हैं। व्यक्तिगत सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करना महत्वपूर्ण है।"
    }
  }
};