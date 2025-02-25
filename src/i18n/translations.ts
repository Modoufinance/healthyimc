
import { TranslationType } from "./types";

export const translations: Record<string, TranslationType> = {
  fr: {
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    bmiHistory: "Historique IMC",
    bmiPredictions: "Prédictions IMC",
    disclaimer: "Les informations fournies sont à titre indicatif uniquement et ne remplacent pas l'avis d'un professionnel de santé.",
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Poids normal",
      overweight: "Surpoids",
      obese: "Obésité"
    },
    units: {
      weight: {
        unit: "kg",
        factor: 1
      },
      height: {
        unit: "cm",
        factor: 1
      }
    },
    labels: {
      age: "Âge",
      weight: "Poids",
      height: "Taille",
      activity: "Niveau d'activité",
      goals: "Objectifs de santé"
    },
    placeholders: {
      age: "Entrez votre âge",
      weight: "Ex: 70",
      height: "Ex: 175",
      goals: "Ex: Perdre du poids, Gagner en muscle"
    },
    activities: {
      low: "Faible",
      moderate: "Modéré",
      high: "Élevé"
    },
    buttons: {
      calculate: "Calculer l'IMC",
      analyze: "Analyser ma santé"
    },
    advice: {
      underweight: "Vous êtes en dessous du poids recommandé. Pensez à consulter un professionnel de santé pour des conseils alimentaires.",
      normal: "Votre poids est dans la plage normale. Continuez à maintenir un mode de vie sain !",
      overweight: "Vous êtes en surpoids. Un professionnel de santé peut vous aider à établir un programme adapté.",
      obese: "Vous êtes en obésité. Il est important de consulter un professionnel de santé pour des conseils personnalisés."
    },
    faq: {
      title: "Questions fréquentes sur l'IMC",
      items: [
        {
          question: "Qu'est-ce que l'IMC ?",
          answer: "L'Indice de Masse Corporelle (IMC) est un calcul qui utilise votre taille et votre poids pour déterminer si votre poids est dans une fourchette saine."
        },
        {
          question: "Comment l'IMC est-il calculé ?",
          answer: "L'IMC est calculé en divisant votre poids en kilogrammes par le carré de votre taille en mètres (kg/m²)."
        },
        {
          question: "L'IMC est-il fiable pour tout le monde ?",
          answer: "L'IMC est un indicateur général qui ne tient pas compte de facteurs comme la masse musculaire, l'âge ou le sexe. Il doit être interprété avec d'autres mesures de santé."
        }
      ]
    },
    education: {
      title: "Comprendre votre IMC",
      sections: [
        {
          title: "Les catégories d'IMC",
          content: "Un IMC inférieur à 18.5 indique une insuffisance pondérale, entre 18.5 et 24.9 un poids normal, entre 25 et 29.9 un surpoids, et au-dessus de 30 une obésité."
        },
        {
          title: "Facteurs à considérer",
          content: "L'IMC ne distingue pas le muscle de la graisse et peut ne pas être adapté aux athlètes, personnes âgées ou femmes enceintes."
        }
      ]
    }
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    bmiHistory: "BMI History",
    bmiPredictions: "BMI Predictions",
    disclaimer: "The information provided is for informational purposes only and does not substitute professional medical advice.",
    categories: {
      underweight: "Underweight",
      normal: "Normal weight",
      overweight: "Overweight",
      obese: "Obese"
    },
    units: {
      weight: {
        unit: "lb",
        factor: 2.20462
      },
      height: {
        unit: "in",
        factor: 0.393701
      }
    },
    labels: {
      age: "Age",
      weight: "Weight",
      height: "Height",
      activity: "Activity Level",
      goals: "Health Goals"
    },
    placeholders: {
      age: "Enter your age",
      weight: "Ex: 154",
      height: "Ex: 69",
      goals: "Ex: Lose weight, Gain muscle"
    },
    activities: {
      low: "Low",
      moderate: "Moderate",
      high: "High"
    },
    buttons: {
      calculate: "Calculate BMI",
      analyze: "Analyze my health"
    },
    advice: {
      underweight: "You are under the recommended weight. Consider consulting a healthcare professional for dietary advice.",
      normal: "Your weight is within the normal range. Keep up a healthy lifestyle!",
      overweight: "You are overweight. A healthcare professional can help you create a suitable program.",
      obese: "You are in the obesity range. It is important to consult a healthcare professional for personalized advice."
    },
    faq: {
      title: "Frequently Asked Questions about BMI",
      items: [
        {
          question: "What is BMI?",
          answer: "Body Mass Index (BMI) is a calculation that uses your height and weight to determine if your weight is in a healthy range."
        },
        {
          question: "How is BMI calculated?",
          answer: "BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²)."
        },
        {
          question: "Is BMI reliable for everyone?",
          answer: "BMI is a general indicator that doesn't account for factors like muscle mass, age, or gender. It should be interpreted alongside other health measures."
        }
      ]
    },
    education: {
      title: "Understanding your BMI",
      sections: [
        {
          title: "BMI Categories",
          content: "A BMI below 18.5 indicates underweight, between 18.5 and 24.9 normal weight, between 25 and 29.9 overweight, and above 30 obesity."
        },
        {
          title: "Factors to Consider",
          content: "BMI doesn't distinguish between muscle and fat and may not be suitable for athletes, elderly people, or pregnant women."
        }
      ]
    }
  }
};
