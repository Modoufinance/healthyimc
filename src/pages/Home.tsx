import MainMenu from "@/components/MainMenu";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-bg flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          {t.title}
        </h1>
        <p className="text-xl text-white/90">
          {t.subtitle}
        </p>
        <MainMenu />
      </div>
    </div>
  );
};

export default Home;