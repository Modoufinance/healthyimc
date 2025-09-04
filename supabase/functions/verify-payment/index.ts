import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
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

    const { sessionId, orderId } = await req.json();
    
    if (!sessionId || !orderId) {
      throw new Error("Session ID and Order ID are required");
    }

    logStep("Verifying payment", { sessionId, orderId });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Session retrieved", { status: session.payment_status });

    // Get order from database
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) throw orderError;
    logStep("Order retrieved", { orderStatus: order.status });

    // Update order status based on payment status
    let newStatus = order.status;
    if (session.payment_status === 'paid' && order.status === 'pending') {
      newStatus = 'paid';
      
      const { error: updateError } = await supabaseClient
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId);

      if (updateError) throw updateError;
      logStep("Order status updated to paid");
    } else if (session.payment_status === 'unpaid') {
      newStatus = 'failed';
      
      const { error: updateError } = await supabaseClient
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', orderId);

      if (updateError) throw updateError;
      logStep("Order status updated to failed");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      paymentStatus: session.payment_status,
      orderStatus: newStatus 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});