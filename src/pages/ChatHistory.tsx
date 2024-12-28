import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ChatHistory = () => {
  const { t } = useLanguage();
  
  // This would typically come from a backend/state management
  const mockHistory = [
    {
      date: "2024-02-22",
      messages: [
        { role: "user", content: "Comment puis-je améliorer mon IMC ?" },
        { role: "assistant", content: "Pour améliorer votre IMC, concentrez-vous sur une alimentation équilibrée et une activité physique régulière..." }
      ]
    },
    {
      date: "2024-02-21",
      messages: [
        { role: "user", content: "Quels sont les risques d'un IMC élevé ?" },
        { role: "assistant", content: "Un IMC élevé peut augmenter les risques de plusieurs conditions de santé..." }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historique des conversations</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {mockHistory.map((day, index) => (
          <Card key={index} className="mb-4 p-4">
            <h2 className="font-semibold mb-2">{day.date}</h2>
            {day.messages.map((message, msgIndex) => (
              <div
                key={msgIndex}
                className={`mb-2 p-2 rounded ${
                  message.role === "user"
                    ? "bg-primary/10 ml-auto max-w-[80%]"
                    : "bg-secondary/10 max-w-[80%]"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;