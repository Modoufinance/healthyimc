import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale } from "lucide-react";
import BMIForm from "./BMIForm";
import BMIResult from "./BMIResult";
import BMIScale from "./BMIScale";
import BMIChart from "./BMIChart";
import BMIPredictions from "./BMIPredictions";
import UserDataForm from "./UserDataForm";
import DeviceConnect from "./DeviceConnect";
import SEO from "./SEO";
import { getPersonalizedAdvice, predictBMITrend } from "@/services/aiService";

export interface BMIData {
  bmi: number;
  category: string;
  advice: string;
}

const BMICalculator = () => {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [predictions, setPredictions] = useState(null);
  const [userData, setUserData] = useState({
    age: null,
    gender: "",
    activityLevel: "",
    targetBMI: null
  });
  
  const { toast } = useToast();
  const { t } = useLanguage();

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

    toast({
      title: "Calcul effectué",
      description: "Votre IMC a été calculé avec succès",
    });
  };

  const handleUserDataSubmit = (data: any) => {
    setUserData(data);
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

  return (
    <>
      <SEO 
        title="Calculatrice IMC Gratuite | Calcul IMC en Ligne | Indice de Masse Corporelle"
        description="Calculez gratuitement votre IMC (Indice de Masse Corporelle) selon votre âge, poids et taille. Tableau IMC homme et femme avec conseils personnalisés pour une meilleure santé. Outil validé par les professionnels de santé."
        keywords="imc, calcul imc, calculer son imc, imc calcul, calculatrice imc, imc femme, imc homme, calcul masse corporelle, indice masse corporelle, imc normal, calcul imc gratuit, imc santé, tableau imc femme, tableau imc homme, imc en bonne santé, calcul imc âge poids taille"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculateur IMC SantéIMC",
          "applicationCategory": "HealthApplication",
          "description": "Calculez votre Indice de Masse Corporelle (IMC) et obtenez des conseils personnalisés selon votre profil (homme/femme)",
          "keywords": "imc, calcul imc, imc femme, imc homme, calculatrice imc",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "audience": {
            "@type": "Audience",
            "geographicArea": {
              "@type": "Country",
              "name": "France"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="p-6 shadow-lg rounded-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Scale className="h-8 w-8 text-[#4facfe] animate-scale-in" />
                <h1 className="text-2xl font-bold tracking-tight text-[#4facfe]">
                  {t.title}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.subtitle}
              </p>
            </div>

            <DeviceConnect onDataReceived={handleDeviceData} />
            <BMIForm onCalculate={handleBMICalculation} />

            {bmiData && (
              <div className="animate-slide-up mt-6">
                <BMIResult bmiData={bmiData} />
              </div>
            )}
          </Card>

          <UserDataForm onSubmit={handleUserDataSubmit} />

          {bmiData && (
            <div className="animate-slide-up space-y-6">
              <BMIScale bmi={bmiData.bmi} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BMIChart bmi={bmiData.bmi} />
                {predictions && <BMIPredictions predictions={predictions} currentBMI={bmiData.bmi} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BMICalculator;