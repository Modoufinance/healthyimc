
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, InfoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const CalculatriceIMC = () => {
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [imc, setIMC] = useState<number | null>(null);
  const [categorie, setCategorie] = useState("");
  const { toast } = useToast();

  const handleCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const poidsNum = parseFloat(poids);
    const tailleNum = parseFloat(taille) / 100; // Conversion cm en mètres
    
    if (!poidsNum || !tailleNum || poidsNum <= 0 || tailleNum <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez entrer des valeurs valides pour le poids et la taille.",
        variant: "destructive",
      });
      return;
    }
    
    const calculIMC = poidsNum / (tailleNum * tailleNum);
    setIMC(parseFloat(calculIMC.toFixed(2)));
    
    if (calculIMC < 18.5) {
      setCategorie("insuffisance pondérale");
    } else if (calculIMC >= 18.5 && calculIMC < 25) {
      setCategorie("corpulence normale (poids santé)");
    } else if (calculIMC >= 25 && calculIMC < 30) {
      setCategorie("surpoids");
    } else {
      setCategorie("obésité");
    }
  };

  const getCategorieClass = () => {
    if (!imc) return "";
    if (imc < 18.5) return "bg-blue-50 text-blue-800";
    if (imc < 25) return "bg-green-50 text-green-800";
    if (imc < 30) return "bg-yellow-50 text-yellow-800";
    return "bg-red-50 text-red-800";
  };

  // FAQ items pour le SEO
  const faqItems = [
    {
      question: "Comment calculer son IMC ?",
      answer: "L'IMC se calcule en divisant votre poids (kg) par le carré de votre taille (m). La formule est: IMC = Poids(kg) / Taille²(m)."
    },
    {
      question: "Qu'est-ce qu'un IMC normal ?",
      answer: "Un IMC entre 18,5 et 24,9 est considéré comme normal selon l'Organisation Mondiale de la Santé."
    },
    {
      question: "Mon IMC est-il fiable ?",
      answer: "L'IMC est un bon indicateur général, mais ne tient pas compte de facteurs comme la masse musculaire, la répartition des graisses ou des différences morphologiques individuelles."
    },
    {
      question: "À quelle fréquence calculer son IMC ?",
      answer: "Pour un suivi régulier, il est recommandé de calculer son IMC tous les 3 à 6 mois, ou après tout changement significatif de mode de vie."
    }
  ];

  return (
    <>
      <SEO 
        title="Calculatrice IMC en ligne gratuite | Calcul d'Indice de Masse Corporelle"
        description="Calculez votre IMC (Indice de Masse Corporelle) gratuitement avec notre calculatrice en ligne. Découvrez si vous avez un poids santé, surpoids ou obésité avec notre outil simple à utiliser."
        keywords="calculatrice imc, calcul imc, indice masse corporelle, imc en ligne, imc gratuit, poids idéal, imc normal, imc surpoids, imc obésité, poids santé, calculer son imc"
        hasFAQ={true}
        faqItems={faqItems}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] p-4 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Calculatrice IMC en Ligne Gratuite
          </h1>
          <h2 className="text-xl text-white text-center mb-8">
            Calculez facilement votre Indice de Masse Corporelle
          </h2>

          <Card className="p-6 shadow-lg rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calculator className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Calculatrice d'IMC
              </h2>
            </div>

            <form onSubmit={handleCalculation} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="poids" className="text-gray-700">
                    Votre poids (kg)
                  </Label>
                  <Input
                    id="poids"
                    type="number"
                    placeholder="Ex: 70"
                    value={poids}
                    onChange={(e) => setPoids(e.target.value)}
                    step="0.1"
                    min="30"
                    max="300"
                    required
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taille" className="text-gray-700">
                    Votre taille (cm)
                  </Label>
                  <Input
                    id="taille"
                    type="number"
                    placeholder="Ex: 175"
                    value={taille}
                    onChange={(e) => setTaille(e.target.value)}
                    step="1"
                    min="100"
                    max="250"
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
              >
                Calculer mon IMC
              </Button>
            </form>

            {imc !== null && (
              <div className={`mt-8 p-4 rounded-lg ${getCategorieClass()}`}>
                <h3 className="text-xl font-semibold mb-2">Votre résultat :</h3>
                <p className="text-2xl font-bold mb-2">
                  IMC : {imc}
                </p>
                <p className="mb-4">
                  Catégorie : <span className="font-semibold">{categorie}</span>
                </p>
                <div className="flex items-start gap-2 text-sm">
                  <InfoIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>Ces informations sont fournies à titre indicatif. Consultez un professionnel de santé pour une évaluation personnalisée.</p>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6 mt-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Comprendre l'IMC (Indice de Masse Corporelle)</h2>
            <p className="mb-4">
              L'IMC est un indicateur qui permet d'évaluer rapidement votre corpulence en fonction de votre taille et de votre poids. C'est un outil utilisé par les professionnels de santé pour estimer la corpulence et les éventuels risques pour la santé associés.
            </p>

            <h3 className="text-lg font-semibold mb-2 mt-6">Les catégories d'IMC</h3>
            <div className="space-y-2">
              <div className="p-2 bg-blue-50 rounded-md">
                <p><span className="font-semibold">Moins de 18,5</span> : Insuffisance pondérale (maigreur)</p>
              </div>
              <div className="p-2 bg-green-50 rounded-md">
                <p><span className="font-semibold">18,5 à 24,9</span> : Corpulence normale (poids santé)</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-md">
                <p><span className="font-semibold">25 à 29,9</span> : Surpoids</p>
              </div>
              <div className="p-2 bg-red-50 rounded-md">
                <p><span className="font-semibold">30 et plus</span> : Obésité</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 mt-6">Limites de l'IMC</h3>
            <p>
              L'IMC ne tient pas compte de certains facteurs importants comme la répartition des graisses, la masse musculaire, le sexe ou l'âge. Il peut donc ne pas être adapté à certaines personnes, notamment les athlètes, les femmes enceintes ou les personnes âgées.
            </p>
          </Card>

          <div className="mt-8 text-center text-white">
            <p className="text-sm">
              Cette calculatrice d'IMC ne remplace pas l'avis médical professionnel. Consultez toujours un médecin pour des conseils personnalisés.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatriceIMC;
