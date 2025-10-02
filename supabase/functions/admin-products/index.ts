// Admin Products Edge Function
// Creates, updates, deletes products using service role after validating admin session

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: any, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    ...init,
  });
}

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return jsonResponse({ success: false, error: "Server misconfigured" }, { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

    if (!token) {
      return jsonResponse({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Validate admin session
    const nowIso = new Date().toISOString();
    const { data: session, error: sessionError } = await supabase
      .from("admin_sessions")
      .select("id, admin_user_id, expires_at")
      .eq("session_token", token)
      .gt("expires_at", nowIso)
      .maybeSingle();

    if (sessionError || !session) {
      return jsonResponse({ success: false, error: "Invalid session" }, { status: 401 });
    }

    const { action, id, product, updates } = await req.json();

    if (!action) {
      return jsonResponse({ success: false, error: "Missing action" }, { status: 400 });
    }

    if (action === "create") {
      if (!product) return jsonResponse({ success: false, error: "Missing product" }, { status: 400 });

      // Basic validation
      const cleaned = {
        title: String(product.title || "").trim(),
        description: product.description ?? null,
        price: Number(product.price),
        currency: String(product.currency || "eur"),
        category: product.category ?? "digital",
        active: Boolean(product.active),
        image_url: product.image_url ?? null,
        file_url: product.file_url ?? null,
      };

      if (!cleaned.title || !Number.isInteger(cleaned.price) || cleaned.price <= 0) {
        return jsonResponse({ success: false, error: "Invalid fields" }, { status: 400 });
      }

      const { data, error } = await supabase
        .from("products")
        .insert(cleaned)
        .select("*")
        .single();

      if (error) return jsonResponse({ success: false, error: error.message }, { status: 400 });
      return jsonResponse({ success: true, product: data });
    }

    if (action === "update") {
      if (!id) return jsonResponse({ success: false, error: "Missing id" }, { status: 400 });
      const patch = updates ?? product ?? {};

      if (typeof patch.price !== "undefined") {
        patch.price = Number(patch.price);
      }

      const { data, error } = await supabase
        .from("products")
        .update(patch)
        .eq("id", id)
        .select("*")
        .single();

      if (error) return jsonResponse({ success: false, error: error.message }, { status: 400 });
      return jsonResponse({ success: true, product: data });
    }

    if (action === "delete") {
      if (!id) return jsonResponse({ success: false, error: "Missing id" }, { status: 400 });

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) return jsonResponse({ success: false, error: error.message }, { status: 400 });
      return jsonResponse({ success: true });
    }

    return jsonResponse({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("admin-products error", err);
    return jsonResponse({ success: false, error: (err as Error).message || "Unexpected error" }, { status: 500 });
  }
});