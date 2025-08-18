import type { TranslationType } from "./types";
import { getCompleteTranslations } from "./completeTranslations";

const baseTranslations: Record<string, Partial<TranslationType>> = {
  fr: {
    title: "Calculatrice IMC Gratuite",
    subtitle: "Calculez votre indice de masse corporelle rapidement",
    bmiHistory: "Historique IMC",
    bmiPredictions: "Prédictions IMC",
    disclaimer: "Cet outil ne remplace pas un avis médical professionnel.",
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
      goals: "Objectifs"
    },
    placeholders: {
      age: "Entrez votre âge",
      weight: "Entrez votre poids",
      height: "Entrez votre taille",
      goals: "Vos objectifs de santé"
    },
    activities: {
      low: "Faible",
      moderate: "Modéré",
      high: "Élevé"
    },
    buttons: {
      calculate: "Calculer",
      analyze: "Analyser"
    },
    advice: {
      underweight: "Vous présentez une insuffisance pondérale. Consultez un professionnel de santé.",
      normal: "Vous avez un poids normal. Maintenez votre mode de vie sain.",
      overweight: "Vous présentez un surpoids. Envisagez une alimentation équilibrée et de l'exercice.",
      obese: "Vous présentez une obésité. Consultez un professionnel de santé pour un accompagnement."
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Comment calculer son IMC?",
          answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres)."
        },
        {
          question: "Quel est l'IMC idéal?",
          answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal."
        },
        {
          question: "L'IMC est-il fiable pour tout le monde?",
          answer: "L'IMC est un indicateur général mais ne tient pas compte de tous les facteurs individuels."
        }
      ]
    },
    education: {
      title: "Comprendre l'IMC",
      sections: [
        {
          title: "Qu'est-ce que l'IMC?",
          content: "L'Indice de Masse Corporelle est un indicateur de corpulence."
        },
        {
          title: "Comment l'interpréter?",
          content: "L'IMC doit être interprété en tenant compte de votre profil personnel."
        }
      ]
    },
    language: "Langue",
    navigation: {
      home: "Accueil",
      calculators: "Calculatrices",
      bmiCalculator: "Calculatrice d'IMC",
      childrenBMI: "IMC Enfants",
      bodyFat: "Graisse Corporelle",
      calories: "Calories",
      symptomAnalyzer: "Analyseur Symptômes",
      wellness: "Bien-être",
      fitnessCoach: "Coach Fitness IA",
      blog: "Blog",
      about: "À propos",
      health: "Santé",
      healthAssistant: "Assistant Santé",
      privacy: "Confidentialité",
      brandName: "Healthy IMC",
      result: "Résultat",
      calculate: "Calculer",
      quickResult: "Résultat en 30 secondes",
      newProgram: "Nouveau !",
      discoverFitness: "Découvrez notre programme fitness basé sur l'IA"
    },
    hero: {
      title: "Calculez votre IMC gratuitement en moins d'une minute",
      subtitle: "Rejoignez plus de 50 000 personnes qui ont déjà calculé leur indice de masse corporelle",
      ctaButton: "Calculer mon IMC maintenant",
      resultTime: "Résultat en 30 secondes",
      newFitnessProgram: "Nouveau ! Découvrez notre programme fitness basé sur l'IA"
    },
    breadcrumbs: {
      home: "Accueil"
    }
  },
  en: {
    title: "Free BMI Calculator",
    subtitle: "Calculate your body mass index quickly",
    bmiHistory: "BMI History",
    bmiPredictions: "BMI Predictions",
    disclaimer: "This tool does not replace professional medical advice.",
    categories: {
      underweight: "Underweight",
      normal: "Normal weight",
      overweight: "Overweight",
      obese: "Obesity"
    },
    units: {
      weight: {
        unit: "lbs",
        factor: 2.205
      },
      height: {
        unit: "in",
        factor: 0.394
      }
    },
    labels: {
      age: "Age",
      weight: "Weight",
      height: "Height",
      activity: "Activity level",
      goals: "Goals"
    },
    placeholders: {
      age: "Enter your age",
      weight: "Enter your weight",
      height: "Enter your height",
      goals: "Your health goals"
    },
    activities: {
      low: "Low",
      moderate: "Moderate",
      high: "High"
    },
    buttons: {
      calculate: "Calculate",
      analyze: "Analyze"
    },
    advice: {
      underweight: "You are underweight. Consider consulting a healthcare professional.",
      normal: "You have a normal weight. Maintain your healthy lifestyle.",
      overweight: "You are overweight. Consider a balanced diet and exercise.",
      obese: "You are obese. Consult a healthcare professional for guidance."
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How to calculate BMI?",
          answer: "BMI is calculated by dividing your weight (in kg) by the square of your height (in meters)."
        },
        {
          question: "What is the ideal BMI?",
          answer: "A BMI between 18.5 and 24.9 is considered normal."
        },
        {
          question: "Is BMI reliable for everyone?",
          answer: "BMI is a general indicator but doesn't account for all individual factors."
        }
      ]
    },
    education: {
      title: "Understanding BMI",
      sections: [
        {
          title: "What is BMI?",
          content: "Body Mass Index is an indicator of body composition."
        },
        {
          title: "How to interpret it?",
          content: "BMI should be interpreted considering your personal profile."
        }
      ]
    },
    language: "Language",
    navigation: {
      home: "Home",
      calculators: "Calculators",
      bmiCalculator: "BMI Calculator",
      childrenBMI: "Children BMI",
      bodyFat: "Body Fat",
      calories: "Calories",
      symptomAnalyzer: "Symptom Analyzer",
      wellness: "Wellness",
      fitnessCoach: "AI Fitness Coach",
      blog: "Blog",
      about: "About",
      health: "Health",
      healthAssistant: "Health Assistant",
      privacy: "Privacy",
      brandName: "Healthy BMI",
      result: "Result",
      calculate: "Calculate",
      quickResult: "Result in 30 seconds",
      newProgram: "New!",
      discoverFitness: "Discover our AI-powered fitness program"
    },
    hero: {
      title: "Calculate your BMI for free in less than a minute",
      subtitle: "Join over 50,000 people who have already calculated their body mass index",
      ctaButton: "Calculate my BMI now",
      resultTime: "Result in 30 seconds",
      newFitnessProgram: "New! Discover our AI-powered fitness program"
    },
    breadcrumbs: {
      home: "Home"
    }
  },
  zh: {
    title: "免费BMI计算器",
    subtitle: "快速计算您的身体质量指数",
    bmiHistory: "BMI历史记录",
    bmiPredictions: "BMI预测",
    disclaimer: "此工具不能替代专业医疗建议。",
    categories: {
      underweight: "体重过轻",
      normal: "体重正常",
      overweight: "超重",
      obese: "肥胖"
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
      age: "年龄",
      weight: "体重",
      height: "身高",
      activity: "活动水平",
      goals: "目标"
    },
    placeholders: {
      age: "输入您的年龄",
      weight: "输入您的体重",
      height: "输入您的身高",
      goals: "您的健康目标"
    },
    activities: {
      low: "低",
      moderate: "中等",
      high: "高"
    },
    buttons: {
      calculate: "计算",
      analyze: "分析"
    },
    advice: {
      underweight: "您体重过轻。建议咨询医疗专业人士。",
      normal: "您的体重正常。保持健康的生活方式。",
      overweight: "您超重了。考虑均衡饮食和运动。",
      obese: "您肥胖了。请咨询医疗专业人士寻求指导。"
    },
    faq: {
      title: "常见问题",
      items: [
        {
          question: "如何计算BMI？",
          answer: "BMI通过体重(公斤)除以身高(米)的平方来计算。"
        },
        {
          question: "理想的BMI是多少？",
          answer: "18.5到24.9之间的BMI被认为是正常的。"
        },
        {
          question: "BMI对每个人都可靠吗？",
          answer: "BMI是一个一般指标，但不能说明所有个人因素。"
        }
      ]
    },
    education: {
      title: "了解BMI",
      sections: [
        {
          title: "什么是BMI？",
          content: "身体质量指数是身体组成的指标。"
        },
        {
          title: "如何解释它？",
          content: "应该结合您的个人情况来解释BMI。"
        }
      ]
    },
    language: "语言",
    navigation: {
      home: "首页",
      calculators: "计算器",
      bmiCalculator: "BMI计算器",
      childrenBMI: "儿童BMI",
      bodyFat: "体脂",
      calories: "卡路里",
      symptomAnalyzer: "症状分析器",
      wellness: "健康",
      fitnessCoach: "AI健身教练",
      blog: "博客",
      about: "关于",
      health: "健康",
      healthAssistant: "健康助手",
      privacy: "隐私",
      brandName: "健康BMI",
      result: "结果",
      calculate: "计算",
      quickResult: "30秒内出结果",
      newProgram: "新!",
      discoverFitness: "发现我们的AI健身程序"
    },
    hero: {
      title: "免费在一分钟内计算您的BMI",
      subtitle: "加入超过50,000人已经计算过他们的身体质量指数",
      ctaButton: "立即计算我的BMI",
      resultTime: "30秒内出结果",
      newFitnessProgram: "新功能！发现我们的AI健身程序"
    },
    breadcrumbs: {
      home: "首页"
    }
  },
  es: {
    title: "Calculadora de IMC Gratuita",
    subtitle: "Calcule su índice de masa corporal rápidamente",
    bmiHistory: "Historial de IMC",
    bmiPredictions: "Predicciones de IMC",
    disclaimer: "Esta herramienta no reemplaza el consejo médico profesional.",
    categories: {
      underweight: "Peso insuficiente",
      normal: "Peso normal",
      overweight: "Sobrepeso",
      obese: "Obesidad"
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
      age: "Edad",
      weight: "Peso",
      height: "Altura",
      activity: "Nivel de actividad",
      goals: "Objetivos"
    },
    placeholders: {
      age: "Introduzca su edad",
      weight: "Introduzca su peso",
      height: "Introduzca su altura",
      goals: "Sus objetivos de salud"
    },
    activities: {
      low: "Bajo",
      moderate: "Moderado",
      high: "Alto"
    },
    buttons: {
      calculate: "Calcular",
      analyze: "Analizar"
    },
    advice: {
      underweight: "Tiene peso insuficiente. Considere consultar a un profesional de la salud.",
      normal: "Tiene un peso normal. Mantenga su estilo de vida saludable.",
      overweight: "Tiene sobrepeso. Considere una dieta equilibrada y ejercicio.",
      obese: "Tiene obesidad. Consulte a un profesional de la salud para orientación."
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Cómo calcular el IMC?",
          answer: "El IMC se calcula dividiendo su peso (en kg) por el cuadrado de su altura (en metros)."
        },
        {
          question: "¿Cuál es el IMC ideal?",
          answer: "Un IMC entre 18.5 y 24.9 se considera normal."
        },
        {
          question: "¿Es el IMC confiable para todos?",
          answer: "El IMC es un indicador general pero no tiene en cuenta todos los factores individuales."
        }
      ]
    },
    education: {
      title: "Entendiendo el IMC",
      sections: [
        {
          title: "¿Qué es el IMC?",
          content: "El Índice de Masa Corporal es un indicador de composición corporal."
        },
        {
          title: "¿Cómo interpretarlo?",
          content: "El IMC debe interpretarse considerando su perfil personal."
        }
      ]
    },
    language: "Idioma",
    navigation: {
      home: "Inicio",
      calculators: "Calculadoras",
      bmiCalculator: "Calculadora IMC",
      childrenBMI: "IMC Niños",
      bodyFat: "Grasa Corporal",
      calories: "Calorías",
      symptomAnalyzer: "Analizador de Síntomas",
      wellness: "Bienestar",
      fitnessCoach: "Entrenador IA",
      blog: "Blog",
      about: "Acerca de",
      health: "Salud",
      healthAssistant: "Asistente de Salud",
      privacy: "Privacidad",
      brandName: "IMC Saludable",
      result: "Resultado",
      calculate: "Calcular",
      quickResult: "Resultado en 30 segundos",
      newProgram: "¡Nuevo!",
      discoverFitness: "Descubre nuestro programa fitness con IA"
    },
    hero: {
      title: "Calcula tu IMC gratis en menos de un minuto",
      subtitle: "Únete a más de 50,000 personas que ya han calculado su índice de masa corporal",
      ctaButton: "Calcular mi IMC ahora",
      resultTime: "Resultado en 30 segundos",
      newFitnessProgram: "¡Nuevo! Descubre nuestro programa fitness con IA"
    },
    breadcrumbs: {
      home: "Inicio"
    }
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم المجانية",
    subtitle: "احسب مؤشر كتلة الجسم الخاص بك بسرعة",
    bmiHistory: "تاريخ مؤشر كتلة الجسم",
    bmiPredictions: "توقعات مؤشر كتلة الجسم",
    disclaimer: "هذه الأداة لا تحل محل النصائح الطبية المهنية.",
    categories: {
      underweight: "نقص الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة الوزن",
      obese: "السمنة"
    },
    units: {
      weight: {
        unit: "كجم",
        factor: 1
      },
      height: {
        unit: "سم",
        factor: 1
      }
    },
    labels: {
      age: "العمر",
      weight: "الوزن",
      height: "الطول",
      activity: "مستوى النشاط",
      goals: "الأهداف"
    },
    placeholders: {
      age: "أدخل عمرك",
      weight: "أدخل وزنك",
      height: "أدخل طولك",
      goals: "أهدافك الصحية"
    },
    activities: {
      low: "منخفض",
      moderate: "معتدل",
      high: "مرتفع"
    },
    buttons: {
      calculate: "احسب",
      analyze: "حلل"
    },
    advice: {
      underweight: "لديك نقص في الوزن. فكر في استشارة متخصص في الرعاية الصحية.",
      normal: "لديك وزن طبيعي. حافظ على نمط حياة صحي.",
      overweight: "لديك زيادة في الوزن. فكر في نظام غذائي متوازن وممارسة الرياضة.",
      obese: "لديك سمنة. استشر متخصصًا في الرعاية الصحية للحصول على إرشادات."
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          question: "كيفية حساب مؤشر كتلة الجسم؟",
          answer: "يُحسب مؤشر كتلة الجسم بقسمة وزنك (بالكيلوغرام) على مربع طولك (بالأمتار)."
        },
        {
          question: "ما هو مؤشر كتلة الجسم المثالي؟",
          answer: "يُعتبر مؤشر كتلة الجسم بين 18.5 و 24.9 طبيعيًا."
        },
        {
          question: "هل مؤشر كتلة الجسم موثوق للجميع؟",
          answer: "مؤشر كتلة الجسم مؤشر عام لكنه لا يأخذ في الاعتبار جميع العوامل الفردية."
        }
      ]
    },
    education: {
      title: "فهم مؤشر كتلة الجسم",
      sections: [
        {
          title: "ما هو مؤشر كتلة الجسم؟",
          content: "مؤشر كتلة الجسم هو مؤشر لتركيب الجسم."
        },
        {
          title: "كيفية تفسيره؟",
          content: "يجب تفسير مؤشر كتلة الجسم مع مراعاة ملفك الشخصي."
        }
      ]
    },
    language: "اللغة",
    navigation: {
      home: "الرئيسية",
      calculators: "الحاسبات",
      bmiCalculator: "حاسبة مؤشر كتلة الجسم",
      childrenBMI: "مؤشر كتلة الجسم للأطفال",
      bodyFat: "دهون الجسم",
      calories: "السعرات الحرارية",
      symptomAnalyzer: "محلل الأعراض",
      wellness: "العافية",
      fitnessCoach: "مدرب اللياقة بالذكاء الاصطناعي",
      blog: "المدونة",
      about: "حول",
      health: "الصحة",
      healthAssistant: "مساعد الصحة",
      privacy: "الخصوصية",
      brandName: "مؤشر كتلة الجسم الصحي",
      result: "النتيجة",
      calculate: "احسب",
      quickResult: "النتيجة في 30 ثانية",
      newProgram: "جديد!",
      discoverFitness: "اكتشف برنامج اللياقة بالذكاء الاصطناعي"
    },
    hero: {
      title: "احسب مؤشر كتلة الجسم مجاناً في أقل من دقيقة",
      subtitle: "انضم إلى أكثر من 50,000 شخص قاموا بحساب مؤشر كتلة الجسم",
      ctaButton: "احسب مؤشر كتلة الجسم الآن",
      resultTime: "النتيجة في 30 ثانية",
      newFitnessProgram: "جديد! اكتشف برنامج اللياقة بالذكاء الاصطناعي"
    },
    breadcrumbs: {
      home: "الرئيسية"
    }
  },
  hi: {
    title: "मुफ्त BMI कैलकुलेटर",
    subtitle: "अपना बॉडी मास इंडेक्स जल्दी गणना करें",
    bmiHistory: "BMI इतिहास",
    bmiPredictions: "BMI भविष्यवाणी",
    disclaimer: "यह उपकरण पेशेवर चिकित्सा सलाह की जगह नहीं लेता।",
    categories: {
      underweight: "कम वजन",
      normal: "सामान्य वजन",
      overweight: "अधिक वजन",
      obese: "मोटापा"
    },
    units: {
      weight: {
        unit: "किग्रा",
        factor: 1
      },
      height: {
        unit: "सेमी",
        factor: 1
      }
    },
    labels: {
      age: "उम्र",
      weight: "वजन",
      height: "ऊंचाई",
      activity: "गतिविधि स्तर",
      goals: "लक्ष्य"
    },
    placeholders: {
      age: "अपनी उम्र दर्ज करें",
      weight: "अपना वजन दर्ज करें",
      height: "अपनी ऊंचाई दर्ज करें",
      goals: "आपके स्वास्थ्य लक्ष्य"
    },
    activities: {
      low: "कम",
      moderate: "मध्यम",
      high: "उच्च"
    },
    buttons: {
      calculate: "गणना करें",
      analyze: "विश्लेषण करें"
    },
    advice: {
      underweight: "आपका वजन कम है। स्वास्थ्य पेशेवर से सलाह लेने पर विचार करें।",
      normal: "आपका वजन सामान्य है। स्वस्थ जीवनशैली बनाए रखें।",
      overweight: "आपका वजन अधिक है। संतुलित आहार और व्यायाम पर विचार करें।",
      obese: "आपको मोटापा है। मार्गदर्शन के लिए स्वास्थ्य पेशेवर से सलाह लें।"
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        {
          question: "BMI की गणना कैसे करें?",
          answer: "BMI की गणना आपके वजन (किलोग्राम में) को आपकी ऊंचाई (मीटर में) के वर्ग से विभाजित करके की जाती है।"
        },
        {
          question: "आदर्श BMI क्या है?",
          answer: "18.5 और 24.9 के बीच BMI को सामान्य माना जाता है।"
        },
        {
          question: "क्या BMI सभी के लिए विश्वसनीय है?",
          answer: "BMI एक सामान्य संकेतक है लेकिन यह सभी व्यक्तिगत कारकों को ध्यान में नहीं रखता।"
        }
      ]
    },
    education: {
      title: "BMI को समझना",
      sections: [
        {
          title: "BMI क्या है?",
          content: "बॉडी मास इंडेक्स शरीर की संरचना का एक संकेतक है।"
        },
        {
          title: "इसकी व्याख्या कैसे करें?",
          content: "BMI की व्याख्या आपकी व्यक्तिगत प्रोफ़ाइल को ध्यान में रखते हुए करनी चाहिए।"
        }
      ]
    },
    language: "भाषा",
    navigation: {
      home: "होम",
      calculators: "कैलकुलेटर",
      bmiCalculator: "बीएमआई कैलकुलेटर",
      childrenBMI: "बच्चों का बीएमआई",
      bodyFat: "शरीर की चर्बी",
      calories: "कैलोरी",
      symptomAnalyzer: "लक्षण विश्लेषक",
      wellness: "कल्याण",
      fitnessCoach: "एआई फिटनेस कोच",
      blog: "ब्लॉग",
      about: "के बारे में",
      health: "स्वास्थ्य",
      healthAssistant: "स्वास्थ्य सहायक",
      privacy: "गोपनीयता",
      brandName: "स्वस्थ बीएमआई",
      result: "परिणाम",
      calculate: "गणना करें",
      quickResult: "30 सेकंड में परिणाम",
      newProgram: "नया!",
      discoverFitness: "हमारे एआई फिटनेस प्रोग्राम की खोज करें"
    },
    hero: {
      title: "एक मिनट से कम में मुफ्त में अपना BMI गणना करें",
      subtitle: "50,000 से अधिक लोगों से जुड़ें जिन्होंने पहले ही अपना बॉडी मास इंडेक्स गणना किया है",
      ctaButton: "अब मेरा BMI गणना करें",
      resultTime: "30 सेकंड में परिणाम",
      newFitnessProgram: "नया! हमारे AI फिटनेस प्रोग्राम की खोज करें"
    },
    breadcrumbs: {
      home: "होम"
    }
  },
  pt: {
    title: "Calculadora de IMC Gratuita",
    subtitle: "Calcule seu índice de massa corporal rapidamente",
    bmiHistory: "Histórico de IMC",
    bmiPredictions: "Previsões de IMC",
    disclaimer: "Esta ferramenta não substitui aconselhamento médico profissional.",
    categories: {
      underweight: "Abaixo do peso",
      normal: "Peso normal",
      overweight: "Sobrepeso",
      obese: "Obesidade"
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
      age: "Idade",
      weight: "Peso",
      height: "Altura",
      activity: "Nível de atividade",
      goals: "Objetivos"
    },
    placeholders: {
      age: "Digite sua idade",
      weight: "Digite seu peso",
      height: "Digite sua altura",
      goals: "Seus objetivos de saúde"
    },
    activities: {
      low: "Baixo",
      moderate: "Moderado",
      high: "Alto"
    },
    buttons: {
      calculate: "Calcular",
      analyze: "Analisar"
    },
    advice: {
      underweight: "Você está abaixo do peso. Considere consultar um profissional de saúde.",
      normal: "Você tem peso normal. Mantenha seu estilo de vida saudável.",
      overweight: "Você está com sobrepeso. Considere uma dieta equilibrada e exercício.",
      obese: "Você tem obesidade. Consulte um profissional de saúde para orientação."
    },
    faq: {
      title: "Perguntas Frequentes",
      items: [
        {
          question: "Como calcular o IMC?",
          answer: "O IMC é calculado dividindo seu peso (em kg) pelo quadrado de sua altura (em metros)."
        },
        {
          question: "Qual é o IMC ideal?",
          answer: "Um IMC entre 18,5 e 24,9 é considerado normal."
        },
        {
          question: "O IMC é confiável para todos?",
          answer: "O IMC é um indicador geral, mas não leva em conta todos os fatores individuais."
        }
      ]
    },
    education: {
      title: "Entendendo o IMC",
      sections: [
        {
          title: "O que é IMC?",
          content: "O Índice de Massa Corporal é um indicador da composição corporal."
        },
        {
          title: "Como interpretá-lo?",
          content: "O IMC deve ser interpretado considerando seu perfil pessoal."
        }
      ]
    },
    language: "Idioma",
    navigation: {
      home: "Início",
      calculators: "Calculadoras",
      bmiCalculator: "Calculadora IMC",
      childrenBMI: "IMC Crianças",
      bodyFat: "Gordura Corporal",
      calories: "Calorias",
      symptomAnalyzer: "Analisador de Sintomas",
      wellness: "Bem-estar",
      fitnessCoach: "Coach IA",
      blog: "Blog",
      about: "Sobre",
      health: "Saúde",
      healthAssistant: "Assistente de Saúde",
      privacy: "Privacidade",
      brandName: "IMC Saudável",
      result: "Resultado",
      calculate: "Calcular",
      quickResult: "Resultado em 30 segundos",
      newProgram: "Novo!",
      discoverFitness: "Descubra nosso programa fitness com IA"
    },
    hero: {
      title: "Calcule seu IMC gratuitamente em menos de um minuto",
      subtitle: "Junte-se a mais de 50.000 pessoas que já calcularam seu índice de massa corporal",
      ctaButton: "Calcular meu IMC agora",
      resultTime: "Resultado em 30 segundos",
      newFitnessProgram: "Novo! Descubra nosso programa fitness com IA"
    },
    breadcrumbs: {
      home: "Início"
    }
  },
  bn: {
    title: "বিনামূল্যে BMI ক্যালকুলেটর",
    subtitle: "দ্রুত আপনার বডি ম্যাস ইন্ডেক্স গণনা করুন",
    bmiHistory: "BMI ইতিহাস",
    bmiPredictions: "BMI পূর্বাভাস",
    disclaimer: "এই টুলটি পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।",
    categories: {
      underweight: "কম ওজন",
      normal: "স্বাভাবিক ওজন",
      overweight: "অতিরিক্ত ওজন",
      obese: "স্থূলতা"
    },
    units: {
      weight: {
        unit: "কেজি",
        factor: 1
      },
      height: {
        unit: "সেমি",
        factor: 1
      }
    },
    labels: {
      age: "বয়স",
      weight: "ওজন",
      height: "উচ্চতা",
      activity: "কার্যকলাপের স্তর",
      goals: "লক্ষ্য"
    },
    placeholders: {
      age: "আপনার বয়স লিখুন",
      weight: "আপনার ওজন লিখুন",
      height: "আপনার উচ্চতা লিখুন",
      goals: "আপনার স্বাস্থ্য লক্ষ্য"
    },
    activities: {
      low: "কম",
      moderate: "মাঝারি",
      high: "উচ্চ"
    },
    buttons: {
      calculate: "গণনা করুন",
      analyze: "বিশ্লেষণ করুন"
    },
    advice: {
      underweight: "আপনার ওজন কম। একজন স্বাস্থ্য পেশাদারের সাথে পরামর্শ করার কথা বিবেচনা করুন।",
      normal: "আপনার ওজন স্বাভাবিক। আপনার স্বাস্থ্যকর জীবনযাত্রা বজায় রাখুন।",
      overweight: "আপনার ওজন বেশি। সুষম খাদ্য এবং ব্যায়ামের কথা বিবেচনা করুন।",
      obese: "আপনার স্থূলতা রয়েছে। নির্দেশনার জন্য একজন স্বাস্থ্য পেশাদারের সাথে পরামর্শ করুন।"
    },
    faq: {
      title: "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
      items: [
        {
          question: "BMI কীভাবে গণনা করবেন?",
          answer: "BMI আপনার ওজন (কিলোগ্রামে) কে আপনার উচ্চতার (মিটারে) বর্গ দিয়ে ভাগ করে গণনা করা হয়।"
        },
        {
          question: "আদর্শ BMI কী?",
          answer: "18.5 এবং 24.9 এর মধ্যে BMI স্বাভাবিক বলে বিবেচিত হয়।"
        },
        {
          question: "BMI কি সবার জন্য নির্ভরযোগ্য?",
          answer: "BMI একটি সাধারণ সূচক কিন্তু এটি সমস্ত ব্যক্তিগত কারণ বিবেচনা করে না।"
        }
      ]
    },
    education: {
      title: "BMI বোঝা",
      sections: [
        {
          title: "BMI কী?",
          content: "বডি ম্যাস ইন্ডেক্স শরীরের গঠনের একটি সূচক।"
        },
        {
          title: "এটি কীভাবে ব্যাখ্যা করবেন?",
          content: "আপনার ব্যক্তিগত প্রোফাইল বিবেচনা করে BMI ব্যাখ্যা করা উচিত।"
        }
      ]
    },
    language: "ভাষা",
    navigation: {
      home: "হোম",
      calculators: "ক্যালকুলেটর",
      bmiCalculator: "বিএমআই ক্যালকুলেটর",
      childrenBMI: "শিশুদের বিএমআই",
      bodyFat: "শরীরের চর্বি",
      calories: "ক্যালোরি",
      symptomAnalyzer: "লক্ষণ বিশ্লেষক",
      wellness: "সুস্থতা",
      fitnessCoach: "এআই ফিটনেস কোচ",
      blog: "ব্লগ",
      about: "সম্পর্কে",
      health: "স্বাস্থ্য",
      healthAssistant: "স্বাস্থ্য সহায়ক",
      privacy: "গোপনীয়তা",
      brandName: "স্বাস্থ্যকর বিএমআই",
      result: "ফলাফল",
      calculate: "গণনা করুন",
      quickResult: "৩০ সেকেন্ডে ফলাফল",
      newProgram: "নতুন!",
      discoverFitness: "আমাদের এআই ফিটনেস প্রোগ্রাম আবিষ্কার করুন"
    },
    hero: {
      title: "এক মিনিটেরও কম সময়ে বিনামূল্যে আপনার BMI গণনা করুন",
      subtitle: "50,000+ মানুষের সাথে যোগ দিন যারা ইতিমধ্যে তাদের বডি ম্যাস ইন্ডেক্স গণনা করেছেন",
      ctaButton: "এখনই আমার BMI গণনা করুন",
      resultTime: "৩০ সেকেন্ডে ফলাফল",
      newFitnessProgram: "নতুন! আমাদের AI ফিটনেস প্রোগ্রাম আবিষ্কার করুন"
    },
    breadcrumbs: {
      home: "হোম"
    }
  },
  ru: {
    title: "Бесплатный калькулятор ИМТ",
    subtitle: "Быстро рассчитайте свой индекс массы тела",
    bmiHistory: "История ИМТ",
    bmiPredictions: "Прогнозы ИМТ",
    disclaimer: "Этот инструмент не заменяет профессиональную медицинскую консультацию.",
    categories: {
      underweight: "Недостаточный вес",
      normal: "Нормальный вес",
      overweight: "Избыточный вес",
      obese: "Ожирение"
    },
    units: {
      weight: {
        unit: "кг",
        factor: 1
      },
      height: {
        unit: "см",
        factor: 1
      }
    },
    labels: {
      age: "Возраст",
      weight: "Вес",
      height: "Рост",
      activity: "Уровень активности",
      goals: "Цели"
    },
    placeholders: {
      age: "Введите ваш возраст",
      weight: "Введите ваш вес",
      height: "Введите ваш рост",
      goals: "Ваши цели здоровья"
    },
    activities: {
      low: "Низкий",
      moderate: "Умеренный",
      high: "Высокий"
    },
    buttons: {
      calculate: "Рассчитать",
      analyze: "Анализировать"
    },
    advice: {
      underweight: "У вас недостаточный вес. Рассмотрите возможность консультации с медицинским работником.",
      normal: "У вас нормальный вес. Поддерживайте здоровый образ жизни.",
      overweight: "У вас избыточный вес. Рассмотрите сбалансированную диету и упражнения.",
      obese: "У вас ожирение. Проконсультируйтесь с медицинским работником для получения рекомендаций."
    },
    faq: {
      title: "Часто задаваемые вопросы",
      items: [
        {
          question: "Как рассчитать ИМТ?",
          answer: "ИМТ рассчитывается путем деления вашего веса (в кг) на квадрат вашего роста (в метрах)."
        },
        {
          question: "Какой идеальный ИМТ?",
          answer: "ИМТ между 18,5 и 24,9 считается нормальным."
        },
        {
          question: "Надежен ли ИМТ для всех?",
          answer: "ИМТ является общим показателем, но не учитывает все индивидуальные факторы."
        }
      ]
    },
    education: {
      title: "Понимание ИМТ",
      sections: [
        {
          title: "Что такое ИМТ?",
          content: "Индекс массы тела - это показатель состава тела."
        },
        {
          title: "Как его интерпретировать?",
          content: "ИМТ следует интерпретировать с учетом вашего личного профиля."
        }
      ]
    },
    language: "Язык",
    navigation: {
      home: "Главная",
      calculators: "Калькуляторы",
      bmiCalculator: "Калькулятор ИМТ",
      childrenBMI: "ИМТ детей",
      bodyFat: "Жир тела",
      calories: "Калории",
      symptomAnalyzer: "Анализатор симптомов",
      wellness: "Благополучие",
      fitnessCoach: "ИИ тренер",
      blog: "Блог",
      about: "О нас",
      health: "Здоровье",
      healthAssistant: "Помощник здоровья",
      privacy: "Конфиденциальность",
      brandName: "Здоровый ИМТ",
      result: "Результат",
      calculate: "Рассчитать",
      quickResult: "Результат за 30 секунд",
      newProgram: "Новое!",
      discoverFitness: "Откройте нашу фитнес-программу с ИИ"
    },
    hero: {
      title: "Рассчитайте свой ИМТ бесплатно менее чем за минуту",
      subtitle: "Присоединяйтесь к более чем 50,000 человек, которые уже рассчитали свой индекс массы тела",
      ctaButton: "Рассчитать мой ИМТ сейчас",
      resultTime: "Результат за 30 секунд",
      newFitnessProgram: "Новое! Откройте нашу фитнес-программу с ИИ"
    },
    breadcrumbs: {
      home: "Главная"
    }
  },
  ja: {
    title: "無料BMI計算機",
    subtitle: "体格指数を素早く計算",
    bmiHistory: "BMI履歴",
    bmiPredictions: "BMI予測",
    disclaimer: "このツールは専門的な医学的アドバイスに代わるものではありません。",
    categories: {
      underweight: "低体重",
      normal: "標準体重",
      overweight: "過体重",
      obese: "肥満"
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
      age: "年齢",
      weight: "体重",
      height: "身長",
      activity: "活動レベル",
      goals: "目標"
    },
    placeholders: {
      age: "年齢を入力",
      weight: "体重を入力",
      height: "身長を入力",
      goals: "健康目標"
    },
    activities: {
      low: "低",
      moderate: "中程度",
      high: "高"
    },
    buttons: {
      calculate: "計算",
      analyze: "分析"
    },
    advice: {
      underweight: "低体重です。医療専門家への相談を検討してください。",
      normal: "標準体重です。健康的なライフスタイルを維持してください。",
      overweight: "過体重です。バランスの取れた食事と運動を検討してください。",
      obese: "肥満です。指導を受けるために医療専門家に相談してください。"
    },
    faq: {
      title: "よくある質問",
      items: [
        {
          question: "BMIの計算方法は？",
          answer: "BMIは体重（kg）を身長（m）の二乗で割って計算されます。"
        },
        {
          question: "理想的なBMIは？",
          answer: "18.5から24.9の間のBMIが標準とされています。"
        },
        {
          question: "BMIは誰にでも信頼できますか？",
          answer: "BMIは一般的な指標ですが、すべての個人的要因を考慮していません。"
        }
      ]
    },
    education: {
      title: "BMIを理解する",
      sections: [
        {
          title: "BMIとは？",
          content: "体格指数は体組成の指標です。"
        },
        {
          title: "解釈方法は？",
          content: "BMIは個人のプロフィールを考慮して解釈する必要があります。"
        }
      ]
    },
    language: "言語",
    navigation: {
      home: "ホーム",
      calculators: "計算機",
      bmiCalculator: "BMI計算機",
      childrenBMI: "子供のBMI",
      bodyFat: "体脂肪",
      calories: "カロリー",
      symptomAnalyzer: "症状アナライザー",
      wellness: "ウェルネス",
      fitnessCoach: "AIフィットネスコーチ",
      blog: "ブログ",
      about: "について",
      health: "健康",
      healthAssistant: "ヘルスアシスタント",
      privacy: "プライバシー",
      brandName: "健康BMI",
      result: "結果",
      calculate: "計算",
      quickResult: "30秒で結果",
      newProgram: "新しい！",
      discoverFitness: "AIパワードフィットネスプログラムを発見"
    },
    hero: {
      title: "1分以内に無料でBMIを計算",
      subtitle: "すでにボディマス指数を計算した50,000人以上の人々に参加しよう",
      ctaButton: "今すぐBMIを計算",
      resultTime: "30秒で結果",
      newFitnessProgram: "新しい！AIパワードフィットネスプログラムを発見"
    },
    breadcrumbs: {
      home: "ホーム"
    }
  }
};

export const translations: Record<string, TranslationType> = getCompleteTranslations(baseTranslations);