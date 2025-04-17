
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Flame, Activity, Battery, Salad } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CalorieCalculator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [calorieResults, setCalorieResults] = useState<{
    bmr: number;
    maintenance: number;
    goal: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);
  
  const { toast } = useToast();

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageValue = parseInt(age);
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    
    if (!ageValue || !weightValue || !heightValue) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      });
      return;
    }
    
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }
    
    // Activity multiplier
    let activityMultiplier: number;
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "veryActive":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    
    const maintenance = Math.round(bmr * activityMultiplier);
    
    // Goal adjustment
    let goalCalories: number;
    switch (goal) {
      case "lose":
        goalCalories = Math.round(maintenance * 0.8);
        break;
      case "mild_lose":
        goalCalories = Math.round(maintenance * 0.9);
        break;
      case "maintain":
        goalCalories = maintenance;
        break;
      case "mild_gain":
        goalCalories = Math.round(maintenance * 1.1);
        break;
      case "gain":
        goalCalories = Math.round(maintenance * 1.2);
        break;
      default:
        goalCalories = maintenance;
    }
    
    // Macronutrients calculation (rough estimation)
    const protein = Math.round((goalCalories * 0.3) / 4); // 30% protein, 4 calories per gram
    const fats = Math.round((goalCalories * 0.25) / 9); // 25% fats, 9 calories per gram
    const carbs = Math.round((goalCalories * 0.45) / 4); // 45% carbs, 4 calories per gram
    
    setCalorieResults({
      bmr: Math.round(bmr),
      maintenance,
      goal: goalCalories,
      protein,
      carbs,
      fats
    });
    
    toast({
      title: "Calcul effectué",
      description: "Vos besoins caloriques ont été calculés avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 shadow-lg rounded-lg">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-8 w-8 text-[#F97316]" aria-hidden="true" />
              <h1 className="text-2xl font-bold tracking-tight text-[#F97316]">
                Calculateur de Besoins Caloriques
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Calculez vos besoins caloriques quotidiens et obtenez des recommandations de macronutriments
            </p>
          </div>
          
          <form onSubmit={calculateCalories} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup 
                value={gender} 
                onValueChange={(value) => setGender(value as "male" | "female")} 
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="calorie-male" />
                  <Label htmlFor="calorie-male">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="calorie-female" />
                  <Label htmlFor="calorie-female">Femme</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="calorie-age">Âge</Label>
                <Input 
                  id="calorie-age" 
                  type="number" 
                  placeholder="Ex: 30" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="15"
                  max="100"
                />
              </div>
              
              <div>
                <Label htmlFor="calorie-weight">Poids (kg)</Label>
                <Input 
                  id="calorie-weight" 
                  type="number" 
                  placeholder="Ex: 70" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  min="30"
                  max="300"
                />
              </div>
              
              <div>
                <Label htmlFor="calorie-height">Taille (cm)</Label>
                <Input 
                  id="calorie-height" 
                  type="number" 
                  placeholder="Ex: 175" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  min="100"
                  max="250"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="activity-level">Niveau d'activité</Label>
              <Select 
                value={activityLevel}
                onValueChange={setActivityLevel}
              >
                <SelectTrigger id="activity-level" className="w-full">
                  <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sédentaire (peu ou pas d'exercice)</SelectItem>
                  <SelectItem value="light">Légèrement actif (exercice léger 1-3 jours/semaine)</SelectItem>
                  <SelectItem value="moderate">Modérément actif (exercice modéré 3-5 jours/semaine)</SelectItem>
                  <SelectItem value="active">Très actif (exercice intense 6-7 jours/semaine)</SelectItem>
                  <SelectItem value="veryActive">Extrêmement actif (exercice très intense, travail physique)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="goal">Objectif</Label>
              <Select 
                value={goal}
                onValueChange={setGoal}
              >
                <SelectTrigger id="goal" className="w-full">
                  <SelectValue placeholder="Sélectionnez votre objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Perte de poids (déficit calorique de 20%)</SelectItem>
                  <SelectItem value="mild_lose">Perte de poids légère (déficit calorique de 10%)</SelectItem>
                  <SelectItem value="maintain">Maintien du poids</SelectItem>
                  <SelectItem value="mild_gain">Prise de masse légère (surplus calorique de 10%)</SelectItem>
                  <SelectItem value="gain">Prise de masse (surplus calorique de 20%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full bg-[#F97316] hover:bg-[#F97316]/90">
              Calculer mes besoins caloriques
            </Button>
          </form>
          
          {calorieResults && (
            <div className="mt-6 animate-slide-up">
              <Tabs defaultValue="calories" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calories">Calories</TabsTrigger>
                  <TabsTrigger value="macros">Macronutriments</TabsTrigger>
                </TabsList>
                <TabsContent value="calories" className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                      <Battery className="h-5 w-5 text-blue-500 mb-2" aria-hidden="true" />
                      <p className="text-xs text-blue-700 uppercase font-semibold">Métabolisme de base</p>
                      <p className="text-xl font-bold text-blue-600">{calorieResults.bmr}</p>
                      <p className="text-xs text-blue-500">calories/jour</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                      <Activity className="h-5 w-5 text-green-500 mb-2" aria-hidden="true" />
                      <p className="text-xs text-green-700 uppercase font-semibold">Maintien</p>
                      <p className="text-xl font-bold text-green-600">{calorieResults.maintenance}</p>
                      <p className="text-xs text-green-500">calories/jour</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg">
                      <Flame className="h-5 w-5 text-orange-500 mb-2" aria-hidden="true" />
                      <p className="text-xs text-orange-700 uppercase font-semibold">Objectif</p>
                      <p className="text-xl font-bold text-orange-600">{calorieResults.goal}</p>
                      <p className="text-xs text-orange-500">calories/jour</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-center text-muted-foreground">
                    <p>Ces valeurs sont estimées à l'aide de l'équation Mifflin-St Jeor, considérée comme la plus précise.</p>
                    <p className="mt-1">Ajustez votre apport calorique en fonction de vos résultats sur 2-3 semaines.</p>
                  </div>
                </TabsContent>
                <TabsContent value="macros" className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-center font-semibold mb-4">Répartition recommandée des macronutriments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-700 uppercase font-semibold">Protéines</p>
                      <p className="text-xl font-bold text-red-600">{calorieResults.protein}g</p>
                      <p className="text-xs text-red-500">{Math.round(calorieResults.protein * 4)} calories</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-xs text-amber-700 uppercase font-semibold">Glucides</p>
                      <p className="text-xl font-bold text-amber-600">{calorieResults.carbs}g</p>
                      <p className="text-xs text-amber-500">{Math.round(calorieResults.carbs * 4)} calories</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700 uppercase font-semibold">Lipides</p>
                      <p className="text-xl font-bold text-blue-600">{calorieResults.fats}g</p>
                      <p className="text-xs text-blue-500">{Math.round(calorieResults.fats * 9)} calories</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="flex h-2.5 rounded-full">
                        <div 
                          className="bg-red-500 h-2.5 rounded-l-full" 
                          style={{ width: '30%' }}
                        ></div>
                        <div 
                          className="bg-amber-500 h-2.5" 
                          style={{ width: '45%' }}
                        ></div>
                        <div 
                          className="bg-blue-500 h-2.5 rounded-r-full" 
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Protéines 30%</span>
                      <span>Glucides 45%</span>
                      <span>Lipides 25%</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Salad className="h-4 w-4" aria-hidden="true" />
                  Conseils nutritionnels
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Privilégiez les aliments entiers et non transformés</li>
                  <li>Buvez au moins 8 verres d'eau par jour</li>
                  <li>Consommez des protéines à chaque repas</li>
                  <li>Les glucides complexes sont préférables aux sucres simples</li>
                  <li>Les lipides sains sont essentiels (huile d'olive, avocats, poissons gras)</li>
                </ul>
              </div>
            </div>
          )}
        </Card>
        
        <Card className="p-4 text-sm">
          <h3 className="font-semibold mb-2">À propos des besoins caloriques</h3>
          <p className="text-muted-foreground">
            Le nombre de calories dont vous avez besoin chaque jour dépend de votre métabolisme de base (BMR) et de votre niveau d'activité.
            Le BMR représente l'énergie nécessaire pour maintenir les fonctions vitales de votre corps au repos.
            Le calcul de vos besoins caloriques est une estimation et peut varier en fonction de facteurs individuels comme la génétique et la composition corporelle.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CalorieCalculator;
