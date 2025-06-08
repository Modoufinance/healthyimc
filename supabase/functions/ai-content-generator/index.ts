
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateContentRequest {
  topic: string;
  type: 'article' | 'seo_optimization' | 'excerpt';
  category: string;
  existingContent?: string;
  language?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { topic, type, category, existingContent, language = 'fr' }: GenerateContentRequest = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case 'article':
        systemPrompt = `Tu es un expert en santé et nutrition qui écrit des articles de blog en ${language} sur la santé, le bien-être et l'IMC. 
        Crée du contenu informatif, engageant et optimisé SEO. Utilise du HTML structuré avec des balises h2, h3, p, ul, li pour une bonne lisibilité.`;
        userPrompt = `Génère un article complet sur le sujet "${topic}" dans la catégorie "${category}". 
        L'article doit faire environ 800-1200 mots, être bien structuré avec des sous-titres, et inclure des conseils pratiques.`;
        break;
        
      case 'seo_optimization':
        systemPrompt = `Tu es un expert SEO qui optimise le contenu pour les moteurs de recherche en ${language}.`;
        userPrompt = `Pour l'article suivant sur "${topic}", génère :
        1. Un meta-titre optimisé (max 60 caractères)
        2. Une meta-description optimisée (max 160 caractères)
        3. Un extrait accrocheur (max 200 caractères)
        4. 5 tags pertinents
        
        Contenu existant : ${existingContent}
        
        Réponds au format JSON : {"meta_title": "", "meta_description": "", "excerpt": "", "tags": []}`;
        break;
        
      case 'excerpt':
        systemPrompt = `Tu es un rédacteur expert qui crée des extraits accrocheurs en ${language}.`;
        userPrompt = `Crée un extrait de 150-200 caractères pour cet article sur "${topic}" :
        ${existingContent}`;
        break;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: type === 'article' ? 2000 : 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Log generation for analytics
    console.log(`Generated ${type} for topic: ${topic}`);

    return new Response(JSON.stringify({ 
      content: generatedContent,
      type,
      topic,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-content-generator:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de la génération de contenu',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
