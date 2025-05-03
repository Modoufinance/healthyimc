
import * as React from 'react';
import SEO from "@/components/SEO";
import { useLanguage } from '@/contexts/LanguageContext';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Définir le schéma de validation pour le formulaire
const formSchema = z.object({
  poids: z.coerce.number().min(30, "Le poids minimum est de 30 kg").max(300, "Le poids maximum est de 300 kg"),
  taille: z.coerce.number().min(100, "La taille minimum est de 100 cm").max(250, "La taille maximum est de 250 cm"),
  sexe: z.string().min(1, "Veuillez sélectionner votre sexe"),
  age: z.coerce.number().min(18, "L'âge minimum est de 18 ans").max(120, "L'âge maximum est de 120 ans"),
});

const IMCCalculator = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<{ imc: number; category: string; color: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poids: undefined,
      taille: undefined,
      sexe: "",
      age: undefined,
    },
  });

  const calculateIMC = (values: z.infer<typeof formSchema>) => {
    const heightInMeters = values.taille / 100;
    const imc = values.poids / (heightInMeters * heightInMeters);
    const roundedIMC = Math.round(imc * 10) / 10;

    let category = "";
    let color = "";

    if (imc < 18.5) {
      category = "Insuffisance pondérale";
      color = "text-blue-500";
    } else if (imc >= 18.5 && imc < 25) {
      category = "Poids normal";
      color = "text-green-500";
    } else if (imc >= 25 && imc < 30) {
      category = "Surpoids";
      color = "text-yellow-500";
    } else if (imc >= 30 && imc < 35) {
      category = "Obésité modérée";
      color = "text-orange-500";
    } else if (imc >= 35 && imc < 40) {
      category = "Obésité sévère";
      color = "text-red-500";
    } else {
      category = "Obésité morbide";
      color = "text-red-700";
    }

    return { imc: roundedIMC, category, color };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const result = calculateIMC(values);
    setResult(result);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <SEO 
        title="Calculatrice IMC - HealthyIMC"
        description="Calculez votre Indice de Masse Corporelle (IMC) avec notre calculatrice en ligne gratuite et obtenez des conseils personnalisés."
        keywords="IMC, calculatrice IMC, indice masse corporelle, santé, poids, taille"
      />

      <h1 className="text-3xl font-bold text-center mb-8">Calculatrice d'Indice de Masse Corporelle (IMC)</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculez votre IMC</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="poids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taille"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taille (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="170" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sexe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre sexe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="homme">Homme</SelectItem>
                          <SelectItem value="femme">Femme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Âge</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Calculer mon IMC</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold">Votre IMC est: <span className={result.color}>{result.imc}</span></div>
                <div className="text-xl">Catégorie: <span className={result.color}>{result.category}</span></div>
                <div className="mt-6 text-sm text-gray-600">
                  <p>L'IMC est une mesure qui permet d'évaluer la corpulence d'une personne.</p>
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    <li><span className="text-blue-500 font-medium">Moins de 18,5</span>: Insuffisance pondérale</li>
                    <li><span className="text-green-500 font-medium">18,5 à 24,9</span>: Poids normal</li>
                    <li><span className="text-yellow-500 font-medium">25 à 29,9</span>: Surpoids</li>
                    <li><span className="text-orange-500 font-medium">30 à 34,9</span>: Obésité modérée</li>
                    <li><span className="text-red-500 font-medium">35 à 39,9</span>: Obésité sévère</li>
                    <li><span className="text-red-700 font-medium">40 et plus</span>: Obésité morbide</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Remplissez le formulaire pour calculer votre IMC
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 prose max-w-none">
        <h2>Qu'est-ce que l'IMC?</h2>
        <p>
          L'indice de masse corporelle (IMC) est une mesure qui permet d'évaluer la corpulence d'une personne.
          Il se calcule en divisant le poids (en kg) par le carré de la taille (en mètre).
          L'IMC est utilisé par les professionnels de la santé pour déterminer si une personne présente un risque accru de problèmes de santé liés au poids.
        </p>
        
        <h2>Limites de l'IMC</h2>
        <p>
          L'IMC est un indicateur simple mais il présente certaines limites:
        </p>
        <ul>
          <li>Il ne tient pas compte de la répartition des graisses dans l'organisme</li>
          <li>Il ne fait pas la différence entre la masse musculaire et la masse grasse</li>
          <li>Il peut être moins précis pour les sportifs, les personnes âgées, les femmes enceintes ou qui allaitent</li>
        </ul>
        
        <h2>Conseils pour maintenir un poids santé</h2>
        <ul>
          <li>Adoptez une alimentation équilibrée et variée</li>
          <li>Pratiquez une activité physique régulière</li>
          <li>Buvez suffisamment d'eau</li>
          <li>Limitez la consommation d'aliments transformés, de sucres et de graisses saturées</li>
          <li>Consultez un professionnel de la santé pour des conseils personnalisés</li>
        </ul>
      </div>
    </div>
  );
};

export default IMCCalculator;
