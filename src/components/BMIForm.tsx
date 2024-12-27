import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface BMIFormProps {
  onCalculate: (weight: number, height: number) => void;
}

const BMIForm = ({ onCalculate }: BMIFormProps) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || heightNum <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des valeurs valides.",
        variant: "destructive",
      });
      return;
    }

    // Convert to metric units if needed
    const weightInKg = t.units.weight.unit === 'lb' ? weightNum / t.units.weight.factor : weightNum;
    const heightInCm = t.units.height.unit === 'in' ? heightNum / t.units.height.factor : heightNum;

    onCalculate(weightInKg, heightInCm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="weight">Poids ({t.units.weight.unit})</Label>
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
        <Label htmlFor="height">Taille ({t.units.height.unit})</Label>
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
        Calculer l'IMC
      </Button>
    </form>
  );
};

export default BMIForm;