import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour! Je suis votre assistant santé IA. Comment puis-je vous aider aujourd'hui?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response - In a real app, this would call your AI service
      setTimeout(() => {
        const aiResponse = {
          role: "assistant" as const,
          content: "Je comprends votre préoccupation. Bien que je puisse fournir des informations générales sur la santé, il est important de consulter un professionnel de santé pour des conseils médicaux spécifiques."
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de recevoir une réponse de l'assistant.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle>Assistant Santé IA</CardTitle>
          <CardDescription>
            Posez vos questions sur la santé et le bien-être. Notez que cet assistant ne remplace pas l'avis d'un professionnel de santé.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-secondary"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Tapez votre message ici..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIHealthAssistant;