import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlansProps {
  onSelectPlan: (plan: "free" | "premium") => void;
}

const SubscriptionPlans = ({ onSelectPlan }: SubscriptionPlansProps) => {
  const { toast } = useToast();

  const handlePremiumSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour vous abonner au Premium.",
          variant: "destructive",
        });
        return;
      }

      console.log("Creating checkout session...");
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error("Error creating checkout session:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la session de paiement.",
          variant: "destructive",
        });
        return;
      }

      console.log("Redirecting to Stripe checkout:", data.url);
      // Rediriger vers Stripe Checkout dans un nouvel onglet
      window.open(data.url, '_blank');
      
    } catch (error) {
      console.error("Error in handlePremiumSubscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choisissez votre formule</h2>
        <p className="text-white/80 max-w-xl mx-auto">
          Sélectionnez la formule qui correspond le mieux à vos besoins et à vos objectifs fitness
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Gratuit */}
        <Card className="overflow-hidden border-white/20 bg-white/10 backdrop-blur-lg relative">
          <div className="bg-blue-500/70 text-white text-xs font-bold px-3 py-1 absolute top-0 left-0 rounded-br-md">
            GRATUIT
          </div>
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Plan Gratuit</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">0€</span>
            </div>
            <p className="text-white/70 mt-2">Pour découvrir les bases</p>
          </div>

          <div className="p-6 space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Programme basique de 2 jours/semaine</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Exercices simples sans équipement</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Calendrier d'entraînement basique</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white/50">Personnalisation complète des exercices</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white/50">Plan nutritionnel détaillé</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white/50">Analyses et suivi de progression</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white/50">Mises à jour adaptatives du programme</span>
              </li>
            </ul>

            <Button 
              onClick={() => onSelectPlan("free")} 
              className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg border-2 border-white/30 font-semibold text-base py-6"
              size="lg"
            >
              Commencer gratuitement
            </Button>
          </div>
        </Card>

        {/* Plan Premium */}
        <Card className="overflow-hidden border-white/20 bg-white/10 backdrop-blur-lg relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-md">
            RECOMMANDÉ
          </div>
          <div className="p-6 border-b border-white/10 bg-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Plan Premium</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">99,99€</span>
              <span className="text-white/70 ml-1">/an</span>
            </div>
            <p className="text-white/70 mt-2">Programme personnalisé complet</p>
          </div>

          <div className="p-6 space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Programme complet jusqu'à 6 jours/semaine</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Exercices personnalisés selon votre niveau</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Calendrier d'entraînement interactif</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Plan nutritionnel détaillé et personnalisé</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Analyses et prédictions basées sur l'IA</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Mises à jour mensuelles de votre programme</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-white">Support prioritaire par email</span>
              </li>
            </ul>

            <Button 
              onClick={handlePremiumSubscription}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 shadow-lg hover:shadow-xl font-semibold text-base py-6"
              size="lg"
            >
              S'abonner au Premium
            </Button>
          </div>
        </Card>
      </div>

      <div className="text-center text-white/60 text-sm">
        <p>Pas de frais cachés. Annulez à tout moment.</p>
        <p className="mt-1">L'abonnement Premium se renouvelle automatiquement après 1 an.</p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
