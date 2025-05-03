
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SymptomRequest {
  symptoms: string;
  severity?: string;
  duration?: string;
}

interface ConditionResult {
  name: string;
  confidence: number;
  description: string;
  recommendations: string;
  urgencyLevel: "low" | "medium" | "high";
}

interface AnalysisResult {
  possibleConditions: ConditionResult[];
  generalAdvice: string;
  followUpQuestions?: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symptoms, severity = "moderate", duration = "days" } = await req.json() as SymptomRequest;

    if (!symptoms) {
      return new Response(
        JSON.stringify({ error: "Les symptômes sont requis" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment variables
    const apiKey = Deno.env.get('PERPLEXITY_API_KEY');
    
    if (!apiKey) {
      throw new Error("Clé API Perplexity manquante");
    }

    const prompt = `
    Tu es un assistant médical IA. Analyse les symptômes suivants et fournis une évaluation médicale préliminaire.
    IMPORTANT: Réponds UNIQUEMENT au format JSON sans aucun texte additionnel, car ta réponse sera parsée par un système.

    Symptômes: ${symptoms}
    Intensité: ${severity}
    Durée: ${duration}

    Format de réponse JSON requis:
    {
      "possibleConditions": [
        {
          "name": "Nom de la condition possible",
          "confidence": <valeur numérique entre 1 et 100>,
          "description": "Brève description de la condition",
          "recommendations": "Recommandations spécifiques",
          "urgencyLevel": "low|medium|high" 
        }
      ],
      "generalAdvice": "Conseil général pour ces symptômes",
      "followUpQuestions": ["Question 1", "Question 2"] 
    }

    N'oublie pas d'inclure un avertissement sur le fait que cette analyse ne remplace pas une consultation médicale professionnelle dans le champ "generalAdvice".
    Limite ta réponse à 2-3 conditions possibles maximum, classées par ordre de probabilité, et ne donne que des conseils généraux prudents.
    Les recommandations doivent toujours inclure de consulter un médecin si les symptômes persistent ou s'aggravent.
    L'urgence "high" ne doit être utilisée que pour des symptômes potentiellement graves nécessitant une attention médicale immédiate.
    `;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API error:', errorData);
      throw new Error(`Error calling Perplexity API: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    console.log("Raw AI response:", analysisText);
    
    let analysisResult: AnalysisResult;
    
    try {
      // Try to parse the AI response as JSON
      analysisResult = JSON.parse(analysisText);
      
      // Validate the response structure
      if (!analysisResult.possibleConditions || !analysisResult.generalAdvice) {
        throw new Error("Invalid response format");
      }
      
      // Add disclaimer if not present
      if (!analysisResult.generalAdvice.includes("ne remplace pas")) {
        analysisResult.generalAdvice += " IMPORTANT: Cette analyse ne remplace pas une consultation avec un professionnel de santé.";
      }
      
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      
      // Fallback with a generic response
      analysisResult = {
        possibleConditions: [
          {
            name: "Analyse non concluante",
            confidence: 50,
            description: "Notre système n'a pas pu fournir une analyse précise basée sur les symptômes décrits.",
            recommendations: "Consultez un professionnel de santé pour une évaluation appropriée.",
            urgencyLevel: "medium"
          }
        ],
        generalAdvice: "Compte tenu des symptômes décrits, il est recommandé de consulter un professionnel de santé pour une évaluation complète. Cette analyse automatisée ne remplace pas un avis médical professionnel.",
        followUpQuestions: [
          "Avez-vous consulté un médecin récemment?",
          "Y a-t-il des antécédents médicaux pertinents que vous n'avez pas mentionnés?"
        ]
      };
    }

    // Log the result for debugging
    console.log("Returning analysis result for symptoms:", symptoms);
    
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in analyze-symptoms function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
