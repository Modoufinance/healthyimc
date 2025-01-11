import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bug } from "lucide-react";
import SEO from "@/components/SEO";

interface Message {
  user: "assistant" | "user";
  text: string;
}

const AIHealthAssistant = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Assistant IA en Santé | HealthyIMC",
    "applicationCategory": "HealthApplication",
    "description": "Assistant virtuel intelligent pour des conseils personnalisés en santé et bien-être",
    "url": "https://santeimc.fr/ai-health"
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      user: "assistant",
      text: "Bonjour ! Je suis votre assistant santé IA. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

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
    <>
      <SEO
        title="Assistant IA en Santé"
        description="Obtenez des conseils personnalisés en santé grâce à notre assistant virtuel intelligent. Une approche innovante pour votre bien-être."
        keywords="assistant ia santé, conseils santé ia, intelligence artificielle santé, santé personnalisée"
        canonicalUrl="https://santeimc.fr/ai-health"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-400 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="text-center text-white">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-bold">Assistant IA en Santé</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Bug className="w-3 h-3" />
                bêta
              </Badge>
            </div>
          </header>

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

          <footer className="text-center text-white text-sm">
            <p>&copy; 2024 Assistant IA en Santé - Tous droits réservés</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AIHealthAssistant;
