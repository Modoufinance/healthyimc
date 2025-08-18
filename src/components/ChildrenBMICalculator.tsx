
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Scale, Download, Mail, Calendar, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BMIScale from "./BMIScale";
import BMIChart from "./BMIChart";
import EnhancedFAQ from "./EnhancedFAQ";

interface ChildBMIData {
  bmi: number;
  percentile: number;
  category: string;
  advice: string;
  date?: string;
}

const ChildrenBMICalculator = () => {
  const [childData, setChildData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: ""
  });
  const [bmiData, setBmiData] = useState<ChildBMIData | null>(null);
  const [savedResults, setSavedResults] = useState<ChildBMIData[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('savedChildBmiResults');
    if (saved) {
      setSavedResults(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChildData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setChildData(prev => ({ ...prev, gender: value }));
  };

  const getBMIPercentile = (bmi: number, age: number, gender: string): number => {
    // This is a simplified implementation
    // In a real application, this would use CDC or WHO growth charts
    // Reference data based on age and gender
    const percentileRanges = {
      male: {
        // age ranges as keys, with arrays of BMI values for percentiles
        // [5th, 10th, 25th, 50th, 75th, 85th, 95th]
        2: [14.5, 15.0, 15.7, 16.5, 17.3, 17.8, 18.5],
        5: [13.8, 14.2, 14.9, 15.4, 16.1, 16.7, 18.0],
        8: [13.8, 14.2, 14.9, 15.8, 16.9, 17.9, 19.9],
        11: [14.6, 15.1, 16.1, 17.2, 18.9, 20.2, 22.5],
        14: [16.0, 16.5, 17.5, 18.7, 20.2, 21.4, 24.1]
      },
      female: {
        2: [14.0, 14.5, 15.1, 16.0, 16.9, 17.3, 18.2],
        5: [13.5, 13.9, 14.5, 15.2, 16.1, 16.8, 18.2],
        8: [13.6, 14.0, 14.8, 15.6, 16.9, 18.0, 20.0],
        11: [14.5, 15.0, 16.0, 17.2, 18.8, 20.2, 22.8],
        14: [16.3, 16.8, 17.8, 19.0, 20.7, 22.0, 24.6]
      }
    };

    // Find closest age bracket
    const ageKeys = Object.keys(percentileRanges[gender as keyof typeof percentileRanges])
      .map(Number)
      .sort((a, b) => Math.abs(a - age) - Math.abs(b - age));
    
    const closestAge = ageKeys[0];
    
    // Get percentiles for that age and gender
    const percentiles = percentileRanges[gender as keyof typeof percentileRanges][closestAge as keyof typeof percentileRanges.male];
    
    // Calculate which percentile the BMI falls into
    if (bmi < percentiles[0]) return 3; // Below 5th
    if (bmi < percentiles[1]) return 7; // 5-10th
    if (bmi < percentiles[2]) return 17; // 10-25th
    if (bmi < percentiles[3]) return 37; // 25-50th
    if (bmi < percentiles[4]) return 62; // 50-75th
    if (bmi < percentiles[5]) return 80; // 75-85th
    if (bmi < percentiles[6]) return 90; // 85-95th
    return 97; // Above 95th
  };

  const getCategoryAndAdvice = (percentile: number) => {
    let category = "";
    let advice = "";

    if (percentile < 5) {
      category = "Insuffisance pondérale";
      advice = "Le poids de votre enfant est inférieur à celui recommandé pour son âge et sa taille. Consultez un pédiatre pour des conseils nutritionnels adaptés.";
    } else if (percentile >= 5 && percentile < 85) {
      category = "Poids normal";
      advice = "Le poids de votre enfant est dans la plage normale pour son âge et sa taille. Continuez à encourager une alimentation équilibrée et une activité physique régulière.";
    } else if (percentile >= 85 && percentile < 95) {
      category = "Surpoids";
      advice = "Votre enfant présente un surpoids par rapport aux enfants du même âge et du même sexe. Consultez un pédiatre pour des conseils personnalisés.";
    } else {
      category = "Obésité";
      advice = "Votre enfant présente une obésité par rapport aux enfants du même âge et du même sexe. Il est recommandé de consulter un pédiatre pour établir un plan d'action adapté.";
    }

    return { category, advice };
  };

  const handleCalculate = () => {
    const weight = parseFloat(childData.weight);
    const height = parseFloat(childData.height) / 100; // convert cm to meters
    const age = parseInt(childData.age);
    const gender = childData.gender;

    if (!weight || !height || !age || !gender) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs pour calculer l'IMC de votre enfant.",
        variant: "destructive",
      });
      return;
    }

    const bmi = Number((weight / (height * height)).toFixed(2));
    const percentile = getBMIPercentile(bmi, age, gender);
    const { category, advice } = getCategoryAndAdvice(percentile);

    const bmiDataObj = { bmi, percentile, category, advice, date: new Date().toISOString() };
    setBmiData(bmiDataObj);

    // Save result to history
    const newSavedResults = [...savedResults, bmiDataObj];
    setSavedResults(newSavedResults);
    localStorage.setItem('savedChildBmiResults', JSON.stringify(newSavedResults));

    toast({
      title: "Calcul effectué",
      description: "L'IMC de votre enfant a été calculé avec succès.",
    });
  };

  const exportToPDF = () => {
    if (!bmiData) return;
    
    const pdfContent = `
      IMC: ${bmiData.bmi}
      Percentile: ${bmiData.percentile}
      Catégorie: ${bmiData.category}
      Conseils: ${bmiData.advice}
      Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IMC-Enfant-${new Date().toLocaleDateString()}.pdf`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: "Le rapport a été téléchargé au format PDF",
    });
  };

  const sendByEmail = () => {
    if (!bmiData) return;
    
    const mailtoLink = `mailto:?subject=Rapport IMC de mon enfant&body=Voici les résultats IMC:%0D%0A
    IMC: ${bmiData.bmi}%0D%0A
    Percentile: ${bmiData.percentile}%0D%0A
    Catégorie: ${bmiData.category}%0D%0A
    Conseils: ${bmiData.advice}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Email préparé",
      description: "Votre client mail va s'ouvrir avec le rapport",
    });
  };

  // FAQ items
  const childBmiFAQs = [
    {
      question: "Comment interpréter l'IMC d'un enfant?",
      answer: "L'IMC des enfants est interprété différemment de celui des adultes. On utilise des courbes de croissance spécifiques à l'âge et au sexe pour déterminer des percentiles. Un enfant dont l'IMC se situe entre le 5ème et le 85ème percentile est considéré comme ayant un poids normal.",
      keywords: ["interpréter", "percentile", "normal", "enfant", "courbe"]
    },
    {
      question: "Pourquoi l'IMC des enfants est-il calculé différemment?",
      answer: "La composition corporelle des enfants change naturellement à mesure qu'ils grandissent. Les garçons et les filles se développent également à des rythmes différents. C'est pourquoi l'IMC des enfants est évalué en fonction de leur âge et de leur sexe, en utilisant des percentiles plutôt que des valeurs fixes.",
      keywords: ["différent", "adulte", "croissance", "développement", "âge"]
    },
    {
      question: "À quelle fréquence dois-je vérifier l'IMC de mon enfant?",
      answer: "Il est généralement recommandé de suivre l'IMC de votre enfant lors des visites régulières chez le pédiatre, généralement une à deux fois par an. Un suivi plus fréquent peut être conseillé si votre enfant présente des problèmes de poids identifiés par un professionnel de santé.",
      keywords: ["fréquence", "régulier", "pédiatre", "suivi", "visite"]
    },
    {
      question: "Mon enfant est dans une catégorie de surpoids, que faire?",
      answer: "Si votre enfant est en surpoids selon son IMC, consultez d'abord un pédiatre. Évitez les régimes restrictifs qui peuvent nuire à sa croissance. Visez plutôt une alimentation équilibrée, limitez les aliments transformés et les boissons sucrées, encouragez l'activité physique quotidienne (60 minutes recommandées), réduisez le temps d'écran et impliquez toute la famille dans des habitudes plus saines.",
      keywords: ["surpoids", "obésité", "aider", "conseils", "solution"]
    },
    {
      question: "Mon enfant est en insuffisance pondérale, est-ce grave?",
      answer: "Une insuffisance pondérale peut indiquer divers problèmes comme une malnutrition, des troubles digestifs ou métaboliques. Consultez un pédiatre pour une évaluation complète. Ne tentez pas d'augmenter son poids sans avis médical. Le médecin pourra recommander une alimentation adaptée plus riche en calories nutritives, des collations saines fréquentes, et parfois des suppléments nutritionnels.",
      keywords: ["maigreur", "insuffisance", "poids bas", "maigre", "sous-poids"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg rounded-lg">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Baby className="h-8 w-8 text-[#4facfe]" aria-hidden="true" />
                <h1 className="text-2xl font-bold tracking-tight text-[#4facfe]">
                  Calculateur d'IMC pour Enfants
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                L'IMC des enfants s'interprète différemment de celui des adultes et varie selon l'âge et le sexe.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Âge
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Ex: 8"
                  value={childData.age}
                  onChange={handleInputChange}
                  required
                  min="2"
                  max="18"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="flex items-center gap-2">
                  <Baby className="h-4 w-4" />
                  Genre
                </Label>
                <Select onValueChange={handleGenderChange} value={childData.gender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Garçon</SelectItem>
                    <SelectItem value="female">Fille</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Poids (kg)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Ex: 30"
                  value={childData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" rotate={90} />
                  Taille (cm)
                </Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="Ex: 130"
                  value={childData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button onClick={handleCalculate} className="w-full bg-[#4facfe] hover:bg-[#00f2fe]">
                <Scale className="mr-2 h-4 w-4" />
                Calculer l'IMC
              </Button>
            </div>
            
            {bmiData && (
              <div className="animate-slide-up mt-6 space-y-4">
                <div className="space-y-3 text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{bmiData.bmi}</div>
                  <div className="text-lg">Percentile: {bmiData.percentile}</div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm inline-block">
                    {bmiData.category}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{bmiData.advice}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" onClick={exportToPDF} className="flex items-center gap-2">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Exporter en PDF
                  </Button>
                  
                  <Button variant="outline" onClick={sendByEmail} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Envoyer par email
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          <Card className="p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Interprétation de l'IMC chez l'enfant</h2>
            <p className="mb-4">
              L'indice de masse corporelle (IMC) des enfants est évalué différemment de celui des adultes. 
              Il est interprété en fonction de l'âge et du sexe, car la composition corporelle des enfants 
              évolue naturellement avec la croissance et diffère entre les garçons et les filles.
            </p>
            
            <h3 className="font-medium text-lg mb-2">Les percentiles</h3>
            <p className="mb-4">
              Pour les enfants et les adolescents, l'IMC est évalué en utilisant des percentiles qui permettent 
              de comparer l'IMC de votre enfant avec celui d'autres enfants du même âge et du même sexe.
            </p>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <span className="font-medium">Inférieur au 5ème percentile</span>: 
                Insuffisance pondérale
              </li>
              <li>
                <span className="font-medium">Entre le 5ème et le 84ème percentile</span>: 
                Poids normal
              </li>
              <li>
                <span className="font-medium">Entre le 85ème et le 94ème percentile</span>: 
                Surpoids
              </li>
              <li>
                <span className="font-medium">Au-dessus du 95ème percentile</span>: 
                Obésité
              </li>
            </ul>
            
            <p>
              Ce calculateur utilise des approximations des courbes de croissance de l'OMS et du CDC. 
              Pour un suivi médical précis, consultez toujours un pédiatre.
            </p>
          </Card>
        </div>

        {bmiData && (
          <div className="animate-slide-up space-y-6">
            <BMIScale bmi={bmiData.bmi} />
            <BMIChart bmi={bmiData.bmi} />
          </div>
        )}

        <EnhancedFAQ 
          title="Questions fréquentes sur l'IMC des enfants" 
          description="Trouvez les réponses aux questions les plus courantes sur l'Indice de Masse Corporelle chez les enfants"
          faqItems={childBmiFAQs}
          className="bg-white/10"
        />
        
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Conseils pour une croissance saine</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Alimentation équilibrée</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Proposez des repas variés incluant fruits, légumes, protéines maigres et céréales complètes</li>
                <li>Limitez les aliments transformés et les boissons sucrées</li>
                <li>Faites manger votre enfant à heures régulières</li>
                <li>Évitez d'utiliser la nourriture comme récompense</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Activité physique</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Visez au moins 60 minutes d'activité physique par jour</li>
                <li>Privilégiez des activités adaptées à l'âge et aux goûts de l'enfant</li>
                <li>Limitez le temps d'écran à moins de 2 heures par jour</li>
                <li>Encouragez les activités en famille</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm italic">
              Ces conseils sont généraux. Pour des recommandations personnalisées, consultez un pédiatre 
              ou un nutritionniste spécialisé dans la santé des enfants.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChildrenBMICalculator;
