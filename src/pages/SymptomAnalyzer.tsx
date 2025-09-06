
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Hospital, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState("");
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
    // Temporary response for demo
    setTimeout(() => {
      setAnalysis("Cette fonctionnalité est en cours de développement. Pour le moment, veuillez consulter un professionnel de santé pour une évaluation précise de vos symptômes.");
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <>
      <SEO
        title="Analyseur de Symptômes - Consultation Virtuelle"
        description="Analyseur de symptômes en ligne avec IA pour une première évaluation virtuelle. Notez que ceci ne remplace pas l'avis d'un professionnel de santé."
        keywords="analyseur symptômes, consultation en ligne, analyse médicale IA, santé numérique"
      />
      <div className="container mx-auto p-4 max-w-4xl">
        {/* AdSense en haut */}
        <div className="mb-8 flex justify-center">
          <AdSense 
            adSlot="9999999999"
            adFormat="horizontal"
            className="max-w-4xl"
            style={{ minHeight: '100px' }}
          />
        </div>
        
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
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Analyse Préliminaire</h3>
              <p className="text-blue-800">{analysis}</p>
            </div>
          )}
        </Card>
        
        {/* AdSense en bas */}
        <div className="mt-8 flex justify-center">
          <AdSense 
            adSlot="1010101010"
            adFormat="auto"
            className="max-w-2xl"
            style={{ minHeight: '200px' }}
          />
        </div>
      </div>
    </>
  );
};

export default SymptomAnalyzer;
