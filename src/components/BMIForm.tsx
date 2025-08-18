
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Weight, Ruler, Calculator, Calendar } from "lucide-react";

interface BMIFormProps {
  onCalculate: (weight: number, height: number, age: number) => void;
  savedData?: {
    age?: number;
    weight?: number;
    height?: number;
  };
}

const BMIForm = ({ onCalculate, savedData }: BMIFormProps) => {
  const [weight, setWeight] = useState(savedData?.weight?.toString() || "");
  const [height, setHeight] = useState(savedData?.height?.toString() || "");
  const [age, setAge] = useState(savedData?.age?.toString() || "");
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Chargement des dernières valeurs au montage du composant
  useEffect(() => {
    const savedValues = localStorage.getItem('lastBmiFormValues');
    if (savedValues && !weight && !height && !age) {
      const { weight: w, height: h, age: a } = JSON.parse(savedValues);
      setWeight(w);
      setHeight(h);
      setAge(a);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum || heightNum <= 0 || ageNum <= 0) {
      toast({
        title: t.bmiForm.error,
        description: t.bmiForm.invalidValues,
        variant: "destructive",
      });
      return;
    }

    const weightInKg = t.units.weight.unit === 'kg' ? weightNum : weightNum / t.units.weight.factor;
    const heightInCm = t.units.height.unit === 'cm' ? heightNum : heightNum / t.units.height.factor * 100;

    onCalculate(weightInKg, heightInCm, ageNum);
    
    // Sauvegarder les valeurs dans le localStorage
    localStorage.setItem('lastBmiFormValues', JSON.stringify({ weight, height, age }));
  };

  // Direction du texte pour les langues RTL comme l'arabe
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4" dir={textDirection}>
      <div className="space-y-2">
        <Label htmlFor="age" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.labels.age}
        </Label>
        <Input
          id="age"
          type="number"
          placeholder={t.placeholders.age}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="1"
          max="120"
          className="border-blue-200 focus-visible:ring-blue-400"
          dir={textDirection}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="flex items-center gap-2">
          <Weight className="h-4 w-4" />
          {t.labels.weight} ({t.units.weight.unit})
        </Label>
        <Input
          id="weight"
          type="number"
          placeholder={t.placeholders.weight}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="border-blue-200 focus-visible:ring-blue-400"
          dir={textDirection}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="flex items-center gap-2">
          <Ruler className="h-4 w-4" />
          {t.labels.height} ({t.units.height.unit})
        </Label>
        <Input
          id="height"
          type="number"
          placeholder={t.placeholders.height}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          className="border-blue-200 focus-visible:ring-blue-400"
          dir={textDirection}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] hover:from-[#4facfe] hover:to-[#00d8e0] transition-all shadow-lg hover:shadow-xl"
      >
        <Calculator className="mr-2 h-5 w-5" />
        {t.buttons.calculate}
      </Button>
    </form>
  );
};

export default BMIForm;
