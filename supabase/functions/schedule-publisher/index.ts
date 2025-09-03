import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Démarrage de la fonction de publication programmée');

    // Récupérer les articles programmés dont la date de publication est arrivée
    const now = new Date().toISOString();
    
    const { data: scheduledArticles, error: fetchError } = await supabase
      .from('cms_articles')
      .select('id, title, slug, scheduled_at')
      .eq('published', false)
      .not('scheduled_at', 'is', null)
      .lte('scheduled_at', now);

    if (fetchError) {
      console.error('Erreur lors de la récupération des articles programmés:', fetchError);
      throw fetchError;
    }

    console.log(`Trouvé ${scheduledArticles?.length || 0} article(s) à publier`);

    if (!scheduledArticles || scheduledArticles.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'Aucun article à publier',
        published: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let publishedCount = 0;
    const publishResults = [];

    // Publier chaque article
    for (const article of scheduledArticles) {
      try {
        const { data: updatedArticle, error: updateError } = await supabase
          .from('cms_articles')
          .update({
            published: true,
            published_at: new Date().toISOString(),
            scheduled_at: null, // Effacer la programmation après publication
            updated_at: new Date().toISOString()
          })
          .eq('id', article.id)
          .select()
          .single();

        if (updateError) {
          console.error(`Erreur lors de la publication de l'article ${article.id}:`, updateError);
          publishResults.push({
            id: article.id,
            title: article.title,
            success: false,
            error: updateError.message
          });
        } else {
          console.log(`Article publié avec succès: ${article.title} (${article.id})`);
          publishedCount++;
          publishResults.push({
            id: article.id,
            title: article.title,
            success: true,
            published_at: updatedArticle.published_at
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la publication de l'article ${article.id}:`, error);
        publishResults.push({
          id: article.id,
          title: article.title,
          success: false,
          error: error.message
        });
      }
    }

    return new Response(JSON.stringify({
      message: `Publication programmée terminée. ${publishedCount} article(s) publié(s)`,
      published: publishedCount,
      total: scheduledArticles.length,
      results: publishResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur dans la fonction de publication programmée:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur interne du serveur',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});