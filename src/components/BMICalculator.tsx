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

    setBmiData({ bmi, category, advice });
    toast({
      title: "Calcul effectué",
      description: "Votre IMC a été calculé avec succès",
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
        <Card className="w-full max-w-md mx-auto p-4 sm:p-6 space-y-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="space-y-2 text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#4facfe]">
              Calculatrice IMC
            </h1>
            <p className="text-sm text-muted-foreground">
              Calculez votre Indice de Masse Corporelle
            </p>
          </div>

          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Poids (en kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="text-base sm:text-sm"
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
                className="text-base sm:text-sm"
              />
            </div>

            <Button type="submit" className="w-full bg-[#4facfe] hover:bg-[#00f2fe]">
              Calculer l'IMC
            </Button>
          </form>

          {bmiData && (
            <div className="animate-slide-up">
              <BMIResult bmiData={bmiData} />
            </div>
          )}

          <div className="mt-4 text-sm">
            <a href="/health-allies" className="text-[#4facfe] hover:underline">
              Découvrez nos partenaires santé
            </a>
          </div>

          {/* Chatbot Section */}
          <Card className="mt-6 p-4 bg-gray-50">
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
        </Card>

        {bmiData && (
          <div className="animate-slide-up space-y-6">
            <BMIScale bmi={bmiData.bmi} />
            <BMIChart bmi={bmiData.bmi} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up">
          {[
            {
              icon: <Heart className="w-6 h-6 text-primary" />,
              title: t("healthAdvice"),
              description: t("healthAdvice"),
            },
            {
              icon: <Activity className="w-6 h-6 text-primary" />,
              title: t("activityTracking"),
              description: t("activityTracking"),
            },
            {
              icon: <Apple className="w-6 h-6 text-primary" />,
              title: t("nutrition"),
              description: t("nutrition"),
            },
            {
              icon: <Brain className="w-6 h-6 text-primary" />,
              title: t("mentalWellness"),
              description: t("mentalWellness"),
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-center">{item.title}</h3>
                <p className="text-sm text-center text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;