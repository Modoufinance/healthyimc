
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserDataFormProps {
  onSubmit: (data: {
    age: number;
    gender: string;
    activityLevel: string;
    targetBMI: number;
  }) => void;
  age?: number;
  gender?: string;
  activityLevel?: string;
  targetBMI?: number;
}

const UserDataForm = ({ onSubmit, age: initialAge, gender: initialGender, activityLevel: initialActivityLevel, targetBMI: initialTargetBMI }: UserDataFormProps) => {
  const [age, setAge] = useState(initialAge?.toString() || "");
  const [gender, setGender] = useState(initialGender || "");
  const [activityLevel, setActivityLevel] = useState(initialActivityLevel || "");
  const [targetBMI, setTargetBMI] = useState(initialTargetBMI?.toString() || "");
  const { t } = useLanguage();

  useEffect(() => {
    setAge(initialAge?.toString() || "");
    setGender(initialGender || "");
    setActivityLevel(initialActivityLevel || "");
    setTargetBMI(initialTargetBMI?.toString() || "");
  }, [initialAge, initialGender, initialActivityLevel, initialTargetBMI]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      age: parseInt(age) || 0,
      gender,
      activityLevel,
      targetBMI: parseFloat(targetBMI) || 0,
    });
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="age">Âge</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ex: 30"
          />
        </div>

        <div>
          <Label htmlFor="gender">Genre</Label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div>
          <Label htmlFor="activity">Niveau d'activité</Label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez</option>
            <option value="sedentary">Sédentaire</option>
            <option value="moderate">Modéré</option>
            <option value="active">Actif</option>
          </select>
        </div>

        <div>
          <Label htmlFor="targetBMI">IMC cible</Label>
          <Input
            id="targetBMI"
            type="number"
            value={targetBMI}
            onChange={(e) => setTargetBMI(e.target.value)}
            placeholder="Ex: 22"
          />
        </div>

        <Button type="submit" className="w-full">
          Mettre à jour le profil
        </Button>
      </form>
    </Card>
  );
};

export default UserDataForm;
