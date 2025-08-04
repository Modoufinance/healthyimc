import { TranslationType } from './types';
import { navigationTranslations } from './navigationTranslations';

const heroTranslations = {
  fr: {
    title: "Calculez votre IMC gratuitement en moins d'une minute",
    subtitle: "Rejoignez plus de 50 000 personnes qui ont déjà calculé leur indice de masse corporelle",
    ctaButton: "Calculer mon IMC maintenant",
    resultTime: "Résultat en 30 secondes",
    newFitnessProgram: "Nouveau ! Découvrez notre programme fitness basé sur l'IA"
  },
  en: {
    title: "Calculate your BMI for free in less than a minute",
    subtitle: "Join over 50,000 people who have already calculated their body mass index",
    ctaButton: "Calculate my BMI now",
    resultTime: "Result in 30 seconds",
    newFitnessProgram: "New! Discover our AI-powered fitness program"
  },
  zh: {
    title: "免费在一分钟内计算您的BMI",
    subtitle: "加入超过50,000人已经计算过他们的身体质量指数",
    ctaButton: "立即计算我的BMI",
    resultTime: "30秒内出结果",
    newFitnessProgram: "新功能！发现我们的AI健身程序"
  },
  es: {
    title: "Calcula tu IMC gratis en menos de un minuto",
    subtitle: "Únete a más de 50,000 personas que ya han calculado su índice de masa corporal",
    ctaButton: "Calcular mi IMC ahora",
    resultTime: "Resultado en 30 segundos",
    newFitnessProgram: "¡Nuevo! Descubre nuestro programa fitness con IA"
  },
  ar: {
    title: "احسب مؤشر كتلة الجسم مجاناً في أقل من دقيقة",
    subtitle: "انضم إلى أكثر من 50,000 شخص قاموا بحساب مؤشر كتلة الجسم",
    ctaButton: "احسب مؤشر كتلة الجسم الآن",
    resultTime: "النتيجة في 30 ثانية",
    newFitnessProgram: "جديد! اكتشف برنامج اللياقة بالذكاء الاصطناعي"
  },
  hi: {
    title: "एक मिनट से कम में मुफ्त में अपना BMI गणना करें",
    subtitle: "50,000 से अधिक लोगों से जुड़ें जिन्होंने पहले ही अपना बॉडी मास इंडेक्स गणना किया है",
    ctaButton: "अब मेरा BMI गणना करें",
    resultTime: "30 सेकंड में परिणाम",
    newFitnessProgram: "नया! हमारे AI फिटनेस प्रोग्राम की खोज करें"
  },
  pt: {
    title: "Calcule seu IMC gratuitamente em menos de um minuto",
    subtitle: "Junte-se a mais de 50.000 pessoas que já calcularam seu índice de massa corporal",
    ctaButton: "Calcular meu IMC agora",
    resultTime: "Resultado em 30 segundos",
    newFitnessProgram: "Novo! Descubra nosso programa fitness com IA"
  },
  bn: {
    title: "এক মিনিটেরও কম সময়ে বিনামূল্যে আপনার BMI গণনা করুন",
    subtitle: "50,000+ মানুষের সাথে যোগ দিন যারা ইতিমধ্যে তাদের বডি ম্যাস ইন্ডেক্স গণনা করেছেন",
    ctaButton: "এখনই আমার BMI গণনা করুন",
    resultTime: "৩০ সেকেন্ডে ফলাফল",
    newFitnessProgram: "নতুন! আমাদের AI ফিটনেস প্রোগ্রাম আবিষ্কার করুন"
  },
  ru: {
    title: "Рассчитайте свой ИМТ бесплатно менее чем за минуту",
    subtitle: "Присоединяйтесь к более чем 50,000 человек, которые уже рассчитали свой индекс массы тела",
    ctaButton: "Рассчитать мой ИМТ сейчас",
    resultTime: "Результат за 30 секунд",
    newFitnessProgram: "Новое! Откройте нашу фитнес-программу с ИИ"
  },
  ja: {
    title: "1分以内に無料でBMIを計算",
    subtitle: "すでにボディマス指数を計算した50,000人以上の人々に参加しよう",
    ctaButton: "今すぐBMIを計算",
    resultTime: "30秒で結果",
    newFitnessProgram: "新しい！AIパワードフィットネスプログラムを発見"
  }
};

const breadcrumbTranslations = {
  fr: { home: "Accueil" },
  en: { home: "Home" },
  zh: { home: "首页" },
  es: { home: "Inicio" },
  ar: { home: "الرئيسية" },
  hi: { home: "होम" },
  pt: { home: "Início" },
  bn: { home: "হোম" },
  ru: { home: "Главная" },
  ja: { home: "ホーム" }
};

export function getCompleteTranslations(baseTranslations: Record<string, Partial<TranslationType>>): Record<string, TranslationType> {
  const result: Record<string, TranslationType> = {};
  
  Object.keys(baseTranslations).forEach(lang => {
    result[lang] = {
      ...baseTranslations[lang],
      navigation: navigationTranslations[lang],
      hero: heroTranslations[lang as keyof typeof heroTranslations],
      breadcrumbs: breadcrumbTranslations[lang as keyof typeof breadcrumbTranslations]
    } as TranslationType;
  });
  
  return result;
}