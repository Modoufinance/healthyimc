
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, Weight, Activity } from "lucide-react";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import FitnessPlanCard from "@/components/fitness/FitnessPlanCard";
import SubscriptionPlans from "@/components/fitness/SubscriptionPlans";
import WorkoutCalendar from "@/components/fitness/WorkoutCalendar";

const AIFitnessProgram = () => {
  const [userProfile, setUserProfile] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    fitnessLevel: "",
    daysPerWeek: "",
    healthConditions: "",
  });
  const [currentStep, setCurrentStep] = useState<"profile" | "plans" | "program">("profile");
  const [subscription, setSubscription] = useState<"free" | "premium" | null>(null);
  const { toast } = useToast();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Programme d'Entraînement Fitness IA | HealthyIMC",
    "description": "Programme d'entraînement personnalisé basé sur l'IA adapté à votre IMC et vos objectifs",
    "provider": {
      "@type": "Organization",
      "name": "HealthyIMC"
    },
    "offers": {
      "@type": "Offer",
      "price": "99.99",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields = ["age", "gender", "weight", "height", "goal", "fitnessLevel", "daysPerWeek"];
    const missingFields = requiredFields.filter(field => !userProfile[field as keyof typeof userProfile]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Proceed to plan selection
    setCurrentStep("plans");
  };

  const selectSubscription = (plan: "free" | "premium") => {
    setSubscription(plan);
    if (plan === "free") {
      // For free plan, show program immediately
      setCurrentStep("program");
      toast({
        title: "Programme généré",
        description: "Votre programme d'entraînement gratuit a été généré.",
      });
    } else {
      // For premium, we would typically redirect to a payment page
      // Simulating successful payment for demo purposes
      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers notre page de paiement sécurisé.",
      });
      
      // Simulate payment processing
      setTimeout(() => {
        setCurrentStep("program");
        toast({
          title: "Paiement confirmé",
          description: "Votre abonnement premium est actif. Votre programme personnalisé est prêt!",
        });
      }, 2000);
    }
  };

  return (
    <>
      <SEO
        title="Programme d'Entraînement Fitness IA | HealthyIMC"
        description="Découvrez notre programme d'entraînement personnalisé basé sur l'IA. Adapté à votre IMC et à vos objectifs personnels."
        keywords="programme fitness IA, entraînement personnalisé, coach fitness virtuel, plan d'entraînement personnalisé"
        canonicalUrl="https://santeimc.fr/programme-fitness-ia"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#4facfe] to-[#00f2fe] py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <header className="text-center mb-10">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg px-6 py-2 rounded-full mb-4">
              <Dumbbell className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Programme d'Entraînement Personnalisé</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Votre Coach Fitness Personnel IA</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Programme d'entraînement sur mesure basé sur votre profil, vos objectifs et votre IMC
            </p>
          </header>

          <Card className="bg-white/20 backdrop-blur-lg border-white/10 p-6 rounded-xl">
            {currentStep === "profile" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Créez votre profil fitness</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="age" className="text-white">Âge</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Entrez votre âge"
                      value={userProfile.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      className="bg-white/30 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">Genre</Label>
                    <Select value={userProfile.gender} onValueChange={(value) => handleChange("gender", value)}>
                      <SelectTrigger className="bg-white/30 border-white/30 text-white">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-white">Poids (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Entrez votre poids"
                      value={userProfile.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      className="bg-white/30 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-white">Taille (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Entrez votre taille"
                      value={userProfile.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      className="bg-white/30 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal" className="text-white">Objectif principal</Label>
                    <Select value={userProfile.goal} onValueChange={(value) => handleChange("goal", value)}>
                      <SelectTrigger className="bg-white/30 border-white/30 text-white">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Perte de poids</SelectItem>
                        <SelectItem value="muscle-gain">Prise de masse musculaire</SelectItem>
                        <SelectItem value="endurance">Amélioration de l'endurance</SelectItem>
                        <SelectItem value="general">Amélioration de la condition physique générale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fitnessLevel" className="text-white">Niveau de fitness actuel</Label>
                    <Select value={userProfile.fitnessLevel} onValueChange={(value) => handleChange("fitnessLevel", value)}>
                      <SelectTrigger className="bg-white/30 border-white/30 text-white">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="daysPerWeek" className="text-white">Jours d'entraînement par semaine</Label>
                    <Select value={userProfile.daysPerWeek} onValueChange={(value) => handleChange("daysPerWeek", value)}>
                      <SelectTrigger className="bg-white/30 border-white/30 text-white">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 jours</SelectItem>
                        <SelectItem value="3">3 jours</SelectItem>
                        <SelectItem value="4">4 jours</SelectItem>
                        <SelectItem value="5">5 jours</SelectItem>
                        <SelectItem value="6">6 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="healthConditions" className="text-white">Conditions médicales particulières (optionnel)</Label>
                    <Input
                      id="healthConditions"
                      placeholder="Ex: problèmes de dos, arthrite, etc."
                      value={userProfile.healthConditions}
                      onChange={(e) => handleChange("healthConditions", e.target.value)}
                      className="bg-white/30 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90">
                    Générer mon programme personnalisé
                  </Button>
                </div>
              </form>
            )}

            {currentStep === "plans" && (
              <SubscriptionPlans onSelectPlan={selectSubscription} />
            )}

            {currentStep === "program" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Votre Programme Personnalisé</h2>
                  <Badge variant={subscription === "premium" ? "default" : "secondary"} className="px-3 py-1">
                    {subscription === "premium" ? "Premium" : "Gratuit"}
                  </Badge>
                </div>

                <Tabs defaultValue="program" className="w-full">
                  <TabsList className="bg-white/20 w-full mb-6">
                    <TabsTrigger value="program" className="flex-1">Programme</TabsTrigger>
                    <TabsTrigger value="calendar" className="flex-1">Calendrier</TabsTrigger>
                    <TabsTrigger value="nutrition" className="flex-1">Nutrition</TabsTrigger>
                    {subscription === "premium" && (
                      <TabsTrigger value="analytics" className="flex-1">Analyses</TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="program">
                    <div className="space-y-6">
                      {subscription === "premium" ? (
                        // Programme premium avec plus de détails
                        <>
                          <FitnessPlanCard 
                            title="Jour 1 - Haut du Corps" 
                            exercises={[
                              { name: "Pompes", sets: 3, reps: "10-12", rest: "60 sec" },
                              { name: "Tractions assistées", sets: 3, reps: "8-10", rest: "90 sec" },
                              { name: "Développé épaules", sets: 3, reps: "12-15", rest: "60 sec" },
                              { name: "Curl biceps", sets: 3, reps: "12 par bras", rest: "45 sec" },
                              { name: "Extensions triceps", sets: 3, reps: "12-15", rest: "60 sec" }
                            ]}
                            intensity="Modérée"
                            duration="45-60 min"
                            isPremium={true}
                          />
                          <FitnessPlanCard 
                            title="Jour 2 - Bas du Corps" 
                            exercises={[
                              { name: "Squats", sets: 4, reps: "10-12", rest: "90 sec" },
                              { name: "Fentes avant", sets: 3, reps: "10 par jambe", rest: "60 sec" },
                              { name: "Extensions de jambes", sets: 3, reps: "12-15", rest: "60 sec" },
                              { name: "Soulevés de terre roumain", sets: 3, reps: "10-12", rest: "90 sec" },
                              { name: "Élévations de mollets", sets: 4, reps: "15-20", rest: "45 sec" }
                            ]}
                            intensity="Modérée-Élevée"
                            duration="50-65 min"
                            isPremium={true}
                          />
                          <FitnessPlanCard 
                            title="Jour 3 - Cardio et Core" 
                            exercises={[
                              { name: "HIIT (30s effort/30s repos)", sets: 10, reps: "cycles", rest: "2 min entre blocs" },
                              { name: "Planche", sets: 3, reps: "30-45 sec", rest: "30 sec" },
                              { name: "Crunchs", sets: 3, reps: "15-20", rest: "45 sec" },
                              { name: "Mountain climbers", sets: 3, reps: "20 par jambe", rest: "45 sec" },
                              { name: "Russian twists", sets: 3, reps: "15 par côté", rest: "60 sec" }
                            ]}
                            intensity="Élevée"
                            duration="40-50 min"
                            isPremium={true}
                          />
                        </>
                      ) : (
                        // Programme gratuit basique
                        <>
                          <FitnessPlanCard 
                            title="Jour 1 - Entraînement complet" 
                            exercises={[
                              { name: "Pompes", sets: 3, reps: "À votre rythme", rest: "60 sec" },
                              { name: "Squats sans poids", sets: 3, reps: "15", rest: "60 sec" },
                              { name: "Planche", sets: 2, reps: "30 sec", rest: "45 sec" }
                            ]}
                            intensity="Faible-Modérée"
                            duration="20-30 min"
                            isPremium={false}
                          />
                          <FitnessPlanCard 
                            title="Jour 2 - Cardio simple" 
                            exercises={[
                              { name: "Marche rapide", sets: 1, reps: "20 min", rest: "N/A" },
                              { name: "Jumping jacks", sets: 3, reps: "30 sec", rest: "30 sec" },
                              { name: "Montées de genoux", sets: 2, reps: "30 sec", rest: "30 sec" }
                            ]}
                            intensity="Faible-Modérée"
                            duration="25-30 min"
                            isPremium={false}
                          />
                          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center text-center">
                            <Badge variant="outline" className="mb-4 border-white/40 text-white">
                              Contenu Premium
                            </Badge>
                            <h3 className="text-xl font-semibold text-white mb-2">Débloquez votre programme complet</h3>
                            <p className="text-white/80 mb-4">
                              Passez à l'abonnement premium pour accéder à un programme personnalisé complet avec plus de jours d'entraînement, des exercices avancés et un suivi détaillé.
                            </p>
                            <Button 
                              onClick={() => setCurrentStep("plans")}
                              className="bg-white text-primary hover:bg-white/90"
                            >
                              Passer à Premium
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="calendar">
                    <WorkoutCalendar isPremium={subscription === "premium"} />
                  </TabsContent>

                  <TabsContent value="nutrition">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Recommandations nutritionnelles</h3>
                      <div className="space-y-4">
                        <div className="bg-white/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">Apport calorique recommandé</h4>
                          <p className="text-white/90">
                            {subscription === "premium" 
                              ? `Basé sur votre profil: ${Math.round(
                                  parseInt(userProfile.gender === "female" ? "2000" : "2500") * 
                                  (parseInt(userProfile.fitnessLevel === "beginner" ? "0.9" : 
                                   userProfile.fitnessLevel === "intermediate" ? "1.0" : "1.1"))
                                )} calories/jour` 
                              : "Passez à Premium pour des recommandations personnalisées"}
                          </p>
                        </div>

                        <div className="bg-white/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">Répartition macronutriments</h4>
                          {subscription === "premium" ? (
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center">
                                <div className="text-white text-lg font-semibold">30%</div>
                                <div className="text-white/80 text-sm">Protéines</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white text-lg font-semibold">40%</div>
                                <div className="text-white/80 text-sm">Glucides</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white text-lg font-semibold">30%</div>
                                <div className="text-white/80 text-sm">Lipides</div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-white/90">Passez à Premium pour des recommandations personnalisées</p>
                          )}
                        </div>

                        {subscription === "premium" && (
                          <>
                            <div className="bg-white/20 p-4 rounded-lg">
                              <h4 className="font-semibold text-white mb-2">Timing des repas</h4>
                              <ul className="list-disc list-inside text-white/90 space-y-1">
                                <li>Petit-déjeuner: Riche en protéines et glucides complexes</li>
                                <li>Collation: 2-3 heures après le petit-déjeuner</li>
                                <li>Déjeuner: Équilibré avec légumes, protéines maigres</li>
                                <li>Collation pré-entraînement: 1h avant l'exercice</li>
                                <li>Repas post-entraînement: Dans les 45 minutes suivant l'effort</li>
                              </ul>
                            </div>
                            <div className="bg-white/20 p-4 rounded-lg">
                              <h4 className="font-semibold text-white mb-2">Hydratation</h4>
                              <p className="text-white/90">
                                Objectif quotidien: {Math.round(parseInt(userProfile.weight) * 0.033)} litres d'eau
                                <br />
                                Augmentez de 500ml les jours d'entraînement intense
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {!subscription || subscription === "free" ? (
                        <div className="mt-6 text-center">
                          <Button 
                            onClick={() => setCurrentStep("plans")}
                            className="bg-white text-primary hover:bg-white/90"
                          >
                            Débloquer le plan nutritionnel complet
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </TabsContent>
                  
                  {subscription === "premium" && (
                    <TabsContent value="analytics">
                      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Analyses et suivi de progression</h3>
                        <div className="space-y-6">
                          <div className="bg-white/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-4">Statistiques d'entraînement</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-white/20 p-3 rounded-lg text-center">
                                <span className="text-white/60 text-sm">Volume hebdo</span>
                                <div className="text-white font-bold text-xl">4.5 h</div>
                              </div>
                              <div className="bg-white/20 p-3 rounded-lg text-center">
                                <span className="text-white/60 text-sm">Calories brûlées</span>
                                <div className="text-white font-bold text-xl">2,450</div>
                              </div>
                              <div className="bg-white/20 p-3 rounded-lg text-center">
                                <span className="text-white/60 text-sm">Séances</span>
                                <div className="text-white font-bold text-xl">12/16</div>
                              </div>
                              <div className="bg-white/20 p-3 rounded-lg text-center">
                                <span className="text-white/60 text-sm">Progression</span>
                                <div className="text-white font-bold text-xl">+15%</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Évolution de la condition physique</h4>
                            <div className="h-40 bg-white/10 rounded-lg flex items-center justify-center">
                              <p className="text-white/70 text-center">Graphique d'évolution interactive<br />(Commencez à enregistrer vos séances)</p>
                            </div>
                          </div>

                          <div className="bg-white/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Prédictions IA</h4>
                            <p className="text-white/90 mb-2">
                              Basé sur votre profil et votre progression, notre IA prévoit:
                            </p>
                            <ul className="list-disc list-inside text-white/90 space-y-1 pl-2">
                              <li>Objectif de perte de poids atteignable en 8 semaines</li>
                              <li>Amélioration de l'endurance de 35% d'ici 3 mois</li>
                              <li>Augmentation de la force de 22% sur les exercices principaux</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}
          </Card>

          <footer className="mt-10 text-center text-white/70 text-sm">
            <p>© {new Date().getFullYear()} HealthyIMC - Programme d'Entraînement IA</p>
            <p className="mt-1">
              Consultez toujours un professionnel de santé avant de commencer un nouveau programme d'exercice.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AIFitnessProgram;
