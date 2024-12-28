import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SavedChats = () => {
  const { t } = useLanguage();
  
  // This would typically come from a backend/state management
  const savedConversations = [
    {
      id: 1,
      title: "Conseils nutritionnels",
      preview: "Discussion sur l'alimentation équilibrée et les apports caloriques",
      date: "2024-02-22"
    },
    {
      id: 2,
      title: "Programme d'exercices",
      preview: "Recommandations pour un programme d'entraînement personnalisé",
      date: "2024-02-21"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Conversations sauvegardées</h1>
      <div className="grid gap-4">
        {savedConversations.map((conversation) => (
          <Card key={conversation.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{conversation.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{conversation.preview}</p>
                <p className="text-xs text-muted-foreground mt-2">{conversation.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedChats;