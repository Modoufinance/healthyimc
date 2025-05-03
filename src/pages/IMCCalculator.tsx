
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";
import StickyHeader from "@/components/StickyHeader";

const IMCCalculator = () => {
  const { toast } = useToast();
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [imc, setImc] = useState<number | null>(null);
  const [imcCategory, setImcCategory] = useState<string>("");
  const [imcColor, setImcColor] = useState<string>("");
  const [gender, setGender] = useState<string>("female");
  const [age, setAge] = useState<string>("");
  const [measurementSystem, setMeasurementSystem] = useState<string>("metric");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur IMC HealthyIMC",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const calculateIMC = () => {
    if (!height || !weight) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir votre taille et votre poids."
      });
      return;
    }

    let heightInMeters: number;
    let weightInKg: number;

    if (measurementSystem === "metric") {
      heightInMeters = parseFloat(height) / 100; // Convert cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Convert inches to meters and pounds to kg
      heightInMeters = parseFloat(height) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir des valeurs valides pour la taille et le poids."
      });
      return;
    }

    const calculatedIMC = weightInKg / (heightInMeters * heightInMeters);
    setImc(parseFloat(calculatedIMC.toFixed(1)));
    
    // Determine IMC category and color
    let category = "";
    let color = "";

    if (calculatedIMC < 16.5) {
      category = "Dénutrition";
      color = "text-orange-600";
    } else if (calculatedIMC < 18.5) {
      category = "Maigreur";
      color = "text-yellow-500";
    } else if (calculatedIMC < 25) {
      category = "Poids normal";
      color = "text-green-500";
    } else if (calculatedIMC < 30) {
      category = "Surpoids";
      color = "text-yellow-500";
    } else if (calculatedIMC < 35) {
      category = "Obésité modérée (Classe I)";
      color = "text-orange-500";
    } else if (calculatedIMC < 40) {
      category = "Obésité sévère (Classe II)";
      color = "text-red-500";
    } else {
      category = "Obésité morbide (Classe III)";
      color = "text-red-700";
    }

    setImcCategory(category);
    setImcColor(color);
  };

  return (
    <>
      <SEO
        title="Calculateur IMC en ligne gratuit | Indice de Masse Corporelle"
        description="Calculez gratuitement votre IMC (Indice de Masse Corporelle) et découvrez si votre poids est idéal pour votre taille. Conseils santé personnalisés."
        keywords="calculateur imc, indice masse corporelle, calcul imc, imc gratuit, imc en ligne"
        canonicalUrl="https://healthyimc.com/imc-calculator"
        structuredData={structuredData}
      />
      <StickyHeader />
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Calculateur d'IMC (Indice de Masse Corporelle)
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Calculez votre IMC</h2>
              
              <div className="space-y-6">
                <Tabs defaultValue="metric" value={measurementSystem} onValueChange={setMeasurementSystem}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="metric">Métrique (cm, kg)</TabsTrigger>
                    <TabsTrigger value="imperial">Impérial (in, lb)</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Genre</Label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 h-10"
                      >
                        <option value="female">Femme</option>
                        <option value="male">Homme</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="age">Âge (ans)</Label>
                      <Input
                        id="age"
                        type="number"
                        min="1"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Ex: 30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="height">
                      {measurementSystem === "metric" ? "Taille (cm)" : "Taille (pouces)"}
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      min="1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={measurementSystem === "metric" ? "Ex: 170" : "Ex: 67"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">
                      {measurementSystem === "metric" ? "Poids (kg)" : "Poids (lb)"}
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      min="1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={measurementSystem === "metric" ? "Ex: 70" : "Ex: 154"}
                    />
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    onClick={calculateIMC}
                  >
                    Calculer mon IMC
                  </Button>
                </div>
              </div>
              
              {imc !== null && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Votre résultat :</h3>
                  <p className="text-2xl font-bold mb-2">
                    IMC : <span className={imcColor}>{imc}</span>
                  </p>
                  <p className="text-lg">
                    Catégorie : <span className={imcColor + " font-medium"}>{imcCategory}</span>
                  </p>
                </div>
              )}
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Comprendre votre IMC</h2>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <h3 className="font-medium">Catégories d'IMC :</h3>
                  <ul className="space-y-2">
                    <li className="text-orange-600">Moins de 16.5 : Dénutrition</li>
                    <li className="text-yellow-500">Entre 16.5 et 18.4 : Maigreur</li>
                    <li className="text-green-500">Entre 18.5 et 24.9 : Poids normal</li>
                    <li className="text-yellow-500">Entre 25 et 29.9 : Surpoids</li>
                    <li className="text-orange-500">Entre 30 et 34.9 : Obésité modérée</li>
                    <li className="text-red-500">Entre 35 et 39.9 : Obésité sévère</li>
                    <li className="text-red-700">40 et plus : Obésité morbide</li>
                  </ul>
                </div>
              </Card>
              
              <Card className="p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Conseils santé</h2>
                <Separator className="my-4" />
                <p className="text-gray-700 mb-4">
                  L'IMC est un indicateur, mais ne tient pas compte de tous les facteurs comme la masse musculaire, 
                  la répartition des graisses, ou votre historique médical.
                </p>
                <p className="text-gray-700">
                  Pour une évaluation complète, consultez un professionnel de santé qui pourra vous donner 
                  des conseils personnalisés adaptés à votre situation spécifique.
                </p>
              </Card>
            </div>
          </div>
          
          <div className="mt-8">
            <Card className="p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Informations complémentaires sur l'IMC</h2>
              <Separator className="my-4" />
              <div className="space-y-4">
                <p>
                  L'Indice de Masse Corporelle (IMC) est une mesure qui permet d'évaluer la corpulence d'une personne
                  en fonction de sa taille et de son poids. C'est un outil largement utilisé pour déterminer si une personne
                  a un poids santé.
                </p>
                <p>
                  La formule de calcul de l'IMC est : Poids (kg) / [Taille (m)]².
                </p>
                <p>
                  <strong>Limites de l'IMC :</strong> Bien que l'IMC soit un indicateur utile, il ne distingue pas
                  la masse musculaire de la masse graisseuse. Ainsi, des personnes très musclées peuvent avoir un IMC élevé
                  sans excès de graisse. De même, l'IMC ne tient pas compte de la répartition des graisses, un facteur important
                  pour évaluer les risques pour la santé.
                </p>
                <p>
                  <strong>L'IMC chez les enfants et les adolescents</strong> est évalué différemment, en utilisant des courbes
                  de croissance spécifiques à l'âge et au sexe.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default IMCCalculator;
