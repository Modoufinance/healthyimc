
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Hospital, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { analyzeSymptoms } from "@/services/aiSymptomService";

interface AnalysisResult {
  analysis: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez décrire vos symptômes",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysis(result);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <>
      <SEO
        title="Analyseur de Symptômes - Consultation Virtuelle"
        description="Analyseur de symptômes en ligne avec IA pour une première évaluation virtuelle. Notez que ceci ne remplace pas l'avis d'un professionnel de santé."
        keywords="analyseur symptômes, consultation en ligne, analyse médicale IA, santé numérique"
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Hospital className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Analyseur de Symptômes</h1>
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

          <form onSubmit={handleAnalysis} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms" className="text-gray-700">
                Décrivez vos symptômes en détail
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Ex: J'ai des maux de tête depuis 2 jours, accompagnés de..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyse en cours..." : "Analyser mes symptômes"}
            </Button>
          </form>

          {analysis && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getSeverityColor(analysis.severity)}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold mb-2">Analyse Préliminaire</h3>
                    <p>{analysis.analysis}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recommandations
                </h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default SymptomAnalyzer;
