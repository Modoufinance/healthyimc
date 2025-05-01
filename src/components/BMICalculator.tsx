
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BMIForm from "@/components/BMIForm";
import BMIResultDisplay from "@/components/BMIResultDisplay";
import DeviceConnect from "@/components/DeviceConnect";
import BMIEducation from "@/components/BMIEducation";
import BMIChart from "@/components/BMIChart";
import BMIPredictions from "@/components/BMIPredictions";
import { Ruler, Info, Activity, TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";

export interface BMIData {
  bmi: number;
  weight: number;
  height: number;
  age: number;
  category: string;
  advice: string;
}

const BMICalculator = () => {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);

  const handleCalculateBMI = (weight: number, height: number, age: number) => {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI using the formula: weight / height²
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    
    // Determine BMI category and advice
    let category = "";
    let advice = "";
    
    if (bmi < 18.5) {
      category = "Maigreur";
      advice = "Votre IMC indique une insuffisance pondérale. Un suivi médical pourrait être bénéfique pour s'assurer que vous recevez une nutrition adéquate.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Poids normal";
      advice = "Votre IMC est dans la plage considérée comme normale. Continuez à maintenir de bonnes habitudes alimentaires et une activité physique régulière.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Surpoids";
      advice = "Votre IMC indique un surpoids. Envisagez d'adopter une alimentation plus équilibrée et d'augmenter votre activité physique.";
    } else if (bmi >= 30 && bmi < 35) {
      category = "Obésité modérée";
      advice = "Votre IMC indique une obésité modérée. Il est recommandé de consulter un médecin pour discuter d'un plan de gestion du poids.";
    } else if (bmi >= 35 && bmi < 40) {
      category = "Obésité sévère";
      advice = "Votre IMC indique une obésité sévère. Une consultation médicale est fortement recommandée pour évaluer votre santé et discuter des options de gestion du poids.";
    } else {
      category = "Obésité morbide";
      advice = "Votre IMC indique une obésité morbide. Veuillez consulter un professionnel de santé dès que possible pour une évaluation complète et un plan de traitement personnalisé.";
    }
    
    // Set BMI data
    setBmiData({
      bmi,
      weight,
      height,
      age,
      category,
      advice
    });
  };

  const handleDeviceData = (weight?: number, height?: number) => {
    if (weight && height && bmiData?.age) {
      handleCalculateBMI(weight, height, bmiData.age);
    }
  };

  return (
    <>
      <SEO 
        title="Calculateur d'IMC en ligne gratuit" 
        description="Calculez votre indice de masse corporelle (IMC) avec notre calculateur gratuit et obtenez une analyse personnalisée de votre poids santé."
        keywords="calculateur IMC, indice masse corporelle, IMC en ligne, calculer IMC, IMC gratuit"
      />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
          Calculateur d'IMC
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Calculez votre Indice de Masse Corporelle (IMC) et recevez une analyse personnalisée
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Entrez vos données</CardTitle>
              <CardDescription>
                Saisissez vos informations pour calculer votre IMC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceConnect onDataReceived={handleDeviceData} />
              <BMIForm onCalculate={handleCalculateBMI} savedData={bmiData} />
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            {bmiData ? (
              <Card>
                <CardHeader>
                  <CardTitle>Votre résultat IMC</CardTitle>
                  <CardDescription>
                    Analyse basée sur vos données
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BMIResultDisplay bmi={bmiData.bmi} category={bmiData.category} />
                  
                  <Tabs defaultValue="education" className="mt-6">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="education" className="flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Information</span>
                      </TabsTrigger>
                      <TabsTrigger value="chart" className="flex items-center">
                        <Activity className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Échelle</span>
                      </TabsTrigger>
                      <TabsTrigger value="predictions" className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Prédictions</span>
                      </TabsTrigger>
                      <TabsTrigger value="advice" className="flex items-center">
                        <Ruler className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Conseils</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="education">
                      <BMIEducation category={bmiData.category} />
                    </TabsContent>
                    <TabsContent value="chart">
                      <BMIChart bmi={bmiData.bmi} />
                    </TabsContent>
                    <TabsContent value="predictions">
                      <BMIPredictions bmiData={bmiData} />
                    </TabsContent>
                    <TabsContent value="advice">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Conseils personnalisés</h3>
                        <p>{bmiData.advice}</p>
                        <div className="bg-primary/10 p-4 rounded-lg mt-4">
                          <h4 className="font-medium text-primary">Note importante</h4>
                          <p className="text-sm mt-2">
                            L'IMC est un indicateur général et ne tient pas compte de facteurs comme la masse musculaire, 
                            la répartition des graisses ou d'autres caractéristiques individuelles. 
                            Consultez toujours un professionnel de santé pour une évaluation complète.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Données enregistrées localement
                  </p>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Qu'est-ce que l'IMC?</CardTitle>
                  <CardDescription>
                    Comprendre l'Indice de Masse Corporelle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      L'Indice de Masse Corporelle (IMC) est un indicateur qui permet d'évaluer rapidement votre corpulence
                      en fonction de votre taille et de votre poids. C'est un outil largement utilisé par les professionnels
                      de santé pour dépister les risques liés au poids.
                    </p>
                    
                    <h3 className="text-lg font-medium mt-6">Comment se calcule l'IMC?</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm">
                      IMC = Poids (kg) / Taille² (m)
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Exemple: Une personne pesant 70 kg et mesurant 1,75 m aura un IMC de 70 ÷ (1,75)² = 22,9
                    </p>
                    
                    <h3 className="text-lg font-medium mt-6">Interprétation des résultats</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Moins de 18,5 : <span className="text-blue-500 font-medium">Insuffisance pondérale (maigreur)</span></li>
                      <li>Entre 18,5 et 24,9 : <span className="text-green-500 font-medium">Corpulence normale</span></li>
                      <li>Entre 25 et 29,9 : <span className="text-yellow-500 font-medium">Surpoids</span></li>
                      <li>Entre 30 et 34,9 : <span className="text-orange-500 font-medium">Obésité modérée</span></li>
                      <li>Entre 35 et 39,9 : <span className="text-red-500 font-medium">Obésité sévère</span></li>
                      <li>Plus de 40 : <span className="text-red-700 font-medium">Obésité morbide</span></li>
                    </ul>
                    
                    <div className="bg-primary/10 p-4 rounded-lg mt-6">
                      <h4 className="font-medium text-primary">Commencez maintenant</h4>
                      <p className="text-sm mt-2">
                        Remplissez le formulaire à gauche pour calculer votre IMC et recevoir une analyse personnalisée.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;
