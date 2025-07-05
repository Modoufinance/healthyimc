import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

console.log('Admin auth function loaded successfully');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LoginRequest {
  username: string
  password: string
  totpCode?: string
  recaptchaToken?: string
}

interface CreateAdminRequest {
  username: string
  email: string
  password: string
}

serve(async (req) => {
  console.log('Request received:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier les variables d'environnement
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing environment variables:', { supabaseUrl: !!supabaseUrl, supabaseServiceKey: !!supabaseServiceKey });
      throw new Error('Missing required environment variables');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    const url = new URL(req.url)
    const action = url.pathname.split('/').pop()
    
    console.log('Action requested:', action);
    
    // Get client IP
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown'

    switch (action) {
      case 'login':
        return await handleLogin(req, supabaseClient, clientIP)
      case 'verify-session':
        return await handleVerifySession(req, supabaseClient)
      case 'logout':
        return await handleLogout(req, supabaseClient)
      case 'create-admin':
        return await handleCreateAdmin(req, supabaseClient)
      case 'setup-2fa':
        return await handleSetup2FA(req, supabaseClient)
      case 'verify-2fa':
        return await handleVerify2FA(req, supabaseClient)
      default:
        console.log('Unknown action:', action);
        return new Response(JSON.stringify({ error: 'Unknown action' }), { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
  } catch (error) {
    console.error('Critical error in admin-auth function:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function handleLogin(req: Request, supabase: any, clientIP: string) {
  console.log('Admin login attempt started');
  const { username, password, totpCode, recaptchaToken }: LoginRequest = await req.json()

  // Check rate limiting
  const { data: attempts } = await supabase
    .from('admin_login_attempts')
    .select('*')
    .eq('ip_address', clientIP)
    .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // Last 15 minutes

  if (attempts && attempts.length >= 5) {
    return new Response(JSON.stringify({ 
      error: 'Trop de tentatives. Réessayez dans 15 minutes.',
      requiresCaptcha: true 
    }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Verify reCAPTCHA if required (after 3 failed attempts)
  if (attempts && attempts.length >= 3 && !recaptchaToken) {
    return new Response(JSON.stringify({ 
      error: 'reCAPTCHA requis',
      requiresCaptcha: true 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (recaptchaToken) {
    const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaValid) {
      await logLoginAttempt(supabase, clientIP, username, false, true)
      return new Response(JSON.stringify({ error: 'reCAPTCHA invalide' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  }

  // Get admin user
  console.log('Looking for user:', username);
  const { data: adminUser, error: userError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .maybeSingle()

  console.log('User query result:', { adminUser, userError });

  if (!adminUser || userError) {
    console.log('User not found or error:', userError);
    await logLoginAttempt(supabase, clientIP, username, false, false)
    return new Response(JSON.stringify({ error: 'Identifiants invalides' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Check if account is locked
  if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
    return new Response(JSON.stringify({ 
      error: 'Compte temporairement verrouillé',
      lockedUntil: adminUser.locked_until 
    }), {
      status: 423,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Verify password
  const passwordValid = await bcrypt.compare(password, adminUser.password_hash)
  if (!passwordValid) {
    await logLoginAttempt(supabase, clientIP, username, false, false)
    
    // Increment failed attempts and lock if necessary
    const failedAttempts = (adminUser.failed_login_attempts || 0) + 1
    const updateData: any = { failed_login_attempts: failedAttempts }
    
    if (failedAttempts >= 5) {
      updateData.locked_until = new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    }
    
    await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', adminUser.id)

    return new Response(JSON.stringify({ error: 'Identifiants invalides' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Skip 2FA for now (simplified authentication)
  // TODO: Implement 2FA with a different library

  // Create session
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await supabase
    .from('admin_sessions')
    .insert({
      admin_user_id: adminUser.id,
      session_token: sessionToken,
      ip_address: clientIP,
      user_agent: req.headers.get('user-agent'),
      expires_at: expiresAt.toISOString()
    })

  // Update user login info
  await supabase
    .from('admin_users')
    .update({
      last_login: new Date().toISOString(),
      failed_login_attempts: 0,
      locked_until: null
    })
    .eq('id', adminUser.id)

  await logLoginAttempt(supabase, clientIP, username, true, false)

  return new Response(JSON.stringify({ 
    success: true,
    sessionToken,
    user: {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      twoFactorEnabled: adminUser.two_factor_enabled
    }
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleVerifySession(req: Request, supabase: any) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Token manquant' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const sessionToken = authHeader.substring(7)
  
  const { data: session } = await supabase
    .from('admin_sessions')
    .select(`
      *,
      admin_users (
        id,
        username,
        email,
        two_factor_enabled
      )
    `)
    .eq('session_token', sessionToken)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (!session) {
    return new Response(JSON.stringify({ error: 'Session invalide' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ 
    success: true,
    user: session.admin_users
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleLogout(req: Request, supabase: any) {
  const authHeader = req.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const sessionToken = authHeader.substring(7)
    await supabase
      .from('admin_sessions')
      .delete()
      .eq('session_token', sessionToken)
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleCreateAdmin(req: Request, supabase: any) {
  const { username, email, password }: CreateAdminRequest = await req.json()

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from('admin_users')
    .select('id')
    .or(`username.eq.${username},email.eq.${email}`)
    .single()

  if (existingAdmin) {
    return new Response(JSON.stringify({ error: 'Admin déjà existant' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const passwordHash = await bcrypt.hash(password)

  const { data: newAdmin, error } = await supabase
    .from('admin_users')
    .insert({
      username,
      email,
      password_hash: passwordHash
    })
    .select()
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ 
    success: true,
    admin: {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email
    }
  }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleSetup2FA(req: Request, supabase: any) {
  return new Response(JSON.stringify({ error: '2FA temporairement désactivé' }), {
    status: 501,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleVerify2FA(req: Request, supabase: any) {
  return new Response(JSON.stringify({ error: '2FA temporairement désactivé' }), {
    status: 501,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${Deno.env.get('RECAPTCHA_SECRET_KEY')}&response=${token}`
    })
    
    const data = await response.json()
    return data.success && data.score > 0.5 // For reCAPTCHA v3
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

async function logLoginAttempt(supabase: any, ip: string, username: string, successful: boolean, blockedByCaptcha: boolean) {
  await supabase
    .from('admin_login_attempts')
    .insert({
      ip_address: ip,
      username,
      successful,
      blocked_by_captcha: blockedByCaptcha
    })
}