
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Scale, Percent } from "lucide-react";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateBodyFat = (e: React.FormEvent) => {
    e.preventDefault();

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const waistValue = parseFloat(waist);
    const neckValue = parseFloat(neck);
    const hipValue = parseFloat(hip);

    if (!weightValue || !heightValue || !waistValue || !neckValue || (gender === "female" && !hipValue)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      });
      return;
    }

    let bodyFat: number;

    if (gender === "male") {
      // Navy method for men
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistValue - neckValue) + 0.15456 * Math.log10(heightValue)) - 450;
    } else {
      // Navy method for women
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistValue + hipValue - neckValue) + 0.22100 * Math.log10(heightValue)) - 450;
    }

    bodyFat = Math.max(3, Math.min(45, bodyFat));
    setBodyFatPercentage(parseFloat(bodyFat.toFixed(1)));

    toast({
      title: "Calcul effectué",
      description: "Votre pourcentage de graisse corporelle a été calculé avec succès",
    });
  };

  const getBodyFatCategory = (percentage: number): string => {
    if (gender === "male") {
      if (percentage < 6) return "Essentiel";
      if (percentage < 14) return "Athlète";
      if (percentage < 18) return "Fitness";
      if (percentage < 25) return "Moyen";
      return "Élevé";
    } else {
      if (percentage < 14) return "Essentiel";
      if (percentage < 21) return "Athlète";
      if (percentage < 25) return "Fitness";
      if (percentage < 32) return "Moyen";
      return "Élevé";
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Essentiel": return "text-blue-500";
      case "Athlète": return "text-green-500";
      case "Fitness": return "text-emerald-500";
      case "Moyen": return "text-yellow-500";
      case "Élevé": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 shadow-lg rounded-lg">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Percent className="h-8 w-8 text-[#4facfe]" aria-hidden="true" />
              <h1 className="text-2xl font-bold tracking-tight text-[#4facfe]">
                Calculateur de Pourcentage de Graisse Corporelle
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimez votre pourcentage de graisse corporelle en utilisant la méthode de la Marine américaine
            </p>
          </div>

          <form onSubmit={calculateBodyFat} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup 
                value={gender} 
                onValueChange={(value) => setGender(value as "male" | "female")} 
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Femme</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="Ex: 70"
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="height">Taille (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  placeholder="Ex: 175" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="waist">Tour de taille (cm)</Label>
                <Input 
                  id="waist" 
                  type="number" 
                  placeholder="Ex: 85" 
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="neck">Tour de cou (cm)</Label>
                <Input 
                  id="neck" 
                  type="number" 
                  placeholder="Ex: 37" 
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  required
                />
              </div>

              {gender === "female" && (
                <div className="md:col-span-2">
                  <Label htmlFor="hip">Tour de hanches (cm)</Label>
                  <Input 
                    id="hip" 
                    type="number" 
                    placeholder="Ex: 100" 
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Calculer mon pourcentage de graisse
            </Button>
          </form>

          {bodyFatPercentage !== null && (
            <div className="mt-6 space-y-4 text-center p-4 bg-gray-50 rounded-lg animate-slide-up">
              <div className="text-3xl font-bold text-primary">{bodyFatPercentage}%</div>
              <div>
                <span className="font-medium">Catégorie: </span>
                <span className={`font-bold ${getCategoryColor(getBodyFatCategory(bodyFatPercentage))}`}>
                  {getBodyFatCategory(bodyFatPercentage)}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground mt-2">
                <p>Cette estimation est basée sur la méthode de la Marine américaine et peut varier de 3-4% par rapport aux méthodes plus précises.</p>
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm">
            <h3 className="font-medium text-blue-700 mb-2">Comment utiliser ce calculateur</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-600">
              <li>Mesurez votre tour de taille à mi-chemin entre votre côte inférieure et le haut de votre os de la hanche</li>
              <li>Mesurez votre tour de cou juste en dessous de votre pomme d'Adam</li>
              <li>Pour les femmes, mesurez votre tour de hanches à leur point le plus large</li>
              <li>Entrez toutes les mesures en centimètres pour plus de précision</li>
            </ul>
          </div>
        </Card>

        <Card className="p-4 text-sm">
          <h3 className="font-semibold mb-2">À propos du pourcentage de graisse corporelle</h3>
          <p className="text-muted-foreground">
            Le pourcentage de graisse corporelle est une mesure de la composition corporelle qui indique la proportion de votre poids total qui est constituée de graisse. 
            Il est considéré comme un meilleur indicateur de santé que l'IMC car il prend en compte la différence entre la masse musculaire et la masse grasse.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="border rounded p-2">
              <div className="font-medium">Homme</div>
              <ul className="space-y-1 text-xs">
                <li><span className="text-blue-500 font-medium">3-5%</span>: Essentiel</li>
                <li><span className="text-green-500 font-medium">6-13%</span>: Athlète</li>
                <li><span className="text-emerald-500 font-medium">14-17%</span>: Fitness</li>
                <li><span className="text-yellow-500 font-medium">18-24%</span>: Moyen</li>
                <li><span className="text-red-500 font-medium">25%+</span>: Élevé</li>
              </ul>
            </div>
            <div className="border rounded p-2">
              <div className="font-medium">Femme</div>
              <ul className="space-y-1 text-xs">
                <li><span className="text-blue-500 font-medium">10-13%</span>: Essentiel</li>
                <li><span className="text-green-500 font-medium">14-20%</span>: Athlète</li>
                <li><span className="text-emerald-500 font-medium">21-24%</span>: Fitness</li>
                <li><span className="text-yellow-500 font-medium">25-31%</span>: Moyen</li>
                <li><span className="text-red-500 font-medium">32%+</span>: Élevé</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BodyFatCalculator;
