
import { TranslationType } from "./types";

export const translations: Record<string, TranslationType> = {
  fr: {
    language: "Français",
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    bmiHistory: "Historique IMC",
    bmiPredictions: "Prédictions IMC",
    disclaimer: "Les informations fournies sont à titre indicatif uniquement et ne remplacent pas l'avis d'un professionnel de santé.",
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
    },
    faq: {
      title: "Questions fréquentes sur l'IMC",
      items: [
        {
          question: "Qu'est-ce que l'IMC ?",
          answer: "L'Indice de Masse Corporelle (IMC) est un calcul qui utilise votre taille et votre poids pour déterminer si votre poids est dans une fourchette saine."
        },
        {
          question: "Comment l'IMC est-il calculé ?",
          answer: "L'IMC est calculé en divisant votre poids en kilogrammes par le carré de votre taille en mètres (kg/m²)."
        },
        {
          question: "L'IMC est-il fiable pour tout le monde ?",
          answer: "L'IMC est un indicateur général qui ne tient pas compte de facteurs comme la masse musculaire, l'âge ou le sexe. Il doit être interprété avec d'autres mesures de santé."
        }
      ]
    },
    education: {
      title: "Comprendre votre IMC",
      sections: [
        {
          title: "Les catégories d'IMC",
          content: "Un IMC inférieur à 18.5 indique une insuffisance pondérale, entre 18.5 et 24.9 un poids normal, entre 25 et 29.9 un surpoids, et au-dessus de 30 une obésité."
        },
        {
          title: "Facteurs à considérer",
          content: "L'IMC ne distingue pas le muscle de la graisse et peut ne pas être adapté aux athlètes, personnes âgées ou femmes enceintes."
        }
      ]
    }
  },
  en: {
    language: "English",
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    bmiHistory: "BMI History",
    bmiPredictions: "BMI Predictions",
    disclaimer: "The information provided is for informational purposes only and does not substitute professional medical advice.",
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
    },
    faq: {
      title: "Frequently Asked Questions about BMI",
      items: [
        {
          question: "What is BMI?",
          answer: "Body Mass Index (BMI) is a calculation that uses your height and weight to determine if your weight is in a healthy range."
        },
        {
          question: "How is BMI calculated?",
          answer: "BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²)."
        },
        {
          question: "Is BMI reliable for everyone?",
          answer: "BMI is a general indicator that doesn't account for factors like muscle mass, age, or gender. It should be interpreted alongside other health measures."
        }
      ]
    },
    education: {
      title: "Understanding your BMI",
      sections: [
        {
          title: "BMI Categories",
          content: "A BMI below 18.5 indicates underweight, between 18.5 and 24.9 normal weight, between 25 and 29.9 overweight, and above 30 obesity."
        },
        {
          title: "Factors to Consider",
          content: "BMI doesn't distinguish between muscle and fat and may not be suitable for athletes, elderly people, or pregnant women."
        }
      ]
    }
  },
  zh: {
    language: "中文",
    title: "BMI计算器",
    subtitle: "计算您的身体质量指数",
    bmiHistory: "BMI历史记录",
    bmiPredictions: "BMI预测",
    disclaimer: "所提供的信息仅供参考，不能替代专业医疗建议。",
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
      goals: "健康目标"
    },
    placeholders: {
      age: "输入您的年龄",
      weight: "例如: 70",
      height: "例如: 175",
      goals: "例如: 减肥，增肌"
    },
    activities: {
      low: "低",
      moderate: "中等",
      high: "高"
    },
    buttons: {
      calculate: "计算BMI",
      analyze: "分析我的健康状况"
    },
    advice: {
      underweight: "您的体重低于推荐范围。考虑咨询医疗专业人士获取饮食建议。",
      normal: "您的体重在正常范围内。继续保持健康的生活方式！",
      overweight: "您超重了。医疗专业人士可以帮助您制定合适的计划。",
      obese: "您属于肥胖范围。咨询医疗专业人士获取个性化建议很重要。"
    },
    faq: {
      title: "关于BMI的常见问题",
      items: [
        {
          question: "什么是BMI？",
          answer: "身体质量指数（BMI）是一种使用身高和体重来确定体重是否在健康范围内的计算方法。"
        },
        {
          question: "如何计算BMI？",
          answer: "BMI是通过将体重（千克）除以身高（米）的平方来计算的（kg/m²）。"
        },
        {
          question: "BMI对每个人都可靠吗？",
          answer: "BMI是一个一般指标，它没有考虑肌肉质量、年龄或性别等因素。应该与其他健康指标一起解释。"
        }
      ]
    },
    education: {
      title: "了解您的BMI",
      sections: [
        {
          title: "BMI类别",
          content: "BMI低于18.5表示体重过轻，18.5至24.9表示体重正常，25至29.9表示超重，超过30表示肥胖。"
        },
        {
          title: "需要考虑的因素",
          content: "BMI不区分肌肉和脂肪，可能不适用于运动员、老年人或孕妇。"
        }
      ]
    }
  },
  es: {
    language: "Español",
    title: "Calculadora de IMC",
    subtitle: "Calcule su Índice de Masa Corporal",
    bmiHistory: "Historial de IMC",
    bmiPredictions: "Predicciones de IMC",
    disclaimer: "La información proporcionada es únicamente con fines informativos y no sustituye el asesoramiento médico profesional.",
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
      goals: "Objetivos de salud"
    },
    placeholders: {
      age: "Introduzca su edad",
      weight: "Ej: 70",
      height: "Ej: 175",
      goals: "Ej: Perder peso, Ganar músculo"
    },
    activities: {
      low: "Bajo",
      moderate: "Moderado",
      high: "Alto"
    },
    buttons: {
      calculate: "Calcular IMC",
      analyze: "Analizar mi salud"
    },
    advice: {
      underweight: "Está por debajo del peso recomendado. Considere consultar a un profesional de la salud para obtener consejos dietéticos.",
      normal: "Su peso está dentro del rango normal. ¡Mantenga un estilo de vida saludable!",
      overweight: "Tiene sobrepeso. Un profesional de la salud puede ayudarle a crear un programa adecuado.",
      obese: "Está en el rango de obesidad. Es importante consultar a un profesional de la salud para obtener consejos personalizados."
    },
    faq: {
      title: "Preguntas frecuentes sobre el IMC",
      items: [
        {
          question: "¿Qué es el IMC?",
          answer: "El Índice de Masa Corporal (IMC) es un cálculo que utiliza su altura y peso para determinar si su peso está en un rango saludable."
        },
        {
          question: "¿Cómo se calcula el IMC?",
          answer: "El IMC se calcula dividiendo su peso en kilogramos por su altura en metros al cuadrado (kg/m²)."
        },
        {
          question: "¿Es el IMC fiable para todos?",
          answer: "El IMC es un indicador general que no tiene en cuenta factores como la masa muscular, la edad o el género. Debe interpretarse junto con otras medidas de salud."
        }
      ]
    },
    education: {
      title: "Entendiendo su IMC",
      sections: [
        {
          title: "Categorías de IMC",
          content: "Un IMC inferior a 18,5 indica peso insuficiente, entre 18,5 y 24,9 peso normal, entre 25 y 29,9 sobrepeso, y por encima de 30 obesidad."
        },
        {
          title: "Factores a considerar",
          content: "El IMC no distingue entre músculo y grasa y puede no ser adecuado para atletas, personas mayores o mujeres embarazadas."
        }
      ]
    }
  },
  ar: {
    language: "العربية",
    title: "حاسبة مؤشر كتلة الجسم",
    subtitle: "احسب مؤشر كتلة الجسم الخاص بك",
    bmiHistory: "سجل مؤشر كتلة الجسم",
    bmiPredictions: "توقعات مؤشر كتلة الجسم",
    disclaimer: "المعلومات المقدمة هي لأغراض إعلامية فقط ولا تحل محل المشورة الطبية المهنية.",
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
      goals: "أهداف الصحة"
    },
    placeholders: {
      age: "أدخل عمرك",
      weight: "مثال: 70",
      height: "مثال: 175",
      goals: "مثال: فقدان الوزن، اكتساب العضلات"
    },
    activities: {
      low: "منخفض",
      moderate: "معتدل",
      high: "مرتفع"
    },
    buttons: {
      calculate: "احسب مؤشر كتلة الجسم",
      analyze: "حلل صحتي"
    },
    advice: {
      underweight: "أنت تحت الوزن الموصى به. فكر في استشارة متخصص رعاية صحية للحصول على نصائح غذائية.",
      normal: "وزنك ضمن النطاق الطبيعي. حافظ على نمط حياة صحي!",
      overweight: "لديك زيادة في الوزن. يمكن لمتخصص في الرعاية الصحية مساعدتك في إنشاء برنامج مناسب.",
      obese: "أنت ضمن نطاق السمنة. من المهم استشارة متخصص في الرعاية الصحية للحصول على نصائح شخصية."
    },
    faq: {
      title: "أسئلة متكررة حول مؤشر كتلة الجسم",
      items: [
        {
          question: "ما هو مؤشر كتلة الجسم؟",
          answer: "مؤشر كتلة الجسم (BMI) هو حساب يستخدم طولك ووزنك لتحديد ما إذا كان وزنك في نطاق صحي."
        },
        {
          question: "كيف يتم حساب مؤشر كتلة الجسم؟",
          answer: "يتم حساب مؤشر كتلة الجسم بقسمة وزنك بالكيلوغرام على مربع طولك بالمتر (كجم/م²)."
        },
        {
          question: "هل مؤشر كتلة الجسم موثوق به للجميع؟",
          answer: "مؤشر كتلة الجسم هو مؤشر عام لا يأخذ في الاعتبار عوامل مثل كتلة العضلات أو العمر أو الجنس. يجب تفسيره جنبًا إلى جنب مع مقاييس صحية أخرى."
        }
      ]
    },
    education: {
      title: "فهم مؤشر كتلة الجسم الخاص بك",
      sections: [
        {
          title: "فئات مؤشر كتلة الجسم",
          content: "يشير مؤشر كتلة الجسم أقل من 18.5 إلى نقص الوزن، وبين 18.5 و 24.9 وزن طبيعي، وبين 25 و 29.9 زيادة الوزن، وأكثر من 30 سمنة."
        },
        {
          title: "عوامل يجب مراعاتها",
          content: "لا يميز مؤشر كتلة الجسم بين العضلات والدهون وقد لا يكون مناسبًا للرياضيين أو كبار السن أو النساء الحوامل."
        }
      ]
    }
  },
  hi: {
    language: "हिन्दी",
    title: "बीएमआई कैलकुलेटर",
    subtitle: "अपना बॉडी मास इंडेक्स गणना करें",
    bmiHistory: "बीएमआई इतिहास",
    bmiPredictions: "बीएमआई भविष्यवाणियां",
    disclaimer: "प्रदान की गई जानकारी केवल सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
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
      goals: "स्वास्थ्य लक्ष्य"
    },
    placeholders: {
      age: "अपनी उम्र दर्ज करें",
      weight: "उदा: 70",
      height: "उदा: 175",
      goals: "उदा: वजन कम करना, मांसपेशी हासिल करना"
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
      underweight: "आप अनुशंसित वजन से कम हैं। आहार संबंधी सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करने पर विचार करें।",
      normal: "आपका वजन सामान्य सीमा के भीतर है। स्वस्थ जीवनशैली बनाए रखें!",
      overweight: "आपका वजन अधिक है। एक स्वास्थ्य पेशेवर आपको एक उपयुक्त कार्यक्रम बनाने में मदद कर सकता है।",
      obese: "आप मोटापे की श्रेणी में हैं। व्यक्तिगत सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करना महत्वपूर्ण है।"
    },
    faq: {
      title: "बीएमआई के बारे में अक्सर पूछे जाने वाले प्रश्न",
      items: [
        {
          question: "बीएमआई क्या है?",
          answer: "बॉडी मास इंडेक्स (बीएमआई) एक गणना है जो यह निर्धारित करने के लिए आपकी ऊंचाई और वजन का उपयोग करती है कि क्या आपका वजन स्वस्थ सीमा में है।"
        },
        {
          question: "बीएमआई की गणना कैसे की जाती है?",
          answer: "बीएमआई की गणना आपके वजन (किलोग्राम में) को आपकी ऊंचाई के वर्ग (मीटर में) से विभाजित करके की जाती है (किग्रा/मी²)।"
        },
        {
          question: "क्या बीएमआई हर किसी के लिए विश्वसनीय है?",
          answer: "बीएमआई एक सामान्य संकेतक है जो मांसपेशी द्रव्यमान, उम्र या लिंग जैसे कारकों को ध्यान में नहीं रखता है। इसकी व्याख्या अन्य स्वास्थ्य उपायों के साथ की जानी चाहिए।"
        }
      ]
    },
    education: {
      title: "अपने बीएमआई को समझना",
      sections: [
        {
          title: "बीएमआई श्रेणियां",
          content: "18.5 से कम बीएमआई कम वजन, 18.5 और 24.9 के बीच सामान्य वजन, 25 और 29.9 के बीच अधिक वजन, और 30 से ऊपर मोटापा दर्शाता है।"
        },
        {
          title: "विचार करने योग्य कारक",
          content: "बीएमआई मांसपेशी और वसा के बीच अंतर नहीं करता है और एथलीटों, बुजुर्गों या गर्भवती महिलाओं के लिए उपयुक्त नहीं हो सकता है।"
        }
      ]
    }
  },
  pt: {
    language: "Português",
    title: "Calculadora de IMC",
    subtitle: "Calcule seu Índice de Massa Corporal",
    bmiHistory: "Histórico de IMC",
    bmiPredictions: "Previsões de IMC",
    disclaimer: "As informações fornecidas são apenas para fins informativos e não substituem orientação médica profissional.",
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
      goals: "Objetivos de saúde"
    },
    placeholders: {
      age: "Digite sua idade",
      weight: "Ex: 70",
      height: "Ex: 175",
      goals: "Ex: Perder peso, Ganhar músculo"
    },
    activities: {
      low: "Baixo",
      moderate: "Moderado",
      high: "Alto"
    },
    buttons: {
      calculate: "Calcular IMC",
      analyze: "Analisar minha saúde"
    },
    advice: {
      underweight: "Você está abaixo do peso recomendado. Considere consultar um profissional de saúde para obter conselhos dietéticos.",
      normal: "Seu peso está dentro da faixa normal. Continue mantendo um estilo de vida saudável!",
      overweight: "Você está com sobrepeso. Um profissional de saúde pode ajudá-lo a criar um programa adequado.",
      obese: "Você está na faixa de obesidade. É importante consultar um profissional de saúde para obter conselhos personalizados."
    },
    faq: {
      title: "Perguntas frequentes sobre o IMC",
      items: [
        {
          question: "O que é o IMC?",
          answer: "O Índice de Massa Corporal (IMC) é um cálculo que usa sua altura e peso para determinar se seu peso está em uma faixa saudável."
        },
        {
          question: "Como o IMC é calculado?",
          answer: "O IMC é calculado dividindo seu peso em quilogramas pela sua altura em metros ao quadrado (kg/m²)."
        },
        {
          question: "O IMC é confiável para todos?",
          answer: "O IMC é um indicador geral que não leva em conta fatores como massa muscular, idade ou gênero. Deve ser interpretado junto com outras medidas de saúde."
        }
      ]
    },
    education: {
      title: "Entendendo seu IMC",
      sections: [
        {
          title: "Categorias de IMC",
          content: "Um IMC abaixo de 18,5 indica abaixo do peso, entre 18,5 e 24,9 peso normal, entre 25 e 29,9 sobrepeso, e acima de 30 obesidade."
        },
        {
          title: "Fatores a considerar",
          content: "O IMC não distingue entre músculo e gordura e pode não ser adequado para atletas, idosos ou mulheres grávidas."
        }
      ]
    }
  },
  bn: {
    language: "বাংলা",
    title: "বিএমআই ক্যালকুলেটর",
    subtitle: "আপনার বডি মাস ইনডেক্স গণনা করুন",
    bmiHistory: "বিএমআই ইতিহাস",
    bmiPredictions: "বিএমআই পূর্বাভাস",
    disclaimer: "প্রদত্ত তথ্য শুধুমাত্র তথ্যমূলক উদ্দেশ্যে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।",
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
      goals: "স্বাস্থ্য লক্ষ্য"
    },
    placeholders: {
      age: "আপনার বয়স লিখুন",
      weight: "উদাঃ 70",
      height: "উদাঃ 175",
      goals: "উদাঃ ওজন কমানো, পেশী বাড়ানো"
    },
    activities: {
      low: "কম",
      moderate: "মাঝারি",
      high: "উচ্চ"
    },
    buttons: {
      calculate: "বিএমআই গণনা করুন",
      analyze: "আমার স্বাস্থ্য বিশ্লেষণ করুন"
    },
    advice: {
      underweight: "আপনি সুপারিশকৃত ওজনের নিচে আছেন। খাদ্য সম্পর্কিত পরামর্শের জন্য একজন স্বাস্থ্য পেশাদারের সাথে পরামর্শ করুন।",
      normal: "আপনার ওজন স্বাভাবিক সীমার মধ্যে আছে। স্বাস্থ্যকর জীবনযাপন বজায় রাখুন!",
      overweight: "আপনার অতিরিক্ত ওজন আছে। একজন স্বাস্থ্য পেশাদার আপনাকে একটি উপযুক্ত প্রোগ্রাম তৈরি করতে সাহায্য করতে পারেন।",
      obese: "আপনি স্থূলতার সীমার মধ্যে আছেন। ব্যক্তিগতকৃত পরামর্শের জন্য একজন স্বাস্থ্য পেশাদারের সাথে পরামর্শ করা গুরুত্বপূর্ণ।"
    },
    faq: {
      title: "বিএমআই সম্পর্কে প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",
      items: [
        {
          question: "বিএমআই কি?",
          answer: "বডি মাস ইনডেক্স (বিএমআই) হল একটি গণনা যা আপনার ওজন স্বাস্থ্যকর সীমার মধ্যে আছে কিনা তা নির্ধারণ করতে আপনার উচ্চতা ও ওজন ব্যবহার করে।"
        },
        {
          question: "বিএমআই কিভাবে গণনা করা হয়?",
          answer: "বিএমআই গণনা করা হয় আপনার ওজন (কিলোগ্রামে) কে আপনার উচ্চতার বর্গ (মিটারে) দিয়ে ভাগ করে (কেজি/মি²)।"
        },
        {
          question: "বিএমআই কি সবার জন্য নির্ভরযোগ্য?",
          answer: "বিএমআই একটি সাধারণ সূচক যা পেশী ভর, বয়স বা লিঙ্গ এর মতো বিষয়গুলি বিবেচনায় নেয় না। এটি অন্যান্য স্বাস্থ্য পরিমাপের সাথে ব্যাখ্যা করা উচিত।"
        }
      ]
    },
    education: {
      title: "আপনার বিএমআই বোঝা",
      sections: [
        {
          title: "বিএমআই বিভাগ",
          content: "একটি বিএমআই 18.5 এর নিচে কম ওজন, 18.5 থেকে 24.9 স্বাভাবিক ওজন, 25 থেকে 29.9 অতিরিক্ত ওজন, এবং 30 এর উপরে স্থূলতা নির্দেশ করে।"
        },
        {
          title: "বিবেচনা করার বিষয়",
          content: "বিএমআই পেশী এবং চর্বির মধ্যে পার্থক্য করে না এবং এথলেট, বয়স্ক ব্যক্তি বা গর্ভবতী মহিলাদের জন্য উপযুক্ত নাও হতে পারে।"
        }
      ]
    }
  },
  ru: {
    language: "Русский",
    title: "Калькулятор ИМТ",
    subtitle: "Рассчитайте свой Индекс Массы Тела",
    bmiHistory: "История ИМТ",
    bmiPredictions: "Прогнозы ИМТ",
    disclaimer: "Предоставленная информация предназначена только для информационных целей и не заменяет профессиональную медицинскую консультацию.",
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
      goals: "Цели здоровья"
    },
    placeholders: {
      age: "Введите свой возраст",
      weight: "Пример: 70",
      height: "Пример: 175",
      goals: "Пример: Похудеть, Набрать мышечную массу"
    },
    activities: {
      low: "Низкий",
      moderate: "Умеренный",
      high: "Высокий"
    },
    buttons: {
      calculate: "Рассчитать ИМТ",
      analyze: "Анализировать моё здоровье"
    },
    advice: {
      underweight: "Ваш вес ниже рекомендуемого. Рассмотрите возможность консультации с медицинским работником для получения диетических советов.",
      normal: "Ваш вес находится в пределах нормы. Продолжайте поддерживать здоровый образ жизни!",
      overweight: "У вас избыточный вес. Медицинский работник может помочь вам создать подходящую программу.",
      obese: "Вы находитесь в диапазоне ожирения. Важно проконсультироваться с медицинским работником для получения персонализированных советов."
    },
    faq: {
      title: "Часто задаваемые вопросы о ИМТ",
      items: [
        {
          question: "Что такое ИМТ?",
          answer: "Индекс Массы Тела (ИМТ) - это расчет, который использует ваш рост и вес, чтобы определить, находится ли ваш вес в здоровом диапазоне."
        },
        {
          question: "Как рассчитывается ИМТ?",
          answer: "ИМТ рассчитывается путем деления вашего веса в килограммах на квадрат вашего роста в метрах (кг/м²)."
        },
        {
          question: "Надежен ли ИМТ для всех?",
          answer: "ИМТ является общим показателем, который не учитывает такие факторы, как мышечная масса, возраст или пол. Его следует интерпретировать вместе с другими показателями здоровья."
        }
      ]
    },
    education: {
      title: "Понимание вашего ИМТ",
      sections: [
        {
          title: "Категории ИМТ",
          content: "ИМТ ниже 18,5 указывает на недостаточный вес, между 18,5 и 24,9 - нормальный вес, между 25 и 29,9 - избыточный вес, и выше 30 - ожирение."
        },
        {
          title: "Факторы для рассмотрения",
          content: "ИМТ не различает мышцы и жир и может не подходить для спортсменов, пожилых людей или беременных женщин."
        }
      ]
    }
  },
  ja: {
    language: "日本語",
    title: "BMI計算機",
    subtitle: "あなたの体格指数を計算する",
    bmiHistory: "BMI履歴",
    bmiPredictions: "BMI予測",
    disclaimer: "提供される情報は情報提供のみを目的としており、専門医療アドバイスに代わるものではありません。",
    categories: {
      underweight: "低体重",
      normal: "普通体重",
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
      goals: "健康目標"
    },
    placeholders: {
      age: "あなたの年齢を入力してください",
      weight: "例：70",
      height: "例：175",
      goals: "例：減量、筋肉増強"
    },
    activities: {
      low: "低い",
      moderate: "中程度",
      high: "高い"
    },
    buttons: {
      calculate: "BMIを計算する",
      analyze: "私の健康を分析する"
    },
    advice: {
      underweight: "あなたは推奨体重を下回っています。食事のアドバイスについて医療専門家に相談することを検討してください。",
      normal: "あなたの体重は正常範囲内です。健康的なライフスタイルを維持してください！",
      overweight: "あなたは過体重です。医療専門家があなたに適したプログラムを作成するのを助けることができます。",
      obese: "あなたは肥満範囲内です。パーソナライズされたアドバイスを得るために医療専門家に相談することが重要です。"
    },
    faq: {
      title: "BMIについてよくある質問",
      items: [
        {
          question: "BMIとは何ですか？",
          answer: "ボディマスインデックス（BMI）は、あなたの体重が健康的な範囲内にあるかどうかを判断するためにあなたの身長と体重を使用する計算です。"
        },
        {
          question: "BMIはどのように計算されますか？",
          answer: "BMIはあなたの体重（キログラム）をあなたの身長（メートル）の二乗で割ることによって計算されます（kg/m²）。"
        },
        {
          question: "BMIは全員に信頼できますか？",
          answer: "BMIは筋肉量、年齢、性別などの要素を考慮しない一般的な指標です。他の健康指標と一緒に解釈されるべきです。"
        }
      ]
    },
    education: {
      title: "あなたのBMIを理解する",
      sections: [
        {
          title: "BMIカテゴリー",
          content: "BMIが18.5未満は低体重、18.5から24.9は普通体重、25から29.9は過体重、30以上は肥満を示します。"
        },
        {
          title: "考慮すべき要素",
          content: "BMIは筋肉と脂肪を区別せず、アスリート、高齢者、妊婦には適さない場合があります。"
        }
      ]
    }
  }
};
