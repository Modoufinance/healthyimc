import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PRODUCT-CHECKOUT] ${step}${detailsStr}`);
};

interface CheckoutItem {
  productId: string;
  quantity: number;
}

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

    const { items, customerEmail }: { items: CheckoutItem[]; customerEmail?: string } = await req.json();
    
    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    // Get user if authenticated
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    logStep("User check completed", { hasUser: !!user, customerEmail });

    // Fetch products
    const productIds = items.map(item => item.productId);
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('*')
      .in('id', productIds)
      .eq('active', true);

    if (productsError) throw productsError;
    if (!products || products.length !== items.length) {
      throw new Error("Some products not found or inactive");
    }

    logStep("Products fetched", { count: products.length });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Calculate total amount
    let totalAmount = 0;
    const lineItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
      totalAmount += product.price * item.quantity;
      
      return {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.title,
            description: product.description || undefined,
            images: product.image_url ? [product.image_url] : undefined,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    // Check for existing customer
    const email = user?.email || customerEmail;
    if (!email) {
      throw new Error("Email is required for checkout");
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create order record
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user?.id || null,
        customer_email: email,
        total_amount: totalAmount,
        currency: products[0].currency,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;
    logStep("Order created", { orderId: order.id });

    // Create order items
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        order_id: order.id,
        product_id: product.id,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;
    logStep("Order items created");

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/mes-achats?success=true&order_id=${order.id}`,
      cancel_url: `${origin}/boutique?canceled=true`,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order with session ID
    await supabaseClient
      .from('orders')
      .update({ 
        stripe_session_id: session.id,
        stripe_customer_id: customerId || null 
      })
      .eq('id', order.id);

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url, orderId: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-product-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});