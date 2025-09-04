import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-DOWNLOAD-LINK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const { productId, customerEmail } = await req.json();
    
    if (!productId || !customerEmail) {
      throw new Error("Product ID and customer email are required");
    }

    logStep("Checking access", { productId, customerEmail });

    // Check if user has purchased this product
    const { data: orderItems, error: orderError } = await supabaseClient
      .from('order_items')
      .select(`
        *,
        order:orders!inner(status, customer_email),
        product:products(file_url, title)
      `)
      .eq('product_id', productId)
      .eq('order.status', 'paid')
      .eq('order.customer_email', customerEmail);

    if (orderError) throw orderError;

    if (!orderItems || orderItems.length === 0) {
      throw new Error("Product not purchased or access denied");
    }

    const product = orderItems[0].product;
    if (!product?.file_url) {
      throw new Error("Product file not available");
    }

    logStep("Access verified, generating signed URL", { filePath: product.file_url });

    // Generate signed URL for download
    const { data: signedUrl, error: urlError } = await supabaseClient.storage
      .from('digital-products')
      .createSignedUrl(product.file_url, 3600); // 1 hour expiry

    if (urlError) throw urlError;

    logStep("Signed URL generated successfully");

    return new Response(JSON.stringify({ 
      downloadUrl: signedUrl.signedUrl,
      productTitle: product.title,
      expiresIn: 3600
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in get-download-link", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});