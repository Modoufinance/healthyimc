import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Scale, Activity, Heart, Brain, Apple, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BMIScale from "./BMIScale";
import BMIResult from "./BMIResult";
import BMIChart from "./BMIChart";
import BMIPredictions from "./BMIPredictions";
import UserDataForm from "./UserDataForm";
import { getPersonalizedAdvice, predictBMITrend } from "@/services/aiService";

export interface BMIData {
  bmi: number;
  category: string;
  advice: string;
}

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "Assistant", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [predictions, setPredictions] = useState(null);
  const [userData, setUserData] = useState({
    age: null,
    gender: "",
    activityLevel: "",
    targetBMI: null
  });
  
  const { toast } = useToast();
  const { t } = useLanguage();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des valeurs valides.",
        variant: "destructive",
      });
      return;
    }

    const bmi = Number((weightNum / (heightNum * heightNum)).toFixed(2));
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Insuffisance pondérale";
      advice = "Vous êtes en dessous du poids recommandé. Pensez à consulter un professionnel de santé pour des conseils alimentaires.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Poids normal";
      advice = "Votre poids est dans la plage normale. Continuez à maintenir un mode de vie sain !";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Surpoids";
      advice = "Vous êtes en surpoids. Un professionnel de santé peut vous aider à établir un programme adapté.";
    } else {
      category = "Obésité";
      advice = "Vous êtes en obésité. Il est important de consulter un professionnel de santé pour des conseils personnalisés.";
    }

    const bmiDataObj = { bmi, category, advice };
    
    // Get personalized advice if user data is available
    if (userData.age && userData.gender && userData.activityLevel) {
      const personalizedAdvice = getPersonalizedAdvice(bmiDataObj, {
        ...userData,
        weight: weightNum,
        height: heightNum
      });
      bmiDataObj.advice = personalizedAdvice;
    }

    setBmiData(bmiDataObj);

    // Generate predictions if target BMI is set
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

  const sendMessage = () => {
    if (!message.trim()) return;

    setChatMessages([
      ...chatMessages,
      { sender: "Vous", text: message },
      { sender: "Assistant", text: "Merci pour votre message ! Nous développons encore mes capacités." }
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 sm:p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#4facfe]">
                Calculatrice IMC
              </h1>
              <p className="text-sm text-muted-foreground">
                Calculez votre Indice de Masse Corporelle
              </p>
            </div>

            <form onSubmit={calculateBMI} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (en kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Taille (en cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#4facfe] hover:bg-[#00f2fe]">
                Calculer l'IMC
              </Button>
            </form>

            {bmiData && (
              <div className="animate-slide-up mt-4">
                <BMIResult bmiData={bmiData} />
              </div>
            )}
          </Card>

          <UserDataForm onSubmit={handleUserDataSubmit} />
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

        <Card className="p-4">
          <h2 className="font-bold text-[#4facfe] mb-3">Assistant Santé IA</h2>
          <div className="h-[150px] overflow-y-auto border border-gray-200 rounded-md p-3 bg-white mb-3">
            {chatMessages.map((msg, index) => (
              <p key={index} className="mb-2">
                <span className="font-semibold">{msg.sender} :</span> {msg.text}
              </p>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-[#4facfe] hover:bg-[#00f2fe]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;