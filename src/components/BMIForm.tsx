
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
  const { t } = useLanguage();

  // Removed automatic calculation effect

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum || heightNum <= 0 || ageNum <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des valeurs valides.",
        variant: "destructive",
      });
      return;
    }

    const weightInKg = t.units.weight.unit === 'lb' ? weightNum / t.units.weight.factor : weightNum;
    const heightInCm = t.units.height.unit === 'in' ? heightNum / t.units.height.factor : heightNum;

    onCalculate(weightInKg, heightInCm, ageNum);
    
    // Sauvegarder les valeurs dans le localStorage
    localStorage.setItem('lastBmiFormValues', JSON.stringify({ weight, height, age }));
  };

  // Charger les dernières valeurs au montage du composant
  useEffect(() => {
    const savedValues = localStorage.getItem('lastBmiFormValues');
    if (savedValues && !weight && !height && !age) {
      const { weight: w, height: h, age: a } = JSON.parse(savedValues);
      setWeight(w);
      setHeight(h);
      setAge(a);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="age" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Âge
        </Label>
        <Input
          id="age"
          type="number"
          placeholder="Ex: 30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="1"
          max="120"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="flex items-center gap-2">
          <Weight className="h-4 w-4" />
          Poids ({t.units.weight.unit})
        </Label>
        <Input
          id="weight"
          type="number"
          placeholder={`Ex: ${t.units.weight.unit === 'kg' ? '70' : '154'}`}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="flex items-center gap-2">
          <Ruler className="h-4 w-4" />
          Taille ({t.units.height.unit})
        </Label>
        <Input
          id="height"
          type="number"
          placeholder={`Ex: ${t.units.height.unit === 'cm' ? '175' : '69'}`}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-[#4facfe] hover:bg-[#00f2fe]">
        <Calculator className="mr-2 h-4 w-4" />
        Calculer l'IMC
      </Button>
    </form>
  );
};

export default BMIForm;
