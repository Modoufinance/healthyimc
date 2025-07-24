import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale, Download, Mail, Bookmark, History, CheckCircle } from "lucide-react";
import BMIForm from "./BMIForm";
import BMIResult from "./BMIResult";
import BMIScale from "./BMIScale";
import BMIChart from "./BMIChart";
import BMIPredictions from "./BMIPredictions";
import UserDataForm from "./UserDataForm";
import DeviceConnect from "./DeviceConnect";
import { getPersonalizedAdvice, predictBMITrend } from "@/services/aiService";
import BMIEducation from "./BMIEducation";
import EnhancedFAQ from "./EnhancedFAQ";
import VoiceSearch from "./VoiceSearch";

export interface BMIData {
  bmi: number;
  category: string;
  advice: string;
  date?: string;
}

const BMICalculator = () => {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [predictions, setPredictions] = useState(null);
  const [savedResults, setSavedResults] = useState<BMIData[]>([]);
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userBmiData');
    return savedData ? JSON.parse(savedData) : {
      age: null,
      gender: "",
      activityLevel: "",
      targetBMI: null
    };
  });
  
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (userData.age || userData.gender || userData.activityLevel) {
      localStorage.setItem('userBmiData', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const saved = localStorage.getItem('savedBmiResults');
    if (saved) {
      setSavedResults(JSON.parse(saved));
    }
  }, []);

  const handleBMICalculation = (weight: number, height: number, age: number) => {
    const heightInMeters = height / 100;
    const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
    
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = t.categories.underweight;
      advice = "Vous êtes en dessous du poids recommandé. Pensez à consulter un professionnel de santé pour des conseils alimentaires.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = t.categories.normal;
      advice = "Votre poids est dans la plage normale. Continuez à maintenir un mode de vie sain !";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = t.categories.overweight;
      advice = "Vous êtes en surpoids. Un professionnel de santé peut vous aider à établir un programme adapté.";
    } else {
      category = t.categories.obese;
      advice = "Vous êtes en obésité. Il est important de consulter un professionnel de santé pour des conseils personnalisés.";
    }

    const bmiDataObj = { bmi, category, advice };
    
    if (userData.gender && userData.activityLevel) {
      const personalizedAdvice = getPersonalizedAdvice(bmiDataObj, {
        ...userData,
        age,
        weight,
        height
      });
      bmiDataObj.advice = personalizedAdvice;
    }

    setBmiData(bmiDataObj);

    if (userData.targetBMI) {
      const newPredictions = predictBMITrend(bmi, userData.targetBMI, 12);
      setPredictions(newPredictions);
    }

    const newSavedResults = [...savedResults, { ...bmiDataObj, date: new Date().toISOString() }];
    setSavedResults(newSavedResults);
    localStorage.setItem('savedBmiResults', JSON.stringify(newSavedResults));

    toast({
      title: "Calcul effectué",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Votre IMC a été calculé avec succès</span>
        </div>
      ),
    });
  };

  const handleUserDataSubmit = (data: any) => {
    setUserData(data);
    localStorage.setItem('userBmiData', JSON.stringify(data));
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  const handleDeviceData = (weight?: number, height?: number) => {
    if (weight && height) {
      handleBMICalculation(weight, height, userData.age);
    }
  };

  const exportToPDF = async () => {
    if (!bmiData) return;
    
    const pdfContent = `
      IMC: ${bmiData.bmi}
      Catégorie: ${bmiData.category}
      Conseils: ${bmiData.advice}
      Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IMC-Rapport-${new Date().toLocaleDateString()}.pdf`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: "Votre rapport a été téléchargé au format PDF",
    });
  };

  const sendByEmail = () => {
    if (!bmiData) return;
    
    const mailtoLink = `mailto:?subject=Mon rapport IMC&body=Voici mes résultats IMC:%0D%0A
    IMC: ${bmiData.bmi}%0D%0A
    Catégorie: ${bmiData.category}%0D%0A
    Conseils: ${bmiData.advice}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Email préparé",
      description: "Votre client mail va s'ouvrir avec le rapport",
    });
  };
  
  // Liste de questions fréquentes pour l'IMC
  const bmiRelatedFAQs = [
    {
      question: "Comment calculer son IMC?",
      answer: "L'IMC se calcule en divisant votre poids (en kg) par le carré de votre taille (en mètres). La formule exacte est: IMC = Poids(kg) / Taille²(m). Notre calculateur fait ce calcul automatiquement pour vous en quelques secondes.",
      keywords: ["calcul", "formule", "imc", "poids", "taille"]
    },
    {
      question: "Quel est l'IMC idéal?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal selon l'Organisation Mondiale de la Santé. Cependant, l'IMC idéal peut varier selon l'âge, le sexe, la masse musculaire et d'autres facteurs individuels.",
      keywords: ["idéal", "normal", "recommandé", "sain", "poids santé"]
    },
    {
      question: "L'IMC est-il fiable pour tout le monde?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, l'âge, le sexe ou la répartition des graisses. Par exemple, les sportifs peuvent avoir un IMC élevé en raison de leur masse musculaire. Il doit être interprété par un professionnel de santé et complété par d'autres mesures.",
      keywords: ["fiabilité", "limites", "précision", "sportif", "muscle"]
    },
    {
      question: "À quelle fréquence dois-je calculer mon IMC?",
      answer: "Pour un suivi régulier de votre santé, il est recommandé de calculer votre IMC tous les 3 à 6 mois. En cas de programme de perte ou de prise de poids, un calcul mensuel peut être utile pour suivre vos progrès.",
      keywords: ["fréquence", "suivi", "régularité", "mesure", "progression"]
    },
    {
      question: "Comment interpréter correctement mon résultat d'IMC?",
      answer: "L'interprétation de l'IMC doit prendre en compte votre profil personnel (âge, sexe, niveau d'activité physique, masse musculaire, etc.). Un IMC inférieur à 18,5 indique une insuffisance pondérale, entre 18,5 et 24,9 un poids normal, entre 25 et 29,9 un surpoids, et au-dessus de 30 une obésité. Notre calculateur fournit une première analyse, mais consultez un professionnel de santé pour une interprétation personnalisée complète.",
      keywords: ["interprétation", "analyse", "catégorie", "obésité", "maigreur"]
    },
    {
      question: "L'IMC est-il adapté aux enfants?",
      answer: "L'IMC des enfants et adolescents est évalué différemment en utilisant des courbes de croissance spécifiques à l'âge et au sexe. Les seuils standards pour adultes ne s'appliquent pas aux enfants en croissance. Notre calculateur propose une section dédiée aux enfants qui utilise ces courbes spécifiques.",
      keywords: ["enfant", "adolescent", "croissance", "pédiatrie", "courbe"]
    },
    {
      question: "Comment l'IMC est-il lié aux risques pour la santé?",
      answer: "Un IMC trop bas ou trop élevé est associé à divers risques pour la santé. Un IMC inférieur à 18,5 peut indiquer une malnutrition ou d'autres problèmes de santé. Un IMC supérieur à 25 augmente progressivement le risque de maladies cardiovasculaires, diabète de type 2, problèmes articulaires, apnée du sommeil et certains cancers.",
      keywords: ["risque", "santé", "maladie", "cardiovasculaire", "diabète"]
    },
    {
      question: "Comment réduire mon IMC de façon saine?",
      answer: "Pour réduire votre IMC de manière saine, adoptez une alimentation équilibrée riche en fruits, légumes, protéines maigres et grains entiers, tout en limitant les aliments transformés, sucrés et gras. Pratiquez une activité physique régulière (150 minutes par semaine minimum). Visez une perte de poids progressive de 0,5 à 1 kg par semaine. Consultez un médecin ou un nutritionniste pour un programme personnalisé.",
      keywords: ["réduire", "perte de poids", "régime", "exercice", "nutrition"]
    }
  ];

  // Fonction de recherche pour l'IMC
  const handleBMISearch = (query: string) => {
    toast({
      title: "Recherche vocale effectuée",
      description: `Recherche: "${query}" - Consultez les résultats dans la FAQ ci-dessous`,
    });
    
    // La recherche sera gérée par le composant EnhancedFAQ
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg rounded-lg">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Scale className="h-8 w-8 text-[#4facfe]" aria-hidden="true" />
                <h1 className="text-2xl font-bold tracking-tight text-[#4facfe]">
                  {t.title}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.subtitle}
              </p>
            </div>

            <div className="my-4">
              <VoiceSearch onSearch={handleBMISearch} placeholder="Posez une question sur l'IMC..." />
            </div>

            <DeviceConnect onDataReceived={handleDeviceData} />
            <BMIForm onCalculate={handleBMICalculation} savedData={userData} />

            {bmiData && (
              <div className="animate-slide-up mt-6 space-y-4">
                <BMIResult bmiData={bmiData} />
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm hover:bg-gray-50 transition-colors"
                    aria-label="Exporter en PDF"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Exporter en PDF
                  </button>
                  
                  <button
                    onClick={sendByEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm hover:bg-gray-50 transition-colors"
                    aria-label="Envoyer par email"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Envoyer par email
                  </button>
                  
                  <button
                    onClick={() => {
                      localStorage.setItem('bookmarkedResult', JSON.stringify(bmiData));
                      toast({
                        title: "Résultat sauvegardé",
                        description: "Vous pourrez retrouver ce résultat plus tard",
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm hover:bg-gray-50 transition-colors"
                    aria-label="Sauvegarder ce résultat"
                  >
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </Card>

          <UserDataForm 
            onSubmit={handleUserDataSubmit} 
            age={userData.age}
            gender={userData.gender}
            activityLevel={userData.activityLevel}
            targetBMI={userData.targetBMI}
          />
        </div>

        {bmiData && (
          <div className="animate-slide-up space-y-6">
            <BMIScale bmi={bmiData.bmi} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BMIChart bmi={bmiData.bmi} />
              {predictions && <BMIPredictions predictions={predictions} currentBMI={bmiData.bmi} />}
            </div>
          </div>
        )}

        {savedResults.length > 0 && (
          <Card className="p-6 shadow-lg rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-6 w-6 text-[#4facfe]" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Historique des calculs</h2>
            </div>
            <div className="space-y-2">
              {savedResults.slice(-5).map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">IMC: {result.bmi}</span>
                    <span className="text-sm text-gray-600 ml-4">{result.category}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(result.date!).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <EnhancedFAQ 
          title="Questions fréquentes sur l'IMC" 
          description="Trouvez les réponses aux questions les plus courantes sur l'Indice de Masse Corporelle"
          faqItems={bmiRelatedFAQs}
          className="bg-white/10"
        />

        <BMIEducation />
      </div>
    </div>
  );
};

export default BMICalculator;
