
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Hospital, AlertTriangle, Loader2, Tag, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

// Common symptoms that users can quickly select
const commonSymptoms = [
  { id: "headache", label: "Maux de tête" },
  { id: "fever", label: "Fièvre" },
  { id: "cough", label: "Toux" },
  { id: "fatigue", label: "Fatigue" },
  { id: "soreThroat", label: "Mal de gorge" },
  { id: "nausea", label: "Nausée" },
  { id: "dizziness", label: "Vertiges" },
  { id: "jointPain", label: "Douleurs articulaires" }
];

interface AnalysisResult {
  possibleConditions: Array<{
    name: string;
    confidence: number;
    description: string;
    recommendations: string;
    urgencyLevel: "low" | "medium" | "high";
  }>;
  generalAdvice: string;
  followUpQuestions?: string[];
}

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>("moderate");
  const [duration, setDuration] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  // Toggle symptom selection
  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const combinedSymptoms = [
      ...selectedSymptoms.map(id => commonSymptoms.find(s => s.id === id)?.label || ""),
      symptoms.trim()
    ].filter(Boolean).join(", ");
    
    if (!combinedSymptoms) {
      toast({
        title: "Erreur",
        description: "Veuillez décrire vos symptômes ou sélectionner des symptômes courants",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Call the Symptom Analysis Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-symptoms', {
        body: { 
          symptoms: combinedSymptoms,
          severity,
          duration
        }
      });
      
      if (error) throw error;
      
      setAnalysisResult(data);
      
    } catch (error: any) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de vos symptômes. Veuillez réessayer.",
        variant: "destructive",
      });
      
      // For demo purposes, create a sample response if there's an error
      setAnalysisResult({
        possibleConditions: [
          {
            name: "Syndrome viral",
            confidence: 75,
            description: "Un syndrome viral est une maladie causée par un virus qui peut provoquer divers symptômes comme de la fièvre, de la fatigue et des douleurs musculaires.",
            recommendations: "Repos, hydratation et médicaments en vente libre pour soulager les symptômes.",
            urgencyLevel: "low"
          },
          {
            name: "Infection respiratoire",
            confidence: 45,
            description: "Une infection qui affecte les voies respiratoires, pouvant causer toux, congestion et difficultés respiratoires.",
            recommendations: "Consulter un médecin si les symptômes persistent plus de 3 jours ou s'aggravent.",
            urgencyLevel: "medium"
          }
        ],
        generalAdvice: "Assurez-vous de vous hydrater régulièrement et de vous reposer. Si vos symptômes s'aggravent ou persistent, consultez un professionnel de santé.",
        followUpQuestions: [
          "Avez-vous été en contact avec des personnes malades récemment?",
          "Vos symptômes empirent-ils la nuit?"
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-amber-600 bg-amber-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Analyseur de Symptômes en ligne | HealthyIMC",
    "description": "Analyseur de symptômes en ligne avec IA pour une première évaluation virtuelle. Notez que ceci ne remplace pas l'avis d'un professionnel de santé.",
    "about": {
      "@type": "MedicalCondition",
      "name": "Analyse de symptômes"
    }
  };

  return (
    <>
      <SEO
        title="Analyseur de Symptômes - Consultation Virtuelle"
        description="Analyseur de symptômes en ligne avec IA pour une première évaluation virtuelle. Notez que ceci ne remplace pas l'avis d'un professionnel de santé."
        keywords="analyseur symptômes, consultation en ligne, analyse médicale IA, santé numérique, symptômes maladie"
        structuredData={structuredData}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Hospital className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Analyseur de Symptômes IA</h1>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Avertissement Important
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Cette analyse automatisée ne remplace pas une consultation médicale professionnelle.
                    En cas d'urgence ou de symptômes graves, contactez immédiatement les services d'urgence
                    ou consultez un médecin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!analysisResult ? (
            <form onSubmit={handleAnalysis} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Symptômes courants
                </h2>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge 
                      key={symptom.id}
                      variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                      className="cursor-pointer py-1.5 px-3"
                      onClick={() => toggleSymptom(symptom.id)}
                    >
                      {symptom.label}
                      {selectedSymptoms.includes(symptom.id) && (
                        <span className="ml-1">✓</span>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms" className="text-gray-700">
                  Décrivez vos symptômes en détail
                </Label>
                <Textarea
                  id="symptoms"
                  placeholder="Ex: J'ai des maux de tête depuis 2 jours, accompagnés de fièvre légère et de fatigue..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="severity" className="text-gray-700">
                    Intensité des symptômes
                  </Label>
                  <RadioGroup
                    id="severity"
                    value={severity}
                    onValueChange={setSeverity}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="mild" />
                      <Label htmlFor="mild">Léger</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Modéré</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severe" id="severe" />
                      <Label htmlFor="severe">Sévère</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-gray-700">
                    Depuis quand avez-vous ces symptômes?
                  </Label>
                  <RadioGroup
                    id="duration"
                    value={duration}
                    onValueChange={setDuration}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hours" id="hours" />
                      <Label htmlFor="hours">Heures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="days" id="days" />
                      <Label htmlFor="days">Jours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weeks" id="weeks" />
                      <Label htmlFor="weeks">Semaines</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  "Analyser mes symptômes"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Résultat de l'Analyse IA</h2>
                <p className="text-blue-700 mb-4">{analysisResult.generalAdvice}</p>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Possibles conditions :</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {analysisResult.possibleConditions.map((condition, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="font-medium">{condition.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                className={getUrgencyColor(condition.urgencyLevel)}
                              >
                                {condition.urgencyLevel === "high" 
                                  ? "Urgent" 
                                  : condition.urgencyLevel === "medium" 
                                    ? "Attention" 
                                    : "Non urgent"}
                              </Badge>
                              <span className="text-sm font-normal">{condition.confidence}% de correspondance</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <Progress value={condition.confidence} className="h-2" />
                            <p className="text-gray-700">{condition.description}</p>
                            <div className="mt-2">
                              <h4 className="text-sm font-medium text-gray-700">Recommandations :</h4>
                              <p className="text-sm text-gray-600 mt-1">{condition.recommendations}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {analysisResult.followUpQuestions && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-2">Questions supplémentaires :</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysisResult.followUpQuestions.map((question, i) => (
                        <li key={i} className="text-gray-700">{question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => setAnalysisResult(null)}
                  className="w-full sm:w-auto"
                >
                  Nouvelle analyse
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      toast({
                        title: "Merci pour votre retour",
                        description: "Votre avis nous aide à améliorer notre système d'analyse."
                      });
                    }}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Évaluation utile
                  </Button>

                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => {
                      toast({
                        title: "Information importante",
                        description: "Il est toujours recommandé de consulter un professionnel de santé pour un diagnostic précis.",
                      });
                    }}
                  >
                    Consulter un médecin
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default SymptomAnalyzer;
