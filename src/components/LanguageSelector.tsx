
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { Language } from "@/i18n/types";
import { useNavigate } from "react-router-dom";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const languages: Record<Language, string> = {
    fr: "Français",
    en: "English",
    zh: "中文",
    es: "Español",
    ar: "العربية",
    hi: "हिन्दी",
    pt: "Português",
    bn: "বাংলা",
    ru: "Русский",
    ja: "日本語"
  };

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;
    
    setLanguage(lang);
    
    // La redirection est gérée par le LanguageContext
    // qui adapte l'URL en fonction de la langue sélectionnée
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10 relative">
          <Globe className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
        <DropdownMenuLabel>{t.language || "Langue"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={`${language === code ? "bg-accent" : ""} ${code === 'ar' ? "text-right" : ""}`}
          >
            <span>{name}</span>
            {language === code && (
              <span className="ml-2 text-blue-500">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
