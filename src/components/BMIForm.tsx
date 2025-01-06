import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Weight, Ruler, Calculator } from "lucide-react";

interface BMIFormProps {
  onCalculate: (weight: number, height: number, age: number) => void;
}

const BMIForm = ({ onCalculate }: BMIFormProps) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="weight" className="flex items-center gap-2 text-gray-700">
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
          className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4facfe] focus:ring-1 focus:ring-[#4facfe]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="flex items-center gap-2 text-gray-700">
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
          className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4facfe] focus:ring-1 focus:ring-[#4facfe]"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#4facfe] hover:bg-[#00f2fe] transition-colors"
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calculer l'IMC
      </Button>
    </form>
  );
};

export default BMIForm;