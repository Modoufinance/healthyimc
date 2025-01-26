import { TranslationType } from "./types";

export const translations: Record<string, TranslationType> = {
  fr: {
    title: "Calculatrice IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    bmiHistory: "Historique IMC",
    bmiPredictions: "Prédictions IMC",  // Added this line
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
    }
  },
  wo: {
    title: "Toolu Kanam BMI",
    subtitle: "Naw sa BMI",
    bmiHistory: "Jaar-jaari BMI",
    bmiPredictions: "Gis-gis BMI",  // Added this line
    categories: {
      underweight: "Jëmm bu sew",
      normal: "Jëmm bu néew",
      overweight: "Jëmm bu bare",
      obese: "Naatangoo bu dëgër"
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
      age: "At",
      weight: "Jëmm",
      height: "Yaatuwaay",
      activity: "Doxalin",
      goals: "Yéene yi"
    },
    placeholders: {
      age: "Duggal sa at",
      weight: "Ex: 70",
      height: "Ex: 175",
      goals: "Ex: Wàññi jëmm, Yokk doole"
    },
    activities: {
      low: "Néew",
      moderate: "Digg",
      high: "Bare"
    },
    buttons: {
      calculate: "Naw BMI",
      analyze: "Saytu sama wér-gi-yaram"
    },
    advice: {
      underweight: "Jëmm bu sew la. Wàcceek boppalante bi.",
      normal: "Jëmm bu néew nga. Bokk ci jamm wi ñu ko topp !",
      overweight: "Jëmm bu bare nga. Wàcceek boppalante bi ci mat na.",
      obese: "Naatangoo bu dëgër la. Jëlal waxtaan ak boppalante."
    }
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index",
    bmiHistory: "BMI History",
    bmiPredictions: "BMI Predictions",  // Added this line
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
    }
  }
};