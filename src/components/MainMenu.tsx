import { Link } from "react-router-dom";
import { Calculator, MessageSquare, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "./ui/card";

const MainMenu = () => {
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-primary mb-4">{t.mainMenu}</h2>
      <div className="space-y-3">
        <Link
          to="/calculator"
          className="flex items-center gap-2 w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Calculator className="w-5 h-5" />
          <span>{t.title}</span>
        </Link>
        <Link
          to="/ai-assistant"
          className="flex items-center gap-2 w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{t.aiAssistant}</span>
        </Link>
        <Link
          to="/health-tips"
          className="flex items-center gap-2 w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>{t.healthTips}</span>
        </Link>
      </div>
    </Card>
  );
};

export default MainMenu;