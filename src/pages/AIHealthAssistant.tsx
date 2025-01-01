import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  user: "assistant" | "user";
  text: string;
}

const AIHealthAssistant = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "assistant",
      text: "Bonjour ! Je suis votre assistant santé IA. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const { toast } = useToast();

  const calculateBMI = (e: FormEvent) => {
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

    const bmi = (weightNum / (heightNum * heightNum)).toFixed(2);
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

    toast({
      title: `IMC: ${bmi} (${category})`,
      description: advice,
    });
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [
      ...messages,
      { user: "user" as const, text: userInput },
      {
        user: "assistant" as const,
        text: "Je suis désolé, je suis en cours de maintenance. Je ne peux pas répondre à votre question pour le moment.",
      },
    ];
    setMessages(newMessages);
    setUserInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-400 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center text-white">
          <h1 className="text-3xl font-bold">Calculatrice IMC et Assistant IA</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-bold text-blue-500 mb-6">Calculatrice IMC</h2>
            <form onSubmit={calculateBMI} className="space-y-4">
              <div>
                <Label htmlFor="weight">Poids (en kg):</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="height">Taille (en cm):</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Calculer l'IMC
              </Button>
            </form>
          </Card>

          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-bold text-blue-500 mb-4">Assistant IA en Santé</h2>
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    msg.user === "assistant"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800 ml-auto"
                  } max-w-[80%]`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Posez une question..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Envoyer</Button>
            </div>
          </Card>
        </div>

        <footer className="text-center text-white text-sm">
          <p>&copy; 2024 Calculatrice IMC et Assistant IA - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
};

export default AIHealthAssistant;